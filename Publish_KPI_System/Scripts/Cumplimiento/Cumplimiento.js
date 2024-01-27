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


    //GetCumplimientos()

})

// Sirve para dar Formato a Fecha. ---------------------------------------------------------------------------------
//$("#IdFecha").flatpickr({
//    dateFormat: "d-m-Y"
//});
$("#IdFecha").flatpickr({
    dateFormat: "d-m-Y",
    defaultDate: "today"
    /*minDate: "today"*/
});
//--------------------------------------------------------------------------------------------------------------

function GetCumplimientos() {

    var fecha = $("#IdFecha").val();

    if (fecha != "") {
        BlockPantalla.block()

        $("#FormFecha").submit();

    }
    else {
        toastr.warning("Por favor, selecciona un Mes y Año!");
    }

}