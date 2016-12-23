<h2 class="h4">Basic icons</h2>

<ul class="inline-children--block sg-icons">
	<?php
	$icons = glob('../../src/sprite/*.svg', GLOB_BRACE);
	foreach($icons as $icon) :
	?>
	<li>
		<svg class="icon">
			<use xlink:href="/assets/img/sprite.svg#<?php echo basename($icon, '.svg'); ?>"></use>
		</svg>
	</li>
	<?php endforeach; ?>
</ul>

<h2 class="h4">Inline icons</h2>

<p><svg class="icon icon--inline"><use xlink:href="/assets/img/sprite.svg#chevron-up"></use></svg> Lorem ipsum dolor sit amet, consectetur <svg class="icon icon--inline"><use xlink:href="/assets/img/sprite.svg#chevron-up"></use></svg> adipisicing elit. <svg class="icon icon--inline"><use xlink:href="/assets/img/sprite.svg#chevron-up"></use></svg></p>

<h2 class="h4">Set-position icons with text</h2>

<ul class="list-unstyled">
	<li>
		<span class="icon-text">
			<span class="icon-text__t">Icon text, description or title</span>

			<svg class="icon-text__i icon">
				<use xlink:href="/assets/img/sprite.svg#plus"></use>
			</svg>
		</span>
	</li>

	<li>
		<span class="icon-text">
			<svg class="icon-text__i icon">
				<use xlink:href="/assets/img/sprite.svg#plus"></use>
			</svg>

			<span class="icon-text__t">Icon text, description or title</span>
		</span>
	</li>
</ul>