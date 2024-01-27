using KPI_System.Filters;
using KPI_System.Models.VentasRentas;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KPI_System.Models.ReporteConsumos;
using KPI_System.Models.ClassesGlobales;
using DocumentFormat.OpenXml.Bibliography;

namespace KPI_System.Controllers.ReporteConsumos
{
    [SessionFilter]
    public class ReporteConsumosController : DataBaseController
    {
        public ActionResult Index()
        {
            var model = new ReporteConsumoViewModel();
            var DataUser = (System_User)Session["UserData"];

            int year = DateTime.Now.Year;

            model.PorZona = _dbTb4.Database.SqlQuery<ReporteConsumoList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteConsumoList>();

            model.PorUnidadOperativa = _dbTb4.Database.SqlQuery<ReporteConsumoList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
               new SqlParameter("ExecuteQuery", 1),
               new SqlParameter("Opcion", 2),
                new SqlParameter("UsuCod", DataUser.Id),
               new SqlParameter("Ano", year),
            }).ToList<ReporteConsumoList>();

            model.PorEquipo = _dbTb4.Database.SqlQuery<ReporteConsumoList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
           "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
           {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 3),
               new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
           }).ToList<ReporteConsumoList>();

            model.Totales = _dbTb4.Database.SqlQuery<ReporteConsumoList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 4),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteConsumoList>();

            return View(model);
        }

        [HttpPost]
        public ActionResult Index(int year)
        {
            var model = new ReporteConsumoViewModel();
            var DataUser = (System_User)Session["UserData"];

            model.PorZona = _dbTb4.Database.SqlQuery<ReporteConsumoList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteConsumoList>();

            model.PorUnidadOperativa = _dbTb4.Database.SqlQuery<ReporteConsumoList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
               new SqlParameter("ExecuteQuery", 1),
               new SqlParameter("Opcion", 2),
               new SqlParameter("UsuCod", DataUser.Id),
               new SqlParameter("Ano", year),
            }).ToList<ReporteConsumoList>();

             model.PorEquipo = _dbTb4.Database.SqlQuery<ReporteConsumoList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 3),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteConsumoList>();

            model.Totales = _dbTb4.Database.SqlQuery<ReporteConsumoList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 4),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteConsumoList>();

            return View(model);
        }




    }
}