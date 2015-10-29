<!doctype html>
<html lang="en">
	<head>

		<title>Illinois School Report Cards</title>
		<script src="../scripts/jquery-1.9.1.min.js"></script>
		<script src="../scripts/global_v2.js?updated=20120907"></script>
		<script>var $ = jQuery;</script>

		<script type="text/javascript">
					var getINFO = '<?php echo http_build_query($_GET); ?>';
					console.log(getINFO);
					window.location = "http://localhost:8888/SchoolReportCards/index.php?" + getINFO;
		</script>

</head>
<body>
<h1>Redirecting to the NEW Daily Herald School Checker</h1>
</body>
</html>