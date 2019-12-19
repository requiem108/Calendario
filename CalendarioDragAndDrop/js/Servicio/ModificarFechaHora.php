<?php
$idCita = $_POST['idCita'];
$fecha = $_POST['fecha'];
$horario = $_POST['horario'];

$respuesta = array('Respuesta' => 'La cita fue modificada correctamente');

echo json_encode($respuesta);


?>