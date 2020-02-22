using System.Threading.Tasks;
using Application.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading;

namespace API.Controllers
{
  public class UserController : BaseController
  {
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<User>> Login(Login.Query quey)
    {
      return await Mediator.Send(quey);
    }
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(Register.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpGet]
    public async Task<ActionResult<User>> CurrentUser()
    {
      return await Mediator.Send(new CurrentUser.Query());
    }
  }
}