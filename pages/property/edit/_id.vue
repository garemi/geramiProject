<template>
  <div
    :class="step === 2 ? 'background-black' : 'gray-background'"
    class="expand-viewport-min-height gray-background"
  >
    <v-container v-if="step === 1" class="" fluid>
      <!-- step 2 -->
      <v-form ref="form">
        <v-row class="mt-6 mx-2" justify="center" no-gutters>
          <v-col class="d-flex align-center" cols="12">
            <div class="div-size rounded-lg background-gray">
              <v-icon @click="step = 2"> mdi-chevron-right</v-icon>
            </div>
            <h3 class="mx-4 md-text">تکمیل اطلاعات</h3>
          </v-col>
          <!--عنوان محصول -->
          <v-col class="!flex gap my-4 gap-3" cols="12">
            <div
              v-for="image in images"
              :key="image"
              class="flex items-center !w-16 !max-w-16 h-24 !rounded-xl overflow-hidden"
              style="border: 1.5px solid #d1d1d1"
            >
              <img :src="image" class="w-full" />
            </div>
          </v-col>
          <v-col>
            <button
              style="border: 1px solid #bfbdb6; color: #bfbdb6"
              class="rounded-full py-1.5 px-4 text-xs"
              @click="step = 2"
              >ویرایش عکس‌ها</button
            >
          </v-col>
          <v-col
            class="my-4 white-bg rounded-xl display-none input-overflow"
            cols="12"
          >
            <h6 class="text-100 py-0 my-2 mx-4 md-text"> عنوان محصول </h6>
            <v-form-text-field
              v-model="titleProperty"
              :rules="[rules.required]"
              background-color="transparent"
              dense
              hide-details="auto"
              class="py-0 px-4 input-text-color"
            >
            </v-form-text-field>
          </v-col>

          <v-col>
            <div>رنگ کالا</div>
            <div class="flex items-center gap-3 overflow-scroll pb-3">
              <label
                for="roz"
                class="flex items-center gap-2 p-2 pl-4 rounded-full text-xs !grow-0"
                style="
                  background-color: rgba(247, 197, 173, 1);
                  color: rgba(157, 111, 88, 1);
                "
              >
                <input
                  id="roz"
                  type="radio"
                  value="رزگلد"
                  v-model="color"
                  style="accent-color: rgba(66, 64, 56, 1)"
                />
                رزگلد
              </label>
              <label
                for="gold"
                class="flex items-center gap-2 p-2 pl-4 rounded-full text-xs !grow-0"
                style="
                  background-color: rgba(220, 198, 119, 1);
                  color: rgba(121, 106, 55, 1);
                "
              >
                <input
                  id="gold"
                  type="radio"
                  value="طلایی"
                  v-model="color"
                  style="accent-color: rgba(66, 64, 56, 1)"
                />
                طلایی
              </label>
              <label
                for="white"
                class="flex items-center gap-2 p-2 pl-4 rounded-full text-xs !grow-0"
                style="
                  background-color: rgba(220, 220, 220, 1);
                  color: rgba(123, 123, 123, 1);
                "
              >
                <input
                  id="white"
                  type="radio"
                  value="سفید"
                  v-model="color"
                  style="accent-color: rgba(66, 64, 56, 1)"
                />
                سفید
              </label>
              <label
                for="boronz"
                class="flex items-center gap-2 p-2 pl-4 rounded-full text-xs !grow-0"
                style="
                  background-color: rgba(173, 143, 98, 1);

                  color: rgba(70, 54, 30, 1);
                "
              >
                <input
                  id="boronz"
                  type="radio"
                  value="برنز"
                  v-model="color"
                  style="accent-color: rgba(66, 64, 56, 1)"
                />
                برنز
              </label>
              <label
                for="whiteGold"
                class="flex items-center gap-2 p-2 pl-4 rounded-full text-xs !grow-0 whitespace-nowrap"
                style="background-color: #efe8ce; color: #aea278"
              >
                <input
                  id="whiteGold"
                  type="radio"
                  value="طلای سفید"
                  v-model="color"
                  style="accent-color: rgba(66, 64, 56, 1)"
                />
                طلای سفید
              </label>
            </div>
          </v-col>

          <!-- colors -->
          <v-col
            v-for="(item, i) in groupedVariationsByAttributeId"
            v-if="item.variations[0]?.attribute_name === 'رنگ'"
            :key="i"
            class="my-4 radio-group-style"
            cols="12"
          >
            <div>
              <h3>{{ item.variations[0]?.attribute_name }}</h3>
            </div>
            <div class="overflow-x-auto mt-4">
              <v-radio-group v-model="selectedColor" class="" row>
                <div
                  v-for="(variation, val) in item.variations"
                  :key="val"
                  :style="{ backgroundColor: variation.codeColor }"
                  class="width-height rounded-pill mx-1 px-3 d-flex justify-end align-center"
                  @click="setVariations(variation, i, val)"
                >
                  <v-radio :value="val"></v-radio>
                  <span class="sm-text div-size">{{ variation.value }}</span>
                </div>
              </v-radio-group>
            </div>
          </v-col>
          <!-- وزن محصول -->
          <v-col
            class="my-4 white-bg rounded-xl display-none input-overflow"
            cols="12"
          >
            <h6
              v-if="categoryType === 'gold'"
              class="text-100 mx-3 py-0 my-2 mx-4 md-text"
              >وزن محصول</h6
            >
            <h6 v-else class="text-100 mx-3 py-0 my-2 mx-4 md-text"
              >تعداد سکه</h6
            >
            <v-form-text-field
              v-model="Weight"
              class="py-0 px-4 input-text-color"
              background-color="transparent"
              hide-details="auto"
              :rules="[rules.required, rules.numeric]"
              :suffix="categoryType === 'gold' ? 'گرم' : ''"
            >
            </v-form-text-field>
          </v-col>
          <!-- checkbox تبادل کالا -->
          <v-col cols="12">
            <v-checkbox
              v-model="has_allow_exchange"
              color="black"
              label="مایل به تبادل کالا به کالا هستم."
              type="checkbox"
            >
            </v-checkbox>
          </v-col>
          <v-divider></v-divider>

          <!-- قیمت محصول -->
          <v-col
            v-if="!has_online_price"
            class="my-4 white-bg rounded-xl display-none input-overflow"
            cols="12"
          >
            <h6 class="text-100 mx-3 py-0 my-2 mx-4 md-text">قیمت محصول</h6>
            <v-form-text-price-field
              v-model="price"
              class="py-0 px-4 input-text-color"
              background-color="transparent"
              dense
              hide-details="auto"
              suffix="تومان"
              :rules="[rules.numeric]"
            >
            </v-form-text-price-field>
          </v-col>

          <!-- محاسبه قیمت کل -->
          <v-col cols="12">
            <div class="d-flex align-center">
              <v-checkbox
                v-model="has_online_price"
                class="d-flex"
                color="black"
                type="checkbox"
              >
              </v-checkbox>
              <h4>ابزار مظنه آنلاین</h4>
              <div class="mx-1 text-xs" style="color: rgba(0, 0, 0, 0.6)"
                >(20,000 تومان)</div
              >
            </div>
            <p class="md-text">
              با ابزار منظه آزاد، قیمت با درصد سود شما بالا و پایین میشود.
            </p>
            <div v-if="toolClicked" class="d-flex mt-5 align-center">
              <div
                class="width-30Percent height-static d-flex justify-center align-center"
              >
                <span class="font-small text-xs">
                  {{ new Intl.NumberFormat().format(finalPrice) }} ت
                </span>
              </div>
              <div class="div-size mx-1 text-xs height-static">
                <v-icon color="black" x-small>mdi-equal</v-icon>
              </div>
              <div class="div-size text-xs height-static">
                <span> {{ Weight ? Weight : 0 }} </span>
              </div>
              <div class="div-size mx-1 height-static text-xs">
                <v-icon color="black" x-small>mdi-close</v-icon>
              </div>
              <div
                class="width-15Percent d-flex rounded-xl white-bg height-static"
                v-if="categoryType === 'gold'"
              >
                <div class="d-flex align-center">
                  <v-icon
                    color="black"
                    x-small
                    @click="sheetPercent = !sheetPercent"
                  >
                    mdi-chevron-down
                  </v-icon>
                </div>
                <div
                  class="d-flex flex-column justify-center text-xs items-center"
                  v-if="categoryType === 'gold'"
                >
                  <div
                    :class="selectedTypeSood === 'tooman' ? '' : ''"
                    class="d-flex align-center justify-center display-none"
                  >
                    <span v-if="selectedTypeSood !== 'tooman'" class="mr-2">
                      %
                    </span>
                    {{ modelPercent }}
                  </div>
                  <span class="mr-4 text-xs text-center">سود</span>
                </div>
              </div>
              <div v-if="categoryType === 'gold'" class="div-size mx-1">
                <v-icon color="black" x-small>mdi-plus</v-icon>
              </div>
              <!-- price -->
              <div
                @click="sheet = !sheet"
                class="width-40Percent d-flex rounded-xl white-bg height-static"
              >
                <div class="d-flex align-center">
                  <v-icon color="black" x-small> mdi-chevron-down </v-icon>
                </div>
                <div
                  class="d-flex flex-column flex-center px-0 space-left display-none"
                >
                  <!-- <v-text-field
                  v-model="model"
                  
                  dense
                  flat
                  solo
                >
                </v-text-field> -->
                  <div
                    class="px-0 rounded-md mx-2 input-height md-text text-xs"
                  >
                    {{ model.value }}
                  </div>
                  <div
                    v-if="model?.title"
                    class="px-0 rounded-md mt-2 mx-2 sm-text text-xs input-height"
                  >
                    {{
                      price?.title === "Geram18"
                        ? "ثابت طلای 18"
                        : price?.title === "Tamam"
                        ? "ثابت سکه ی تمام"
                        : price?.title === "Qadim"
                        ? "ثابت سکه قدیم"
                        : price?.title === "Nim"
                        ? "ثابت نیم سکه"
                        : price?.title === "Rob"
                        ? "ثابت ربع سکه"
                        : ""
                    }}
                  </div>
                </div>
              </div>
            </div>
            <v-col
              v-if="toolClicked && categoryType !== 'gold'"
              class="my-4 white-bg rounded-xl display-none input-overflow"
              cols="12"
            >
              <h6 class="text-100 mx-3 py-0 my-2 mx-4 md-text"
                >قیمت پیشنهادی شما</h6
              >
              <v-form-text-price-field
                v-model="suggestedPrice"
                class="py-0 px-4 input-text-color"
                background-color="transparent"
                dense
                hide-details="auto"
                suffix="تومان"
                :rules="[rules.numeric]"
              >
              </v-form-text-price-field>
            </v-col>
            <v-divider class="my-4"></v-divider>
          </v-col>

          <!-- ایتم های قیمت  -->
          <v-bottom-sheet v-model="sheet" scrollable>
            <v-card class="custom-rounded ma-4">
              <v-card-text class="px-3">
                <v-row class="ma-2">
                  <v-col
                    class="d-flex justify-space-between align-center"
                    cols="12"
                  >
                    <p class="black--text">
                      {{
                        BalancesPrice?.datetime
                          | moment("در تاریخ jYYYY/jMM/jDD ساعت HH:mm")
                      }}
                    </p>
                    <div class="div-size rounded-lg background-gray">
                      <v-icon @click="sheet = !sheet"> mdi-close</v-icon>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <template v-if="categoryType === 'gold'">
                      <div
                        v-for="price in online_prices.filter(
                          (el) =>
                            el?.title === 'Geram18' ||
                            el?.title === 'Taviz18' ||
                            el?.title === 'KHarid18',
                        )"
                        :key="price?.title"
                        @click="setItemTitle(price)"
                      >
                        <div
                          class="my-3 py-4 rounded-lg gray-background border-gray d-flex justify-space-between my-1"
                        >
                          <span class="black--text mx-1">
                            {{ new Intl.NumberFormat().format(price.value) }}
                            <small class="text-100">ت</small>
                          </span>
                          <span class="mx-1"
                            >قیمت
                            {{
                              price?.title === "Geram18"
                                ? "فروش طلای 18"
                                : price?.title === "KHarid18"
                                ? "خرید طلای 18"
                                : price?.title === "Taviz18"
                                ? "تعویض طلای 18"
                                : price?.title === "Tamam"
                                ? "فروش سکه ی تمام"
                                : price?.title === "Qadim"
                                ? "فروش سکه قدیم"
                                : price?.title === "Nim"
                                ? "فروش نیم سکه"
                                : price?.title === "Rob"
                                ? "فروش ربع سکه"
                                : ""
                            }}</span
                          >
                        </div>
                      </div>
                    </template>
                    <template v-if="categoryType === 'coin'">
                      <div
                        v-for="price in online_prices.filter(
                          (el) =>
                            el?.title !== 'Geram18' &&
                            el?.title !== 'Taviz18' &&
                            el?.title !== 'KHarid18',
                        )"
                        :key="price?.title"
                        @click="setItemTitle(price)"
                      >
                        <div
                          class="my-3 py-4 rounded-lg gray-background border-gray d-flex justify-space-between my-1"
                        >
                          <span class="black--text mx-1">
                            {{ new Intl.NumberFormat().format(price.value) }}
                            <small class="text-100">ت</small>
                          </span>
                          <span class="mx-1"
                            >قیمت
                            {{
                              price?.title === "Geram18"
                                ? "فروش طلای 18"
                                : price?.title === "KHarid18"
                                ? "خرید طلای 18"
                                : price?.title === "Taviz18"
                                ? "تعویض طلای 18"
                                : price?.title === "Tamam"
                                ? "فروش سکه ی تمام"
                                : price?.title === "Qadim"
                                ? "فروش سکه قدیم"
                                : price?.title === "Nim"
                                ? "فروش نیم سکه"
                                : price?.title === "Rob"
                                ? "فروش ربع سکه"
                                : ""
                            }}</span
                          >
                        </div>
                      </div>
                    </template>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-bottom-sheet>

          <!-- ایتم های درصد سود -->
          <v-bottom-sheet v-model="sheetPercent" scrollable>
            <v-card class="custom-rounded ma-4">
              <v-card-text class="px-3">
                <v-row class="ma-2">
                  <v-col
                    class="d-flex justify-space-between align-center"
                    cols="12"
                  >
                    <p class="black--text font-weight-bold lg-text">سود</p>
                    <div class="div-size rounded-lg background-gray">
                      <v-icon @click="sheetPercent = !sheetPercent">
                        mdi-close
                      </v-icon>
                    </div>
                  </v-col>
                  <v-col class="d-flex justify-start pb-0" cols="12">
                    <v-radio-group v-model="selectedTypeSood" row>
                      <v-radio label="تومان" value="tooman">تومان</v-radio>
                      <v-radio label="درصدی" value="darsad">درصد</v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <div
                      v-if="selectedTypeSood !== 'tooman'"
                      class="px-2 py-3 rounded-lg gray-background border-gray d-flex justify-space-between my-1 align-center"
                    >
                      <div
                        :class="{ 'background-black': background === 'black' }"
                        class="div-size rounded-lg"
                        @click="plusPercent"
                      >
                        <v-icon :color="iconColor">mdi-plus</v-icon>
                      </div>

                      <div class="d-flex flex-column align-center">
                        <span class="primary-text">درصد سود</span>
                        <span>{{ soodDarsadi }} %</span>
                      </div>

                      <div
                        :class="{ 'background-black': background === 'black' }"
                        class="div-size rounded-lg"
                        @click="minusPercent"
                      >
                        <v-icon :color="iconColor"> mdi-minus</v-icon>
                      </div>
                    </div>
                    <div
                      v-if="selectedTypeSood === 'tooman'"
                      class="px-2 py-2 rounded-lg gray-background border-gray my-1 display-none"
                    >
                      <div>
                        <span class="mx-2 py-0 primary-text font-weight-500"
                          >سود مورد نظر</span
                        >
                        <v-form-text-field
                          v-model="soodDarsadi"
                          class="py-0 px-1"
                          background-color="transparent"
                          dense
                          hide-details="auto"
                          placeholder="0"
                        >
                        </v-form-text-field>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      block
                      class="white--text rounded-pill"
                      color="black"
                      @click="setSood(soodDarsadi)"
                    >
                      ثبت سود
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-bottom-sheet>

          <v-col v-if="categoryType === 'gold'" class="mb-6" cols="12">
            <div class="d-flex align-center">
              <v-checkbox
                v-model="proposal"
                class="d-flex"
                color="black"
                type="checkbox"
              >
              </v-checkbox>
              <h4> ابزار پیشنهاد قیمت</h4>
              <div class="mx-1 text-xs" style="color: rgba(0, 0, 0, 0.6)"
                >(30,000 تومان)</div
              >
            </div>
            <p class="md-text justify-text my-1">
              در صورت تمایل هر فرد میتواند پیشنهاد قیمت بدهد و شما تصمیم به
              انجام معامله با هر فرد هستید.
            </p>
            <v-divider class="mt-4"></v-divider>
          </v-col>

          <v-col cols="12">
            <div class="d-flex align-center">
              <v-checkbox
                v-model="deadline"
                class="d-flex"
                color="black"
                type="checkbox"
              >
              </v-checkbox>
              <h4> ابزار مهلت معامله </h4>
              <div class="mx-1 text-xs" style="color: rgba(0, 0, 0, 0.6)"
                >(40,000 تومان)</div
              >
            </div>
            <p class="md-text justify-text my-1">
              در زمان تعیین شده شما، خریدار فرصت معامله دارد.در غیر این صورت شما
              تمایلی به انجام معامله ندارید.
            </p>
            <v-row v-if="selectedDeadline" justify="center" no-gutters>
              <v-col
                class="my-4 white-bg rounded-xl display-none input-overflow"
                cols="5"
              >
                <p class="text-100 mx-3 py-0 my-2 mx-4 md-text font-weight-500">
                  ساعت
                </p>
                <v-form-text-field
                  v-model="hour"
                  background-color="transparent"
                  class="py-0 px-4"
                  hide-details="auto"
                  dense
                  placeholder="0"
                >
                </v-form-text-field>
              </v-col>
              <v-col cols="1"></v-col>
              <v-col
                class="my-4 white-bg rounded-xl display-none input-overflow"
                cols="5"
              >
                <p class="text-100 mx-3 py-0 my-2 mx-4 md-text font-weight-500">
                  روز
                </p>
                <v-form-text-field
                  v-model="day"
                  background-color="transparent"
                  dense
                  class="py-0 px-4"
                  hide-details="auto"
                  placeholder="0"
                >
                </v-form-text-field>
              </v-col>
            </v-row>
            <v-divider class="mb-6"></v-divider>
          </v-col>
          <v-col class="white-bg my-5 rounded-xl display-none" cols="12">
            <v-textarea
              v-model="desc"
              background-color="white"
              class="rounded-xl px-4"
              color="white"
              placeholder="توضیحات محصول"
              :rules="[rules.required]"
            >
            </v-textarea>
          </v-col>
          <v-col cols="12">
            <v-btn
              block
              class="my-8 py-5"
              color="black"
              outlined
              rounded
              :loadingSubmit="loadingSubmit"
              @click="submit"
            >
              پرداخت و انتشار ({{
                new Intl.NumberFormat().format(
                  (has_online_price ? 20000 : 0) +
                    (proposal ? 30000 : 0) +
                    (deadline ? 40000 : 0),
                )
              }})
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <property-edit-img
      v-if="step === 2"
      :step="step"
      @imagesUploaded="setImage"
    />
  </div>
</template>

<script>
  import services from "@/services";
  import divider from "@/components/v-form/divider.vue";
  import Constants from "@/constants/GlobalConstants";

  export default {
    components: { divider },
    layout: "empty",
    data() {
      return {
        categoryType: "gold",
        selectedCategory: null,
        goldSearch: "",
        coinSearch: "",
        color: "",
        rules: Constants.rules,
        price: "",
        desc: "",
        step: 1,
        selectedDeadline: false,
        soodDarsadi: "",
        hour: "",
        day: "",
        deadline: false,
        proposal: "",
        has_online_price: false,
        toolClicked: false,
        selectedTypeSood: "darsad",
        soodtooman: "",
        titleProperty: "",
        sheetPercent: false,
        sheet: false,
        finalPrice: 0,
        profit: "",
        BalancesPrice: [],
        loadingBalance: false,
        Weight: "",
        modelPercent: 1,
        transaction: "",
        selectedColor: "",
        has_allow_exchange: false,
        loading: false,
        attributes: [],
        selectedVariations: [],
        model: "",
        // sliderValue: 0,
        // sliderMin: 0,  "comment for now"
        // sliderMax: 0,
        background: "gray",
        iconColor: "black",
        loadingSubmit: false,
        exchange: [],
        images: [],
        gallery: [],
      };
    },

    async asyncData({ $axios }) {
      const categories = await $axios.$get("/categories");
      const online_prices = await $axios.$get("/online-prices");

      return { categories, online_prices };
    },

    methods: {
      plusPercent() {
        this.soodDarsadi++;
        this.background = "black";
        this.iconColor = "white";
      },
      minusPercent() {
        if (this.soodDarsadi > 1) {
          this.soodDarsadi--;
          this.background = "black";
          this.iconColor = "white";
        }
      },

      handleChangeDeadline() {
        const selectedDeadline = this.TransactionDeadline[this.transaction];
        this.sliderMin = selectedDeadline.min;
        this.sliderMax = selectedDeadline.max;
      },
      getAttributes() {
        if (!this.loading) this.loading = true;
        services.attributeValue
          .get(null, {
            with: ["attribute"],
          })
          .then((response) => {
            this.loading = false;
            this.attributes = response.data.data;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      },

      getBalancePrace() {
        if (!this.loadingBalance) this.loadingBalance = true;
        services.property
          .getBalance(null, {})
          .then((response) => {
            this.loadingBalance = false;
            this.BalancesPrice = response.data.data;
          })
          .catch((error) => {
            console.log(error);
            this.loadingBalance = false;
          });
      },

      async submit() {
        if (this.$store.state.userData == null) {
          this.$toast.error("لطفا ابتدا وارد شوید");
          this.$router.push("/login");
          return;
        }

        if (
          !this.$refs.form.validate() ||
          !this?.titleProperty ||
          !this.desc ||
          !this.color ||
          !this.Weight ||
          !this.images.length
        ) {
          this.$toast.error("لطفا تمامی مقادیر را پر کنید");
          return;
        }
        const exchange_time = {
          hour: this.hour,
          day: this.day,
        };

        var colorCode = "";

        if (this.color === "رزگلد") {
          colorCode = "#F7C5AD";
        } else if (this.color === "طلایی") {
          colorCode = "#DCC677";
        } else if (this.color === "سفید") {
          colorCode = "#DCDCDC";
        } else if (this.color === "برنز") {
          colorCode = "#AD8F62";
        } else if (this.color === "طلای سفید") {
          colorCode = "#EFE8CE";
        }

        const formData = new FormData();

        formData.append("category_id", this.selectedCategory);
        this.gallery.forEach((img, i) => {
          formData.append(`image_${i + 1}`, img.image);
        });
        formData.append("title", this?.titleProperty);
        formData.append("color_title", this.color);
        formData.append("color_hex", colorCode);
        formData.append("value", this.Weight);
        formData.append("is_exchanging", this.has_allow_exchange);
        formData.append("price", this.price);
        formData.append("is_using_api", this.has_online_price);
        formData.append("is_getting_offers", this.deadline);
        formData.append("description", this.desc);
        if (this.selectedDeadline) {
          const hours = this.hour * 24 + this.day;
          formData.append("deadline", hours);
        }
        if (this.finalPrice && this.has_online_price) {
          formData.append("online_value", this.finalPrice);
        }
        if (this.model.value && this.has_online_price) {
          formData.append("primitive_online_value", this.model.value);
          formData.append("type", this.model?.title);
        }

        const res = await this.$axios.$post(
          `/posts/${this.$route.params.id}/update`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        );

        // window.location.href = res.action;
        this.$router.push(`/property/details/${this.$route.params.id}`);

        this.loadingSubmit = true;
      },

      dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[arr.length - 1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      },

      setImage(images, step) {
        if (images.length === 0) {
          this.$toast.error("لطفا حداقل یک تصویر وارد کنید!  ");
          return;
        }

        this.step = 1;
        const imagesArray = images.map((image) => {
          return {
            image,
          };
        });
        this.gallery = [...imagesArray];
        this.images = this.gallery.map((img) => {
          return URL.createObjectURL(img.image);
        });
        console.log("gallery", this.gallery);
      },

      calculateGoldPrice() {
        const goldPrice = parseFloat(this.model.value);
        const profitPercent = parseFloat(this.modelPercent);
        const weight = parseFloat(this.Weight);

        if (this.selectedTypeSood === "tooman") {
          if (!isNaN(goldPrice) && !isNaN(profitPercent) && !isNaN(weight)) {
            this.finalPrice = Math.ceil(
              goldPrice + (1 + profitPercent / 100) * weight,
            );
          } else {
            this.finalPrice = 0;
          }
        } else {
          if (!isNaN(goldPrice) && !isNaN(profitPercent) && !isNaN(weight)) {
            this.finalPrice = Math.ceil((goldPrice + profitPercent) * weight);
            console.log(this.finalPrice);
          } else {
            this.finalPrice = 0;
          }
        }
      },
      setVariations(value, i, val) {
        const selectedVariation = {
          attribute_value: value.value,
          attribute_id: value.attribute_id,
        };
        this.selectedVariations.push(selectedVariation);
      },
      setItemTitle(item) {
        this.model = item;
        this.sheet = !this.sheet;
      },
      setSood(sood) {
        this.modelPercent = sood;
        this.sheetPercent = !this.sheetPercent;
      },
      backToStepOne() {
        this.step = 1;
      },
    },
    watch: {
      modelPercent: function (newValue) {
        this.calculateGoldPrice();
      },
      model: function (newValue) {
        this.calculateGoldPrice();
      },
      Weight: function (newValue) {
        this.calculateGoldPrice();
      },
      has_online_price(value) {
        this.toolClicked = value;
      },
      deadline(value) {
        this.selectedDeadline = value;
      },
      selectedTypeSood(newValue) {
        if (newValue === "tooman") {
          this.soodDarsadi = 0;
        } else {
          this.soodDarsadi = 1;
        }
      },
    },
    async mounted() {
      this.getAttributes();
      this.getBalancePrace();
      const post = await this.$axios.$get(`/posts/${this.$route.params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      this.titleProperty = post?.data?.title;
      this.color = post?.data?.color_title;
      this.Weight = post?.data?.value;
      this.has_allow_exchange = post?.data?.is_exchanging;
      this.price = post?.data?.price;
      this.has_online_price = post?.data?.is_using_api;
      this.proposal = post?.data?.is_getting_offers;
      this.deadline = post?.data?.deadline;
      this.desc = post?.data?.description;
      this.categoryType = post?.data?.category?.parent_category;
      // this.images = post?.data?.images;
    },

    computed: {
      groupedVariationsByAttributeId() {
        if (this.attributes) {
          const attributeArray = this.attributes.map((value) => {
            return value.attribute_id;
          });
          const newArray = attributeArray.filter((item, index) => {
            return attributeArray.indexOf(item) === index;
          });
          const resultArrays = [];

          newArray.forEach((matchingID) => {
            const matchingVariations = this.attributes.filter(
              (variation) => variation.attribute_id === matchingID,
            );

            const attributeInfo = {
              attribute_id: matchingID,
              variations: matchingVariations.map((v) => ({
                attribute_id: v.attribute_id,
                value: v.attribute_value,
                codeColor: v.code,
                attribute_name: v.attribute ? v.attribute.name : null,
              })),
            };

            resultArrays.push(attributeInfo);
          });

          console.log("resultArrays", resultArrays);
          return resultArrays;
        }
      },
    },
  };
</script>

<style scoped>
  .font-small {
    font-size: 13px;
  }

  .width-40Percent {
    width: 40%;
  }

  .height-static {
    height: 60px;
  }

  .custom-slider {
    direction: rtl;
  }

  .width-15Percent {
    width: 30%;
  }

  .width-30Percent {
    width: 30%;
  }

  .div-size {
    width: fit-content;
    height: fit-content;
  }

  .width-height {
    width: 80px;
    height: 30px;
  }

  .background-gray {
    background-color: #dedcdd;
  }

  .gray-background {
    background-color: #f7f6f2;
  }

  .border-gray {
    border: 1px solid #dedcdd;
  }

  .background-black {
    background-color: black;
  }
</style>

<style lang="scss">
  .input-text-color {
    .v-text-field fieldset,
    .v-text-field .v-input__control {
      color: var(--text-100);
    }

    // .theme--light.v-messages {
    //   display: none;
    // }
  }

  // .theme--light.v-messages {
  //   display: none;
  // }

  .display-none {
    .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
      display: none;
    }
  }

  // .input-height {
  //   .v-input__slot {
  //     align-items: center;
  //     display: flex;
  //     // margin-bottom: 8px;
  //     min-height: 0;
  //     position: relative;
  //     transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  //     transition-property: height, min-height;
  //     width: 100%;
  //     height: 30px;
  //     text-align: right;
  //   }
  // }

  .space-left {
    .v-text-field.v-text-field--solo .v-input__control input {
      caret-color: auto;
      text-align: right;
      font-size: 13px;
      position: relative;
      right: -9px;
    }
  }

  .radio-group-style {
    .v-input--radio-group--row .v-input--radio-group__input {
      flex-direction: row;
      flex-wrap: nowrap;
      overflow-x: auto;
    }
  }

  // .input-overflow {
  //   .v-text-field__details {
  //     display: flex;
  //     flex: 1 0 auto;
  //     max-width: 100%;
  //     min-height: 0px;
  //     overflow: hidden;
  //   }
  // }
</style>
