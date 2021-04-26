using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace LibManage.Models
{
    public class BorrowDetail : IEntity
    {
        public int Id { get; set; }
        
        public int BookId { get; set; }
       
        public int BorrowId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Book Book { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Borrow Borrow { get; set; }
    }
}
