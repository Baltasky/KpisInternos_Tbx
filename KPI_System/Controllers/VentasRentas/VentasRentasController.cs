using KPI_System.Filters;
using KPI_System.Models;
using KPI_System.Models.ClassesGlobales;
using KPI_System.Models.Globales;
using KPI_System.Models.VentasRentas;
using Microsoft.Office.Interop.Excel;
using OfficeOpenXml;
using SpreadsheetLight;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KPI_System.Controllers
{
    [SessionFilter]
    public class VentasRentasController : DataBaseController
    {
        //[Authorize]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult VentasRentasFiltro(int TipoPeticion, string Fecha, string Equipos)
        {
            var model = new VentasRentasFiltroViewModel();
            var result = "";

            var FechaInicio = Fecha.Split('-')[0];
            var FechaFin = Fecha.Split('-')[1];

            var MesAnterior = Convert.ToInt16(FechaInicio.Split('/')[1]) == 1 ? 12 : Convert.ToInt16(FechaInicio.Split('/')[1]) - 1;
            var AnoAnterior = Convert.ToInt16(FechaInicio.Split('/')[1]) == 1 ? Convert.ToInt16(FechaInicio.Split('/')[2]) - 1 : Convert.ToInt16(FechaInicio.Split('/')[2]);

            var DataUser = (System_User)Session["UserData"];

            try
            {
                //Filtros
                model.Actual = _dbTb4.Database.SqlQuery<VentasRentas>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion,  @UsuCod=@UsuCod , @FechaInicio=@FechaInicio, @FechaFin=@FechaFin, @Equipo=@Equipo", new object[]
                {
                    new SqlParameter("ExecuteQuery", 1),
                    new SqlParameter("Opcion", 1),
                    new SqlParameter("UsuCod", DataUser.Id),
                    new SqlParameter("FechaInicio", FechaInicio),
                    new SqlParameter("FechaFin", FechaFin),
                    new SqlParameter("Equipo", Equipos),
                }).ToList<VentasRentas>();

                model.Anterior = _dbTb4.Database.SqlQuery<VentasRentas>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion,  @UsuCod=@UsuCod, @Mes=@Mes, @Ano=@Ano, @Equipo=@Equipo ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 1),
                    new SqlParameter("Opcion", 2),
                    new SqlParameter("UsuCod", DataUser.Id),
                    new SqlParameter("Mes", MesAnterior),
                    new SqlParameter("Ano", AnoAnterior),
                    new SqlParameter("Equipo", Equipos),
                }).ToList<VentasRentas>();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                result = "Error";
                return Json(result);
            }

        }

        [HttpPost]
        public ActionResult VentaTablas(int TipoPeticion, string Fecha)
        {
            var model = new VentasRentasTablasViewModel();
            var result = "";

            var FechaInicio = Fecha.Split('-')[0];
            var FechaFin = Fecha.Split('-')[1];

            var DataUser = (System_User)Session["UserData"];

            try
            {
                //Top 10 mas vendido
                model.HerraPdaXCont = _dbTb4.Database.SqlQuery<ClasificacionHerraPdaXCont>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion, @UsuCod=@UsuCod, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 1),
                    new SqlParameter("Opcion", 3),
                    new SqlParameter("UsuCod", DataUser.Id),
                    new SqlParameter("FechaInicio", FechaInicio),
                    new SqlParameter("FechaFin", FechaFin)
                }).ToList<ClasificacionHerraPdaXCont>();

                //Ventas X clasificacion
                model.HerramientaSolicitud = _dbTb4.Database.SqlQuery<ClasificacionHerramientaSolicitud>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
               "@Opcion=@Opcion, @UsuCod=@UsuCod, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
               {
                     new SqlParameter("ExecuteQuery", 1),
                     new SqlParameter("Opcion", 4),
                      new SqlParameter("UsuCod", DataUser.Id),
                      new SqlParameter("FechaInicio", FechaInicio),
                    new SqlParameter("FechaFin", FechaFin)
               }).ToList<ClasificacionHerramientaSolicitud>();

                //Mas vendidos
                model.Solicitud = _dbTb4.Database.SqlQuery<Solicitud>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion, @UsuCod=@UsuCod, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
                {
                     new SqlParameter("ExecuteQuery", 1),
                     new SqlParameter("Opcion", 5),
                      new SqlParameter("UsuCod", DataUser.Id),
                       new SqlParameter("FechaInicio", FechaInicio),
                    new SqlParameter("FechaFin", FechaFin)
                }).ToList<Solicitud>();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                result = "Error";
                return Json(result);
            }
        }

        [HttpPost]//Primer filtro todos los equipos por periodo
        public ActionResult GetEquiposByPeriodo(int TipoPeticion, string RangoFechas)
        {
            var DataUser = (System_User)Session["UserData"];

            var FechaInicial = RangoFechas.Split('-')[0];
            var FechaFinal = RangoFechas.Split('-')[1];

            var Result = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion,  @UsuCod=@UsuCod,  @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
             {
                new SqlParameter("ExecuteQuery", 4),
                new SqlParameter("Opcion", 1),
                 new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("FechaInicio", FechaInicial),
                new SqlParameter("FechaFin", FechaFinal),

             }).ToList<Select2>();

            return Json(Result);
        }

        [HttpPost]//Modal perteneciente a el Top 10 de articulos mas vendidos
        public ActionResult GetPartUsadas(int TipoPeticion, string Fecha, string Equipo, string Partida)
        {
            var DataUser = (System_User)Session["UserData"];

            var FechaInicial = Fecha.Split('-')[0];
            var FechaFinal = Fecha.Split('-')[1];

            Equipo = Equipo == "Talleres" ? "0" : Equipo;

            var Result = _dbTb4.Database.SqlQuery<ReporteVentas>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion,  @UsuCod=@UsuCod,  @FechaInicio=@FechaInicio, @FechaFin=@FechaFin, @Equipo=@Equipo, @Partida=@Partida", new object[]
             {
                new SqlParameter("ExecuteQuery", 4),
                new SqlParameter("Opcion", 2),
                 new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("FechaInicio", FechaInicial),
                new SqlParameter("FechaFin", FechaFinal),
                new SqlParameter("Equipo", Equipo),
                new SqlParameter("Partida", Partida),
          
             }).ToList<ReporteVentas>();

            return Json(Result);
        }
      
        [HttpPost]//Modal perteneciente a las partidas utilizadas por clasificación
        public ActionResult GetPartUsadasXclasif(int TipoPeticion, string Fecha, string Equipo, int IdClasificacion)
        {
            var DataUser = (System_User)Session["UserData"];

            var FechaInicial = Fecha.Split('-')[0];
            var FechaFinal = Fecha.Split('-')[1];

            Equipo = Equipo == "Talleres" ? "0" : Equipo;

            var Result = _dbTb4.Database.SqlQuery<ReporteVentas>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion,  @UsuCod=@UsuCod,  @FechaInicio=@FechaInicio, @FechaFin=@FechaFin,  @Equipo=@Equipo, @IdClasificacion=@IdClasificacion", new object[]
             {
                new SqlParameter("ExecuteQuery", 4),
                new SqlParameter("Opcion", 3),
                 new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("FechaInicio", FechaInicial),
                new SqlParameter("FechaFin", FechaFinal),
                new SqlParameter("Equipo", Equipo),
                new SqlParameter("IdClasificacion", IdClasificacion),

             }).ToList<ReporteVentas>();

            return Json(Result);
        }

        [HttpPost] 
        public ActionResult GetPartidasXequipo(int TipoPeticion, string Fecha, string Equipo)
        {
            var DataUser = (System_User)Session["UserData"];

            var FechaInicial = Fecha.Split('-')[0];
            var FechaFinal = Fecha.Split('-')[1];

            Equipo = Equipo == "Talleres" ? "0" : Equipo;

            var Result = _dbTb4.Database.SqlQuery<ReporteVentas>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion,  @UsuCod=@UsuCod,  @FechaInicio=@FechaInicio, @FechaFin=@FechaFin,  @Equipo=@Equipo", new object[]
             {
                new SqlParameter("ExecuteQuery", 4),
                new SqlParameter("Opcion", 4),
                new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("FechaInicio", FechaInicial),
                new SqlParameter("FechaFin", FechaFinal),
                new SqlParameter("Equipo", Equipo),
             }).ToList<ReporteVentas>();

            return Json(Result);
        }

        [HttpPost]
        public ActionResult GetFolioXequipo(int TipoPeticion, string Fecha, string Equipo)
        {
            var DataUser = (System_User)Session["UserData"];

            var FechaInicial = Fecha.Split('-')[0];
            var FechaFinal = Fecha.Split('-')[1];

            Equipo = Equipo == "Talleres" ? "0" : Equipo;

            var Result = _dbTb4.Database.SqlQuery<ReporteVentas>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
             "@Opcion=@Opcion,  @UsuCod=@UsuCod,  @FechaInicio=@FechaInicio, @FechaFin=@FechaFin, @Equipo=@Equipo ", new object[]
             {
                new SqlParameter("ExecuteQuery", 4),
                new SqlParameter("Opcion", 5),
                 new SqlParameter("UsuCod", DataUser.Id),
                new SqlParameter("FechaInicio", FechaInicial),
                new SqlParameter("FechaFin", FechaFinal),
                new SqlParameter("Equipo", Equipo),

             }).ToList<ReporteVentas>();

            return Json(Result);
        }


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////// REPORTE VENTAS ///////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        public ActionResult ReporteVentas()
        {
            var model = new ReportesViewModel();

            var DataUser = (System_User)Session["UserData"];

            model.Divisiones = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", DataUser.Id),
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

            var DataUser = (System_User)Session["UserData"];

            model.Divisiones = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", DataUser.Id),
            }).ToList<Select2>();

            model.Equipos = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod, @Equipo=@Equipo, @TipoPartida=@TipoPartida,  @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 6),
                new SqlParameter("UsuCod", DataUser.Id),
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
                    new SqlParameter("UsuCod", DataUser.Id),

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
            var DataUser = (System_User)Session["UserData"];

            try
            {
                //Tablas
                model.ReporteVentas = _dbTb4.Database.SqlQuery<ReporteVentas>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
                "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
                {
                    new SqlParameter("ExecuteQuery", 2),
                    new SqlParameter("Opcion", 5),
                    new SqlParameter("UsuCod", DataUser.Id),

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
            var DataUser = (System_User)Session["UserData"];

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
            var DataUser = (System_User)Session["UserData"];

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

            var DataUser = (System_User)Session["UserData"];

            model.Divisiones = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", DataUser.Id),

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

            var DataUser = (System_User)Session["UserData"];

            model.Divisiones = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod ", new object[]
            {
                new SqlParameter("ExecuteQuery", 2),
                new SqlParameter("Opcion", 1),
                new SqlParameter("UsuCod", DataUser.Id),

            }).ToList<Select2>();

            model.Equipos = _dbTb4.Database.SqlQuery<Select2>("EXEC Sp_NewIndicadores_Ventas @ExecuteQuery=@ExecuteQuery, " +
            "@Opcion=@Opcion,  @UsuCod=@UsuCod, @Equipo=@Equipo, @TipoPartida=@TipoPartida, @FechaInicio=@FechaInicio, @FechaFin=@FechaFin ", new object[]
            {
                new SqlParameter("ExecuteQuery", 3),
                new SqlParameter("Opcion", 3),
                new SqlParameter("UsuCod", DataUser.Id),
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
                     new SqlParameter("UsuCod", DataUser.Id),
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
            var DataUser = (System_User)Session["UserData"];

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