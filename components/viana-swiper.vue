<template>
  <div :class="{ 'd-flex': grow }">
    <swiper
      ref="mySwiper"
      :options="swiperOption"
      dir="rtl"
      v-if="data.length"
      @slideChange="slideWindowChange"
      @mouseenter="pauseAutoplay"
      @mouseleave="resumeAutoplay"
    >
      <swiper-slide
        class="my-auto border-sizing"
        v-for="(item, i) in data"
        :key="i"
      >
        <slot :props="{ item, index: i }" />
      </swiper-slide>
      <div
        class="swiper-pagination mb-3"
        slot="pagination"
        v-if="hasPaginate"
      />
      <div
        class="swiper-button-prev"
        :class="dark && 'dark'"
        slot="button-prev"
        v-if="hasNavigation"
      />
      <div
        class="swiper-button-next"
        :class="dark && 'dark'"
        slot="button-next"
        v-if="hasNavigation"
      />
    </swiper>
    <div class="absolute-container absolute-container-top">
      <slot name="absolute-top" />
    </div>
    <div class="absolute-container absolute-container-bottom">
      <slot name="absolute-bottom" />
    </div>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";

  import "swiper/css/swiper.css";

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    directives: {
      swiper: directive,
    },
    mounted() {
      this.removePropsClass();
    },
    methods: {
      pauseAutoplay() {
        if (!this.autoplayEnabled) return;

        this.$refs.mySwiper.$swiper.autoplay.stop();
      },
      resumeAutoplay() {
        if (!this.autoplayEnabled) return;

        this.$refs.mySwiper.$swiper.autoplay.start();
      },
      slideWindowChange() {
        if (this.loop) {
          if (this.$refs.mySwiper.$swiper.activeIndex > this.data.length)
            this.$refs.mySwiper.$swiper.slideTo(1);
          else if (this.$refs.mySwiper.$swiper.activeIndex <= 0)
            this.$refs.mySwiper.$swiper.slideTo(this.data.length);
        }
      },

      removePropsClass() {
        if (!this.$el.children[0]) return;

        this.$el.children[0].className += ` ${this.$el.className.replace(
          "d-flex",
          "",
        )}`;

        this.$el.className = this.grow ? "d-flex" : "";
      },
    },
    props: {
      data: {
        type: Array,
        required: true,
      },
      sizes: {
        type: Array,
        default: () => [],
      },
      maxCount: {
        type: Number,
        default: 4,
      },
      fixSize: {
        type: Boolean,
        default: false,
      },
      fixSpace: {
        type: Boolean,
        default: false,
      },
      hasPaginate: {
        type: Boolean,
        default: false,
      },
      hasNavigation: {
        type: Boolean,
        default: false,
      },
      spaceBetween: {
        type: Number,
        default: 50,
      },
      dark: {
        type: Boolean,
        default: false,
      },
      autoplayDelay: {
        type: Number,
        default: 5000,
      },
      loop: {
        type: Boolean,
        default: true,
      },
      grow: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 1,
          autoplay: {
            enabled: this.autoplayDelay != 0,
            delay: this.autoplayDelay,
            //   disableOnInteraction: true,
            //   pauseOnMouseEnter: true,
          },
          loop: this.loop,
          spaceBetween: this.spaceBetween,
          navigation: this.hasNavigation && {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: this.hasPaginate && {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet(index, className) {
              return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
            },
            // bulletClass: "my-bullet",
            // bulletActiveClass: "my-bullet-active",
            // dynamicBullets: true
          },
          // scrollbar: ".swiper-scrollbar",
          breakpoints: {
            1200: {
              slidesPerView:
                this.sizes.length > 0 ? this.sizes[0] : this.maxCount,
              spaceBetween:
                this.fixSize || this.fixSpace
                  ? this.spaceBetween
                  : this.spaceBetween,
            },
            1024: {
              slidesPerView:
                this.sizes.length > 0
                  ? this.sizes[1] || 1
                  : this.fixSize
                  ? this.maxCount
                  : Math.max(this.maxCount - 1, 1),
              spaceBetween:
                this.fixSize || this.fixSpace
                  ? this.spaceBetween
                  : this.spaceBetween - 10,
            },
            768: {
              slidesPerView:
                this.sizes.length > 0
                  ? this.sizes[2] || 1
                  : this.fixSize
                  ? this.maxCount
                  : Math.max(this.maxCount - 2, 1),
              spaceBetween:
                this.fixSize || this.fixSpace
                  ? this.spaceBetween
                  : this.spaceBetween - 20,
            },
            640: {
              slidesPerView:
                this.sizes.length > 0
                  ? this.sizes[3] || 1
                  : this.fixSize
                  ? this.maxCount
                  : Math.max(this.maxCount - 3, 1),
              spaceBetween:
                this.fixSize || this.fixSpace
                  ? this.spaceBetween
                  : this.spaceBetween - 30,
            },
            440: {
              slidesPerView:
                this.sizes.length > 0
                  ? this.sizes[4] || 1
                  : this.fixSize
                  ? this.maxCount
                  : Math.max(this.maxCount - 4, 1),
              spaceBetween:
                this.fixSize || this.fixSpace
                  ? this.spaceBetween
                  : this.spaceBetween - 40,
            },
            300: {
              slidesPerView:
                this.sizes.length > 0
                  ? this.sizes[5] || 1
                  : this.fixSize
                  ? this.maxCount
                  : Math.max(this.maxCount - 5, 1),
              spaceBetween:
                this.fixSize || this.fixSpace
                  ? this.spaceBetween
                  : this.spaceBetween - 50,
            },
          },
        },
      };
    },
  };
</script>

<style lang="scss">
  .swiper-pagination-bullet-custom {
    transition: var(--btn-transition);

    background: white;
    opacity: 1;
    width: 18px;
    height: 6px;
    border-radius: 400px;

    &:not(.swiper-pagination-bullet-active) {
      background: white;
      width: 6px;
      height: 6px;
      border-radius: 200px;
    }
  }
</style>

<style scoped lang="scss">
  .my-bullet {
    border-radius: 0.02rem;
    width: 0.04rem;
    height: 0.04rem;
    margin: 0 0.03rem;
    display: inline-block;
    background: rgba(0, 0, 0, 0.2);
  }
  .swiper-pagination-active {
    background: #3cdbc0;
    width: 0.16rem;
  }

  .button-next-relacionados {
    z-index: 1000;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: white;
  }

  .amazing-offer-swiper .dark {
    color: black;
    padding: 30px;
    background-color: white;
    border-radius: 100px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 13px;
  }
  .amazing-offer-swiper .swiper-button-next.dark,
  .amazing-offer-swiper .swiper-button-prev.dark {
    padding: 10px;
    border-radius: 100%;
    height: 25px !important;
    width: 25px !important;
    z-index: 50;
  }

  .absolute-container {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 10;

    &-top {
      top: 0;
    }

    &-bottom {
      bottom: 0;
    }
  }
</style>
