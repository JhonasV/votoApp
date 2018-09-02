//$(document).ready(() => {
    const URL = '/api/partido';
    const URL2 = '/api/voto/estadisticas';

    const estadisticaContainer = $("#estadisticas")
    const primerLugarContainer = $("#primerLugarCont")
    //Obtenemos los partidos
    const obtenerPartidos = async () => {
        try {
            let data = await fetch(URL);
            let partidos = await data.json();
            //Obtenemos las estadisticas
            let estadisticas = await obtenerEstadisticas();
            //Procedimiento para encontrar el candidato con más votos
            let mayorId = ''
            let mayorVotos = 0
            estadisticas.forEach(item =>{
                if(mayorVotos <= item.total_votos){
                    mayorId = item.partidoId;
                    mayorVotos = item.total_votos;
                }            
            })

            let partidosOrdenado = partidos.filter( e=> e._id == mayorId);
        
            //Limpiamos el div que contendrá el primer lugar
            primerLugarContainer.html('');
            //Recorrimos los partidos
            partidos.forEach(partido => {
                //Recorremos las estadisticas
                estadisticas.forEach(estadistica =>{
                    //Utilizamos una función que dibuja las estadistícas
                    //la cual se va a iterar y le pasamos los parametros de
                    //un objeto de partido, de la estadística y el partido
                    //con más votos
                estadisticasUI(partido, estadistica, partidosOrdenado);
            })
                
            });
        } catch (error) {
            consnole.log(error)
        }
        
    }
    //Obtenemos todos los partidos
    const obtenerInfoCatalogo = async()=>{
        try {
            let data = await fetch(URL);
            let partidos = await data.json();
            partidos.forEach(partido => {
                //Los dibujamos en el modal para hacer la votación
                //iteramos la función pasandole un objeto de tipo partido
                catalogoCandidatos(partido);
            });
        } catch (error) {
            conosle.log(error)
        }
        
    }
    //Función para obtener las estadísticas y retornarlas
    const obtenerEstadisticas = async ()=>{
        try {
            let res = await fetch(URL2);
            let estadisticas = await res.json();
            return estadisticas;
        } catch (error) {
            console.log(error);
        }
        
    }

    //Esta función dibuja las estadisticas
    const estadisticasUI = async (partido, estadistica,mayor) => {
        //Comprobamos que el div existe
        if (estadisticaContainer) {
            //Comparamos el ID del partido, el ID de partido que contiene estadísticas
            //y el ID del candidato con más votos e imprimos la información
            if(partido._id === estadistica.partidoId && mayor[0]._id === partido._id){
            let elementoHtml = `
        <div>
        <div class="partido-porcentaje">
                
                    <div class="row">
                        <div class="col-sm-4">
                                <div class="partido-img-container">
                                        <img src="${partido.avatar_candidato}" alt="avatar">
                                    </div>
                        </div>
                        <div class="col-sm-8">
                                <div class="partido-info">
                                        <h5>${partido.nombre_partido}</h5>
                                        <h6>${partido.nombre_candidato}</h6>
                                    </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                                <div class="progress" style="height: 20px;">
                                        <div class="progress-bar" role="progressbar" style="width: ${estadistica.porcentaje}%;" aria-valuenow="${estadistica.porcentaje}" aria-valuemin="0" aria-valuemax="100">${estadistica.porcentaje}%</div>
                                      </div>
                        </div>
                    </div>
                </div>
                </div>
        `;
        primerLugarContainer.append(elementoHtml);
        //Imprimimos todos los demás candidatos
        }else if(partido._id === estadistica.partidoId && mayor[0]._id !== partido._id){
            let elementoHtml = `
        <div>
        <div class="partido-porcentaje">
                
                    <div class="row">
                        <div class="col-sm-4">
                                <div class="partido-img-container">
                                        <img src="${partido.avatar_candidato}" alt="avatar">
                                    </div>
                        </div>
                        <div class="col-sm-8">
                                <div class="partido-info">
                                        <h5>${partido.nombre_partido}</h5>
                                        <h6>${partido.nombre_candidato}</h6>
                                    </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                                <div class="progress" style="height: 20px;">
                                        <div class="progress-bar" role="progressbar" style="width: ${estadistica.porcentaje}%;" aria-valuenow="${estadistica.porcentaje}" aria-valuemin="0" aria-valuemax="100">${estadistica.porcentaje}%</div>
                                      </div>
                        </div>
                    </div>
                </div>
                </div>
        `
            estadisticaContainer.append(elementoHtml);
        }
        }


    }
    //Imprimimos el catalogo de candidatos
    const catalogoCandidatos = (partido) => {
        let catalogo = $("#catalogo_candidatos")
        if (catalogo) {
            

            let elementoHTML = `
    
        <div class="col-md-3">
            <input type="radio" id="candidato-select-${partido._id}" value="${partido._id}" name="candidato">
            <label for="candidato-select-${partido._id}">
                <div class="card" style="height: 85%; width: 90%">
                    <div class="card-body">
                            <img style="width: 100%; height: 100%;" src="${partido.avatar_candidato}" alt="avatar">
                    </div>
                    <div class="card-footer" style="height: auto;">
                            <h5>${partido.nombre_partido}</h5>
                            <h6>${partido.nombre_candidato}</h6>
                    </div>
                </div>
            </label>
        </div>
                                   
       
        `;
            catalogo.append(elementoHTML);
        }

    }
//})
