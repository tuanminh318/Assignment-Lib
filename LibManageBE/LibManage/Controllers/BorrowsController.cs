using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibManage.Models;
using LibManage.Services;

namespace LibManage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowsController : ControllerBase
    {
        //private readonly DataContext _context;
        private BorrowService _service;
        public BorrowsController(BorrowService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Borrow>>> GetBorrows()
        {
            return await _service.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Borrow>> GetBorrow(int id)
        {
            return await _service.Get(id);
        }
    }
}
