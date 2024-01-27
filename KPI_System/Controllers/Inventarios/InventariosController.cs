using KPI_System.Filters;
using KPI_System.Models.ClassesGlobales;
using KPI_System.Models.Cumplimiento;
using KPI_System.Models.Globales;
using KPI_System.Models.Inventarios;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KPI_System.Controllers.Inventarios
{
    [SessionFilter]
    public class InventariosController : DataBaseController
    {
        // GET: Inventarios
        public ActionResult Index()
        {
            var model = new InventariosViewModel();


            var DataUser = (System_User)Session["UserData"];

            model.Divisiones = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Inventarios @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
            {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", DataUser.Id),
            }).ToList<Select2>();

            return View(model);
        }

        [HttpPost]
        public ActionResult Index(int TipoPartida, string[] EquiposSelect)
        {
            var model = new InventariosViewModel();

            model.TipoPartida = TipoPartida;
            string Almacenes = string.Join(",", EquiposSelect);


            var DataUser = (System_User)Session["UserData"];

            model.Divisiones = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Inventarios @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
            {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", DataUser.Id),
            }).ToList<Select2>();


            model.InventarioReport = _dbTb4.Database.SqlQuery<InventarioReport>("EXEC Sp_NewIndicadores_Inventarios @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @TipoPartida=@TipoPartida, @Almacenes=@Almacenes ", new object[]
            {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 3),
                new SqlParameter("TipoPartida", TipoPartida),
                new SqlParameter("Almacenes", Almacenes),
                new SqlParameter("UsuCod", DataUser.Id),
            }).ToList<InventarioReport>();


            return View(model);
        }

        [HttpPost]
        public ActionResult GetUnidadesOperativas(int TipoPeticion, string DivisionsSeleted)
        {
            var DataUser = (System_User)Session["UserData"];

            var Result = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Inventarios @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion, @Divisiones=@Divisiones ", new object[]
             {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 2),
                new SqlParameter("Divisiones", DivisionsSeleted),
             }).ToList<Select2>();

            return Json(Result);
        }


    }
}

