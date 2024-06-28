<template>
  <profile-properties :userId="$store.state?.userData?.id" :isMine="true" />
</template>
<script>
  export default {
    layout: "user-panel-with-name",
  };
</script>
