<template>
  <section class="about">
    <div class="our-history pb-10 flex justify-between flex-wrap items-center">
      <div class="image basis-1/2 order-1">
        <img
          class="w-full"
          src="/images/2.webp"
          alt="الاتحاد السعودي للملاحة الشراعية"
        />
      </div>
      <div
        class="info basis-1/2 flex justify-center px-4 flex-col"
        :class="this.$i18n.locale === 'en' ? 'text-left' : 'text-right'"
      >
        <h3 class="font-bold text-2xl text-primary pb-5 m-0">
          {{ $t('misc.sailing') }}
        </h3>
        <p class="leading-6 mt-2 text-primary text-sm font-bold">
          {{ $t('misc.sailingdesc') }}
        </p>
      </div>
    </div>
    <div class="benfits">
      <div
        class="container mx-auto"
        :class="this.$i18n.locale === 'en' ? 'text-left' : 'text-right'"
      >
        <h2 class="text-center header">
          {{ $t('misc.sailing') }}

          <span>
            {{ $t('misc.sailingTitle') }}
          </span>
        </h2>
        <div class="sports">
          <div class="sport flex justify-between flex-wrap">
            <div class="image w-full md:w-1/2">
              <img src="/images/sailingsport1.png" alt="sailling" />
            </div>
            <div class="description w-full md:w-1/2">
              <h2 class="text-lg">{{ $t('misc.sailingSports') }}</h2>
              <p class="text-md mt-2">
                {{ $t('misc.sailingSportsDesc') }}
              </p>
            </div>
          </div>
          <div class="sport flex justify-between flex-wrap">
            <div class="image w-full md:w-1/2">
              <img src="/images/sailingsport2.png" alt="sailling" />
            </div>
            <div class="description w-full md:w-1/2">
              <h2 class="text-lg">
                {{ $t('misc.Sailing as a sport') }}
              </h2>
              <p class="text-md mt-2">
                {{ $t('misc.Sailing as a sport desc') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="benifit">
      <h2 class="text-center text-2xl text-primary font-bold">
        {{ $t('misc.sailingBenifits') }}
      </h2>
      <div
        class="container mx-auto"
        :class="this.$i18n.locale === 'en' ? 'text-left' : 'text-right'"
      >
        <div class="ben">
          <h5>
            {{ $t('misc.Mental wellbeing') }}
          </h5>
          <p>
            {{ $t('misc.Mental wellbeing desc') }}
          </p>
        </div>
        <div class="ben">
          <h5>
            {{ $t('misc.Environmental Aspects of Sailing') }}
          </h5>
          <p>
            {{ $t('misc.Environmental Aspects of Sailing desc') }}
          </p>
        </div>
        <div class="ben">
          <h5>
            {{ $t('misc.Sailing for Educational Purposes') }}
          </h5>
          <p>
            {{ $t('misc.Sailing for Educational Purposes desc') }}
          </p>
        </div>
      </div>
    </div>
    <div class="types">
      <h3 class="font-bold text-2xl text-primary pb-5 m-0">
        {{ $t('misc.Sports included under windsurfing') }}
      </h3>
      <div
        class="container mx-auto flex justify-between flex-wrap"
        :class="this.$i18n.locale === 'en' ? 'text-left' : 'text-right'"
      >
        <div class="sport mb-4 lg:mb-0">
          <h5 class="text-lg">
            {{ $t('misc.Sailing by sailing boat') }}
          </h5>
          <p>
            {{ $t('misc.Sailing by sailing boat desc') }}
          </p>
        </div>
        <div class="sport mb-4 lg:mb-0">
          <h5 class="text-lg">
            {{ $t('misc.Board Sailing') }}
          </h5>
          <p>
            {{ $t('misc.Board Sailing Sports desc') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
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

.benifit {
  padding: 50px 0;
  .container {
    margin-top: 30px;
  }
  h2 {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      height: 3px;
      width: 150px;
      background-color: #ffa408;
    }
  }
  .ben {
    padding: 0 20px;
    &:not(:last-child) {
      margin-bottom: 15px;
    }
    h5 {
      @apply text-primary font-bold;
      font-size: 1.25rem;
    }
    p {
      line-height: 1.7;
      padding-top: 15px;
    }
  }
}
.types {
  padding: 50px 0;
  background-color: #ebf2fb;
  .container {
    @media (min-width: 992px) {
      gap: 10px;
    }
  }
  h3 {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
    &::before {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: translateX(-50%);
      height: 2px;
      width: 150px;
      background-color: #ffa408;
    }
  }
  .sport {
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    @media (min-width: 992px) {
      width: calc(50% - 5px);
    }
    transition: 0.3s all;
    &:hover {
      transform: translateY(-10px);
    }
    h5 {
      @apply text-primary font-bold;

      margin-bottom: 10px;
    }
    p {
      line-height: 1.5;
      padding: 5px;
    }
  }
}
</style>
