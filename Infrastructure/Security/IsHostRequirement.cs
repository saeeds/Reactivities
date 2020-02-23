using System;
using System.Security.Claims;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Infrastructure.Security
{
  public class IsHostRequirement : IAuthorizationRequirement
  {
  }

  public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
  {
    private readonly DataContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
    {
      _httpContextAccessor = httpContextAccessor;
      _context = context;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
    {
      if (context.Resource is AuthorizationFilterContext authContext)
      {
        var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?
             .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

        var activitityId = Guid.Parse(authContext.RouteData.Values["id"].ToString());

        var activity = _context.Activities.FindAsync(activitityId).Result;

        var host = activity.UserActivities.FirstOrDefault(x => x.IsHost);

        if (host?.AppUser?.UserName == currentUserName)
          context.Succeed(requirement);
      }
      else
      {
        context.Fail();
      }
      return Task.CompletedTask;
    }
  }
}