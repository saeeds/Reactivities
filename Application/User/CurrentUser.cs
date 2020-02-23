using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
  public class CurrentUser
  {
    public class Query : IRequest<User>
    {
    }
    public class Handler : IRequestHandler<Query, User>
    {
      private readonly IJwtGenerator _jwtGenerator;
      private readonly IUserAccessor _userAccessor;
      private readonly UserManager<AppUser> _userManager;
      public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
      {
        _jwtGenerator = jwtGenerator;
        _userAccessor = userAccessor;
        _userManager = userManager;

      }
      public async Task<User> Handle(Query request, CancellationToken cancellationToken)
      {
        var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUserName());

        return new User
        {
          DispalyName = user.DisplayName,
          Username = user.UserName,
          Token = _jwtGenerator.CreateToken(user),
          Image = null
        };
      }
    }
  }
}