<template>
  <profile-properties :userId="$route.params.id" :isMine="false" />
</template>
<script>
  export default {
    layout: "global-profile",
  };
</script>
