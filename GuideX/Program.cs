

using GuideX.Data;
using GuideX.Repository;
using GuideX.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Controllers
builder.Services.AddControllers();

// OpenAPI
builder.Services.AddOpenApi();

// Database
builder.Services.AddDbContext<GuideXpContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Repositories
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<GuideRepository>();
builder.Services.AddScoped<AttractionRepository>(); 
builder.Services.AddScoped<AllRepository>();

// Services
builder.Services.AddScoped<TokenService>(); // <--- רישום ה-TokenService
builder.Services.AddScoped<loginService>();
builder.Services.AddScoped<GuideService>();

//builder.Services.AddAuthentication(options =>

//{

//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

//})

//.AddJwtBearer(options =>

//{

//    options.TokenValidationParameters = new TokenValidationParameters

//    {

//        ValidateIssuer = true,

//        ValidateAudience = true,

//        ValidateLifetime = true,

//        ValidateIssuerSigningKey = true,

//        ValidIssuer = builder.Configuration["JWT:Issuer"],

//        ValidAudience = builder.Configuration["JWT:Audience"],

//        IssuerSigningKey = new
//    SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))

//    };

//});
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            //ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidIssuer = "GuideX",
            ValidAudience = "angular",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
        };
    });
builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}


app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();



app.UseCors("AllowAngular");


app.MapControllers();


app.Run();