// import Cookies from "js-cookie";
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
// import VueI18n from "vue-i18n";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('@/views/Events.vue'),
    meta: {
      title: 'Events',
    },
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/News.vue'),
    meta: {
      title: 'News',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
    meta: {
      title: 'About',
    },
  },
  {
    path: '/sailling',
    name: 'sailling',
    component: () => import('@/views/AboutSailling.vue'),
    meta: {
      title: 'Sailling',
    },
  },
  {
    path: '/kites',
    name: 'kites',
    component: () => import('@/views/AboutKites.vue'),
    meta: {
      title: 'Kites',
    },
  },
  {
    path: '/license',
    name: 'license',
    component: () => import('@/components/Accordian.vue'),
    meta: {
      title: 'License',
    },
  },
  {
    path: '/contact-us',
    name: 'contact-us',
    component: () => import('@/components/Contact.vue'),
    meta: {
      title: 'Contact us',
    },
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      guest: true,
      title: 'login',
    },
  },
  {
    path: '/settings',
    name: 'settings',
    props: true,
    component: () => import('@/views/Settings.vue'),
    meta: {
      auth: true,
      title: 'settings',
    },
    children: [
      {
        path: 'profile/:slug',
        name: 'profile',
        component: () => import('@/views/Profile.vue'),
        meta: {
          auth: true,
          title: 'Profile',
        },
      },
      {
        path: 'athletes-membership/:id/:status/:step',
        name: 'athletes-membership',
        component: () => import('@/components/AthletesMembership.vue'),
        meta: {
          auth: true,
          title: 'AthletesMembership',
        },
      },
      {
        path: 'instructor-license/:id/:status/:step',
        name: 'instructor-license',
        component: () => import('@/components/InstructorLicense.vue'),
        meta: {
          auth: true,
          title: 'InstructorLicense',
        },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/components/Dashboard.vue'),
        meta: {
          auth: true,
          title: 'dashboard',
        },
      },
    ],
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
    meta: {
      guest: true,
      title: 'Register',
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/ForgotPassword.vue'),
    meta: {
      guest: true,
      title: 'ForgotPassword',
    },
  },

  {
    path: '*',
    name: 'not found',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: 'Not Found',
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | SaudiSailing`
  next()
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogedIn) {
    next('/login')
  } else if (to.meta.guest && store.getters.isLogedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
