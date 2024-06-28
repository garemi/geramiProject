<template>
  <span>
    <span v-if="citizen">
      <user-authentication-citizen-document
        @citizenFalse="citizen = false"
        @increamentLevelTwice="increamentLevelTwice"
      />
    </span>
    <span class="mx-5 mt-7" v-else>
      <div class="flex flex-col gap-4">
        <v-text-field
          color="var(--dark-gray)"
          label="کد ملی"
          background-color="#fff"
          elevation="0"
          dense
          filled
          hide-details="auto"
          v-model="form.national_code"
          :rules="[rules.national_code]"
          class="pt-0 mx-0 px-0"
        ></v-text-field>
      
        <date-picker
          class="bg-white"
          placeholder="تاریخ تولد"
          v-model="form.dob"
          mode="single"
          :column="1"
          picker-style="width: 100%"
        >
          <template #icon></template>
        </date-picker>

        <v-text-field
          color="var(--dark-gray)"
          label="شماره موبایل"
          background-color="#fff"
          elevation="0"
          dense
          filled
          hide-details="auto"
          v-model="form.phone"
          :rules="[rules.required, rules.cellphone]"
          class="pt-0 mx-0 px-0"
        ></v-text-field>
        


        <v-btn
          outlined
          color="primary"
          class="custom-button mx-auto"
          @click="inquire"
          :disabled="!form.national_code || !form.dob"
        >
          استعلام کد ملی
        </v-btn>

       
      </div>
      <v-btn
        color="var(--text-200)"
        text
        class="custom-rounded mt-8 mb-3 mx-auto bottom-btn-style"
        style="bottom: 50px; text-decoration: underline"
        @click="citizen = true"
      >
        آیا جزو اتباع هستید؟
      </v-btn>
      <v-btn
        outlined
        color="var(--text-700)"
        class="custom-rounded mt-8 mb-3 mx-auto bottom-btn-style"
        @click="nextLevel"
        :disabled="
          !form.national_code || 
          !form.dob   
        "
      >
       مرحله بعد
      </v-btn>
    </span>
  </span>
</template>

<script>
import { rules } from "@/constants/VuetifyRules.js";
import services from "@/services";
import { formPostPrepare } from "@/constants/PanelFormHandler";
import { showError } from "@/constants/messages";
import axios from "axios";
import datePicker from "@alireza-ab/vue-persian-datepicker";

export default {
  components: { datePicker },
  data() {
    return {
      rules,
      data: [
        { value: "الف/123456789", title: "سری/سریال" },
        { value: "3/2/1366", title: "تاریخ تولد" },
      ],
      inquired: false,
      loading: false,
      citizen: false,
      form: {
        national_code: "",
        dob: "",
        phone: "",
      },
    };
  },

  methods: {
    async inquire() {
      try {
        if (!this.loading) this.loading = true;
        
        const response = await axios.get('https://inquery.ir/:80', {
          params: {
            token: 'Q24lSElFZjeDKLUQerOKOHoJfug',
            Mobile : this.form.phone ,
            IdCode: this.form.national_code,
            BirthDate: this.form.dob
          }
        }).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          
          console.log(err)
        })

        console.log(response.data);

        this.inquired = true;
      } catch (error) {
        console.error("Error in National Code Inquiry:", error);
        showError(error);
      } finally {
        this.loading = false;
      }
    },

    async nextLevel() {
      this.$emit("informationsAdded", this.form);
    },
    increamentLevel() {
      this.$emit("increamentLevel");
    },
    increamentLevelTwice() {
      this.$emit("increamentLevelTwice");
    },
  },
  watch: {
    'form.national_code'() {
      this.inquired = false;
    },
    'form.phone'() {
      this.inquired = false;
    },
  },
};
</script>

<style lang="scss">
.pdp-group {
  input {
    height: 52px !important;
    border: none !important;
    border-bottom: 1px solid #8f8f8d !important;
    border-radius: 4px 4px 0px 0px !important;
  }
}
.custom-button {
  width: 150px;
  height: 40px;
  border-radius: 8px;
  text-transform: none;
  font-size: 16px;
}
</style>
