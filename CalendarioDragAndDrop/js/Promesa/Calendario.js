//Vareable local
var contadorSemana=0;
var ListaCitasEditables =new Array();

/**LISTENERS-------------------------- */
window.addEventListener('load',()=>{
    contadorSemana=0;
    let objt=document.getElementById('Cale-Sucursal');
    objt.selectedIndex=1;
    let hoy = new Date();
    ArmarCalendario(hoy)
        .then(CargarCitas)
        .then(AgregarListenersEmpty)
        .then( AgregarListenersBotonCita);
})

//Avanzar o retroceder en semanas / controls of navegation in weeks
document.querySelector('.AreaNavegacion i:nth-child(1)').addEventListener('click',RetrocederSemana);
document.querySelector('.AreaNavegacion i:nth-child(3)').addEventListener('click',AdelantarSemana);

//Consultar por el Lugar
document.getElementById('Cale-Sucursal').addEventListener('change',CambiarSucursal);


/**FUNCIONES------------------------ */

//Recive un objeto tipo date / set objetc type date
function ArmarCalendario(fecha){  
    return new Promise((resolve, rejet)=>{
        //Variable para almacenar la estrucutra de etqietas html / var set tags HTML
        let cadena = "";
        
        //obtener dias de la semana / get days to week        
        let fechaInicial = ObtenerPrimerDiaSemana(fecha);
        let fechaFinal = ObtenerUltimoDiaSemana(fecha);   
        
        let fechas = {
            fechaInicial:fechaInicial.getFullYear()+'/'+(fechaInicial.getMonth()+1)+'/'+fechaInicial.getDate(),
            fechaFinal:fechaFinal.getFullYear()+'/'+(fechaFinal.getMonth()+1)+'/'+fechaFinal.getDate()
        };

        document.querySelector('.AreaNavegacion label').innerHTML="Semana: "+fechaInicial.getDate()+'-'+fechaFinal.getDate();
        
        //Armar Calendario / assembly of calendar
        for(let i=0;i<12;i++){
            if(i==0){
                cadena+=CabezeraTabla(fechaInicial);
            }else{
                cadena+=CrearFilaHora(i,fechaInicial);
            }
        }
        document.getElementById('CalendarioTabla').innerHTML=cadena;
        resolve(fechas);
       
    })
    

}

//FUNCIONES PARA EL ARMADO DEL CALENDARIO POR SEMANA
function ObtenerPrimerDiaSemana(fecha){
    let fechaInicial = new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate());
    fechaInicial.setDate(fecha.getDate()-(fecha.getDay()-1));
    return fechaInicial;
}
function ObtenerUltimoDiaSemana(fecha){
    let fechaFinal = new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate());
    fechaFinal.setDate(fecha.getDate()+(6-(fecha.getDay()-1)));
    return fechaFinal;
}

function CabezeraTabla(fechaInicial){
    let cadena ='<tr class="DiaCabezera">'+
        '<th class="ReglaHora"></th>';
    let hoy = new Date().getDate();
    //Nombres de los dias de la semana
    let diaNombre = ["Lun", "Mar", "Mie", "Jues", "Vie", "Sab", "Dom"];

    for(let f=0;f<7;f++){
        let fecha = new Date(fechaInicial.getFullYear(),fechaInicial.getMonth(),fechaInicial.getDate()+f);
        if((fechaInicial.getDate()+f)== hoy){
            cadena+='<th><div class="Dia DiaON">'+fecha.getDate()+'</div><label>'+diaNombre[f]+'</label></th>';
        }else{
            cadena+='<th><div class="Dia">'+fecha.getDate()+'</div><label>'+diaNombre[f]+'</label></th>';
        }        
    }
    cadena+='</tr>';
    return cadena;
}

function CrearFilaHora(incremento,fechaInicial){
    let hora=9+incremento;
    let cadena = '<tr>'+
        '<td class="ReglaHora">'+hora+':00</td>';

    for(let i=0;i<2;i++){
        if(i==0){            
            for(let j=0;j<7;j++){
                let fecha = new Date(fechaInicial.getFullYear(),fechaInicial.getMonth(),fechaInicial.getDate()+j);
                cadena+='<td class="empty" id="'+hora+':00-'+fecha.getDate()+'" title="'+fecha.toLocaleDateString()+'"></td>'
            }
            cadena+='</tr>';
                
        }else{
            cadena+='<tr>'+
            '<td></td>';
            for(let e=0;e<7;e++){
                let fecha = new Date(fechaInicial.getFullYear(),fechaInicial.getMonth(),fechaInicial.getDate()+e);
                cadena+='<td class="empty" id="'+hora+':30-'+fecha.getDate()+'" title="'+fecha.toLocaleDateString()+'"></td>'
            }
        }
    }
    return cadena;
}

function RetrocederSemana(){
    contadorSemana-=1;
    let hoy = new Date();
    hoy.setDate(hoy.getDate()+(contadorSemana*7));
    ArmarCalendario(hoy)
        .then(CargarCitas)
        .then(AgregarListenersEmpty)
        .then( AgregarListenersBotonCita);
}
function AdelantarSemana(){
    contadorSemana+=1;
    let hoy = new Date();
    hoy.setDate(hoy.getDate()+(contadorSemana*7));
    ArmarCalendario(hoy)
        .then(CargarCitas)
        .then(AgregarListenersEmpty)
        .then( AgregarListenersBotonCita);
}
function AgregarListenersEmpty(){
    return new Promise((resolve,rejet)=>{
        let listaEmptys = document.querySelectorAll('.empty');
        for(empty of listaEmptys){
            empty.addEventListener('click',SeleccionarEmpty)//Funcion desarrollada en el archivo ControladorCalendario
        }
        resolve();
    })
   
}
function AgregarListenersBotonCita(){
    return new Promise((resolve,rejet)=>{
        let listaBotonesConfirmar = document.querySelectorAll('.citaConfirmar');
        let listaBotonesAgendado = document.querySelectorAll('.citaAgendada');
        let listaGloboBoton = document.querySelectorAll('.botonModCita');
        for(Boton of listaBotonesConfirmar){
            Boton.addEventListener('click',SeleccionarBotonCita);// Funcion desarrollada en el archivo controladorCalendario
        }
        for(Boton of listaBotonesAgendado){
            Boton.addEventListener('click',SeleccionarBotonCita);// Funcion desarrollada en el archivo controladorCalendario
        }
        for (Boton of listaGloboBoton){
            Boton.addEventListener('click',MostrarDetallesCita);// Funcion desarrollada en el archivo controladorCalendario
        }
        resolve();
    })
}
//Recive objeto con la fecha Inicial y final de la semana / set object with the date start and end to the week 
function CargarCitas(fechas){
    return new Promise((resolve,reject)=>{
        let idLugar = document.getElementById('Cale-Sucursal').value;
        var datos = new FormData();
        datos.append('fInicial',fechas.fechaInicial);
        datos.append('fFinal',fechas.fechaFinal);
        datos.append('idLugar',idLugar);

        fetch(URLdireccion+'CargarCitas.php',{
            method: 'POST',
            body: datos
        })
        .then(res=>res.json())
        .then(citas=>{
            //Limiamos la variable local / clean the local var
            ListaCitasEditables= new Array();
            let idBoton='';           
            let id = '';
            let cadena='';
            let dia = '';
            let objtTemp;
            let estado;
            for(cita of citas){                

                //Obtenemos el id para referenciar la etiqueta / get  id to refer the tag html
                dia = cita.fecha.date.substring(8,10);
                if(dia.substring(0,1)=='0'){
                    dia=dia.substring(1,2);
                }
                id= cita.hora+'-'+dia;
                
                
                //Apuntamos al empty // we point to the html tag
                objtTemp=document.getElementById(id);

                //Color del boton / Color of the Button
                if(cita.estado=="CONFIRMAR"){

                    estado = 'citaConfirmar';
                    //Preparando ID del boton / Prepare the id Button
                    idBoton='Boton'+ListaCitasEditables.length;
                    //Se agrega a la lista temporal de citas / add appointment  temporal list
                    ListaCitasEditables.push(cita);

                }else if (cita.estado=="AGENDADO"){ 

                    estado = 'citaAgendada';                    
                    //Preparando ID del boton / Prepare the id Button
                    idBoton='Boton'+ListaCitasEditables.length;
                    //Se agrega a la lista temporal de citas / add appointment  temporal list
                    ListaCitasEditables.push(cita);

                }else if (cita.estado == 'CANCELADO'){
                    estado = 'citaCancelada';
                }else{
                    estado = 'citaConcluido';
                }

                //Agregamos el boton // add the button
                cadena= '<div class="BotonCita '+estado+'" id="'+idBoton+'">'+
                    '<span>'+cita.hora+'</span><br><span>'+cita.doctor+'</span>'+
                    '<div class="botonModCita  botonModCitaOFF" id="Cale-'+idBoton+'"><i class="fas fa-ellipsis-v"></i></div></div>';

                //Agregamos al calendario // add to the calendar
                objtTemp.innerHTML=cadena;
                
            }
            
            resolve();
        })

    })
}
function CambiarSucursal(){    
    let hoy = new Date();
    hoy.setDate(hoy.getDate()+(contadorSemana*7));
    ArmarCalendario(hoy)
        .then(CargarCitas)
        .then(AgregarListenersEmpty)
        .then( AgregarListenersBotonCita);
}