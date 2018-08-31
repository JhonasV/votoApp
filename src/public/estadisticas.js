//$(document).ready(() => {
    const URL = '/api/partido';
    const URL2 = '/api/voto/estadisticas';

    const estadisticaContainer = $("#estadisticas")
    const primerLugarContainer = $("#primerLugarCont")

    const obtenerPartidos = async () => {
        let data = await fetch(URL);
        let partidos = await data.json();
        let estadisticas = await obtenerEstadisticas();
      
        let mayorId = ''
        let mayorVotos = 0
        estadisticas.forEach(item =>{
            if(mayorVotos <= item.total_votos){
                mayorId = item.partidoId;
                mayorVotos = item.total_votos;
            }            
        })

        let partidosOrdenado = partidos.filter( e=> e._id == mayorId);
     
      
        primerLugarContainer.html('');
        partidos.forEach(partido => {
            estadisticas.forEach(estadistica =>{
                
            estadisticasUI(partido, estadistica, partidosOrdenado);
        })
            
        });
    }
   
    const obtenerInfoCatalogo = async()=>{
        let data = await fetch(URL);
        let partidos = await data.json();
        partidos.forEach(partido => {
            catalogoCandidatos(partido);
        });
    }

    const obtenerEstadisticas = async ()=>{
        let res = await fetch(URL2);
        let estadisticas = await res.json();
        return estadisticas;
    }


    const estadisticasUI = async (partido, estadistica,mayor) => {
        if (estadisticaContainer) {
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
