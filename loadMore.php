<?php 
	// $images = array();
	// foreach (glob('./img/portfolio/thumbs/*.*') as $filename) {
	// 	$images[] = $filename;
	// }

	// $i = $_POST["index"];
	// $output = array();
	// $output = array_slice($images, $i, $i+11);

	// echo json_encode($output);

	$dbHandle = mysql_connect("localhost", "root", "root") or die;
	$selected = mysql_select_db("apholos", $dbHandle);

	$i = $_POST["index"];
	$l = $_POST["limit"];
	$query = mysql_query("SELECT thumb, image, categories, caption from images LIMIT ".$i.", ".$l);

	$images = array();
	while ($row = mysql_fetch_assoc($query)) {
		$images[] = array_map(utf8_encode, $row);
	}

	echo json_encode($images);
	mysql_close($dbHandle);
?>