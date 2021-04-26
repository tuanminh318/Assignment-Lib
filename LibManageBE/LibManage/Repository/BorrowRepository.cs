using LibManage.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibManage.Repository
{
    public class BorrowRepository:RepositoryImpl<Borrow,DataContext>
    {
        public BorrowRepository(DataContext context):base(context)
        {

        }
    }
}
