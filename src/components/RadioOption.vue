<template>
	<div class="sex__option">
		<input type="radio" :name="sex.name" :id="sex.id" :value="sex.value" v-model="sex.value" />
		<label :for="sex.id">
			{{ sex.label }}
		</label>
	</div>
</template>

<script>
export default {
	name: 'radio-option',
	props: { sex: Object },
};
</script>

<style></style>
