using KPI_System.Models.ClassesGlobales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KPI_System.Filters
{
    public class SessionFilter : ActionFilterAttribute
    {
        //private readonly LMenu _Menu;

        //public SessionFilter()
        //{
        //    _Menu = new LMenu();
        //}

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var Session = filterContext.HttpContext.Session;
            var UsuarioData = (System_User)Session["UserData"];

            //Tipo peticion
            // 0 = Peticion normal por post o get
            // 1 = Peticion por ajax
            int TipoPeticion = 0;
            if (filterContext.ActionParameters.ContainsKey("TipoPeticion"))
            {
                TipoPeticion = (int)filterContext.ActionParameters["TipoPeticion"];
            }


            if (UsuarioData == null)
            {
                if (TipoPeticion.Equals(0))
                {
                    filterContext.Result = new RedirectResult("/");
                }
                else
                {
                    filterContext.Result = new ContentResult
                    {
                        ContentType = "text/plain",
                        Content = "SessionExpirada"
                    };
                }
            }



        }

    }
}