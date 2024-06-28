<template>
  <div style="height: 100vh">
    <object
      v-if="url"
      :data="url"
      type="application/pdf"
      width="100%"
      height="100%"
    >
      <embed :src="url" type="application/pdf" />
    </object>
  </div>
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
      },
    },
  };
</script>
