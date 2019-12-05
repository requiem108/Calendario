/**Listenners------------ */
//Busca pacientes / search pacients
document.getElementById('Cale_formPrincipal').addEventListener('submit',(event)=>{
    BuscarPacientes(event,'Cale');
});
document.getElementById('CaNW_formPrincipal').addEventListener('submit',(event)=>{
    BuscarPacientes(event,'CaNW');
});

//muestra herramientas para buscar pacientes / show tools for search pacient
document.getElementById('CaleBotonS').addEventListener('click', ()=>{
    MostrarBusquedaPacientes('#Cale_formPrincipal');
});
document.getElementById('CaNWBotonS').addEventListener('click',()=>{
    MostrarBusquedaPacientes('#CaNW_formPrincipal');
});

//Guardar datos de cita / save data of appointment
document.getElementById('Cale-BotonGuardarCita').addEventListener('click',GuardarDatosCita);

//Guardar datos de nueva cita / save data of new appoitment
document.getElementById('CaNW-BotonGuardarCita').addEventListener('click',CrearNuevaCita)


/**FUNCIONES----------------- */
function BuscarPacientes(event,nom){
    event.preventDefault();
    let formulario = event.currentTarget;
    //busqueda por telefono o nombre / search to phone or name
    let tipo = document.getElementById(nom+'_selectTel/Nombre').value;
    let valor = document.getElementById(nom+'_Tel/Nombre').value;

    var datos = new FormData();
    datos.append('tipoBusqueda', tipo);
    datos.append('valor', valor);

    fetch(URLdireccion+'BuscarPaciente.php',{
        method: 'POST',
        body: datos
    })
    .then(res=>res.json())
    .then(Pacietes=>{
        let cadenaFila='';

        for(paciente of Pacietes){
            cadenaFila += '<tr>'+
            '<td class="CalePNombre">'+paciente.nombre+'</td>'+
            '<td class="CalePTelefono">'+paciente.tel+'</td>'+
            '<td class="CalePSelect">'+
                '<label class="containerCB">'+
                '<input type="checkbox" class="Cale-CB" id='+paciente.id+' onclick="ControlCheckbox(event)" >'+
                '<span class="checkmarkCB" ></span>'+
                '</label>'+
        '</td></tr>';
        }
        LimpiarFormularioPrincipal(formulario);
        document.querySelector('#'+nom+'-TablaUsuario').innerHTML= cadenaFila;
        
    });

}
//Muestra los inputs para buscar pacientes / show the inuts for search of pacient
function MostrarBusquedaPacientes(objeto){
    let areaFiltro = document.querySelector(objeto);
    let altura = areaFiltro.style.height;

    if(altura == '0px' || altura == ''){
        areaFiltro.style.height='80px';
    }else{
        areaFiltro.style.height='0px';
    }
} 

function GuardarDatosCita(){
    let idDoctor = document.getElementById('Cale-Fsuc').value;
    let idPaciente = 0;

    let listaPacientes= document.querySelectorAll('.Cale-CB');
    for(paciente of listaPacientes){
        if(paciente.checked){
            idPaciente = paciente.id;
        }
    }

    if(idPaciente!=0){
        let idLugar=document.getElementById('Cale-Sucursal').value;
        let idCita=document.getElementById('Cale-SucursalP').value;

        //Creamos el data y agregamos las variables / create the data and add the vars
        var datos = new FormData();
        datos.append('idDoctor', idDoctor);
        datos.append('idPaciente', idPaciente);
        datos.append('idLugar', idLugar);
        datos.append('idCita', idCita);

        fetch(URLdireccion+'CambiarDatosCita.php',{
            method: 'POST',
            body: datos
        })
        .then(res=>res.json())
        .then(respuesta=>{
            alert(respuesta.Respuesta);

            //Recargar citas / reaload appoitment
            CambiarSucursal();//metodo desarrollado en Calendario.js / method developed in calendar.js

            //Cerrar ventana modal / close modal window 
            let objtTemp ={
                id:"Cale"
            }
            let eventTemp = {
                currentTarget:objtTemp
            }
            mostrarVentanaPlus(eventTemp);

        });
    }else{
        alert('No tienes ningun paciente seleccionado');
    }
}
function CrearNuevaCita(event){
    event.stopPropagation();

    let lugar=document.getElementById('CaNW-SucursalP');
    let Doctor = document.getElementById('CaNW-FsucP');

    if(lugar.value>0){
        if(Doctor.value>0){
            CrearNCita(lugar.value,Doctor.value);
        }else{
            alert('Necesita asignar un doctor');
        }
    }else{
        alert('Necesita seleccionar una sucursal');
    }
}
function CrearNCita(idLugar,idDoctor){
    let LPacientes = document.querySelectorAll('.Cale-CB');
    let Paciente;
    for(paciente of LPacientes){
        if(paciente.checked){
            Paciente=paciente;
        }
    }
    if(Paciente!=null){
        var datos = new FormData();
        datos.append('idLugar',idLugar);
        datos.append('idDoctor', idDoctor);
        datos.append('idPaciente', Paciente.id);
        datos.append('fecha', fechaHora.fecha);
        datos.append('hora', fechaHora.hora);

        fetch(URLdireccion+'NuevaCita.php',{
            method: 'POST',
            body: datos
        })
        .then(res=>res.json())
        .then(respuesta=>{

            if(respuesta.Respuesta != 'Error'){
                alert(respuesta.Respuesta);                
            }
            //Recargar citas / reaload appoitment
            CambiarSucursal();//metodo desarrollado en Calendario.js / method developed in calendar.js
    
            //Cerrar ventana modal / close modal window 
            let objtTemp ={
                id:"CaNW"
            }
            let eventTemp = {
                currentTarget:objtTemp
            }
            mostrarVentanaPlus(eventTemp);

            document.getElementById('CaNW-SucursalP').selectedIndex=0;
            document.getElementById('CaNW-FsucP').selectedIndex=0;
            document.querySelector('#CaNW-TablaUsuario').innerHTML= '';
    
            });        
            
    

    }else{
        alert('Necesita seleccionar un paciente');
    }
}