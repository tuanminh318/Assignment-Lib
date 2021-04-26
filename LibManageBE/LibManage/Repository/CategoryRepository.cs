using LibManage.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibManage.Repository
{
    public class CategoryRepository : RepositoryImpl<Category,DataContext>
    {
        public CategoryRepository(DataContext context):base(context)
        {

        }
    }
}
