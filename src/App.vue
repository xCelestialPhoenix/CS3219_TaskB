<template>
	<div id="app">
		<NavBar @CustomEventInputChanged="changeTab"></NavBar>
		<div v-if="selectedTab==='get'">
			<GetPage/>
		</div>
		<div v-else-if="selectedTab==='post'">
			<PostPage/>
		</div>
		<div v-else-if="selectedTab==='update'">
			<PutPage/>
		</div>
		<div v-else>
			<DeletePage/>
		</div>
	</div>
</template>

<script>
import NavBar from './components/navbar'
import GetPage from './components/getpage'
import PostPage from './components/postpage'
import PutPage from './components/putpage'
import DeletePage from './components/deletepage'

export default {
	name: 'App',
	components: {
		NavBar,
		GetPage,
		PostPage,
		PutPage,
		DeletePage
	},

	data() {
		return {
			selectedTab: 'get',
		}
	},
 
	methods: {
		changeTab ( newTab ) {
			this.selectedTab = newTab;
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#alert {
	position: fixed;
	top: 0;
	left: 40%;
	width: 20%;

}

#errorPrompt {
	color: red;
}

h1 {
	margin: 20px 0px;
}

</style>
