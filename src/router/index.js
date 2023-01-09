import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import newGame from "../views/NewGameView.vue";

const routes = [
    {
        path: "/newGame",
        name: "newGame",
        component: newGame,
    },
    {
        path: "/",
        name: "HomeView",
        component: Home,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
