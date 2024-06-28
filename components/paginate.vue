<template>
  <v-pagination
    v-if="length > 1"
    v-model="page"
    :color="color"
    :length="length"
    total-visible="7"
    class="pagination"
  />
</template>

<script>
  export default {
    props: {
      value: {
        // v-model instance
        type: Number,
        required: true,
      },
      length: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        default: "var(--dark-purple)",
      },
    },
    computed: {
      page: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit("input", value);
          this.$emit("onChange", value);
        },
      },
    },
  };
</script>

<style>
  .pagination {
    margin: 10px auto 0 auto;
    max-width: 400px;
  }
  .v-pagination__item {
    /* padding: 5px !important; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 2px;

    font-size: 20px;
  }
  .v-pagination > li button {
    box-shadow: none !important;
    font-size: large;
    text-align: center;
    border-radius: 100%;
    text-align: center;
    color: var(--primary) !important;
    background-color: transparent !important;
    /* border: 2px solid var(--secondary); */
  }

  .theme--light.v-pagination .v-pagination__item {
    color: black !important;
    background-color: var(--dark-purple) !important;
    transform: scale(0.7);
    transition: transform 0.2s;
  }

  .theme--light.v-pagination .v-pagination__item--active {
    color: black !important;
    background: linear-gradient(var(--beige), var(--beige)) !important;
    font-size: 20px;
    transform: scale(1);
    transition: transform 0.2s;
  }
  /* 
  .theme--light.v-pagination .v-pagination__navigation--disabled {
    border: 2px solid var(--);
  } */
</style>
