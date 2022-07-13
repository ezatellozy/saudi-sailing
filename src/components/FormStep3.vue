<template>
  <div>
    <div class="table-container mb-11">
      <table ref="myTable">
        <thead>
          <tr>
            <th>المؤهل</th>
            <th>الجهة المصدرة</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="qualifcation in qualifcations" :key="qualifcation.id">
            <td>{{ qualifcation.title }}</td>
            <td>{{ qualifcation.issuing_organization }}</td>
            <td class="actions">
              <button class="trash">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
              <a
                class="eye block"
                target="_blank"
                :href="`/${qualifcation.qualification_copy}`"
              >
                <font-awesome-icon :icon="['fas', 'eye']" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <validation-observer
        class="flex flex-wrap"
        ref="qualificationForm"
        v-slot="{ invalid }"
      >
        <div class="form-input w-full">
          <validation-provider
            name="qualification"
            rules="required|min:3|max:80"
            v-slot="v"
          >
            <div class="group">
              <!-- <font-awesome-icon class="icon" icon="fa-solid fa-user" /> -->
              <input
                type="text"
                name="qualification"
                v-model="qualificationTitle"
                :placeholder="$t('inputs.qualification')"
              />
              <p class="text-red-500 text-sm text-center">
                {{ v.errors[0] }}
              </p>
            </div>
          </validation-provider>
        </div>
        <div class="form-input w-full">
          <validation-provider
            name="qualification orgnization"
            rules="required|min:3|max:80"
            v-slot="v"
          >
            <div class="group">
              <input
                type="text"
                name="qualification orgnization"
                v-model="qualificationOrg"
                :placeholder="$t('inputs.qualification_orgnization')"
              />
              <p class="text-red-500 text-sm text-center">
                {{ v.errors[0] }}
              </p>
            </div>
          </validation-provider>
        </div>
        <div class="form-input w-full">
          <validation-provider
            name="qualifcation"
            rules="required|min:3|max:80"
            v-slot="v"
          >
            <input
              class="w-full border border-primary rounded-lg p-2"
              id="file_portrait"
              type="file"
              @input="previewMainMedia($event)"
            />

            <p class="text-red-500 text-sm">
              {{ v.errors[0] }}
            </p>
          </validation-provider>
        </div>
        <div class="w-full flex justify-between">
          <button
            class="border rounded-xl px-4 py-2 font-bold text-lg bg-secondary text-white border-secondary"
            :class="{
              'cursor-default': invalid,
            }"
            @click="updateQualifications"
            :disabled="invalid"
          >
            {{ $t('buttons.upload') }}
          </button>
          <button
            class="border rounded-xl px-4 py-2 font-bold text-lg bg-primary text-white border-secondary"
            @click="submit"
          >
            <!-- :disabled="invalid" -->
            {{ $t('buttons.submitApp') }}
          </button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      dialog: false,
      preview: null,
      qualifcation: null,
      qualificationTitle: '',
      qualificationOrg: '',
      qualifcations: [],
    }
  },
  mounted() {
    this.fetchQualification()
  },
  methods: {
    updateQualifications() {
      this.loading = true
      let requestFormData = new FormData()
      requestFormData.append('qualification_file', this.qualifcation)
      requestFormData.append('title', this.qualificationTitle)
      requestFormData.append('issuing_organization', this.qualificationOrg)
      this.axios
        .post(
          `users-applications/register-applicant-qualification/${this.id}`,
          requestFormData,
        )
        .then((data) => {
          this.loading = false

          this.resetForm()
          this.$toasted.show(data.data.message)
          this.$nextTick(() => {
            this.fetchQualification()
          })
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })

      return true
    },
    previewMainMedia(event) {
      this.qualifcation = event.target.files[0]
      this.preview = URL.createObjectURL(this.qualifcation)
    },
    fetchQualification() {
      this.axios
        .get(`users-applications/list-applicant-qualifications/${this.id}`)
        .then((data) => {
          this.qualifcations = data.data.qualifications
        })
    },
    closeDialog() {
      this.dialog = !this.dialog
    },
    submit() {
      this.axios
        .post(`users-applications/submit-request/${this.id}`)
        .then((data) => {
          this.$toasted.show(data.data.status)
        })
    },
    resetForm() {
      this.preview = null
      this.qualifcation = null
      this.qualificationTitle = ''
      this.qualificationOrg = ''
    },
  },
}
</script>

<style scoped lang="scss">
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
// .dialog {
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   left: 50%;
//   top: 50%;
//   z-index: 10;
//   transform: translate(-50%, -50%);
//   z-index: 10;
//   background-color: rgba(0, 0, 0, 0.808);
//   .img-holder {
//     max-width: 400px;
//     max-height: 600px;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     img {
//       width: 100%;
//       height: auto;
//     }
//   }
// }
</style>
