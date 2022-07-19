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
          الإبحار الشراعي
          <span>
            القدرة على التحكم بالقارب أو الواسطة البحرية و توجيهها باستخدام
            الشراع و الرياح
          </span>
        </h2>
        <div class="sports">
          <div class="sport flex justify-between flex-wrap">
            <div class="image w-full md:w-1/2">
              <img src="/images/sailingsport1.png" alt="sailling" />
            </div>
            <div class="description w-full md:w-1/2">
              <h2 class="text-lg">رياضات الإبحارالشراعي</h2>
              <p class="text-md mt-2">
                هي رياضات أولمبية تتصف بفن التحكم بالقارب أو الواسطة البحرية
                باستخدام الشراع و توجيه مساره على سطح الماء وكذلك ضبط سرعتهما
                وموازنتهما في مواجهة الرياح والأمواج. ذلك يتطلب خبرات وفهم عميق
                لتقلبات البحر ورياحه وتياراته، وكذلك قدرات بدنية من تحمل للقوة
                ومرونة. و منها رياضة القوارب الشراعية معروفة أيضاً بالشراع فقط،
                و رياضات التزلج الشراعي و يندرج تحتها الكايت بورد و الوند سيرف.
              </p>
            </div>
          </div>
          <div class="sport flex justify-between flex-wrap">
            <div class="image w-full md:w-1/2">
              <img src="/images/sailingsport2.png" alt="sailling" />
            </div>
            <div class="description w-full md:w-1/2">
              <h2 class="text-lg">
                الإبحار الشراعي (من منظور رياضي) / الإبحار الشراعي كرياضة
              </h2>
              <p class="text-md mt-2">
                كانت تصنف رياضة الإبحار الشراعي (المعروفة سابقاًبالإبحار باليخت
                حتى عام 2000) ضمن إحدى الرياضات الأولمبية منذ دورة الألعاب
                الأولمبية الأولى، التي أقيمت في أثينا، اليونان، في عام 1896. على
                الرغم من كونها مقررة في البرنامج الأولمبي الأول، فقد تم إلغاء
                السباقات في صيف 1904 بسبب سوء الأحوال الجوية. ولكن من بعد ذلك
                العام، كان الإبحار حاضراً في كل طبعة من الألعاب الأولمبية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="benifit">
      <h2 class="text-center text-2xl text-primary font-bold">
        منافع الإبحار والرياضات الشراعية
      </h2>
      <div
        class="container mx-auto"
        :class="this.$i18n.locale === 'en' ? 'text-left' : 'text-right'"
      >
        <div class="ben">
          <h5>الصحة العقلية</h5>
          <p>
            يرتبط الإبحار الشراعي بشكل مباشر مع العوامل البيئية الطبيعية،حيث
            يعتمد في ممارسته على الرياح و الماء فقط. و هذا الاحتكاك يولد تأثير
            إيجابي ومعنوي على الصحة البدنية والعقلية حيث تسهم في تقوية البدن و
            تصفية الذهن فانه يضع الممارس في اصفى انواع الطبيعة في وسط البحر من
            غير عوامل تلوث سمعية وبصرية. الإبحار الشراعي يفتح المجال للممارس أن
            يكون متصل بحواسه مما يأدي إلى تصفية الذهن و الارتياح التام.
          </p>
        </div>
        <div class="ben">
          <h5>التأثيرات البيئية للإبحار الشراعي</h5>
          <p>
            الابحار الشراعي رياضة صديقة للبيئة. فهي تعتمد كلياً في ممارستها على
            العوامل الطبيعية فقط. حيث يستغل الإبحار الشراعي طاقة الرياح للدفع
            فوق سطح الماء باستخدام شراع قماشي بدلا من محرك ميكانيكي، بالتالي هذا
            النوع من المركبات لايطلق أي ملوثات مثل البنزين أو الغازات الضارة في
            الماء أو الهواء ولا تترك أثراً ضاراً على البيئة البحرية أو بما يتعلق
            بالكائنات البحرية في الماء.
          </p>
        </div>
        <div class="ben">
          <h5>الإبحار لأغراض تعليمية</h5>
          <p>
            يمكن للفرد أن يبدأ التدريب على الإبحار الشراعي بعمر 8 سنوات، وكلما
            كان أصغر سنًا، أصبحت ممارسة الرياضة هواية مفيدة في حياته. يلعب
            الإبحار دوراً كبيراً في تعزيز مهارات الطفل ، بحيث يساعده في مهاراته
            البدنية في التحكم في سير و سرعة القارب، بالإضافة إلى ما تتطلبه
            الرياضة من العمل الجماعي و تحمل المسؤولية. يساعد الإبحار الأطفال في
            الحصول على خبرة في تعلم الديناميكا الهوائية والديناميكا المائية
            ومهارة إستغلالهما معاً. و زيادة على ذلك فإن قوارب الشراع و معدات
            التزلج الشراعي معدات يدوية سهلة التركيب والتفكيك. حيث ذلك،تعلم الطفل
            كيفية صنع القوارب و كيفية تكريبها بشكل محكم فان هذا العمل ينمي مهارة
            التدقيق والصبر فان لم يجيدها سقط.
          </p>
        </div>
      </div>
    </div>
    <div class="types">
      <h3 class="font-bold text-2xl text-primary pb-5 m-0">
        الرياضات المدرجة تحت الإبحار الشراعي
      </h3>
      <div
        class="container mx-auto flex justify-between flex-wrap"
        :class="this.$i18n.locale === 'en' ? 'text-left' : 'text-right'"
      >
        <div class="sport mb-4 lg:mb-0">
          <h5 class="text-lg">
            رياضة الإبحار الشراعي – بواسطة القارب الشراعي
          </h5>
          <p>
            واسطة بحرية تندفع بالرياح كلياً عن طريق الأشرعة أو بمساندة محرك.
            تُصّنف القوارب الشراعية حسب أحجامها ووضع أشرعتها وترتيب صواريها و
            نوع عارضتها مثل زورق الدنجي و الفلوكة و قوارب الكِيل و اليخت...الخ.
            كما تختلف في الهدف منها مثل القوارب الشراعية للسباقات أو للتنزه
            والترفيه.
          </p>
        </div>
        <div class="sport">
          <h5 class="text-lg">
            التزلج الشراعي
          </h5>
          <p>
            تعتبر من الأنشطة و الرياضات التي تندرج تحت الإبحار الشراعي وهي رياضة
            الركوب على لوح تزلج شراعي صغير أو لوح ركوب أمواج أو لوح فويل، يتم
            دفعه أو سحبه على سطح الماء بواسطة شراع. يتم تصنيفها إلى رياضة الوند
            سرف و رياضة الكايت بورد أو الكايت سيرف (رياضة ركوب الأمواج أو
            الركمجة الشراعية) وكلاهما يعد من الرياضات الأولمبية
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
