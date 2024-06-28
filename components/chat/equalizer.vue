<template>
  <div>
    <div id="music-bars" class="overflow-hidden" style="height: 30px">
      <span
        v-for="i in 120"
        :key="i"
        class="music-bar"
        :style="getBarStyle(i)"
        ref="musicBars"
      ></span>
      <!-- <button @click="toggleEqualizer">{{
        isPlaying ? "توقف Equalizer" : "شروع Equalizer"
      }}</button> -->
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isPlaying: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      equalizer(bar) {
        if (this.isPlaying && bar) {
          const height = Math.random() * 100 + 70;
          const timing = height * 7.5;
          const marg = (170 - height) / 2;

          bar.style.height = height + "px";
          bar.style.marginTop = marg + "px";

          setTimeout(() => {
            this.equalizer(bar);
          }, timing);
        }
      },
      getBarStyle(index) {
        const bar = this.$refs.musicBars
          ? this.$refs.musicBars[index - 1]
          : null;
        if (bar) {
          this.equalizer(bar);
        }

        return {
          backgroundColor: "#fff",
          display: "block",
          width: "1px",
          float: "left",
          marginRight: "2px",
        };
      },
    },
    mounted() {
      // Start the animation for all bars if isPlaying is true
      if (this.isPlaying) {
        for (let i = 1; i <= 120; i++) {
          this.equalizer(
            this.$refs.musicBars ? this.$refs.musicBars[i - 1] : null,
          );
        }
      }
    },
    watch: {
      isPlaying(newVal) {
        if (newVal) {
          // Start the animation for all bars when isPlaying becomes true
          for (let i = 1; i <= 120; i++) {
            this.equalizer(
              this.$refs.musicBars ? this.$refs.musicBars[i - 1] : null,
            );
          }
        }
      },
    },
  };
</script>

<style scoped>
  #music-bars {
    /* background-color: #234; */
  }

  .music-bar {
    /* background-color: #234; */
    display: block;
    width: 1px;
    float: left;
    margin-right: 2px;
  }
</style>
