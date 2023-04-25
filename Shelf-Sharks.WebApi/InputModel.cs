namespace Shelf_Sharks.Models
{
    public class InputModel
    {
        public InputModel(System.Guid UUID, Int64 ISBN = 0)
        {
            uuid = UUID;
            isbn = ISBN;
        }
        
        public System.Guid uuid { get; set;}
        public Int64 isbn { get; set; }
    }
}