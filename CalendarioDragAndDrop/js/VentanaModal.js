//Funcion muestra ventana Modal // Function show modal
function mostrarVentanaPlus(event){
    var objt= event.currentTarget;
    var cadena="#"+objt.id.substring(0, 4)+"-VentanaPlus"; 
    var ventana= document.querySelector(cadena);
 
    if(ventana.classList.length>1){
      ventana.classList.remove('venPOff');
    }else{
     ventana.classList.add('venPOff');
    }
   
 }
 function LimpiarFormularioPrincipal(objt){
  var listaHijos=objt.children;
   for(hijo of listaHijos){
      var listaObjt=hijo.children;

      for(objt of listaObjt){
          
          if(objt.type=="text" || objt.type=="number" 
              || objt.type=="password" || objt.type=="email"){
          objt.value=""
          }else if(objt.type=="select"){
              objt.value=0;
          }else if(objt.type=="select-one") {
              //objt.value=0;
              objt.selectedIndex=0;
          } 

      } 
   } 
}
 