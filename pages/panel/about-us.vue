<template>
  <div class="mx-6 mt-10">
    <common-sub-header title="درباره ما" />
    <div>
      <p class="text-justify">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
        درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با
        نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
        خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید
        داشت که تمام و های اصلی و جوابگوی سوالات
      </p>
    </div>
    <user-cards-location />
    <div
      class="expand-width custom-rounded d-flex justify-space-between pa-3"
      style="background-color: white"
    >
      <span class="d-flex align-center">
        <p class="md-text">021 8765 23 55</p>
        <v-icon small>mdi-phone</v-icon>
      </span>
      <span class="d-flex align-center">
        <p class="md-text ml-1">gerami@info.com</p>
        <v-icon small>mdi-email</v-icon>
      </span>
    </div>
    <v-btn
      outlined
      color="var(--text-700)"
      block
      class="custom-rounded mt-12 mb-3"
      @click="$router.push('/panel')"
    >
      بستن
    </v-btn>
  </div>
</template>
<script>
  export default {
    layout: "users-panel",
  };
</script>

<style>
  .v-btn:not(.v-btn--round).v-size--small {
    min-width: 0;
  }
</style>
