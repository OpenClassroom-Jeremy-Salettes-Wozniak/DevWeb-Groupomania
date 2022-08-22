<template>
	<!-- Affichage articles -->
	<!-- Loop pour recuperer les articles individuellement et les affichés -->
	<div v-for="article in articles" :key="article">
		<figure id="article">
			<div id="articleAffichage">
				<!-- Recuperation de la response d'un article envoyer dans delete pour recuperer id -->

				<h3 id="title">
					{{ article.title }}
				</h3>
				<p id="content">
					{{ article.content }}
				</p>
				<span id="validate"></span>
				<p>{{ article.createdAt }}</p>
				<button @click="deleteArticle(article)">
					Suppression de l''article
				</button>
			</div>
			<figcaption>
				<!-- Envoie des données sur les autres components en papellant props ArticleId-->
				<getAllComment v-bind:ArticleId="article.id" />
				<createComment v-bind:ArticleId="article.id" />
			</figcaption>
		</figure>
	</div>
</template>

<script type="text/javascript">
	import createComment from './createComment';
	import getAllComment from './getAllComment';

	export default {
		name: 'getAllArticle',
		data() {
			return {
				articles: [],
				token: '',
				articleId: '',
			};
		},
		components: { createComment, getAllComment },
		methods: {
			// Récuperation des articles
			getApi: function() {
				let token = JSON.parse(localStorage.getItem('token'));
				fetch('http://localhost:3000/api/article/', {
					method: 'get',
					headers: {
						Accept: 'application/json, text/plain, */*',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					},
				})
					.then((res) => {
						return res.json();
					})
					.then((res) => {
						// Envoi des articles dans tableau de la data pour le passage dans la loop
						this.articles.push(...res);
					})
					.catch(() => {
						location.href = '../';
					});
			},

			//Supppresion d'un article
			deleteArticle: function(index) {
				// recuperation de l'articleId
				let articleId = index.id;
				let userId = localStorage.getItem('userId');
				let isAdmin = localStorage.getItem('isAdmin');

				if (userId == index.userId || isAdmin == 'true') {
					let token = JSON.parse(localStorage.getItem('token'));
					fetch('http://localhost:3000/api/article/' + articleId, {
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
							location.reload();
						});
				} else {
					alert(
						"Vous n'est pas autoriser à supprimer l'article de quelqu'un d'autre !",
					);
				}
			},
		},
		mounted() {
			this.getApi();
		},
	};
</script>
<style lang="scss">
	#article {
		background-color: black;
		color: white;
		margin-top: 2%;
		border-radius: 1.1rem;
		overflow: hidden;
	}

	#comment {
		margin-top: 2%;
		border-radius: 1rem 1rem 0rem 0rem;
		display: block;
	}

	button {
		padding: 1%;
		background-color: red;
		border-radius: 0.3rem;
		margin-bottom: 1rem;
	}
</style>
