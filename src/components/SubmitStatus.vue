<template>
	<div
		v-if="submitStatus === submit.status"
		:class="{ [submit.className]: submitStatus === submit.status }"
		class="submit-status"
	>
		{{ submit.message }}
	</div>
</template>

<script>
export default {
	name: 'submit-status',
	props: {
		submit: Object,
		submitStatus: null,
	},
};
</script>
