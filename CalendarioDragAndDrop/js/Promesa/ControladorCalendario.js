//Variable local / local var
var ObjetoSelect={
    objeto:'',
    cita:''
};
var fechaHora={
    fecha:'',
    hora:''
};

/**LISTENERS------------------------- */

document.getElementById('Cale-CerrarPlus').addEventListener('click',mostrarVentanaPlus);
document.getElementById('CaNW-CerrarPlus').addEventListener('click',mostrarVentanaPlus);






/**FUNCIONES------------------------- */

function SeleccionarBotonCita(event){
    event.stopPropagation();
    if(ObjetoSelect==event.currentTarget){

        //Restura estilo / restore style
        ObjetoSelect.classList.remove('BotonCitaSelect');
       OcultarMostrarGlobo(false);
        ObjetoSelect=null;

    }else{
        if(ObjetoSelect!=null){

            //Restura estilo / restore style
            ObjetoSelect.classList.remove('BotonCitaSelect');
            OcultarMostrarGlobo(false);

        }
        ObjetoSelect = event.currentTarget;
        //Cambia stilo / change style
        ObjetoSelect.classList.add('BotonCitaSelect');
        OcultarMostrarGlobo(true);
    }
    
   // alert('BotonCita');
    
}
function SeleccionarEmpty(event){
    //Movemos una cita / move an appoitment
    if(ObjetoSelect!=null){
        //Mueve el boton / Move the button
        event.stopPropagation();
        let objt = event.currentTarget;
        objt.append(ObjetoSelect);

        //Cambia el horario / Change the hour
        document.querySelector('.'+ObjetoSelect.className+' span')
        let horario = objt.id.substring(0,5);
        ObjetoSelect.children[0].innerHTML = horario;

        //Limpia variables / clean var
        ObjetoSelect.classList.remove('BotonCitaSelect');
        OcultarMostrarGlobo(false);
        ObjetoSelect=null;
    }else{
        //crea una cita / create an appoitment
        CrearCita(event);
        
    }    
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
        let globoBoton=document.querySelector('#'+ObjetoSelect.id+' .botonModCita');
        globoBoton.classList.remove('botonModCitaOFF');
    }else{//Ocultar
        let globoBoton=document.querySelector('#'+ObjetoSelect.id+' .botonModCita');
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


