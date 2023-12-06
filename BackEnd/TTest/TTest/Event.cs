using Microsoft.VisualBasic;

namespace TTest;

public class Event
{
    public int EventId { get; set; }
    public string EventName { get; set; }
    public string EventLocation { get; set; }
    public string EventDate{ get; set; }
    public String EventImage { get; set; } // Assuming EventImage is stored as binary data
    public int Capacity { get; set; }
    public int Likes { get; set; }
    public int Dislikes { get; set; }
    public string EventTime { get; set; } // Assuming EventTime is stored as a string (VARCHAR)
    public string EventDescription { get; set; } // Assuming EventTime is stored as a string (VARCHAR)

}
