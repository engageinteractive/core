<?php
$meta_title = 'Styleguide';
include('_includes/_header.php');
?>

<article class="container" role="main">

	<header>

		<h1 class="h2">Components</h1>

		<ul>
			<li><a href="#branding">Branding</a></li>
			<li><a href="#colour-scheme">Colour scheme</a></li>
			<li><a href="#headings">Headings</a></li>
			<li><a href="#typography">Typographical elements</a></li>
			<li><a href="#lists">Lists</a></li>
			<li><a href="#dl">Definition Lists</a></li>
			<li><a href="#blockquotes">Blockquotes</a></li>
			<li><a href="#tables">Tables</a></li>
			<li><a href="#buttons">Buttons</a></li>
			<li><a href="#forms">Forms</a></li>
			<li><a href="#images">Images</a></li>
			<li><a href="#figures">Figures</a></li>
			<li><a href="#video">Video</a></li>
			<li><a href="#copy">Copy</a></li>
			<li><a href="#icons">Icons</a></li>
			<li><a href="#messages">Messages</a></li>
			<li><a href="#breadcrumb">Breadcrumb</a></li>
			<li><a href="#pagination">Pagination</a></li>
		</ul>

	</header>

	<div class="componenets">

		<section class="component" id="branding">

			<header class="component__header">
				<h1 class="h2">Branding</h1>
			</header>

			<div class="component__content component__content--spaced">

				<img src="/assets/img/branding/logo.svg" alt="Engage logo" class="logo">

			</div>

		</section>

		<section class="component" id="colour-scheme">

			<header class="component__header">
				<h1 class="h2">Colour scheme</h1>
			</header>

			<div class="component__content component__content--spaced">

				<?php include('_includes/components/colour-scheme.php'); ?>

			</div>

		</section>

		<section class="component" id="headings">

			<header class="component__header">
				<h1 class="h2">Headings</h1>
			</header>

			<div class="component__content component__content--spaced">

				<?php include('_includes/components/headings.php'); ?>

			</div>

		</section>

		<section class="component" id="typography">

			<header class="component__header">
				<h1 class="h2">Typographical elements</h1>
			</header>

			<div class="component__content">

				<?php include('_includes/components/typographical-elements.php'); ?>

			</div>

		</section>

		<section class="component" id="lists">

			<header class="component__header">
				<h1 class="h2">Lists</h1>
			</header>

			<div class="component__content component__content--spaced">

				<?php include('_includes/components/lists.php'); ?>

			</div>

		</section>

		<section class="component" id="dl">

			<header class="component__header">
				<h1 class="h2">Definition lists</h1>
			</header>

			<div class="component__content">

				<?php include('_includes/components/dl.php'); ?>

			</div>

		</section>

		<section class="component" id="blockquotes">

			<header class="component__header">
				<h1 class="h2">Blockquotes</h1>
			</header>

			<div class="component__content component__content--spaced">

				<?php include('_includes/components/blockquotes.php'); ?>

			</div>

		</section>

		<section class="component" id="tables">

			<header class="component__header">
				<h1 class="h2">Tables</h1>
			</header>

			<div class="component__content">

				<?php include('_includes/components/tables.php'); ?>

			</div>

		</section>

		<section class="component" id="buttons">

			<header class="component__header">
				<h1 class="h2">Buttons</h1>
			</header>

			<div class="component__content component__content--spaced">

				<?php include('_includes/components/buttons.php'); ?>

			</div>

		</section>

		<section class="component" id="forms">

			<header class="component__header">
				<h1 class="h2">Forms</h1>
			</header>

			<div class="component__content component__content--spaced">

				<?php include('_includes/components/form.php'); ?>

			</div>

		</section>

		<section class="component" id="images">

			<header class="component__header">
				<h1 class="h2">Images</h1>
				<p>Use the <code>media</code> classes for alignment</p>
			</header>

			<div class="component__content component__content--spaced">

				<?php include('_includes/components/images.php'); ?>

			</div>

		</section>

		<section class="component" id="figures">

			<header class="component__header">
				<h1 class="h2">Figures</h1>
				<p>Use the <code>media</code> classes for alignment</p>
			</header>

			<div class="component__content component__content--spaced">

				<?php include('_includes/components/figures.php'); ?>

			</div>

		</section>

		<section class="component" id="video">

			<header class="component__header">
				<h1 class="h2">Video</h1>
				<p>Use the <code>media</code> classes for alignment</p>
			</header>

			<div class="component__content component__content--spaced">

				<?php include('_includes/components/video.php'); ?>

			</div>

		</section>

		<section class="component" id="copy">

			<header class="component__header">
				<h1 class="h2">Copy</h1>
			</header>

			<div class="component__content">

				<?php include('_includes/components/copy.php'); ?>

			</div>

		</section>

		<section class="component" id="icons">

			<header class="component__header">
				<h1 class="h2">Icons</h1>
			</header>

			<div class="component__content component__content--spaced">

				<?php include('_includes/components/icons.php'); ?>

			</div>

		</section>

		<section class="component" id="messages">

			<header class="component__header">
				<h1 class="h2">Messages</h1>
			</header>

			<div class="component__content component__content--spaced">

				<?php include('_includes/components/messages.php'); ?>

			</div>

		</section>

		<section class="component" id="breadcrumb">

			<header class="component__header">
				<h1 class="h2">Breadcrumb</h1>
			</header>

			<div class="component__content">

				<?php include('_includes/components/breadcrumb.php'); ?>

			</div>

		</section>

		<section class="component" id="pagination">

			<header class="component__header">
				<h1 class="h2">Pagination</h1>
			</header>

			<div class="component__content">

				<?php include('_includes/components/pagination.php'); ?>

			</div>

		</section>

	</div>

</article>

<?php
include('_includes/_footer.php');
?>