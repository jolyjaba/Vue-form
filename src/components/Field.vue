<template>
	<div
		:class="{
			[field.className]: field.className,
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
			:checked="field.checked"
		/>
		<p v-if="field.isRequired && v.required && !v.minLength" class="message">
			Должен быть минимум
			{{ v.$params.minLength !== undefined && v.$params.minLength.min }}
			{{ field.type === 'tel' && 'цифр' }}
		</p>
		<p v-else-if="field.isRequired && !v.required" class="message">
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
			this.field.checked = !this.field.checked;
			this.field.value = event.target.value;
			this.field.isRequired && this.v.$touch();
		},
	},
};
</script>
