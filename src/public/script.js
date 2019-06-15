$(document).ready(() => {
    const URL = '/api/voto';
    $("#modal_candidato").prop('disabled', true);
    //Función para agregar votos
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
        //Guardamos el DNI del votante en localStorage para utilizar más adelante
        localStorage.setItem('dni', res.dni);
        alerta(res.voto);
    }

    const show_loader = () =>{
        $("#loader").attr("style", "display:block;");
    }
    const hide_loader = ()=>{
        $("#loader").attr("style", "display:none;");
    }
    const votacion_form = $("#votacion_form");
   
    //Al formulario hacer submit obtenemos con esta función
    votacion_form.on("submit", (e) => {
         //Mostramos el loader
        show_loader();
        //Prevenimos el comportamiento normal del formulario
        e.preventDefault();
        //Creamos un objeto con los datos del votante
        let datos = {
            nombre: $("#nombre").val(),
            dni: $("#dni").val(),
            fnaciminiento: $("#fnaciminiento").val(),
            sexo: $("#sexo").val()
        }
        //Lo envíamos al backend utilizando la función agregarVotación.
        agregarVotacion(datos);
    
    })

    const voto_candidato = $("#voto_candidato_form");
    //Obtenemos el formulario de la selección de candidatos
    voto_candidato.on('submit', async (e) => {
        show_loader();
        e.preventDefault();
        //Obtenemos el DNI del votante que se guardó en localStorage anteriormente
        //en la función "agregarVotación"
        let dni = localStorage.getItem('dni');
        //Obtenemos el radio button con el atributo name='candidato' seleccionado
        let candidatoId = $('input:radio[name=candidato]:checked').val();
       //Creamos objeto del voto
        let voto = {
            dni,
            candidatoId
        }
        //Hacemos el voto
        try {
            let res = await fetch('/api/voto/seleccion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(voto)
            })
            let data = await res.json();
            //Utilizamos esta función para informarle al usuario del estado
            //actual del proceso de votación
            alertaVoto(data.voto)
        } catch (error) {
            console.log(error);
        }
       

        //Limpiamos el localstorage
        localStorage.clear();
    })

    const alerta = (estado) => {
        //Le indicamos al votante el estado actual del proceso
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
            //Mostramos esta alerta si ya se ha hecho un voto con el mismo DNI
            mensajeContenedor.append(mensaje_ya_voto)
        } else if (estado == false) {
            //Mostramos esta alerta para que el votante continúe con el proceso
            mensajeContenedor.append(mensaje_continue)
            //Desactivamos el formulario de la información del votante
            desactivarFormulario();
            //Obtenemos todos los partidos y rellenamos el modal de candidatos
            obtenerInfoCatalogo();
            //Activamos el boton para abrir el modal de voto
            $("#modal_candidato").prop('disabled', false);
        } else {
            //Error inesperado
            mensajeContenedor.append(error_inesperado)
        }
        hide_loader();
    }
    //Quitar
    obtenerPartidos();
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
            //Indicamos que se votó correctamente
            mensajeContenedor.append(voto_correcto)
            //Obtenemos las estadísticas de los partidos
            obtenerPartidos();
            //Habilitamos el formulario para que otro usuario vote
            activarFormulario();
            //Desactivamos el boton del modal de los candidatos
            $("#modal_candidato").prop('disabled', true);
            //Limpiamos el catalogo de candidatos
            $("#catalogo_candidatos").html("");
            //Limpiamos las estadísticas
            $("#estadisticas").html("");
        } else {
            //Error inesperado
            mensajeContenedor.append(error_inesperado)
        }
        hide_loader();
    }
    //Función para desactivar el formulario
    const desactivarFormulario = () => {
        $("#nombre").prop('readonly', true)
        $("#dni").prop('readonly', true)
        $("#fnaciminiento").prop('readonly', true)
        $("#sexo").prop('disabled', true)
        $(".monitor-btn").prop('disabled', true)
    }
    //Función para activar el formulario y limpiar los campos
    const activarFormulario = () => {
        $("#nombre").prop('readonly', false)
        $("#dni").prop('readonly', false)
        $("#fnaciminiento").prop('readonly', false)
        $("#sexo").prop('disabled', false)
        $(".monitor-btn").prop('disabled', true)
        $("#votacion_form").trigger('reset')
    }
})
