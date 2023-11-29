using MintPlayer.AspNetCore.SpaServices.Prerendering.Services;
using MintPlayer.AspNetCore.SpaServices.Routing;

namespace Ssr.Services;

public class SpaPrerenderingService : ISpaPrerenderingService
{
    private readonly ISpaRouteService spaRouteService;
    public SpaPrerenderingService(ISpaRouteService spaRouteService)
    {
        this.spaRouteService = spaRouteService;
    }

    public Task BuildRoutes(ISpaRouteBuilder routeBuilder)
    {
        return Task.CompletedTask;
    }

    public async Task OnSupplyData(HttpContext context, IDictionary<string, object> data)
    {
        var route = await spaRouteService.GetCurrentRoute(context);
        switch (route?.Name)
        {
            default:
                break;
        }
    }
}
