<p>Since we employ a top-left margin in most instances, the flush-first-nth utility is a simple way of removing the <code>margin-top</code> property from the first N children at certain breakpoints.</p>

<div class="example-grid">
	<h2 class="h5">Flush first 2 (desktop)</h2>

	<div class="sg-flush-test flush-first-2--desktop">
		<div><span>Child 1</span></div>
		<div><span>Child 2</span></div>
		<div><span>Child 3</span></div>
		<div><span>Child 4</span></div>
	</div>

	<h2 class="h5">Flush first 2 (phone), then 3 (tablet)</h2>
	<div class="sg-flush-test flush-first-2--phone flush-first-3--tablet">
		<div><span>Child 1</span></div>
		<div><span>Child 2</span></div>
		<div><span>Child 3</span></div>
		<div><span>Child 4</span></div>
	</div>
</div>