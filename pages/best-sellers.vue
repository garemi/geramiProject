<template>
  <div class="pt-12 pb-32 px-6 flex flex-col gap-6 relative">
    <common-sub-header title="فروش سریع" />
    <div class="flex gap-2 flex-wrap">
      <div
        v-for="item in categories"
        :key="item.name"
        @click="(category = item.name), updateList()"
        class="text-xs px-2 py-1 font-bold rounded-full"
        :style="
          category === item.name
            ? 'background-color:rgba(66, 64, 56, 1); color: white; border: 1px solid inherit'
            : 'border: 1px solid rgba(66, 64, 56, 1); color:rgba(66, 64, 56, 1)'
        "
      >
        {{ item.title }}
      </div>
    </div>
    <div
      v-if="loading"
      class="flex justify-center h-[calc(100vh-400px)] items-center"
    >
      <v-progress-circular indeterminate />
    </div>
    <div v-else>
      <ElementsSeller
        v-for="seller in sellers"
        :key="seller.user.id"
        :name="
          seller.user.shop_name ||
          seller.user.first_name + ' ' + seller.user.last_name
        "
        :image="seller.user.image"
        :address="seller.user.shop_address || seller.user.address"
        :sell_price="seller.sell.value"
        :buy_price="seller.value"
        :id="seller.user.id"
      />
    </div>
    <v-btn
      class="rounded-pill"
      v-if="$store.state.userData.role === 'seller'"
      outlined
      style="
        position: fixed;
        bottom: 24px;
        background-color: rgba(47, 47, 47, 1);
        right: 24px;
      "
      type="submit"
      width="163px"
      x-large
      @click="updateTrades"
    >
      <Nuxt-link
        to="/panel/edit-trades"
        class="flex gap-3 items-center !text-white"
      >
        <span class="font-light text-lg mt-1"> + </span>
        <span class="text-sm"> پیشنهاد جدید </span>
      </Nuxt-link>
    </v-btn>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        category: "gold",
        categories: [
          { name: "gold", title: "طلا" },
          { name: "complete-coin", title: "سکه تمام" },
          { name: "old-coin", title: "سکه قدیم" },
          { name: "half-coin", title: "نیم سکه" },
          { name: "quarter-coin", title: "ربع سکه" },
        ],
        sellers: [],
        loading: false,
      };
    },

    methods: {
      async updateList() {
        this.loading = true;
        const res = await this.$axios.$get(
          `/trades/best?category=${this.category}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        );
        console.log(res);
        this.sellers = res.data;
        this.loading = false;
      },
    },

    mounted() {
      this.updateList();
    },
  };
</script>
