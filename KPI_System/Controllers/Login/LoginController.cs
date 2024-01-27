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

namespace KPI_System.Controllers.Login
{
  
    public class LoginController : Controller
    {
        private readonly LValidationLogin _lValidationLogin;
        public LoginController()
        {
            _lValidationLogin = new LValidationLogin();
        }


        public ActionResult Index()
        {
            if (Session["UserData"] != null)
            {
                return Redirect("/VentasRentas");
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

    }
}