<!-- Creation d'un commentaire -->
<template>
	<div id="createComment">
		<form @submit="createComment">
			<input
				type="text"
				name="content"
				class="content"
				v-model="createParagraph"
				aria-label="Texte"
				placeholder="Ajouter un commentaire"
			/>
			<!-- Recuperation de l'articleID' -->
			<input name="articleId" type="hidden" :value="ArticleId" />
			<input
				type="submit"
				id="sendComment"
				value="Envoyer"
				aria-label="Envoyer formulaire"
			/>
		</form>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'createComment',
		data() {
			return {
				token: '',
			};
		},
		props: ['ArticleId'],
		methods: {
			createComment: (e) => {
				e.preventDefault();
				let formData = new FormData(e.target);
				const content = formData.get('content');
				// Recuperation de l'articleID correspondant au commentaire'
				const articleId = formData.get('articleId');
				const userId = JSON.parse(localStorage.getItem('userId'));
				let sendata = {
					content: content,
					userId: userId,
					articleId: articleId,
				};
				let sendataJson = JSON.stringify(sendata);
				console.log(sendataJson);
				let token = JSON.parse(localStorage.getItem('token'));
				fetch('http://localhost:3000/api/comment/', {
					method: 'post',
					headers: {
						Accept: 'application/json, text/plain, */*',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					},
					body: sendataJson,
				})
					.then(() => {
						alert('Commentaire enregistrée !');
						location.reload();
					})
					.catch((error) => alert(error.message));
			},
		},
		activated: () => {
			this.createComment();
		},
	};
</script>
<style lang="scss">
	.content {
		width: 75%;
		padding: 2%;

		margin-bottom: 2%;
	}
	#sendComment {
		width: 20%;
		padding: 2%;
	}
	#createComment {
		margin-left: 2.22rem;
		margin-right: 2.22rem;
	}
</style>
