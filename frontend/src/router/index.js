// Importation de vue router
import { createWebHistory, createRouter } from 'vue-router';

// Importation des view/component
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Compte from '../views/Compte.vue';
import Article from '../views/Article.vue';

// Creation des routes
const routes = [
	{ path: '/', component: Login }, // Accueil du site (Login)
	{ path: '/signup', component: Signup }, // Inscription
	{ path: '/compte', component: Compte }, // Profile
	{ path: '/article', component: Article }, // Zone de communication
];

// parametre du router
const router = createRouter({
	history: createWebHistory(),
	routes,
});

// exportation du router vers main.js
export default router;
