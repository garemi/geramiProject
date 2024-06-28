<template>
  <div
    @click.prevent="$emit('toggleExpand')"
    class="text-right position-relative"
  >
    <slot name="title">
      <div v-if="title">
        {{ title }}
      </div>
    </slot>
    <v-expand-transition>
      <div v-if="isExpanded">
        <div
          v-for="(item, i) in items"
          :key="'item' + i"
          class="d-flex align-center text-justify sm-text font-weight-500 black--text radio-container rounded-xl pa-2 mt-1 light-gray-bg"
          @click.prevent.stop="model = item.id"
        >
          <v-icon color="black" class="ml-1">
            {{
              model == item.id ? "mdi-radiobox-marked" : "mdi-radiobox-blank"
            }}
          </v-icon>
          {{ item.title }}
        </div>
        <slot />
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
  import { autoModel } from "@/mixins/auto-model";
  export default {
    mixins: [autoModel],
    props: {
      title: {
        type: String,
        default: "",
      },
      isExpanded: {
        type: Boolean,
        default: false,
      },
      withImageUploader: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        items: [
          {
            id: "1",
            title: "بنده مایل هستم کالای شما را با کالای خود مبادله کنم.",
          },
          {
            id: "2",
            title: "آیا تمایل دارید کالای خود را با کالای بنده تعویض نمایید؟",
          },
          {
            id: "3",
            title: "اگر متمایل هستید مبادله کالا به کالا داشته باشیم!",
          },
        ],
      };
    },
  };
</script>

<style scoped>
  .radio-container {
  }
</style>
