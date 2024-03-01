
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toastr-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "400",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};


//Bloquea la pantalla para que ya no pueda hacer nada -BlockPantalla.block() , -BlockPantalla.release()
var target = document.querySelector("#BlockPantalla");
var BlockPantalla = new KTBlockUI(target, {message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',});

//Bloquea la pantalla para que ya no pueda hacer nada -BlockPantalla.block() , -BlockPantalla.release()
var targetFiltros = document.querySelector("#DivFiltros");
var BlockFiltros = new KTBlockUI(targetFiltros, { message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>', });

//Alert for session Expired
function SwalSessionExpirada() {

    let timerInterval

    Swal.fire({
        title: 'La Session ha Expirado!',
        html: 'Redireccionando al Login...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
            location.reload()
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}



function ResetearFormularios(IdFormulario) {
    document.getElementById(IdFormulario).reset();
    $("input").removeClass("is-valid").removeClass("is-invalid");
    $('[data-field]').remove();
}


function SystemServerError() {
    var ErrorMessege = "Error de servidor, por favor contacta al administrador!";

    toastr.error(ErrorMessege);
}