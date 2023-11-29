using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using MintPlayer.AspNetCore.Hsts;
using MintPlayer.AspNetCore.SpaServices.Extensions;
using MintPlayer.AspNetCore.SpaServices.Prerendering;
using MintPlayer.AspNetCore.SpaServices.Routing;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSpaStaticFilesImproved(configuration => configuration.RootPath = "ClientApp/dist");
builder.Services.AddSpaPrerenderingService<Ssr.Services.SpaPrerenderingService>();

var app = builder.Build();

app.UseImprovedHsts();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();

if (!builder.Environment.IsDevelopment())
{
    app.UseSpaStaticFilesImproved();
}

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");
});

// Allows us to customize the regexes to match the lines received from Angular CLI
app.UseSpaImproved(spa =>
{
    spa.Options.SourcePath = "ClientApp";
    // For angular 17
    spa.Options.CliRegexes = [new Regex(@"Local\:\s+(?<openbrowser>https?\:\/\/(.+))")];
    spa.UseSpaPrerendering(options =>
    {
        options.BootModuleBuilder = builder.Environment.IsDevelopment() ? new AngularPrerendererBuilder(npmScript: "build:ssr") : null;
        options.BootModulePath = $"{spa.Options.SourcePath}/dist/server/main.js";
        options.ExcludeUrls = new[] { "/sockjs-node" };
    });
    if (builder.Environment.IsDevelopment())
    {
        spa.UseAngularCliServer(npmScript: "start");
    }
});


app.Run();