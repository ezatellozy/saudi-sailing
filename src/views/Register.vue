<template>
  <section>
    <Loading v-if="loading" />
    <div class="relative">
      <small-card>
        <h3 class="text-primary font-bold text-center my-5 text-lg md:text-xl">
          {{ $t('misc.Create an account') }}
        </h3>
        <div class="p-4">
          <validation-observer v-slot="{ invalid }">
            <div class="form-input">
              <validation-provider
                name="name"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['fas', 'user']" />
                  <input
                    type="text"
                    name="name"
                    v-model="user.name"
                    :placeholder="$t('misc.Enter username')"
                  />
                  <p class="text-red-500" v-if="v.errors[0]">
                    {{ $t(`misc.${v.errors[0]}`) }}
                  </p>
                  <p v-if="resErrors" class="text-red-500 text-sm flex mx-auto">
                    {{ resErrors.name }}
                  </p>
                </div>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="email"
                rules="required|min:3"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['fas', 'envelope']" />
                  <input
                    type="email"
                    name="email"
                    v-model="user.email"
                    :placeholder="$t('inputs.email')"
                  />
                  <p class="text-red-500" v-if="v.errors[0]">
                    {{ $t(`misc.${v.errors[0]}`) }}
                  </p>
                  <p v-if="resErrors" class="text-red-500 text-sm flex mx-auto">
                    <span v-if="resErrors.email">
                      {{ resErrors.email.unique }}
                    </span>
                  </p>
                </div>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="phone"
                rules="required|min:9|max:12"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['fas', 'phone']" />
                  <input
                    type="phone"
                    name="phone"
                    v-model="user.mobile"
                    :placeholder="$t('inputs.phoneNumber')"
                  />
                  <p class="text-red-500" v-if="v.errors[0]">
                    {{ $t(`misc.${v.errors[0]}`) }}
                  </p>
                  <p v-if="resErrors" class="text-red-500 text-sm flex mx-auto">
                    <span v-if="resErrors.mobile">
                      {{ resErrors.mobile.unique }}
                    </span>
                  </p>
                </div>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="password"
                ref="password"
                rules="required|min:6|max:80"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['fas', 'lock']" />
                  <input
                    type="password"
                    name="password"
                    v-model="user.password"
                    :placeholder="$t(`misc.password`)"
                  />
                  <p class="text-red-500" v-if="v.errors[0]">
                    {{ $t(`misc.${v.errors[0]}`) }}
                  </p>
                  <p v-if="resErrors" class="text-red-500 text-sm flex mx-auto">
                    {{ resErrors.password }}
                  </p>
                </div>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="cPassword"
                rules="required|min:6|max:80|confirmed:password"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['fas', 'lock']" />
                  <input
                    type="password"
                    name="cPassword"
                    v-model="user.confirmPassword"
                    :placeholder="$t(`misc.confirm password`)"
                  />
                  <p class="text-red-500" v-if="v.errors[0]">
                    {{ $t(`misc.${v.errors[0]}`) }}
                  </p>
                </div>
              </validation-provider>
            </div>
            <p class="text-red-500 mt-11 font-bold text-center" v-if="status">
              {{ status }}
            </p>
            <div class="flex mt-11 justify-center">
              <button
                class="border rounded-xl px-4 py-2 font-bold text-lg bg-primary text-white border-primary"
                :class="{
                  'cursor-default': invalid,
                }"
                @click="register()"
                :disabled="invalid"
              >
                {{ $t('buttons.signUp') }}
              </button>
            </div>
          </validation-observer>
        </div>
        <div class="flex justify-center mt-4 text-center font-bold text-sm">
          <p class="text-primary mx-2">
            {{ $t('misc.Already have an account?') }}
          </p>
          <a class="text-secondary" href="/login">
            {{ $t('misc.Sign in Instead') }}
          </a>
        </div>
      </small-card>
    </div>
  </section>
</template>

<script>
import Loading from './Loading.vue'
// import BaseCard from "../ui/BaseCard.vue";
export default {
  // components: { BaseCard },
  name: 'Register',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        mobile: '',
        confirmPassword: '',
      },

      // resErrors: null,
      // loading: false,
    }
  },
  computed: {
    resErrors() {
      return this.$store.getters.resErrors
    },
    status() {
      return this.$store.getters.status
    },
    loading() {
      return this.$store.getters.loading
    },
  },
  watch: {
    status(val) {
      if (val) {
        this.$toasted.show(val)
      }
    },
  },
  methods: {
    register() {
      this.$store.dispatch('register', this.user)

      // const data = new FormData()
      // data.append('name', this.userName)
      // data.append('email', this.email)
      // data.append('password', this.password)
      // data.append('mobile', this.phone)
      // this.axios
      //   .post('users/signup', data)
      //   .then((res) => {
      //     console.log(res)
      //     this.resErrors = res.data.errors
      //     console.log(res.data)
      //     this.$toasted.show(res.data.message)
      //     if (res.data.status == 'Success') {
      //       sessionStorage.setItem('user', JSON.stringify(res.data.user))
      //       sessionStorage.setItem('token', res.data.token)
      //       this.$store.commit('setUser', res.data.user)
      //       this.$store.commit('setToken', res.data.token)
      //       setTimeout(() => {
      //         window.location.reload()
      //       }, 1000)
      //     }
      //     this.loading = false
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //     this.loading = false
      //   })
    },
  },
  components: { Loading },
}
</script>
<style scoped lang="scss">
.form-input {
  margin-bottom: 10px;
  .group {
    position: relative;
    input {
      margin-bottom: 5px;
      border-radius: 10px;
      padding: 10px 20px 10px 35px;
      @apply border border-primary;
      width: 100%;
    }
    .icon {
      position: absolute;
      top: 15px;
      left: 10px;
      color: #416f09;
      font-size: 20px;
    }
  }
}

.is-rtl {
  .group {
    input {
      padding: 10px 35px 10px 20px;
    }
    .icon {
      right: 10px;
    }
  }
}
</style>
