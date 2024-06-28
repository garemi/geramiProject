<template>
  <div>
    <v-card elevation="0" class="text-center">
      <img src="/success.svg" v-if="0" height="128" />
      <img src="/error.svg" v-if="0" height="128" />
      <img src="/info.svg" v-if="1" height="128" />
      <h2 v-if="0" class="mb-4" style="color: #009a29; margin-top: -10px">
        پرداخت با موفقیت انجام شد
      </h2>
      <h2 v-if="1" class="mb-4" style="color: #ff8800; margin-top: -10px">
        تایید اطلاعات نوبت
      </h2>
      <h2 v-if="0" class="mb-4" style="color: #c20e27; margin-top: -10px">
        پرداخت شما با شکست مواجه شد
      </h2>
      <small v-if="1" class="mb-4"
        >اطلاعات رزرو را با دقت مطالعه و در صورت تایید بر روی دکمه پرداخت کلیک
        نمایید.</small
      >
      <small v-if="0" class="mb-4"
        >در صورتی که مبلغی از حساب شما کسر شد ظرف مدت 72 ساعت به حساب شما باز
        خواهد گشت</small
      >
      <v-card elevation="6" v-if="0">
        <v-card-title style="background: #ddd" class="align-center">
          <img src="/logo-bim-left-text.png" height="128" />
          <v-spacer></v-spacer>
          <div class="d-flex flex-column">
            <img src="/barcode.png" height="128" />
            <small style="font-size: 10px">کد رزرواسیون</small>
            <small>34234</small>
          </div>
        </v-card-title>
        <v-card-text class="text-right pt-4" style="color: #000">
          <v-row>
            <v-col md="3">
              <small> نام و نام خانوادگی </small>
              <h3>مرتضی جعفری</h3>
            </v-col>
            <v-col md="3">
              <small> شماره ملی </small>
              <h3>093256789</h3>
            </v-col>
            <v-col md="3">
              <small> تخصص انتخابی </small>
              <h3>فلوشیپ قلب</h3>
            </v-col>
            <v-col md="3">
              <small> دکتر انتخابی </small>
              <h3>امیر حسین عباس زاده</h3>
            </v-col>
            <v-col md="3">
              <small> زمان مراجعه </small>
              <h3>4 مرداد 1400 ساعت 8:30</h3>
            </v-col>
            <v-col md="3">
              <small> بیمه انتخابی </small>
              <h3>نیروهای مسلح</h3>
            </v-col>
            <v-col md="3">
              <small> نام پدر </small>
              <h3>احمدرضا</h3>
            </v-col>
            <v-col md="3">
              <small> تلفن همراه </small>
              <h3>0935332400</h3>
            </v-col>
            <v-col md="3">
              <small> تاریخ تولد </small>
              <h3>09/07/1400</h3>
            </v-col>
            <v-col md="3">
              <small> هزینه ویزیت </small>
              <h3>25.000 تومان</h3>
            </v-col>
            <v-col md="3">
              <small> کد پیگیری تراکنش </small>
              <h3>6234796434</h3>
            </v-col>
            <v-col md="3">
              <small> نام پرداخت </small>
              <h3>15 مرداد 1400</h3>
            </v-col>
            <v-col md="3">
              <small> وضعیت پرداخت </small>
              <h3>پرداخت شده</h3>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card elevation="0" v-if="1">
        <v-card-text class="text-right pt-4" style="color: #000">
          <v-row>
            <v-col md="3">
              <small> نام و نام خانوادگی بیمار </small>
              <h3>{{ information.first_name }} {{ information.last_name }}</h3>
            </v-col>
            <v-col md="3">
              <small> تخصص انتخابی </small>
              <h3>
                {{ specialty.title }}
              </h3>
            </v-col>
            <v-col md="3">
              <small> دکتر انتخابی </small>
              <h3>{{ doctor.user.first_name }} {{ doctor.user.last_name }}</h3>
            </v-col>
            <v-col md="3">
              <small> زمان مراجعه </small>
              <h3>
                {{ time.start_date | moment("jYYYY/jMM/jDD HH:mm") }}
              </h3>
            </v-col>
            <v-col md="3">
              <small> بیمه انتخابی </small>
              <h3>
                {{ insurance.name }}
              </h3>
            </v-col>
            <v-col md="3">
              <small> هزینه ویزیت </small>
              <h3>
                {{
                  new Intl.NumberFormat().format(doctor.specialties[0].price)
                }}
                تومان
              </h3>
            </v-col>
            <v-col md="3" v-if="0">
              <small> کد پیگیری تراکنش </small>
              <h3>6234796434</h3>
            </v-col>
            <v-col md="3" v-if="0">
              <small> تاریخ پرداخت </small>
              <h3>15 مرداد 1400</h3>
            </v-col>
            <v-col md="3">
              <small> وضعیت پرداخت </small>
              <h3 v-if="0">پرداخت شده</h3>
              <h3 v-else>در انتظار پرداخت</h3>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-center mt-5">
          <v-btn id="accept_rules" color="success" elevation="0" @click="onPay">
            <v-icon right dark> mdi-check </v-icon>
            پرداخت ویزیت و تایید نوبت
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </div>
</template>

<script>
  import { Constants } from "@/constants/GlobalConstants";
  import moment from "moment";
  import VianaAxios, { getErrorText } from "../constants/VianaAxios";

  export default {
    name: "Payment",
    components: {},
    props: {
      insurance: {},
      information: {},
      specialty: {},
      doctor: {},
      time: {},
    },
    data: () => {
      return {
        model: {
          name: "",
        },
      };
    },
    watch: {
      // selectedData(){
      //   //trigger event for data selected
      //   this.onSelect();
      // },
      // "model.name"(val) {
      //   console.log("Daw",val)
      //   // send a request for filter data
      // },
    },
    methods: {
      // onSelect(){
      //   //send data to parent component
      //   this.$emit('insuranceSelect',this.selectedData);
      // },
      // customToggle(item,index){
      //   this.selectedInsurance = index;
      //   this.selectedData = item;
      //   this.insurances = this.insurances.map(function (item,key) {
      //     if (index !== key)
      //       return {
      //         ...item,
      //         is_disable: true
      //       };
      //     else
      //       return item;
      //   });
      // }
      onPay() {
        if (!this.loading) this.loading = true;
        let formData = new FormData();
        formData.append("insurance_id", this.insurance.id);
        formData.append("specialty_id", this.specialty.id);
        formData.append("user_id", this.information.user_id);
        formData.append("doctor", this.doctor.id);
        formData.append("ap_i", this.time.id);

        VianaAxios.post("reservations/submit", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 400000,
        })
          .then((response) => {
            window.location.href = response.data.action;
            this.$toast.success("در حال انتقال به درگاه پرداخت");
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            this.$toast.error(getErrorText(error));
          });
      },
    },
    computed: {},
    mounted() {},
  };
</script>

<style scoped></style>
