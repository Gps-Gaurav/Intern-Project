using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


using Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Manager.Interface;
using DataAccess.Interface;
using Manager.Impl;
using DataAccess.Impl;

namespace Richborn
{
    public class Startup
    {
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
                options.AddPolicy("AllowAllHeaders",
                   builder =>
                   {
                       builder.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
                   });
            });
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            services.AddControllersWithViews();
            services.AddRazorPages();
            services.AddHttpContextAccessor();
            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddSingleton<IConfiguration>(Configuration);
            string connectionString = Configuration.GetConnectionString("MSSQLDatabase");
            string workconnectionString = Configuration.GetConnectionString("MSSQLDatabaseWork");
            var serviceProvider = services.BuildServiceProvider();
           
            services.AddMvc(option => option.EnableEndpointRouting = false).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddTransient(_ => new MSSqlDatabase(connectionString, workconnectionString, serviceProvider.GetService<IHttpContextAccessor>()));
			services.AddSwaggerDocument(c=>c.Title="Richborn");
			
            services.AddTransient<ICurrentUserService, CurrentUserService>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddTransient<IRepositoryManager, RepositoryManager>();
            services.AddTransient<IUploadManager, UploadManager>();
            services.AddTransient<IDBConnectorRepository, DBConnectorRepository>();
            services.AddSingleton<IAppConfiguration, AppConfiguration>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {	app.UseCors("AllowAllHeaders");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

			

            app.UseAuthentication();

            app.UseOpenApi();
            app.UseSwaggerUi3(c => c.DocumentTitle = "Richborn");
            app.UseHttpsRedirection();
            app.UseMvc();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                  name: "areas",
                  template: "{area:exists}/{controller=Home}/{action=Index}/{id?}"
                );
            });



        }
    }
}
