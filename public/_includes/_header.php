<!doctype html>
<!--[if lte IE 8]>     <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title><?php echo $meta_title; ?> - Front-end Baseplate</title>
	<meta name="description" content="Page description (Max 155 characters)">

	<link rel="shortcut icon" href="/assets/img/tile/favicon.ico">
	<link rel="apple-touch-icon" href="/assets/img/tile/favicon-152.png">

	<link href='http://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'>
	<link href="https://fontastic.s3.amazonaws.com/D27eCVUyDsGBHCCy5Uydba/icons.css" rel="stylesheet">

	<!-- use this if just supporting IE9+ -->
	<link rel="stylesheet" href="/assets/css/main.css">

	<!-- use these if supporting IE8+ -->
	<!--[if (gt IE 8) | (IEMobile)]><!-->
	<!-- <link rel="stylesheet" href="/assets/css/main.css"> -->
	<!--<![endif]-->

	<!--[if (lte IE 8) & (!IEMobile)]>
	<!-- <link rel="stylesheet" href="/assets/css/fixed-width.css"> -->
	<![endif]-->

	<!-- remove for production -->
	<link rel="stylesheet" href="/guide/css/styles.css">
	<!-- /remove for production -->

	<script src="/assets/static/js/modernizr.js"></script>

	<!-- twitter card data (https://dev.twitter.com/docs/cards, https://dev.twitter.com/docs/cards/large-image-summary-card) -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@publisher_handle">
	<meta name="twitter:creator" content="@author_handle"><!-- if page has an author (like a blog post), pass in twitter handle -->
	<meta name="twitter:title" content="Page Title (Max 70 characters)">
	<meta name="twitter:description" content="Page description (Max 200 characters)">
	<meta name="twitter:image:src" content="/assets/img/tile/tile.png"><!-- pass in page/product image, if not, use tile.png. Min image size: 280x150 (if smaller, will use og:image below) -->

	<!-- open graph data -->
	<meta property="og:title" content="Page Title (Max 70 characters)">
	<meta property="og:type" content="article">
	<meta property="og:url" content="http://www.example.com/"><!-- current page URL -->
	<meta property="og:image" content="/assets/img/tile/tile.png"><!-- pass in page/product image, if not, use tile.png -->
	<meta property="og:description" content="Page description">
	<meta property="og:site_name" content="Site Name, i.e. Engage">
	<meta property="article:published_time" content="2013-09-17T05:59:00+01:00"><!-- if entry is is time sensitive (e.g. news), pass this info through -->
	<meta property="article:modified_time" content="2013-09-16T19:08:47+01:00"><!-- if entry is is time sensitive (e.g. news), pass this info through -->
	<meta property="article:section" content="Article Section"><!-- The section of your website to which the article belongs, such as 'Lifestyle' or 'Sports' -->
	<meta property="article:tag" content="Article Tag"><!-- An array of keywords relevant to the article -->

</head>
<body>

	<!--[if lt IE 9]>
	<div class="outdated-browser">
		You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.
	</div>
	<![endif]-->

	<div id="site-wrapper" class="site-wrapper">

		<header id="site-header" class="site-header" role="banner">

			<div class="container">

				<h1><a href="">Front-end Baseplate</a></h1>

			</div>

		</header>

		<div id="site-content" class="site-content">
