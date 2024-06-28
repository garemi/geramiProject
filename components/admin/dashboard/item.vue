<template>
  <span>
    <v-card color="transparent" dark style="box-shadow: unset !important">
      <v-card-text class="text-center">
        <div class="black--text">{{ title }}</div>
        <v-progress-circular
          class="mt-4"
          :rotate="360"
          :size="140"
          :width="15"
          :value="progress"
          :color="color"
        >
          <v-progress-circular v-if="loading" indeterminate />
          <div v-else>
            <h3>
              {{ computedVal }}
            </h3>
            <small v-if="postfix">
              {{ postfix }}
            </small>
          </div>
        </v-progress-circular>
      </v-card-text>
    </v-card>
    <v-card
      class="text-center black--text ma-2 mx-8"
      color="var(--nescafe-color)"
      elevation="0"
      :disabled="!link"
      @click="link && $router.push(link)"
    >
      <v-card-text class="pa-2">مشاهده</v-card-text>
    </v-card>
  </span>
</template>

<script>
  export default {
    props: {
      title: String,
      value: String | Number,
      link: String,
      data: Object,
      keyVal: String,
      postfix: String,
      // pass a string like this "{value} / 360000" ({value} should be presented and represent a dynamic value)
      valueEvalStr: String,
      // pass a string like this "{value} / 360000" ({value} should be presented and represent a dynamic value)
      progressEvalStr: String,
      progressValue: String | Number,
      colorEval: String,
      defaultColor: {
        type: String,
        default: "var(--primary)",
      },
      defaultVal: {
        type: String,
        default: "0",
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      progress() {
        if (this.progressValue) return this.progressValue;

        if (this.keyVal && this.data[this.keyVal]) {
          if (this.progressEvalStr)
            return eval(
              this.progressEvalStr.replaceAll(
                "{value}",
                this.data[this.keyVal] || "0",
              ),
            );

          return this.data[this.keyVal];
        }

        return 0;
      },
      computedVal() {
        if (this.value) return this.value;

        if (this.keyVal && this.data[this.keyVal]) {
          if (this.valueEvalStr)
            return eval(
              this.valueEvalStr.replaceAll("{value}", this.data[this.keyVal]),
            );

          return this.data[this.keyVal];
        }

        return this.defaultVal;
      },
      color() {
        if (this.colorEval)
          return eval(
            this.colorEval.replaceAll(
              "{value}",
              this.value
                ? this.value
                : this.keyVal && this.data[this.keyVal]
                ? this.data[this.keyVal]
                : 0,
            ),
          );

        return this.defaultColor;
      },
    },
  };
</script>

<style></style>
