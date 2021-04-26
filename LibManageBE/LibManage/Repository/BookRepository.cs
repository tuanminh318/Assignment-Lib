using LibManage.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibManage.Repository
{
    public class BookRepository : RepositoryImpl<Book, DataContext>
    {
        public BookRepository(DataContext context):base(context)
        {

        }
    }
}
