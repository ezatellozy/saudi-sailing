<template>
  <section>
    <loading v-if="loading" />
    <div class="relative container mx-auto">
      <div class="links" v-if="all">
        <h3 class="title">{{ $t('misc.personal_informartion') }}</h3>
        <div class="content flex flex-wrap">
          <div class="w-full border md:w-1/2 lg:w-1/3">
            <router-link to="/settings/profile/personalInformation">
              <span class="icon">
                <font-awesome-icon size="2x" :icon="['fas', 'user']" />
              </span>
              {{ $t('misc.personal_informartion') }}
            </router-link>
          </div>
          <div class="w-full border md:w-1/2 lg:w-1/3">
            <router-link to="/settings/profile/portrait">
              <span class="icon">
                <font-awesome-icon size="2x" :icon="['fas', 'file-image']" />
              </span>
              {{ $t('misc.portrait') }}
            </router-link>
          </div>
          <div class="w-full border md:w-1/2 lg:w-1/3" v-if="false">
            <button>
              <span class="icon">
                <font-awesome-icon size="2x" :icon="['fas', 'lock']" />
              </span>
              {{ $t('misc.password') }}
            </button>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="personal" v-if="personalInformation">
          <div class="flex justify-between items-center mb-11">
            <h2 class="font-bold text-md">
              {{ $t('misc.enterPersonalInformation') }}
            </h2>
            <router-link to="/settings/profile/portrait" class="link-inside">
              {{ $t('misc.portrait') }}
              <font-awesome-icon :icon="['fas', 'caret-left']" />
            </router-link>
          </div>
          <validation-observer
            class="form-container"
            v-slot="{ invalid }"
            ref="profileUpdate"
          >
            <div class="form-input">
              <validation-provider
                name="English name"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['far', 'user']" />

                  <input
                    type="text"
                    name="English name"
                    id="english-name"
                    v-model="nameEn"
                    :placeholder="$t('inputs.english_name')"
                  />
                  <label for="english-name">
                    {{ $t('inputs.english_name') }}
                  </label>
                  <p
                    class="text-red-500 text-sm text-center"
                    v-if="v.errors[0]"
                  >
                    {{ $t(`misc.${v.errors[0]}`) }}
                  </p>
                </div>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="Arabic name"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['far', 'user']" />
                  <input
                    type="text"
                    name="Arabic name"
                    id="arabic-name"
                    v-model="nameAr"
                    :placeholder="$t('inputs.arabic_name')"
                  />
                  <label for="arabic-name">
                    {{ $t('inputs.arabic_name') }}
                  </label>
                  <p
                    class="text-red-500 text-sm text-center"
                    v-if="v.errors[0]"
                  >
                    {{ $t(`misc.${v.errors[0]}`) }}
                  </p>
                </div>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="birthdate"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <label class="relative visible">
                  {{ $t('inputs.birthdate') }}
                </label>
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['far', 'calendar']" />
                  <datepicker
                    v-model="birthdate"
                    name="birthdate"
                    :placeholder="$t('inputs.birthdate')"
                    :format="customFormatter"
                  />
                  <p
                    class="text-red-500 text-sm text-center"
                    v-if="v.errors[0]"
                  >
                    {{ $t(`misc.${v.errors[0]}`) }}
                  </p>
                </div>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="gender"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <div class="flex items-center">
                  <label
                    class="text-primary font-bold"
                    :class="$i18n.locale == 'ar' ? 'pr-2' : 'pl-2'"
                  >
                    {{ $t('inputs.gender') }} /
                  </label>
                  <div class="radio-group">
                    <!-- <font-awesome-icon class="icon" :icon="['far', 'user']" /> -->
                    <div class="flex items-center">
                      <div class="input-radio">
                        <input
                          type="radio"
                          v-model="gender"
                          value="male"
                          id="male"
                        />
                        <label class="form-check-label" for="male">
                          {{ $t('inputs.male') }}
                        </label>
                      </div>
                      <div class="input-radio">
                        <input
                          type="radio"
                          v-model="gender"
                          value="female"
                          id="female"
                        />
                        <label class="form-check-label" for="female">
                          {{ $t('inputs.female') }}
                        </label>
                      </div>
                    </div>

                    <p
                      class="text-red-500 text-sm text-center"
                      v-if="v.errors[0]"
                    >
                      {{ $t(`misc.${v.errors[0]}`) }}
                    </p>
                  </div>
                </div>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="nationality"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['far', 'user']" />
                  <input
                    type="text"
                    name="nationality"
                    v-model="nationality"
                    :placeholder="$t('inputs.nationality')"
                  />
                  <label>{{ $t('inputs.nationality') }}</label>
                  <p
                    class="text-red-500 text-sm text-center"
                    v-if="v.errors[0]"
                  >
                    {{ $t(`misc.${v.errors[0]}`) }}
                  </p>
                </div>
              </validation-provider>
            </div>

            <div class="form-input">
              <validation-provider
                name="identity number"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['far', 'user']" />
                  <input
                    type="number"
                    name="identity number"
                    v-model="identityNumber"
                    :placeholder="$t('inputs.identity_number')"
                  />
                  <label>{{ $t('inputs.identity_number') }}</label>
                  <p
                    class="text-red-500 text-sm text-center"
                    v-if="v.errors[0]"
                  >
                    {{ $t(`misc.${v.errors[0]}`) }}
                  </p>
                </div>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="identity_type"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <div class="flex items-center">
                  <label
                    class="text-primary font-bold"
                    :class="$i18n.locale == 'ar' ? 'pr-2' : 'pl-2'"
                  >
                    {{ $t('inputs.identity_type') }} /
                  </label>
                  <div class="radio-group">
                    <!-- <font-awesome-icon class="icon" :icon="['far', 'user']" /> -->
                    <div class="flex items-center">
                      <div class="input-radio">
                        <input
                          type="radio"
                          v-model="identityType"
                          value="national identity"
                          id="national identity"
                        />
                        <label class="form-check-label" for="national identity">
                          {{ $t('inputs.national identity') }}
                        </label>
                      </div>
                      <div class="input-radio">
                        <input
                          type="radio"
                          v-model="identityType"
                          value="iqama"
                          id="iqama"
                        />
                        <label class="form-check-label" for="iqama">
                          {{ $t('inputs.iqama') }}
                        </label>
                      </div>
                    </div>
                    <p
                      class="text-red-500 text-sm text-center"
                      v-if="v.errors[0]"
                    >
                      {{ $t(`misc.${v.errors[0]}`) }}
                    </p>
                  </div>
                </div>
              </validation-provider>
            </div>
            <!-- <div class="form-input">
              <validation-provider
                name="English name"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['far', 'user']" />

                  <input
                    type="text"
                    name="English name"
                    id="english-name"
                    v-model="nameEn"
                    :placeholder="$t('inputs.english_name')"
                  />
                  <label for="english-name">
                    {{ $t('inputs.english_name') }}
                  </label>
                </div>
                <p class="text-red-500 flex mx-auto">
                  {{ v.errors[0] }}
                </p>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="Arabic name"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['far', 'user']" />
                  <input
                    type="text"
                    name="Arabic name"
                    id="arabic-name"
                    v-model="nameAr"
                    :placeholder="$t('inputs.arabic_name')"
                  />
                  <label for="arabic-name">
                    {{ $t('inputs.arabic_name') }}
                  </label>
                </div>
                <p class="text-red-500 flex mx-auto">
                  {{ v.errors[0] }}
                </p>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="birthdate"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <label class="relative visible">
                  {{ $t('inputs.birthdate') }}
                </label>
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['far', 'calendar']" />
                  <datepicker
                    v-model="birthdate"
                    name="birthdate"
                    :placeholder="$t('inputs.birthdate')"
                    :format="customFormatter"
                  />
                </div>
                <p class="text-red-500 flex mx-auto">
                  {{ v.errors[0] }}
                </p>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="gender"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['far', 'user']" />
                  <select v-model="gender">
                    <option value="male">{{ $t('inputs.male') }}</option>
                    <option value="female">{{ $t('inputs.female') }}</option>
                  </select>
                  <label>{{ $t('inputs.gender') }}</label>
                </div>
                <p class="text-red-500 flex mx-auto">
                  {{ v.errors[0] }}
                </p>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="nationality"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['far', 'user']" />
                  <input
                    type="text"
                    name="nationality"
                    v-model="nationality"
                    :placeholder="$t('inputs.nationality')"
                  />
                  <label>{{ $t('inputs.nationality') }}</label>
                </div>
                <p class="text-red-500 flex mx-auto">
                  {{ v.errors[0] }}
                </p>
              </validation-provider>
            </div>

            <div class="form-input">
              <validation-provider
                name="identity number"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['far', 'user']" />
                  <input
                    type="number"
                    name="identity number"
                    v-model="identityNumber"
                    :placeholder="$t('inputs.identity_number')"
                  />
                  <label>{{ $t('inputs.identity_number') }}</label>
                </div>
                <p class="text-red-500 flex mx-auto">
                  {{ v.errors[0] }}
                </p>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="identity_type"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['far', 'user']" />
                  <select v-model="identityType">
                    <option value="iqama">{{ $t('inputs.iqama') }}</option>
                    <option value="other">{{ $t('inputs.other') }}</option>
                  </select>
         
                  <label>{{ $t('inputs.identity_type') }}</label>
                </div>
                <p class="text-red-500 flex mx-auto">
                  {{ v.errors[0] }}
                </p>
              </validation-provider>
            </div>
            <div class="form-input">
              <validation-provider
                name="identity expiry"
                rules="required|min:3|max:80"
                v-slot="v"
              >
                <label class="relative visible">
                  {{ $t('inputs.identity_expiry') }}
                </label>
                <div class="group">
                  <font-awesome-icon class="icon" :icon="['far', 'user']" />
                  <datepicker
                    v-model="identityExpiry"
                    @selected="customFormatter($event, 'identityExpiry')"
                    name="identity expiry"
                    :placeholder="$t('inputs.identity_expiry')"
                    :format="customFormatter"
                  />
                  <label>{{ $t('inputs.identity_expiry') }}</label>
                </div>
                <p class="text-red-500 flex mx-auto">
                  {{ v.errors[0] }}
                </p>
              </validation-provider>
            </div> -->
            <div class="flex justify-center">
              <button
                class="border rounded-xl px-4 py-2 font-bold text-lg bg-secondary text-white border-secondary"
                :class="{
                  'cursor-default': invalid,
                }"
                :disabled="invalid"
                @click="updateProfile"
              >
                {{ $t('buttons.update_profile') }}
              </button>
            </div>
          </validation-observer>
        </div>
        <div class="portr" v-if="portrait">
          <div class="flex justify-between items-center mb-11">
            <h2 class="font-bold text-md">{{ $t('misc.enterPortrait') }}</h2>
            <router-link
              to="/settings/profile/personalInformation"
              class="link-inside"
            >
              {{ $t('misc.personal_informartion') }}
              <font-awesome-icon :icon="['fas', 'caret-left']" />
            </router-link>
          </div>
          <validation-observer ref="profilePortrait" v-slot="{ invalid }">
            <div class="form-input">
              <validation-provider
                name="file_portrait"
                rules="required|min:3|max:80"
                v-slot="v"
                class="cursor-pointer"
              >
                <label
                  class="cursor-pointer"
                  for="file_portrait"
                  name="file_portrait"
                  style="position: relative !important;"
                >
                  <div class="image-holder mx-auto mb-4" v-if="file_portrait">
                    <img
                      v-if="fromServer"
                      class="w-full h-full"
                      :src="`/${preview}`"
                      alt="image"
                    />
                    <img
                      v-else
                      class="w-full h-full"
                      :src="`${preview}`"
                      alt="image"
                    />
                  </div>
                  <div class="image-holder mx-auto mb-4" v-else>
                    <img
                      class="w-full h-full"
                      src="@/assets/image-placeholder-icon-5.jpg"
                      alt="image"
                    />
                  </div>
                </label>
                <input
                  class="hidden"
                  id="file_portrait"
                  type="file"
                  @input="previewMainMedia($event)"
                />

                <p class="text-red-500 flex mx-auto">
                  {{ v.errors[0] }}
                </p>
              </validation-provider>
            </div>
            <div class="flex justify-center">
              <button
                class="border rounded-xl px-4 py-2 font-bold text-lg bg-secondary text-white border-secondary"
                :class="invalid ? 'cursor-default' : ''"
                @click="uploadPortrait"
                :disabled="invalid"
              >
                {{ $t('buttons.upload') }}
              </button>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import Loading from '../components/Loading.vue'
import Datepicker from 'vuejs-datepicker'
export default {
  components: { Loading, Datepicker },
  name: 'Profile',
  data() {
    return {
      loading: false,
      items: null,
      file_portrait: null,
      nameAr: '',
      nameEn: '',
      birthdate: '',
      gender: 'male',
      nationality: '',
      identityNumber: '',
      identityType: 'iqama',
      identityExpiry: '',
      preview: null,
      identity_file: '',
      personalInformation: false,
      all: true,
      portrait: false,
      fromServer: false,
    }
  },
  mounted() {
    this.fetchProfile()
    this.fetchPortrait()
    this.openTabs(this.$route.params.slug)
  },
  methods: {
    fetchProfile() {
      this.loading = true
      this.items = false
      this.axios
        .get(`users/get-profile`)
        .then((data) => {
          let dataProfile = data.data.profile
          if (dataProfile.length != 0) {
            this.nameAr = dataProfile.name_ar
            this.nameEn = dataProfile.name_en
            this.birthdate = dataProfile.birthdate
            this.gender = dataProfile.gender
            this.nationality = dataProfile.nationality
            this.identityNumber = dataProfile.identity_number
            this.identityType = dataProfile.identity_type
            this.identityExpiry = dataProfile.identity_expiry
          } else {
            this.items = dataProfile
          }
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.$router.replace('/login')
          }
        })
        .finally(() => {
          this.items = true
          this.loading = false
        })
    },

    fetchPortrait() {
      this.axios
        .get(`users/get-portrait`)
        .then((data) => {
          this.preview = data.data.portrait.link
          if (this.preview == null) {
            this.fromServer = false
          } else {
            this.fromServer = true
            this.file_portrait = true
          }
        })
        .catch((res) => {
          console.log(res)
        })
    },
    uploadPortrait() {
      this.loading = true
      let requestFormData = new FormData()
      requestFormData.append('portrait_file', this.file_portrait)
      this.axios
        .post(`users/update-portrait`, requestFormData)
        .then((data) => {
          this.loading = false
          this.$refs.profilePortrait.reset()
          this.$toasted.show(data.data.stutus)
          this.file_portrait = null

          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    updateProfile() {
      this.loading = true
      let requestFormData = new FormData()
      requestFormData.append('name_ar', this.nameAr)
      requestFormData.append('name_en', this.nameEn)
      requestFormData.append('birthdate', this.customFormatter(this.birthdate))
      requestFormData.append('gender', this.gender)
      requestFormData.append('nationality', this.nationality)
      requestFormData.append('identity_number', this.identityNumber)
      requestFormData.append('identity_type', this.identityType)
      requestFormData.append(
        'identity_expiry',
        this.customFormatter(this.identityExpiry),
      )
      this.axios
        .post(`users/update-profile`, requestFormData)
        .then((data) => {
          this.loading = false
          this.$toasted.show(data.data.stutus)
          // this.$refs.profileUpdate.reload()
          if (data.data.stutus == 'Success') {
            this.$router.push('/settings/profile/portrait')
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    customFormatter(d, tar) {
      let date = new Date(d)
      let day = '' + date.getDate()
      let month = '' + (date.getMonth() + 1)
      let year = date.getFullYear()

      if (day.length < 2) {
        day = `0${day}`
      }
      if (month.length < 2) {
        month = `0${month}`
      }
      this[tar] = `${year}-${month}-${day}`
      return `${year}-${month}-${day}`
    },
    previewMainMedia(event) {
      if (event.target.files.length !== 0) {
        this.fromServer = false
        this.file_portrait = event.target.files[0]
        this.preview = URL.createObjectURL(this.file_portrait)
      }
    },
    openTabs(tab) {
      this.personalInformation = false
      this.all = false
      this.portrait = false
      this[tab] = true
    },
  },
  watch: {
    $route() {
      this.openTabs(this.$route.params.slug)
    },
  },
}
</script>
<style lang="scss" scoped>
.content {
  > div {
    padding: 40px 0;
    text-align: center;
    position: relative;
    button,
    a {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      @apply text-primary;
      span.icon {
        @apply bg-primary;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        display: inline-flex;
        margin: 0 auto 10px;
        justify-content: center;
        align-items: center;
        transition: 0.3s;
        color: #fff;
      }

      &:hover {
        span.icon {
          @apply bg-secondary;
        }
      }
    }
  }
}
.image-holder {
  width: 200px;
  height: 150px;
  img {
    object-fit: cover;
  }
}
input[type='file'] {
  position: relative !important;
  opacity: 1 !important;
}
// .info {
//   margin-bottom: 30px !important;
// }
</style>
