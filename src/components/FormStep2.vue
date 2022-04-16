<template>
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
          style="position: relative !important"
        >
          <div class="image-holder mx-auto mb-4" v-if="file_portrait">
            <img class="w-full h-full" :src="preview" alt="image" />
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
        {{ $t("buttons.upload") }}
      </button>
    </div>
  </validation-observer>
</template>

<script>
// import { BFormFile } from "bootstrap-vue";

export default {
  //   components: { BFormFile },
  props: ["application"],
  data() {
    return {
      preview: null,
      file_portrait: null,
    };
  },
  methods: {
    uploadPortrait() {
      this.loading = true;
      let requestFormData = new FormData();

      requestFormData.append("portrait_file", this.file_portrait);
      this.axios
        .post(
          `users-applications/confirm-applicant-portrait/${this.application.id}`,
          requestFormData
        )
        .then((data) => {
          this.loading = false;
          this.$toasted.show(data.data.message);
          if (data.data.status == "Success") {
            this.$emit("goStep", 2);
          }
          // this.$refs.profilePortrait.reset();
          // this.$emit("goStep", 2);
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });

      return true;
    },
    previewMainMedia(event) {
      console.log(event);
      this.file_portrait = event.target.files[0];
      this.preview = URL.createObjectURL(this.file_portrait);
    },
  },
};
</script>

<style>
.image-holder {
  width: 200px;
  height: 150px;
}
input[type="file"] {
  position: relative !important;
  opacity: 1 !important;
}
</style>
