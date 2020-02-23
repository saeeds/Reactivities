using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Microsoft.Extensions.Logging;
using AutoMapper;

namespace Application.Activities
{
  public class List
  {
    public class Query : IRequest<List<ActivityDTO>>
    {
      public Query()
      {
      }
    }
    public class Handler : IRequestHandler<Query, List<ActivityDTO>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;

      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }
      public async Task<List<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
      {
        var activities = await _context.Activities
         .ToListAsync(cancellationToken);

        return _mapper.Map<List<Activity>, List<ActivityDTO>>(activities);

      }
    }
  }
}