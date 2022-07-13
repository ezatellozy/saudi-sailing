<template>
  <div class="presonal-information">
    <h2 class="text-center text-primary mb-11 font-bold text-xl">
      {{ $t('misc.personal_informartion') }}
    </h2>
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
            <label for="english-name">{{ $t('inputs.english_name') }}</label>
            <p class="text-red-500 text-sm text-center">
              {{ v.errors[0] }}
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
            <label for="arabic-name">{{ $t('inputs.arabic_name') }}</label>
            <p class="text-red-500 text-sm text-center">
              {{ v.errors[0] }}
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
          <label class="relative visible">{{ $t('inputs.birthdate') }}</label>
          <div class="group">
            <font-awesome-icon class="icon" :icon="['far', 'calendar']" />
            <datepicker
              v-model="birthdate"
              name="birthdate"
              :placeholder="$t('inputs.birthdate')"
              :format="customFormatter"
            />
            <p class="text-red-500 text-sm text-center">
              {{ v.errors[0] }}
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
          <div class="group">
            <font-awesome-icon class="icon" :icon="['far', 'user']" />
            <select v-model="gender">
              <option value="male">{{ $t('inputs.male') }}</option>
              <option value="female">{{ $t('inputs.female') }}</option>
            </select>
            <label>{{ $t('inputs.gender') }}</label>
            <p class="text-red-500 text-sm text-center">
              {{ v.errors[0] }}
            </p>
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
            <p class="text-red-500 text-sm text-center">
              {{ v.errors[0] }}
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
            <p class="text-red-500 text-sm text-center">
              {{ v.errors[0] }}
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
          <div class="group">
            <font-awesome-icon class="icon" :icon="['far', 'user']" />
            <select v-model="identityType">
              <option value="iqama">{{ $t('inputs.iqama') }}</option>
              <option value="other">{{ $t('inputs.other') }}</option>
            </select>
            <!-- <input
              type="text"
              name="identity type"
              v-model="identityType"
              :placeholder="$t('inputs.identity_type')"
            /> -->
            <label>{{ $t('inputs.identity_type') }}</label>
            <p class="text-red-500 text-sm text-center">
              {{ v.errors[0] }}
            </p>
          </div>
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
            <p class="text-red-500 text-sm text-center">
              {{ v.errors[0] }}
            </p>
          </div>
        </validation-provider>
      </div>
      <div class="flex justify-center">
        <button
          class="border rounded-xl px-4 py-2 font-bold text-lg bg-secondary text-white border-secondary"
          :class="{
            'cursor-default': invalid,
          }"
          :disabled="invalid"
          @click="updateProfile"
        >
          {{ $t('buttons.next') }}
        </button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
  components: { Datepicker },
  props: ['id'],
  data() {
    return {
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
    }
  },
  mounted() {
    this.fetchProfile()
  },
  methods: {
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
        .post(
          `users-applications/confirm-applicant-profile/${this.id}`,
          requestFormData,
        )
        .then((data) => {
          this.loading = false
          this.$toasted.show(data.data.message)
          if (data.data.status == 'Success') {
            this.$router.push(
              `/settings/athletes-membership/${this.id}/new/step2`,
            )
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    fetchProfile() {
      this.loading = true
      this.axios
        .get(`users-applications/get-applicant-profile/${this.id}`)
        .then((data) => {
          let dataProfile = data.data.applicant_profile
          if (dataProfile.length != 0) {
            this.nameAr = dataProfile.name_ar
            this.nameEn = dataProfile.name_en
            this.birthdate = dataProfile.birthdate
            this.gender = dataProfile.gender
            this.nationality = dataProfile.nationality
            this.identityNumber = dataProfile.identity_number
            this.identityType = dataProfile.identity_type
            this.identityExpiry = dataProfile.identity_expiry
          }
          this.loading = false
        })
        .finally(() => {
          this.items = true
        })
    },
  },
}
</script>

<style></style>
