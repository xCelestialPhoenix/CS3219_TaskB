<template>
    <div id="putpage">
        <h1>Update user:</h1>
			<input v-model="username" type="text" name="username" placeholder="Username">
			<input v-model="password" type="text" name="username" placeholder="Password">
			<br><br>
			<input v-model="firstname" type="text" name="username" placeholder="First name">
			<input v-model="lastname" type="text" name="username" placeholder="Last name">
			<br><br>
			<input v-model="mobile" type="text" name="username" placeholder="Mobile number">
			<br><br>
			<button @click="updateUser()">Update user</button>
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
		updateUser: function() {
			if(this.username === ''
				|| this.password === ''
				|| this.firstname === ''
				|| this.lastname === ''
				|| this.mobile === '') {
				this.error=true;
				return;	
			}
			this.error=false;
			const baseURI = 'http://localhost:4040/api/user/' + this.username;
            axios.put(baseURI, {
				firstname: this.firstname,
				lastname: this.lastname,
				username: this.username,
				password: this.password,
				mobile: this.mobile
			})
            .then((result) => {
				this.alertMessage = 'User successfully updated!';
				this.alertType = 'success';
				this.showAlert();
			})
			.catch((error) => {
				console.log(error);
				if (error.response.status === 404) {
					this.alertMessage = 'User not found';
					this.alertType = 'danger';
					this.showAlert();
				} else {
					this.alertMessage = 'Something went wrong';
					this.alertType = 'danger';
					this.showAlert();
				}
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