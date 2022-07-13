<template>
  <div class="dashboard">
    <h3 class="title">{{ $t('misc.dashboard') }}</h3>
    <div class="content flex flex-wrap">
      <div class="w-full border md:w-1/2 lg:w-1/3">
        <router-link to="/settings/profile/all">
          <span class="icon">
            <font-awesome-icon size="2x" :icon="['fas', 'user']" />
          </span>
          {{ $t('misc.personal_informartion') }}
        </router-link>
      </div>
      <div class="w-full border md:w-1/2 lg:w-1/3">
        <button @click="newAthletes">
          <span v-if="athletesMemberships" class="notifications">
            {{ `${athletesMemberships.status}` }}
          </span>
          <span v-else class="notification">0</span>
          <span class="icon">
            <font-awesome-icon size="2x" :icon="['fas', 'file-contract']" />
          </span>
          {{ $t('misc.athletes_membership') }}
        </button>
      </div>
      <div class="w-full border md:w-1/2 lg:w-1/3">
        <button @click="newInstructor">
          <span v-if="instructorLicense" class="notifications">
            {{ `${instructorLicense.status}` }}
          </span>
          <span v-else class="notification">0</span>
          <span class="icon">
            <font-awesome-icon size="2x" :icon="['fas', 'file-contract']" />
          </span>
          {{ $t('misc.instructor_license') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      athletesMemberships: null,
      instructorLicense: null,
    }
  },
  mounted() {
    this.getApplication()
  },
  methods: {
    getApplication() {
      this.axios.get('/users-applications/').then((data) => {
        let requests = data.data.requests

        if (requests.length) {
          let athletesMemberships = requests.filter((el) => {
            return el.purpose == 'New Athletes Memberships'
          })
          let instructorLicense = requests.filter((el) => {
            return el.purpose == 'New Instructor License'
          })
          this.athletesMemberships = athletesMemberships[0]
          this.instructorLicense = instructorLicense[0]
        }
      })
    },
    newAthletes() {
      this.$emit('newAthletes')
    },
    newInstructor() {
      this.$emit('newInstructor')
    },
  },
}
</script>

<style scoped lang="scss">
.dashboard {
  .content {
    > div {
      padding: 40px 0;
      text-align: center;
      position: relative;
      a,
      button {
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
        span.notification {
          position: absolute;
          background-color: red;
          color: #fff;
          width: 20px;
          height: 20px;
          font-size: 12px;
          font-weight: bold;
          line-height: 20px;
          border-radius: 50%;
        }
        span.notifications {
          position: absolute;
          background-color: red;
          color: #fff;
          padding: 2px 5px;
          width: fit-content;
          top: 0;
          left: 0;
          font-size: 12px;
          font-weight: bold;
          line-height: 20px;
          border-bottom-right-radius: 10px;
        }
        &:hover {
          span.icon {
            @apply bg-secondary;
          }
        }
      }
    }
  }
}

.is-rtl {
  .dashboard {
    .content {
      > div {
        button {
          span.notifications {
            top: 0;
            right: 0;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 10px;
          }
        }
      }
    }
  }
}
</style>
