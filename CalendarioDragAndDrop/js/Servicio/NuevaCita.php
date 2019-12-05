<?php

$idLugar = $_POST['idLugar'];
$idDoctor = $_POST['idDoctor'];
$idPaciente = $_POST['idPaciente'];
$fecha = $_POST['fecha'];
$hora = $_POST['hora'];

$Respuesta = array('Respuesta' =>'Cita agregada correctamente');

echo json_encode($Respuesta);

?>