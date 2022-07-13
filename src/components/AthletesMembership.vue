<template>
  <section>
    <div class="relative container mx-auto">
      <loading v-if="loading" />
      <order-summary
        v-if="summary"
        :id="this.$route.params.id"
        :rout="`/settings/athletes-membership/${this.$route.params.id}`"
      />
      <div
        class="mt-5 register mx-auto d-flex justify-content-center"
        v-if="orderNew"
      >
        <div class="flex w-full steps justify-between">
          <div
            class="step"
            @click="change('step1')"
            :class="step1 ? 'active' : ''"
          >
            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
          </div>
          <div
            class="step"
            @click="change('step2')"
            :class="step2 ? 'active' : ''"
          >
            <font-awesome-icon :icon="['fas', 'camera']"></font-awesome-icon>
          </div>
          <div
            class="step"
            @click="change('step3')"
            :class="step3 ? 'active' : ''"
          >
            <font-awesome-icon :icon="['fas', 'file-pdf']"></font-awesome-icon>
          </div>
        </div>
        <div class="w-full">
          <!-- <b-form @submit="onSubmit"> -->
          <transition name="fade-in">
            <form-step-1
              v-if="step1"
              :id="$route.params.id"
              @goStep="changeStep($event)"
            />
          </transition>
          <transition name="fade-in">
            <form-step-2
              v-if="step2"
              :id="$route.params.id"
              @goStep="changeStep($event)"
            />
          </transition>

          <transition name="fade-in">
            <form-step-3 v-if="step3" :id="$route.params.id" />
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import FormStep1 from './FormStep1.vue'
import FormStep2 from './FormStep2.vue'
import FormStep3 from './FormStep3.vue'
import Loading from '../components/Loading.vue'
import OrderSummary from '../components/OrderSummary.vue'
export default {
  components: { Loading, FormStep1, FormStep2, FormStep3, OrderSummary },
  name: 'Profile',

  data() {
    return {
      loading: false,
      summary: false,
      orderNew: false,
      step1: true,
      step2: false,
      step3: false,
      applicationStatus: {
        id: null,
        stage: null,
        progress: {
          portraitConfirmation: '',
          profileConfirmation: '',
          qualificationConfirmation: '',
        },
      },
      file_portrait: null,
    }
  },
  mounted() {
    this.changeStep(this.$route.params.step)
    this.checkStatus()
  },
  methods: {
    change(step) {
      this.$router.push(
        `/settings/athletes-membership/${this.$route.params.id}/new/${step}`,
      )
    },
    changeStep(e) {
      if (e == 'step1') {
        this.step1 = true
        this.step2 = false
        this.step3 = false
      } else if (e == 'step2') {
        this.step1 = false
        this.step2 = true
        this.step3 = false
      } else if (e == 'step3') {
        this.step1 = false
        this.step2 = false
        this.step3 = true
      }
    },
    checkStatus() {
      if (this.$route.params.status == 'new') {
        this.orderNew = true
        this.summary = false
      } else if (this.$route.params.status == 'summary') {
        this.summary = true
        this.orderNew = false
      }
    },
    previewMainMedia(event) {
      if (event.target.files.length !== 0) {
        this.file_portrait = event.target.files[0]
        this.preview = URL.createObjectURL(this.file_portrait)
      }
      console.log(this.preview)
    },
  },
  watch: {
    $route() {
      this.changeStep(this.$route.params.step)
      this.checkStatus()
    },
  },
}
</script>
<style lang="scss">
.image-holder {
  width: 200px;
  height: 150px;
}
.form-input {
  margin-bottom: 10px;
  .group {
    .vs__selected {
      position: absolute;
      top: 10px;
      left: 30px;
      right: unset;
    }
    position: relative;
    .vs__dropdown-toggle {
      position: relative;
      cursor: pointer;
      border: none;
    }
    .vs__search {
      color: gray !important;
    }
    input {
      margin-bottom: 5px;
      border-radius: 10px;
      padding: 10px 20px 10px 35px;
      @apply border border-primary;
      width: 100%;
    }
    .icon {
      position: absolute;
      top: 15px;
      left: 10px;
      color: #416f09;
      font-size: 20px;
    }
  }
  .custom-file {
    @apply border border-primary rounded-lg py-2 px-4;

    font-size: 12px;
    .custom-file-label {
      display: none;
    }
  }
}

.is-rtl {
  .group {
    .vs__dropdown-toggle {
      flex-direction: row-reverse;
    }
    .vs__selected {
      left: unset;
      right: 30px;
    }
    input {
      padding: 10px 35px 10px 20px;
    }
    .icon {
      right: 10px;
    }
  }
}
.steps-form .steps-row .first .btn-circle:hover,
.steps-form .steps-row .third .btn-circle:hover {
  background-color: white !important;
  color: #303f9f !important;
}
.register-third .second a,
.register-third .third a {
  cursor: not-allowed;
}
.register-third .steps-form .steps-row .third .btn-circle {
  background-color: #303f9f !important;
  color: white !important;
}
.steps-form .steps-row .second .btn-circle:hover,
.steps-form .steps-row .first .btn-circle:hover {
  background-color: white !important;
  color: #303f9f !important;
}
.register {
  max-width: 800px;
}
.steps {
  position: relative;
  margin-bottom: 30px;
  &::before {
    content: '';
    top: 50%;
    transform: translateY(-50%);
    bottom: 0;
    position: absolute;
    width: calc(100% - 24px);
    height: 2px;
    background-color: #7283a7;
  }
  .step {
    height: 218px;
    position: relative;
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    border: 1px solid #59698d;
    svg {
      font-size: 35px;
      transition: all 0s ease-in-out;
      color: #7283a7;
    }
    &.active {
      background-color: #303f9f !important;
      svg {
        color: #fff !important;
      }
    }
    .no-height {
      height: 50px;
    }
    p {
      margin-top: 0.5rem;
    }
  }
}
.register .success .icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 40px auto;
  background-color: #303f9f;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register .success .icon svg {
  font-size: 30px;
  color: white;
}
[type='file'] {
  filter: alpha(opacity=0);
  opacity: 0;
  position: absolute;
}
[type='file'] + label {
  left: 0;
  top: 0.5em;
  color: #303f9f;
  cursor: pointer;
  position: relative;
  border-radius: 3px;
  padding: 10px;
  width: 100%;
  font-size: 17px;
  transition: all 0.4s ease-in-out;
}
[type='file'] + label:before {
  content: '\f093';
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  color: #303f9f;
  margin-left: 5px;
  margin-right: 5px;
  transition: all 0.4s ease-in-out;
}
</style>
