using System.Net;
using System;

namespace Application.Errors
{
  public class ResetException : Exception
  {
    public ResetException(HttpStatusCode code, object errors = null)
    {
      Code = code;
      Errors = errors;
    }

    public HttpStatusCode Code { get; }
    public object Errors { get; }
  }
}