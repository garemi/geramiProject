<template>
  <v-card class="custom-shadow">
    <v-card-text>
      <v-row no-gutters align="center">
        <v-col
          v-for="(item, i) in schema"
          :key="'dashboard' + i"
          v-bind="
            item.type === 'divider'
              ? { cols: '12' }
              : { cols: '12', sm: '6', md: '4' }
          "
        >
          <v-form-divider
            v-if="item.type === 'divider'"
            :title="item.title || ''"
          />
          <admin-dashboard-item
            v-else
            v-bind="item"
            :loading="loading"
            :data="data"
            defaultColor="var(--secondary)"
          />
        </v-col>
        <v-col cols="12" class="d-flex">
          <v-row v-if="loading" no-gutters>
            <v-col v-for="(_, i) in 4" :key="i" cols="6" md="4" lg="3">
              <v-skeleton-loader type="image" class="elevation-0 ma-1" />
            </v-col>
          </v-row>
          <v-row v-else no-gutters>
            <v-col
              v-for="(user, i) in data.top_10_users"
              :key="i"
              cols="6"
              md="4"
              lg="3"
            >
              <v-card
                class="text-center ma-1 border-box rounded position-relative"
                outlined
                elevation="0"
              >
                <v-card-text>
                  <v-avatar size="50%">
                    <v-img
                      :aspect-ratio="1 / 1"
                      :src="
                        user.avatar?.url ?? require('@/assets/img/default.jpg')
                      "
                      class="offline-user-img img-border"
                    />
                  </v-avatar>
                  <h3 class="mt-4 black--text">{{ user.full_name }}</h3>
                  <h5 class="mt-2 black--text">
                    با {{ user.success_reservation_count }} رزرو موفق
                  </h5>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import { Constants } from "@/constants/GlobalConstants";
  import VianaAxios from "@/constants/VianaAxios";
  import services from "@/services";

  export default {
    name: "dashboard",
    layout: "admin-panel",
    middleware: "authenticated",
    data() {
      return {
        dialog: false,
        role: this.$store.state.userData?.roleName,
        loading: false,
        data: {},
        schema: [
          {
            type: "divider",
            title: "درآمد",
          },
          {
            title: "درآمد امروز",
            keyVal: "today_payments",
            postfix: "تومان",
            link: "",
            btnTitle: "",
            valueEvalStr: "new Intl.NumberFormat().format({value})",
          },
          {
            title: "درآمد این ماه",
            keyVal: "month_payments",
            postfix: "تومان",
            link: "",
            btnTitle: "",
            valueEvalStr: "new Intl.NumberFormat().format({value})",
          },
          {
            title: "درآمد کل",
            keyVal: "total_payments",
            postfix: "تومان",
            link: "",
            btnTitle: "",
            valueEvalStr: "new Intl.NumberFormat().format({value})",
          },
          {
            type: "divider",
            title: "آگهی ها",
          },
          {
            title: "جدید ترین آگهی ها",
            keyVal: "today_users_count",
            link: "/admin/products",
            btnTitle: "",
          },
          {
            title: "آگهی های کاربران اشتراکی",
            keyVal: "month_users_count",
            link: "/admin/products?type=user",
            btnTitle: "",
          },
          {
            title: "آگهی مغازه دار ها",
            keyVal: "total_users_count",
            link: "/admin/products?type=seller",
            btnTitle: "",
          },
          {
            type: "divider",
            title: "کاربران",
          },
          {
            title: "کاربران جدید",
            keyVal: "today_users_count",
            link: "/admin/products",
          },
          {
            title: "کاربران مغازه دار",
            keyVal: "month_users_count",
            link: "/admin/products?type=seller",
          },
          {
            title: "کاربران فعال",
            keyVal: "total_users_count",
            link: "/admin/products?type=user",
          },
          {
            type: "divider",
            title: "پیام ها",
          },
          {
            title: "پیام های خوانده نشده",
            keyVal: "today_users_count",
            link: "",
            btnTitle: "",
          },
          {
            title: "پیام های مغازه دار ها",
            keyVal: "month_users_count",
            link: "",
            btnTitle: "",
          },
          {
            title: "تمامی پیام ها",
            keyVal: "total_users_count",
            link: "",
            btnTitle: "",
          },
        ],
      };
    },
    mounted() {
      this.GetList();
    },
    methods: {
      GetList: function (
        page = this.$route.query?.page ? +this.$route.query?.page : 1,
      ) {
        if (!this.loading) this.loading = true;
        services.dashboard
          .getAdmin()
          .then((response) => {
            this.loading = false;
            this.data = response.data;
          })
          .catch((error) => {
            this.loading = false;
            console.log("items", error.response);
          });
      },
    },
  };
</script>

<style scoped>
  .bg-login {
    background: #ffffff;
  }
</style>
