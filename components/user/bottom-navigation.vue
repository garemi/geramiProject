<template>
  <v-row
    class="rounded-xl align-center justify-center bg-gradiant mt-5 mx-auto navigation-container"
    no-gutters
  >
    <v-col
      v-for="(item, index) in items"
      :key="index"
      class="pa-1"
      cols="4"
      style="height: 100%"
    >
      <v-btn
        :ripple="false"
        :to="item.link"
        active-class="black-bg"
        class="d-flex align-center"
        elevation="0"
        plain
        style="width: 100%; height: 100%"
      >
        <span style="width: 20px">
          <v-img
            :src="require(`@/assets/img/${item.url}`)"
            width="100%"
          ></v-img>
        </span>
        <p
          v-if="$route.path.includes(item.link)"
          class="md-text mt-1 pr-1"
          style="color: #fff"
        >
          {{ item.title }}
        </p>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    data() {
      return {
        items: [
          {
            title: "خانه",
            link: "/",
            url: "Add.svg",
          },
          {
            title: "ایجاد",
            link: "/property/submit",
            url: "Group_19.svg",
          },
          {
            title: "پروفایل",
            link: "/panel",
            url: "Frame_144.svg",
          },
        ],
      };
    },
    methods: {},
    mounted() {},
  };
</script>
<style scoped>
  .bg-gradiant {
    background: linear-gradient(269deg, #908d85 8.04%, #424038 99.75%);
  }

  .black-bg {
    border-radius: 2rem;
    background-color: black;
  }

  .navigation-container {
    transform: translate(50%);
    height: 52px;
    position: fixed;
    bottom: 24px;
    z-index: 400;
    width: 90%;
    max-width: var(--global-max-width);
    right: 50%;
  }
</style>
