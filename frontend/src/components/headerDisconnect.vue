<template>
	<!-- Header quand deconnecter avec redirection des links' -->
	<div class="header">
		<router-link to="/">
			<img src="../assets/groupomania.png" alt="Groupomania logo" />
		</router-link>

		<nav>
			<router-link style="text-decoration: none; color: inherit;" to="/">
				<span>Connexion</span>
			</router-link>
			<router-link style="text-decoration: none; color: inherit;" to="/signup">
				<span>Inscription</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
	export default {
		name: 'HeaderDisconnect',
	};
</script>

<style lang="scss">
	.header {
		background-color: black;
		color: white;
		padding: 1%;

		span {
			color: white;
		}
		img {
			width: 18%;
		}

		nav {
			display: flex;
			justify-content: space-around;
			text-decoration: none;
			font-size: 1.5rem;
		}
	}
</style>
