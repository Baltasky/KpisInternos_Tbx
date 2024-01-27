function Login() {
    var Usuario = $('#Usuario').val();
    var Password = $('#password').val();

    $.ajax({
        url: "Login/Index",
        type: "post",
        data: {
            Usuario: Usuario,
            Password: Password
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
        },
    }).done(function (result) {
        if (result != null) {
            if (result == "Correcto") {
                window.location.href = "/";
            }
            else {
                $("#DescMensaje").text(result)

                ButtonLogin.disabled = false;
            }
        }
    }).fail(function (xhr, status, error) {
        toastr.error("Error de servidor, por favor revisa tu conexion a internet!");
        ButtonLogin.disabled = false;
    })

}

//@* Form validation Login *@
var formCorrectiveA = document.getElementById('ValidarLogin');

var validatorNewRew = FormValidation.formValidation(
    formCorrectiveA,
    {
        fields: {
            'Usuario': {
                validators: {
                    notEmpty: {
                        message: 'El usuario es requerido.'
                    }
                }
            },
            'password': {
                validators: {
                    notEmpty: {
                        message: 'La contraseña es requerida.'
                    }
                }
            }, 'IdContrato': {
                validators: {
                    notEmpty: {
                        message: 'El numero de contrato es requerida.'
                    }
                }
            }
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

var ButtonLogin = document.getElementById('ButtonLogin');
ButtonLogin.addEventListener('click', function (e) {
    e.preventDefault();
    if (validatorNewRew) {
        validatorNewRew.validate().then(function (status) {
            if (status == 'Valid') {
                ButtonLogin.setAttribute('data-kt-indicator', 'on');

                ButtonLogin.disabled = true;
                setTimeout(function () {
                    ButtonLogin.removeAttribute('data-kt-indicator');

                    Login()

                }, 1000);
            }
            else {
                ButtonLogin.setAttribute('data-kt-indicator', 'on');
                ButtonLogin.disabled = true;

                setTimeout(function () {
                    ButtonLogin.removeAttribute('data-kt-indicator');
                    ButtonLogin.disabled = false;

                }, 100);
            }
        });
    }
});

$(formCorrectiveA.querySelector('[name="IdContrato"]')).on('change', function () {
    validatorNewRew.revalidateField('IdContrato');
});
