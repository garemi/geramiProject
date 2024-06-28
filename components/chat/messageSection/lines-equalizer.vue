<template>
  <div>
    <audio ref="player" :src="setSrc" type="audio/mp3" id="player">
      <!-- crossorigin="anonymous" -->
    </audio>

    <div class="d-flex justify-center align-center">
      <div class="visualizer">
        <div
          v-for="(track, index) in 20"
          :style="{ backgroundColor: isWhite ? 'white' : 'black' }"
          :key="index"
          class="track"
          :ref="'tracks' + index"
        ></div>
      </div>
      <div
        @click="togglePlayer"
        class="toggle-play dark-bg rounded-circle mx-2"
      >
        <v-icon color="white" v-if="!isPlaying">mdi-play</v-icon>
        <v-icon color="white" v-else>mdi-pause</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      srcAudio: {
        type: String,
        required: true,
      },
      isWhite: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isPlaying: false,
        context: null,
        analyser: null,
        dataArray: null,
      };
    },
    mounted() {
      // this.preparation();
    },
    methods: {
      togglePlayer() {
        console.log("this.$refs.player.paused", this.$refs.player.paused);
        // if (!this.context) {
        //   this.preparation();
        // }

        if (this.$refs.player.paused) {
          this.playAudio();
        } else {
          this.pauseAudio();
        }
      },
      playAudio() {
        this.$refs.player.play();
        // this.loop();
        this.isPlaying = true;
        console.log("audio", this.srcAudio, this.$refs.player.play());
      },
      pauseAudio() {
        this.$refs.player.pause();
        this.isPlaying = false;
      },
      preparation() {
        this.context = new AudioContext();
        this.analyser = this.context.createAnalyser();
        const src = this.context.createMediaElementSource(this.$refs.player);
        src.connect(this.analyser);
        this.analyser.connect(this.context.destination);
        this.loop();
      },
      loop() {
        if (this.$refs.player.paused) {
          return;
        }
        window.requestAnimationFrame(this.loop);
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(this.dataArray);
        this.changeTracks();
      },
      changeTracks() {
        for (let i = 0; i < 20; i++) {
          this.$refs["tracks" + i][0].style.height = `${
            this.dataArray[i * 5] * 0.39215686274
          }%`;
        }
      },
    },
    computed: {
      setSrc() {
        return this.srcAudio ?? "";
      },
    },
  };
</script>

<style scoped>
  .visualizer {
    height: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
  }

  .track {
    flex: 1;
    /* background-color: black; */
    width: 1px;
    height: 10px;
  }

  .track:nth-child(2n) {
    height: 15%;
  }

  .track:nth-child(3n) {
    height: 20%;
  }

  .track:nth-child(7n) {
    height: 35%;
  }

  #toggle-play {
    border: none;
    background-color: var(--text-100);
    fill: var(--violet);
    min-height: 25px;
    min-width: 25px;
    width: 2%;
    height: 2%;
    position: absolute;
    top: 85vh;
    left: 49vw;
  }

  #toggle-play:hover {
    cursor: pointer;
  }
  .dark-bg {
    background-color: var(--text-800);
    width: fit-content;
    height: fit-content;
  }
  .position-equalizer {
    position: relative;
    overflow: hidden;
    width: 50%;
  }
  @media (min-width: 650px) {
    .position-equalizer {
      position: relative;
      overflow: hidden;
      width: 100%;
    }
  }
</style>
