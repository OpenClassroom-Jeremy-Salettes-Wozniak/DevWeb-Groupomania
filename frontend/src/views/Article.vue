<!-- HEADER quand connecter / Footer / creation d'article / Affichage d'article-->
<template>
	<headerConnect />
	<createArticle />
	<getAllArticle />
	<footerConnect />
</template>

<script type="text/javascript">
	// Import le HEADER quand connecter / Footer / creation d'article / Affichage d'article
	import createArticle from '../components/createArticle';
	import getAllArticle from '../components/getAllArticle';
	import headerConnect from '../components/headerConnect';
	import footerConnect from '../components/footer';

	export default {
		name: 'Article',
		components: { createArticle, getAllArticle, headerConnect, footerConnect },
		data() {
			return {};
		},
	};
</script>
