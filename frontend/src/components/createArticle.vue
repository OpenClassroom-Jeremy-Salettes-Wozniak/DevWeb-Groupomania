<!-- Creation d'un article -->
<template>
	<div id="createArticle">
		<h2>Ajouter un article</h2>
		<form>
			<input
				v-model="createTitle"
				type="text"
				name="createTitle"
				id="createTitle"
				aria-label="Title"
				placeholder="Ajouter un titre"
			/>
			<textarea
				v-model="createParagraph"
				type="text"
				name="createParagraph"
				id="createParagraph"
				aria-label="Texte"
				placeholder="Ajouter le contenu de l'article"
			/>
			<input
				type="submit"
				@click="createArticle"
				value="Envoyer"
				aria-label="Envoyer formulaire"
			/>
		</form>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'createArticle',
		data() {
			return {
				createTitle: '',
				createParagraph: '',
				token: '',
			};
		},
		methods: {
			// Function creation article
			createArticle: (e) => {
				e.preventDefault();
				const title = document.getElementById('createTitle').value;
				const content = document.getElementById('createParagraph').value;
				const userId = JSON.parse(localStorage.getItem('userId'));
				const userName = JSON.parse(localStorage.getItem('userName'));

				let sendata = {
					title: title,
					content: content,
					userName: userName,
					userId: userId,
				};

				let token = JSON.parse(localStorage.getItem('token'));
				let sendataJSON = JSON.stringify(sendata);

				fetch('http://localhost:3000/api/article/', {
					method: 'post',
					headers: {
						Accept: 'application/json, text/plain, */*',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					},
					body: sendataJSON,
				})
					.then(() => {
						alert('Article enregistrée !');
						location.reload();
					})
					.catch((error) => alert(error.message));
			},
		},
	};
</script>
<style lang="scss">
	#createArticle {
		margin-top: 0%;
		padding: 5%;
		background-color: black;
		color: white;
		form {
			display: flex;
			flex-direction: column;
		}

		#createParagraph {
			padding: 4%;
		}
		input {
			text-align: center;
		}
	}
</style>
