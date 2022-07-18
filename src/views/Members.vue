<template>
  <section class="pt-10 pb-10" v-if="members.length">
    <h3 class="text-center text-primary mb-4 text-3xl font-bold">
      {{ $t('misc.members') }}
    </h3>
    <div>
      <vue-slick-carousel v-bind="settings">
        <div v-for="member in members" :key="member.id">
          <member-card :member="member" />
        </div>
      </vue-slick-carousel>
    </div>
  </section>
</template>
<script>
import MemberCard from '../components/MemberCard.vue'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import Members from '@/members.json'
export default {
  components: {
    MemberCard,
    VueSlickCarousel,
  },
  data() {
    return {
      members: [],
      settings: {
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 4,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      },
    }
  },
  mounted() {
    this.getMembers()
  },
  methods: {
    getMembers() {
      console.log(Members)
      this.$i18n.locale == 'ar'
        ? (this.members = Members[0].membersAr)
        : (this.members = Members[0].membersEn)
    },
  },
}
</script>
<style lang="scss" scoped>
.cards {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
</style>
