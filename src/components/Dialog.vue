<template>
  <div class="dialog" @click="closeDialog()">
    <div class="img-holder">
      <img
        :src="`https://sailsaudi.com/`"
        alt="الاتحاد السعودي للملاحة الشراعية"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  mounted() {
    console.log(this.item)
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog')
    },
  },
}
</script>

<style scoped lang="scss">
.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.808);
  .img-holder {
    max-width: 400px;
    max-height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
