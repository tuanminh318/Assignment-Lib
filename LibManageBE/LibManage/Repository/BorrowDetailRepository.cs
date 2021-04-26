using LibManage.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibManage.Repository
{
    public class BorrowDetailRepository:RepositoryImpl<BorrowDetail,DataContext>
    {
        public BorrowDetailRepository(DataContext context):base(context)
        {

        }
    }
}
