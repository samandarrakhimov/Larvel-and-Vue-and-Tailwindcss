import {createRouter, createWebHistory} from "vue-router";
import Dashboard from '../views/Dashboard.vue'
import Surveys from '../views/Surveys.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import  DefaultLayout from'../components/DefaultLayout.vue'
import store from "@/store";
import AuthLayout from "@/components/AuthLayout.vue";
  const routes = [
      {
          path: "/",
          redirect: "/dashboard",
          component: DefaultLayout,
          meta:{requiresAth:true},
          children:[
              {
                  path:'/dashboard',
                  name:"Dashboard",
                  component:Dashboard
              },
              {
                  path:'/surveys',
                  name:"Surveys",
                  component:Surveys
              },
          ]
      },
      {
          path: "/auth",
          redirect: "Login",
          name: 'Auth',
          component: AuthLayout,
          children: [
              {
                  path: "/login",
                  meta:{isGuest:true},
                  name: "Login",
                  component: Login
              },
              {
                  path: "/register",
                  name: "Register",
                  component: Register
              },
          ]
      }
  ]
const router = createRouter({
    history:createWebHistory(),
    routes,
})
router.beforeEach((to,from,next) => {
    if (to.meta.requiresAth && !store.state.user.token){
        next({name:"Login"})
    }
    else if (store.state.user.token && (to.meta.isGuest)){
        next({name:"Dashboard"})
    }
    else {
        next()
    }
})

export default  router;
