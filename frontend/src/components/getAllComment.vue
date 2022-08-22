<template>
	<!-- Affichage commentaires -->
	<!-- Loop pour recuperer les commentaires individuellement et les affichés -->
	<div v-for="comment in comments" :key="comment">
		<figure id="comment">
			<div id="commentAffichage">
				<!-- Recuperation de la response d'un article envoyer dans delete pour recuperer id -->
				<p id="content">
					{{ comment.content }}
				</p>
				<p>{{ comment.createdAt }}</p>
				<button @click="deleteComment(comment)">
					Suppression du commentaire
				</button>
			</div>
		</figure>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'getAllComment',
		data() {
			return {
				comments: [],
				token: '',
				articleId: '',
			};
		},
		// Recupere l'articleID de getAllArticle'
		props: ['ArticleId'],
		methods: {
			getComment: function() {
				// Viens récuperer les commentaires associer à l'article id
				let token = JSON.parse(localStorage.getItem('token'));
				fetch(
					'http://localhost:3000/api/article/' + this.ArticleId + '/comment',
					{
						method: 'get',
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + token,
						},
					},
				)
					.then((res) => {
						return res.json();
					})
					.then((res) => {
						// Push les commentaires dans un tableau pour etre lu dans loop HTML
						this.comments.push(...res);
					});
			},
			deleteComment: function(index) {
				// Suppression d'un commentaire'
				const commentId = index.commentId;
				let userId = localStorage.getItem('userId');
				let isAdmin = localStorage.getItem('isAdmin');

				if (userId == index.userId || isAdmin == 'true') {
					let token = JSON.parse(localStorage.getItem('token'));
					fetch('http://localhost:3000/api/comment/' + commentId, {
						method: 'delete',
						headers: {
							Accept: 'application/json, text/plain, */*',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + token,
						},
					})
						.then((res) => {
							return res.json();
						})
						.then(() => {
							// Actualise la page
							location.reload();
						})
						.catch(() => {});
				} else {
					alert(
						"Vous n'est pas autoriser à supprimer le commentaire de quelqu'un d'autre !",
					);
				}
			},
		},
		mounted() {
			this.getComment();
		},
	};
</script>
<style lang="scss">
	#comment {
		background-color: white;
		color: black;
		overflow: hidden;
		margin-bottom: 0%;
	}
</style>
