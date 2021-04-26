using LibManage.Models;
using LibManage.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibManage.Services
{
    public class BookService
    {
        private BookRepository _repository;
        public BookService(BookRepository repository)
        {
            _repository = repository;
        }
        public async Task<Book> Add(Book entity)
        {
            Book book = new Book();

            book.Title = entity.Title;
            book.ContentShort = entity.ContentShort;
            book.Author = entity.Author;
            book.Image = entity.Image;
            book.CategoryId = entity.CategoryId;

            return await _repository.Add(book);

        }

        public async Task<Book> Delete(int id)
        {
            return await _repository.Delete(id);
        }

        public async Task<Book> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<List<Book>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<Book> Update(Book entity)
        {
            return await _repository.Update(entity);
        }
    }
}
