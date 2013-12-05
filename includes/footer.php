		<footer class="container full-width">

			<p><a href="#">&copy; Engage Interactive <?=date('Y')?></a></p>

		</footer>

	</div>

	<!-- JS -->
	<?php if (preg_match('/\.dev\.com/i', $_SERVER['SERVER_NAME'])) : ?>
		<script src="/assets/js/libs/jquery-1.10.2.min.js"></script>
		<script src="/assets/js/libs/fastclick.js"></script>
		<script src="/assets/js/plugins/jquery.transit.js"></script>
		<script src="/assets/js/site.js"></script>
	<?php else : ?>
		<script src="/assets/js/site.min.js"></script>
	<?php endif; ?>

</body>
</html>