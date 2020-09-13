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
					<div class="fullname">
						<div
							class="client--info__surname"
							:class="{ alert: $v.info.fullname.surname.$error }"
						>
							<label for="surname">
								Фамилия
								<p class="required">*</p>
							</label>
							<input
								type="text"
								name="surname"
								id="surname"
								placeholder="Введите фамилию"
								v-model.trim="info.fullname.surname"
								@input="$v.info.fullname.surname.$touch()"
							/>
							<div class="message">Поле фамилия должен быть заполнен</div>
						</div>
						<div
							class="client--info__name"
							:class="{ alert: $v.info.fullname.name.$error }"
						>
							<label for="name">
								Имя
								<p class="required">*</p>
							</label>
							<input
								type="text"
								name="name"
								id="name"
								placeholder="Введите имя"
								v-model.trim="info.fullname.name"
								@input="$v.info.fullname.name.$touch()"
							/>
							<div class="message">Поле имя должен быть заполнен</div>
						</div>
					</div>
					<div class="client--info__patronymic">
						<label for="patronymic">Отчество</label>
						<input
							type="text"
							name="patronymic"
							id="patronymic"
							placeholder="Введите отчество"
							v-model.trim="info.fullname.patronymic"
						/>
					</div>
					<div class="birthday-phone">
						<div
							class="client--info__birthday"
							:class="{ alert: $v.info.birthday.$error }"
						>
							<label for="birthday">
								Дата рождения
								<p class="required">*</p>
							</label>
							<input
								type="date"
								name="birthday"
								id="birthday"
								v-model="info.birthday"
								@change="$v.info.birthday.$touch()"
							/>
							<div class="message">Поле дата рождения должен быть заполнен</div>
						</div>
						<div class="client--info__phone" :class="{ alert: $v.info.phone.$error }">
							<label for="phone">
								Номер телефона
								<p class="required">*</p>
							</label>
							<input
								type="tel"
								name="phone"
								id="phone"
								placeholder="Пример: 7XXXXXXXXXX"
								v-model.trim="info.phone"
								@input="$v.info.phone.$touch()"
							/>
							<div v-if="!$v.info.phone.minLength" class="message">
								Должен быть минимум
								{{ $v.info.phone.$params.minLength.min }} цифр
							</div>
							<div v-else-if="!$v.info.phone.required" class="message">
								Поле телефон должен быть заполнен
							</div>
						</div>
					</div>
					<div class="client--info__sex">
						<label for="sex">Пол</label>
						<div class="sex">
							<div class="sex__option">
								<input
									type="radio"
									name="sex"
									id="male"
									value="male"
									v-model="info.sex"
								/>
								<label for="male">Мужчина</label>
							</div>
							<div class="sex__option">
								<input
									type="radio"
									name="sex"
									id="female"
									value="female"
									v-model="info.sex"
								/>
								<label for="female">Женщина</label>
							</div>
							<div class="sex__option">
								<input
									type="radio"
									name="sex"
									id="other"
									value="other"
									v-model="info.sex"
								/>
								<label for="other">Другое</label>
							</div>
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
					<div class="send-message">
						<label for="send">Не отправлять СМС</label>
						<input type="checkbox" name="send-message" id="send" v-model="info.send" />
					</div>
				</div>
				<div class="client client--address">
					<div class="client--address__index">
						<label for="index">Индекс</label>
						<input
							type="number"
							name="index"
							id="index"
							placeholder="Введите индекс города"
							v-model.trim="address.index"
						/>
					</div>
					<div class="client--address__country">
						<label for="country">Страна</label>
						<input
							type="text"
							name="country"
							id="country"
							placeholder="Введите страну"
							v-model.trim="address.country"
						/>
					</div>
					<div class="client--address__region">
						<label for="region">Область</label>
						<input
							type="text"
							name="region"
							id="region"
							placeholder="Введите область"
							v-model.trim="address.region"
						/>
					</div>
					<div class="client--address__city" :class="{ alert: $v.address.city.$error }">
						<label for="city">
							Город
							<p class="required">*</p>
						</label>
						<input
							type="text"
							name="city"
							id="city"
							placeholder="Введите город"
							v-model.trim="address.city"
							@change="$v.address.city.$touch()"
						/>
						<div class="message">Поле город должен быть заполнен</div>
					</div>
					<div class="client--address__street">
						<label for="street">Улица</label>
						<input
							type="text"
							name="street"
							id="street"
							placeholder="Введите улицу"
							v-model="address.street"
						/>
					</div>
					<div class="client--address__home">
						<label for="home">Дом</label>
						<input
							type="text"
							name="home"
							id="home"
							placeholder="Введите адрес дома"
							v-model="address.home"
						/>
					</div>
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
					<div class="client--passport__series">
						<label for="series">Серия</label>
						<input
							type="text"
							name="series"
							id="series"
							placeholder="Введите серию"
							v-model="passport.series"
						/>
					</div>
					<div class="client--passport__id">
						<label for="number">Номер</label>
						<input
							type="number"
							name="number"
							id="number"
							placeholder="Введите номер"
							v-model="passport.id"
						/>
					</div>
					<div class="client--passport__issued">
						<label for="issued">Кем выдан</label>
						<input
							type="text"
							name="issued"
							id="issued"
							placeholder="Введите организацию"
							v-model="passport.issued"
						/>
					</div>
					<div
						class="client--passport__issued-date"
						:class="{ alert: $v.passport.date.$error }"
					>
						<label for="issuedDate">
							Дата выдачи
							<p class="required">*</p>
						</label>
						<input
							type="date"
							name="issuedDate"
							id="issuedDate"
							v-model="passport.date"
							@change="$v.passport.date.$touch()"
						/>
						<div v-if="!$v.passport.date.required" class="message">
							Поле дата выдачи должен быть заполнен
						</div>
						<div v-else class="message">
							Не верный формат даты
						</div>
					</div>
				</div>
				<button type="submit">Подтвердить</button>
				<div
					v-if="submitStatus === 'OK'"
					:class="{ success: submitStatus === 'OK' }"
					class="submit-status"
				>
					Успешно создан!
				</div>
				<div
					v-if="submitStatus === 'ERROR'"
					:class="{ alert: submitStatus === 'ERROR' }"
					class="submit-status"
				>
					Проверьте форму заново!
				</div>
				<div
					v-if="submitStatus === 'PENDING'"
					:class="{ pending: submitStatus === 'PENDING' }"
					class="submit-status"
				>
					Отправка...
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
export default {
	name: 'app',
	data: () => ({
		info: {
			fullname: { surname: '', name: '', patronymic: '' },
			birthday: '',
			phone: '',
			sex: 'other',
			group: [],
			doctor: '',
			send: false,
		},
		address: {
			index: '',
			country: '',
			region: '',
			city: '',
			street: '',
			home: '',
		},
		passport: {
			type: '',
			series: '',
			id: '',
			issued: '',
			date: '',
		},
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
				surname: { required },
				name: { required },
			},
			birthday: { required, minLength: minLength(10) },
			phone: { required, minLength: minLength(11) },
			group: { required },
		},
		address: { city: { required } },
		passport: {
			type: { required },
			date: { required },
		},
	}),
};
</script>

<style lang="scss">
@import '../styles/style';
</style>
