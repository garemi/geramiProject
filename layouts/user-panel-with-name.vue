<template>
  <client-only>
    <v-app>
      <v-main class="default-main">
        <confirm-dialog>
          <div class="max-width">
            <profile-header :items="items" editable />
            <v-divider />
            <nuxt />
            <user-bottom-navigation />
          </div>
        </confirm-dialog>
      </v-main>
    </v-app>
  </client-only>
</template>

<script>
  export default {
    middleware: "authenticated",
    data() {
      return {
        posts: 0,
      };
    },
    computed: {
      items() {
        if (this.$store.state.userData.role === "user") {
          return [
            {
              path: "/panel",
              title: "اطلاعات",
              icon: require("@/assets/img/info.svg"),
            },
            {
              path: "/panel/my-ads",
              title: "پست ها",
              badgeText: this.posts,
              badgeClasses: "badge-1",
              icon: require("@/assets/img/properties-count.svg"),
            },
            {
              path: "/panel/comments",
              title: "نظر",
              badgeText: this.$store.state?.userData?.rate,
              badgeClasses: "badge-1 badge-1-golden",
              icon: require("@/assets/img/reviews-count-icon.svg"),
            },
          ];
        } else {
          return [
            {
              path: "/panel",
              title: "اطلاعات",
              icon: require("@/assets/img/info.svg"),
            },
            {
              path: "/panel/my-ads",
              title: "پست ها",
              badgeText: "4",
              badgeClasses: "badge-1",
              icon: require("@/assets/img/properties-count.svg"),
            },
            {
              path: "/panel/trades",
              title: "معامله",
              icon: require("@/assets/img/exchange.svg"),
            },
            {
              path: "/panel/comments",
              title: "نظر",
              badgeText: "4.2",
              badgeClasses: "badge-1 badge-1-golden",
              icon: require("@/assets/img/reviews-count-icon.svg"),
            },
          ];
        }
      },
    },
    mounted() {
      this.getMyItems();
    },
    methods: {
      openDialog() {
        this.showDialog = true;
      },
      closeDialog() {
        this.showDialog = true;
      },
      logout() {
        this.$store.commit("exit");
        localStorage.removeItem("token");
        localStorage.removeItem("jewerly");
        this.$router.replace("/login");
      },
      async getMyItems() {
        const res = await this.$axios.$get("/posts/my", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        this.posts = res.data.length;
      },
    },
  };
</script>

<style scoped>
  .default-main {
    background-color: var(--background);
  }

  .circular-chip {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--light-red);
    color: red;
  }

  .box-1 {
    height: 50px;
    width: 50px;
    background: #f1f0ec;
    border-radius: 10px;
    margin: auto;
  }

  .selected-icon {
    filter: brightness(0) invert(1);
  }

  .badge-1-golden {
    background-color: #d9ba4b !important;
  }

  .badge-1 {
    background-color: rgb(66, 64, 56);
    border-color: rgb(66, 64, 56);
    position: absolute;
    top: 2px;
    left: 55px;
    border-radius: 5px;
    height: 20px;
    width: 20px;
    text-align: center;
  }
</style>
