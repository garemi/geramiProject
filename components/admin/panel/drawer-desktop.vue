<template>
  <v-card height="100vh" class="custom-shadow">
    <v-navigation-drawer permanent width="100%" v-model="show">
      <v-row no-gutters class="fill-height">
        <v-navigation-drawer
          class="main-drawer"
          color="black"
          mini-variant
          mini-variant-width="56"
          right
          permanent
        >
          <v-list dense nav>
            <!-- <notifications-btn
                @onShowNotificationsModal="onShowNotificationsModal"
              />
              <v-divider dark class="my-1 mb-3 black" /> -->
            <v-tooltip
              v-for="(item, i) in categories"
              :key="'main-drawer' + i"
              left
              color="black"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-list-item
                  @click="selectedCategory = item"
                  v-bind="attrs"
                  v-on="on"
                  class="list-item"
                  :class="
                    selectedCategory == item
                      ? 'custom-shadow selected black--text'
                      : 'black--text not-selected'
                  "
                >
                  <v-list-item-content>
                    <v-icon
                      :class="
                        selectedCategory == item ? 'selected-icon' : 'black--text',
                      "
                    >
                      {{ mainItems[item].icon }}
                    </v-icon>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <small>{{ mainItems[item].title }}</small>
            </v-tooltip>
            <!-- <v-tooltip left color="black">
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item
                    @click="$router.push('/')"
                    v-bind="attrs"
                    v-on="on"
                    class="not-selected"
                  >
                    <v-list-item-content>
                      <v-icon>mdi-eye</v-icon>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <small>مشاهده سایت</small>
              </v-tooltip> -->
            <v-tooltip left color="black">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item
                  @click="exit"
                  v-bind="attrs"
                  v-on="on"
                  class="not-selected list-item"
                >
                  <v-list-item-content>
                    <v-icon color="black"> mdi-power </v-icon>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <small>خروج از پنل کاربری</small>
            </v-tooltip>
          </v-list>
        </v-navigation-drawer>

        <v-list
          v-if="selectedCategory"
          dense
          class="grow list-color position-relative transition_pos_absolute"
          color="black"
        >
          <transition name="fade">
            <span :key="selectedCategory">
              <div
                v-for="item in mainItems[selectedCategory].items"
                :key="item.title"
                link
                class="list-color-item list-item d-flex align-center pa-2 cursor-pointer"
                @click="navigateTo(item.path)"
                :class="{
                  'custom-shadow selected grey--text mx-2':
                    selectedPath.includes(item.path),
                }"
              >
                <v-icon
                  :class="
                    selectedPath.includes(item.path)
                      ? 'selected-icon'
                      : 'black--text'
                  "
                >
                  {{ item.icon }}
                </v-icon>

                <small
                  class="ms-1"
                  :class="{
                    'selected-icon': selectedPath.includes(item.path),
                  }"
                >
                  {{ item.title }}
                </small>
              </div>
            </span>
          </transition>
          <div class="version-div">
            <small>
              {{ "v" + version }}
            </small>
          </div>
        </v-list>
      </v-row>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  import { PanelChildrens } from "/constants/Pages";
  export default {
    name: "Drawer",
    data: function () {
      let mainItems = { ...PanelChildrens };

      let selectedCategory = null;

      Object.keys(PanelChildrens).forEach((key) => {
        let items = mainItems[key].items.filter((val) =>
          val.roles.includes(this.$store.state.userData?.roleName),
        );
        if (items.length) mainItems[key].items = items;
        else delete mainItems[key];

        const category = mainItems[key];
        const found = category?.items?.find(
          (category) => category?.path == this.$route?.path,
        );
        if (found) selectedCategory = key;
      });

      selectedCategory = selectedCategory
        ? selectedCategory
        : Object.keys(mainItems)[0] || "";

      const categories = Object.keys(mainItems);
      return {
        show: false,
        iconItems: [{ title: "پنل اصلی", icon: "mdi-home" }],
        mainItems,
        categories,
        selectedCategory,
      };
    },
    computed: {
      selectedPath() {
        return this.$route?.path || "";
      },
      version() {
        return process.env.VERSION;
      },
    },
    methods: {
      toggle: function () {
        this.show = !this.show;
      },
      navigateTo: function (name) {
        this.$router.push({ path: name });
      },
      exit: function () {
        this.logoutLoading = true;
        this.$store.commit("exit");
        this.$router.replace("/admin/login");
      },
      onShowNotificationsModal() {
        this.$emit("openNotificationsDialog");
      },
    },
  };
</script>

<style scoped lang="scss">
  .main-drawer {
    background: var(--nescafe-color);
    background: -webkit-linear-gradient(
      to bottom,
      var(--dark-cream),
      var(--nescafe-color)
    );
    background: linear-gradient(
      to bottom,
      var(--dark-cream),
      var(--nescafe-color)
    );
  }

  .list-item {
    transition: all 0.4s ease-in-out;
  }

  .list-color {
    background: var(--dark-cream) !important;

    &-item {
      margin: 4px 0;
    }
  }

  .selected {
    background-color: black;
    border-radius: 4px;
  }

  .selected-icon {
    color: var(--dark-cream);
  }

  .v-list-item--link:before {
    margin-right: 8px;
    margin-left: 8px;
    border-radius: 4px;
  }

  .not-selected {
    &:before {
      margin-right: 0;
      margin-left: 0;
      border-radius: 4px;
    }
  }

  .v-list-item--dense .v-list-item__icon,
  .v-list--dense .v-list-item .v-list-item__icon {
    margin-left: 2px;
  }

  .transition_pos_absolute > * {
    left: 0;
    right: 0;
  }
</style>
