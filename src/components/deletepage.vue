<template>
    <div id="deletepage">
        <h1>Delete users:</h1>
			<input v-model="input" type="text" name="username" placeholder="Username" required>
			<b-button @click="deleteUser()">Delete User</b-button>
			<p id="errorPrompt" v-if="error">Please fill up all the fields</p>
			<b-alert id="alert" :show="dismissCountDown" dismissible :variant="alertType" @dismissed="dismissCountDown=0"
				@dismiss-count-down="countDownChanged">{{ alertMessage }}</b-alert>
    </div>
</template>

<script>

export default {
	name: 'GetPage',

	data() {
		return {
			input: '',
			error: false,
			dismissSecs: 2,
			dismissCountDown: 0,
			alertMessage: '',
			alertType: ''
		}
	},
 
	methods: {
		deleteUser: function() {
			if(this.input === '') {
				this.error = true;
				return;	
			}
			this.error = false;
			const baseURI = 'http://localhost:4040/api/user/' + this.input;
            axios.delete(baseURI)
            .then((result) => {
				this.alertMessage = 'User successfully deleted';
				this.alertType = 'success';
				this.showAlert();
			})
			.catch((error) => {
				if(error.response.status === 404) {
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
</style>