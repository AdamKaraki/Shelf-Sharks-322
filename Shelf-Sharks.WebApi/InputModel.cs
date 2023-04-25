namespace Shelf_Sharks.Models
{
    public class InputModel
    {
        public InputModel(System.Guid UUID, Int64 ISBN = 0, String GoogleBooksId = "")
        {
            uuid = UUID;
            isbn = ISBN;
            googleBooksId = GoogleBooksId;
        }

        public System.Guid uuid { get; set; }
        public Int64 isbn { get; set; }
        public String googleBooksId { get; set; }
    }
}