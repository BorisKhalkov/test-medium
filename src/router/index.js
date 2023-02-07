import { createRouter, createWebHashHistory } from "vue-router";
import GlobalFeed from "@/views/GlobalFeed.vue";
import Register from "@/views/RegisterView.vue";
import Login from "@/views/LoginView.vue";
import YourFeed from "@/views/YourFeed";
import TagFeed from "@/views/TagFeed";
import Article from "@/views/Article";
import CreateArticle from "@/views/CreateArticle";
import EditArticle from "@/views/EditArticle";

const routes = [
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "globalFeed",
    component: GlobalFeed,
  },
  {
    path: "/feed",
    name: "yourFeed",
    component: YourFeed,
  },
  {
    path: "/tags/:slug",
    name: "tag",
    component: TagFeed,
  },
  {
    path: "/articles/new",
    name: "createArticle",
    component: CreateArticle,
  },
  {
    path: "/articles/:slug",
    name: "article",
    component: Article,
  },
  {
    path: "/articles/:slug/edit",
    name: "editArticle",
    component: EditArticle,
  },
  {
    path: "/settings",
    name: "settings",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug",
    name: "userProfile",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug/favorites",
    name: "userProfileFavorites",
    component: GlobalFeed,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
