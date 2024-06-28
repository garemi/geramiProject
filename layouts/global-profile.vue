<template>
  <client-only>
    <v-app>
      <v-main class="default-main">
        <confirm-dialog>
          <div class="max-width">
            <common-sub-header
              :title="
                user.role === 'seller'
                  ? 'پروفایل مغازه دار'
                  : user.role === 'user'
                  ? 'پروفایل فروشنده'
                  : ''
              "
              class="mx-3"
            />
            <profile-header :items="items">
              <v-skeleton-loader v-if="loading" type="card" />

              <template v-else>
                <user-profile-info :user="user" :loading="loading" />
                <v-btn
                  block
                  outlined
                  @click="createChat"
                  class="rounded-pill mb-10 py-5"
                >
                  <v-img
                    :src="require('@/assets/img/message.svg')"
                    max-width="20px"
                    contain
                    class="ml-1"
                  />
                  <span v-if="user.role === 'user'"> چت با فروشنده </span>
                  <span v-else> چت با مغازه دار </span>
                </v-btn>
              </template>
            </profile-header>
            <v-divider />

            <v-container>
              <nuxt :nuxt-child-key="user" />
            </v-container>

            <user-bottom-navigation />
          </div>
        </confirm-dialog>
      </v-main>
    </v-app>
  </client-only>
</template>

<script>
  import services from "@/services";
  export default {
    middleware: "authenticated",
    data() {
      return {
        loading: true,
        user: {},
        items: [],
      };
    },
    mounted() {
      this.getUser();
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
      async getUser() {
        this.loading = true;
        const res = await this.$axios.$get(`/users/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const posts = await this.$axios.$get(
          `posts/user/${this.$route.params.id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        );
        this.user = res.data;
        if (this.user.role == "seller")
          this.items = [
            {
              path: `/profile/${this.$route.params.id}`,
              title: "اطلاعات",
              icon: require("@/assets/img/info.svg"),
            },
            {
              path: `/profile/${this.$route.params.id}/properties`,
              title: "پست ها",
              badgeText: "4",
              badgeClasses: "badge-1",
              icon: require("@/assets/img/properties-count.svg"),
            },
            {
              path: `/profile/${this.$route.params.id}/trades`,
              title: "معامله",
              icon: require("@/assets/img/exchange.svg"),
            },
            {
              path: `/profile/${this.$route.params.id}/comments`,
              title: "نظر",
              badgeText: this.user.rate,
              badgeClasses: "badge-1 badge-1-golden",
              icon: require("@/assets/img/reviews-count-icon.svg"),
            },
          ];
        else
          this.items = [
            {
              path: `/profile/${this.$route.params.id}/properties`,
              title: "پست ها",
              badgeText: posts.data.length,
              badgeClasses: "badge-1",
              icon: require("@/assets/img/properties-count.svg"),
            },
            {
              path: `/profile/${this.$route.params.id}/comments`,
              title: "نظر",
              badgeText: this.user.rate,
              badgeClasses: "badge-1 badge-1-golden",
              icon: require("@/assets/img/reviews-count-icon.svg"),
            },
          ];
        this.loading = false;
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
