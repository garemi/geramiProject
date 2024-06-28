<template>
  <v-dialog
    v-model="showDialog"
    content-class="align-self-end custom-rounded ma-2 pa-0"
    max-width="100%"
    persistent
  >
    <v-card class="my-0 mx-0">
      <div class="d-flex justify-space-between align-center pt-3 pb-4 mx-4">
        <h3>پیشنهاد جدید</h3>
        <v-btn
          color="var(--medium-gray)"
          small
          elevation="0"
          style="width: 30px"
          class="rounded-lg"
          @click="showDialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <div class="pa-4">
        <span class="d-flex align-center justify-space-between">
          <p class="lg-text">امتیاز شما به محصول</p>
          <span class="d-flex align-center">
            <span class="mr-2" style="color: darkorange">
              {{ rating }}
            </span>
            <v-rating
              hover
              length="5"
              size="30"
              dense
              half-increments
              color="warning"
              background-color="grey lighten-2"
              small
              v-model="rating"
              dir="ltr"
            ></v-rating>
          </span>
        </span>
        <v-form-text-field
          class="px-0 custom-rounded"
          placeholder="نظر شما"
          height="40px"
          v-model="content"
        >
        </v-form-text-field>
      </div>
      <v-divider></v-divider>
      <div class="flex items-center justify-between text-[10px] my-3">
        <div class="flex flex-col items-center !grow-0 w-fit mx-5">
          <div>{{
            new Intl.NumberFormat().format(
              post.data.online_value
                ? post.data.online_value * value
                : post.data.price * value,
            )
          }}</div>
          <div>لیمیت قیمت</div>
        </div>
        <div
          class="flex flex-col items-center !grow-0 w-fit mx-5 text-[#FF5050]"
        >
          <div>{{
            new Intl.NumberFormat().format(
              post.data.online_value
                ? post.data.online_value * value +
                    (1 / 10) * post.data.online_value * value
                : post.data.price * value + (1 / 10) * post.data.price * value,
            )
          }}</div>
          <div>بالاترین قیمت ثبت شده</div>
        </div>
      </div>
      <div class="mx-5 flex text-left relative">
        <span
          class="min-w-12 w-12 !rounded-r-xl -ml-2 z-10"
          style="background-color: #eaeaea"
        />
        <span
          class="w-[1.5px] h-12 absolute rounded-full right-12 -bottom-0.5 z-20"
          style="background-color: #dcdcdc"
        />
        <span
          class="w-[1.5px] h-12 absolute rounded-full left-[76px] -bottom-0.5 z-20"
          style="background-color: #dcdcdc"
        />
        <span
          class="w-[1.5px] h-12 absolute rounded-full left-5 -bottom-0.5 z-20"
          style="background-color: #ff4747"
        />
        <v-slider
          v-model="range"
          :max="
            post.data.online_value
              ? post.data.online_value * value +
                (1 / 10) * post.data.online_value * value
              : post.data.price * value + (1 / 10) * post.data.price * value
          "
          :min="
            post.data.online_value
              ? post.data.online_value * value
              : post.data.price * value
          "
          class="align-center custom-slider w-full my-1"
          color="black"
          hide-details
          track-color="#EAEAEA"
          track-fill-color="#424038"
        >
        </v-slider>
        <div class="flex -mr-2">
          <v-img
            src="/hashor.png"
            class="h-10 w-14 text-[10px] flex items-center justify-center text-center"
            >محدودیت</v-img
          >
          <span class="w-5 !rounded-l-xl" style="background-color: #ff4747" />
        </div>
      </div>
      <div class="flex items-center justify-between mx-7 mt-1">
        <div class="text-xs" style="color: #666666">{{
          new Intl.NumberFormat().format(range)
        }}</div>
        <div class="text-[8px] w-20 text-center" style="color: #c4c4c4"
          >با پیشنهاد نفر بعد، این بازه فعال خواهد شد</div
        >
      </div>

      <div class="m-4 text-sm">اعتبار این پیشنهاد</div>

      <div class="flex gap-6 mx-4 mb-3">
        <div class="flex !grow-0 gap-2">
          <input type="radio" v-model="timeInput" value="hour" id="hour" />
          <label for="hour">ساعتی</label>
        </div>
        <div class="flex !grow-0 gap-2">
          <input type="radio" v-model="timeInput" value="day" id="day" />
          <label for="day">روز</label>
        </div>
        <div class="flex !grow-0 gap-2">
          <input type="radio" v-model="timeInput" value="week" id="week" />
          <label for="week">هفته</label>
        </div>
        <div class="flex !grow-0 gap-2">
          <input type="radio" v-model="timeInput" value="month" id="month" />
          <label for="month">ماه</label>
        </div>
      </div>

      <div class="flex items-center justify-between mx-7 mb-1">
        <div class="text-xs" style="color: #666666">1</div>
        <div class="text-xs" style="color: #666666">24</div>
      </div>

      <div class="mx-5 flex text-left relative">
        <span
          class="min-w-3 w-3 !rounded-r-xl -ml-2 z-10"
          style="background-color: #eaeaea"
        />
        <span
          class="w-[1.5px] h-12 absolute rounded-full right-3 -bottom-0.5 z-20"
          style="background-color: #dcdcdc"
        />
        <v-slider
          v-model="time"
          :max="24"
          :min="1"
          class="align-center custom-slider w-full my-1"
          color="black"
          hide-details
          track-color="#EAEAEA"
          track-fill-color="#424038"
        >
        </v-slider>
        <span
          class="min-w-3 w-3 !rounded-l-xl -mr-2 z-10"
          style="background-color: #eaeaea"
        />
        <span
          class="w-[1.5px] h-12 absolute rounded-full left-3 -bottom-0.5 z-20"
          style="background-color: #dcdcdc"
        />
      </div>
      <div class="text-sm mx-6 mt-1">{{ time }}</div>

      <v-card-actions>
        <v-btn dark class="custom-rounded" block @click="sendRequest"
          >ثبت پیشنهاد</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    data() {
      return {
        range: 1000000,
        rating: 3.5,
        time: 1,
        timeInput: "hour",
        content: "",
      };
    },
    props: {
      value: {
        type: Boolean,
        required: true,
      },
      post: {
        type: Object,
        required: true,
      },
    },
    computed: {
      showDialog: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit("input", v);
        },
      },
    },
    methods: {
      async sendRequest() {
        try {
          var hour = 0;
          if (this.timeInput === "hour") {
            hour = this.time;
          } else if (this.timeInput === "day") {
            hour = this.time * 24;
          } else if (this.timeInput === "week") {
            hour = this.time * 24 * 7;
          } else if (this.timeInput === "month") {
            hour = this.time * 24 * 7 * 30;
          }

          await this.$axios.$post(
            `/posts/${this.$route.query.property}/proposals`,
            {
              price: this.range,
              deadline: hour,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            },
          );
          await this.$axios.$post(
            `/posts/${this.$route.query.property}/comments`,
            {
              content: this.content,
              rate: this.rating,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            },
          );
          this.$emit("closeDialog");
        } catch (err) {
          console.log(err);
        }
      },
    },
  };
</script>
