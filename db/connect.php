<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ai-photoshop";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection to the database failed: " . $conn->connect_error);
}
?>
