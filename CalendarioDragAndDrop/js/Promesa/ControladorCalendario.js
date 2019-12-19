//Variable local / local var
var objetoSelect={
    objeto:null
};
var fechaHora={
    fecha:'',
    hora:''
};

/**LISTENERS------------------------- */

document.getElementById('Cale-CerrarPlus').addEventListener('click',mostrarVentanaPlus);
document.getElementById('CaNW-CerrarPlus').addEventListener('click',mostrarVentanaPlus);

//Filtrar por doctor / filter by doctor
document.getElementById('Cale-Fsuc').addEventListener('change',FiltrarPorDoctor);

//Mostrar citas canceladas o concluidas / show appointments canceled or finished
document.getElementById('SwCitasCanCon').addEventListener('click', OcultarCitasCanceladas);


//Mostrar NavegacionSemana / show navegation for week
document.getElementById('Cale-BSemana').addEventListener('click',NavegacionSemana);

//Mostrar NavegacionMes / show navegation for mounth
document.getElementById('Cale-BMes').addEventListener('click',NavegacionMes);

//Seleccionar mes / selet mounth
//document.getElementById('01').addEventListener('click',MostrarMeseSelected);
var listaM =document.querySelectorAll('.mes');
for(mes of listaM){
    mes.addEventListener('click',MostrarMeseSelected);
};


/**FUNCIONES------------------------- */

function SeleccionarBotonCita(event){
    event.stopPropagation();
    if(objetoSelect.objeto==event.currentTarget){

        //Restura estilo / restore style
        objetoSelect.objeto.classList.remove('BotonCitaSelect');
       OcultarMostrarGlobo(false);
        objetoSelect.objeto=null;

    }else{
        if(objetoSelect.objeto!=null){

            //Restura estilo / restore style
            objetoSelect.objeto.classList.remove('BotonCitaSelect');
            OcultarMostrarGlobo(false);

        }
        objetoSelect.objeto = event.currentTarget;
        //Cambia stilo / change style
        objetoSelect.objeto.classList.add('BotonCitaSelect');       
        OcultarMostrarGlobo(true);
    }
    
   // alert('BotonCita');
    
}
function SeleccionarEmpty(event){
    //Movemos una cita / move an appoitment
    if(objetoSelect.objeto!=null){
        //Mueve el boton / Move the button
        event.stopPropagation();
        let objt = event.currentTarget;
        ModificarFechaCita(objt)
        .then(ArmarCalendario)
        .then(CargarCitas)
        .then(AgregarListenersEmpty)
        .then( AgregarListenersBotonCita)
        .then(()=>{
            objetoSelect.objeto=null;
        })
        .then(FiltrarPorDoctor);

    }else{
        //crea una cita / create an appoitment
        CrearCita(event);
        
    }    
}
function ModificarFechaCita(enpty){

    return new Promise((resolve, rejet)=>{
        //Obtenemos el ID de la cita // get id appoitment
        let objt = objetoSelect.objeto;
        
        let idCita = objt.title.substring(5,objt.length);

        //Obtnemos la Hora / get Hour
        let horario = enpty.id.substring(0,5);

        //Obtenemos la fecha / get date
        let fecha = empty.title;

        //Realizamos la peticion al servidor / we do petition to server
        var datos = new FormData();
        datos.append('idCita',idCita);
        datos.append('horario',horario);
        datos.append('fecha', fecha);

        fetch(URLdireccion+'ModificarFechaHora.php',{
            method: 'POST',
            body: datos
        })
        .then(res=>res.json())
        .then(respuesta=>{

            if(respuesta.Respuesta == 'Error'){
                console.log('Error: No fue posible realizar la actualizacion de la cita');
                rejet();
            }else{
                alert(respuesta.Respuesta);

                //Obtener fecha / get date
                let hoy = new Date();
                hoy.setDate(hoy.getDate()+(contadorSemana*7));

                resolve(hoy);
            }

        });
    });

    

}
function CrearCita(event){
    event.stopPropagation();
    let enpty = event.currentTarget;
    fechaHora.fecha=enpty.title;
    fechaHora.hora=enpty.id.substring(0,5);

    //Mostrar ventana modal / show modal window 
    let objtTemp ={
        id:"CaNW"
    }
    let eventTemp = {
        currentTarget:objtTemp
    }
    mostrarVentanaPlus(eventTemp);    
    
}
function OcultarMostrarGlobo(estado){
    if(estado){//Mostrar
        let globoBoton=document.querySelector('#'+objetoSelect.objeto.id+' .botonModCita');
        globoBoton.classList.remove('botonModCitaOFF');
    }else{//Ocultar
        let globoBoton=document.querySelector('#'+objetoSelect.objeto.id+' .botonModCita');
        globoBoton.classList.add('botonModCitaOFF');
    }
}
function MostrarDetallesCita(event){
    event.stopPropagation();
    let objt = event.currentTarget;
    let cadenaFila = '';

    //Obtener la cita en la variable publica / get the sppoitment in the public var
    let indice = objt.id.substring(10,objt.id.length);

    //llenar datos del formulario / fill data in the form
    document.getElementById('Cale-FsucP').value= ListaCitasEditables[indice].idDoctor;
    document.getElementById('Cale-SucursalP').value= ListaCitasEditables[indice].idLugar;

    if(ListaCitasEditables[indice].NombrePaciente!=null || ListaCitasEditables[indice].NombrePaciente!=''){
        
        cadenaFila = '<tr>'+
            '<td class="CalePNombre">'+ListaCitasEditables[indice].NombrePaciente+'</td>'+
            '<td class="CalePTelefono">'+ListaCitasEditables[indice].telefono+'</td>'+
            '<td class="CalePSelect">'+
                '<label class="containerCB">'+
                '<input type="checkbox" class="Cale-CB" id="'+ListaCitasEditables[indice].idPaciente+'" onclick="ControlCheckbox(event)" checked="true" >'+
                '<span class="checkmarkCB" ></span>'+
                '</label>'+
        '</td></tr>';
    }
        
        document.querySelector('#Cale-TablaUsuario').innerHTML= cadenaFila;

    objt.classList.add('botonModCitaOFF');
    mostrarVentanaPlus(event);    
}

function ControlCheckbox(event){
    //alert();
    let objtCB = event.currentTarget;

    if(objtCB.checked==true){
        //Cargar lista de todos los CheckBoox /  load all list of checkboox
        let listaCB = document.querySelectorAll('.Cale-CB');
        let contador = 0;

        //revisar que no exista otro paciente seleccionado / checking that not otrher pacient slected
        for(cb of listaCB){
            
            if (cb != objtCB){
                if(cb.checked){
                    cb.checked=false;
                }
            }
        }
    }
}
function FiltrarPorDoctor(){
    let idDoctor = document.getElementById('Cale-Fsuc').value;

    let contador = 0;
    let objt=null;

    if(idDoctor==0){
        for(cita of ListaCitasEditables){            
            objt = document.getElementById('Boton'+contador);
            if(objt != null){
                objt.classList.remove('botonModCitaOFF');
            }
                contador++;           
        }  
    }else{
        for(cita of ListaCitasEditables){

            if(cita.idDoctor!=idDoctor){
                objt = document.getElementById('Boton'+contador);
                if(objt != null){
                    objt.classList.add('botonModCitaOFF');
                }
            }else{
                objt = document.getElementById('Boton'+contador);
                if(objt != null){
                    objt.classList.remove('botonModCitaOFF');
                }
            }
            contador++;
        }
    }   
}

function OcultarCitasCanceladas(event){
    let objt = event.currentTarget;
    let listaCitasCanceladas = document.querySelectorAll('.citaCancelada');
    let listaCitasFinalizada = document.querySelectorAll('.citaConcluido');

    if(objt.checked){
        for(citaC of listaCitasCanceladas){
            citaC.classList.remove('botonModCitaOFF');
        }
        for(citaF of listaCitasFinalizada){
            citaF.classList.remove('botonModCitaOFF');
        }
    }else{
        for(citaC of listaCitasCanceladas){
            citaC.classList.add('botonModCitaOFF');
        }
        for(citaF of listaCitasFinalizada){
            citaF.classList.add('botonModCitaOFF');
        }
    }
}

function ConfirmarAsistencia(event,idCita,paciente){
    event.stopPropagation()
    if(confirm("Desea tomar la asistencia del paciente "+paciente)){
        Asistencia()
        .then(ArmarCalendario)
        .then(CargarCitas)
        .then(AgregarListenersEmpty)
        .then( AgregarListenersBotonCita)
        .then(()=>{
            objetoSelect.objeto=null;
        })
        .then(FiltrarPorDoctor);
    }


  function Asistencia()  {
        return new Promise((resolve,reject)=>{
            var datos = new FormData();
            datos.append('idCita',idCita);

            fetch(URLdireccion+'AsistenciaCita.php',{
                method: 'POST',
                body: datos
            })
            .then(res=>res.json())
            .then(respuesta=>{
                if(respuesta.Respuesta == 'La cita fue confirmada correctamente'){
                    
                    alert(respuesta.Respuesta);

                    //Obtener fecha / get date
                    let hoy = new Date();
                    hoy.setDate(hoy.getDate()+(contadorSemana*7));
                    resolve(hoy);
                }else{
                    console.log(respuesta);
                }

            });
        })


  }       
        
}

function CancelarCita(event,idCita,paciente){
    event.stopPropagation()
    if(confirm("Desea cancelar la cita del paciente "+paciente)){
        Cancelar()
        .then(ArmarCalendario)
        .then(CargarCitas)
        .then(AgregarListenersEmpty)
        .then( AgregarListenersBotonCita)
        .then(()=>{
            objetoSelect.objeto=null;
        })
        .then(FiltrarPorDoctor);
    }


  function Cancelar()  {
        return new Promise((resolve,reject)=>{
            var datos = new FormData();
            datos.append('idCita',idCita);

            fetch(URLdireccion+'CancelarCita.php',{
                method: 'POST',
                body: datos
            })
            .then(res=>res.json())
            .then(respuesta=>{
                if(respuesta.Respuesta == 'La cita fue cancelada correctamente'){
                    
                    alert(respuesta.Respuesta);

                    //Obtener fecha / get date
                    let hoy = new Date();
                    hoy.setDate(hoy.getDate()+(contadorSemana*7));
                    resolve(hoy);
                }else{
                    console.log(respuesta);
                }

            });
        })
  }      
     
}

function NavegacionMes(){
    document.getElementById('CalendarioTabla').classList.add('venPOff');
    let areaFiltros = document.querySelectorAll('.Cale-Filtro');

    for(filtro of areaFiltros){
        filtro.classList.add('venPOFF');
    }

    document.getElementById('Cale-MostrarCC').classList.add('venPOff');
    document.getElementById('Cale-AreaNavegacion').classList.add('venPOff');
    document.getElementById('Cale-Meses').classList.remove('venPOff');

    //Marcar el mes actual / mark Current month

    let mes = new Date().getMonth();
    let ContenedorMeses = document.getElementById('Cale-Meses');
    ContenedorMeses.children[mes].classList.add('actual');




}
function NavegacionSemana(){
    document.getElementById('CalendarioTabla').classList.remove('venPOff');
    let areaFiltros = document.querySelectorAll('.Cale-Filtro');

    for(filtro of areaFiltros){
        filtro.classList.remove('venPOFF');
    }

    document.getElementById('Cale-MostrarCC').classList.remove('venPOff');
    document.getElementById('Cale-AreaNavegacion').classList.remove('venPOff');
    document.getElementById('Cale-Meses').classList.add('venPOff');
}

function MostrarMeseSelected(event){
    let objt = event.currentTarget;
    
    let hoy = new Date(new Date().getFullYear(), objt.id, 01);
    ArmarCalendario(hoy)
        .then(CargarCitas)
        .then(AgregarListenersEmpty)
        .then( AgregarListenersBotonCita)
        .then(NavegacionSemana);
}