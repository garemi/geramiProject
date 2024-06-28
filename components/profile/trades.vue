<template>
  <div class="mx-4 pb-16">
    <v-row class="mt-7">
      <v-col v-if="userId === $store.state.userData.id" cols="12">
        <NuxtLink
          to="/panel/edit-trades"
          class="d-flex gap-2 align-center !text-black"
        >
          <div class="font-weight-medium">اعمال قیمت</div>
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1.06066"
              y="16.9706"
              width="22.5"
              height="22.5"
              rx="5.25"
              transform="rotate(-45 1.06066 16.9706)"
              stroke="#CABF9F"
              stroke-width="1.5"
            />
            <path
              d="M18.5458 10.7071C18.9363 10.3166 19.5695 10.3166 19.96 10.7071L21.3742 12.1213C21.7648 12.5118 21.7648 13.145 21.3742 13.5355L13.8441 21.0657C13.6836 21.2262 13.4731 21.3274 13.2474 21.3524L11.6565 21.5292C11.0195 21.6 10.4814 21.0618 10.5521 20.4249L10.7289 18.8339C10.754 18.6082 10.8551 18.3978 11.0157 18.2372L18.5458 10.7071Z"
              fill="#CABF9F"
            />
            <rect
              x="17.8389"
              y="11.4143"
              width="4"
              height="2"
              transform="rotate(45 17.8389 11.4143)"
              fill="#FBFAF8"
            />
            <path
              d="M16.041 20.7908H21.041"
              stroke="#CABF9F"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </NuxtLink>
      </v-col>
      <elements-price1
        v-for="(trade, index) in trades"
        v-show="trade.buy && trade.sell"
        :key="`trade${index}`"
        :buy_price="trade.buy?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :sell_price="
          trade.sell?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        "
        :title="trade.title"
      />
    </v-row>
  </div>
</template>
<script>
  import services from "@/services";

  export default {
    props: {
      userId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        loading: false,
        saves: [],
        trades: [
          {
            title: "طلا/گرم",
            buy: 0,
            sell: 0,
          },
          {
            title: "سکه تمام",
            buy: 0,
            sell: 0,
          },
          {
            title: "سکه قدیم",
            buy: 0,
            sell: 0,
          },
          {
            title: "نیم سکه",
            buy: 0,
            sell: 0,
          },
          {
            title: "ربع سکه",
            buy: 0,
            sell: 0,
          },
        ],
      };
    },
    methods: {
      async getSaves() {
        this.loading = true;
        const res = await this.$axios.$get("/my-trades", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        res.data.forEach((trade) => {
          switch (trade.title) {
            case "18_buy":
              this.trades[0].buy = trade.value;
              break;
            case "18_sell":
              this.trades[0].sell = trade.value;
              break;
            case "complete_sell":
              this.trades[1].sell = trade.value;
              break;
            case "complete_buy":
              this.trades[1].buy = trade.value;
              break;
            case "old_sell":
              this.trades[2].sell = trade.value;
              break;
            case "old_buy":
              this.trades[2].buy = trade.value;
              break;
            case "half_sell":
              this.trades[3].sell = trade.value;
              break;
            case "half_buy":
              this.trades[3].buy = trade.value;
              break;
            case "quarter_sell":
              this.trades[4].sell = trade.value;
              break;
            case "quarter_buy":
              this.trades[4].buy = trade.value;
              break;
          }
        });
        this.loading = false;
      },
    },
    mounted() {
      this.getSaves();
    },
  };
</script>
