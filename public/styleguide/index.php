<?php
include_once('functions.php');
$styleguide = true;
$meta_title = 'Styleguide';
$sections = [
	[
		'foundation',
		'Branding, colour schemes and basic typopgraphy.',
		false
	],
	[
		'core',
		'Basic low level elements such as links and buttons.'
	],
	[
		'module',
		'Simple combinations of cores and reusable components not tied to a specific section'
	],
	[
		'layout',
		'Distinct section of an interface.'
	],
	[
		'grid',
		'For responsive web layouts.'
	],
	[
		'utility',
		'Classes and helpers that override other styles.'
	],
];
include('../_includes/header.php');
?>

<div class="sg container" id="sg">
	<header class="sg-header">
		<h1 class="h1">Styleguide</h1>

		<nav class="sg-nav">
			<h1 class="vh">Styleguide menu</h1>

			<ul>
				<?php sgListOptions('documentation', false); ?>
				<li>
					Components
					<ul>
						<?php foreach ($sections as $section): ?>
							<?php sgListOptions($section[0]); ?>
						<?php endforeach; ?>
					</ul>
				</li>
			</ul>
		</nav>
	</header>

	<div class="sg-body">
		<section class="sg-group sg-group--docs">
			<h1 class="sg-group__title h1">Documentation</h1>

			<div class="sg-section">
				<?php sgContent('documentation', false, false); ?>
			</div>
		</section>

		<section class="sg-group sg-group--components">
			<h1 class="sg-group__title h1">Components</h1>

			<?php foreach ($sections as $section): ?>

				<section class="sg-section">
					<header class="sg-section__header">
						<h1 class="h2"><?= ucfirst($section[0]) ?></h1>

						<p><?= ucfirst($section[1]) ?></p>
					</header>

					<div class="sg-section__body">
						<?php sgContent($section[0], 'components', isset($section[2]) ? $section[2] : true); ?>
					</div>
				</section>

			<?php endforeach; ?>
		</section>
	</div>
</div>

<?php
include('../_includes/footer.php');
?>
