using KPI_System.Filters;
using KPI_System.Models.ClassesGlobales;
using KPI_System.Models.ConcentradoBD;
using KPI_System.Models.Cumplimiento;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KPI_System.Controllers.ConcentradoBD
{
    [SessionFilter]
    public class ConcentradoBDController : DataBaseController
    {

        public ActionResult Index()
        {
            var model = new ConcentradoBD_ViewModel();


            return View(model);
        }

        [HttpPost]
        public ActionResult Index(string TipoPaquete)
        {
            var model = new ConcentradoBD_ViewModel();

            model.Tipo = TipoPaquete;

            model.Paquete = _dbTb4.Database.SqlQuery<CombosModel>("EXEC Sp_ConcentradoBDs @ExecuteQuery=@ExecuteQuery, " +
           "@Opcion=@Opcion, @TipoBd=@TipoBd", new object[]
           {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 4),
                new SqlParameter("TipoBd", TipoPaquete),
           }).ToList<CombosModel>();            
            
            model.PartidasDescripcion = _dbTb4.Database.SqlQuery<PartidasDescripcion>("EXEC Sp_ConcentradoBDs @ExecuteQuery=@ExecuteQuery, " +
           "@Opcion=@Opcion, @TipoBd=@TipoBd", new object[]
           {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 1),
                new SqlParameter("TipoBd", TipoPaquete),
           }).ToList<PartidasDescripcion>();

            model.InfoBases = _dbTb4.Database.SqlQuery<InfoBases>("EXEC Sp_ConcentradoBDs @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @TipoBd=@TipoBd ", new object[]
            {
                 new SqlParameter("ExecuteQuery", 1),
                 new SqlParameter("Opcion", 2),
                 new SqlParameter("TipoBd", TipoPaquete),
            }).ToList<InfoBases>();

            model.PartidasInf = _dbTb4.Database.SqlQuery<PartidasInf>("EXEC Sp_ConcentradoBDs @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion", new object[]
            {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 3),
            }).ToList<PartidasInf>();

            return View(model);
        }



    }
}