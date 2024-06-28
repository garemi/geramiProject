<template>
  <div class="mt-5">
    <user-authentication-attach-card @imageSelected="imageSelected" />
    <v-btn
      outlined
      color="var(--text-700)"
      class="custom-rounded mt-8 mb-3 mx-auto bottom-btn-style"
      @click="nextLevel"
      :loading="loading"
      :disabled="!document"
    >
      مرحله بعد
    </v-btn>
  </div>
</template>

<script>
import UserAuthenticationAttachCard from '@/components/user/authentication/attach-card.vue';

export default {
  components: {
    UserAuthenticationAttachCard,
  },
  data() {
    return {
      loading: false,
      document: null, 
    };
  },
  methods: {
    imageSelected(img) {
      this.document = img; 
    },
    nextLevel() {
   
      if (this.document) {
        this.$emit("imageUploaded", this.document); 
      } else {
       
        this.$toast.error("لطفاً ابتدا فایل مورد نظر را انتخاب کنید.");
        
      }
    },
  },
};
</script>
