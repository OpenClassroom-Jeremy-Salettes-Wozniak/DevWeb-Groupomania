<!-- HEADER quand deconnecter / Footer / Formulaire de connexion -->
<template>
	<headerDisconnect />
	<div id="Connexion">
		<form @submit="login">
			<!-- Input email -->
			<label for="email">Email</label>
			<input type="text" v-model="email" name="email" id="email" />
			<!-- Input password -->
			<label for="password">Password</label>
			<input type="password" v-model="password" name="password" id="password" />
			<!-- Input submit -->
			<input type="submit" aria-label="Création d'un utilisateur" />
		</form>
	</div>
	<otherFooter />
</template>

<script type="text/javascript">
	// Import le HEADER quand deconnecter / Footer / Function de connexion
	import axios from 'axios';
	import headerDisconnect from '../components/headerDisconnect';
	import otherFooter from '../components/footer';

	export default {
		name: 'Connexion',
		data() {
			return {
				email: '',
				password: '',
			};
		},
		components: { headerDisconnect, otherFooter },
		methods: {
			login: function(e) {
				e.preventDefault();
				// Recupere les valeurs V-model de input stocke dans la data
				let email = this.email;
				let password = this.password;

				// Function Fetch/Axios qui permet d'envoyer les resultats de saisie
				axios
					.post(
						'http://localhost:3000/api/auth/login/',
						{
							email,
							password,
						},
						{
							header: { 'Content-Type': 'application.json' },
						},
					)
					.then((res) => {
						// Recupere la reponse du backend et stockent certain valeur dans localStorage
						localStorage.setItem('userId', JSON.stringify(res.data.userId));
						localStorage.setItem('userName', JSON.stringify(res.data.userName));
						localStorage.setItem('email', JSON.stringify(res.data.email));
						localStorage.setItem('token', JSON.stringify(res.data.token));
						localStorage.setItem('isAdmin', JSON.stringify(res.data.isAdmin));
						// Renvois vers la zone de communication
						location.href = './article/';
					})
					.catch(() => {
						// Si la saisie est incorrect renvoie message suivant
						alert("L'utilisateur n'existe pas, veuillez vous inscrire.");
					});
			},
		},
	};
</script>
<style lang="scss">
	#Connexion {
		form {
			display: flex;
			flex-direction: column;
			margin: auto;
			padding: 2%;
		}
		input {
			margin-bottom: 3%;
			border-radius: 0.3rem;
			padding: 1%;
		}
	}
</style>
