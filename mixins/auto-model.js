// use "model" as the variable you want to set as v-model inside your components

export const autoModel = {
  props: {
    value: {
      required: true,
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
