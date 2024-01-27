//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// DATATABLES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var KTDatatablesExample = function () {
    var table;
    var datatable;

    var initDatatable = function () {
        datatable = $(table).DataTable({
            "info": true,
            'pageLength': 25,
            //"columnDefs": [
                
            //    {
            //        "targets": -2,  // Última columna
            //        "className": "text-end"
            //    }


            //]
        });
    }

    var exportButtons = () => {
        const documentTitle = 'Reporte Inventarios';
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
        }).container().appendTo($('#kt_datatable_example_buttons'));

        const exportButtons = document.querySelectorAll('#kt_datatable_example_export_menu [data-kt-export]');
        exportButtons.forEach(exportButton => {
            exportButton.addEventListener('click', e => {
                e.preventDefault();

                const exportValue = e.target.getAttribute('data-kt-export');
                const target = document.querySelector('.dt-buttons .buttons-' + exportValue);
                target.click();
            });
        });
    }

    var handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    return {
        init: function () {
            table = document.querySelector('#TablaInventarios');

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
    KTDatatablesExample.init();
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// FUNCIONES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    //Ocultar AsideMenu
    $("#kt_body").attr("data-kt-aside-minimize", "on");

    //Tablas flexibles
    //$('.dataTables_scrollHeadInner').css('max-width', '100%');
    //$('.dataTables_scrollHeadInner').css('min-width', '90%');

    /*GetReportesTemp()*/

})




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
            ZonasSelected = $('#TablaFiltroZona input[type="checkbox"]').map(function () {
                return $(this).val();
            }).get();
        } else {
            // Deseleccionar todos los checkboxes y vaciar el array de valores seleccionados
            $('#TablaFiltroZona input[type="checkbox"]').prop('checked', false);

            ZonasSelected = [];
        }

        cadenaZonas = ZonasSelected.join(', ');
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
    });
});

function GetUnidadesOperativas(DivisionesSelected) {

    BlockPantalla.block()

    $.ajax({
        url: "/ReportesTemp/GetUnidadesOperativa",
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

                BlockPantalla.release()

            }
            else {
                toastr.error("Error de servidor, por favor contacta al administrador!");
            }
        }

    }).fail(function (xhr, status, error) {
        toastr.error("Error de servidor, por favor contacta al administrador!");
    })
}

function GetInventarios()
{
  /*  var Almacen = $("#Almacen").val();*/
    var TipoPartida = $("#TipoPartida").val();

    if ( TipoPartida != "")
    {
        if (cadenaDivisiones != "" && cadenaZonas != "")
        {
            $("#EquiposSelect").val(cadenaZonas);
            BlockPantalla.block()
            $("#FormReporte").submit();
        }
        else
        {
            toastr.warning("Por favor, seleccione almenos un valor de todos los filtros!");
        }
    }
    else
    {
        //if (Almacen == "")
        //{
        //    toastr.warning("Por favor, seleccione el un Almacen!");
        //}
        if (TipoPartida == "")
        {
            toastr.warning("Por favor, seleccione el un Tipo de partida!");
        }
    }

}


