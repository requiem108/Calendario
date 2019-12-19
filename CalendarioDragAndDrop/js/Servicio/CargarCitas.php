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
        $listaCitas[]= new cita('2019/12/20','10:30','Omar Santillano',1,1,"Juan Abad",1,'CONFIRMAR','46161123456',1);
        $listaCitas[]= new cita('2019/12/18','10:30','Omar Santillano',1,2,"Abigail Flores",2,'AGENDADO','4611111111',1);
        $listaCitas[]= new cita('2019/12/18','12:00','Omar Santillano',1,3,"Adrian Camacho",3,'CANCELADO','4421111111',1);
        $listaCitas[]= new cita('2019/12/16','14:00','Brenda Narvaez',2,4,"Adrian Camacho",4,'CONCLUIDO', '4432222222',2);
        $listaCitas[]= new cita('2019/12/12','14:00','Brenda Narvaez',2,5,"Rodolfo Argenta",5,'CONFIRMAR', '4441111111',2);
        $listaCitas[]= new cita('2019/12/14','18:00','Brenda Narvaez',2,6,"Rodolfo Argenta",6,'CONFIRMAR', '4441111111',1);
        
        $listaCitas[]= new cita('2019/12/19','10:30','Omar Santillano',1,7,"Juan Abad",7,'CONFIRMAR','46161123456',1);
        $listaCitas[]= new cita('2019/12/19','10:30','Omar Santillano',1,8,"Abigail Flores",8,'AGENDADO','4611111111',1);
        $listaCitas[]= new cita('2019/12/20','12:00','Omar Santillano',1,9,"Adrian Camacho",9,'CANCELADO','4421111111',1);
        $listaCitas[]= new cita('2019/12/21','14:00','Brenda Narvaez',2,10,"Adrian Camacho",10,'CONCLUIDO', '4432222222',2);
        $listaCitas[]= new cita('2019/12/21','14:00','Brenda Narvaez',2,11,"Rodolfo Argenta",11,'CONFIRMAR', '4441111111',2);
        $listaCitas[]= new cita('2019/12/21','18:00','Brenda Narvaez',2,12,"Rodolfo Argenta",12,'CONFIRMAR', '4441111111',1);

        $listaCitas[]= new cita('2019/12/09','10:30','Omar Santillano',1,13,"Juan Abad",100,'CONFIRMAR','46161123456',1);
        $listaCitas[]= new cita('2019/12/11','10:30','Omar Santillano',1,14,"Abigail Flores",150,'AGENDADO','4611111111',1);
        $listaCitas[]= new cita('2019/12/12','12:00','Omar Santillano',1,15,"Adrian Camacho",170,'CANCELADO','4421111111',1);
        $listaCitas[]= new cita('2019/12/12','14:00','Brenda Narvaez',2,16,"Adrian Camacho",118,'CONCLUIDO', '4432222222',2);
        $listaCitas[]= new cita('2019/12/13','14:00','Brenda Narvaez',2,17,"Rodolfo Argenta",190,'CONFIRMAR', '4441111111',2);
        $listaCitas[]= new cita('2019/12/13','18:00','Brenda Narvaez',2,18,"Rodolfo Argenta",191,'CONFIRMAR', '4441111111',1);

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