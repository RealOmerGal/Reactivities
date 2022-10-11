using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.AspNetCore.Diagnostics;

namespace API.Extensions
{
    public static class ExpectionMiddlewareExtenstion
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app, ILogger logger, IHostEnvironment env)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null)
                    {
                        logger.LogError($"Something went wrong: {contextFeature.Error}");
                        await context.Response.WriteAsync(new ErrorDetails()
                        {
                            StatusCode = context.Response.StatusCode,
                            Message = env.IsDevelopment() ? contextFeature.Error.ToString() : "Internal server error"
                        }.ToString());
                    }
                });
            });
        }
    }
}