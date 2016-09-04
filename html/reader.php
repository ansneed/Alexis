<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

		<title> <?php $db = mysqli_connect('localhost','root','', 'stories');
          if (!$db)
          {
              print "<h1>Unable to Connect to MySQL</h1>";
          }
        $query = "SELECT CONVERT(title USING utf8) FROM `stories` WHERE name = 'Test1';";
        $result = mysqli_query($db, $query);
		while ($row = mysqli_fetch_array($result)) {
       		echo $row[0];
    	} ?></title>
    	<link rel="stylesheet" href="../css/bootstrap.min.css">
		<link rel="stylesheet" href="../css/main.css">
  		<link rel="stylesheet" href="../css/animate.css">


		<script src="../javascript/modules/jquery-2.2.3.min.js"> </script>
		<script src="../javascript/modules/bootstrap.min.js"> </script>
		<script type="text/javascript">
		var story = <?php 
		include '../php/wordtohtml.php';
		$db = mysqli_connect('localhost','root','', 'stories');
          if (!$db)
          {
              print "<h1>Unable to Connect to MySQL</h1>";
          }
        $db->set_charset("utf8");
        $query = "SELECT CONVERT(story USING utf8) FROM `stories` WHERE name = 'Test1';";
        $result = mysqli_query($db, $query);
		while ($row = mysqli_fetch_array($result)) {
       		// echo json_encode($row[0]);
       	//	echo bb_normalize_encoding(json_encode($row[0]));
    	} 
    	?>;
		</script>

		<script src="../javascript/src/main.js"> </script>
	</head>
	<body>
		<div class="container-fluid">
			<?php 
		//include '../php/wordtohtml.php';
		$db = mysqli_connect('localhost','root','', 'stories');
          if (!$db)
          {
              print "<h1>Unable to Connect to MySQL</h1>";
          }
        $db->set_charset("utf8");
        $query = "SELECT CONVERT(story USING utf8) FROM `stories` WHERE name = 'Test1';";
        $result = mysqli_query($db, $query);
		while ($row = mysqli_fetch_array($result)) {
       		// echo json_encode($row[0]);
       		echo bb_normalize_encoding(json_encode($row[0]));
    	} 
    	?>;
		</div>
		<input type="button" value="click to toggle fullscreen" onclick="toggleFullScreen()">

	</body>
</html>
