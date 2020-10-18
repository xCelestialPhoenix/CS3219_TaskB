<template>
    <div id="getpage">
        <h1>Get users:</h1>
			<input v-model="input" type="text" name="username" placeholder="Username">
			<b-button @click="getUser()">Get User</b-button>
			<b-button @click="getAllUser">Get All</b-button>
			<p id="errorPrompt" v-if="error">Please fill up all the fields</p>
			<br v-if="!error">
			<br v-if="!error">
			<hr>
			<User v-for="user in userList" :key="user.username" :user="user"></User>
			<hr>

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
			userList: [],
			input: '',
			error: false,
			dismissSecs: 2,
			dismissCountDown: 0,
			alertMessage: '',
			alertType: ''
		}
	},
 
	methods: {
		getUser: function() {
			if(this.input === '') {
				this.error = true;
				return;	
			}
			this.error = false;
			const baseURI = 'http://localhost:4040/api/user/' + this.input;
            axios.get(baseURI)
            .then((result) => {
				this.userList = result.data.data;
				this.alertMessage = 'Query successful';
				this.alertType = 'success';
				this.showAlert();
			})
			.catch((error) => {
				if(error.response.status == 404) {
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
				this.show = true;
				this.input = '';
			})
         },

		getAllUser: function() {
			this.error = false;
            const baseURI = 'http://localhost:4040/api/user/';
            axios.get(baseURI)
            .then((result) => {
				this.userList = result.data.data;
				this.alertMessage = 'Query successful';
				this.alertType = 'success';
				this.showAlert();
			})
			.catch((error) => {
				if(error.response.status === 404) {
					this.alertMessage = 'No user found';
					this.alertType = 'danger';
					this.showAlert();
				} else {
					this.alertMessage = 'Something went wrong';
					this.alertType = 'danger';
					this.showAlert();
				}
			})
			.finally(() => {
				this.input = '';
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

hr {
	border-color: gray;
}

</style>