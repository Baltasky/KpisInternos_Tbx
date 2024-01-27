using KPI_System.Filters;
using KPI_System.Models.ClassesGlobales;
using KPI_System.Models.Trazabilidad;
using KPI_System.Models.VentasRentas;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KPI_System.Controllers.Trazabilidad
{
    [SessionFilter]
    public class TrazabilidadController : DataBaseController
    {
        // GET: Trazabilidad
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult TrazabilidadFiltro(int TipoPeticion, string Fecha)
        {
            var model = new TrazabilidadFiltrosViewModel();
            var result = "";

            var FechaInicio = Fecha.Split('-')[0];
            var FechaFin = Fecha.Split('-')[1];

            var MesAnterior = Convert.ToInt16(FechaInicio.Split('/')[1]) == 1 ? 12 : Convert.ToInt16(FechaInicio.Split('/')[1]) - 1;
            var AnoAnterior = Convert.ToInt16(FechaInicio.Split('/')[1]) == 1 ? Convert.ToInt16(FechaInicio.Split('/')[2]) - 1 : Convert.ToInt16(FechaInicio.Split('/')[2]);

            var DataUser = (System_User)Session["UserData"];

            try
            {
                //Filtros
                model.Actual = _dbTb4.Database.SqlQuery<TrazabilidadFiltro>("EXEC Sp_NewIndicadores_Trazabilidad @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion,  @UsuCod=@UsuCod , @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 1),
                    new SqlParameter("Opcion", 1),
                    new SqlParameter("UsuCod", DataUser.Id),
                    new SqlParameter("FechaInicio", FechaInicio),
                    new SqlParameter("FechaFin", FechaFin)
                }).ToList<TrazabilidadFiltro>();

                model.Anterior = _dbTb4.Database.SqlQuery<TrazabilidadFiltro>("EXEC Sp_NewIndicadores_Trazabilidad @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion,  @UsuCod=@UsuCod, @Mes=@Mes, @Ano=@Ano ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 1),
                    new SqlParameter("Opcion", 2),
                    new SqlParameter("UsuCod", DataUser.Id),
                    new SqlParameter("Mes", MesAnterior),
                    new SqlParameter("Ano", AnoAnterior)
                }).ToList<TrazabilidadFiltro>();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                result = "Error";
                return Json(result);
            }

        }


        [HttpPost]
        public ActionResult TrazabilidadTablas(int TipoPeticion,  string Fecha)
        {
            var model = new TrazabilidadTablasViewModel();
            var result = "";

            var FechaInicio = Fecha.Split('-')[0];
            var FechaFin = Fecha.Split('-')[1];

            var DataUser = (System_User)Session["UserData"];

            try
            {
                //Tablas
                model.PartidasUtilizadas = _dbTb4.Database.SqlQuery<PartidasUtilizadas>("EXEC Sp_NewIndicadores_Trazabilidad @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion, @UsuCod=@UsuCod, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
                {
                     new SqlParameter("ExecuteQuery", 1),
                     new SqlParameter("Opcion", 3),
                      new SqlParameter("UsuCod", DataUser.Id),
                     new SqlParameter("FechaInicio", FechaInicio),
                     new SqlParameter("FechaFin", FechaFin)
                }).ToList<PartidasUtilizadas>();

                model.HerramientasXclasificacion = _dbTb4.Database.SqlQuery<HerramientasXclasificacion>("EXEC Sp_NewIndicadores_Trazabilidad  @ExecuteQuery=@ExecuteQuery, " +
               "@Opcion=@Opcion, @UsuCod=@UsuCod, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
               {
                     new SqlParameter("ExecuteQuery", 1),
                     new SqlParameter("Opcion", 4),
                      new SqlParameter("UsuCod", DataUser.Id),
                     new SqlParameter("FechaInicio", FechaInicio),
                     new SqlParameter("FechaFin", FechaFin)
               }).ToList<HerramientasXclasificacion>();

                model.PorcentajeUtilizacion = _dbTb4.Database.SqlQuery<PorcentajeUtilizacion>("EXEC Sp_NewIndicadores_Trazabilidad  @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion, @UsuCod=@UsuCod, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
                {
                     new SqlParameter("ExecuteQuery", 1),
                     new SqlParameter("Opcion", 5),
                      new SqlParameter("UsuCod", DataUser.Id),
                     new SqlParameter("FechaInicio", FechaInicio),
                     new SqlParameter("FechaFin", FechaFin)
                }).ToList<PorcentajeUtilizacion>();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                result = "Error";
                return Json(result);
            }
        }


    }
}