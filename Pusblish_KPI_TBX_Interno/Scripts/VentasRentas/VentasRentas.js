//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// GRAFICAS ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//********* Start Ingresos Totales ****************************************************************************************
var yAxisIngresosT;
var xAxisIngresosT;
var seriesIngresosT;
var CrearSeriesT;
var chartIngresosT;
var legendIngresosT;
am5.ready(function () {

    // Create root element
    var root = am5.Root.new("IngresosTotales");

    var myTheme = am5.Theme.new(root);

    myTheme.rule("Grid", ["base"]).setAll({
        strokeOpacity: 0.1
    });

    root._logo.dispose();

    // Set themes
    root.setThemes([
        am5themes_Animated.new(root),
        myTheme
    ]);

    // Create chart
    chartIngresosT = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panY",
        wheelY: "zoomY",
        layout: root.verticalLayout
    }));

    // Add scrollbar
    chartIngresosT.set("scrollbarY", am5.Scrollbar.new(root, {
        orientation: "vertical"
    }));

    var data = [];

    // Create axes
    var yRenderer = am5xy.AxisRendererY.new(root, {});

    yAxisIngresosT = chartIngresosT.yAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: yRenderer,
        tooltip: am5.Tooltip.new(root, {})
    }));

    yRenderer.grid.template.setAll({
        location: 1
    });

    yAxisIngresosT.data.setAll(data);

    xAxisIngresosT = chartIngresosT.xAxes.push(am5xy.ValueAxis.new(root, {
        min: 0,
        numberFormat: "'$'#,###",
        renderer: am5xy.AxisRendererX.new(root, {
            strokeOpacity: 0.1
        })
    }));

    // Add series
    function makeSeries(name, fieldName) {
        seriesIngresosT = chartIngresosT.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxisIngresosT,
            yAxis: yAxisIngresosT,
            baseAxis: yAxisIngresosT,
            valueXField: fieldName,
            categoryYField: "year"
        }));

        //configurar posicion de Tooltip
        if (name === "Total") {
            seriesIngresosT.columns.template.setAll({
                tooltipText: "{categoryY} {name}: ${valueX}",
                tooltipX: 0.5, // Centra horizontalmente el tooltip                         
            });
        } else {
            seriesIngresosT.columns.template.setAll({
                tooltipText: "{categoryY} {name}: ${valueX}",
                tooltipY: am5.percent(90),
            });
        }
        //Configuracion de Boderdes transparentes

        //Mostrar la serie
        seriesIngresosT.bullets.push(function () {
            if (name === "Total") {
                return am5.Bullet.new(root, {
                    locationX: 0.1,
                    sprite: am5.Label.new(root, {
                        text: "$[bold]{valueX}",
                        textAlign: "center",

                        fill: am5.color(0x000000),
                        fontSize: 18,
                        centerY: am5.p50,
                        centerX: am5.p50,
                        populateText: true
                    })
                });

            } else {
                return am5.Bullet.new(root, {
                    sprite: am5.Label.new(root, {
                        text: "${valueX}",
                        fill: root.interfaceColors.get("alternativeText"),
                        centerY: am5.p50,
                        centerX: am5.p50,
                        populateText: true
                    })
                });
            }


        });


    }


    //  Add legend
    legendIngresosT = chartIngresosT.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        position: "top"
    }));

    CrearSeriesT = makeSeries;

});
function IngresosTotales(nuevosDatos) {


    chartIngresosT.series.clear();
    yAxisIngresosT.data.setAll(nuevosDatos);
    xAxisIngresosT.data.setAll(nuevosDatos);
    legendIngresosT.data.setAll(nuevosDatos);

    CrearSeriesT("Vendido", "Vendido");
    seriesIngresosT.data.setAll(nuevosDatos);
    legendIngresosT.data.push(seriesIngresosT);

    CrearSeriesT("Rentado", "Rentado");
    seriesIngresosT.data.setAll(nuevosDatos);
    legendIngresosT.data.push(seriesIngresosT);

    CrearSeriesT("Total", "Total");
    seriesIngresosT.columns.template.set("fillOpacity", 0.0); // Opacidad del relleno al 10%
    seriesIngresosT.columns.template.set("strokeOpacity", 0);
    seriesIngresosT.data.setAll(nuevosDatos);
}

//********* Start Ingresos Totales por Zona ****************************************************************************************

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

var yAxisIngresosZona;
var xAxisIngresosZona;
var seriesIngresosZona;
var CrearSeriesZona;
var legendIngresosZona;
var chartIngresosZona;
var ExportarDataZona;
am5.ready(function () {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv2");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Material.new(root)
    ]);

    root._logo.dispose();

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    chartIngresosZona = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout
    }));

    var data = [];
    //Exportar
    function ExportarData(datos) {
        var exporting = am5plugins_exporting.Exporting.new(root, {
            menu: am5plugins_exporting.ExportingMenu.new(root, {}),
            dataSource: datos,
        });
    }

    ExportarDataZona = ExportarData;

    // Create axes
    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        rotation: -20,
        paddingRight: 15
    });

    xRenderer.grid.template.setAll({
        location: 1
    })


    xAxisIngresosZona = chartIngresosZona.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "UnidadOperativa",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
    }));

    xAxisIngresosZona.data.setAll(data);

    yAxisIngresosZona = chartIngresosZona.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        numberFormat: "'$'#,###",
        renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
        })
    }));



    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName) {
        seriesIngresosZona = chartIngresosZona.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            xAxis: xAxisIngresosZona,
            yAxis: yAxisIngresosZona,
            valueYField: fieldName,
            categoryXField: "UnidadOperativa"

        }));

        seriesIngresosZona.columns.template.setAll({
            tooltipText: "{name}: {valueY}",
            width: am5.percent(90),
            tooltipY: 0,
            strokeOpacity: 0
        });

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/

        seriesIngresosZona.bullets.push(function () {
            return am5.Bullet.new(root, {
                locationY: 0.5,
                sprite: am5.Label.new(root, {
                    text: `$ {valueY}`, // Agregar el símbolo de pesos al formato
                    fill: am5.color(0x000000),
                    centerY: am5.percent(50),
                    centerX: am5.percent(50),
                    populateText: true
                })
            });
        });

        //seriesIngresosZona.data.setAll(data);
        //legend.data.push(seriesIngresosZona);
        /*  legendIngresosZona.data.push(seriesIngresosZona);*/
        //seriesIngresosZona.appear();

        return seriesIngresosZona;
    }

    CrearSeriesZona = makeSeries;

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chartIngresosZona.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal",
        marginBottom: 20
    }));


    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    legendIngresosZona = chartIngresosZona.children.push(
        am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50,
            position: "top" // Configura la posición de la leyenda en la parte superior
        })
    );


    //// Add legend
    //legendIngresosZona = chartIngresosZona.children.push(am5.Legend.new(root, {
    //    centerX: am5.p50,
    //    x: am5.p50
    //}));

    legendIngresosZona.data.setAll(chartIngresosZona.series.values);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chartIngresosZona.appear(1000, 100);

}); // end am5.ready()

function IngresosTotalesZona(nuevosDatos) {

    chartIngresosZona.series.clear();
    yAxisIngresosZona.data.setAll(nuevosDatos);
    xAxisIngresosZona.data.setAll(nuevosDatos);

    CrearSeriesZona("ACEITES", "ACEITES");
    seriesIngresosZona.data.setAll(nuevosDatos);
    seriesIngresosZona.appear(1000);

    CrearSeriesZona("CONSUMIBLE", "CONSUMIBLE");
    seriesIngresosZona.data.setAll(nuevosDatos);
    seriesIngresosZona.appear(1000);

    CrearSeriesZona("CONTENEDOR", "CONTENEDOR");
    seriesIngresosZona.data.setAll(nuevosDatos);
    seriesIngresosZona.appear(1000);

    CrearSeriesZona("HIDROLAVADORA", "HIDROLAVADORA");
    seriesIngresosZona.data.setAll(nuevosDatos);
    seriesIngresosZona.appear(1000);

    CrearSeriesZona("HTTA_PISO", "HTTA_PISO");
    seriesIngresosZona.data.setAll(nuevosDatos);
    seriesIngresosZona.appear(1000);

    ExportarDataZona(nuevosDatos)

    legendIngresosZona.data.setAll(chartIngresosZona.series.values);
    //legendIngresosZona.data.push(series);
}

//********* End Ingresos Totales por Zona ****************************************************************************************var series;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// DATATABLES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//********* Start DataTable  Partidas utilizadas por tipo de herramienta(Consumible y Herramienta) ****************************************************************************************var series;
var ToolsClasificacion = function () {
    var table;
    var datatable;

    var initDatatable = function () {
        datatable = $(table).DataTable({
            "info": true,
            "order": [],
            'pageLength': 10,
        });
    }

    var exportButtons = () => {
        const documentTitle = 'Partidas utilizadas por clasificación';
        var buttons = new $.fn.dataTable.Buttons(table, {
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: documentTitle
                },
                {
                    extend: 'csvHtml5',
                    title: documentTitle
                }
            ]
        }).container().appendTo($('#ToolsClasificacion_buttons'));

        const exportButtons = document.querySelectorAll('#ToolsClasificacion_export_menu [ToolsClasificacion-export]');
        exportButtons.forEach(exportButton => {
            exportButton.addEventListener('click', e => {
                e.preventDefault();

                const exportValue = e.target.getAttribute('ToolsClasificacion-export');


                var target = document.querySelector('div[id="ToolsClasificacion_buttons"]');
                target = target.querySelector('.buttons-' + exportValue);

                target.click();

            });
        });
    }


    return {
        init: function () {
            table = document.querySelector('#ToolsClasificacion');

            if (!table) {
                return;
            }

            initDatatable();
            exportButtons();

        }
    };
}();

KTUtil.onDOMContentLoaded(function () {
    ToolsClasificacion.init();
});
//********* End DataTable  Partidas utilizadas por tipo de herramienta(Consumible y Herramienta) ****************************************************************************************;

//********* Start DataTable Herramientas utilizadas por clasificación ****************************************************************************************;
var HerraPdaXCont = function () {
    var table;
    var datatable;

    var initDatatable = function () {
        datatable = $(table).DataTable({
            "info": true,
            "order": [],
            'pageLength': 10,
        });
    }

    var exportButtons = () => {
        const documentTitle = 'Top de artículos más vendidos por Unidad Operativa';
        var buttons = new $.fn.dataTable.Buttons(table, {
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: documentTitle
                },
                {
                    extend: 'csvHtml5',
                    title: documentTitle
                }
            ]
        }).container().appendTo($('#HerraPdaXCont_buttons'));

        const exportButtons = document.querySelectorAll('#HerraPdaXCont_export_menu [HerraPdaXCont-export]');
        exportButtons.forEach(exportButton => {
            exportButton.addEventListener('click', e => {
                e.preventDefault();

                const exportValue = e.target.getAttribute('HerraPdaXCont-export');
                var target = document.querySelector('div[id="HerraPdaXCont_buttons"]');
                target = target.querySelector('.buttons-' + exportValue);

                target.click();
            });
        });
    }


    return {
        init: function () {
            table = document.querySelector('#HerraPdaXCont');

            if (!table) {
                return;
            }

            initDatatable();
            exportButtons();

        }
    };
}();

KTUtil.onDOMContentLoaded(function () {
    HerraPdaXCont.init();
});
//********* End DataTable Herramientas utilizadas por clasificación ****************************************************************************************

//********* Start DataTable Porcentajes de partidas utilizadas en el Mes ****************************************************************************************
var Solicitud = function () {
    var table;
    var datatable;

    var initDatatable = function () {
        datatable = $(table).DataTable({
            "info": true,
            "order": [],
            'pageLength': 10,
        });
    }

    var exportButtons = () => {
        const documentTitle = 'Partidas vendidas por equipos';
        var buttons = new $.fn.dataTable.Buttons(table, {
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: documentTitle
                },
                {
                    extend: 'csvHtml5',
                    title: documentTitle
                }
            ]
        }).container().appendTo($('#Solicitud_buttons'));

        const exportButtons = document.querySelectorAll('#Solicitud_export_menu [Solicitud-export]');
        exportButtons.forEach(exportButton => {
            exportButton.addEventListener('click', e => {
                e.preventDefault();

                const exportValue = e.target.getAttribute('Solicitud-export');
                var target = document.querySelector('div[id="Solicitud_buttons"]');
                target = target.querySelector('.buttons-' + exportValue);

                target.click();


            });
        });
    }


    return {
        init: function () {
            table = document.querySelector('#Solicitud');

            if (!table) {
                return;
            }

            initDatatable();
            exportButtons();

        }
    };
}();

KTUtil.onDOMContentLoaded(function () {
    Solicitud.init();
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
    $('#SearchUbicacion').on('input', function () {
        var filtro = $(this).val().toLowerCase(); // Obtener el valor del input y convertirlo a minúsculas

        // Recorremos todas las filas de la tabla y mostramos u ocultamos según el filtro
        $('#TablaFiltroUbicacion tr').each(function () {
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
    $('#SearchEquipo').on('input', function () {
        var filtro = $(this).val().toLowerCase(); // Obtener el valor del input y convertirlo a minúsculas

        // Recorremos todas las filas de la tabla y mostramos u ocultamos según el filtro
        $('#TablaFiltroEquipo tr').each(function () {
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
$(document).ready(function () {
    // Manejador de eventos para el input de filtro
    $('#SearchTipoServicio').on('input', function () {
        var filtro = $(this).val().toLowerCase(); // Obtener el valor del input y convertirlo a minúsculas

        // Recorremos todas las filas de la tabla y mostramos u ocultamos según el filtro
        $('#TablaFiltroTipoServicio tr').each(function () {
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

    GetVentas()
    /* GetEquipos()*/
})

var start = moment().startOf("month");// Primer día del mes actual
var end = moment().endOf("month");// Último día del mes actual

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

//Sirve para darle formato de dinero a los numeros.
const FormatoDinero = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
};
//---------------------------------------------------------------------------------------------------------------------

function GetEquipos() {
    BlockFiltros.block()

    var S2_Equipos = $("#S2_Equipos");
    $('#S2_Equipos').empty().trigger("change");
    S2_Equipos.append('<option></option>');

    $.ajax({
        url: "/VentasRentas/GetEquiposByPeriodo",
        type: "POST",
        data: {
            TipoPeticion: 1,
            RangoFechas: $("#RangoFechas").val()
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "SessionExpirada") {
                SwalSessionExpirada()
            }
            else if (result != "Error")
            {
                $("#S2_Equipos").select2({ data: result });
                BlockFiltros.release()
            }
            else {
                toastr.error("Error de servidor, por favor contacta al administrador!");
            }
        }
    }).fail(function (xhr, status, error) {
        toastr.error("Error de servidor, por favor contacta al administrador!");
    })
}

var ModeloGlobalFiltros = [];
let ModeloGlobalFiltrosMod = [];

var ModeloGlobalTablas = [];
let ModeloGlobalTablasMod = [];
function GetVentas() {
    var Fecha = $('#RangoFechas').val();
    $('#CardFiltros').addClass("d-none");
    var Equipos = $("#S2_Equipos").val();

    if (Fecha != "")
    {
        BlockPantalla.block()
        $.ajax({
            url: "VentasRentas/VentasRentasFiltro",
            type: "post",
            data: {
                TipoPeticion: 1,
                Fecha: Fecha,
                Equipos: Equipos.join(',')
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

                    if (Equipos.join(',') == "") {
                        $('#idFiltros').removeClass("d-none");

                    } else {
                        $('#idFiltros').addClass("d-none");
                    }

                    ModeloGlobalFiltros = result;

                    AplicarFiltro(result, "")

                    $('#CardFiltros').removeClass("d-none");

                    BlockPantalla.release()

                    var tCLasificacion = $("#ToolsClasificacion").DataTable();
                    var tHerraPdaXCont = $("#HerraPdaXCont").DataTable();
                    var tSolicitud = $("#Solicitud").DataTable();

                    tCLasificacion.clear().draw();
                    tHerraPdaXCont.clear().draw();
                    tSolicitud.clear().draw();

                    GetVentasTablas(Fecha)
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
function GetVentasTablas(Fecha) {

    $.ajax({
        url: "VentasRentas/VentaTablas",
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

                const EquiposTablas = getUniqueValues(ModeloGlobalFiltros.Actual, "Equipo");

                ModeloGlobalTablasMod = JSON.parse(JSON.stringify(ModeloGlobalTablas));
                var DataTablesFiltradas = FiltrarDataTables(EquiposTablas)
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
        ModeloGlobalFiltrosMod.Actual = filtrarVentaActual(cadenaDivisiones, "Divisiones")
        ModeloGlobalFiltrosMod.Anterior = filtrarVentaAnterior(cadenaDivisiones, "Divisiones")

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
        ModeloGlobalFiltrosMod.Actual = filtrarVentaActual(cadenaDivisiones, "Divisiones")
        ModeloGlobalFiltrosMod.Anterior = filtrarVentaAnterior(cadenaDivisiones, "Divisiones")

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

        ModeloGlobalFiltrosMod.Actual = filtrarVentaActual(cadenaZonas, "Zonas")
        ModeloGlobalFiltrosMod.Anterior = filtrarVentaAnterior(cadenaZonas, "Zonas")

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

        ModeloGlobalFiltrosMod.Actual = filtrarVentaActual(cadenaZonas, "Zonas")
        ModeloGlobalFiltrosMod.Anterior = filtrarVentaAnterior(cadenaZonas, "Zonas")

        AplicarFiltro(ModeloGlobalFiltrosMod, "Zonas")

    });
});

var cadenaEquipos = '';
var EquiposSelected = [];
$(document).ready(function () {

    cadenaEquipos = EquiposSelected.join(', ');

    // Manejar el evento de cambio de estado del checkbox "Todos"
    $('#IdEquipoTodo').on('change', function () {
        if ($(this).is(':checked')) {
            // Seleccionar todos los checkboxes y guardar sus valores
            $('#TablaFiltroEquipo input[type="checkbox"]').prop('checked', true);
            EquiposSelected = $('#TablaFiltroEquipo input[type="checkbox"]').map(function () {
                return $(this).val();
            }).get();
        } else {
            // Deseleccionar todos los checkboxes y vaciar el array de valores seleccionados
            $('#TablaFiltroEquipo input[type="checkbox"]').prop('checked', false);
            EquiposSelected = [];
        }

        cadenaEquipos = EquiposSelected.join(', ');

        ModeloGlobalFiltrosMod = JSON.parse(JSON.stringify(ModeloGlobalFiltros));

        ModeloGlobalFiltrosMod.Actual = filtrarVentaActual(cadenaEquipos, "Equipos")
        ModeloGlobalFiltrosMod.Anterior = filtrarVentaAnterior(cadenaEquipos, "Equipos")

        AplicarFiltro(ModeloGlobalFiltrosMod, "Equipos")

    });

    // Manejar el evento de cambio de estado de los checkboxes individuales
    $('#TablaFiltroEquipo').on('change', 'input[type="checkbox"]', function () {
        var id = $(this).val();

        if ($(this).is(':checked')) {
            EquiposSelected.push(id);
        } else {
            var index = EquiposSelected.indexOf(id);
            if (index !== -1) {
                EquiposSelected.splice(index, 1);
            }
        }

        // Actualizar el estado del checkbox "Todos" según corresponda
        if ($('#TablaFiltroEquipo input[type="checkbox"]').length === EquiposSelected.length) {
            $('#IdEquipoTodo').prop('checked', true);
        } else {
            $('#IdEquipoTodo').prop('checked', false);
        }

        cadenaEquipos = EquiposSelected.join(', ');

        ModeloGlobalFiltrosMod = JSON.parse(JSON.stringify(ModeloGlobalFiltros));

        ModeloGlobalFiltrosMod.Actual = filtrarVentaActual(cadenaEquipos, "Equipos")
        ModeloGlobalFiltrosMod.Anterior = filtrarVentaAnterior(cadenaEquipos, "Equipos")

        AplicarFiltro(ModeloGlobalFiltrosMod, "Equipos")

    });
});

var cadenaUbicacion = '';
var UbicacionesSelected = [];
$(document).ready(function () {

    cadenaUbicacion = UbicacionesSelected.join(', ');

    // Manejar el evento de cambio de estado del checkbox "Todos"
    $('#IdUbicacionTodo').on('change', function () {
        if ($(this).is(':checked')) {
            // Seleccionar todos los checkboxes y guardar sus valores
            $('#TablaFiltroUbicacion input[type="checkbox"]').prop('checked', true);
            UbicacionesSelected = $('#TablaFiltroUbicacion input[type="checkbox"]').map(function () {
                return $(this).val();
            }).get();
        } else {
            // Deseleccionar todos los checkboxes y vaciar el array de valores seleccionados
            $('#TablaFiltroUbicacion input[type="checkbox"]').prop('checked', false);
            UbicacionesSelected = [];
        }

        cadenaUbicacion = UbicacionesSelected.join(', ');

        ModeloGlobalFiltrosMod = JSON.parse(JSON.stringify(ModeloGlobalFiltros));

        ModeloGlobalFiltrosMod.Actual = filtrarVentaActual(cadenaUbicacion, "Ubicaciones")
        ModeloGlobalFiltrosMod.Anterior = filtrarVentaAnterior(cadenaUbicacion, "Ubicaciones")

        AplicarFiltro(ModeloGlobalFiltrosMod, "Ubicaciones")

    });

    // Manejar el evento de cambio de estado de los checkboxes individuales
    $('#TablaFiltroUbicacion').on('change', 'input[type="checkbox"]', function () {
        var id = $(this).val();

        if ($(this).is(':checked')) {
            UbicacionesSelected.push(id);
        } else {
            var index = UbicacionesSelected.indexOf(id);
            if (index !== -1) {
                UbicacionesSelected.splice(index, 1);
            }
        }

        // Actualizar el estado del checkbox "Todos" según corresponda
        if ($('#TablaFiltroUbicacion input[type="checkbox"]').length === UbicacionesSelected.length) {
            $('#IdUbicacionTodo').prop('checked', true);
        } else {
            $('#IdUbicacionTodo').prop('checked', false);
        }

        cadenaUbicacion = UbicacionesSelected.join(', ');

        ModeloGlobalFiltrosMod = JSON.parse(JSON.stringify(ModeloGlobalFiltros));

        ModeloGlobalFiltrosMod.Actual = filtrarVentaActual(cadenaUbicacion, "Ubicaciones")
        ModeloGlobalFiltrosMod.Anterior = filtrarVentaAnterior(cadenaUbicacion, "Ubicaciones")

        AplicarFiltro(ModeloGlobalFiltrosMod, "Ubicaciones")

    });
});

var cadenaTipoServicio = '';
var TipoServicioSelected = [];
$(document).ready(function () {

    cadenaTipoServicio = TipoServicioSelected.join(', ');

    // Manejar el evento de cambio de estado del checkbox "Todos"
    $('#IdTipoServicioTodo').on('change', function () {
        if ($(this).is(':checked')) {
            // Seleccionar todos los checkboxes y guardar sus valores
            $('#TablaFiltroTipoServicio input[type="checkbox"]').prop('checked', true);
            TipoServicioSelected = $('#TablaFiltroTipoServicio input[type="checkbox"]').map(function () {
                return $(this).val();
            }).get();
        } else {
            // Deseleccionar todos los checkboxes y vaciar el array de valores seleccionados
            $('#TablaFiltroTipoServicio input[type="checkbox"]').prop('checked', false);
            TipoServicioSelected = [];
        }

        cadenaTipoServicio = TipoServicioSelected.join(', ');

        ModeloGlobalFiltrosMod = JSON.parse(JSON.stringify(ModeloGlobalFiltros));

        ModeloGlobalFiltrosMod.Actual = filtrarVentaActual(cadenaTipoServicio, "TipoServicio")
        ModeloGlobalFiltrosMod.Anterior = filtrarVentaAnterior(cadenaTipoServicio, "TipoServicio")

        AplicarFiltro(ModeloGlobalFiltrosMod, "TipoServicio")

    });

    // Manejar el evento de cambio de estado de los checkboxes individuales
    $('#TablaFiltroTipoServicio').on('change', 'input[type="checkbox"]', function () {
        var id = $(this).val();

        if ($(this).is(':checked')) {
            TipoServicioSelected.push(id);
        } else {
            var index = TipoServicioSelected.indexOf(id);
            if (index !== -1) {
                TipoServicioSelected.splice(index, 1);
            }
        }

        // Actualizar el estado del checkbox "Todos" según corresponda
        if ($('#TablaFiltroTipoServicio input[type="checkbox"]').length === TipoServicioSelected.length) {
            $('#IdTipoServicioTodo').prop('checked', true);
        } else {
            $('#IdTipoServicioTodo').prop('checked', false);
        }

        cadenaTipoServicio = TipoServicioSelected.join(', ');

        ModeloGlobalFiltrosMod = JSON.parse(JSON.stringify(ModeloGlobalFiltros));

        ModeloGlobalFiltrosMod.Actual = filtrarVentaActual(cadenaTipoServicio, "TipoServicio")
        ModeloGlobalFiltrosMod.Anterior = filtrarVentaAnterior(cadenaTipoServicio, "TipoServicio")

        AplicarFiltro(ModeloGlobalFiltrosMod, "TipoServicio")

    });
});

var cadenaContenedor = '';
var ContenedoresSelected = [];
$(document).ready(function () {

    cadenaContenedor = ContenedoresSelected.join(', ');

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


        ModeloGlobalFiltrosMod.Actual = filtrarVentaActual(cadenaContenedor, "Contenedores")
        ModeloGlobalFiltrosMod.Anterior = filtrarVentaAnterior(cadenaContenedor, "Contenedores")

        AplicarFiltro(ModeloGlobalFiltrosMod, "Contenedores")

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

        ModeloGlobalFiltrosMod.Actual = filtrarVentaActual(cadenaContenedor, "Contenedores")
        ModeloGlobalFiltrosMod.Anterior = filtrarVentaAnterior(cadenaContenedor, "Contenedores")

        AplicarFiltro(ModeloGlobalFiltrosMod, "Contenedores")

    });
});

function filtrarVentaActual(valores, FiltroName) {
    const valoresArray = valores.split(',').map(valor => valor.trim());
    const ArregloEquipos = cadenaEquipos.split(',').map(valor => valor.trim());

    switch (FiltroName) {
        case "Divisiones":
            return ModeloGlobalFiltrosMod.Actual.filter(dato => valoresArray.includes(dato.Division));
            break;
        case "Zonas":
            return ModeloGlobalFiltrosMod.Actual.filter(dato => valoresArray.includes(dato.Zona));
            break;
        case "Ubicaciones":
            return ModeloGlobalFiltrosMod.Actual.filter(dato => valoresArray.includes(dato.Ubicacion));
            break;
        case "Equipos":
            return ModeloGlobalFiltrosMod.Actual.filter(dato => valoresArray.includes(dato.Equipo));
            break;
        case "Contenedores":
            return ModeloGlobalFiltrosMod.Actual.filter(dato => valoresArray.includes(dato.Contenedor));
            break;
        case "TipoServicio":
            return ModeloGlobalFiltrosMod.Actual.filter(dato => valoresArray.includes(dato.TipoServicio) && ArregloEquipos.includes(dato.Equipo));
            break;
        default:
            ModeloGlobalFiltrosMod.Actual = []; // Restablece el valor de "ModeloGlobalFiltrosMod.Actual" a un arreglo vacío
            return ModeloGlobalFiltrosMod.Actual;
    }
}
function filtrarVentaAnterior(valores, FiltroName) {
    const valoresArray = valores.split(',').map(valor => valor.trim());
    const ArregloEquipos = cadenaEquipos.split(',').map(valor => valor.trim());


    switch (FiltroName) {
        case "Divisiones":
            return ModeloGlobalFiltrosMod.Anterior.filter(dato => valoresArray.includes(dato.Division));
            break;
        case "Zonas":
            return ModeloGlobalFiltrosMod.Anterior.filter(dato => valoresArray.includes(dato.Zona));
            break;
        case "Ubicaciones":
            return ModeloGlobalFiltrosMod.Anterior.filter(dato => valoresArray.includes(dato.Ubicacion));
            break;
        case "Equipos":
            return ModeloGlobalFiltrosMod.Anterior.filter(dato => valoresArray.includes(dato.Equipo));
            break;
        case "Contenedores":
            return ModeloGlobalFiltrosMod.Anterior.filter(dato => valoresArray.includes(dato.Contenedor));
            break;
        case "TipoServicio":
            return ModeloGlobalFiltrosMod.Anterior.filter(dato => valoresArray.includes(dato.TipoServicio) && ArregloEquipos.includes(dato.Equipo));
            break;
        default:
            ModeloGlobalFiltrosMod.Anterior = []; // Restablece el valor de "ModeloGlobalFiltrosMod.Anterior" a un arreglo vacío
            return ModeloGlobalFiltrosMod.Anterior;
    }
}
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
    var VentaActual = result.Actual.reduce((total, venta) => total + venta.VentaConsumibles, 0);
    var RentaActual = result.Actual.reduce((total, renta) => total + renta.RentaContenedor, 0);

    var VentaAnterior = result.Anterior.reduce((total, venta) => total + venta.VentaConsumibles, 0);
    var RentaAnterior = result.Anterior.reduce((total, renta) => total + renta.RentaContenedor, 0);

    var HtmlVentaActul = "";

    if (VentaActual > VentaAnterior) {
        HtmlVentaActul = `<span class="badge badge-light-success fs-base">` +
            `<i class="far fa-arrow-alt-circle-up text-success fs-1 me-2"></i> ${VentaActual.toLocaleString('en-US', FormatoDinero)}` +
            `</span>`;
    }
    else {
        HtmlVentaActul = `<span class="badge badge-light-danger fs-base">` +
            `<i class="far fa-arrow-alt-circle-down text-danger fs-1 me-2"></i> ${VentaActual.toLocaleString('en-US', FormatoDinero)}` +
            `</span>`;
    }

    $('#VentasActuales').html(HtmlVentaActul);

    var HtmlRentaActul = "";

    if (RentaActual > RentaAnterior) {
        HtmlRentaActul = `<span class="badge badge-light-success fs-base">` +
            `<i class="far fa-arrow-alt-circle-up text-success fs-1 me-2"></i> ${RentaActual.toLocaleString('en-US', FormatoDinero)}` +
            `</span>`;
    }
    else {
        HtmlRentaActul = `<span class="badge badge-light-danger fs-base">` +
            `<i class="far fa-arrow-alt-circle-down text-danger fs-1 me-2"></i> ${RentaActual.toLocaleString('en-US', FormatoDinero)}` +
            `</span>`;
    }

    $('#RentasActuales').html(HtmlRentaActul);
    $('#VentasAnterior').text(`${VentaAnterior.toLocaleString('en-US', FormatoDinero)}`);
    $('#RentasAnterior').text(`${RentaAnterior.toLocaleString('en-US', FormatoDinero)}`);

    var DataTotales = [{
        "year": "Ingresos",
        "Vendido": VentaActual,
        "Rentado": RentaActual,
        "Total": VentaActual + RentaActual
    }];

    //Grafica barras (Grafica ventas, rentas y total del mes actual )------------------------------------------
    IngresosTotales(DataTotales)

    var TotalGeneradoXServicio = [];

    result.Actual.forEach((dato) => {
        var area = dato.Zona;
        var tipoProducto = dato.TipoProducto;
        var totalGenerado = dato.TotalGenerado;

        if (!TotalGeneradoXServicio[area]) {
            TotalGeneradoXServicio[area] = {};
        }

        if (!TotalGeneradoXServicio[area][tipoProducto]) {
            TotalGeneradoXServicio[area][tipoProducto] = totalGenerado;
        } else {
            TotalGeneradoXServicio[area][tipoProducto] += totalGenerado;
        }
    });

    // Convierte el resultado en una matriz de objetos
    var resultArray = [];
    for (var area in TotalGeneradoXServicio) {
        var zonaData = TotalGeneradoXServicio[area];
        zonaData.UnidadOperativa = area;
        resultArray.push(zonaData);
    }

    //Grafica Lineal ( Grafica de ventas y rentas de mes actual)---------------------------------
    IngresosTotalesZona(resultArray)

    // Función para obtener valores únicos de una propiedad en el array de objetos
    var DatosActualAnterior = JSON.parse(JSON.stringify(result.Actual));
    //DatosActualAnterior = DatosActualAnterior.concat(JSON.parse(JSON.stringify(result.Anterior)));

    // Obtener valores únicos de cada propiedad
    const uniqueDivisiones = getUniqueValues(DatosActualAnterior, "Division");
    const uniqueZonas = getUniqueValues(DatosActualAnterior, "Zona");
    const uniqueUbicaciones = getUniqueValues(DatosActualAnterior, "Ubicacion");
    const uniqueEquipos = getUniqueValues(DatosActualAnterior, "Equipo");
    const uniqueContenedores = getUniqueValues(DatosActualAnterior, "Contenedor");
    var uniqueTiposServicio = getUniqueValues(DatosActualAnterior, "TipoServicio"); uniqueTiposServicio = uniqueTiposServicio.filter(item => item !== "NA");


    if (FiltroName != "Divisiones" && FiltroName != "Zonas" && FiltroName != "Ubicaciones" && FiltroName != "Equipos" && FiltroName != "Contenedores" && FiltroName != "TipoServicio") {
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

    if (FiltroName != "Zonas" && FiltroName != "Ubicaciones" && FiltroName != "Equipos" && FiltroName != "Contenedores" && FiltroName != "TipoServicio") {
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

    if (FiltroName != "Ubicaciones" && FiltroName != "Equipos" && FiltroName != "Contenedores" && FiltroName != "TipoServicio") {
        // Datos para filtro Ubicaciones
        var printUbicaciones = "";
        for (i = 0; i < uniqueUbicaciones.length; i++) {
            printUbicaciones = printUbicaciones + `<tr><td><div class="form-check form-check-custom form-check-sm">` +
                `<input type="checkbox" name="" id="${uniqueUbicaciones[i]}" value="${uniqueUbicaciones[i]}" class="form-check-input border border-dark me-2">` +
                `<label for="${uniqueUbicaciones[i]}">${uniqueUbicaciones[i]}</label></div></td></tr>`;
        }
        $("#TablaFiltroUbicacion").html(printUbicaciones);

        // Seleccionar todos los checkboxes al cargar la página
        $('#IdUbicacionTodo').prop('checked', true);
        $('#TablaFiltroUbicacion input[type="checkbox"]').prop('checked', true);

        // Obtener los valores de los checkboxes seleccionados
        UbicacionesSelected = $('#TablaFiltroUbicacion input[type="checkbox"]').map(function () {
            return $(this).val();
        }).get();
    }

    if (FiltroName != "Equipos" && FiltroName != "Contenedores" && FiltroName != "TipoServicio") {
        // Datos para  filtro de Equipos
        var printEquipos = "";
        for (i = 0; i < uniqueEquipos.length; i++) {
            printEquipos = printEquipos + `<tr><td><div class="form-check form-check-custom form-check-sm">` +
                `<input type="checkbox" name="" id="${uniqueEquipos[i]}" value="${uniqueEquipos[i]}" class="form-check-input border border-dark me-2">` +
                `<label for="${uniqueEquipos[i]}">${uniqueEquipos[i]}</label></div></td></tr>`;
        }
        $("#TablaFiltroEquipo").html(printEquipos);

        // Seleccionar todos los checkboxes al cargar la página
        $('#IdEquipoTodo').prop('checked', true);
        $('#TablaFiltroEquipo input[type="checkbox"]').prop('checked', true);

        // Obtener los valores de los checkboxes seleccionados
        EquiposSelected = $('#TablaFiltroEquipo input[type="checkbox"]').map(function () {
            return $(this).val();
        }).get();
    }

    if (FiltroName != "Contenedores" && FiltroName != "TipoServicio") {
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

    if (FiltroName != "TipoServicio") {
        // Datos para filtro Tipos de servicios
        var printTipoServicios = "";
        for (i = 0; i < uniqueTiposServicio.length; i++) {
            printTipoServicios = printTipoServicios + `<tr><td><div class="form-check form-check-custom form-check-sm">` +
                `<input type="checkbox" name="" id="${uniqueTiposServicio[i]}" value="${uniqueTiposServicio[i]}" class="form-check-input border border-dark me-2">` +
                `<label for="${uniqueTiposServicio[i]}">${uniqueTiposServicio[i]}</label></div></td></tr>`;
        }
        $("#TablaFiltroTipoServicio").html(printTipoServicios);

        // Seleccionar todos los checkboxes al cargar la página
        $('#IdTipoServicioTodo').prop('checked', true);
        $('#TablaFiltroTipoServicio input[type="checkbox"]').prop('checked', true);

        // Obtener los valores de los checkboxes seleccionados
        TipoServicioSelected = $('#TablaFiltroTipoServicio input[type="checkbox"]').map(function () {
            return $(this).val();
        }).get();
    }

    if (FiltroName != "") {
        //Proceso de filtrado de las tablas 
        const EquiposTablas = getUniqueValues(result.Actual, "Equipo");

        ModeloGlobalTablasMod = JSON.parse(JSON.stringify(ModeloGlobalTablas));
        var DataTablesFiltradas = FiltrarDataTables(EquiposTablas)
        AplicarFiltroTablas(DataTablesFiltradas)
    }

}
function FiltrarDataTables(valores) {
    ModeloGlobalTablasMod.HerramientaSolicitud = ModeloGlobalTablasMod.HerramientaSolicitud.filter(dato => valores.includes(dato.Equipo));
    ModeloGlobalTablasMod.HerraPdaXCont = ModeloGlobalTablasMod.HerraPdaXCont.filter(dato => valores.includes(dato.Equipo));
    ModeloGlobalTablasMod.Solicitud = ModeloGlobalTablasMod.Solicitud.filter(dato => valores.includes(dato.Equipo));

    return ModeloGlobalTablasMod;
}
//=====================================begin-> Mostrar tablas ===============================================
function AplicarFiltroTablas(result) {

    var tHerraPdaXCont = $("#HerraPdaXCont").DataTable();
    var tCLasificacion = $("#ToolsClasificacion").DataTable();
    var tSolicitud = $("#Solicitud").DataTable();

    tHerraPdaXCont.clear().draw();
    tCLasificacion.clear().draw();
    tSolicitud.clear().draw();

    for (var i = 0; i < result.HerraPdaXCont.length; i++) {
        tHerraPdaXCont.row.add(
            [
                result.HerraPdaXCont[i].Zona,
                result.HerraPdaXCont[i].Equipo,
                result.HerraPdaXCont[i].Partida,
                result.HerraPdaXCont[i].Descripcion,
                `<a class="text-primary text-hover-primary" onclick="GetPartUsadas('${result.HerraPdaXCont[i].Equipo}', '${result.HerraPdaXCont[i].Partida}', \`${encodeURIComponent(result.HerraPdaXCont[i].Descripcion)}\` )"> ${result.HerraPdaXCont[i].Salida}</a>`,
                result.HerraPdaXCont[i].Mes
            ]).draw(false);
    }


    for (var i = 0; i < result.HerramientaSolicitud.length; i++) {
        tCLasificacion.row.add(
            [
                result.HerramientaSolicitud[i].Zona,
                result.HerramientaSolicitud[i].Equipo,
                result.HerramientaSolicitud[i].Clasificacion,
                `<a class="text-primary text-hover-primary" onclick="GetPartUsadasXclasif('${result.HerramientaSolicitud[i].Equipo}', '${result.HerramientaSolicitud[i].IdClasificacion}', '${result.HerramientaSolicitud[i].Clasificacion}' )"> ${result.HerramientaSolicitud[i].Salida}</a>`,
                result.HerramientaSolicitud[i].Mes
            ]).draw(false);
    }

    for (var i = 0; i < result.Solicitud.length; i++) {
        tSolicitud.row.add(
            [
                result.Solicitud[i].Zona,
                result.Solicitud[i].Equipo,
                `<a class="text-primary text-hover-primary" onclick="GetPartidasXequipo('${result.Solicitud[i].Equipo}' )"> ${result.Solicitud[i].Partidas}</a>`,
                `<a class="text-primary text-hover-primary" onclick="GetFolioXequipo('${result.Solicitud[i].Equipo}' )"> ${result.Solicitud[i].Solicitudes}</a>`,
                result.Solicitud[i].Mes
            ]).draw(false);
    }

}
//=====================================end-> Mostrar tablas ===============================================

/*Modales de tablas*/

var PartUsadasXclasif = $('#TablaPartUsadasXclasif').DataTable({ "order": [] });
var tPartUsadas = $('#TablaPartUsadas').DataTable({ "order": [] });
var tPartidasXequipo = $('#TablaPartidasXequipo').DataTable({ "order": [] });
var tFolioXequipo = $('#TablaFolioXequipo').DataTable({ "order": [] });
function GetPartUsadas(Equipo, Partida, Descripcion) {
    var Fecha = $('#RangoFechas').val();

    $('#PartidaId').text(`${Partida} - ${decodeURIComponent(Descripcion)}`,);

    if (Fecha != "") {
        BlockPantalla.block()
        $.ajax({
            url: "VentasRentas/GetPartUsadas",
            type: "post",
            data: {
                TipoPeticion: 1,
                Fecha: Fecha,
                Equipo: Equipo,
                Partida: Partida
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

                    tPartUsadas.clear().draw();

                    for (var i = 0; i < result.length; i++) {
                        tPartUsadas.row.add(
                            [
                                result[i].Folio,
                                result[i].Cantidad,
                                result[i].Precio,
                                result[i].Importe,
                                result[i].Moneda,
                                result[i].PersonalPmX,
                                result[i].Autoriza,
                                result[i].Fecha,
                            ]).draw(false);
                    }

                    BlockPantalla.release()

                    $("#ModalPartUsadas").modal("show");
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
function GetPartUsadasXclasif(Equipo, IdClasificacion, Clasificacion) {
    var Fecha = $('#RangoFechas').val();

    $('#ClasificacionId').text(Clasificacion);

    if (Fecha != "") {
        BlockPantalla.block()
        $.ajax({
            url: "VentasRentas/GetPartUsadasXclasif",
            type: "post",
            data: {
                TipoPeticion: 1,
                Fecha: Fecha,
                Equipo: Equipo,
                IdClasificacion: IdClasificacion
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

                    PartUsadasXclasif.clear().draw();

                    for (var i = 0; i < result.length; i++) {
                        PartUsadasXclasif.row.add(
                            [
                                result[i].Partida,
                                result[i].Descripcion,
                                result[i].Cantidad,
                            ]).draw(false);
                    }

                    BlockPantalla.release()

                    $("#ModalPartUsadasXclasif").modal("show");

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
function GetPartidasXequipo(Equipo) {
    var Fecha = $('#RangoFechas').val();

    if (Fecha != "") {
        BlockPantalla.block()
        $.ajax({
            url: "VentasRentas/GetPartidasXequipo",
            type: "post",
            data: {
                TipoPeticion: 1,
                Fecha: Fecha,
                Equipo: Equipo,
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

                    tPartidasXequipo.clear().draw();

                    for (var i = 0; i < result.length; i++) {
                        tPartidasXequipo.row.add(
                            [
                                result[i].Partida,
                                result[i].Descripcion,
                                result[i].Cantidad,
                            ]).draw(false);
                    }

                    BlockPantalla.release()

                    $("#ModalPartidasXequipo").modal("show");

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
function GetFolioXequipo(Equipo) {
    var Fecha = $('#RangoFechas').val();

    if (Fecha != "") {
        BlockPantalla.block()
        $.ajax({
            url: "VentasRentas/GetFolioXequipo",
            type: "post",
            data: {
                TipoPeticion: 1,
                Fecha: Fecha,
                Equipo: Equipo,
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

                    tFolioXequipo.clear().draw();

                    for (var i = 0; i < result.length; i++) {
                        tFolioXequipo.row.add(
                            [
                                result[i].Folio,
                                result[i].Cantidad,
                                result[i].Precio,
                                result[i].Importe,
                                result[i].Moneda,
                                result[i].PersonalPmX,
                                result[i].Autoriza,
                                result[i].Fecha,
                            ]).draw(false);
                    }

                    BlockPantalla.release()

                    $("#ModalFolioXequipo").modal("show");
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