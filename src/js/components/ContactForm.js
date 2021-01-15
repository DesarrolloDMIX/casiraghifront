let ContactForm = function (element) {
	this.form = element
	this.submitButton = this.form.querySelector('.js-contact-form__submit-button')
	this.textInput = this.form.querySelector('.js-contact-form__text-input')
	this.emailInput = this.form.querySelector('.js-contact-form__email-input')
	this.nameInput = this.form.querySelector('.js-contact-form__name-input')
	this.lastNameInput = this.form.querySelector('.js-contact-form__last-name-input')
	this.phoneInput = this.form.querySelector('.js-contact-form__phone-input')
	this.fieldSet = this.form.querySelector('.js-contact-form__field-set')

	this.handleSubmit = evt => {
		this.form.classList.add('contact-form--sent')
		evt.preventDefault()
	}

	this.init = () => {
		this.form.addEventListener('submit', this.handleSubmit)
		return this
	}
}

export default {
	create: ContactForm,
	selector: '.js-contact-form',
	key: 'contactForms',
	isArray: true,
}
