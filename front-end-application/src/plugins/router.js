import Vue from "vue";
import Router from "vue-router";
import SignIn from "../pages/entrar/";
import SignUp from "../pages/cadastrar/";
import RecoverPassword from "../pages/recsenha/";
import RecoverPassword2 from "../pages/recsenha/recsenhadois/";
import Home from "../pages/pedidos/";
import Profile from "../pages/perfil/";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Sign-In",
      component: SignIn
    },
    {
      path: "/cadastrar",
      name: "Sign-Up",
      component: SignUp
    },
    {
      path: '/recsenha',
      name: "Recover-Password",
      component: RecoverPassword
    },
    {
      
      path: '/recsenhadois/2',
      name: "Recover-Password-2",
      component: RecoverPassword2
    },
    {
      
      path: '/home',
      name: "Home",
      component: Home
    },
    {
      path: '/perfil',
      name: "Profile",
      component: Profile
    },
  ]
});
export default router;
