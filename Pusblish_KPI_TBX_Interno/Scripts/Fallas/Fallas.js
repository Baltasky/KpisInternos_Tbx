//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// GRAFICAS ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//********* Start Ingresos Totales por Zona ****************************************************************************************
var xAxisIngresosZona;
var seriesIngresosZona;
var CrearSeriesZona;
var legendIngresosZona;
var chartIngresosZona;
var ExportarDataZona;
am5.ready(function () {

    var root = am5.Root.new("GraficaFallas");

    root.setThemes([
        am5themes_Kelly.new(root)
    ]);

    root._logo.dispose();

    chartIngresosZona = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
            pinchZoomX: true
        })
    );

    var cursor = chartIngresosZona.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    var data = [];

    function ExportarData(datos) {
        var exporting = am5plugins_exporting.Exporting.new(root, {
            menu: am5plugins_exporting.ExportingMenu.new(root, {}),
            dataSource: datos,
        });
    }

    ExportarDataZona = ExportarData;

    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        rotation: -26,
        paddingRight: 15
    });

    xRenderer.grid.template.setAll({
        location: 1
    })

    xAxisIngresosZona = chartIngresosZona.xAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: "Zona",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        })
    );

    /*  xAxisIngresosZona.data.setAll(data);*/

    var yAxis = chartIngresosZona.yAxes.push(
        am5xy.ValueAxis.new(root, {
            maxPrecision: 0,
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })

        })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function createSeries(name, field) {

        seriesIngresosZona = chartIngresosZona.series.push(
            am5xy.LineSeries.new(root, {
                name: name,
                xAxis: xAxisIngresosZona,
                yAxis: yAxis,
                valueYField: field,
                categoryXField: "Zona",
                tooltip: am5.Tooltip.new(root, {
                    pointerOrientation: "horizontal",
                    labelText: "[bold]{name}[/]\n{categoryX}: {valueY}"
                })
            })
        );

        seriesIngresosZona.bullets.push(function () {
            return am5.Bullet.new(root, {
                sprite: am5.Circle.new(root, {
                    radius: 5,
                    fill: seriesIngresosZona.get("fill")
                })
            });
        });

        seriesIngresosZona.set("setStateOnChildren", true);
        seriesIngresosZona.states.create("hover", {});

        seriesIngresosZona.mainContainer.set("setStateOnChildren", true);
        seriesIngresosZona.mainContainer.states.create("hover", {});

        seriesIngresosZona.strokes.template.states.create("hover", {
            strokeWidth: 4
        });

    }

    CrearSeriesZona = createSeries;

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chartIngresosZona.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal",
        marginBottom: 20
    }));

    legendIngresosZona = chartIngresosZona.children.push(
        am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
        })
    );

    // Make series change state when legend item is hovered
    legendIngresosZona.itemContainers.template.states.create("hover", {});

    legendIngresosZona.itemContainers.template.events.on("pointerover", function (e) {
        e.target.dataItem.dataContext.hover();
    });
    legendIngresosZona.itemContainers.template.events.on("pointerout", function (e) {
        e.target.dataItem.dataContext.unhover();
    });


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chartIngresosZona.appear(1000, 100);

});

function IngresosTotalesZona(nuevosDatos) {

    chartIngresosZona.series.clear();
    legendIngresosZona.data.setAll(chartIngresosZona.series.values);

    xAxisIngresosZona.data.setAll(nuevosDatos);
    CrearSeriesZona("Perdidas", "Perdidas");

    seriesIngresosZona.data.setAll(nuevosDatos);
    seriesIngresosZona.appear(1000);
    legendIngresosZona.data.setAll(chartIngresosZona.series.values);

    CrearSeriesZona("Dañadas", "Danadas");
    seriesIngresosZona.data.setAll(nuevosDatos);
    seriesIngresosZona.appear(1000);
    legendIngresosZona.data.setAll(chartIngresosZona.series.values);

    ExportarDataZona(nuevosDatos)

    //legendIngresosZona.data.setAll(chartIngresosZona.series.values);
}
//********* End Ingresos Totales por Zona ****************************************************************************************

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// DATATABLES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//********* Start DataTable  Partidas utilizadas por tipo de herramienta(Consumible y Herramienta) ****************************************************************************************var series;
var TablaFallas = $("#TablaFallas").DataTable({
    "info": true,
    "order": [],
    'pageLength': 10,
 
});
//********* End DataTable  Partidas utilizadas por tipo de herramienta(Consumible y Herramienta) ****************************************************************************************;

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

    GetFallas()
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

//Sirve para darle formato de dinero a los numeros.--------------------------------------------------------------------
const FormatoDinero = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
};
//---------------------------------------------------------------------------------------------------------------------

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

function GetEquipos() {
    BlockFiltros.block()

    var S2_Equipos = $("#S2_Equipos");
    $('#S2_Equipos').empty().trigger("change");
    S2_Equipos.append('<option></option>');

    $.ajax({
        url: "/Fallas/GetEquiposByPeriodo",
        type: "post",
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
            else if (result != "Error") {

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

function GetFallas() {
    var Fecha = $('#RangoFechas').val();
    $('#CardFiltros').addClass("d-none");
    var Equipos = $("#S2_Equipos").val();

    if (Fecha != "") {
        BlockPantalla.block()
        $.ajax({
            url: "Fallas/FallasFiltro",
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

                    if (Equipos == "") {
                        $('#idFiltros').removeClass("d-none");

                    } else {
                        $('#idFiltros').addClass("d-none");
                    }


                    ModeloGlobalFiltros = result;

                    AplicarFiltro(result, "")

                    $('#CardFiltros').removeClass("d-none");

                    BlockPantalla.release()

                    /* GetVentasTablas(Fecha)*/
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
        ModeloGlobalFiltrosMod.Fallas = FiltrarFallas(cadenaDivisiones, "Divisiones")
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
        ModeloGlobalFiltrosMod.Fallas = FiltrarFallas(cadenaDivisiones, "Divisiones")
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
        ModeloGlobalFiltrosMod.Fallas = FiltrarFallas(cadenaZonas, "Zonas")
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

        ModeloGlobalFiltrosMod.Fallas = FiltrarFallas(cadenaZonas, "Zonas")

        console.log(ModeloGlobalFiltrosMod)

        AplicarFiltro(ModeloGlobalFiltrosMod, "Zonas")

        console.log(cadenaZonas);
        console.log("ter3")
    });
});

var cadenaUbicacion = '';
var UbicacionesSelected = [];
$(document).ready(function () {

    cadenaUbicacion = UbicacionesSelected.join(', ');
    console.log(cadenaUbicacion);
    console.log("primer")

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

        ModeloGlobalFiltrosMod.Fallas = FiltrarFallas(cadenaUbicacion, "Ubicaciones")

        AplicarFiltro(ModeloGlobalFiltrosMod, "Ubicaciones")

        //console.log(cadenaUbicacion);
        console.log("segundo")
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

        ModeloGlobalFiltrosMod.Fallas = FiltrarFallas(cadenaUbicacion, "Ubicaciones")

        AplicarFiltro(ModeloGlobalFiltrosMod, "Ubicaciones")

        console.log(cadenaUbicacion);
        console.log("ter3")
    });
});

var cadenaEquipos = '';
var EquiposSelected = [];
$(document).ready(function () {

    cadenaEquipos = EquiposSelected.join(', ');
    console.log(cadenaEquipos);
    console.log("primer")

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

        ModeloGlobalFiltrosMod.Fallas = FiltrarFallas(cadenaEquipos, "Equipos")

        console.log(ModeloGlobalFiltrosMod)

        AplicarFiltro(ModeloGlobalFiltrosMod, "Equipos")

        console.log(cadenaEquipos);
        console.log("segundo")
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

        ModeloGlobalFiltrosMod.Fallas = FiltrarFallas(cadenaEquipos, "Equipos")

        AplicarFiltro(ModeloGlobalFiltrosMod, "Equipos")


        console.log("ter3")
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

        ModeloGlobalFiltrosMod.Fallas = FiltrarFallas(cadenaContenedor, "Contenedores")


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

        ModeloGlobalFiltrosMod.Fallas = FiltrarFallas(cadenaContenedor, "Contenedores")

        AplicarFiltro(ModeloGlobalFiltrosMod, "Contenedores")

        console.log(cadenaContenedor);
        console.log("ter3")
    });
});

var cadenaTipoServicio = '';
var TipoServicioSelected = [];
$(document).ready(function () {

    cadenaTipoServicio = TipoServicioSelected.join(', ');
    console.log(cadenaTipoServicio);
    console.log("primer")

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

        ModeloGlobalFiltrosMod.Fallas = FiltrarFallas(cadenaTipoServicio, "TipoServicio")

        AplicarFiltro(ModeloGlobalFiltrosMod, "TipoServicio")

        //console.log(cadenaTipoServicio);
        console.log("segundo")
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

        ModeloGlobalFiltrosMod.Fallas = FiltrarFallas(cadenaTipoServicio, "TipoServicio")

        AplicarFiltro(ModeloGlobalFiltrosMod, "TipoServicio")

        console.log(cadenaTipoServicio);
        console.log("ter3")
    });
});

function FiltrarFallas(valores, FiltroName) {
    const valoresArray = valores.split(',').map(valor => valor.trim());
    const ArregloEquipos = cadenaEquipos.split(',').map(valor => valor.trim());

    switch (FiltroName) {
        case "Divisiones":
            return ModeloGlobalFiltrosMod.Fallas.filter(dato => valoresArray.includes(dato.Division));
            break;
        case "Zonas":
            return ModeloGlobalFiltrosMod.Fallas.filter(dato => valoresArray.includes(dato.Zona));
            break;
        case "Ubicaciones":
            return ModeloGlobalFiltrosMod.Fallas.filter(dato => valoresArray.includes(dato.Ubicacion));
            break;
        case "Equipos":
            return ModeloGlobalFiltrosMod.Fallas.filter(dato => valoresArray.includes(dato.Equipo));
            break;
        case "Contenedores":
            return ModeloGlobalFiltrosMod.Fallas.filter(dato => valoresArray.includes(dato.Contenedor));
            break;
        case "TipoServicio":
            return ModeloGlobalFiltrosMod.Fallas.filter(dato => valoresArray.includes(dato.TipoServicio) && ArregloEquipos.includes(dato.Equipo));
            break;
        default:
            ModeloGlobalFiltrosMod.Fallas = []; // Restablece el valor de "ModeloGlobalFiltrosMod.Actual" a un arreglo vacío
            return ModeloGlobalFiltrosMod.Fallas;
    }
}

function AplicarFiltro(result, FiltroName) {

    console.log(result)

    var DataTotalesZona = [];
    const sumasPorZona = {};

    result.Fallas.forEach((dato) => {
        const zona = dato.Zona;

        if (!sumasPorZona[zona])
        {
            sumasPorZona[zona] = {
                Perdidas: 0,
                Danadas: 0,
            };
        }

        sumasPorZona[zona].Perdidas += dato.Perdidas;
        sumasPorZona[zona].Danadas += dato.Danadas;
    });

    for (const zona in sumasPorZona) {
        DataTotalesZona.push({
            Zona: zona,
            Perdidas: sumasPorZona[zona].Perdidas,
            Danadas: sumasPorZona[zona].Danadas,
            Totales: sumasPorZona[zona].Danadas + sumasPorZona[zona].Perdidas,
        });
    }

    console.log(DataTotalesZona)

    //Grafica Lineal ---------------------------------
    IngresosTotalesZona(DataTotalesZona)


    // Objeto para almacenar las sumas transformadas
    var sumasTransformadas = {};

    // Recorrer el array original y agrupar las sumas
    result.Fallas.forEach((dato) => {
        const key = `${dato.Zona}_${dato.Equipo}`;

        if (!sumasTransformadas[key]) {
            sumasTransformadas[key] = {
                "Zona": dato.Zona,
                "Equipo": dato.Equipo,
                "Danadas": 0,
                "Perdidas": 0
            };
        }

        sumasTransformadas[key].Danadas += dato.Danadas;
        sumasTransformadas[key].Perdidas += dato.Perdidas;
    });

    // Crear un nuevo array con las sumas transformadas
    var DataTotalesTransformadas = Object.values(sumasTransformadas).map((suma) => {
        return {
            "Zona": suma.Zona,
            "Equipo": suma.Equipo,
            "Perdidas": suma.Perdidas,
            "Danadas": suma.Danadas,
            "Totales": suma.Danadas + suma.Perdidas
        };
    });

    console.log(DataTotalesTransformadas);

    TablaFallas.clear().draw();

    for (var i = 0; i < DataTotalesTransformadas.length; i++) {
        TablaFallas.row.add(
            [
                DataTotalesTransformadas[i].Zona,
                DataTotalesTransformadas[i].Equipo,
                DataTotalesTransformadas[i].Danadas,
                DataTotalesTransformadas[i].Perdidas,
                `<a class="text-primary text-hover-primary" onclick="GetPartDanadasPerdidas('${DataTotalesTransformadas[i].Equipo}')"> ${DataTotalesTransformadas[i].Totales}</a>`,
                "24 Horas",
            ]).draw(false);
    }

    // Función para obtener valores únicos de una propiedad en el array de objetos
    function getUniqueValues(data, property) {
        const uniqueValues = [];
        data.forEach(item => {
            if (!uniqueValues.includes(item[property])) {
                uniqueValues.push(item[property]);
            }
        });
        return uniqueValues;
    }

    // Obtener valores únicos de cada propiedad
    const uniqueDivisiones = getUniqueValues(result.Fallas, "Division");
    const uniqueZonas = getUniqueValues(result.Fallas, "Zona");
    const uniqueUbicaciones = getUniqueValues(result.Fallas, "Ubicacion");
    const uniqueEquipos = getUniqueValues(result.Fallas, "Equipo");
    const uniqueContenedores = getUniqueValues(result.Fallas, "Contenedor");
    const uniqueTiposServicio = getUniqueValues(result.Fallas, "TipoServicio");

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

}

/*Modales de tablas*/

var tDanadasPerdidas = $('#TablaDanadasPerdidas').DataTable({ "order": [] });
function GetPartDanadasPerdidas(Equipo) {
    var Fecha = $('#RangoFechas').val();

    if (Fecha != "") {
        BlockPantalla.block()
        $.ajax({
            url: "Fallas/GetPartDanadasPerdidas",
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

                    tDanadasPerdidas.clear().draw();

                    for (var i = 0; i < result.length; i++) {
                        tDanadasPerdidas.row.add(
                            [
                                result[i].Condicion,
                                result[i].Partida,
                                result[i].DescripcionPartida,
                                result[i].UnidadMedida,
                                result[i].FamiliaHerramienta,
                                result[i].PersonaPemex,
                                result[i].NombreAutorizaPemex,
                                result[i].Fecha,
                            ]).draw(false);
                    }

                    BlockPantalla.release()

                    $("#ModalDanadasPerdidas").modal("show");
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