using KPI_System.Filters;
using KPI_System.Models.ClassesGlobales;
using KPI_System.Models.Fallas;
using KPI_System.Models.Globales;
using KPI_System.Models.VentasRentas;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KPI_System.Controllers.Fallas
{
    [SessionFilter]
    public class FallasController : DataBaseController
    {
        // GET: Fallas
        public ActionResult Index()
        {
            var DataUser = (System_User)Session["UserData"];

            return View(DataUser);
        }

        [HttpPost]
        public ActionResult FallasFiltro(int TipoPeticion, string Fecha, string Equipos)
        {
            var model = new FallasViewModel();

            var FechaInicio = Fecha.Split('-')[0];
            var FechaFin = Fecha.Split('-')[1];

            var result = "";

            var DataUser = (System_User)Session["UserData"];

            try
            {
                //Filtros
                model.Fallas = _dbTb4.Database.SqlQuery<Failure>("EXEC Sp_NewIndicadores_Fallas @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion, @UsuCod=@UsuCod, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin, @Equipo=@Equipo ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 1),
                    new SqlParameter("Opcion", 1),
                    new SqlParameter("UsuCod", DataUser.Id),
                    new SqlParameter("FechaInicio", FechaInicio),
                    new SqlParameter("FechaFin", FechaFin),
                     new SqlParameter("Equipo", Equipos),
                }).ToList<Failure>();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                result = "Error";
                return Json(result);
            }

        }

        [HttpPost]
        public ActionResult GetEquiposByPeriodo(int TipoPeticion, string RangoFechas)
        {
            var DataUser = (System_User)Session["UserData"];

            var FechaInicial = RangoFechas.Split('-')[0];
            var FechaFinal = RangoFechas.Split('-')[1];

            var Result = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Fallas @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion,  @UsuCod=@UsuCod,  @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
             {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 2),
                 new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("FechaInicio", FechaInicial),
                new SqlParameter("FechaFin", FechaFinal),

             }).ToList<Select2>();

            return Json(Result);
        }

        [HttpPost]
        public ActionResult GetPartDanadasPerdidas(int TipoPeticion, string Fecha, string Equipo)
        {
            var DataUser = (System_User)Session["UserData"];

            var FechaInicial = Fecha.Split('-')[0];
            var FechaFinal = Fecha.Split('-')[1];

            Equipo = Equipo == "Talleres" ? "0" : Equipo;

            var Result = _dbTb4.Database.SqlQuery<DanadasPerdidas>("EXEC Sp_NewIndicadores_Fallas @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion,  @UsuCod=@UsuCod,  @FechaInicio=@FechaInicio, @FechaFin=@FechaFin,  @Equipo=@Equipo", new object[]
             {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 3),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("FechaInicio", FechaInicial),
                new SqlParameter("FechaFin", FechaFinal),
                new SqlParameter("Equipo", Equipo),
             }).ToList<DanadasPerdidas>();

            return Json(Result);
        }


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////// REPORTE FALLAS ///////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        public ActionResult ReporteFallas()
        {
            var DataUser = (System_User)Session["UserData"];

            var model = new FallasViewModel();

            model.Divisiones = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Fallas @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", DataUser.Id),
            }).ToList<Select2>();


            return View(model);
        }

        [HttpPost]
        public ActionResult ReporteFallas(string RangoFechas, string[] EquiposSelect)
        {
            string Equipos = string.Join(",", EquiposSelect);

            var model = new FallasViewModel();
            var result = "";

            var FechaInicial = RangoFechas.Split('-')[0];
            var FechaFinal = RangoFechas.Split('-')[1];

            model.ReportePerido = "Periodo: " + RangoFechas;

            var DataUser = (System_User)Session["UserData"];

            model.Divisiones = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Fallas @ExecuteQuery=@ExecuteQuery, " +
           "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
           {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", DataUser.Id),
           }).ToList<Select2>();

            model.Equipos = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Fallas  @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod, @Equipo=@Equipo, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 6),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Equipo", Equipos),
                new SqlParameter("FechaInicio", FechaInicial),
                new SqlParameter("FechaFin", FechaFinal),
            }).ToList<Select2>();

            model.EmpleadosPMX = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Fallas  @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod, @Equipo=@Equipo,  @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 5),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Equipo", Equipos),
                new SqlParameter("FechaInicio", FechaInicial),
                new SqlParameter("FechaFin", FechaFinal),
            }).ToList<Select2>();

            try
            {
                //Tablas
                model.ReporteFallas = _dbTb4.Database.SqlQuery<ReporteFallas>("EXEC Sp_NewIndicadores_Fallas @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion, @UsuCod=@UsuCod, @Equipo=@Equipo, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 2),
                    new SqlParameter("Opcion", 4),
                    new SqlParameter("Equipo", Equipos),
                    new SqlParameter("FechaInicio", FechaInicial),
                    new SqlParameter("FechaFin", FechaFinal),
                    new SqlParameter("UsuCod", DataUser.Id),

                }).ToList<ReporteFallas>();

            }
            catch (Exception e)
            {
                result = "Error";
            }

            return View(model);

        }

        [HttpPost]
        public ActionResult GetUnidadesOperativas(int TipoPeticion, string DivisionsSeleted)
        {
            var DataUser = (System_User)Session["UserData"];

            var Result = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Fallas @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion, @Divisiones=@Divisiones ", new object[]
             {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 2),
                new SqlParameter("Divisiones", DivisionsSeleted),
             }).ToList<Select2>();

            return Json(Result);
        }

        [HttpPost]
        public ActionResult GetEquiposFallas(string RangoFechas, int TipoPeticion, string UniOperativaSeleted)
        {
            var DataUser = (System_User)Session["UserData"];

            var FechaInicial = RangoFechas.Split('-')[0];
            var FechaFinal = RangoFechas.Split('-')[1];

            var Result = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Fallas @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion, @UsuCod=@UsuCod, @UniOperativa=@UniOperativa,  @FechaInicio=@FechaInicio, @FechaFin=@FechaFin  ", new object[]
             {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 3),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("UniOperativa", UniOperativaSeleted),
                new SqlParameter("FechaInicio", FechaInicial),
                new SqlParameter("FechaFin", FechaFinal),
             }).ToList<Select2>();

            return Json(Result);
        }


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////// TOP SOLICITANTES QUE MAS DAÑAN ///////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        public ActionResult SolicitantesMasPierden()
        {
            var DataUser = (System_User)Session["UserData"];

            var Model = new List<SolicitantesPierden>();

            Model = _dbTb4.Database.SqlQuery<SolicitantesPierden>("EXEC Sp_NewIndicadores_Fallas @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion, @UsuCod=@UsuCod  ", new object[]
             {
                    new SqlParameter("ExecuteQuery", 3),
                    new SqlParameter("Opcion", 1),
                    new SqlParameter("UsuCod", DataUser.Id),
             }).ToList<SolicitantesPierden>();


            return View(Model);
        }

        [HttpPost]
        public ActionResult GetPerdida(int TipoPeticion, string Solicitante)
        {
            var DataUser = (System_User)Session["UserData"];

            var Model = new List<ReporteFallas>();

            Model = _dbTb4.Database.SqlQuery<ReporteFallas>("EXEC Sp_NewIndicadores_Fallas @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion, @Solicitante=@Solicitante ", new object[]
             {
                    new SqlParameter("ExecuteQuery", 3),
                    new SqlParameter("Opcion", 2),
                    new SqlParameter("Solicitante", Solicitante),
             }).ToList<ReporteFallas>();

            return Json(Model);
        }


    }
}