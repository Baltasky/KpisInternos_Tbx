using KPI_System.Filters;
using KPI_System.Models.ClassesGlobales;
using KPI_System.Models.Disponibilidad;
using KPI_System.Models.Fallas;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KPI_System.Controllers.Disponibilidad
{
    [SessionFilter]
    public class DisponibilidadController : DataBaseController
    {
        // GET: Disponibilidad
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public ActionResult DisponibilidadFiltro(int TipoPeticion, string Fecha)
        {
            var model = new DisponibilidadViewModel();

            var result = "";

            var FechaInicio = Fecha.Split('-')[0];
            var FechaFin = Fecha.Split('-')[1];

            var DataUser = (System_User)Session["UserData"];

            try
            {
                //Filtros
                model.DisponibilidadFiltro = _dbTb4.Database.SqlQuery<DisponibilidadFiltro>("EXEC Sp_NewIndicadores_Disponibilidad @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion, @UsuCod=@UsuCod, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 1),
                    new SqlParameter("Opcion", 1),
                    new SqlParameter("UsuCod", DataUser.Id),
                       new SqlParameter("FechaInicio", FechaInicio),
                    new SqlParameter("FechaFin", FechaFin)
                }).ToList<DisponibilidadFiltro>();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                result = "Error";
                return Json(result);
            }

        }

        [HttpPost]
        public ActionResult DisponibilidadContenedores(int TipoPeticion, string Fecha)
        {
            var model = new DisponibilidadContenedoresViewModel();

            var result = "";

            var FechaInicio = Fecha.Split('-')[0];
            var FechaFin = Fecha.Split('-')[1];

            var DataUser = (System_User)Session["UserData"];

            try
            {
                //Filtros
               var Store = _dbTb4.Database.SqlQuery<DisponibilidadContenedores>("EXEC Sp_NewIndicadores_Disponibilidad @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion, @UsuCod=@UsuCod, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 1),
                    new SqlParameter("Opcion", 2),
                    new SqlParameter("UsuCod", DataUser.Id),
                    new SqlParameter("FechaInicio", FechaInicio),
                    new SqlParameter("FechaFin", FechaFin)
                }).ToList<DisponibilidadContenedores>();

                if (Store.Any()) 
                {
                    model.DisponibilidadContenedores = Store;
                }

                
            }
            catch (Exception e)
            {
                result = "Error";
                return Json(result);
            }

            return Json(model, JsonRequestBehavior.AllowGet);

        }


    }
}