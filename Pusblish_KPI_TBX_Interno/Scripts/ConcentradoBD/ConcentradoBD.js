//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// DATATABLES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//********* Start DataTable ReporteRentas****************************************************************************************
var TablaReporteVentas = function () {
    var table;
    var datatable;

    var initDatatable = function () {
        datatable = $(table).DataTable({
            "scrollY": 500,
            "scrollX": true,
            "info": true,
            'pageLength': 100,
            'scrollCollapse': true,
            'fixedColumns': {
                left: 2
            },
           
        });

    }

    var exportButtons = () => {
        const documentTitle = 'Reporte General';
        var buttons = new $.fn.dataTable.Buttons(table, {
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: documentTitle,
                   
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
        const filterSearch = document.querySelector('[Ventas-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    return {
        init: function () {
            table = document.querySelector('#ConcentradoBds');

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
//********* End DataTable ReporteRentas****************************************************************************************

var obtenerNumeroDeColumnas = function ()
{
    var tBds = $('#ConcentradoBds').DataTable();

    var nColumns = tBds.columns().count();
    var data = tBds.rows().data();

    nColumns = nColumns - 6;

    console.log(nColumns)

    var sumaContractual = 0;
    var sumaPxBase = 0;
    var BdPorcent = 0;

    var CountPxBd = 6;

    var rowData = []; // Crear un nuevo array para los datos de la fila
    rowData.push(""); // Agregar otros datos según sea necesario
    rowData.push(""); // Agregar otros datos según sea necesario
    rowData.push(""); // Agregar otros datos según sea necesario
    rowData.push(""); // Agregar otros datos según sea necesario
    rowData.push(""); // Agregar otros datos según sea necesario
    rowData.push(""); // Agregar otros datos según sea necesario

    for (var a = 0; a <= nColumns; a++)
    {
        for (var i = 0; i < data.length; i++) {
            var PxContr = parseFloat(data[i][5]);
            var PxBd = parseFloat(data[i][CountPxBd]);

            PxBd = PxContr == PxBd ? PxBd : PxBd > PxContr ? PxContr : PxBd;

            if (!isNaN(PxBd)) {
                sumaPxBase += PxBd;
            }

            if (!isNaN(PxContr)) {
                sumaContractual += PxContr;
            }
        }

        BdPorcent = (sumaPxBase / sumaContractual) * 100;

        rowData.push(parseFloat(BdPorcent.toFixed(2)) + "%");

        /*$(`#IdNum-${a}`).text(`${parseFloat(BdPorcent.toFixed(2))}%`);*/

        CountPxBd = CountPxBd + 1;

    }
    tBds.row.add(rowData);// Agregar la fila a la DataTable
    tBds.draw(false); // Dibujar la DataTable después de agregar todas las filas



}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// FUNCIONES ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    //Ocultar AsideMenu
    $("#kt_body").attr("data-kt-aside-minimize", "on");

    //Tablas flexibles
    $('.dataTables_scrollHeadInner').css('max-width', '100%');
    $('.dataTables_scrollHeadInner').css('min-width', '90%');

    obtenerNumeroDeColumnas();

    //GetAlmacenesVentas()
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


function GetReporteVentas() {

    //if (cadenaDivisiones != "" && cadenaZonas != "" && cadenaEquipos)
    //{
        //$("#EquiposSelect").val(cadenaEquipos);
        BlockPantalla.block()
        $("#FormReporteVentas").submit();
    //}
    //else {
    //    toastr.warning("Por favor, seleccione almenos un valor de todos los filtros!");
    //}

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
            'TipoPaquete':
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



