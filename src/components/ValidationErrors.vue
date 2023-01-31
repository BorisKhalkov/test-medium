<template>
	<div>
		<ul class="error-messages">
			<li v-for="err in errorMessages" :key="err">{{ err }}</li>
		</ul>
	</div>
</template>

<script>

	export default {
	name: 'McvValidationErrors',
	props: {
		validationErrors: {
			type: Object,
			required: true
			}
	},
	computed: {
		errorMessages() {
			
			return Object.keys(this.validationErrors).map(name => {
				const messages = this.validationErrors[name].join(', ');

				return `${name}: ${messages}`
			})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>