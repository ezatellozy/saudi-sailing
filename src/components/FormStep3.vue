<template>
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

    <div class="w-full">
      <button
        class="border rounded-xl px-4 py-2 font-bold text-lg bg-secondary text-white border-secondary"
        :class="{
          'cursor-default': invalid,
        }"
        @click="updateQualifications"
        :disabled="invalid"
      >
        {{ $t("buttons.upload") }}
      </button>
    </div>
  </validation-observer>
</template>

<script>
export default {
  props: ["application"],
  data() {
    return {
      preview: null,
      qualifcation: null,
      qualificationTitle: "",
      qualificationOrg: "",
    };
  },
  methods: {
    updateQualifications() {
      this.loading = true;
      let requestFormData = new FormData();

      requestFormData.append("portrait_file", this.file_portrait);
      requestFormData.append("title", this.qualificationTitle);
      requestFormData.append("issuing_organization", this.qualificationOrg);
      this.axios
        .post(
          `users-applications/register-applicant-qualification/${this.application.id}`,
          requestFormData
        )
        .then((data) => {
          this.loading = false;
          this.$refs.qualificationForm.reset();
          this.$toasted.show(data.data.message);
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });

      return true;
    },
    previewMainMedia(event) {
      console.log(event);
      this.qualifcation = event.target.files[0];
      this.preview = URL.createObjectURL(this.qualifcation);
    },
  },
};
</script>

<style></style>
