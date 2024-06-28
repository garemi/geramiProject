<template>
  <v-container>
    <v-row
      no-gutters
      align="center"
      class="purple-bg searchBar text-center justify-center justify-sm-space-around justify-md-start pb-md-0 pb-7"
    >
      <v-col md="5" sm="5" cols="11" class="mr-md-5 mr-0">
        <v-form ref="form" @submit.prevent="">
          <v-text-field
            solo
            v-model="projectName"
            height="3.6rem"
            background-color="white"
            :label="label"
            class="rounded-pill mt-8 font-weight-bold purple-text d-flex align-center"
          />
        </v-form>
      </v-col>
      <v-col md="5" sm="6" cols="11" class="d-flex mr-md-10 ml-md-0">
        <v-menu
          v-model="showChevron"
          offset-y
          class="menu"
          transition="fade-transition"
        >
          <template v-slot:activator="{ on }">
            <v-row no-gutters class="text-center align-center" v-on="on">
              <v-col
                lg="8"
                md="8"
                class="beige-bg rounded-pill position-relative ml-2 py-4 mr-md-4"
              >
                <span class="font-weight-bold purple-text">{{ spanText }}</span>
              </v-col>
              <div class="beige-bg rounded-circle icon-bg cursor-pointer">
                <div class="text-center">
                  <v-icon size="55" color="#472B47" v-if="showChevron">
                    mdi-chevron-up
                  </v-icon>
                  <v-icon size="55" color="#472B47" v-else>
                    mdi-chevron-down
                  </v-icon>
                </div>
              </div>
            </v-row>
          </template>
          <v-list class="mt-3 rounded-xl">
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="changeSpanText(item.title)"
            >
              <v-list-item-title class="cursor-pointer">
                <p>
                  {{ item?.title }}
                </p>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>

      <v-col
        md="1"
        cols="11"
        class="d-flex justify-lg-end mt-5 mt-md-0 mx-5 mx-md-0 mx-md-0 mr-md-3"
      >
        <div
          class="Dark-cyan-bg rounded-circle pa-2 searchBtn cursor-pointer"
          @click="emitData"
        >
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="var(--primary)"
            size="40"
          />
          <v-icon v-else size="40" color="#472B47"> mdi-magnify </v-icon>
          <span class="purple-text d-md-none"> جستجو </span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
      },
    },

    data() {
      return {
        projectName: this.$route.query?.name || "",
        items: [
          { title: "جدید ترین", href: "" },
          { title: "محبوب ترین ", href: "" },
          { title: "پر بازدید ترین ", href: "" },
          { title: "کمترین قیمت", href: "" },
          { title: "بیشترین قیمت ", href: "" },
        ],
        spanText: "جدید ترین",
      };
    },

    methods: {
      emitData() {
        const filterCriteria = {
          order: this.spanText,
          name: this.projectName,
        };
        this.loading = true;
        this.$emit("search", filterCriteria);
      },
      changeSpanText(newText) {
        this.spanText = newText;
      },
    },
  };
</script>

<style lang="scss">
  .theme--light.v-label {
    margin-top: 1px;
  }
  .v-menu__content {
    border-radius: 24px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .slider {
    .v-slider--horizontal .v-slider__track-background,
    .v-slider--horizontal .v-slider__track-fill {
      height: 12px;
      background-image: linear-gradient(to right, #b8b08c, #472b47) !important;
    }
    .theme--dark.v-slider .v-slider__track-background {
      background: rgba(100, 100, 100, 0.2) !important;
    }
    .v-slider--horizontal .v-slider__track-background,
    .v-slider--horizontal .v-slider__track-fill {
      height: 10px !important;
    }

    .v-slider__thumb:last-child:after {
      background-color: white;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      border: 8px solid #b8b08c;
      top: 9px;
    }
  }

  .inputText.v-text-field.v-text-field--solo .v-input__control {
    min-height: 15px;
    min-width: 90%;
  }
</style>

<style scoped>
  .searchBar {
    border-radius: 65px;
    position: relative;
    z-index: 1;
  }

  .icon-bg {
    aspect-ratio: 2/2;
  }

  input[type="checkbox"] {
    accent-color: #472b47;
  }

  input[type="checkbox"] {
    transform: scale(1.5);
  }

  @media (max-width: 960px) {
    .searchBtn {
      width: 100% !important;
      height: 100%;
      border-radius: 45px !important;
    }
  }
</style>
