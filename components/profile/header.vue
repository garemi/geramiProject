<template>
  <div class="mx-3 mb-7">
    <slot>
      <user-profile-info
        isMine
        :editable="editable"
        :user="$store.state.userData || {}"
      />
    </slot>
    <v-row align="center" justify="center">
      <v-col
        v-for="(item, i) in items"
        :key="'profile-item' + i"
        class="text-center position-relative"
        cols="3"
        @click="$router.push(item.path)"
      >
        <span
          v-if="item.badgeText"
          class="white--text"
          :class="item.badgeClasses"
        >
          <small class="text-12">{{ item.badgeText }}</small>
        </span>
        <div
          class="bg-warning box-1 pa-3"
          :class="{ black: $route.path == item.path }"
        >
          <v-img
            :src="item.icon"
            style=""
            :class="{ 'selected-icon': $route.path == item.path }"
          ></v-img>
        </div>
        <small style="color: #908d85">{{ item.title }}</small>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
      editable: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style scoped>
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
    height: 22px;
    width: 22px;
    text-align: center;
    z-index: 10;
  }
</style>
