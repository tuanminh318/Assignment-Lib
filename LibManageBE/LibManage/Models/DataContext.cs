using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibManage.Models
{
    public class DataContext:DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Borrow> Borrows { get; set; }
        public DbSet<BorrowDetail> BorrowDetails { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder option)
        {
            option.UseMySQL("Server =DESKTOP-KL8AUP8\\SQLEXPRESS;Database=LibraryBook1;Trusted_Connection=True;MultipleActiveResultSets= true");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BorrowDetail>().HasKey(r => new { r.BookId, r.BorrowId });
            modelBuilder.Entity<Book>().HasKey(s => s.Id);
            modelBuilder.Entity<Category>().HasKey(s => s.Id);

            //set config replationship Product vs Category
            modelBuilder.Entity<Category>()
                .HasMany<Book>(s => s.Books)
                .WithOne(a => a.Category)
                .HasForeignKey(a => a.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
