<template>
  <div class="pt-12 pb-32">
    <common-sub-header class="px-6" title="تبدیل پروفایل به مغازه" />
    <div class="flex flex-col mt-8 inputs">
      <template v-for="(item, i) in trades">
        <div
          :key="`item${i}`"
          class="flex flex-col gap-4 overflow-hidden !transition-all py-4"
          :class="item.show ? 'h-fit' : 'h-14'"
        >
          <div
            class="flex gap-2 items-center px-6"
            @click="item.show = !item.show"
          >
            <div
              class="px-2 rounded-lg"
              :class="item.show ? ' py-3' : ' py-2'"
              :style="
                item.show
                  ? 'background-color : rgba(234, 234, 234, 1)'
                  : 'background-color : rgba(66, 64, 56, 1)'
              "
            >
              <svg
                v-if="item.show"
                width="10"
                height="2"
                viewBox="0 0 10 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1H10" stroke="#424038" stroke-width="1.5" />
              </svg>
              <svg
                v-else
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 5H10" stroke="#F7F6F3" stroke-width="1.5" />
                <path d="M5 0L5 10" stroke="#F7F6F3" stroke-width="1.5" />
              </svg>
            </div>
            <div>{{ tradeName(item.title) }}</div>
          </div>
          <div class="flex flex-col items-center gap-2 px-6">
            <div class="flex gap-2 max-w-full items-end">
              <div>
                <div class="flex items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    v-model="item.isOnlineKharid"
                    label="خرید"
                    class="w-6 h-6 checkbox"
                    :id="`kharid${i}`"
                    @change="
                      updateOnlinePrice(i, 'kharid', !item.isOnlineKharid)
                    "
                  />
                  <label :for="`kharid${i}`"
                    >خرید <img src="/check.png"
                  /></label>
                </div>
                <div
                  class="rounded-xl flex py-2 px-4"
                  :class="{ 'opacity-20': !item.isOnlineKharid }"
                  style="
                    background-color: white;
                    border: 1px solid rgba(239, 239, 239, 1);
                  "
                >
                  <div>
                    <div style="color: rgba(202, 191, 159, 1)">قیمت خرید</div>
                    <input
                      type="text"
                      class="w-full outline-none"
                      v-model="item.kharid"
                      :disabled="!item.isOnlineKharid"
                    />
                  </div>
                  <div class="w-4 min-w-4">
                    <img :src="require('@/assets/img/toman-gram.png')" />
                  </div>
                </div>
              </div>
              <span
                class="h-[70px] w-[1.5px]"
                style="background-color: rgba(238, 238, 238, 1)"
              />
              <div>
                <div class="flex items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    v-model="item.isOnlineForosh"
                    @change="
                      updateOnlinePrice(i, 'forosh', !item.isOnlineForosh)
                    "
                    label="فروش"
                    class="w-6 h-6 checkbox"
                    :id="`forosh${i}`"
                  />
                  <label :for="`forosh${i}`"
                    >فروش <img src="/check.png"
                  /></label>
                </div>
                <div
                  class="rounded-xl flex py-2 px-4"
                  :class="{ 'opacity-20': !item.isOnlineForosh }"
                  style="
                    background-color: white;
                    border: 1px solid rgba(239, 239, 239, 1);
                  "
                >
                  <div>
                    <div style="color: rgba(202, 191, 159, 1)">قیمت فروش</div>
                    <input
                      type="text"
                      class="w-full outline-none"
                      v-model="item.forosh"
                      :disabled="!item.isOnlineForosh"
                    />
                  </div>
                  <div class="w-4 min-w-4">
                    <img :src="require('@/assets/img/toman-gram.png')" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center">
              <div class="!text-[10px]" style="color: rgba(181, 181, 181, 1)">
                مظنه آنلاین
              </div>
              <div class="text-sm" style="color: rgba(102, 102, 102, 1)">
                {{
                  item?.mazane?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
                ت
              </div>
            </div>
          </div>
        </div>
        <span
          class="w-full h-[1px]"
          style="background-color: rgba(0, 0, 0, 0.05)"
          :key="`item${i}`"
        />
      </template>
    </div>
    <v-btn
      class="rounded-pill"
      color="var(--text-700)"
      outlined
      style="
        position: fixed;
        bottom: 20px;
        background-color: white;
        left: 50%;
        transform: translateX(-50%);
      "
      type="submit"
      width="85%"
      x-large
      @click="updateTrades"
    >
      <v-progress-circular
        v-if="submitLoading"
        color="var(--primary)"
        indeterminate
      />
      ثبت اطلاعات
    </v-btn>
  </div>
</template>

<script>
  export default {
    layout: "users-panel",

    async asyncData({ $axios }) {
      const onlinePrices = await $axios.$get("/online-prices");
      const myTrades = await $axios.$get("/my-trades", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return { onlinePrices, myTrades };
    },

    data() {
      return {
        submitLoading: false,
        trades: [
          {
            title: "18",
            kharid: 0,
            forosh: 0,
            show: false,
            isOnlineKharid: false,
            isOnlineForosh: false,
            mazane: 0,
            onlineKharidTitle: "KHarid18",
            onlineForoshTitle: "Taviz18",
          },
          {
            title: "tamam",
            kharid: 0,
            forosh: 0,
            show: false,
            isOnlineKharid: false,
            isOnlineForosh: false,
            mazane: 0,
            onlineKharidTitle: "Tamam",
            onlineForoshTitle: "Tamam",
          },
          {
            title: "ghadim",
            kharid: 0,
            forosh: 0,
            show: false,
            isOnlineKharid: false,
            isOnlineForosh: false,
            mazane: 0,
            onlineKharidTitle: "Qadim",
            onlineForoshTitle: "Qadim",
          },
          {
            title: "nim",
            kharid: 0,
            forosh: 0,
            show: false,
            isOnlineKharid: false,
            isOnlineForosh: false,
            mazane: 0,
            onlineKharidTitle: "Nim",
            onlineForoshTitle: "Nim",
          },
          {
            title: "rob",
            kharid: 0,
            forosh: 0,
            show: false,
            isOnlineKharid: false,
            isOnlineForosh: false,
            mazane: 0,
            onlineKharidTitle: "Rob",
            onlineForoshTitle: "Rob",
          },
        ],
      };
    },

    mounted() {
      this.myTrades.data.forEach((trade) => {
        switch (trade.title) {
          case "18_buy":
            this.trades[0].kharid = trade.value;
            this.trades[0].isOnlineKharid = trade.is_using_api;
            break;
          case "18_sell":
            this.trades[0].forosh = trade.value;
            this.trades[0].isOnlineForosh = trade.is_using_api;
            break;
          case "complete_sell":
            this.trades[1].forosh = trade.value;
            this.trades[1].isOnlineForosh = trade.is_using_api;
            break;
          case "complete_buy":
            this.trades[1].kharid = trade.value;
            this.trades[1].isOnlineKharid = trade.is_using_api;
            break;
          case "old_sell":
            this.trades[2].forosh = trade.value;
            this.trades[2].isOnlineForosh = trade.is_using_api;
            break;
          case "old_buy":
            this.trades[2].kharid = trade.value;
            this.trades[2].isOnlineKharid = trade.is_using_api;
            break;
          case "half_sell":
            this.trades[3].forosh = trade.value;
            this.trades[3].isOnlineForosh = trade.is_using_api;
            break;
          case "half_buy":
            this.trades[3].kharid = trade.value;
            this.trades[3].isOnlineKharid = trade.is_using_api;
            break;
          case "quarter_sell":
            this.trades[4].forosh = trade.value;
            this.trades[4].isOnlineForosh = trade.is_using_api;
            break;
          case "quarter_buy":
            this.trades[4].kharid = trade.value;
            this.trades[4].isOnlineKharid = trade.is_using_api;
            break;
        }
      });

      this.onlinePrices.forEach((item) => {
        if (item.title === "KHarid18") {
          this.trades[0].mazane = item.value;
        }
        if (item.title === "KHarid18" && !this.trades[0].isOnlineKharid) {
          this.trades[0].kharid = item.value;
          this.trades[0].forosh = item.value;
        } else if (
          item.title === "Kharid18" &&
          !this.trades[0].isOnlineForosh
        ) {
          this.trades[0].forosh = item.value;
        } else if (item.title === "Tamam") {
          this.trades[1].mazane = item.value;
          if (!this.trades[1].isOnlineForosh) {
            this.trades[1].forosh = item.value;
          }
          if (!this.trades[1].isOnlineKharid) {
            this.trades[1].kharid = item.value;
          }
        } else if (item.title === "Qadim") {
          this.trades[2].mazane = item.value;
          if (!this.trades[2].isOnlineForosh) {
            this.trades[2].forosh = item.value;
          }
          if (!this.trades[2].isOnlineKharid) {
            this.trades[2].kharid = item.value;
          }
        } else if (item.title === "Nim") {
          this.trades[3].mazane = item.value;
          if (!this.trades[3].isOnlineForosh) {
            this.trades[3].forosh = item.value;
          }
          if (!this.trades[3].isOnlineKharid) {
            this.trades[3].kharid = item.value;
          }
        } else if (item.title === "Rob") {
          this.trades[4].mazane = item.value;
          if (!this.trades[4].isOnlineForosh) {
            this.trades[4].forosh = item.value;
          }
          if (!this.trades[4].isOnlineKharid) {
            this.trades[4].kharid = item.value;
          }
        }
      });
    },

    methods: {
      tradeName(name) {
        switch (name) {
          case "18":
            return "طلا/گرم";
          case "tamam":
            return "سکه تمام";
          case "ghadim":
            return "سکه قدیم";
          case "nim":
            return "نیم سکه";
          case "rob":
            return "ربع سکه";
        }
      },

      async updateTrades() {
        const body = [
          {
            title: "18_sell",
            value: this.trades[0].forosh,
            is_using_api: this.trades[0].isOnlineForosh,
          },
          {
            title: "18_buy",
            value: this.trades[0].kharid,
            is_using_api: this.trades[0].isOnlineKharid,
          },
          {
            title: "complete_buy",
            value: this.trades[1].kharid,
            is_using_api: this.trades[1].isOnlineKharid,
          },
          {
            title: "complete_sell",
            value: this.trades[1].forosh,
            is_using_api: this.trades[1].isOnlineForosh,
          },
          {
            title: "old_sell",
            value: this.trades[2].forosh,
            is_using_api: this.trades[2].isOnlineForosh,
          },
          {
            title: "old_buy",
            value: this.trades[2].kharid,
            is_using_api: this.trades[2].isOnlineKharid,
          },
          {
            title: "half_sell",
            value: this.trades[3].forosh,
            is_using_api: this.trades[3].isOnlineForosh,
          },
          {
            title: "half_buy",
            value: this.trades[3].kharid,
            is_using_api: this.trades[3].isOnlineKharid,
          },
          {
            title: "quarter_sell",
            value: this.trades[4].forosh,
            is_using_api: this.trades[4].isOnlineForosh,
          },
          {
            title: "quarter_buy",
            value: this.trades[4].kharid,
            is_using_api: this.trades[4].isOnlineKharid,
          },
        ];
        const res = await this.$axios.$post(
          "/trades",
          { data: body },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        );
        if (res.msg === "Trades updated.") {
          this.$router.push("/panel/trades");
        }
      },

      updateOnlinePrice(index, type, status) {
        if (status) {
          if (index === 0) {
            if (type === "kharid") {
              this.trades[0].kharid = this.onlinePrices[2].value;
            } else {
              this.trades[0].forosh = this.onlinePrices[0].value;
            }
          } else if (index === 1) {
            if (type === "kharid") {
              this.trades[1].kharid = this.onlinePrices[3].value;
            } else {
              this.trades[1].forosh = this.onlinePrices[3].value;
            }
          } else if (index === 2) {
            if (type === "kharid") {
              this.trades[2].kharid = this.onlinePrices[4].value;
            } else {
              this.trades[2].forosh = this.onlinePrices[4].value;
            }
          } else if (index === 3) {
            if (type === "kharid") {
              this.trades[3].kharid = this.onlinePrices[5].value;
            } else {
              this.trades[3].forosh = this.onlinePrices[5].value;
            }
          } else if (index === 4) {
            if (type === "kharid") {
              this.trades[4].kharid = this.onlinePrices[6].value;
            } else {
              this.trades[4].forosh = this.onlinePrices[6].value;
            }
          }
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  .inputs {
    label {
      display: inline-block;
      cursor: pointer;
      position: relative;
      padding-right: 35px;
      margin-left: 8px;

      &::before {
        content: "";
        display: inline-block;
        width: 24px;
        height: 24px;
        border-radius: 8px;
        margin-left: 10px;
        position: absolute;
        right: 0;
        bottom: 0px;
        background-color: inherit;
        border: 1.5px solid #424038;
      }

      img {
        display: none;
        position: absolute;
        right: 5px;
        bottom: 6px;
      }
    }

    input[type="checkbox"] {
      display: none;
    }

    .checkbox label:before {
      border-radius: 3px;
    }

    input[type="checkbox"]:checked + label img {
      display: block;
    }

    input[type="checkbox"]:checked + label:before {
      content: "";
      font-size: 10px;
      font-weight: 900;
      color: #fff;
      text-align: center;
      line-height: 12px;
      padding-top: 2px;
      background-color: #424038;
    }
  }
</style>
