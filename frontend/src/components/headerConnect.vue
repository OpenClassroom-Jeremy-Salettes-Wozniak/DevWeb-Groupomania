<template>
	<!-- Header quand connecter avec redirection des links et deconnexion' -->
	<div class="header">
		<router-link to="/article">
			<h1>
				<img src="../assets/groupomania.png" alt="Groupomania logo" />
			</h1>
		</router-link>

		<nav>
			<router-link style="text-decoration: none; color: inherit;" to="/Compte">
				<div>Mon compte</div>
			</router-link>
			<a id="disconnect" @click="disconnect()"> Deconnexion</a>
		</nav>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		data() {
			return {};
		},
		methods: {
			disconnect() {
				localStorage.clear();
				location.href = '../';
			},
		},
	};
</script>
<style lang="scss">
	#disconnect {
		cursor: pointer;
	}
</style>
