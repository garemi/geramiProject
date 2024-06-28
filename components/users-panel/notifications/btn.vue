<template>
  <v-tooltip
    v-if="!$store.state.userNotifications.length"
    left
    :key="'bell-empty'"
    color="black"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item
        @click="$emit('onShowNotificationsModal')"
        v-bind="attrs"
        v-on="on"
        class="list-item"
      >
        <v-list-item-content>
          <v-icon> mdi-bell </v-icon>
        </v-list-item-content>
      </v-list-item>
    </template>
    <small>اطلاعیه ها</small>
  </v-tooltip>
  <v-tooltip :key="'bell-nonempty'" v-else left color="black">
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        color="error"
        :content="$store.state.userNotifications.length || '0'"
        overlap
        offset-x="20px"
        offset-y="20px"
        v-bind="attrs"
        v-on="on"
      >
        <v-list-item
          @click="$emit('onShowNotificationsModal')"
          class="list-item"
        >
          <v-list-item-content>
            <v-icon> mdi-bell </v-icon>
          </v-list-item-content>
        </v-list-item>
      </v-badge>
    </template>
    <small>اطلاعیه ها</small>
  </v-tooltip>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
