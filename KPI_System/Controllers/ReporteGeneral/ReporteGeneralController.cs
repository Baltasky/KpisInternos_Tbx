using KPI_System.Filters;
using KPI_System.Models.ClassesGlobales;
using KPI_System.Models.Globales;
using KPI_System.Models.ReporteGeneral;
using KPI_System.Models.VentasRentas;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KPI_System.Controllers
{
    [SessionFilter]
    public class ReporteGeneralController : DataBaseController
    {
        // GET: ReporteGeneral
        public ActionResult Index()
        {
            var model = new ReporteGeneralViewModel();

            var DataUser = (System_User)Session["UserData"];


            return View(model);
        }

        [HttpPost]
        public ActionResult Index(string RangoFechas, string[] EquiposSelect)
        {
            var model = new ReporteGeneralViewModel();

            string Equipos = string.Join(",", EquiposSelect);

            var FechaInicial = RangoFechas.Split('-')[0];
            var FechaFinal = RangoFechas.Split('-')[1];

            var DataUser = (System_User)Session["UserData"];

            model.ReportePerido = "Periodo: " + RangoFechas;

            try
            {
                //Tablas
                model.ReporteGeneralList = _dbTb4.Database.SqlQuery<ReporteGeneralList>("EXEC Sp_NewIndicadores_ReporteIndicadores " +
                "@UsuCod=@UsuCod, @Equipo=@Equipo, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
                {
                    new SqlParameter("Equipo", Equipos == null ? "" : Equipos),
                    new SqlParameter("FechaInicio", FechaInicial),
                    new SqlParameter("FechaFin", FechaFinal),
                    new SqlParameter("UsuCod", DataUser.Id),
                }).ToList<ReporteGeneralList>();

            }
            catch (Exception e)
            {
            }

            return View(model);
        }

    }
}