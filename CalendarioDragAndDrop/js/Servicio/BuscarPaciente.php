<?php
$tipo = $_POST['tipoBusqueda'];
$valor = $_POST['valor'];

$respuesta=SimuladorBDPacientes($tipo,$valor);

echo json_encode($respuesta);


?>

<?php
 class pacientesB {
     public $nombre;
     public $tel;
     public $idPaciente;

     function __construct($nombre,$tel,$idPaciente){
        $this->nombre=$nombre;
        $this->tel=$tel;
        $this->id=$idPaciente;
     }
 }

 function SimuladorBDPacientes($tipo, $valor){
    $listaPacientes=array();
    $listaPacientes[]= new pacientesB('Andrea Lozano','46161123456',1);
    $listaPacientes[]= new pacientesB('Ruben Montoya','4611111111',2);
    $listaPacientes[]= new pacientesB('Carmen Rodriguez','4421111111',3);
    $listaPacientes[]= new pacientesB('Ana leon','4611111111',4);
    $listaPacientes[]= new pacientesB('Claudia Montoya','4611111111',5);
    

    $respuesta= array();

   // print_r($listaCitas);
    foreach($listaPacientes as $paciente ){

        if($tipo=='Telefono'){
            if($paciente->tel==$valor){
                $respuesta[]=$paciente;
            }
        }else{
            if($paciente->nombre==$valor){
                $respuesta[]=$paciente;
            }
        }
    }

    return $respuesta;
}

?>