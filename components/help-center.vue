<template>
  <div
    v-if="$store.state.userData.role === 'user' && showHelp"
    class="fixed !bg-[#424038CC] z-20 h-screen w-full max-w-[426px]"
  >
    <!-- step1 -->
    <div v-if="step === 1">
      <div
        class="d-flex align-center rounded-full bg-[#D9D9D9] w-fit p-0.5 pl-2 absolute top-7 right-4"
      >
        <v-avatar color="#908D85" size="32">
          <span class="d-flex align-center justify-center" style="width: 15px">
            <v-img
              :src="require('@/assets/img/Location-Icon.svg')"
              width="15px"
            ></v-img>
          </span>
        </v-avatar>
        <p class="text-100 mr-2 md-text">انتخاب شهر</p>
      </div>
      <div class="bg-white absolute top-20 right-4 rounded-lg w-[268px]">
        <div
          class="flex justify-between items-center px-4 py-3 border-b border-[#F2F2F2]"
        >
          <div class="text-[#454545]">انتخاب شهر</div>
          <div
            @click="dontShowAgain"
            class="text-[#D9D9D9] text-xs cursor-pointer"
          >
            رد کردن راهنمایی
          </div>
        </div>
        <div class="flex flex-col gap-4 p-4 pt-2">
          <div class="text-xs text-[#454545] text-start">
            با زدن بر روی انتخاب شهر، میتواند فروشنده های همان منطقه را بیابید
          </div>
          <div class="flex items-center justify-between text-[#908D85] text-sm">
            <div>
              <div class="flex items-center gap-2 opacity-[20%]">
                <v-icon color="#908D85"> mdi-chevron-right </v-icon>
                قبلی
              </div>
            </div>
            <div>
              <div
                class="cursor-pointer flex items-center gap-2 justify-end"
                @click="step++"
              >
                بعدی
                <v-icon color="#908D85"> mdi-chevron-left </v-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- step2 -->
    <div v-if="step === 2">
      <div class="d-flex bg-[#D9D9D9] p-2 absolute left-3 top-7 rounded-full">
        <v-badge color="red" dot overlap>
          <v-img :src="require('@/assets/img/Group_1.svg')"></v-img>
        </v-badge>
      </div>
      <div class="bg-white absolute top-20 left-3 rounded-lg w-[268px]">
        <div
          class="flex justify-between items-center px-4 py-3 border-b border-[#F2F2F2]"
        >
          <div class="text-[#454545]">چت و معامله</div>
          <div
            @click="dontShowAgain"
            class="text-[#D9D9D9] text-xs cursor-pointer"
          >
            رد کردن راهنمایی
          </div>
        </div>
        <div class="flex flex-col gap-4 p-4 pt-2">
          <div class="text-xs text-[#454545] text-start">
            از طریق این دکمه شما میتوانید با فروشنده ها گفتگو کرده و معامله
            انجام دهید
          </div>
          <div class="flex items-center justify-between text-sm">
            <div>
              <div
                class="cursor-pointer flex items-center gap-2 text-[#BFBDB6]"
                @click="step--"
              >
                <v-icon color="#BFBDB6"> mdi-chevron-right </v-icon>
                قبلی
              </div>
            </div>
            <div>
              <div
                class="cursor-pointer flex items-center gap-2 justify-end text-[#908D85]"
                @click="step++"
              >
                بعدی
                <v-icon color="#908D85"> mdi-chevron-left </v-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- step3 -->
    <div v-if="step === 3">
      <div
        class="bg-[#D9D9D9] p-2 absolute left-1/2 -translate-x-[49%] top-20 rounded-2xl overflow-hidden w-[86%]"
      >
        <landing-new-seller-card class="!mb-0" />
      </div>
      <div
        class="bg-white absolute top-52 left-1/2 -translate-x-[50%] rounded-lg w-[268px]"
      >
        <div
          class="flex justify-between items-center px-4 py-3 border-b border-[#F2F2F2]"
        >
          <div class="text-[#454545]">فروشنده ها</div>
          <div
            @click="dontShowAgain"
            class="text-[#D9D9D9] text-xs cursor-pointer"
          >
            رد کردن راهنمایی
          </div>
        </div>
        <div class="flex flex-col gap-4 p-4 pt-2">
          <div class="text-xs text-[#454545] text-start">
            این منو مختص به فروشنده ها میباشد. در باکس فروشنده شما میتوانید قیمت
            های پیشنهادی خرید و فروش را بیابید
          </div>
          <div class="flex items-center justify-between text-sm">
            <div>
              <div
                class="cursor-pointer flex items-center gap-2 text-[#BFBDB6]"
                @click="step--"
              >
                <v-icon color="#BFBDB6"> mdi-chevron-right </v-icon>
                قبلی
              </div>
            </div>
            <div>
              <div
                class="cursor-pointer flex items-center gap-2 justify-end text-[#908D85]"
                @click="step++"
              >
                بعدی
                <v-icon color="#908D85"> mdi-chevron-left </v-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- step4 -->
    <div v-if="step === 4">
      <div
        class="d-flex bg-[#D9D9D9] p-1 absolute left-2 top-56 rounded-[18px] w-[calc(100%-16px)]"
      >
        <landing-new-search-bar :withIcon="true" />
        <span
          class="w-full h-full absolute bg-red-50 opacity-0 -top-[2px] -right-[2px]"
        />
      </div>
      <div
        class="bg-white absolute top-72 left-1/2 -translate-x-[50%] rounded-lg w-[268px]"
      >
        <div
          class="flex justify-between items-center px-4 py-3 border-b border-[#F2F2F2]"
        >
          <div class="text-[#454545]">جستجوی پیشنهادات</div>
          <div
            @click="dontShowAgain"
            class="text-[#D9D9D9] text-xs cursor-pointer"
          >
            رد کردن راهنمایی
          </div>
        </div>
        <div class="flex flex-col gap-4 p-4 pt-2">
          <div class="text-xs text-[#454545] text-start">
            در این قسمت شما میتوانید محصولات و معامله های فعال را جستجو کنید
          </div>
          <div class="flex items-center justify-between text-sm">
            <div>
              <div
                class="cursor-pointer flex items-center gap-2 text-[#BFBDB6]"
                @click="step--"
              >
                <v-icon color="#BFBDB6"> mdi-chevron-right </v-icon>
                قبلی
              </div>
            </div>
            <div>
              <div
                class="cursor-pointer flex items-center gap-2 justify-end text-[#908D85]"
                @click="step++"
              >
                بعدی
                <v-icon color="#908D85"> mdi-chevron-left </v-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- step5 -->
    <div v-if="step === 5">
      <div
        class="d-flex bg-[#D9D9D9] p-1 absolute right-2 top-[320px] rounded-[18px] w-[47%]"
      >
        <user-cards-ads class="w-full" :item="cardData" />
      </div>
      <div class="bg-white absolute top-[140px] right-2 rounded-lg w-[268px]">
        <div
          class="flex justify-between items-center px-4 py-3 border-b border-[#F2F2F2]"
        >
          <div class="text-[#454545]">پست معامله</div>
          <div
            @click="dontShowAgain"
            class="text-[#D9D9D9] text-xs cursor-pointer"
          >
            رد کردن راهنمایی
          </div>
        </div>
        <div class="flex flex-col gap-4 p-4 pt-2">
          <div class="text-xs text-[#454545] text-start">
            پست های معاملات فعال و فروش. با کلیک بر روی هر پست شما میتواند
            جزییات معامله را مشاهده کرده و با فروشنده به راحتی گفتگو کنید
          </div>
          <div class="flex items-center justify-between text-sm">
            <div>
              <div
                class="cursor-pointer flex items-center gap-2 text-[#BFBDB6]"
                @click="step--"
              >
                <v-icon color="#BFBDB6"> mdi-chevron-right </v-icon>
                قبلی
              </div>
            </div>
            <div>
              <div
                class="cursor-pointer flex items-center gap-2 justify-end text-[#908D85]"
                @click="dontShowAgain"
              >
                بعدی
                <v-icon color="#908D85"> mdi-chevron-left </v-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        step: 1,
        showHelp: false,
        cardData: {
          createby: {
            full_name: "محمد پوراسکندر",
            avatar: {
              url: "./user.png",
            },
          },
          county: {
            name: "تهران",
          },
          image: {
            url: "./blog.png",
          },
          reviews: {
            length: 24,
          },
          rate: 4.2,
          title: "طلای نو و بدون اجرت",
          price: 43400000,
        },
      };
    },
    mounted() {
      const isNotFirstTimeHelp = this.$cookies.get("isNotFirstTimeHelp");
      if (!isNotFirstTimeHelp) {
        this.showHelp = true;
      }
    },
    methods: {
      dontShowAgain() {
        this.$cookies.set("isNotFirstTimeHelp", true);
        this.showHelp = false;
      },
    },
  };
</script>
