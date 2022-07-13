<template>
  <div class="settings">
    <div class="title">
      <img src="../assets/header-bg1.svg" alt="" />
      <h2 class="">{{ $t('misc.settings') }}</h2>
    </div>
    <div class="setting border mt-3">
      <div class="container flex justify-between flex-wrap mx-auto">
        <div class="side-menu w-full md:w-1/4 px-2">
          <h3 class="title">
            {{ $t('misc.myAccount') }}
          </h3>
          <ul>
            <li>
              <router-link class="link" :to="{ name: 'dashboard' }">
                {{ $t('misc.dashboard') }}
              </router-link>
            </li>
            <li>
              <router-link to="/settings/profile/all" class="link">
                {{ $t('misc.personal_informartion') }}
              </router-link>
            </li>
            <li>
              <button class="link" @click="newAthletesMembershipsApplication">
                {{ $t('misc.athletes_membership') }}
              </button>
            </li>
            <li>
              <button class="link" @click="newInstructorLicenseApplication">
                {{ $t('misc.instructor_license') }}
              </button>
            </li>
          </ul>
        </div>
        <div class="content w-full md:w-3/4 p-3">
          <transition name="fade-in">
            <router-view
              @newAthletes="newAthletesMembershipsApplication"
              @newInstructor="newInstructorLicenseApplication"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      athletes: false,
      instructor: false,
      profile: false,
      dashboard: true,
      athletesMemberships: null,
      instructorLicense: null,
    }
  },
  mounted() {
    this.getApplication()
  },
  methods: {
    newAthletesMembershipsApplication() {
      if (this.athletesMemberships) {
        if (
          this.athletesMemberships.status == 'Modified' ||
          this.athletesMemberships.status == 'Submitted'
        ) {
          this.$router.push(
            this.$route.fullPath.replace(
              `${this.$route.path}`,
              `/settings/athletes-membership/${this.athletesMemberships.id}/summary/summary`,
            ),
          )
        } else {
          this.$router.push(
            this.$route.fullPath.replace(
              `${this.$route.path}`,
              `/settings/athletes-membership/${this.athletesMemberships.id}/new/step1`,
            ),
          )
        }
      } else {
        this.axios
          .get('/users-applications/new-application/athletes-membership')
          .then((data) => {
            let request = data.data.request
            this.athletesMemberships = request
            this.$router.push(
              this.$route.fullPath.replace(
                `${this.$route.path}`,
                `/settings/athletes-membership/${this.athletesMemberships.id}/new/step1`,
              ),
            )
          })
      }
    },
    newInstructorLicenseApplication() {
      if (this.instructorLicense) {
        if (
          this.instructorLicense.status == 'Modified' ||
          this.instructorLicense.status == 'Submitted'
        ) {
          this.$router.push(
            this.$route.fullPath.replace(
              `${this.$route.path}`,
              `/settings/instructor-license/${this.instructorLicense.id}/summary/summary`,
            ),
          )
        } else {
          this.$router.push(
            this.$route.fullPath.replace(
              `${this.$route.path}`,
              `/settings/instructor-license/${this.instructorLicense.id}/new/step1`,
            ),
          )
        }
      } else {
        this.axios
          .get('/users-applications/new-application/instructor-license')
          .then((data) => {
            let request = data.data.request
            this.instructorLicense = request
            this.$router.push(
              this.$route.fullPath.replace(
                `${this.$route.path}`,
                `/settings/instructor-license/${this.instructorLicense.id}/new/step1`,
              ),
            )
          })
      }
    },
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
    openTabs(tab) {
      this.athletes = false
      this.instructor = false
      this.profile = false
      this.dashboard = false
      this[tab] = true
    },
  },
}
</script>

<style lang="scss">
.settings {
  .side-menu {
    padding: 10px 0;
    border-right: 1px solid #e5e7eb;
    border-left: unset;
    @media (max-width: 768px) {
      border-right: unset;
      border-bottom: 1px solid #e5e7eb;
      border-left: unset;
    }
    .link {
      padding: 10px;
      transition: 0.3s all;
      color: #777;
      display: inline-block;
      &:hover {
        @apply text-primary;
        transform: translateX(10px);
      }
    }
    // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);

    max-width: 250px;
  }
}
.is-rtl {
  .settings {
    .side-menu {
      border-left: 1px solid #e5e7eb;
      border-right: unset;
      @media (max-width: 768px) {
        border-left: unset;
        max-width: 100%;
      }
      .link {
        &:hover {
          transform: translateX(-10px);
        }
      }
    }
  }
}
</style>
