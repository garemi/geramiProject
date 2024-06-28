<template>
  <v-dialog v-model="model" content-class="align-self-end ma-0">
    <v-card class="custom-border-class py-4">
      <v-card-title>
        <v-row class="px-4">
          <v-col cols="1"></v-col>
          <v-col cols="10" class="mx-auto">
            <p class="black--text text-center custom-text-regular">
              اشتراک گذاری
            </p>
          </v-col>
          <v-col cols="1">
            <v-icon class="text-start" @click="model = false">
              mdi-close
            </v-icon>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-subtitle class="mt-1">
        <small class="mb-3 text-center mx-2">
          در این بخش می‌توانید لینک این صفحه را در شبکه های اجتماعی دیگر به
          اشتراک بگذارید
        </small>
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <div class="d-flex align-center text-left mx-2 url-container mb-2">
              <v-btn small icon @click="copy" class="ml-2">
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
              <span class="text-ellipsis flex-1">{{ url }}</span>
            </div>
          </v-col>
          <v-col cols="12" class="d-flex flex-center flex-wrap pa-2">
            <v-btn
              v-for="(value, key) in items"
              :key="key"
              :color="value.color ?? 'var(--primary)'"
              fab
              large
              elevation="0"
              class="white--text rounded ma-1"
              @click="share(key)"
            >
              <div class="d-flex flex-column flex-center text-center">
                <v-icon> mdi-{{ value.icon }} </v-icon>
                <small class="mt-1">{{ value.title }}</small>
              </div>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { copyText } from "@/constants/CustomFunctions/Document";
  export default {
    computed: {
      model: {
        get() {
          return this.$store.state.share?.visible || false;
        },
        set(visible) {
          this.$store.commit("setShareMetaData", {
            text: "",
            url: "",
            visible,
          });
        },
      },
      url() {
        return (
          this.$store.state.share?.url ||
          window.location.origin + this.$route.fullPath
        );
      },
    },
    data() {
      return {
        items: {
          linkedin: {
            icon: "linkedin",
            title: "لینکدین",
            color: "primary darken-3",
          },
          telegram: {
            icon: "send",
            title: "تلگرام",
            color: "primary",
          },
          twitter: {
            icon: "twitter",
            title: "توییتر",
            color: "primary lighten-2",
          },
          facebook: {
            icon: "facebook",
            title: "فیسبوک",
            color: "primary darken-2",
          },
        },
      };
    },
    methods: {
      share(type = "telegram") {
        switch (type) {
          case "twitter":
            this.navigate(
              `https://twitter.com/intent/tweet?url=${this.url}&text=${this.$store.state.share?.text}`,
            );
            break;
          case "telegram":
            this.navigate(`https://telegram.me/share/url?url=${this.url}`);
            break;
          case "facebook":
            this.navigate(`http://www.facebook.com/sharer.php?u=${this.url}`);
            break;
          case "linkedin":
            this.navigate(
              `http://linkedin.com/shareArticle?mini=true&amp;title=${this.$store.state.share?.text}&amp;url=${this.url}`,
            );
            break;
        }
      },
      navigate(url) {
        window.open(url, "_blank");
      },
      copy() {
        copyText(this.url);
        this.$toast.success("با موفقیت کپی شد.");
      },
    },
  };
</script>
<style scoped>
  .size-font {
    font-size: 10px;
  }

  .border-style {
    border: 4px solid var(--primary);
  }

  .url-container {
    border: 2px solid var(--primary);
    border-radius: 5px;
    padding: 0.25rem 0.5rem;
  }
</style>
