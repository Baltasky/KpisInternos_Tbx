//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// DATATABLES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//********* Start DataTable ReporteVentas****************************************************************************************
var TablaReporteVentas = function () {
    var table;
    var datatable;

    var initDatatable = function () {
        datatable = $(table).DataTable({
            //"scrollY": 300,
            //"scrollX": true,
            "info": true,
            'pageLength': 100,
            'scrollCollapse': true,
            //'fixedColumns': {
            //    left: 4
            //},
            "columnDefs": [
                {
                    "targets": -6,  // Última columna
                    "className": "text-end"
                },{
                    "targets": -7,  // Última columna
                    "className": "text-end"
                },{
                    "targets": -8,  // Última columna
                    "className": "text-end"
                },
            ]
        });

    }

    var exportButtons = () => {
        const documentTitle = 'Reporte Ventas';
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
        }).container().appendTo($('#TablaReporteVentas_buttons'));

        const exportButtons = document.querySelectorAll('#TablaReporteVentas_export_menu [Ventas-export]');
        exportButtons.forEach(exportButton => {
            exportButton.addEventListener('click', e => {
                e.preventDefault();

                const exportValue = e.target.getAttribute('Ventas-export');
                var target = document.querySelector('div[id="TablaReporteVentas_buttons"]');
                target = target.querySelector('.buttons-' + exportValue);

                target.click();
            });
        });
    }

    var handleSearchDatatable = () => {
        $('#S2_Equipos').on('change', function () {
         //datatable.column(3).search($(this).val()).draw();
         var valores = $(this).val();
        // Filtrar la tabla basándose en los números
            datatable.column(3).search(valores.join('|'), true, false).draw();
        });
    }

    return {
        init: function () {
            table = document.querySelector('#TablaReporteVentas');

            if (!table) {
                return;
            }

            initDatatable();
            exportButtons();
            handleSearchDatatable();
        }
    };
}();

KTUtil.onDOMContentLoaded(function () {
    TablaReporteVentas.init();
});
//********* End DataTable ReporteVentas****************************************************************************************


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// FUNCIONES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    //Ocultar AsideMenu
    $("#kt_body").attr("data-kt-aside-minimize", "on");

    //Tablas flexibles
    $('.dataTables_scrollHeadInner').css('max-width', '100%');
    $('.dataTables_scrollHeadInner').css('min-width', '90%');

    // Obtén la fecha actual
    const fechaActual = new Date();
    // Obten el año actual
    $("#IdAnioActual").val(fechaActual.getFullYear());
    $('#IdFecha').val(fechaActual.getMonth() + 1).trigger('change');

//    GetReporteVentas()
})

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
/*Buscar en los filtros*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// REPORTES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var cadenaDivisiones = '';
var DivisionesSelected = [];
$(document).ready(function () {

    cadenaDivisiones = DivisionesSelected.join(', ');

    // Manejar el evento de cambio de estado del checkbox "Todos"
    $('#IdDivisionTodo').on('change', function () {
        if ($(this).is(':checked')) {
            // Seleccionar todos los checkboxes y guardar sus valores
            $('#TablaFiltroDivision input[type="checkbox"]').prop('checked', true);
            DivisionesSelected = $('#TablaFiltroDivision input[type="checkbox"]').map(function () { return $(this).val(); }).get();
        }
        else {
            // Deseleccionar todos los checkboxes y vaciar el array de valores seleccionados
            $('#TablaFiltroDivision input[type="checkbox"]').prop('checked', false);
            DivisionesSelected = [];
        }

        cadenaDivisiones = DivisionesSelected.join(', ');

        ZonasSelected = [];
        cadenaZonas = '';
        $('#IdZonaTodo').prop('checked', false);

        EquiposSelected = [];
        cadenaEquipos = '';
        $('#IdEquipoTodo').prop('checked', false);

        console.log(cadenaDivisiones)
        console.log(cadenaEquipos)
        GetUnidadesOperativas(cadenaDivisiones)
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
        ZonasSelected = [];
        cadenaZonas = '';
        $('#IdZonaTodo').prop('checked', false);

        EquiposSelected = [];
        cadenaEquipos = '';
        $('#IdEquipoTodo').prop('checked', false);

        console.log(cadenaDivisiones)
        console.log(cadenaEquipos)
        GetUnidadesOperativas(cadenaDivisiones)
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
            ZonasSelected = $('#TablaFiltroZona input[type="checkbox"]').map(function () { return $(this).val(); }).get();
        }
        else {
            // Deseleccionar todos los checkboxes y vaciar el array de valores seleccionados
            $('#TablaFiltroZona input[type="checkbox"]').prop('checked', false);
            ZonasSelected = [];
        }

        cadenaZonas = ZonasSelected.join(', ');

        EquiposSelected = [];
        cadenaEquipos = '';
        $('#IdEquipoTodo').prop('checked', false);

        console.log(cadenaZonas)
        console.log(cadenaEquipos)
        GetEquipos(cadenaZonas)
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

        EquiposSelected = [];
        cadenaEquipos = '';
        $('#IdEquipoTodo').prop('checked', false);

        console.log(cadenaZonas)
        console.log(cadenaEquipos)
        GetEquipos(cadenaZonas)

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
            EquiposSelected = $('#TablaFiltroEquipo input[type="checkbox"]').map(function () { return $(this).val(); }).get();
        } else {
            // Deseleccionar todos los checkboxes y vaciar el array de valores seleccionados
            $('#TablaFiltroEquipo input[type="checkbox"]').prop('checked', false);
            EquiposSelected = [];
        }

        cadenaEquipos = EquiposSelected.join(', ');

        console.log(cadenaEquipos)
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
        console.log(cadenaEquipos)

    });
});

function DeseleccionarUOP() {

    $('#TablaFiltroZona input[type="checkbox"]').prop('checked', false);
    $('#IdZonaTodo').prop('checked', false);
    $('#IdEquipoTodo').prop('checked', false);
    ZonasSelected = [];
    cadenaEquipos = '';
    GetEquipos("")
}
function GetUnidadesOperativas(DivisionesSelected) {

    $.ajax({
        url: "/ReportesTemp/GetUnidadesOperativas",
        type: "post",
        data: {
            TipoPeticion: 1,
            DivisionsSeleted: DivisionesSelected
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

                var printZonas = "";
                for (i = 0; i < result.length; i++) {
                    printZonas = printZonas + `<tr><td><div class="form-check form-check-custom form-check-sm">` +
                        `<input  type="checkbox" name="" id="Zona_${result[i].id}" value="${result[i].id}" class="form-check-input border border-dark me-2">` +
                        `<label for="Zona_${result[i].id}">${result[i].text}</label></div></td></tr>`;
                }
                $("#TablaFiltroZona").html(printZonas);

                GetEquipos("")

            }
            else {
                toastr.error("Error de servidor, por favor contacta al administrador!");
            }
        }

    }).fail(function (xhr, status, error) {
        toastr.error("Error de servidor, por favor contacta al administrador!");
    })
}
function GetEquipos(UniOperativaSeleted)
{

    $('#TablaFiltroEquipo input[type="checkbox"]').prop('checked', false);
    EquiposSelected = [];

    $.ajax({
        url: "/ReportesTemp/GetEquipos",
        type: "post",
        data: {
            TipoPeticion: 1,
            UniOperativaSeleted: UniOperativaSeleted,
            FechaMes: $("#IdFecha").val(),
            FechaAnio: $("#IdAnioActual").val()
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
                // Datos para  filtro de Equipos
                var printEquipos = "";
                for (i = 0; i < result.length; i++) {
                    printEquipos = printEquipos + `<tr><td><div class="form-check form-check-custom form-check-sm">` +
                        `<input type="checkbox" name="" id="${result[i].id}" value="${result[i].id}" class="form-check-input border border-dark me-2">` +
                        `<label for="${result[i].id}">${result[i].text}</label></div></td></tr>`;
                }
                $("#TablaFiltroEquipo").html(printEquipos);


            }
            else {
                toastr.error("Error de servidor, por favor contacta al administrador!");
            }
        }

    }).fail(function (xhr, status, error) {
        toastr.error("Error de servidor, por favor contacta al administrador!");
    })
}
function GetReporteVentas() {

    //if (cadenaDivisiones != "" && cadenaZonas != "" && cadenaEquipos)
    //{
        $("#EquiposSelect").val(cadenaEquipos);
        BlockPantalla.block()
        $("#FormReporteVentas").submit();
    //}
    //else {
    //    toastr.warning("Por favor, seleccione almenos un valor de todos los filtros!");
    //}

}
function DescargarReporteVentas() {

    var RangoFechas = $("#FechasRangoBob").val();
    var IdEmpleado = $("#EmpleadoIdBob").val();
    var ClaveDepart = $("#DepartamentoIdBob").val();

    $.ajax({
        url: "/ReportesTemp/DescargarReporteVentas",
        xhrFields: {
            responseType: "blob"
        },
        type: "POST",
        data: {
            TipoPeticion: 1,
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            var blob = new Blob([result], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "ReporteVentas.xlsx";
            link.click();
            window.URL.revokeObjectURL(link.href);


            //toastr.success("Reporte Descargado correctamente", "Alerta");
        }
        else {

        }
    }).fail(function (xhr, status, error) {
        // setTimeout(location.reload(), 5000);
    })

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// FORM VALIDATION ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Reporte de ventas form validation*/
var FormReporteVentas = document.getElementById('FormReporteVentas');
var validatorFormReporteVentas = FormValidation.formValidation(
    FormReporteVentas,
    {
        fields: {
            'TipoPartidaVentas':
            {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            }, 'RangoFechas':
            {
                validators: {
                    notEmpty: {
                        message: 'El campo es requerido.'
                    }
                }
            },
        },

        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '',
                eleValidClass: ''
            })
        }
    }
);

// Submit button handler
var FormReporteVentasButton = document.getElementById('FormReporteVentasButton');

FormReporteVentasButton.addEventListener('click', function (e) {
    // Prevent default button action
    e.preventDefault();

    // Validate form before submit
    if (validatorFormReporteVentas) {
        validatorFormReporteVentas.validate().then(function (status) {
            if (status == 'Valid') {
                FormReporteVentasButton.setAttribute('data-kt-indicator', 'on');
                FormReporteVentasButton.disabled = true;
                setTimeout(function () {
                    FormReporteVentasButton.removeAttribute('data-kt-indicator');
                    FormReporteVentasButton.disabled = false;

                    GetReporteVentas()

                }, 1000);
            }
            else {
                FormReporteVentasButton.setAttribute('data-kt-indicator', 'on');
                FormReporteVentasButton.disabled = true;
                setTimeout(function () {
                    FormReporteVentasButton.removeAttribute('data-kt-indicator');
                    FormReporteVentasButton.disabled = false;

                }, 150);
            }
        });
    }
});

