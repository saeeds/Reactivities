using System.Net;
using System;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Collections.Generic;
using Application.Activities;
using System.Threading;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
  public class ActivitiesController : BaseController
  {

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
    {
      return await Mediator.Send(new List.Query(), ct);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Activity>> Details(Guid id)
    {
      return await Mediator.Send(new Details.Query { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<Unit>> Create(Create.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Unit>> Edit(Edit.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Unit>> Delete(Guid id)
    {
      return await Mediator.Send(new Delete.Command { Id = id });
    }
  }
}