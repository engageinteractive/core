<?php

// // Build out URI to reload from form dropdown
// // Need full url for this to work in Opera Mini
// $pageURL = (@$_SERVER["HTTPS"] == "on") ? "https://" : "http://";

// if (isset($_POST['sg_uri']) && isset($_POST['sg_section_switcher'])) {
// 	$pageURL .= $_POST[sg_uri].$_POST[sg_section_switcher];
// 	$pageURL = htmlspecialchars( filter_var( $pageURL, FILTER_SANITIZE_URL ) );
// 	header("Location: $pageURL");
// }

function titleify($filename){
	$title = ucwords(preg_replace("/\-/i", " ", $filename));
	return $title;
}

function sgListOptions($type, $folder = 'components'){

	$files = array();
	$folder = $folder ? $folder . '/' : false;
	$handle = opendir($folder . $type);

	while (false !== ($file = readdir($handle))):

		if (stristr($file, '.php')):

			$files[] = $file;

		endif;

	endwhile;

	if( sizeof($files) < 1 ) return false;

	sort($files);

	$html .= "<li>\n";

		$html .= "\t<span>" . titleify($type) . "</span>\n";

		$html .= "\t<ul>\n";

		foreach ($files as $file):

			$filename = preg_replace("/\.php$/i", "", $file);

			$id =  $type . '-' . $filename;

			$title = preg_replace("/\-/i", " ", $filename);

			$title = ucwords($title);

			$html .= "\t\t<li><a href=\"#sg-" . $id . "\">" . $title . "</a></li>\n";

		endforeach;

		$html .= "</ul>\n";

	$html .= "</li>\n";

	echo $html;

}

// Display markup view & source
function sgContent($type, $folder = 'components', $showMarkup = true){

	$files = array();
	$folder = $folder ? $folder . '/' : false;
	$title_class = $folder ? 'h3' : 'h2';
	$handle = opendir($folder . $type);

	while (false !== ($file = readdir($handle))) :

		if(stristr($file, '.php')):

			$files[] = $file;

		endif;

	endwhile;

	if (sizeof($files) < 1) {
		$html = "<p><em>No files found in " . $folder . " directory.</em></p>";
	} else {
		$html = false;
	}

	sort($files);

	foreach ($files as $file) :

		$filename = preg_replace("/\.php$/i", "", $file);
		$documentation = 'usage/'.$type.'/'.$file;
		$id =  $type . '-' . $filename;

		ob_start();
		$return = include($folder . $type . '/' . $file);
		$output = ob_get_clean();

		$html .= "<article class=\"sg-content\">\n";

			$html .= "\t<header class=\"sg-content__header\">\n";
				$html .= "\t\t<h1 class=\"" . $title_class . "\" id=\"sg-" . $id . "\">" . titleify($filename) . "</h1>\n";
			$html .= "\t</header>\n\n";

			$html .= "\t<div class=\"sg-content__example\">\n";
				$html .= $output;
			$html .= "\t</div>\n";

			if ($showMarkup ) :
				$html .= "\t<div class=\"sg-content__markup reveal\">\n";

					$html .= "\t\t<input class=\"vh reveal__toggle\" type=\"checkbox\" id=\"source-" . $id . "\" value=\"\" tabindex=\"-1\">\n";

					$html .= "\t\t<label class=\"button reveal__label\" for=\"source-" . $id . "\">View Source</label>\n";

					$html .= "\t\t<div class=\"sg-content__markup__source reveal__wrapper\">\n";
						$html .= "\t\t\t<pre>\n";
							$html .= htmlspecialchars($output);
						$html .= "\t\t\t</pre>\n";
					$html .= "\t\t</div>\n";

				$html .= "\t</div>\n";
			endif;

		$html .= "</article>\n\n";

	endforeach;

	echo $html;

}

?>