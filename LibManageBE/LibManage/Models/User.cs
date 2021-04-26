using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LibManage.Models
{
    public class User:IEntity
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Role Role { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Borrow> Borrows { get; set; }
    }
}
