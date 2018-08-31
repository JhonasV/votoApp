$(document).ready(() => {
    const URL = '/api/voto';
    $("#modal_candidato").prop('disabled', true);
    const agregarVotacion = async (datos) => {
        let data = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(datos)
        })

        let res = await data.json();
      
        localStorage.setItem('dni', res.dni);
        alerta(res.voto);
    }
    const votacion_form = $("#votacion_form");

    votacion_form.on("submit", (e) => {
        e.preventDefault();
        
        let datos = {
            nombre: $("#nombre").val(),
            dni: $("#dni").val(),
            fnaciminiento: $("#fnaciminiento").val(),
            sexo: $("#sexo").val()
        }
     
        agregarVotacion(datos);
    
    })

    const voto_candidato = $("#voto_candidato_form");

    voto_candidato.on('submit', async (e) => {
        e.preventDefault();
        let dni = localStorage.getItem('dni');
        let candidatoId = $('input:radio[name=candidato]:checked').val();
       
        let voto = {
            dni,
            candidatoId
        }
        //
        let res = await fetch('/api/voto/seleccion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(voto)
        })
        let data = await res.json();

        alertaVoto(data.voto)

        //Limpiamos el localstorage
        localStorage.clear();
    })

    const alerta = (estado) => {
        let mensajeContenedor = $("#mensaje");
        mensajeContenedor.html('');
        let mensaje_ya_voto = `<div class="alert alert-danger">
        YA HA VOTADO.
     </div>`;

        let mensaje_continue = ` <div class="alert alert-success">
     REGISTRADO, CONTINÚE CON EL PROCESO.
 </div>`
        let error_inesperado = ` <div class="alert alert-warning">
 HUBO UN ERROR INESPERADO, RECARGUE LA PAGINA.
</div>`
        if (estado) {
            mensajeContenedor.append(mensaje_ya_voto)
        } else if (estado == false) {
            mensajeContenedor.append(mensaje_continue)
            desactivarFormulario();
            obtenerInfoCatalogo();
            $("#modal_candidato").prop('disabled', false);
        } else {
            mensajeContenedor.append(error_inesperado)
        }
    }

    const alertaVoto = (estado) => {
        let mensajeContenedor = $("#mensaje");
        $("#exampleModalCenter").modal('hide');
        mensajeContenedor.html('');

        let voto_correcto = ` <div class="alert alert-success">
     VOTO PROCESADO CORRECTAMENTE!
 </div>`
        let error_inesperado = ` <div class="alert alert-warning">
 HUBO UN ERROR INESPERADO, RECARGUE LA PAGINA.
</div>`
        if (estado) {
            mensajeContenedor.append(voto_correcto)
            obtenerPartidos();
            activarFormulario();
            $("#modal_candidato").prop('disabled', true);
            $("#catalogo_candidatos").html("");
            $("#estadisticas").html("");
        } else {
            mensajeContenedor.append(error_inesperado)
        }
    }

    const desactivarFormulario = () => {
        $("#nombre").prop('readonly', true)
        $("#dni").prop('readonly', true)
        $("#fnaciminiento").prop('readonly', true)
        $("#sexo").prop('disabled', true)
        $(".monitor-btn").prop('disabled', true)
    }

    const activarFormulario = () => {
        $("#nombre").prop('readonly', false)
        $("#dni").prop('readonly', false)
        $("#fnaciminiento").prop('readonly', false)
        $("#sexo").prop('disabled', false)
        $(".monitor-btn").prop('disabled', true)
        $("#votacion_form").trigger('reset')
    }
})
