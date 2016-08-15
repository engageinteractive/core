<?php
include_once('functions.php');
$styleguide = true;
$meta_title = 'Styleguide';
include('../_includes/header.php');
?>

<div class="sg container" id="sg">
	<header class="sg-header">
		<h1>Styleguide</h1>

		<nav class="sg-nav">
			<h1 class="vh">Styleguide menu</h1>

			<ul>
				<?php sgListOptions('documentation', false); ?>

				<li>
					<span>Components</span>

					<ul>
						<?php sgListOptions('foundation'); ?>

						<?php sgListOptions('core'); ?>

						<?php sgListOptions('module'); ?>

						<?php sgListOptions('layout'); ?>

						<?php sgListOptions('grid'); ?>

						<?php sgListOptions('utility'); ?>

						<?php sgListOptions('scripts'); ?>
					</ul>
				</li>
			</ul>
		</nav>
	</header>

	<div class="sg-body">
		<section class="sg-group sg-group--docs">
			<h1 class="sg-group__title">Documentation</h1>

			<div class="sg-section">
				<?php sgContent('documentation', false, false); ?>
			</div>
		</section>

		<section class="sg-group sg-group--components">
			<h1 class="sg-group__title">Components</h1>

			<section class="sg-section">
				<header class="sg-section__header">
					<h1 class="h2">Foundation</h1>

					<p>Branding, colour schemes and basic typopgraphy.</p>
				</header>

				<div class="sg-section__body">
					<?php sgContent('foundation', 'components', $showMarkup = false); ?>
				</div>
			</section>

			<section class="sg-section">
				<header class="sg-section__header">
					<h1 class="h2">Core</h1>

					<p>Basic low level elements such as links and buttons.</p>
				</header>

				<div class="sg-section__body">
					<?php sgContent('core'); ?>
				</div>
			</section>

			<section class="sg-section">
				<header class="sg-section__header">
					<h1 class="h2">Module</h1>

					<p>Simple combinations of cores and reusable components not tied to a specific section</p>
				</header>

				<div class="sg-section__body">
					<?php sgContent('module'); ?>
				</div>
			</section>

			<section class="sg-section">
				<header class="sg-section__header">
					<h1 class="h2">Layout</h1>

					<p>Distinct section of an interface.</p>
				</header>

				<div class="sg-section__body">
					<?php sgContent('layout'); ?>
				</div>
			</section>

			<section class="sg-section">
				<header class="sg-section__header">
					<h1 class="h2">Grid</h1>

					<p>For responsive web layouts.</p>
				</header>

				<div class="sg-section__body">
					<?php sgContent('grid'); ?>
				</div>
			</section>

			<section class="sg-section">
				<header class="sg-section__header">
					<h1 class="h2">Utility</h1>

					<p>Classes and helpers that override other styles.</p>
				</header>

				<div class="sg-section__body">
					<?php sgContent('utility'); ?>
				</div>
			</section>

			<section class="sg-section">
				<header class="sg-section__header">
					<h1 class="h2">Scripts</h1>

					<p>Demos of any useful baseplate scripts.</p>
				</header>

				<div class="sg-section__body">
					<?php sgContent('scripts'); ?>
				</div>
			</section>
		</section>
	</div>
</div>

<?php
include('../_includes/footer.php');
?>