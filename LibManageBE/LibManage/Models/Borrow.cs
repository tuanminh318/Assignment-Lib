using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LibManage.Models
{
    public class Borrow: IEntity
    {
        public int Id { get; set; }
        public int Status { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public DateTime DateRequest { get; set; }
        public DateTime UpdatedRequest { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<BorrowDetail> BorrowDetails { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual User User { get; set; }
    }
}
