import services from "@/services";
import { removeLastSlash } from "@/constants/CustomFunctions/String";
import { showError, showMessage } from "@/constants/messages";

export const adminIndex = {
  layout: "admin-panel",
  middleware: "authenticated",
  inject: ["getConfirmation"],
  data() {
    return {
      destinationRoute: removeLastSlash(this.$route.path),
      loading: true,
      items: [],
      page: 1,
      pagesLength: 1,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    onEditClick(item, key = "id") {
      this.$router.push(
        this.localeLocation({
          path: `${this.destinationRoute}/edit/${item[key]}`,
        }),
      );
    },
    onDeleteClick(item, key = "id") {
      this.getConfirmation(
        `آیا مایل به حذف این مورد هستید؟`,
        item,
        async () => {
          try {
            if (!this.loading) this.loading = true;

            await services[this.service].destroy(item[key]);

            showMessage(1005);
            this.getList();
          } catch (error) {
            showError(error);
            this.loading = false;
          }
        },
      );
    },
  },
};
