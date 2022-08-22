<template>
	<!-- HEADER quand deconnecter / Footer / Formulaire d'inscription' -->
	<headerDisconnect />
	<div id="Connexion">
		<form @submit="signup">
			<label for="userName">Surnom</label>
			<input
				type="text"
				v-model="userName"
				name="userName"
				id="userName"
				aria-label="userName"
			/>

			<label for="email">Email</label>
			<input
				type="text"
				v-model="email"
				name="email"
				id="email"
				aria-label="email"
			/>

			<label for="password">Password</label>
			<input
				type="password"
				v-model="password"
				name="password"
				id="password"
				aria-label="password"
			/>

			<input type="submit" aria-label="Création d'un utilisateur" />
		</form>
	</div>
	<otherFooter />
</template>
<script type="text/javascript">
	// Import le HEADER quand deconnecter / Footer / Function d'inscriptio
	import headerDisconnect from '../components/headerDisconnect';
	import otherFooter from '../components/footer';
	import axios from 'axios';
	export default {
		name: 'Signup',
		data() {
			return {
				userName: '',
				email: '',
				password: '',
			};
		},
		components: {
			headerDisconnect,
			otherFooter,
		},
		methods: {
			signup: function(e) {
				e.preventDefault();
				// Recupere les valeurs V-model de input stocke dans la data
				let userName = this.userName;
				let email = this.email;
				let password = this.password;

				// Function Fetch/Axios qui permet d'envoyer les resultats de saisie
				axios
					.post(
						'http://localhost:3000/api/auth/signup/',
						{
							userName,
							email,
							password,
						},
						{
							header: { 'Content-Type': 'application.json' },
						},
					)
					.then(() => {
						// Si réponse du backend envoie message et renvoie vers login
						alert('Votre compte a été créé avec succès');
						location.href = '/';
					})
					.catch((error) => {
						console.log(error);
					});
			},
		},
	};
</script>

<style lang="scss"></style>
