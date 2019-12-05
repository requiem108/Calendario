<?php
    $fechaI = $_POST['fInicial'];
    $fechaF = $_POST['fFinal'];
    $idLugar = $_POST['idLugar'];

  
    //time zone / zona horaria
    date_default_timezone_set('America/Mexico_City');    
 
    $FInicial = new DateTime($fechaI);
    $FFinal = new DateTime($fechaF);

    $respuesta=SimuladorBD($FInicial,$FFinal,$idLugar);

    echo json_encode($respuesta);




?>


<?php

    
        class cita {
            public $fecha;
            public $hora;
            public $doctor;
            public $idDoctor;
            public $idPaciente;
            public $NombrePaciente;
            public $idCita;
            public $estado;
            public $telefono;
            public $idLugar;

            function __construct($fecha,$hora,$doctor, $idDoctor,$idPaciente,$NombrePaciente,$idCita,$estado,$tel,$idLugar) {
                $this->fecha =new DateTime($fecha);
                $this->hora = $hora;
                $this->doctor = $doctor;
                $this->idDoctor = $idDoctor;
                $this->idPaciente = $idPaciente;
                $this->NombrePaciente = $NombrePaciente;
                $this->idCita = $idCita;
                $this->estado = $estado;
                $this->telefono= $tel;
                $this->idLugar = $idLugar;
              }

        }





    function SimuladorBD($fechaI, $fechaF, $idLugar){
        $listaCitas=array();
        $listaCitas[]= new cita('2019/11/29','10:30','Omar Santillano',1,1,"Juan Abad",1,'CONFIRMAR','46161123456',1);
        $listaCitas[]= new cita('2019/11/30','10:30','Omar Santillano',1,2,"Abigail Flores",1,'AGENDADO','4611111111',1);
        $listaCitas[]= new cita('2019/11/31','12:00','Omar Santillano',1,3,"Adrian Camacho",1,'CANCELADO','4421111111',1);
        $listaCitas[]= new cita('2019/12/06','14:00','Brenda Narvaez',1,4,"Adrian Camacho",1,'CONCLUIDO', '4432222222',2);
        $listaCitas[]= new cita('2019/12/05','14:00','Brenda Narvaez',1,5,"Rodolfo Argenta",1,'CONFIRMAR', '4441111111',2);
        $listaCitas[]= new cita('2019/12/05','18:00','Luis Santillan',1,6,"Rodolfo Argenta",1,'CONFIRMAR', '4441111111',1);

        $respuesta= array();

       // print_r($listaCitas);
        foreach($listaCitas as $cita ){
            if($cita->fecha>=$fechaI && $cita->fecha<=$fechaF && $cita->idLugar==$idLugar){
               // echo 'Fecha'.$cita->fecha->format('Y-m-d');
                $respuesta[]=$cita;
            } 
        }

        return $respuesta;
    }



    


?>