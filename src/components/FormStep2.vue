<template>
  <validation-observer ref="profilePortrait" v-slot="{ invalid }">
    <div class="form-input">
      <validation-provider
        name="file_portrait"
        rules="required|min:3|max:80"
        v-slot="v"
        class="cursor-pointer"
      >
        <div class="image-holder mx-auto mb-4" v-if="preview">
          <img
            class="w-full h-full"
            :src="`/${preview}`"
            alt="الاتحاد السعودي للملاحة الشراعية"
          />
        </div>
        <div class="image-holder mx-auto mb-4" v-else>
          <img
            class="w-full h-full"
            src="@/assets/image-placeholder-icon-5.jpg"
            alt="الاتحاد السعودي للملاحة الشراعية"
          />
        </div>
        <label
          class="cursor-pointer"
          for="file_portrait"
          name="file_portrait"
          style="position: relative !important;"
        ></label>
        <input
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
        {{ $t('buttons.next') }}
      </button>
    </div>
  </validation-observer>
</template>

<script>
// import { BFormFile } from "bootstrap-vue";

export default {
  //   components: { BFormFile },
  props: ['id'],
  data() {
    return {
      preview: null,
      file_portrait: null,
    }
  },
  mounted() {
    this.getPortrait()
  },
  methods: {
    uploadPortrait() {
      this.loading = true
      let requestFormData = new FormData()
      requestFormData.append('portrait_file', this.file_portrait)
      this.axios
        .post(
          `users-applications/confirm-applicant-portrait/${this.id}`,
          requestFormData,
        )
        .then((data) => {
          this.loading = false
          this.$toasted.show(data.data.message)
          if (data.data.status == 'Success') {
            this.$router.push(
              `/settings/athletes-membership/${this.id}/new/step3`,
            )
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })

      return true
    },
    previewMainMedia(event) {
      this.file_portrait = event.target.files[0]
      this.preview = URL.createObjectURL(this.file_portrait)
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

<style scoped lang="scss">
.image-holder {
  width: 200px;
  height: 150px;
  img {
    object-fit: cover;
    object-position: center center;
  }
}
input[type='file'] {
  position: relative !important;
  opacity: 1 !important;
}
</style>
