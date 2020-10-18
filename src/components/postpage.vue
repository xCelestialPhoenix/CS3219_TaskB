<template>
    <div id="postpage">
        <h1>Add user:</h1>
			<input v-model="username" type="text" name="username" placeholder="Username">
			<input v-model="password" type="text" name="username" placeholder="Password">
			<br><br>
			<input v-model="firstname" type="text" name="username" placeholder="First name">
			<input v-model="lastname" type="text" name="username" placeholder="Last name">
			<br><br>
			<input v-model="mobile" type="text" name="username" placeholder="Mobile number">
			<br><br>
			<button @click="addUser()">Add user</button>
			<br>
			<p id="errorPrompt" v-if="error">Please fill up all the fields</p>
			<b-alert id="alert" :show="dismissCountDown" dismissible :variant="alertType" @dismissed="dismissCountDown=0"
				@dismiss-count-down="countDownChanged">{{ alertMessage }}</b-alert>
    </div>
</template>

<script>
import User from './user'

export default {
	name: 'GetPage',
	props: ['user'],

	components: {
		User,
	},

	data() {
		return {
			username: '',
			password: '',
			firstname: '',
			lastname: '',
			mobile: '',
			error: false,
			dismissSecs: 2,
			dismissCountDown: 0,
			alertMessage: '',
			alertType: ''
		}
	},
 
	methods: {
		addUser: function() {
			if(this.username === ''
				|| this.password === ''
				|| this.firstname === ''
				|| this.lastname === ''
				|| this.mobile === '') {
				this.error=true;
				return;	
			}
			this.error=false;
			const baseURI = 'http://localhost:4040/api/user/';
            axios.post(baseURI, {
				firstname: this.firstname,
				lastname: this.lastname,
				username: this.username,
				password: this.password,
				mobile: this.mobile
			})
            .then((result) => {
				this.alertMessage = 'User successfully added';
				this.alertType = 'success';
				this.showAlert();
			})
			.catch((error) => {
				this.alertMessage = 'Something went wrong';
				this.alertType = 'danger';
				this.showAlert();
			})
			.finally(() => {
				this.firstname = '';
				this.lastname = '';
				this.username = '';
				this.password = '';
				this.mobile = '';
			})
		 },
		 countDownChanged(dismissCountDown) {
        	this.dismissCountDown = dismissCountDown
		},
		showAlert() {
			this.dismissCountDown = this.dismissSecs
		}
	}
}
</script>

<style scoped>
</style>