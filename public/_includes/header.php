<!doctype html>
<html class="no-js">
<head>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title><?php echo $meta_title; ?> - Front-end Baseplate</title>
	<meta name="description" content="Page description (Max 155 characters)">

	<link rel="icon" type="image/png" href="/assets/img/meta/favicon-32.png">
	<!--[if IE]><link rel="shortcut icon" href="/assets/img/meta/favicon.ico"><![endif]-->
	<link rel="apple-touch-icon" href="/assets/img/meta/favicon-180.png">
	<link rel="mask-icon" href="/assets/img/meta/mask-icon.svg" color="#000000">

	<link rel="stylesheet" href="/assets/css/main.css">

	<script src="/assets/static/js/modernizr.js"></script>

	<!-- twitter card data (https://dev.twitter.com/docs/cards, https://dev.twitter.com/docs/cards/large-image-summary-card) -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@publisher_handle">
	<meta name="twitter:creator" content="@author_handle"><!-- if page has an author (like a blog post), pass in twitter handle -->
	<meta name="twitter:title" content="Page Title (Max 70 characters)">
	<meta name="twitter:description" content="Page description (Max 200 characters)">
	<meta name="twitter:image:src" content="/assets/img/meta/share.png"><!-- share image, min dimensions: 280x150, file size < 8MB -->

	<!-- open graph data -->
	<meta property="og:title" content="Page Title (Max 70 characters)">
	<meta property="og:type" content="article">
	<meta property="og:url" content="http://www.example.com/"><!-- current page URL -->
	<meta property="og:image" content="/assets/img/meta/share.png"><!-- share image, min dimensions: 1200x630, file size < 8MB -->
	<meta property="og:description" content="Page description">
	<meta property="og:site_name" content="Site Name, i.e. Engage">
	<meta property="article:published_time" content="2013-09-17T05:59:00+01:00"><!-- if entry is is time sensitive (e.g. news), pass this info through -->
	<meta property="article:modified_time" content="2013-09-16T19:08:47+01:00"><!-- if entry is is time sensitive (e.g. news), pass this info through -->
	<meta property="article:section" content="Article Section"><!-- The section of your website to which the article belongs, such as 'Lifestyle' or 'Sports' -->
	<meta property="article:tag" content="Article Tag"><!-- An array of keywords relevant to the article -->

</head>
<body>

	<!--[if lte IE 9]>
		<div class="outdated-browser-wrapper">
			<div class="outdated-browser">
				You are using an <strong>outdated</strong> browser. Please <a href="http://outdatedbrowser.com/">upgrade your browser</a> to improve your viewing experience.
			</div>
		</div>
	<![endif]-->

	<div id="site-wrapper" class="site-wrapper">

		<header id="site-header" class="site-header" role="banner">

			<div class="container">

				<h1 class="h2"><a href="/">Front-end Baseplate</a></h1>

			</div>

		</header>

		<div id="site-content" class="site-content">
