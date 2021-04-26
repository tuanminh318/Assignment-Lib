using LibManage.Models;
using LibManage.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibManage.Services
{
    public class CategoryService
    {
        private readonly CategoryRepository _repository;
        public CategoryService(CategoryRepository repository)
        {
            _repository = repository;
        }
        public async Task<Category> Add(Category entity)
        {
            Category c = new Category();
            c.Name = entity.Name;
            return await _repository.Add(c);
        }
        
        public async Task<Category> Delete(int id)
        {
            return await _repository.Delete(id);
        }

        public async Task<Category> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<List<Category>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<Category> Update(Category entity)
        {
            return await _repository.Update(entity);
        }
    }
}
