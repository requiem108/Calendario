<?php
    $idDoctor=$_POST['idDoctor'];
    $idPaciente = $_POST['idPaciente'];
    $idLugar = $_POST['idLugar'];
    $idCita = $_POST['idCita'];

    
    $respuesta = array('Respuesta' =>'Cita guardada');

    echo json_encode($respuesta);


?>