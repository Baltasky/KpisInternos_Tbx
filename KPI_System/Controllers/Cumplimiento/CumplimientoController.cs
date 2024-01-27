using KPI_System.Filters;
using KPI_System.Models.ClassesGlobales;
using KPI_System.Models.Cumplimiento;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KPI_System.Controllers.Cumplimiento
{
    [SessionFilter]
    public class CumplimientoController : DataBaseController
    {
        // GET: Cumplimiento
        public ActionResult Index()
        {
            var model = new CumplimientoViewModel();

            return View(model);
        }

        [HttpPost]
        public ActionResult Index(int FechaMes, int FechaAnio)
        {
            var model = new CumplimientoViewModel();

            var Mes = FechaMes;
            var Ano = FechaAnio;

            var DataUser = (System_User)Session["UserData"];

            //model.Fecha = Fecha;

            try
            {
                model.Mantenimiento = _dbTb4.Database.SqlQuery<Cumplimientos>("EXEC Sp_NewIndicadores_Cumplimiento @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion, @Mes=@Mes, @Ano=@Ano ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 1),
                    new SqlParameter("Opcion", 1),
                    new SqlParameter("Mes", Mes),
                    new SqlParameter("Ano", Ano)
                }).ToList<Cumplimientos>();

                model.Calibracion = _dbTb4.Database.SqlQuery<Cumplimientos>("EXEC Sp_NewIndicadores_Cumplimiento @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion, @Mes=@Mes, @Ano=@Ano ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 1),
                    new SqlParameter("Opcion", 2),
                    new SqlParameter("Mes", Mes),
                    new SqlParameter("Ano", Ano)
                }).ToList<Cumplimientos>();

                model.Capacitacion = _dbTb4.Database.SqlQuery<Cumplimientos>("EXEC Sp_NewIndicadores_Cumplimiento @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion, @Mes=@Mes, @Ano=@Ano ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 1),
                    new SqlParameter("Opcion", 3),
                    new SqlParameter("Mes", Mes),
                    new SqlParameter("Ano", Ano)
                }).ToList<Cumplimientos>();

                model.Certificacion = _dbTb4.Database.SqlQuery<Cumplimientos>("EXEC Sp_NewIndicadores_Cumplimiento @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion, @Mes=@Mes, @Ano=@Ano ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 1),
                    new SqlParameter("Opcion", 4),
                    new SqlParameter("Mes", Mes),
                    new SqlParameter("Ano", Ano)
                }).ToList<Cumplimientos>();

            }
            catch (Exception e)
            {
                
            }

            return View(model);
        }

        [HttpPost]
        public ActionResult DownloadExcel()
        {
            // Ruta del archivo de Excel que deseas descargar
            string filePath = Server.MapPath("~/Content/mar-sep-2023.xlsx");

            // Nombre que se mostrará al descargar el archivo
            string fileName = "mar-sep-2023.xlsx";

            if (System.IO.File.Exists(filePath))
            {
                return File(filePath, "application/vnd.ms-excel", fileName);
            }
            else
            {
                // Manejar el caso en que el archivo no exista
                return Content("El archivo no existe.");
            }
        }



    }
}