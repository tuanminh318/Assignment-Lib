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
    public class CategoriesController : ControllerBase
    {
        private CategoryService _service;

        public CategoriesController(CategoryService service)
        {
            _service = service;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _service.GetAll();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            return await _service.Get(id);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            category.Id = id;
            await _service.Update(category);
            return Ok();
        }

        
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            await _service.Add(category);
            return Ok();

            
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var b = await _service.Delete(id);
            if (b == null)
            {
                return NotFound();
            }
            return Ok();
        }

    }
}
