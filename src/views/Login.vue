<template>
  <section>
    <loading v-if="loading" />
    <small-card>
      <h3 class="text-primary font-bold text-center my-5 text-lg md:text-xl">
        {{ $t('misc.login') }}
      </h3>
      <div class="p-4">
        <validation-observer v-slot="{ invalid }">
          <div class="form-input">
            <validation-provider
              name="email"
              rules="required|min:3|max:80"
              v-slot="v"
            >
              <div class="group">
                <font-awesome-icon class="icon" :icon="['fas', 'user']" />

                <input
                  type="email"
                  name="email"
                  v-model="user.userName"
                  :placeholder="$t('inputs.email')"
                />
              </div>
              <p class="text-red-500 flex mx-auto" v-if="v.errors[0]">
                {{ $t(`misc.${v.errors[0]}`) }}
              </p>
            </validation-provider>
          </div>
          <div class="form-input">
            <validation-provider
              name="password"
              rules="required|min:3|max:80"
              v-slot="v"
            >
              <div class="group">
                <font-awesome-icon class="icon" :icon="['fas', 'lock']" />
                <input
                  type="password"
                  name="password"
                  v-model="user.password"
                  :placeholder="$t('misc.password')"
                />
                <div class="flex justify-end">
                  <a href="/forgot-password" class="text-primary">
                    {{ $t('misc.forgot_password?') }}
                  </a>
                </div>
                <p class="text-red-500" v-if="v.errors[0]">
                  {{ $t(`misc.${v.errors[0]}`) }}
                </p>
              </div>
            </validation-provider>
            <p class="text-red-500 mt-11 font-bold text-center" v-if="err">
              {{ err }}
            </p>
          </div>
          <div class="flex mt-11 justify-center">
            <button
              class="border rounded-xl px-4 py-2 font-bold text-lg bg-primary text-white border-primary"
              :class="{
                'cursor-default': invalid,
              }"
              @click="login()"
              :disabled="invalid"
            >
              {{ $t('misc.login') }}
            </button>
          </div>
        </validation-observer>
      </div>
      <div class="flex justify-center mt-4 text-center font-bold text-sm">
        <p class="text-primary mx-2">{{ $t('misc.Dont have an account?') }}</p>
        <a class="text-secondary" href="/register">
          {{ $t('misc.Create an account') }}
        </a>
      </div>
    </small-card>
  </section>
</template>

<script>
import Loading from '../components/Loading.vue'
export default {
  name: 'Login',
  components: { Loading },
  data() {
    return {
      loggedIn: false,
      user: {
        userName: '',
        password: '',
      },
      // err: null,
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    err() {
      return this.$store.getters.status
    },
  },
  watch: {
    err(val) {
      if (val) {
        this.$toasted.show(val)
      }
      // console.log(val)
    },
  },
  methods: {
    login() {
      this.$store.dispatch('login', this.user)

      // this.loading = true
      // const data = new FormData()

      // data.append('username', this.userName)
      // data.append('password', this.password)

      // this.axios
      //   .post('users/login', data)
      //   .then((data) => {
      //     this.$toasted.show(data.data.status)
      //     sessionStorage.setItem('user', JSON.stringify(data.data.user))
      //     sessionStorage.setItem('token', data.data.token)
      //     this.$store.commit('setUser', data.data.user)
      //     this.$store.commit('setToken', data.data.token)
      //     setTimeout(() => {
      //       window.location.reload()
      //     }, 1000)
      //   })
      //   .catch((errors) => {
      //     if (errors.response.status == 401) {
      //       this.err = errors.response.data.message
      //       this.$refs.loginForm.setErrors(errors.response.data.message)
      //     }
      //   })
      //   .finally(() => {
      //     this.loading = false
      //   })
    },
  },
}
</script>
<style scoped lang="scss">
.form-input {
  margin-bottom: 20px;
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
