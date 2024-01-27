//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// GRAFICAS ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//********* Start Ingresos Totales ****************************************************************************************

var xAxisIngresosT;
var seriesIngresosT;
var ExportarDataZona;
am5.ready(function () {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    root._logo.dispose();

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
    }));

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        rotation: -45,
        paddingRight: 15
    });

    xRenderer.grid.template.setAll({
        location: 1
    })

    xAxisIngresosT = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "Zona",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
    }));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
        })
    }));

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    seriesIngresosT = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxisIngresosT,
        yAxis: yAxis,
        valueYField: "Partidas",
        sequencedInterpolation: true,
        categoryXField: "Zona",
        tooltip: am5.Tooltip.new(root, {
            labelText: "Partidas: {valueY}"
        })
    }));

    seriesIngresosT.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    seriesIngresosT.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(seriesIngresosT.columns.indexOf(target));
    });

    seriesIngresosT.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors").getIndex(seriesIngresosT.columns.indexOf(target));
    });

    // Set data
    var data = [];

    //Exportar
    function ExportarData(datos) {
        var exporting = am5plugins_exporting.Exporting.new(root, {
            menu: am5plugins_exporting.ExportingMenu.new(root, {}),
            dataSource: datos,
        });
    }

    ExportarDataZona = ExportarData;

    xAxisIngresosT.data.setAll(data);
    seriesIngresosT.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    seriesIngresosT.appear(1000);
    chart.appear(1000, 100);

});

//Actualizar los datos de la grafica de barras Ingresos Totales
function IngresosTotales(nuevosDatos) {
    xAxisIngresosT.data.setAll(nuevosDatos);
    seriesIngresosT.data.setAll(nuevosDatos);
    seriesIngresosT.appear(1000);

    ExportarDataZona(nuevosDatos)

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// DATATABLES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//********* Start DataTable  Partidas utilizadas por tipo de herramienta(Consumible y Herramienta) ****************************************************************************************var series;
var tPartidasUtilizadas = $("#tPartidasUtilizadas").DataTable({
    "info": true,
    'pageLength': 10,
    "language": {
        "lengthMenu": "Show _MENU_",
    },
    "dom":
        //"<'row'" +
        //"<'col-sm-6 d-flex align-items-center justify-conten-start'f>" +
        //">" +
        "<'table-responsive'tr>" +
        "<'row'" +
        "<'col-7  d-flex align-items-center justify-conten-start'i>" +
        "<'col-5  d-flex align-items-center justify-content-md-end'p>" +
        ">",
    "columnDefs": [
        {
            "targets": -1,  // Última columna
            "className": "text-end"
        }

    ]
});
//********* End DataTable  Partidas utilizadas por tipo de herramienta(Consumible y Herramienta) ****************************************************************************************;

//********* Start DataTable Herramientas utilizadas por clasificación ****************************************************************************************;
var tHerramientaXclasificacion = $("#tHerramientaXclasificacion").DataTable({
    'pageLength': 10,
    "language": {
        "lengthMenu": "Show _MENU_",
    },
    "dom":
        "<'table-responsive'tr>" +
        "<'row'" +
        "<'col-7  d-flex align-items-center justify-conten-start'i>" +
        "<'col-5  d-flex align-items-center justify-content-center justify-content-md-end'p>" +
        ">",
    "columnDefs": [
        {
            "targets": -1,  // Última columna
            "className": "text-end"
        }

    ]
});
//********* End DataTable Herramientas utilizadas por clasificación ****************************************************************************************

//********* Start DataTable Porcentajes de partidas utilizadas en el Mes ****************************************************************************************
var tPorcentajeUtilizacion = $("#tPorcentajeUtilizacion").DataTable({
    'pageLength': 10,
    "language": {
        "lengthMenu": "Show _MENU_",
    },
    "dom":
        "<'table-responsive'tr>" +
        "<'row'" +
        "<'col-7  d-flex align-items-center justify-conten-start'i>" +
        "<'col-5  d-flex align-items-center justify-content-center justify-content-md-end'p>" +
        ">",
    "columnDefs": [
        {
            "targets": -1,  // Última columna
            "className": "text-end"
        },
        {
            "targets": -2,  // Última columna
            "className": "text-end"
        },
        {
            "targets": -3,  // Última columna
            "className": "text-end"
        }
    ]
});
//********* End DataTable Porcentajes de partidas utilizadas en el Mes ****************************************************************************************

/*Buscar en los filtros*/
$(document).ready(function () {
    // Manejador de eventos para el input de filtro
    $('#SearchDivision').on('input', function () {
        var filtro = $(this).val().toLowerCase(); // Obtener el valor del input y convertirlo a minúsculas

        // Recorremos todas las filas de la tabla y mostramos u ocultamos según el filtro
        $('#TablaFiltroDivision tr').each(function () {
            var texto = $(this).text().toLowerCase(); // Obtener el texto de la fila en minúsculas

            // Si el texto de la fila contiene el filtro, mostrar la fila; de lo contrario, ocultarla
            if (texto.indexOf(filtro) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

$(document).ready(function () {
    // Manejador de eventos para el input de filtro
    $('#SearchZona').on('input', function () {
        var filtro = $(this).val().toLowerCase(); // Obtener el valor del input y convertirlo a minúsculas

        // Recorremos todas las filas de la tabla y mostramos u ocultamos según el filtro
        $('#TablaFiltroZona tr').each(function () {
            var texto = $(this).text().toLowerCase(); // Obtener el texto de la fila en minúsculas

            // Si el texto de la fila contiene el filtro, mostrar la fila; de lo contrario, ocultarla
            if (texto.indexOf(filtro) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

$(document).ready(function () {
    // Manejador de eventos para el input de filtro
    $('#SearchContenedor').on('input', function () {
        var filtro = $(this).val().toLowerCase(); // Obtener el valor del input y convertirlo a minúsculas

        // Recorremos todas las filas de la tabla y mostramos u ocultamos según el filtro
        $('#TablaFiltroContenedor tr').each(function () {
            var texto = $(this).text().toLowerCase(); // Obtener el texto de la fila en minúsculas

            // Si el texto de la fila contiene el filtro, mostrar la fila; de lo contrario, ocultarla
            if (texto.indexOf(filtro) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

/*Buscar en los filtros*/


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// FUNCIONES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    //Ocultar AsideMenu
    $("#kt_body").attr("data-kt-aside-minimize", "on");

    //Tablas flexibles
    $('.dataTables_scrollHeadInner').css('max-width', '100%');
    $('.dataTables_scrollHeadInner').css('min-width', '90%');

    GetTrazabilidad()
})

// Sirve para dar Formato a Fecha. ---------------------------------------------------------------------------------
var start = moment().startOf("month");  // Primer día del mes actual
var end = moment().endOf("month");      // Último día del mes actual

RangoFechas(start, end);

moment.locale('es'); // Establece el idioma en español

function RangoFechas(start, end) {
    $("#RangoFechas").html(start.format("DD/MM/YYYY") + " - " + end.format("DD/MM/YYYY"));
}

$("#RangoFechas").daterangepicker({
    startDate: start,
    endDate: end,
    ranges: {
        "Este mes": [moment().startOf("month"), moment().endOf("month")],
        "Mes pasado": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
    }
}, RangoFechas);

$(document).ready(function () {
    // Seleccionar el elemento <li> y cambiar su texto de "Rango de fechas" a "Custom Range"
    var elementoLi = $("li[data-range-key='Custom Range']");
    elementoLi.text('Rango de fechas');
});



//--------------------------------------------------------------------------------------------------------------

function GenerarExcel() {
    // Buscar el botón principal por su clase
    var mainButton = document.querySelector('.am5exporting');
    // Verificar si se encontró el botón principal
    if (mainButton) {
        // Buscar el botón secundario dentro del botón principal
        var secondaryButton = mainButton.querySelector('.am5exporting-format-xlsx a');
        // Verificar si se encontró el botón secundario
        if (secondaryButton) {
            // Hacer clic en el botón secundario
            secondaryButton.click();
        }
    }
}

var ModeloGlobalFiltros = [];
let ModeloGlobalFiltrosMod = [];

var ModeloGlobalTablas = [];
let ModeloGlobalTablasMod = [];

function GetTrazabilidad() {
    var Fecha = $('#RangoFechas').val();

    $('#CardFiltros').addClass("d-none");

    if (Fecha != "") {
        BlockPantalla.block()
        $.ajax({
            url: "Trazabilidad/TrazabilidadFiltro",
            type: "post",
            data: {
                TipoPeticion: 1,
                Fecha: Fecha
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
            },
        }).done(function (result) {
            if (result != null) {
                if (result == "SessionExpirada") {
                    SwalSessionExpirada()
                } else if (result != "Error") {

                    ModeloGlobalFiltros = result;

                    AplicarFiltro(result, "")

                    $('#CardFiltros').removeClass("d-none");

                    BlockPantalla.release()

                    GetTrazabilidadTablas(Fecha)
                }
                else {
                    toastr.error("Error de servidor, por favor contacta al administrador!");
                    BlockPantalla.release()
                }
            }
            else {
                toastr.error("Error de servidor, por favor contacta al administrador!");
                BlockPantalla.release()
            }
        }).fail(function (xhr, status, error) {
            toastr.error("Error de servidor, por favor contacta al administrador!");
            BlockPantalla.release()
        })

    }
    else {
        toastr.warning("Por favor, selecciona una fecha!");
    }
}

function GetTrazabilidadTablas(Fecha) {

    $.ajax({
        url: "Trazabilidad/TrazabilidadTablas",
        type: "post",
        data: {
            TipoPeticion: 1,
            Fecha: Fecha
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") {
                SwalSessionExpirada()
            } else if (result != "Error") {

                ModeloGlobalTablas = result;

                AplicarFiltroTablas(result)

                const ZonasTablas = getUniqueValues(ModeloGlobalFiltros.Actual, "Zona");

                ModeloGlobalTablasMod = JSON.parse(JSON.stringify(ModeloGlobalTablas));
                var DataTablesFiltradas = FiltrarDataTables(ZonasTablas)
                AplicarFiltroTablas(DataTablesFiltradas)


            }
            else {
                toastr.error("Error de servidor, por favor contacta al administrador!");
            }
        }
        else {
            toastr.error("Error de servidor, por favor contacta al administrador!");
        }
    }).fail(function (xhr, status, error) {
        toastr.error("Error de servidor, por favor contacta al administrador!");
    })
}

var cadenaDivisiones = '';
var DivisionesSelected = [];
$(document).ready(function () {

    cadenaDivisiones = DivisionesSelected.join(', ');

    // Manejar el evento de cambio de estado del checkbox "Todos"
    $('#IdDivisionTodo').on('change', function () {
        if ($(this).is(':checked')) {
            // Seleccionar todos los checkboxes y guardar sus valores
            $('#TablaFiltroDivision input[type="checkbox"]').prop('checked', true);
            DivisionesSelected = $('#TablaFiltroDivision input[type="checkbox"]').map(function () {
                return $(this).val();
            }).get();
        } else {
            // Deseleccionar todos los checkboxes y vaciar el array de valores seleccionados
            $('#TablaFiltroDivision input[type="checkbox"]').prop('checked', false);

            DivisionesSelected = [];
        }

        cadenaDivisiones = DivisionesSelected.join(', ');

        ModeloGlobalFiltrosMod = JSON.parse(JSON.stringify(ModeloGlobalFiltros));
        ModeloGlobalFiltrosMod.Actual = FiltrarActual(cadenaDivisiones, "Divisiones")
        ModeloGlobalFiltrosMod.Anterior = FiltrarAnterior(cadenaDivisiones, "Divisiones")
        AplicarFiltro(ModeloGlobalFiltrosMod, "Divisiones")

    });

    // Manejar el evento de cambio de estado de los checkboxes individuales
    $('#TablaFiltroDivision').on('change', 'input[type="checkbox"]', function () {
        var id = $(this).val();

        if ($(this).is(':checked')) {
            DivisionesSelected.push(id);
        } else {
            var index = DivisionesSelected.indexOf(id);
            if (index !== -1) {
                DivisionesSelected.splice(index, 1);
            }
        }

        // Actualizar el estado del checkbox "Todos" según corresponda
        if ($('#TablaFiltroDivision input[type="checkbox"]').length === DivisionesSelected.length) {
            $('#IdDivisionTodo').prop('checked', true);
        } else {
            $('#IdDivisionTodo').prop('checked', false);
        }

        cadenaDivisiones = DivisionesSelected.join(', ');

        ModeloGlobalFiltrosMod = JSON.parse(JSON.stringify(ModeloGlobalFiltros));
        ModeloGlobalFiltrosMod.Actual = FiltrarActual(cadenaDivisiones, "Divisiones")
        ModeloGlobalFiltrosMod.Anterior = FiltrarAnterior(cadenaDivisiones, "Divisiones")
        AplicarFiltro(ModeloGlobalFiltrosMod, "Divisiones")

    });
});

var cadenaZonas = '';
var ZonasSelected = [];
$(document).ready(function () {

    cadenaZonas = ZonasSelected.join(', ');
    // Manejar el evento de cambio de estado del checkbox "Todos"
    $('#IdZonaTodo').on('change', function () {
        if ($(this).is(':checked')) {
            // Seleccionar todos los checkboxes y guardar sus valores
            $('#TablaFiltroZona input[type="checkbox"]').prop('checked', true);
            ZonasSelected = $('#TablaFiltroZona input[type="checkbox"]').map(function () {
                return $(this).val();
            }).get();
        } else {
            // Deseleccionar todos los checkboxes y vaciar el array de valores seleccionados
            $('#TablaFiltroZona input[type="checkbox"]').prop('checked', false);

            ZonasSelected = [];
        }

        cadenaZonas = ZonasSelected.join(', ');

        ModeloGlobalFiltrosMod = JSON.parse(JSON.stringify(ModeloGlobalFiltros));
        ModeloGlobalFiltrosMod.Actual = FiltrarActual(cadenaZonas, "Zonas")
        ModeloGlobalFiltrosMod.Anterior = FiltrarAnterior(cadenaZonas, "Zonas")
        AplicarFiltro(ModeloGlobalFiltrosMod, "Zonas")
    });

    // Manejar el evento de cambio de estado de los checkboxes individuales
    $('#TablaFiltroZona').on('change', 'input[type="checkbox"]', function () {
        var id = $(this).val();

        if ($(this).is(':checked')) {
            ZonasSelected.push(id);
        } else {
            var index = ZonasSelected.indexOf(id);
            if (index !== -1) {
                ZonasSelected.splice(index, 1);
            }
        }

        // Actualizar el estado del checkbox "Todos" según corresponda
        if ($('#TablaFiltroZona input[type="checkbox"]').length === ZonasSelected.length) {
            $('#IdZonaTodo').prop('checked', true);
        } else {
            $('#IdZonaTodo').prop('checked', false);
        }

        cadenaZonas = ZonasSelected.join(', ');

        ModeloGlobalFiltrosMod = JSON.parse(JSON.stringify(ModeloGlobalFiltros));
        ModeloGlobalFiltrosMod.Actual = FiltrarActual(cadenaZonas, "Zonas")
        ModeloGlobalFiltrosMod.Anterior = FiltrarAnterior(cadenaZonas, "Zonas")
        AplicarFiltro(ModeloGlobalFiltrosMod, "Zonas")
    });
});

var cadenaContenedor = '';
var ContenedoresSelected = [];
$(document).ready(function () {

    cadenaContenedor = ContenedoresSelected.join(', ');
    console.log(cadenaContenedor);
    console.log("primer")

    // Manejar el evento de cambio de estado del checkbox "Todos"
    $('#IdContenedorTodo').on('change', function () {
        if ($(this).is(':checked')) {
            // Seleccionar todos los checkboxes y guardar sus valores
            $('#TablaFiltroContenedor input[type="checkbox"]').prop('checked', true);
            ContenedoresSelected = $('#TablaFiltroContenedor input[type="checkbox"]').map(function () {
                return $(this).val();
            }).get();
        } else {
            // Deseleccionar todos los checkboxes y vaciar el array de valores seleccionados
            $('#TablaFiltroContenedor input[type="checkbox"]').prop('checked', false);
            ContenedoresSelected = [];
        }

        cadenaContenedor = ContenedoresSelected.join(', ');

        ModeloGlobalFiltrosMod = JSON.parse(JSON.stringify(ModeloGlobalFiltros));


        ModeloGlobalFiltrosMod.Actual = FiltrarActual(cadenaContenedor, "Contenedores")
        ModeloGlobalFiltrosMod.Anterior = FiltrarAnterior(cadenaContenedor, "Contenedores")

        AplicarFiltro(ModeloGlobalFiltrosMod, "Contenedores")

        console.log("segundo")
    });

    // Manejar el evento de cambio de estado de los checkboxes individuales
    $('#TablaFiltroContenedor').on('change', 'input[type="checkbox"]', function () {
        var id = $(this).val();

        if ($(this).is(':checked')) {
            ContenedoresSelected.push(id);
        } else {
            var index = ContenedoresSelected.indexOf(id);
            if (index !== -1) {
                ContenedoresSelected.splice(index, 1);
            }
        }

        // Actualizar el estado del checkbox "Todos" según corresponda
        if ($('#TablaFiltroContenedor input[type="checkbox"]').length === ContenedoresSelected.length) {
            $('#IdContenedorTodo').prop('checked', true);
        } else {
            $('#IdContenedorTodo').prop('checked', false);
        }

        cadenaContenedor = ContenedoresSelected.join(', ');

        ModeloGlobalFiltrosMod = JSON.parse(JSON.stringify(ModeloGlobalFiltros));

        ModeloGlobalFiltrosMod.Actual = FiltrarActual(cadenaContenedor, "Contenedores")
        ModeloGlobalFiltrosMod.Anterior = FiltrarAnterior(cadenaContenedor, "Contenedores")

        AplicarFiltro(ModeloGlobalFiltrosMod, "Contenedores")

        console.log(cadenaContenedor);
        console.log("ter3")
    });
});

function FiltrarActual(valores, FiltroName) {
    const valoresArray = valores.split(',').map(valor => valor.trim());

    switch (FiltroName) {
        case "Divisiones":
            return ModeloGlobalFiltrosMod.Actual.filter(dato => valoresArray.includes(dato.Division));
            break;
        case "Zonas":
            return ModeloGlobalFiltrosMod.Actual.filter(dato => valoresArray.includes(dato.Zona));
            break;
        case "Contenedores":
            return ModeloGlobalFiltrosMod.Actual.filter(dato => valoresArray.includes(dato.Contenedor));
            break;
        default:
            ModeloGlobalFiltrosMod.Actual = []; // Restablece el valor de "ModeloGlobalFiltrosMod.Actual" a un arreglo vacío
            return ModeloGlobalFiltrosMod.Actual;
    }
}
function FiltrarAnterior(valores, FiltroName) {
    const valoresArray = valores.split(',').map(valor => valor.trim());

    switch (FiltroName) {
        case "Divisiones":
            return ModeloGlobalFiltrosMod.Anterior.filter(dato => valoresArray.includes(dato.Division));
            break;
        case "Zonas":
            return ModeloGlobalFiltrosMod.Anterior.filter(dato => valoresArray.includes(dato.Zona));
            break;
        case "Contenedores":
            return ModeloGlobalFiltrosMod.Anterior.filter(dato => valoresArray.includes(dato.Contenedor));
            break;
        default:
            ModeloGlobalFiltrosMod.Anterior = []; // Restablece el valor de "ModeloGlobalFiltrosMod.Anterior" a un arreglo vacío
            return ModeloGlobalFiltrosMod.Anterior;
    }
}

//Función para obtener valores únicos de una propiedad en el array de objetos
function getUniqueValues(data, property) {
    const uniqueValues = [];
    data.forEach(item => {
        if (!uniqueValues.includes(item[property])) {
            uniqueValues.push(item[property]);
        }
    });
    return uniqueValues;
}

function AplicarFiltro(result, FiltroName) {

    //div Resumen===========================================================================================

    //Partidas totales
    var PartidasActual = result.Actual.reduce((total, partida) => total + partida.PartidasTotales, 0);
    var PartidasAnterior = result.Anterior.reduce((total, partida) => total + partida.PartidasTotales, 0);

    //Partidas utilizadas
    var PartidasUtilizadasActual = result.Actual.reduce((total, partida) => total + partida.PartidasUtilizadas, 0);
    var PartidasUtilizadasAnterior = result.Anterior.reduce((total, partida) => total + partida.PartidasUtilizadas, 0);

    //Porcentaje utilización
    var PorcentjeUtilizadasActual = (PartidasUtilizadasActual * 100) / PartidasActual;
    var PorcentjeUtilizadasAnterior = (PartidasUtilizadasAnterior * 100) / PartidasAnterior;

    //Horas en prestamo
    var HorasPrestamoActual = result.Actual.reduce((total, partida) => total + partida.HorasPrestamo, 0);
    var HorasPrestamoAnterior = result.Anterior.reduce((total, partida) => total + partida.HorasPrestamo, 0);

    //Promedio horas prestamo
    var PromedioHorasPrestamoActual = HorasPrestamoActual / PartidasUtilizadasActual;
    var PromedioHorasPrestamoAnterior = HorasPrestamoAnterior / PartidasUtilizadasAnterior;


    //Cantidad Surtida
    var CantidadSurtimientoActual = result.Actual.reduce((total, partida) => total + partida.CantidadSurtimiento, 0);
    var CantidadSurtimientoAnterior = result.Anterior.reduce((total, partida) => total + partida.CantidadSurtimiento, 0);

    var IconoPartidasTotales = PartidasActual > PartidasAnterior ? `<i class="far fa-arrow-alt-circle-up text-success fs-1 me-2"></i>` : `<i class="far fa-arrow-alt-circle-down text-danger fs-1 me-2"></i>`;
    var IconoPartidasUtilizadas = PartidasUtilizadasActual > PartidasUtilizadasAnterior ? `<i class="far fa-arrow-alt-circle-up text-success fs-1 me-2"></i>` : `<i class="far fa-arrow-alt-circle-down text-danger fs-1 me-2"></i>`;
    var IconoPorcentjeUtilizadas = PorcentjeUtilizadasActual > PorcentjeUtilizadasAnterior ? `<i class="far fa-arrow-alt-circle-up text-success fs-1 me-2"></i>` : `<i class="far fa-arrow-alt-circle-down text-danger fs-1 me-2"></i>`;
    var IconoHorasPrestamo = HorasPrestamoActual > HorasPrestamoAnterior ? `<i class="far fa-arrow-alt-circle-up text-success fs-1 me-2"></i>` : `<i class="far fa-arrow-alt-circle-down text-danger fs-1 me-2"></i>`;
    var IconoPromedioHorasPrestamo = PromedioHorasPrestamoActual > PromedioHorasPrestamoAnterior ? `<i class="far fa-arrow-alt-circle-up text-success fs-1 me-2"></i>` : `<i class="far fa-arrow-alt-circle-down text-danger fs-1 me-2"></i>`;
    var IconoCantidadSurtimiento = CantidadSurtimientoActual > CantidadSurtimientoAnterior ? `<i class="far fa-arrow-alt-circle-up text-success fs-1 me-2"></i>` : `<i class="far fa-arrow-alt-circle-down text-danger fs-1 me-2"></i>`;

    var HtmlTablaResumen = `<tr><td>Partidas Totales</td><td>${PartidasActual}</td><td>${PartidasAnterior}</td><td>${IconoPartidasTotales}</td></tr>` +
        `<tr><td>Partidas Utlizadas</td><td>${PartidasUtilizadasActual}</td><td>${PartidasUtilizadasAnterior}</td><td>${IconoPartidasUtilizadas}</td></tr>` +
        `<tr><td>Porcentaje Utilizado</td><td>${PorcentjeUtilizadasActual.toFixed(2)}%</td><td>${PorcentjeUtilizadasAnterior.toFixed(2)}%</td><td>${IconoPorcentjeUtilizadas}</td></tr>` +
        `<tr><td>Horas en Préstamo</td><td>${HorasPrestamoActual.toFixed(2)}</td><td>${HorasPrestamoAnterior.toFixed(2)}</td><td>${IconoHorasPrestamo}</td></tr>` +
        `<tr><td>Promedio Horas Préstamo</td><td>${PromedioHorasPrestamoActual.toFixed(2)}</td><td>${PromedioHorasPrestamoAnterior.toFixed(2)}</td><td>${IconoPromedioHorasPrestamo}</td></tr>`;
    /*    `<tr><td>Cantidad Surtida</td><td>${CantidadSurtimientoActual}</td><td>${CantidadSurtimientoAnterior}</td><td>${IconoCantidadSurtimiento}</td></tr>`;*/

    $('#TablaResumen').html(HtmlTablaResumen);


    //div Partidas utilizadas por zona===========================================================================================
    var HtmlPartidasActul = "";

    if (PartidasActual > PartidasAnterior) {
        HtmlPartidasActul = `<span class="badge badge-light-success fs-base">` +
            `<i class="far fa-arrow-alt-circle-up text-success fs-1 me-2"></i> ${PartidasActual}</span>`;
    }
    else {
        HtmlPartidasActul = `<span class="badge badge-light-danger fs-base">` +
            `<i class="far fa-arrow-alt-circle-down text-danger fs-1 me-2"></i> ${PartidasActual}</span>`;
    }

    $('#TotalPartidasActuales').html(HtmlPartidasActul);
    $('#TotalPartidasAnterior').text(`${PartidasAnterior}`);

    var DataTotalesZona = [];
    const sumasPorZona = {};

    result.Actual.forEach((dato) => {
        const zona = dato.Zona;

        if (!sumasPorZona[zona]) {
            sumasPorZona[zona] = {
                Partidas: 0,
            };
        }
        sumasPorZona[zona].Partidas += dato.PartidasUtilizadas;
    });

    for (const zona in sumasPorZona) {
        DataTotalesZona.push({
            Zona: zona,
            Partidas: sumasPorZona[zona].Partidas,
        });
    }

    IngresosTotales(DataTotalesZona)


    var DatosActualAnterior = JSON.parse(JSON.stringify(result.Actual));
    DatosActualAnterior = DatosActualAnterior.concat(JSON.parse(JSON.stringify(result.Anterior)));

    // Obtener valores únicos de cada propiedad
    const uniqueDivisiones = getUniqueValues(DatosActualAnterior, "Division");
    const uniqueZonas = getUniqueValues(DatosActualAnterior, "Zona");
    const uniqueContenedores = getUniqueValues(DatosActualAnterior, "Contenedor");

    if (FiltroName != "Divisiones" && FiltroName != "Zonas" && FiltroName != "Contenedores" ) {
        //Datos para filtro de Divisiones
        var printDivisiones = "";
        for (i = 0; i < uniqueDivisiones.length; i++) {
            printDivisiones = printDivisiones + `<tr><td><div class="form-check form-check-custom form-check-sm">` +
                `<input  type="checkbox" name="" id="${uniqueDivisiones[i]}" value="${uniqueDivisiones[i]}" class="form-check-input border border-dark me-2">` +
                `<label for="${uniqueDivisiones[i]}">${uniqueDivisiones[i]}</label></div></td></tr>`;
        }
        $("#TablaFiltroDivision").html(printDivisiones);

        // Seleccionar todos los checkboxes al cargar la página
        $('#IdDivisionTodo').prop('checked', true);
        $('#TablaFiltroDivision input[type="checkbox"]').prop('checked', true);

        // Obtener los valores de los checkboxes seleccionados
        DivisionesSelected = $('#TablaFiltroDivision input[type="checkbox"]').map(function () {
            return $(this).val();
        }).get();
    }

    if (FiltroName != "Zonas" && FiltroName != "Contenedores" ) {
        //Datos para filtro de Zonas
        var printZonas = "";
        for (i = 0; i < uniqueZonas.length; i++) {
            printZonas = printZonas + `<tr><td><div class="form-check form-check-custom form-check-sm">` +
                `<input  type="checkbox" name="" id="${uniqueZonas[i]}" value="${uniqueZonas[i]}" class="form-check-input border border-dark me-2">` +
                `<label for="${uniqueZonas[i]}">${uniqueZonas[i]}</label></div></td></tr>`;
        }
        $("#TablaFiltroZona").html(printZonas);

        // Seleccionar todos los checkboxes al cargar la página
        $('#IdZonaTodo').prop('checked', true);
        $('#TablaFiltroZona input[type="checkbox"]').prop('checked', true);

        // Obtener los valores de los checkboxes seleccionados
        ZonasSelected = $('#TablaFiltroZona input[type="checkbox"]').map(function () {
            return $(this).val();
        }).get();
    }

    if (FiltroName != "Contenedores" ) {
        // Datos para filtro de Contenedores
        var printContenedores = "";
        for (i = 0; i < uniqueContenedores.length; i++) {
            printContenedores = printContenedores + `<tr><td><div class="form-check form-check-custom form-check-sm">` +
                `<input type="checkbox" name="" id="${uniqueContenedores[i]}" value="${uniqueContenedores[i]}" class="form-check-input border border-dark me-2">` +
                `<label for="${uniqueContenedores[i]}">${uniqueContenedores[i]}</label></div></td></tr>`;
        }
        $("#TablaFiltroContenedor").html(printContenedores);

        // Seleccionar todos los checkboxes al cargar la página
        $('#IdContenedorTodo').prop('checked', true);
        $('#TablaFiltroContenedor input[type="checkbox"]').prop('checked', true);

        // Obtener los valores de los checkboxes seleccionados
        ContenedoresSelected = $('#TablaFiltroContenedor input[type="checkbox"]').map(function () {
            return $(this).val();
        }).get();
    }

    if (FiltroName != "") {
        //Proceso de filtrado de las tablas 
        const ZonasTablas = getUniqueValues(result.Actual, "Zona");

        ModeloGlobalTablasMod = JSON.parse(JSON.stringify(ModeloGlobalTablas));

        var DataTablesFiltradas = FiltrarDataTables(ZonasTablas)

        AplicarFiltroTablas(DataTablesFiltradas)
    }

}

function FiltrarDataTables(valores) {

    const valoresArray = valores.map(function (valor) {
        if (valor === "U.OP. PR-ALT") {
            return "UNIDAD DE PERFORACION POZA RICA-ALTAMIRA";
        } else {
            return valor;
        }
    });

    ModeloGlobalTablasMod.PartidasUtilizadas = ModeloGlobalTablasMod.PartidasUtilizadas.filter(dato => valoresArray.includes(dato.Unidad));
    ModeloGlobalTablasMod.HerramientasXclasificacion = ModeloGlobalTablasMod.HerramientasXclasificacion.filter(dato => valoresArray.includes(dato.Zona));
    ModeloGlobalTablasMod.PorcentajeUtilizacion = ModeloGlobalTablasMod.PorcentajeUtilizacion.filter(dato => valoresArray.includes(dato.Zona));


    return ModeloGlobalTablasMod;
}

function AplicarFiltroTablas(result) {
    //=====================================begin-> Mostrar tablas ===============================================
    tPartidasUtilizadas.clear().draw();

    for (var i = 0; i < result.PartidasUtilizadas.length; i++) {
        tPartidasUtilizadas.row.add(
            [
                result.PartidasUtilizadas[i].Unidad,
                result.PartidasUtilizadas[i].Clasificacion,
                result.PartidasUtilizadas[i].Salida
            ]).draw(false);
    }

    tHerramientaXclasificacion.clear().draw();

    for (var i = 0; i < result.HerramientasXclasificacion.length; i++) {
        tHerramientaXclasificacion.row.add(
            [
                result.HerramientasXclasificacion[i].Zona,
                result.HerramientasXclasificacion[i].Total
            ]).draw(false);
    }

    tPorcentajeUtilizacion.clear().draw();

    for (var i = 0; i < result.PorcentajeUtilizacion.length; i++) {
        tPorcentajeUtilizacion.row.add(
            [
                result.PorcentajeUtilizacion[i].Zona,
                result.PorcentajeUtilizacion[i].Mes,
                result.PorcentajeUtilizacion[i].Equipo,
                result.PorcentajeUtilizacion[i].Solicitudes,
                result.PorcentajeUtilizacion[i].Partidas

            ]).draw(false);
    }
    //=====================================end-> Mostrar tablas ===============================================
}


                			 