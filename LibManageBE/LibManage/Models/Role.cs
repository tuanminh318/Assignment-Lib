using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LibManage.Models
{
    public class Role:IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<User> Users { get; set; }
    }
}
