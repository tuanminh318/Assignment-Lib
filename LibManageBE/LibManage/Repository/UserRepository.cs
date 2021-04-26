using LibManage.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibManage.Repository
{
    public class UserRepository: RepositoryImpl<User,DataContext>
    {
        public UserRepository(DataContext context):base(context)
        {
            
        }
    }
}
