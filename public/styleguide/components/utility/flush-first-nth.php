<p>Since we employ a top-left margin in most instances, the flush-first-nth utility is a simple way of removing the <code>margin-top</code> property from the first N children at certain breakpoints.</p>

<div class="example-grid">
	<h2 class="h5">Flush first 2</h2>

	<div class="sg-flush-test desktop-flush-first-2">
		<div><span>Child 1</span></div>
		<div><span>Child 2</span></div>
		<div><span>Child 3</span></div>
		<div><span>Child 4</span></div>
	</div>

	<h2 class="h5">Flush first 3</h2>
	<div class="sg-flush-test phone-flush-first-2 tablet-flush-first-3">
		<div><span>Child 1</span></div>
		<div><span>Child 2</span></div>
		<div><span>Child 3</span></div>
		<div><span>Child 4</span></div>
	</div>
</div>