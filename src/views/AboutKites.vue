<template>
  <section class="about">
    <!-- {{ galleries }} -->
    <div class="our-history pb-10 flex justify-between flex-wrap items-center">
      <div class="image basis-1/2 order-1">
        <img
          class="w-full"
          src="@/assets/1.webp"
          alt="الاتحاد السعودي للملاحة الشراعية"
        />
      </div>
      <div
        class="info basis-1/2 flex justify-center px-4 flex-col"
        :class="this.$i18n.locale === 'en' ? 'text-left' : 'text-right'"
      >
        <h3 class="font-bold text-2xl text-primary pb-5 m-0">
          {{ $t('misc.windsurfing') }}
        </h3>
        <p class="leading-6 mt-2 text-primary text-sm font-bold">
          {{ $t('misc.windsurfingdesc') }}
        </p>
      </div>
    </div>
    <div class="benfits">
      <div
        class="container mx-auto"
        :class="this.$i18n.locale === 'en' ? 'text-left' : 'text-right'"
      >
        <h2 class="text-center header">
          رياضات التزلج الشراعي
          <span></span>
        </h2>
        <div class="sports">
          <div class="sport flex justify-between flex-wrap">
            <div class="image w-full md:w-1/2">
              <img src="/images/kiteboardingsport1.png" alt="sailling" />
            </div>
            <div class="description w-full md:w-1/2">
              <h2 class="text-lg">
                رياضة الكايت بورد أو الكايت سيرف (رياضة ركوب الأمواج الشراعية)
              </h2>
              <p class="text-md mt-2">
                هي رياضة فردية تعتمد على العوامل الطبيعية من الرياح وسطح الماء،
                وهي عبارة عن تزلج على سطح الماء بإستخدام الألواح المخصصة
                والاعتماد على الرياح للسحب بواسطة شراع مخصص مؤمن و متصل بالراكب
              </p>
            </div>
          </div>
          <div class="sport flex justify-between flex-wrap">
            <div class="image w-full md:w-1/2">
              <img src="/images/kiteboardingsport2.png" alt="sailling" />
            </div>
            <div class="description w-full md:w-1/2">
              <h2 class="text-lg">
                رياضة الوند سرف
              </h2>
              <p class="text-md mt-2">
                هي احدى رياضات التزلج الشراعي وهي رياضة فردية عبارة عن مزيج من
                ركوب الأمواج والإبحار الشراعي باستخدام شراع حوالي 2.5 متر متصل
                بلوح ركوب الأمواج من 2 إلى 3 متر. عندما يلتقط الشراع الرياح تدفع
                اللوح على سطح الماء
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
.our-history {
  .image {
    img {
      transform: scale(-1, 1);
    }
  }
}
.benfits {
  background-color: #ebf2fb;
  padding: 50px 0;
  h2.header {
    @apply text-primary text-2xl font-bold;
    span {
      display: block;
      @apply text-primary text-lg font-medium;
      margin-top: 20px;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        height: 2px;
        width: 80px;
        background-color: #ffa408;
      }
    }
  }
  .sports {
    margin-top: 20px;

    .sport {
      padding: 20px;
      &:nth-child(odd) {
        flex-direction: row-reverse;
      }
      &:not(:first-child) {
        margin-top: 50px;
      }
      .image {
        padding: 20px;
        img {
          margin: 0 auto;
        }
      }
      .description {
        padding: 20px;
        align-self: center;
      }
      h2 {
        @apply text-primary font-bold;
        margin-bottom: 20px;
      }
      p {
        @apply text-primary;
      }
    }
  }
}
</style>
