<template>
  <v-dialog v-model="dialog" content-class="align-self-end ma-0">
    <v-card class="custom-border-class">
      <v-card-title>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="9" class="mx-auto">
            <p
              class="black--text text-center word-break pr-5 line-height custom-text-regular"
            >
              گزارش تخلف آگهی
            </p>
          </v-col>
          <v-col cols="2" class="text-left">
            <v-icon class="text-start" @click="closeDialog"> mdi-close </v-icon>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <p class="gray-text mb-2 text-center mx-2">
          این فرم برای گزارش تخلف از قوانین سایت می باشد.نام ارسال کننده فاش
          نخواهد شد.
        </p>

        <v-form ref="form">
          <v-form-base :model="model" :schema="schema" :col="{ cols: 12 }">
          </v-form-base>
          <div class="text-center pt-2 px-2 text-sm-left">
            <v-btn
              class="rounded-pill"
              elevation="0"
              color="var(--primary)"
              @click="submit()"
              :loading="loading"
              left="0"
              :block="$vuetify.breakpoint.xsOnly"
              x-large
              dark
            >
              <span class="ma-5">ثبت گزارش</span>
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import Constants from "@/constants/GlobalConstants";
  import services from "@/services";

  export default {
    data() {
      return {
        loading: false,
        model: {
          desc: "",
        },
        schema: {
          desc: {
            type: "form-text-area",
            noResize: true,
            required: true,
            fullWidth: true,
            rules: [Constants.rules.required],
            label: "علت گزارش خود را توضیح دهید",
            required: true,
          },
        },
      };
    },

    props: {
      value: {
        type: Boolean,
        required: true,
      },
    },

    computed: {
      dialog: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit("input", v);
        },
      },
    },

    mounted() {},

    methods: {
      closeDialog() {
        this.model = {
          desc: "",
        };

        this.dialog = false;
      },
      submit() {
        if (!this.$refs.form.validate()) {
          this.$toast.error("لطفا اطلاعات را به درستی وارد نمایید.");
          return;
        }

        if (!this.loading) this.loading = true;

        services.report
          .create({
            user_id: this.$store.state.userData?.id,
            route: this.$route.path,
            model_id: this.$route.params?.id,
            model_type: "property",
            title: this.model.title,
            desc: this.model.desc,
          })
          .then((response) => {
            this.loading = false;
            this.proposalItems = response.data;
            this.$toast.success("گزارش خطای شما با موفقیت ثبت شد.");
            this.closeDialog();
          })
          .catch((error) => {
            this.loading = false;
            this.$toast.error(getErrorText(error));
          });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .report {
    &-button {
      position: fixed;
      left: 1.5rem;
      bottom: 1.5rem;
      z-index: 10;
    }

    &-card {
      position: fixed;
      top: 10rem;
      bottom: 5rem;
      left: 1.5rem;

      width: 100%;
      max-width: min(360px, 90%);
      display: flex;
      align-items: flex-end;
      z-index: 11;
    }
  }
</style>
