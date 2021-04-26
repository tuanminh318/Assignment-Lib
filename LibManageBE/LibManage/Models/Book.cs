using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LibManage.Models
{
    public class Book:IEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ContentShort { get; set; }
        public string Author { get; set; }
        public string Image { get; set; }
        public int CategoryId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Category Category { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<BorrowDetail> BorrowDetails { get; set; }
    }
}
