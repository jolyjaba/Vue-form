<template>
	<div class="app">
		<div class="wrapper">
			<form @submit.prevent="submit" class="form" action="">
				<div class="notify">
					<p class="required">*</p>
					<p class="notify__text">
						– Знак означает, что поле обязательное для заполнения
					</p>
				</div>
				<div class="client client--info">
					<field
						v-for="(field, index) in info.fullname"
						:key="`field-${index}`"
						:field="field"
						:v="field.isRequired ? $v.info.fullname[index].value : null"
					/>
					<field :field="info.birthday" :v="$v.info.birthday.value" />
					<field :field="info.phone" :v="$v.info.phone.value" />
					<div class="client--info__sex">
						<label for="sex">Пол</label>
						<div class="sex">
							<radio-option
								v-for="(sex, index) in info.sexList"
								:key="`sex-${index}`"
								:sex="sex"
							/>
						</div>
					</div>
					<div class="client--info__group" :class="{ alert: $v.info.group.$error }">
						<label for="group">
							Группа клиентов
							<p class="required">*</p>
						</label>
						<select
							name="group"
							id="group"
							v-model="info.group"
							@change="$v.info.group.$touch()"
							:multiple="true"
						>
							<option value="vip">VIP</option>
							<option value="problematic">Проблемные</option>
							<option value="health-insurance">ОМС</option>
						</select>
						<div class="message">Выберите группу клиентов</div>
					</div>
					<div class="client--info__doctor">
						<label for="doctor">Лечащий врач</label>
						<select name="doctor" id="doctor" v-model="info.doctor">
							<option value="">Выберите врача:</option>
							<option value="1">Иванов</option>
							<option value="2">Захаров</option>
							<option value="3">Чернышева</option>
						</select>
					</div>
					<field :field="info.send" />
				</div>
				<div class="client client--address">
					<field
						v-for="(item, index) in address"
						:key="`address-${index}`"
						:field="item"
						:v="item.isRequired ? $v.address[index].value : null"
					/>
				</div>
				<div class="client client--passport">
					<div class="client--passport__type" :class="{ alert: $v.passport.type.$error }">
						<label for="type">
							Тип документа
							<p class="required">*</p>
						</label>
						<select
							name="type"
							id="type"
							v-model="passport.type"
							@change="$v.passport.type.$touch()"
						>
							<option value="">Выберите тип документа:</option>
							<option value="passport">Паспорт</option>
							<option value="certificateOfBirth">Свидетельство о рождении</option>
							<option value="driverLicense">Водительское удостоверение</option>
						</select>
						<div class="message">Поле тип документ должен быть выбран</div>
					</div>
					<field :field="passport.series" />
					<field :field="passport.id" />
					<field :field="passport.issued" />
					<field :field="passport.date" :v="$v.passport.date.value" />
				</div>
				<button type="submit">Подтвердить</button>
				<submit-status
					v-for="(submit, index) in submits"
					:key="`submit-${index}`"
					:submit="submit"
					:submitStatus="submitStatus"
				/>
			</form>
		</div>
	</div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import RadioOption from '../components/RadioOption';
import Field from '../components/Field';
import SubmitStatus from '../components/SubmitStatus';

export default {
	name: 'app',
	components: { RadioOption, Field, SubmitStatus },
	data: () => ({
		info: {
			fullname: {
				surname: {
					className: 'client--info__surname',
					isRequired: true,
					event: 'change',
					label: 'Фамилия',
					id: 'surname',
					type: 'text',
					name: 'surname',
					placeholder: 'Введите фамилию',
					message: 'Поле фамилия должен быть заполнен',
					value: '',
				},
				name: {
					className: 'client--info__name',
					isRequired: true,
					event: 'change',
					label: 'Имя',
					id: 'name',
					type: 'text',
					name: 'name',
					placeholder: 'Введите имя',
					message: 'Поле имя должен быть заполнен',
					value: '',
				},
				patronymic: {
					className: 'client--info__patronymic',
					isRequired: false,
					event: 'change',
					label: 'Отчество',
					id: 'patronymic',
					type: 'text',
					name: 'patronymic',
					placeholder: 'Введите отчество',
					value: '',
				},
			},
			birthday: {
				className: 'client--info__birthday',
				isRequired: true,
				event: 'change',
				label: 'Дата рождения',
				id: 'birthday',
				type: 'date',
				name: 'birthday',
				placeholder: 'Введите день рождение',
				message: 'Поле дата рождения должен быть заполнен',
				value: '',
			},
			phone: {
				className: 'client--info__phone',
				isRequired: true,
				event: 'change',
				label: 'Номер телефона',
				id: 'phone',
				type: 'tel',
				name: 'phone',
				placeholder: '7XXXXXXXXXX',
				message: 'Поле телефон должен быть заполнен',
				value: '',
			},
			sexList: [
				{ name: 'sex', id: 'male', value: 'male', label: 'Мужчина' },
				{ name: 'sex', id: 'female', value: 'female', label: 'Женщина' },
				{ name: 'sex', id: 'other', value: 'other', label: 'Другое' },
			],
			group: [],
			doctor: '',
			send: {
				className: 'send-message',
				isRequired: false,
				event: 'click',
				label: 'Не отправлять СМС',
				id: 'send',
				type: 'checkbox',
				name: 'send-message',
				placeholder: '',
				checked: false,
			},
		},
		address: {
			index: {
				className: 'client--address__index',
				isRequired: false,
				event: 'change',
				label: 'Индекс',
				id: 'index',
				type: 'number',
				name: 'index',
				placeholder: 'Введите индекс города',
				value: '',
			},
			country: {
				className: 'client--address__country',
				isRequired: false,
				event: 'change',
				label: 'Страна',
				id: 'country',
				type: 'text',
				name: 'country',
				placeholder: 'Введите страну',
				value: '',
			},
			region: {
				className: 'client--address__region',
				isRequired: false,
				event: 'change',
				label: 'Область',
				id: 'region',
				type: 'text',
				name: 'region',
				placeholder: 'Введите область',
				value: '',
			},
			city: {
				className: 'client--info__city',
				isRequired: true,
				event: 'change',
				label: 'Город',
				id: 'city',
				type: 'text',
				name: 'city',
				placeholder: 'Введите город',
				message: 'Поле город должен быть заполнен',
				value: '',
			},
			street: {
				className: 'client--address__street',
				isRequired: false,
				event: 'change',
				label: 'Улица',
				id: 'street',
				type: 'text',
				name: 'street',
				placeholder: 'Введите улицу',
				value: '',
			},
			home: {
				className: 'client--address__home',
				isRequired: false,
				event: 'change',
				label: 'Дом',
				id: 'home',
				type: 'text',
				name: 'home',
				placeholder: 'Введите адрес дома',
				value: '',
			},
		},
		passport: {
			type: '',
			series: {
				className: 'client--address__series',
				isRequired: false,
				event: 'change',
				label: 'Серия',
				id: 'series',
				type: 'text',
				name: 'series',
				placeholder: 'Введите серию',
				value: '',
			},
			id: {
				className: 'client--address__id',
				isRequired: false,
				event: 'change',
				label: 'Номер',
				id: 'number',
				type: 'number',
				name: 'number',
				placeholder: 'Введите номер',
				value: '',
			},
			issued: {
				className: 'client--address__issued',
				isRequired: false,
				event: 'change',
				label: 'Кем выдан',
				id: 'issued',
				type: 'text',
				name: 'issued',
				placeholder: 'Введите организацию',
				value: '',
			},
			date: {
				className: 'client--passport__issued-date',
				isRequired: true,
				event: 'change',
				label: 'Дата выдачи',
				id: 'issuedDate',
				type: 'date',
				name: 'issuedDate',
				placeholder: '',
				message: 'Поле дата выдачи должен быть заполнен',
				value: '',
			},
		},
		submits: [
			{ message: 'Успешно создан!', status: 'OK', className: 'success' },
			{ message: 'Проверьте форму заново!', status: 'ERROR', className: 'alert' },
			{ message: 'Отправка...', status: 'PENDING', className: 'pending' },
		],
		submitStatus: null,
	}),
	methods: {
		submit() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.submitStatus = 'ERROR';
			} else {
				let client = {
					info: { ...this.info },
					address: { ...this.address },
					passport: { ...this.passport },
				};
				console.log(client);
				this.submitStatus = 'PENDING';
				setTimeout(() => {
					this.submitStatus = 'OK';
				}, 500);
			}
		},
	},
	validations: () => ({
		info: {
			fullname: {
				surname: { value: { required } },
				name: { value: { required } },
			},
			birthday: { value: { required, minLength: minLength(10) } },
			phone: { value: { required, minLength: minLength(11) } },
			group: { required },
		},
		address: { city: { value: { required } } },
		passport: {
			type: { required },
			date: { value: { required } },
		},
	}),
};
</script>

<style lang="scss">
@import '../styles/style';
</style>
