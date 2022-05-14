<template>
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
          {{ $t("buttons.upload") }}
        </button>
        <button
          class="border rounded-xl px-4 py-2 font-bold text-lg bg-primary text-white border-secondary"
          :class="{
            'cursor-default': invalid,
          }"
          @click="submit"
        >
          <!-- :disabled="invalid" -->
          إكمال الطلب
        </button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
export default {
  props: ["id"],
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
      requestFormData.append("qualification_file", this.qualifcation);
      requestFormData.append("title", this.qualificationTitle);
      requestFormData.append("issuing_organization", this.qualificationOrg);
      this.axios
        .post(
          `users-applications/register-applicant-qualification/${this.id}`,
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
      this.qualifcation = event.target.files[0];
      this.preview = URL.createObjectURL(this.qualifcation);
    },
    submit() {
      this.axios
        .post(`users-applications/submit-request/${this.id}`)
        .then((data) => {
          console.log(data);
        });
    },
  },
};
</script>

<style></style>
