import services from "@/services";
import { getErrorText } from "@/constants/VianaAxios";

export const adminFetch = {
  created() {
    if (this.skipAutoRequests) return;

    Object.keys(this.schema)
      .filter(
        (key) =>
          key != "model_id" &&
          key != "parent_id" &&
          key.includes("_id") &&
          !this.schema[key].noFetch,
      )
      .forEach((key) => this._getItems(key, key.replaceAll("_id", "")));
  },
  methods: {
    async _getItems(key, service, params = {}, method = "get") {
      if (!services[service] || !services[service][method]) {
        this.$toast.error(`${getErrorText(628)} | ${key} | ${service}`);
        return;
      }

      try {
        if (!this.schema[key]?.loading) this.schema[key].loading = true;

        const response = await services[service][method](null, {
          noPaginate: true,
          ...params,
        });
        this.schema[key].items = response.data;
        this.schema[key].loading = false;
      } catch (error) {
        console.log("error in _getItems", key, service);
        this.schema[key].loading = false;
      }
    },
  },
};
