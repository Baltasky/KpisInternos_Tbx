using KPI_System.Models.ClassesGlobales;
using KPI_System.Models.ReporteConsumos;
using KPI_System.Models.ReporteEjecutivoRentas;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KPI_System.Filters;

namespace KPI_System.Controllers.ReporteEjecutivoRentas
{
    [SessionFilter]
    public class ReporteEjecutivoRentasController : DataBaseController
    {
        // GET: ReporteEjecutivoRentas
        public ActionResult Index()
        {
            var model = new ReporteEjecutivoRentasViewModel();
            var DataUser = (System_User)Session["UserData"];

            int year = DateTime.Now.Year;

            model.BdPorZona = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();

            model.BdPorUnidadOperativa = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
               new SqlParameter("ExecuteQuery", 2),
               new SqlParameter("Opcion", 2),
                new SqlParameter("UsuCod", DataUser.Id),
               new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();

            model.BdPorEquipo = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
           "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
           {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 3),
               new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
           }).ToList<ReporteEjecutivoRentasList>();

            model.BdTotales = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 4),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();


            model.HidrosPorZona = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                            new SqlParameter("ExecuteQuery", 3),
                            new SqlParameter("Opcion", 1),
                            new SqlParameter("UsuCod", DataUser.Id),
                            new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();

            model.HidrosPorUnidadOperativa = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
               new SqlParameter("ExecuteQuery", 3),
               new SqlParameter("Opcion", 2),
                new SqlParameter("UsuCod", DataUser.Id),
               new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();

            model.HidrosPorEquipo = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
           "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
           {
                new SqlParameter("ExecuteQuery", 3),
                new SqlParameter("Opcion", 3),
               new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
           }).ToList<ReporteEjecutivoRentasList>();

            model.HidrosTotales = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 3),
                new SqlParameter("Opcion", 4),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();



            model.HttsEspecialesPorZona = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 4),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();

            model.HttsEspecialesPorUnidadOperativa = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
               new SqlParameter("ExecuteQuery", 4),
               new SqlParameter("Opcion", 2),
                new SqlParameter("UsuCod", DataUser.Id),
               new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();

            model.HttsEspecialesPorEquipo = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
           "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
           {
                new SqlParameter("ExecuteQuery", 4),
                new SqlParameter("Opcion", 3),
               new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
           }).ToList<ReporteEjecutivoRentasList>();

            model.HttsEspecialesTotales = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 4),
                new SqlParameter("Opcion", 4),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();





            return View(model);
        }
        [HttpPost]
        public ActionResult Index(int year)
        {
            var model = new ReporteEjecutivoRentasViewModel();
            var DataUser = (System_User)Session["UserData"];

            model.BdPorZona = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();

            model.BdPorUnidadOperativa = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
               new SqlParameter("ExecuteQuery", 2),
               new SqlParameter("Opcion", 2),
                new SqlParameter("UsuCod", DataUser.Id),
               new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();

            model.BdPorEquipo = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
           "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
           {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 3),
               new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
           }).ToList<ReporteEjecutivoRentasList>();

            model.BdTotales = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 4),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();


            model.HidrosPorZona = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                            new SqlParameter("ExecuteQuery", 3),
                            new SqlParameter("Opcion", 1),
                            new SqlParameter("UsuCod", DataUser.Id),
                            new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();

            model.HidrosPorUnidadOperativa = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
               new SqlParameter("ExecuteQuery", 3),
               new SqlParameter("Opcion", 2),
                new SqlParameter("UsuCod", DataUser.Id),
               new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();

            model.HidrosPorEquipo = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
           "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
           {
                new SqlParameter("ExecuteQuery", 3),
                new SqlParameter("Opcion", 3),
               new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
           }).ToList<ReporteEjecutivoRentasList>();

            model.HidrosTotales = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 3),
                new SqlParameter("Opcion", 4),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();



            model.HttsEspecialesPorZona = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 4),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();

            model.HttsEspecialesPorUnidadOperativa = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
               new SqlParameter("ExecuteQuery", 4),
               new SqlParameter("Opcion", 2),
                new SqlParameter("UsuCod", DataUser.Id),
               new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();

            model.HttsEspecialesPorEquipo = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
           "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
           {
                new SqlParameter("ExecuteQuery", 4),
                new SqlParameter("Opcion", 3),
               new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
           }).ToList<ReporteEjecutivoRentasList>();

            model.HttsEspecialesTotales = _dbTb4.Database.SqlQuery<ReporteEjecutivoRentasList>("EXEC Sp_NewIndicadores_ReporteConsumo @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @Ano=@Ano ", new object[]
            {
                new SqlParameter("ExecuteQuery", 4),
                new SqlParameter("Opcion", 4),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("Ano", year),
            }).ToList<ReporteEjecutivoRentasList>();





            return View(model);
        }

    }
}