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
	    
	    $stmt = $conn->prepare('SELECT * FROM rc2015dists 
	    WHERE rc2015dists.countyNAMEdist IN ("Cook","DuPage","Kane","Lake","McHenry","Will")
				AND rc2015dists.cityNAMEdist NOT LIKE :term');
	    $stmt->execute(array('term' => '%'.$_GET['term'].'%'));
	    $return_arr = array();
    	    
		while($row = $stmt->fetch()) {
			$row_array['ELEMdist'] = $row['ELEMdist'];
			$row_array['HSdist'] = $row['HSdist'];
			$row_array['ACTdist'] = $row['ACTdist'];
			$row_array['districtNAMEdist'] = $row['districtNAMEdist'];
			array_push($return_arr,$row_array);
		    }
	    
	    } catch(PDOException $e) {	   
		    echo 'ERROR: ' . $e->getMessage();
			}
			
	echo json_encode($return_arr);
	
	$conn = null;
}

?>