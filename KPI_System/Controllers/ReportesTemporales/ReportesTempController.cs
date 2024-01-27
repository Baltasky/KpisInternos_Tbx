using KPI_System.Models.ClassesGlobales;
using KPI_System.Models.Globales;
using KPI_System.Models.VentasRentas;
using SpreadsheetLight;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KPI_System.Models.Inventarios;

namespace KPI_System.Controllers.ReportesTemporales
{
    public class ReportesTempController : DataBaseController
    {

        // GET: Inventarios
        public ActionResult Index()
        {
            var model = new InventariosViewModel();

            model.Divisiones = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Inventarios @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
            {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", 4),
            }).ToList<Select2>();

            return View(model);
        }

        [HttpPost]
        public ActionResult Index(int TipoPartida, string[] EquiposSelect)
        {
            var model = new InventariosViewModel();

            model.TipoPartida = TipoPartida;
            string Almacenes = string.Join(",", EquiposSelect);

            model.Divisiones = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Inventarios @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
            {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", 4),
            }).ToList<Select2>();


            model.InventarioReport = _dbTb4.Database.SqlQuery<InventarioReport>("EXEC Sp_NewIndicadores_Inventarios @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion, @UsuCod=@UsuCod, @TipoPartida=@TipoPartida, @Almacenes=@Almacenes ", new object[]
            {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 3),
                new SqlParameter("TipoPartida", TipoPartida),
                new SqlParameter("Almacenes", Almacenes),
                new SqlParameter("UsuCod", 4),
            }).ToList<InventarioReport>();


            return View(model);
        }

        [HttpPost]
        public ActionResult GetUnidadesOperativa(int TipoPeticion, string DivisionsSeleted)
        {
            var Result = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Inventarios @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion, @Divisiones=@Divisiones ", new object[]
             {
                new SqlParameter("ExecuteQuery", 1),
                new SqlParameter("Opcion", 2),
                new SqlParameter("Divisiones", DivisionsSeleted),
             }).ToList<Select2>();

            return Json(Result);
        }

        // GET: ReportesTemp
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////// REPORTE VENTAS ///////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        public ActionResult ReporteVentas()
        {
            var model = new ReportesViewModel();

            model.Divisiones = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", 4),
            }).ToList<Select2>();


            return View(model);
        }

        [HttpPost]
        public ActionResult ReporteVentas(int FechaMes, int FechaAnio, string[] TipoPartidaVentas, string[] EquiposSelect)
        {
            string Equipos = string.Join(",", EquiposSelect);
            string TipoPartida = string.Join(",", TipoPartidaVentas);

            var model = new ReportesViewModel();
            var result = "";

            DateTime primerDiaDelMes = new DateTime(FechaAnio, FechaMes, 1);
            DateTime ultimoDiaDelMes = primerDiaDelMes.AddMonths(1).AddDays(-1);

            //01 / 11 / 2023 - 30 / 11 / 2023
            var FechaInicial = primerDiaDelMes.ToString("dd/MM/yyyy");
            var FechaFinal = ultimoDiaDelMes.ToString("dd/MM/yyyy");

            model.ReportePerido = "Periodo: " + FechaInicial + " - " + FechaFinal;


            model.Divisiones = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", 4),
            }).ToList<Select2>();

            model.Equipos = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod, @Equipo=@Equipo, @TipoPartida=@TipoPartida,  @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 6),
                new SqlParameter("UsuCod", 4),
                new SqlParameter("Equipo", Equipos == null ? "" : Equipos),
                new SqlParameter("TipoPartida", TipoPartida == null ? "" : TipoPartida),
                new SqlParameter("FechaInicio", FechaInicial),
                new SqlParameter("FechaFin", FechaFinal),
            }).ToList<Select2>();

            try
            {
                //Tablas
                model.ReporteVentas = _dbTb4.Database.SqlQuery<ReporteVentas>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion,  @UsuCod=@UsuCod, @Equipo=@Equipo, @TipoPartida=@TipoPartida, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 2),
                    new SqlParameter("Opcion", 4),
                    new SqlParameter("Equipo", Equipos == null ? "" : Equipos),
                    new SqlParameter("TipoPartida", TipoPartida == null ? "" : TipoPartida),
                    new SqlParameter("FechaInicio", FechaInicial),
                    new SqlParameter("FechaFin", FechaFinal),
                    new SqlParameter("UsuCod", 4),

                }).ToList<ReporteVentas>();

            }
            catch (Exception e)
            {
                result = "Error";
            }

            return View(model);

        }

        [HttpPost]
        public ActionResult DescargarReporteVentas()
        {
            var model = new ReportesViewModel();

            try
            {
                //Tablas
                model.ReporteVentas = _dbTb4.Database.SqlQuery<ReporteVentas>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 2),
                    new SqlParameter("Opcion", 5),
                    new SqlParameter("UsuCod", 4),

                }).ToList<ReporteVentas>();


                //using SpreadsheetLight;
                SLDocument oSLDocument = new SLDocument();
                System.Data.DataTable dt = new System.Data.DataTable();

                // Encabezados
                dt.Columns.Add("ZONA", typeof(string));
                dt.Columns.Add("UNIDADOPERATIVA", typeof(string));
                dt.Columns.Add("LOCALIZACION", typeof(string));
                dt.Columns.Add("EQUIPO", typeof(string));
                dt.Columns.Add("FOLIO", typeof(string));
                dt.Columns.Add("FECHA", typeof(string));
                dt.Columns.Add("PARTIDA", typeof(string));
                //dt.Columns.Add("DESCRIPCION", typeof(string));
                dt.Columns.Add("CANTIDAD", typeof(decimal));
                dt.Columns.Add("PRECIO", typeof(decimal));
                dt.Columns.Add("IMPORTE", typeof(decimal));
                dt.Columns.Add("SOLICITANTEPMX", typeof(string));
                dt.Columns.Add("PUESTOSOLICITANTEPMX", typeof(string));
                dt.Columns.Add("AUTORIZADORPMX", typeof(string));
                dt.Columns.Add("PUESTOAUTORIZADORPMX", typeof(string));
                dt.Columns.Add("TECNICO", typeof(string));


                //// Agregar las filas al DataTable
                foreach (var item in model.ReporteVentas)
                {
                    DataRow fila = dt.NewRow();

                    fila["ZONA"] = item.Division;
                    fila["UNIDADOPERATIVA"] = item.UOP;
                    fila["LOCALIZACION"] = item.Localizacion;
                    fila["EQUIPO"] = item.Equipo;
                    fila["FOLIO"] = item.Folio;
                    fila["FECHA"] = item.Fecha;
                    fila["PARTIDA"] = item.Partida;
                    //fila["DESCRIPCION"] = item.Descripcion;
                    fila["CANTIDAD"] = item.Cantidad == null ? 0 : item.Cantidad;
                    fila["PRECIO"] = item.Precio == null ? 0 : item.Precio;
                    fila["IMPORTE"] = item.Importe == null ? 0 : item.Importe;
                    fila["SOLICITANTEPMX"] = item.PersonalPmX;
                    fila["PUESTOSOLICITANTEPMX"] = item.Puesto;
                    fila["AUTORIZADORPMX"] = item.Autoriza;
                    fila["PUESTOAUTORIZADORPMX"] = item.PuestoAut;
                    fila["TECNICO"] = item.Tecnico;

                    dt.Rows.Add(fila);
                }

                oSLDocument.ImportDataTable(1, 1, dt, true);

                // Guardar el libro de trabajo en un MemoryStream
                using (var memoryStream = new MemoryStream())
                {
                    oSLDocument.SaveAs(memoryStream);
                    // Devolver el archivo Excel como una descarga
                    return File(memoryStream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "archivo_excel.xlsx");
                }

            }
            catch (Exception e)
            {
            }

            return View(model);

        }

        [HttpPost]
        public ActionResult GetUnidadesOperativas(int TipoPeticion, string DivisionsSeleted)
        {
            var Result = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion, @Divisiones=@Divisiones ", new object[]
             {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 2),
                new SqlParameter("Divisiones", DivisionsSeleted),
             }).ToList<Select2>();

            return Json(Result);
        }

        [HttpPost]
        public ActionResult GetEquipos(int FechaMes, int FechaAnio, int TipoPeticion, string UniOperativaSeleted)
        {

            DateTime primerDiaDelMes = new DateTime(FechaAnio, FechaMes, 1);
            DateTime ultimoDiaDelMes = primerDiaDelMes.AddMonths(1).AddDays(-1);

            //01 / 11 / 2023 - 30 / 11 / 2023
            var FechaInicial = primerDiaDelMes.ToString("dd/MM/yyyy");
            var FechaFinal = ultimoDiaDelMes.ToString("dd/MM/yyyy");

            var Result = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion, @UniOperativa=@UniOperativa,  @FechaInicio=@FechaInicio, @FechaFin=@FechaFin  ", new object[]
             {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 3),
                new SqlParameter("UniOperativa", UniOperativaSeleted),
                new SqlParameter("FechaInicio", FechaInicial),
                new SqlParameter("FechaFin", FechaFinal),
             }).ToList<Select2>();

            return Json(Result);
        }


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////// REPORTE RENTAS ///////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        public ActionResult ReporteRentas()
        {
            var model = new ReportesViewModel();


            model.Divisiones = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", 4),

            }).ToList<Select2>();

            return View(model);
        }

        [HttpPost]
        public ActionResult ReporteRentas(string RangoFechas, string[] TipoPartidaVentas, string[] EquiposSelect)
        {
            string Equipos = string.Join(",", EquiposSelect);
            string TipoPartida = string.Join(",", TipoPartidaVentas);

            var model = new ReportesViewModel();
            var result = "";

            var FechaInicial = RangoFechas.Split('-')[0];
            var FechaFinal = RangoFechas.Split('-')[1];

            model.ReportePerido = "Periodo: " + RangoFechas;


            model.Divisiones = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", 4),

            }).ToList<Select2>();

            model.Equipos = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod, @Equipo=@Equipo, @TipoPartida=@TipoPartida, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
            {
                new SqlParameter("ExecuteQuery", 3),
                new SqlParameter("Opcion", 3),
                new SqlParameter("UsuCod", 4),
                new SqlParameter("Equipo", Equipos == null ? "" : Equipos),
                new SqlParameter("TipoPartida", TipoPartida == null ? "" : TipoPartida),
                new SqlParameter("FechaInicio", FechaInicial),
                new SqlParameter("FechaFin", FechaFinal),
            }).ToList<Select2>();

            try
            {
                //Tablas
                model.ReporteRentas = _dbTb4.Database.SqlQuery<ReporteRentas>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion,  @UsuCod=@UsuCod, @Equipo=@Equipo, @TipoPartida=@TipoPartida, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 3),
                    new SqlParameter("Opcion", 2),
                    new SqlParameter("Equipo", Equipos == null ? "" : Equipos),
                    new SqlParameter("TipoPartida", TipoPartida == null ? "" : TipoPartida),
                    new SqlParameter("FechaInicio", FechaInicial),
                    new SqlParameter("FechaFin", FechaFinal),
                     new SqlParameter("UsuCod", 4),
                }).ToList<ReporteRentas>();

            }
            catch (Exception e)
            {
                result = "Error";
            }

            return View(model);
        }

        [HttpPost]
        public ActionResult GetEquiposRentas(string RangoFechas, int TipoPeticion, string UniOperativaSeleted)
        {
            var FechaInicial = RangoFechas.Split('-')[0];
            var FechaFinal = RangoFechas.Split('-')[1];

            var Result = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion, @UniOperativa=@UniOperativa,  @FechaInicio=@FechaInicio, @FechaFin=@FechaFin  ", new object[]
             {
                new SqlParameter("ExecuteQuery", 3),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UniOperativa", UniOperativaSeleted),
                new SqlParameter("FechaInicio", FechaInicial),
                new SqlParameter("FechaFin", FechaFinal),
             }).ToList<Select2>();

            return Json(Result);
        }


    }
}