using LibManage.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibManage.Repository
{
    public class RoleRepository:RepositoryImpl<Role,DataContext>
    {
        public RoleRepository(DataContext context):base(context)
        {

        }
    }
}
