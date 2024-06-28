<template>
  <div class="d-flex align-center justify-end my-3 white-bg rounded-pill pa-2">
    <div>
      <v-avatar>
        <img
          :src="
            item.user.id === $store.state.userData.id
              ? item?.createby?.avatar?.url
              : require('@/assets/img/default.jpg')
          "
          alt="image"
        />
      </v-avatar>
      <!-- <div
                        style="z-index: 5"
                        class="rounded-pill size-div mt-n3 position-relative"
                        :class="
                          item.user.id != $store.state.userData.id
                            ? item.user?.is_online == 0
                              ? 'mr-10 gray-bg'
                              : 'mr-10 green-bg'
                            : item.createby?.is_online == 0
                            ? 'mr-10 gray-bg'
                            : 'mr-10 green-bg'
                        "
                      >
                      </div> -->
    </div>
    <div class="d-flex flex-column mx-4 flex-1 mt-1">
      <div class="d-flex justify-space-between align-center">
        <span
          :class="$isRTL() ? 'text-left' : 'text-left'"
          class="text-left md-text"
        >
          {{ item.createby?.full_name }}
        </span>
        <div class="d-flex align-center">
          <v-icon class="mx-1" size="small" color="black">
            mdi-clock-time-eight-outline
          </v-icon>
          <span class="md-text">
            {{ item?.last_message?.updated_at | moment("dddd  HH:mm") }}
          </span>
        </div>
      </div>
      <div class="d-flex align-center">
        <v-badge
          v-if="!item.last_message?.is_read"
          class="ml-2 mt-1"
          color="red"
          dot
        >
        </v-badge>
        <p
          :class="item.last_message?.is_read ? '' : 'font-weight-bold'"
          class="lg-text one-line-text"
        >
          {{ item.last_message?.desc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style></style>
