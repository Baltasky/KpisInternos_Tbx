using KPI_System.Library;
using KPI_System.Models.ClassesGlobales;
using KPI_System.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using KPI_System.Filters;
using System.IO;
using System.Net.Mail;
using System.Net;

namespace KPI_System.Controllers.Login
{
  
    public class LoginController : Controller
    {
        private readonly LValidationLogin _lValidationLogin;
        private readonly ITempDataProvider _tempDataProvider;

        public LoginController( )
        {
            _lValidationLogin = new LValidationLogin();

        }


        public ActionResult Index()
        {
            if (Session["UserData"] != null)
            {
                var System_User = (System_User)Session["UserData"];

                return Redirect(System_User.MainRute);
            }
            else
            {
                return View();
            }
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Index(LoginViewModel model)
        {
            string Result = "";

            var Validado = _lValidationLogin.ValidateUserPassword(model);

            if (Validado.Messege == null || Validado.Messege == "")
            {
                var correctCookie = await CreateCookie(Validado.Usuarios);

                if (correctCookie == "" || correctCookie == null)
                {
                    return Json("Correcto");
                }
                else
                {
                    ViewBag.Error = correctCookie;
                    Result = "Usuario o contraseña invalidos!.";

                    return Json(Result);
                }

            }
            else
            {
                Result = "Usuario o contraseña invalidos!.";
                return Json(Result);
            }

        }


        public async Task<string> CreateCookie(System_User UserInf)
        {
            string Result = "";
            try
            {
                Session["UserData"] = UserInf;
            }
            catch
            {
                Result = "Error";
            }
            return Result;
        }


        [HttpPost]
         public  ActionResult ComprobarSesion(int TipoPeticion)
        {
            var Result = "";
            if (Session["UserData"] == null)
            { 
             Result="SessionExpirada";
            }

            return Json(Result);
        }


        public async Task<ActionResult> Logout()
        {
            // Clear the authentication cookie
            FormsAuthentication.SignOut();
            // Clear the session data
            Session.Clear();
            Session.Abandon();

            return Redirect("/");
        }


        [HttpPost]
        public async Task<ActionResult> RecuperarPassword(string Correo)
        {
            var Respuesta = _lValidationLogin.DecodificarPassword(Correo.Trim());

            var Result = "";

            if (Respuesta == "NoExiste")
            {
                Result = Respuesta;
            }
            else
            {
                var model = new LoginViewModel
                {
                    Password = Respuesta
                };

                string remitente = "notificaciones@crm.sumimsa.mx";
                string asunto = "Se Recupero su contraseña correctamente";
                var contenidoHtml = await CorreoRecuperarPassword(model);
                MailMessage correo = new MailMessage();
                correo.From = new MailAddress(remitente, "Recuperación de contraseña");
                correo.To.Add(Correo);
                correo.Subject = asunto;
                correo.Body = contenidoHtml;
                correo.IsBodyHtml = true;
                SmtpClient clienteSmtp = new SmtpClient("smtp.ionos.mx", 587);
                clienteSmtp.Credentials = new NetworkCredential("notificaciones@crm.sumimsa.mx", "CrmSimims@20");
                clienteSmtp.EnableSsl = true;
                clienteSmtp.Send(correo);

                Result = "Correcto";
            }

            return Json(Result);

        }


        public string RenderPartialViewToString(string viewName, object model)
        {
            ViewData.Model = model;

            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, viewName);
                var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, new TempDataDictionary(), sw);
                viewResult.View.Render(viewContext, sw);

                return sw.ToString();
            }
        }

        public async Task<string> CorreoRecuperarPassword(LoginViewModel Model)
        {
            var model = new LoginViewModel();
            model = Model;
            var contenidoHtml = RenderPartialViewToString("_CorreoRecuperarPassword", model);
            return contenidoHtml;
        }

        //public async Task<string> CorreoRecuperarPassword(LoginViewModel Model)
        //{
        //    var model = new LoginViewModel();
        //    model = Model;


        //    var controllerName = "NombreDelControlador"; // Reemplaza "NombreDelControlador" con el nombre real de tu controlador.
        //    var actionName = "_CorreoRecuperarPassword"; // Reemplaza "_CorreoRecuperarPassword" con el nombre real de tu acción de vista parcial.

        //    var actionContext = new ControllerContext(HttpContext, RouteData, ControllerContext.ActionDescriptor);


        //    var viewResult = PartialView("_CorreoRecuperarPassword", model);

        //    using (var sw = new StringWriter())
        //    {
        //        var viewEngineResult = _viewEngine.FindView(actionContext, viewResult.ViewName, false);
        //        if (!viewEngineResult.Success)
        //        {
        //            throw new InvalidOperationException($"La vista '{viewResult.ViewName}' no se encontró.");
        //        }

        //        var viewDictionary = new ViewDataDictionary(new EmptyModelMetadataProvider(), new ModelStateDictionary())
        //        {
        //            Model = viewResult.Model
        //        };

        //        var viewContext = new ViewContext(
        //            actionContext,
        //            viewEngineResult.View,
        //            viewDictionary,
        //            new TempDataDictionary(actionContext.HttpContext, _tempDataProvider),
        //            sw,
        //            new HtmlHelperOptions()
        //        );

        //        await viewEngineResult.View.RenderAsync(viewContext);
        //        return sw.ToString();
        //    }

        //}





    }
}