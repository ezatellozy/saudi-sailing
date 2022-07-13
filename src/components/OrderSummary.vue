<template>
  <section>
    <div class="flex justify-between flex-wrap border-b">
      <div
        class="portrait w-full xl:w-1/3 px-4"
        :class="$i18n.locale == 'ar' ? 'border-l' : 'border-r'"
        v-if="preview"
      >
        <div class="flex justify-between mb-8">
          <h2 class="text-primary font-bold text-lg">
            {{ $t('misc.portrait') }}
          </h2>
          <router-link :to="`${rout}/new/step2`" class="link-inside">
            {{ $t('buttons.edit') }}
            <font-awesome-icon :icon="['fas', 'caret-left']" />
          </router-link>
        </div>
        <div class="image-holder mx-auto mb-4">
          <img
            class="w-full h-full"
            :src="`/${preview}`"
            alt="الاتحاد السعودي للملاحة الشراعية"
          />
        </div>
      </div>
      <div class="presonal-information w-full xl:w-2/3 px-4" v-if="profile">
        <div class="flex justify-between mb-8">
          <h2 class="text-primary font-bold text-lg">
            {{ $t('misc.personal_informartion') }}
          </h2>
          <router-link :to="`${rout}/new/step1`" class="link-inside">
            {{ $t('buttons.edit') }}
            <font-awesome-icon :icon="['fas', 'caret-left']" />
          </router-link>
        </div>
        <div class="flex justify-start flex-wrap mt-4">
          <div class="form-input">
            <div class="group">
              <font-awesome-icon class="icon" :icon="['far', 'user']" />
              <input
                disabled
                type="text"
                id="english-name"
                v-model="profile.name_en"
                :placeholder="$t('inputs.english_name')"
              />
              <label for="english-name">{{ $t('inputs.english_name') }}</label>
            </div>
          </div>
          <div class="form-input">
            <div class="group">
              <font-awesome-icon class="icon" :icon="['far', 'user']" />
              <input
                disabled
                type="text"
                id="arabic-name"
                v-model="profile.name_ar"
                :placeholder="$t('inputs.arabic_name')"
              />
              <label for="arabic-name">{{ $t('inputs.arabic_name') }}</label>
            </div>
          </div>
          <div class="form-input">
            <div class="group">
              <font-awesome-icon class="icon" :icon="['far', 'calendar']" />
              <input
                disabled
                type="text"
                id="english-name"
                v-model="profile.birthdate"
                :placeholder="$t('inputs.birthdate')"
              />
              <label>{{ $t('inputs.birthdate') }}</label>
            </div>
          </div>
          <div class="form-input">
            <div class="group">
              <font-awesome-icon class="icon" :icon="['far', 'user']" />
              <input
                disabled
                type="text"
                v-model="profile.gender"
                :placeholder="$t('inputs.gender')"
              />

              <label>{{ $t('inputs.gender') }}</label>
            </div>
          </div>
          <div class="form-input">
            <div class="group">
              <font-awesome-icon class="icon" :icon="['far', 'user']" />
              <input
                disabled
                type="text"
                v-model="profile.nationality"
                :placeholder="$t('inputs.nationality')"
              />
              <label>{{ $t('inputs.nationality') }}</label>
            </div>
          </div>
          <div class="form-input">
            <div class="group">
              <font-awesome-icon class="icon" :icon="['far', 'user']" />
              <input
                disabled
                type="number"
                v-model="profile.identity_number"
                :placeholder="$t('inputs.identity_number')"
              />
              <label>{{ $t('inputs.identity_number') }}</label>
            </div>
          </div>
          <div class="form-input">
            <div class="group">
              <font-awesome-icon class="icon" :icon="['far', 'user']" />
              <input
                disabled
                type="text"
                v-model="profile.identity_type"
                :placeholder="$t('inputs.identity_type')"
              />
              <label>{{ $t('inputs.identity_type') }}</label>
            </div>
          </div>
          <div class="form-input">
            <div class="group">
              <font-awesome-icon class="icon" :icon="['far', 'user']" />
              <input
                disabled
                type="text"
                v-model="profile.identity_expiry"
                :placeholder="$t('inputs.identity_expiry')"
              />

              <label>{{ $t('inputs.identity_expiry') }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="qualifications" v-if="qualifcations">
      <div class="flex justify-between mb-4">
        <h2 class="text-primary font-bold text-lg">
          {{ $t('misc.qualifications') }}
        </h2>
        <router-link :to="`${rout}/new/step3`" class="link-inside">
          {{ $t('buttons.edit') }}
          <font-awesome-icon :icon="['fas', 'caret-left']" />
        </router-link>
      </div>

      <div
        class="flex justify-start flex-wrap mt-4"
        v-for="(qualifcation, i) in qualifcations"
        :key="qualifcation.id"
      >
        <span class="numbers">{{ i + 1 }}</span>
        <div class="form-input">
          <div class="group">
            <font-awesome-icon class="icon" :icon="['far', 'user']" />
            <input
              disabled
              type="text"
              v-model="qualifcation.title"
              :placeholder="$t('inputs.qualification')"
            />
            <label>{{ $t('inputs.qualification') }}</label>
          </div>
        </div>
        <div class="form-input">
          <div class="group">
            <font-awesome-icon class="icon" :icon="['far', 'user']" />
            <input
              disabled
              type="text"
              v-model="qualifcation.issuing_organization"
              :placeholder="$t('inputs.qualification_orgnization')"
            />
            <label for="arabic-name">
              {{ $t('inputs.qualification_orgnization') }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['id', 'rout'],
  data() {
    return {
      profile: null,
      preview: null,
      qualifcations: null,
    }
  },
  mounted() {
    this.fetchProfile()
    this.fetchQualification()
    this.getPortrait()
  },
  methods: {
    fetchProfile() {
      this.loading = true
      this.axios
        .get(`users-applications/get-applicant-profile/${this.id}`)
        .then((data) => {
          this.profile = data.data.applicant_profile
          this.loading = false
        })
    },
    fetchQualification() {
      this.axios
        .get(`users-applications/list-applicant-qualifications/${this.id}`)
        .then((data) => {
          this.qualifcations = data.data.qualifications
        })
    },
    getPortrait() {
      this.axios
        .get(`users-applications/get_applicant_portrait/${this.id}`)
        .then((data) => {
          this.preview = data.data.applicant_portrait.link
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.form-input {
  @apply w-full md:w-1/2;
  .group {
    margin-right: 5px;
  }
}
.qualifications .form-input {
  @apply w-full;
  @media (min-width: 768px) {
    width: calc(50% - 55px);
  }
  .group {
    margin-right: 5px;
  }
}
.table-container {
  overflow-x: auto;
}
table {
  @apply w-full rounded-lg overflow-auto;
  background: #f5f5f5;
  overflow-x: auto !important;
  thead {
    @apply bg-primary text-white;
  }
  th,
  td {
    text-align: start;
    padding: 10px;
    &:not(:last-child) {
      width: 45%;
    }
  }
  tr {
    border-bottom: 1px solid rgb(158, 158, 158);
  }

  td {
    &.actions {
      justify-content: space-between;
      display: flex;
    }
    button,
    a {
      margin: 0 5px;
      padding: 10px;
      @apply text-primary;
      &.trash {
        color: red;
      }
    }
  }
}
.is-rtl {
  .form-input {
    .group {
      margin-left: 5px;
    }
  }
}
span.numbers {
  width: 50px;
  background-color: #f5f5f5;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
}
</style>
