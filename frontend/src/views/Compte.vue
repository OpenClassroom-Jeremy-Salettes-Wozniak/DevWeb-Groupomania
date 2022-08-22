<!-- HEADER quand connecter / Footer / Affichage profil -->
<template>
	<headerConnect />
	<div id="profil">
		<span>Nom d'utilisateur : </span>
		<p>{{ userName }}</p>
		<span>Email : </span>
		<p>{{ email }}</p>
		<button @click="deleteUser">Suppresion du compte</button>
	</div>
	<footerConnect />
</template>

<script type="text/javascript">
	// Import  HEADER quand connecter / Footer / Affichage profil
	import headerConnect from '../components/headerConnect';
	import footerConnect from '../components/footer';
	// import axios from 'axios';
	export default {
		name: 'Compte',
		components: { headerConnect, footerConnect },
		data() {
			return { userName: '', email: '' };
		},
		methods: {
			getProfil: function() {
				// Recupere userName et email, Si personne n'a pas de userName. Renvoie à l'accueil
				this.userName = localStorage.getItem('userName');
				this.email = localStorage.getItem('email');
				if (this.userName === undefined) {
					location.href = '../';
				}
			},
			deleteUser: function() {
				// Suppression du compte utilisateur et vidage du localStorage avec redirection login
				const userId = localStorage.getItem('userId');
				const token = localStorage.getItem('token');

				fetch(`http://localhost:3000/api/auth/` + userId, {
					method: 'delete',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ` + token,
					},
				})
					.then(localStorage.clear())
					.then((location.href = '/'));
			},
		},

		created: function() {
			this.getProfil();
		},
	};
</script>
<style>
	#profil {
		padding: 2%;
		border-radius: 1rem;
		background-color: black;
		color: white;
		margin: 2%;
	}
</style>
