<template>
  <span>
    <p>{{ title }}</p>
    <v-range-slider
      v-model="range"
      :max="max"
      :min="min"
      class="align-center custom-slider my-4"
      color="black"
      hide-details
      track-color="#EAEAEA"
      track-fill-color="#424038"
    >
    </v-range-slider>
    <span class="d-flex align-center justify-space-between">
      <p class="md-text" @change="$set(range, 0, $event)">
        از {{ new Intl.NumberFormat().format(range[0]) || "-" }} {{ unit }}
      </p>
      <p class="md-text" @change="$set(range, 0, $event)">
        از {{ new Intl.NumberFormat().format(range[1]) || "-" }} {{ unit }}
      </p>
    </span>
  </span>
</template>
<script>
  export default {
    props: {
      max: {
        type: Number,
        required: true,
      },
      min: {
        type: Number,
        required: true,
      },
      range: {
        type: Array,
        required: true,
      },
      title: {
        type: String,
        default: "",
      },
      unit: {
        type: String,
        default: "تومان",
      },
    },
  };
</script>
<style>
  .custom-slider .v-slider__track-container {
    height: 40px !important;
    border-radius: 15px !important;
  }

  .custom-slider .primary {
    background-color: var(--text-700) !important;
  }

  .custom-slider .primary.lighten-3 {
    background-color: var(--medium-gray) !important;
  }

  .custom-slider .v-slider__thumb {
    width: 5px !important;
    height: 18px !important;
    background-color: white !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
    border-radius: 10px !important;
  }

  .custom-slider .v-slider__thumb-container:first-child .v-slider__thumb {
    right: 10px !important;
  }

  .custom-slider .v-slider__thumb-container:last-child .v-slider__thumb {
    margin-left: 10px !important;
  }

  .custom-slider .v-slider__thumb::after,
  .custom-slider .v-slider__thumb::before {
    display: none !important;
  }
</style>
