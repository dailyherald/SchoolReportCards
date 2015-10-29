<?php
define('DB_SERVER', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');
define('DB_NAME', 'School Report cards');


if (isset($_GET['term'])){
	$return_arr = array();

	try {
	    $conn = new PDO("mysql:host=".DB_SERVER.";port=0;dbname=".DB_NAME, DB_USER, DB_PASSWORD);
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    
	    $stmt = $conn->prepare('SELECT * FROM rc2014sch WHERE Value LIKE :term');
	    $stmt->execute(array('term' => '%'.$_GET['term'].'%'));
	    $return_arr = array();
	    
	    while($row = $stmt->fetch()) {
	    	$row_array['id'] = $row['schid'];
	        $row_array['value'] =  $row['value'];
	        array_push($return_arr,$row_array);
	    }

	} catch(PDOException $e) {
	    echo 'ERROR: ' . $e->getMessage();
	}

    /* Toss back results as json encoded array. */
    echo json_encode($return_arr);
    
	$conn = null;
}


?>