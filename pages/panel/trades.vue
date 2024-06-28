<template>
  <profile-trades :userId="$store.state?.userData?.id" />
</template>

<script>
  export default {
    layout: "user-panel-with-name",
  };
</script>

<style></style>
