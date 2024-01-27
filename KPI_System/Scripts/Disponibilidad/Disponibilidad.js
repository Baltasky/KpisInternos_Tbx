//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// GRAFICAS ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//********* Start  ****************************************************************************************
var Chart1Series;
var Chart1legend;
am5.ready(function () {
    // Create root element
    var root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    root._logo.dispose();

    var chart = root.container.children.push(
        am5percent.PieChart.new(root, {
            layout: root.horizontalLayout
        })
    );



    // Create series
    Chart1Series = chart.series.push(
        am5percent.PieSeries.new(root, {
            name: "Series",
            valueField: "Value",
            categoryField: "Zona",
            legendLabelText: "[{fill}]{Zona}[/]",
            legendValueText: "[bold {fill}:] {value}[/]"
        })
    );


    // Add legend
    Chart1legend = chart.children.push(
        am5.Legend.new(root, {
            centerY: am5.percent(50),
            y: am5.percent(50),
            layout: root.verticalLayout
        })
    );


});

function Chart1Execute(data) {
    Chart1Series.data.setAll(data);
    Chart1Series.labels.template.set("forceHidden", true);
    Chart1Series.ticks.template.set("forceHidden", true);

    Chart1legend.data.setAll(Chart1Series.dataItems);
}
//********* END  ****************************************************************************************

//********* Start  ****************************************************************************************
var Chart2Series;
var Chart2legend;
am5.ready(function () {
    // Create root element
    var root = am5.Root.new("chartdiv2");

    // Set themes
    root.setThemes([
        am5themes_Material.new(root)
    ]);

    root._logo.dispose();

    var chart = root.container.children.push(
        am5percent.PieChart.new(root, {
            layout: root.horizontalLayout
        })
    );

    // Create series
    Chart2Series = chart.series.push(
        am5percent.PieSeries.new(root, {
            name: "Series",
            valueField: "Value",
            categoryField: "Zona",
            legendLabelText: "[{fill}]{Zona}[/]",
            legendValueText: "[bold {fill}:] {value}[/]"
        })
    );


    // Add legend
    Chart2legend = chart.children.push(
        am5.Legend.new(root, {
            centerY: am5.percent(50),
            y: am5.percent(50),
            layout: root.verticalLayout
        })
    );


});

function Chart2Execute(data) {
    Chart2Series.data.setAll(data);
    Chart2Series.labels.template.set("forceHidden", true);
    Chart2Series.ticks.template.set("forceHidden", true);

    Chart2legend.data.setAll(Chart2Series.dataItems);
}
//********* END  ****************************************************************************************

//********* Start Ingresos Totales por Zona ****************************************************************************************
var xAxisIngresosZona;
var seriesIngresosZona;
var CrearSeriesZona;
var legendIngresosZona;
var chartIngresosZona;
var ExportarDataZona;
am5.ready(function () {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv3");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    root._logo.dispose();

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
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

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chartIngresosZona.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // The data
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
            categoryField: "Titulo",
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
                categoryXField: "Titulo",
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

function GraficaContenedores(nuevosDatos) {

    chartIngresosZona.series.clear();

    xAxisIngresosZona.data.setAll(nuevosDatos);
    CrearSeriesZona("Contenedores", "Contenedores");
    seriesIngresosZona.data.setAll(nuevosDatos);
    seriesIngresosZona.appear(1000);

    ExportarDataZona(nuevosDatos)

    legendIngresosZona.data.setAll(chartIngresosZona.series.values);
}
//********* End Ingresos Totales por Zona ****************************************************************************************


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// FUNCIONES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    //Ocultar AsideMenu
    $("#kt_body").attr("data-kt-aside-minimize", "on");

    //Tablas flexibles
    $('.dataTables_scrollHeadInner').css('max-width', '100%');
    $('.dataTables_scrollHeadInner').css('min-width', '90%');

    GetDisponibilidad()
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

function GetDisponibilidad() {
    var Fecha = $('#RangoFechas').val();

    $('#CardFiltros').addClass("d-none");

    if (Fecha != "") {
        BlockPantalla.block()
        $.ajax({
            url: "Disponibilidad/DisponibilidadFiltro",
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

                    GetDisponibilidadContenedores(Fecha)
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

function GetDisponibilidadContenedores(Fecha) {

    $.ajax({
        url: "Disponibilidad/DisponibilidadContenedores",
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

                //console.log(result.DisponibilidadContenedores)

                //if (result.DisponibilidadContenedores.length < 1) {
                //    $('#ContenedoresProduccion').val("0");
                //    $('#TotalContenedores').val("0");
                //    $('#ContenedoresDisponibles').val("0");

                //    var Datos = [{ Titulo: "Contenedores Producción", Contenedores: 0 },
                //    { Titulo: "Total Contenedores", Contenedores: 0 },
                //    { Titulo: "Total Contenedores Disponibles", Contenedores: 0 }];

                //    GraficaContenedores(Datos)

                //}
                //else {
                //    $('#ContenedoresProduccion').val(result.DisponibilidadContenedores[0].Totalcontenedoresporcontrato);
                //    $('#TotalContenedores').val(result.DisponibilidadContenedores[0].TotaldeContendores);
                //    $('#ContenedoresDisponibles').val(result.DisponibilidadContenedores[0].TotalDisponibles);

                //    var Datos = [{ Titulo: "Contenedores Producción", Contenedores: result.DisponibilidadContenedores[0].Totalcontenedoresporcontrato },
                //    { Titulo: "Total Contenedores", Contenedores: result.DisponibilidadContenedores[0].TotaldeContendores },
                //    { Titulo: "Total Contenedores Disponibles", Contenedores: result.DisponibilidadContenedores[0].TotalDisponibles }];

                //    GraficaContenedores(Datos)

                //}

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
        ModeloGlobalFiltrosMod.DisponibilidadFiltro = FiltrarDisponibilidad(cadenaDivisiones, "Divisiones")
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
        ModeloGlobalFiltrosMod.DisponibilidadFiltro = FiltrarDisponibilidad(cadenaDivisiones, "Divisiones")
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
        ModeloGlobalFiltrosMod.DisponibilidadFiltro = FiltrarDisponibilidad(cadenaZonas, "Zonas")
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
        ModeloGlobalFiltrosMod.DisponibilidadFiltro = FiltrarDisponibilidad(cadenaZonas, "Zonas")
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

        ModeloGlobalFiltrosMod.DisponibilidadFiltro = FiltrarDisponibilidad(cadenaContenedor, "Contenedores")


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

        ModeloGlobalFiltrosMod.DisponibilidadFiltro = FiltrarDisponibilidad(cadenaContenedor, "Contenedores")

        AplicarFiltro(ModeloGlobalFiltrosMod, "Contenedores")

        console.log(cadenaContenedor);
        console.log("ter3")
    });
});

function FiltrarDisponibilidad(valores, FiltroName) {
    const valoresArray = valores.split(',').map(valor => valor.trim());

    switch (FiltroName) {
        case "Divisiones":
            return ModeloGlobalFiltrosMod.DisponibilidadFiltro.filter(dato => valoresArray.includes(dato.Division));
            break;
        case "Zonas":
            return ModeloGlobalFiltrosMod.DisponibilidadFiltro.filter(dato => valoresArray.includes(dato.Zona));
            break;
        case "Contenedores":
            return ModeloGlobalFiltrosMod.DisponibilidadFiltro.filter(dato => valoresArray.includes(dato.Contenedor));
            break;
        default:
            ModeloGlobalFiltrosMod.DisponibilidadFiltro = []; // Restablece el valor de "ModeloGlobalFiltrosMod.Actual" a un arreglo vacío
            return ModeloGlobalFiltrosMod.DisponibilidadFiltro;
    }
}

function AplicarFiltro(result, FiltroName) {

    var ExistenciaConsumibles = result.DisponibilidadFiltro.reduce((total, partida) => total + partida.Existenciaconsumibles, 0);
    var ExistenciaRealHerramientas = result.DisponibilidadFiltro.reduce((total, partida) => total + partida.ExistenciaRealHerramientas, 0);
    var TotalHerramientas = result.DisponibilidadFiltro.reduce((total, partida) => total + partida.TotalHttasDisponibles, 0);
    //var TotalHerramientas = ExistenciaConsumibles + ExistenciaRealHerramientas;

    $('#ExistenciaConsumibles').val(`${ExistenciaConsumibles.toFixed(2)}`);
    $('#ExistenciaRealHerramientas').val(`${ExistenciaRealHerramientas.toFixed(2)}`);
    $('#TotalHerramientas').val(`${TotalHerramientas.toFixed(2)}`);

    var DataExistenciaConsumibles = [];
    const sumasPorZona1 = {};

    result.DisponibilidadFiltro.forEach((dato) => {
        const zona = dato.Zona;

        if (!sumasPorZona1[zona]) {
            sumasPorZona1[zona] = {
                Value: 0
            };
        }
        sumasPorZona1[zona].Value += dato.Existenciaconsumibles;
    });

    for (const zona in sumasPorZona1) {
        DataExistenciaConsumibles.push({
            Zona: zona,
            Value: sumasPorZona1[zona].Value,
        });
    }

    Chart1Execute(DataExistenciaConsumibles)


    var DataExistenciaRealHerramientas = [];
    const sumasPorZona2 = {};

    result.DisponibilidadFiltro.forEach((dato) => {
        const zona = dato.Zona;

        if (!sumasPorZona2[zona]) {
            sumasPorZona2[zona] = {
                Value: 0
            };
        }
        sumasPorZona2[zona].Value += dato.ExistenciaRealHerramientas;
    });

    for (const zona in sumasPorZona2) {
        DataExistenciaRealHerramientas.push({
            Zona: zona,
            Value: sumasPorZona2[zona].Value,
        });
    }

    Chart2Execute(DataExistenciaRealHerramientas)

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
    const uniqueDivisiones = getUniqueValues(result.DisponibilidadFiltro, "Division");
    const uniqueZonas = getUniqueValues(result.DisponibilidadFiltro, "Zona");
    const uniqueContenedores = getUniqueValues(result.DisponibilidadFiltro, "Contenedor");

    if (FiltroName != "Divisiones" && FiltroName != "Zonas" && FiltroName != "Contenedores") {
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

    if (FiltroName != "Zonas" && FiltroName != "Contenedores") {
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

    if (FiltroName != "Contenedores") {
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

}