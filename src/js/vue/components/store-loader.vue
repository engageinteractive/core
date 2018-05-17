<template>
</template>

<script>
	export default {
		props: [
			'namespace',
			'value',
		],

		mounted: function () {
			let action = 'load';

			if (this.$props.namespace) {
				action = this.$props.namespace + '/load';
			}
			this.$store.dispatch(action, this.$props.value);
		},
	};
</script>
