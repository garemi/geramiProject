<template>
  <div class="d-flex align-center justify-end my-3 white-bg rounded-pill pa-2">
    <div>
      <v-avatar>
        <img :src="img" alt="image" />
      </v-avatar>
    </div>
    <div class="d-flex flex-column mx-4 flex-1 mt-1">
      <div class="d-flex justify-space-between align-center">
        <span
          :class="$isRTL() ? 'text-left' : 'text-left'"
          class="text-left md-text"
        >
          {{ name }}
        </span>
        <div v-if="date" class="d-flex align-center">
          <v-icon class="mx-1" size="small" color="black">
            mdi-clock-time-eight-outline
          </v-icon>
          <span class="md-text">
            {{ date | moment("dddd  HH:mm") }}
          </span>
        </div>
      </div>
      <div class="d-flex align-center">
        <v-badge v-if="!isRead" class="ml-2 mt-1" color="red" dot> </v-badge>
        <p
          :class="isRead ? '' : 'font-weight-bold'"
          class="lg-text one-line-text"
        >
          {{ lastMessage }}
        </p>
      </div>
    </div>
    <v-menu v-if="withMenu" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon fab dark small v-bind="attrs" v-on="on">
          <v-icon color="black">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="$emit('stopNotification', { id: conversationId })">
          <v-list-item-title>
            <v-icon small color="black"> mdi-bell-off-outline </v-icon>
            <small> توقف اعلان </small>
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="$emit('deleteChat', { id: conversationId })">
          <v-list-item-title>
            <v-icon small color="black">mdi-trash-can-outline</v-icon>
            <small> حذف چت </small>
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="$emit('block', { id: conversationId })">
          <v-list-item-title>
            <v-icon small color="red"> mdi-alert-octagon-outline </v-icon>
            <small class="error--text">
              {{ blockedBy ? "رفع مسدودی" : "مسدود شود" }}
            </small>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    props: {
      img: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      conversationId: {
        type: Number | String,
        required: true,
      },
      isRead: {
        type: Boolean,
        default: true,
      },
      blockedBy: {
        type: Object | undefined,
        default: undefined,
      },
      withMenu: {
        type: Boolean,
        default: false,
      },
      lastMessage: {
        type: String,
        default: "",
      },
    },
  };
</script>

<style></style>
