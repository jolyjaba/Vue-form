<template>
	<div
		:class="{
			[field.className]: field.className !== undefined,
			alert: field.isRequired && v.$error,
		}"
	>
		<label :for="field.id">
			{{ field.label }}
			<p v-if="field.isRequired" class="required">*</p>
		</label>
		<input
			:type="field.type"
			:name="field.name"
			:id="field.id"
			:placeholder="field.placeholder"
			v-model.trim="field.value"
			@[field.event]="setValue"
		/>
		<p v-if="field.isRequired" class="message">
			{{ field.message }}
		</p>
	</div>
</template>

<script>
export default {
	name: 'field',
	props: {
		field: Object,
		v: Object,
	},
	methods: {
		setValue(event) {
			this.field.value = event.target.value;
			this.field.isRequired && this.v.$touch();
		},
	},
};
</script>

<style></style>
