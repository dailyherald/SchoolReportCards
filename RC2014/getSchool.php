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
	    
	    $stmt = $conn->prepare('SELECT * FROM rc2014sch 
	    				LEFT JOIN dem2014 ON rc2014sch.schid = dem2014.schid
						LEFT JOIN scores2014a ON rc2014sch.schid = scores2014a.schid
						LEFT JOIN scores2014b ON rc2014sch.schid = scores2014b.schid
						LEFT JOIN scores2014c ON rc2014sch.schid = scores2014c.schid

	    WHERE rc2014sch.schid LIKE :term');
	    $stmt->execute(array('term' => '%'.$_GET['term'].'%'));
	    $return_arr = array();
    	    
	    while($row = $stmt->fetchALL(PDO::FETCH_ASSOC)) {
 			 echo json_encode($row);
		    }
	    
	    } catch(PDOException $e) {	   
		    echo 'ERROR: ' . $e->getMessage();
			}
	
	$conn = null;
}

?>