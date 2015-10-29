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
	    
	    $stmt = $conn->prepare('SELECT * 
	    FROM rc2014sch WHERE rc2014sch.county IN ("Cook","DuPage","Kane","Lake","McHenry","Will")
				AND rc2014sch.city NOT LIKE :term');
	    $stmt->execute(array('term' => '%'.$_GET['term'].'%'));
	    $return_arr = array();
    	    
		while($row = $stmt->fetch()) {
			$row_array['schid'] = $row['schid'];
			$row_array['facilityname'] = $row['facilityname'];
			$row_array['me2014schoolisat'] = $row['me2014schoolisat'];
			$row_array['me2014schoolpsae'] = $row['me2014schoolpsae'];
			$row_array['act2014school'] = $row['act2014school'];
			$row_array['districtname'] = $row['districtname'];
			array_push($return_arr,$row_array);
		    }
	    
	    } catch(PDOException $e) {	   
		    echo 'ERROR: ' . $e->getMessage();
			}
			
	echo json_encode($return_arr);
	
	$conn = null;
}

?>