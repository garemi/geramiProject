<template>
  <div class="mb-10">
    <div class="mx-5 mt-7 d-flex align-center">
      <v-btn icon to="/">
        <v-icon color="var(--gray)">mdi-chevron-right</v-icon>
      </v-btn>
      <p> فیلتر ها </p>
    </div>
    <div class="mx-5">
      <span>
        <p>قیمت</p>
        <v-range-slider
          v-model="price"
          :max="1000000000"
          :min="0"
          class="align-center custom-slider my-4"
          color="black"
          hide-details
          track-color="#EAEAEA"
          track-fill-color="#424038"
        >
        </v-range-slider>
        <span class="d-flex align-center justify-space-between">
          <p class="md-text" @change="$set(price, 0, $event)">
            از {{ new Intl.NumberFormat().format(price[0]) || "-" }} {{ unit }}
          </p>
          <p class="md-text" @change="$set(price, 0, $event)">
            از {{ new Intl.NumberFormat().format(price[1]) || "-" }} {{ unit }}
          </p>
        </span>
      </span>
    </div>
    <v-divider class="my-2"></v-divider>
    <div class="mx-5">
      <span>
        <p>وزن</p>
        <v-range-slider
          v-model="value"
          :max="500"
          :min="1"
          class="align-center custom-slider my-4"
          color="black"
          hide-details
          track-color="#EAEAEA"
          track-fill-color="#424038"
        >
        </v-range-slider>
        <span class="d-flex align-center justify-space-between">
          <p class="md-text" @change="$set(value, 0, $event)">
            از {{ new Intl.NumberFormat().format(value[0]) || "-" }} گرم
          </p>
          <p class="md-text" @change="$set(value, 0, $event)">
            از {{ new Intl.NumberFormat().format(value[1]) || "-" }} گرم
          </p>
        </span>
      </span>
    </div>
    <v-divider class="my-2"> </v-divider>
    <div class="mx-5">
      <div class="mb-2.5 text-xs text-right" style="color: #232323"
        >دسته بندی</div
      >
      <div class="flex items-center gap-11 mb-4">
        <div class="flex items-center gap-2 text-sm !grow-0">
          <input
            id="gold"
            value="gold"
            type="radio"
            v-model="categoryType"
            class="w-5 h-5"
            style="accent-color: rgba(66, 64, 56, 1)"
            @change="categoryList = []"
          />
          <Label for="gold">طلا</Label>
        </div>
        <div class="flex items-center gap-2 text-sm !grow-0">
          <input
            id="coin"
            value="coin"
            type="radio"
            v-model="categoryType"
            class="w-5 h-5"
            style="accent-color: rgba(66, 64, 56, 1)"
            @change="categoryList = []"
          />
          <Label for="coin">سکه</Label>
        </div>
      </div>
      <div
        style="border: 1px solid #e9e9e9"
        class="px-3 rounded-xl overflow-hidden"
        :class="!openCategories ? 'h-14' : 'h-fit'"
      >
        <div
          @click="openCategories = !openCategories"
          class="flex items-center justify-between my-2"
        >
          <div>
            <div class="text-right text-xs !text-[#CABF9F]">نوع</div>
            <div
              >{{ categoryList[0] }} <span v-if="categoryList[1]">،</span>
              {{ categoryList[1] }}
              <span v-if="categoryList.length > 2">
                و {{ categoryList.length - 2 }} مورد دیگر</span
              ></div
            >
          </div>
          <v-icon :class="!openCategories ? '' : 'rotate-180'"
            >mdi-chevron-down</v-icon
          >
        </div>
        <div v-if="categoryType == 'gold'">
          <div
            v-for="cate in categories.data.gold"
            :key="cate.id"
            class="flex justify-between items-center py-4 border-b border-[rgba(0, 0, 0, 0.05)]"
          >
            <div class="flex gap-3 items-center">
              <input
                :id="cate.id"
                type="checkbox"
                @change="handleCategory(cate.title, $event)"
                class="w-6 h-6"
                style="accent-color: #424038"
              />
              <label :for="cate.id">{{ cate.title }}</label>
            </div>
            <v-icon color="#908D85"> mdi-chevron-left </v-icon>
          </div>
        </div>
        <div v-if="categoryType == 'coin'">
          <div
            v-for="cate in categories.data.coin"
            :key="cate.id"
            class="flex justify-between items-center py-4 border-b border-[rgba(0, 0, 0, 0.05)]"
          >
            <div class="flex gap-3 items-center">
              <input
                :id="cate.id"
                type="checkbox"
                @change="handleCategory(cate.title, $event)"
                class="w-6 h-6"
                style="accent-color: #424038"
              />
              <label :for="cate.id">{{ cate.title }}</label>
            </div>
            <v-icon color="#908D85"> mdi-chevron-left </v-icon>
          </div>
        </div>
      </div>
    </div>
    <v-divider class="my-2"></v-divider>
    <div class="mx-5">
      <p>رنگ</p>
      <v-row no-gutters>
        <v-col v-for="(attr, i) in values" :key="i" cols="6">
          <span class="d-flex align-center" q>
            <v-checkbox v-model="colors[i]" />
            <span
              v-if="attr?.code"
              class="color-sample"
              :style="{ 'background-color': attr?.code }"
            ></span>
            <p style="color: var(--text-200)" class="md-text mr-1">
              {{ attr?.attribute_value }}
            </p>
            <span
              class="w-2 h-2 mr-2 rounded-full"
              :style="{ backgroundColor: attr.code }"
            />
          </span>
        </v-col>
      </v-row>
    </div>

    <v-divider class="my-2"></v-divider>

    <!-- <div class="mx-5">
      <p>پست از</p>
      <v-row no-gutters>
        <v-col v-for="(item, index) in post" :key="index" cols="6">
          <landing-new-filter-color :attr="item" />
        </v-col>
      </v-row>
    </div> -->
    <!-- <v-divider class="my-2"></v-divider> -->
    <div class="mx-5">
      <p>سایر</p>
      <v-row no-gutters>
        <v-col v-for="(item, index) in other" :key="index" cols="6">
          <span class="d-flex align-center">
            <v-checkbox v-model="others[index]" />
            <span
              v-if="item?.code"
              class="color-sample"
              :style="{ 'background-color': item?.code }"
            ></span>
            <p style="color: var(--text-200)" class="md-text mr-1">
              {{ item?.attribute_value }}
            </p>
          </span>
        </v-col>
      </v-row>
    </div>
    <v-divider class="my-2"></v-divider>
    <div class="mx-5">
      <span>
        <div class="d-flex align-center justify-space-between">
          <p class="font-weight-bold black-text md-text">مهلت معامله</p>
          <p class="gray-text md-text"
            >مدت مهلت معامله: {{ inputVal }} روز ، {{ time }} ساعت</p
          >
        </div>
        <v-row
          no-gutters
          class="mt-2 justify-space-between"
          style="width: 100%"
        >
          <v-col
            cols="5"
            class="custom-card-input custom-rounded d-flex-flex-column py-1 text-center"
          >
            <p class="gray-text md-text">روز</p>
            <v-form-text-field v-model="inputVal" :rules="[rules.numeric]" />
          </v-col>
          <v-col
            cols="5"
            class="custom-card-input custom-rounded d-flex-flex-column py-1 text-center"
          >
            <p class="gray-text md-text">ساعت</p>
            <v-form-modal-time-picker v-model="time" />
          </v-col>
        </v-row>
      </span>
    </div>
    <v-divider class="my-3"></v-divider>
    <v-row class="mx-5 d-flex align-center justify-space-between">
      <v-col>
        <v-btn
          block
          @click="filterPosts"
          class="rounded-xl py-5"
          dark
          elevation="0"
          >افزودن فیلتر</v-btn
        >
      </v-col>
      <v-col>
        <v-btn
          block
          class="rounded-xl py-5"
          color="black"
          dark
          outlined
          @click="$router.push('/')"
          >حذف فیلتر
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import { rules } from "@/constants/VuetifyRules.js";
  import services from "@/services";
  import { showError } from "@/constants/messages";

  export default {
    layout: "deafult",
    data() {
      return {
        categoryType: "gold",
        openCategories: false,
        categoryList: [],
        inputVal: "",
        time: "",
        rules,
        checked: false,
        colors: [false, false, false, false],
        colorsName: ["رزگلد", "طلایی", "سفید", "برنز"],
        price: [0, 700000000],
        value: [0, 350],
        values: [
          {
            code: "#F7C5AD",
            attribute_value: "رزگلد",
          },
          {
            code: "#DCC677",
            attribute_value: "طلایی",
          },
          {
            code: "#DCDCDC",
            attribute_value: "سفید",
          },
          {
            code: "#AD8F62",
            attribute_value: "برنز",
          },
          {
            code: "#efe8ce",
            attribute_value: "طلای سفید",
          },
        ],
        post: [
          {
            attribute_value: "کاربر عادی",
            id: "user",
          },
          {
            attribute_value: "مغازه دار",
            id: "shopkeeper",
          },
        ],
        other: [
          {
            attribute_value: "امکان مبادله کالا ",
            id: "exchange",
          },
          {
            attribute_value: "امکان پیشنهاد قیمت",
            id: "price_propsal",
          },
        ],
        others: [false, false],
      };
    },
    async asyncData({ $axios }) {
      const categories = await $axios.$get("/categories");
      return { categories };
    },
    methods: {
      handleCategory(title, e) {
        if (e?.target?.checked) {
          this.categoryList.push(title);
        } else {
          this.categoryList = this.categoryList.filter((el) => el !== title);
        }
      },
      async getAttrVal() {
        try {
          if (!this.loading) this.loading = true;
          const response = await services.attributeValue.get();
          this.values = response.data.data;
          this.loading = false;
        } catch (error) {
          this.loading = false;
          showError(error);
        }
      },
      async filterPosts() {
        var colors = this.colors.map((color, i) => {
          if (color) {
            return this.colorsName[i];
          }
        });
        colors = colors.filter((color) => color);
        var myUrl = "";
        if (colors.length) {
          myUrl += `&colors=${colors.join(",")}`;
        }
        if (this.others[0]) {
          myUrl += `&is_exchanging=1`;
        }
        if (this.others[1]) {
          myUrl += `&is_getting_offers=1`;
        }

        this.$router.push(
          `/?min_price=${this.price[0]}&max_price=${this.price[1]}&min_value=${this.value[0]}&max_value=${this.value[1]}${myUrl}`,
        );
      },
    },
    mounted() {
      // this.getAttrVal();
    },
  };
</script>
<style lang="scss"></style>
