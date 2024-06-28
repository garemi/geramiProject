<template>
  <profile-comments :userId="$route.params.id" :withReply="false" />
</template>

<script>
  export default {
    layout: "global-profile",
  };
</script>

<style></style>
