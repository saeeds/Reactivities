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
    public async Task<ActionResult<List<ActivityDTO>>> List(CancellationToken ct)
    {
      return await Mediator.Send(new List.Query(), ct);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<ActivityDTO>> Details(Guid id)
    {
      return await Mediator.Send(new Details.Query { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<Unit>> Create(Create.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult<Unit>> Edit(Edit.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult<Unit>> Delete(Guid id)
    {
      return await Mediator.Send(new Delete.Command { Id = id });
    }

    [HttpPost("{id}/attend")]
    public async Task<ActionResult<Unit>> Attend(Guid id)
    {
      return await Mediator.Send(new Attend.Command { Id = id });
    }

    [HttpDelete("{id}/attend")]
    public async Task<ActionResult<Unit>> UnAttend(Guid id)
    {
      return await Mediator.Send(new UnAttend.Command { Id = id });
    }

  }
}