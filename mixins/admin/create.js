import services from "@/services";
import { showError, showMessage } from "@/constants/messages";

export const adminCreate = {
  layout: "admin-panel",
  middleware: "authenticated",
  data() {
    return {
      loading: false,
      model: {},
      rowAttribute: {
        justify: "start",
        align: "start",
        noGutters: false,
      },
    };
  },
  created() {
    this.makeModel();
  },
  methods: {
    makeModel() {
      const model = Object.keys(this.schema).reduce(
        (obj, currentKey) => ({
          ...obj,
          [currentKey]: this.schema[currentKey]?.initModelValue ?? "",
        }),
        {},
      );

      this.$set(this, "model", model);
    },
    async create(data) {
      if (!data) return;

      try {
        if (!services[this.service]) throw 628;

        if (!this.$refs.form.validate()) throw 600;

        this.loading = true;

        await services[this.service].create(data);

        this.loading = false;
        this.$router.go(-1);

        showMessage(1004);
      } catch (error) {
        if (
          error?.response?.data?.message?.toLowerCase()?.includes("duplicate")
        )
          showError(621);
        else showError(error);

        this.loading = false;
      }
    },
  },
};
