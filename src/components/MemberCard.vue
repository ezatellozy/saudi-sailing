<template>
  <div class="p-1 pt-10 overflow-visible" v-if="member">
    <div class="card flex relative rounded border border-primary">
      <img
        v-if="member.src"
        src="../assets/member.png"
        class="card-img"
        alt="الاتحاد السعودي للملاحة الشراعية"
      />
      <div class="card-body p-5 flex flex-col justify-between">
        <h4
          class="card-title text-primary mt-5 text-left font-bold text-md lg:text-lg"
        >
          {{ member.name }}
        </h4>
        <p class="card-text text-secondary text-left font-bold">
          {{ member.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['member'],
}
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0px 3px 6px #00000029;
  min-height: 140px;
  .card-img {
    position: absolute;
    width: 70px;
    height: 70px;
    top: -35px;
    left: 20%;
    transform: translateX(-20%);
  }
}
</style>
