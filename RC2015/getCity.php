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
	    FROM rc2015sch WHERE rc2015sch.city LIKE :term');
	    $stmt->execute(array('term' => $_GET['term']));
	    $return_arr = array();
    	    
		while($row = $stmt->fetch()) {
			$row_array['schid'] = $row['schid'];
			$row_array['facilityname'] = $row['facilityname'];
			$row_array['me2014schoolisat'] = $row['me2014schoolisat'];
			$row_array['me2014schoolpsae'] = $row['me2014schoolpsae'];
			$row_array['zelemscore2014'] = $row['zelemscore2014'];
			$row_array['zhsscore2014'] = $row['zhsscore2014'];
			$row_array['act2015school'] = $row['act2015school'];
			$row_array['districtname'] = $row['districtname'];
			$row_array['distid'] = $row['distid'];
	        $row_array['schtype'] =  $row['schooltype'];
			array_push($return_arr,$row_array);
		    }
	    
	    } catch(PDOException $e) {	   
		    echo 'ERROR: ' . $e->getMessage();
			}
			
	echo json_encode($return_arr);
	
	$conn = null;
}

?>