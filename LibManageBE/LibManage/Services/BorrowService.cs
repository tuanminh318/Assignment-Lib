using LibManage.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibManage.Services
{
    public class BorrowService
    {
        private DataContext _context;
        public BorrowService(DataContext context)
        {
            _context = context;
        }
        public async Task<Borrow> Add(Borrow entity)
        {
            Borrow b = new Borrow();
            b.Status = entity.Status;
            b.Name = entity.Name;
            b.DateRequest = entity.DateRequest;
            b.UpdatedRequest = entity.DateRequest;
            b.UserId = entity.UserId;

            _context.Add(b);
            await _context.SaveChangesAsync();
            return b;

        }

        public async Task<Borrow> Delete(int id)
        {
            var entity = await _context.Set<Borrow>().FindAsync(id);
            if (entity == null)
            {
                return entity;
            }

            _context.Set<Borrow>().Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<Borrow> Get(int id)
        {
            return await _context.Set<Borrow>().FindAsync(id);
        }

        public async Task<List<Borrow>> GetAll()
        {
            return await _context.Set<Borrow>().ToListAsync();
        }

        public async Task<Borrow> Update(Borrow entity)
        {
            Borrow borrow = _context.Borrows.Find(entity.Id);
            borrow.Status = entity.Status;
            borrow.Name = entity.Name;
            borrow.DateRequest = entity.DateRequest;
            borrow.UpdatedRequest = entity.DateRequest;
            borrow.UserId = entity.UserId;
            await _context.SaveChangesAsync();
            return entity;

        }
    }
}
