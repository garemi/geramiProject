<template>
  <div class="mx-2 mt-3">
    <div class="d-flex align-items">
      <v-btn
        color="var(--medium-gray)"
        small
        elevation="0"
        style="width: 30px"
        class="rounded-lg"
        @click="back"
      >
        <v-icon color="var(--gray)">mdi-chevron-right</v-icon>
      </v-btn>
      <h4 class="mr-2 text-500">{{ steps[level]?.title }}</h4>
    </div>
    <span>
      <user-authentication-steps :steps="steps" :level="level" />
    </span>
    <div class="w-full justify-center mt-3 text-center" v-if="level < 0">
      در حال بارگیری اطلاعات ...
    </div>
    <span v-else-if="level === 0">
      <user-authentication-identity-check
        @increamentLevel="increamentLevel"
        @informationsAdded="informationsAdded"
        @decreamentLevel="decreamentLevel"
        @increamentLevelTwice="increamentLevelTwice"
      />
    </span>
    <span v-else-if="level === 1">
      <user-cards-location
  :ischangable="ischangable"
  :level="level"
  @increamentLevel="informationsAdded" 
  :auth="auth"
/>
    </span>
    <span v-else-if="level === 2">
      <user-authentication-rules @accepted="accepted" />
    </span>
    <user-authentication-dialogs-final
      v-model="dialogShow"
      :image="require('@/assets/img/dialog-photo.png')"
      desc="همکاران ما هویت شما را بررسی کرده و نتیجه نهایی را اعلام خواهند کرد"
      title="ثبت هویت با موفقیت انجام شد."
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: [
        { title: "بررسی هویت", icon: "mdi-account-box-outline", step: 0 },
        { title: "موقعیت مکانی", icon: "mdi-map-marker-outline", step: 1 },
        { title: "تایید قوانین", icon: "mdi-list-box-outline", step: 2 },
      ],
      dialogShow: false,
      level: 0,
      ischangable: true,
      auth: true,
      form: {
        national_code: "",
        dob: "",
        phone : "",
        postcode : "",
        longitude : null ,
        latitude : null,
        document : ""
      },
    };
  },
  methods: {
    increamentLevel() {
      this.level += 1;
    },
    decreamentLevel() {
      this.level -= 1;
    },
    increamentLevelTwice() {
      this.level += 1;
    },
    back() {
      if (this.level === 0) {
        this.$router.push("/panel");
      } else {
        this.level -= 1;
      }
    },
    informationsAdded(form) {
  this.form = { ...this.form, ...form }; 
  this.increamentLevel();
},
    async accepted() {
      console.log(this.form)
      const formData = new FormData();
      formData.append("national_code", this.form.national_code);
      formData.append("dob", this.form.dob);
      formData.append("phone" , this.form.phone);
      formData.append("postal_code" , this.form.postcode)
      formData.append("lat" , this.form.latitude)
      formData.append("long" , this.form.longitude)


      await this.$axios.$post("https://api.garemi.app/api/v1/complete-authenticate", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      });

      this.dialogShow = true;
    },
  },
};
</script>

<style scoped>
.custom-button {
  width: 150px;
  height: 40px;
  border-radius: 8px;
  text-transform: none;
  font-size: 16px;
}
</style>
