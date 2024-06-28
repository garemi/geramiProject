<template>
  <div>
    <admin-panel-drawer-mobile ref="mainDrawer" />
    <v-app-bar dark class="custom-gradient">
      <v-btn icon @click="$refs.mainDrawer.toggle()" :dark="dark">
        <v-icon color="black"> mdi-menu </v-icon>
      </v-btn>
      <v-spacer />

      <!-- <notifications-btn
        @onShowNotificationsModal="$emit('onShowNotificationsModal')"
      /> -->
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        show: false,
      };
    },
    watch: {},
    methods: {
      onExit() {
        this.$store.commit("exit");
        this.$router.replace("/");
      },
      toggle: function () {
        this.show = !this.show;
      },
      navigateTo: function (name) {
        this.$router.push({ path: name });
      },
      exit: function () {
        this.$store.commit("exit");
        this.$router.replace("/");
      },
      openEditProfilePage: function () {
        if (
          this.$store.state?.userData?.roleName === "hotelowner" ||
          this.$store.state?.userData?.roleName === "broker"
        )
          this.$router.push({
            path:
              "/admin/" +
              this.$store.state?.userData?.roleName +
              "s/edit/" +
              this.$store.state?.userData?.agency.id,
          });
        else
          this.$router.push({
            path: "/admin/users/edit/" + this.$store.state?.userData?.id,
          });
      },
    },
    mounted() {
      this.$root.$on("toggleDrawer", () => {
        this.toggle();
      });
    },
    props: {
      dark: {
        type: Boolean,
        default: false,
      },
      menuClass: {
        type: String,
        default: "mt-15",
      },
    },
  };
</script>
<style scoped lang="scss">
  .custom-gradient {
    background: var(--dark-cream) !important;
  }
</style>
