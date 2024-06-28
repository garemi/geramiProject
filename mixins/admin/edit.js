import services from "@/services";
import { showError, showMessage } from "@/constants/messages";
import { formGetPrepare } from "@/constants/PanelFormHandler";

export const adminEdit = {
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
        (obj, currentKey, _, arr) => ({
          ...obj,
          [currentKey]: arr[currentKey]?.initModelValue ?? "",
        }),
        {},
      );

      this.$set(this, "model", model);
    },
    async getData(onComplete = () => {}) {
      if (!this.loading) this.loading = true;

      try {
        const response = await services[this.service].get(
          this.$route.params.id ?? this.$route.params.slug,
          {
            noPaginate: true,
          },
        );

        formGetPrepare(response, this.model);

        onComplete(response);
      } catch (error) {
        console.log("error in edit getData", error);
        showError(error);
      } finally {
        this.loading = false;
      }
    },
    async edit(data) {
      try {
        if (!this.$refs.form.validate()) throw 600;

        this.loading = true;

        await services[this.service].update(
          data,
          this.$route.params.id ?? this.$route.params.slug,
        );

        showMessage(1006);

        this.$router.go(-1);
        this.loading = false;
      } catch (error) {
        console.log("error in edit page", error?.response || error);
        showError(error);
        this.loading = false;
      }
    },
  },
};
