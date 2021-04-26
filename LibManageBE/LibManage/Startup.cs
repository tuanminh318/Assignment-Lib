using LibManage.Models;
using LibManage.Repository;
using LibManage.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibManage
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("http://localhost:3000")
                                                              .AllowAnyHeader()
                                                        .AllowAnyMethod();
                                  });
            });

            services.AddControllers();
           services.AddDbContext<DataContext>(
            opts => opts.UseSqlServer(Configuration.GetConnectionString("sqlConnection")));
            //services.AddScoped<CategoryRepository>();
            //services.AddScoped<BookRepository>();
            //services.AddScoped<UserRepository>();
            //services.AddScoped<RoleRepository>();
            //services.AddScoped<BorrowDetailRepository>();
            //services.AddScoped<BookService, BookServiceImpl>();
            //services.AddScoped<BorrowService, BorrowServiceImpl>();
            //services.AddScoped<CategoryService, CategoryServiceImpl>();

            services.AddTransient<CategoryRepository>();
            services.AddTransient<BookRepository>();
            services.AddScoped<CategoryService>();
            services.AddScoped<BookService>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "LibManage", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "LibManage v1"));
            }

            app.UseHttpsRedirection();
            app.UseCors(MyAllowSpecificOrigins);

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
