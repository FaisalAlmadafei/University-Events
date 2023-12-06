using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Dapper ; 
namespace TTest.Controllers;

[Route("api/[controller]")]
[ApiController]

public class MyController : ControllerBase
{
    private readonly IConfiguration config;

    public MyController(IConfiguration config)
    {
        this.config = config;
        
    }
    //-----------------------------------------------------------------------------------------

    [HttpGet]
    [Route("GetUsers")]
    public async Task<ActionResult> getUsers()
    {
        using var conn = new SqlConnection(config.GetConnectionString("DefaultConnection"));
        var stu = await conn.QueryAsync<User>("select * from  [Project-405].[dbo].[Users]");
        return Ok(stu); 
    }
    
    //-----------------------------------------------------------------------------------------

    [HttpGet]
    [Route("GetUser")]
    public async Task<ActionResult> getUser(String user_Id)
    {
        using var conn = new SqlConnection(config.GetConnectionString("DefaultConnection"));
        var stu = await conn.QueryAsync<User>("select * from  [Project-405].[dbo].[Users] WHERE UserId = @UserId" ,  new {UserId = user_Id});
        return Ok(stu); 
    }
    
    
    //-----------------------------------------------------------------------------------------
    
    [HttpGet]
    [Route("GetEvnets")]
    public async Task<ActionResult> getEvents()
    {
        using var conn = new SqlConnection(config.GetConnectionString("DefaultConnection"));
        var stu = await conn.QueryAsync<Event>("select * from  [Project-405].[dbo].[Events]");
        return Ok(stu); 
    }

    
    //-----------------------------------------------------------------------------------------
    
    [HttpGet("getUserEvents/ID=" + "{user_ID}")]
    public async Task<ActionResult> GetUserEventByID(String user_ID)
    {
        using var conn = new SqlConnection(config.GetConnectionString("DefaultConnection"));
    
        // Query to join UsersEvents and Events tables to get event info based on user ID
        var events = await conn.QueryAsync<Event>(@"
        SELECT E.EventId, E.EventName, E.EventDescription, E.EventDate, E.likes , E.dislikes,E.EventLocation, UE.EventTicketImage AS EventImage
        FROM [Project-405].[dbo].[UsersEvents] UE
        INNER JOIN [Project-405].[dbo].[Events] E ON UE.EventId = E.EventId
        WHERE UE.UserId = @UserId", new { UserId = user_ID });

        return Ok(events);
    }
    
    
    //-----------------------------------------------------------------------------------------
    [HttpPost]

    [Route("addEvnets")]

    public async Task<ActionResult> addEvent(String Event_Name , String Event_Location, String _Capacity, String Event_Time ,String event_Date , String Event_Description , String Event_Image)
    {
        using var conn = new SqlConnection(config.GetConnectionString("DefaultConnection"));
        await conn.ExecuteAsync("INSERT INTO  [Project-405].[dbo].[Events] ( EventName, EventLocation,Capacity,EventTime,eventDate, EventDescription , EventImage) values ( @EventName, @EventLocation, @Capacity, @EventTime, @eventDate , @EventDescription, @EventImage) ", new {EventName = Event_Name , EventLocation= Event_Location, Capacity= _Capacity,EventTime= Event_Time,eventDate = event_Date , EventDescription=Event_Description , EventImage= Event_Image}); 
        
        return Ok(await getEvents()); 
    }
    
    //----------------------------------------------------------------------------------------
    [HttpPost]

    [Route("ChoseEvent")]

    public async Task<ActionResult> choseEvent(String User_Id, String Event_Id, String EventTicket)
    {
        using var conn = new SqlConnection(config.GetConnectionString("DefaultConnection"));
        await conn.ExecuteAsync("INSERT INTO  [Project-405].[dbo].[UsersEvents] ( UserId, EventId, EventTicketImage) values ( @UserId, @EventId,@EventTicketImage) ", new {UserId = User_Id , EventId= Event_Id , EventTicketImage= EventTicket}); 
        
        return Ok(await GetUserEventByID(User_Id)); 
    }
    
   
    //-----------------------------------------------------------------------------------------
    
    [HttpPut]
    [Route("updateEventLikes")]
    public async Task<ActionResult> UpdateEventLikes(String Event_Id, int _Likes)
    {
        using var conn = new SqlConnection(config.GetConnectionString("DefaultConnection"));
        await conn.ExecuteAsync("UPDATE [Project-405].[dbo].[Events] SET Likes = @Likes WHERE EventId = @EventId", new { EventId = Event_Id, Likes = _Likes });

        return Ok(await getEvents());
    }
    
    
    [HttpPut]
    [Route("updateEventDisLikes")]
    public async Task<ActionResult> UpdateEventDisLikes(String Event_Id, int _DisLikes)
    {
        using var conn = new SqlConnection(config.GetConnectionString("DefaultConnection"));
        await conn.ExecuteAsync("UPDATE [Project-405].[dbo].[Events] SET DisLikes = @DisLikes WHERE EventId = @EventId", new { EventId = Event_Id, DisLikes = _DisLikes });

        return Ok(await getEvents());
    }

    
    //-----------------------------------------------------------------------------------------

    [HttpDelete]
    [Route("DeleteEvent")]
    public async Task<ActionResult> DeleteEvent(string eventName)
    {
        using var conn = new SqlConnection(config.GetConnectionString("DefaultConnection"));
    
        // Get the eventId from the eventName
        var eventId = await conn.QueryFirstOrDefaultAsync<int>(
            "SELECT EventId FROM [Project-405].[dbo].[Events] WHERE EventName = @EventName",
            new { EventName = eventName }
        );

        if (eventId == null)
        {
            return NotFound("Event not found.");
        }

        // Delete the event from the userEvents table
        await conn.ExecuteAsync(
            "DELETE FROM [Project-405].[dbo].[UsersEvents] WHERE EventId = @EventId",
            new { EventId = eventId }
        );

        // Delete the event from the Events table
        await conn.ExecuteAsync(
            "DELETE FROM [Project-405].[dbo].[Events] WHERE EventId = @EventId",
            new { EventId = eventId }
        );

      
        return Ok(); 
    }

    
    
    
 
    //-----------------------------------------------------------------------------------------

    [HttpGet]
    [Route("LogIn")]
    public async Task<IActionResult> LogIn(int ID, string Pass)
    {
        var conn = new SqlConnection(config.GetConnectionString("DefaultConnection"));
        try
        {
            var res = await conn.QueryFirstAsync<User>(
                "select * from  [Project-405].[dbo].[Users] where userId = @userId and Password = @Password",
                new { userId = ID, Password = Pass });

            if (res != null)
            {
              

                return Ok(res);
            }
            else
            {
                return BadRequest(false);
            }
        }
        catch (InvalidOperationException ex)
        {
            // Catch the exception that is thrown when no results are found
            return BadRequest("No user Found");
        }
    }
    
    
    
   
  
}


