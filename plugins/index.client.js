import Vue from "vue";
import moment from "jalali-moment";

Vue.config.productionTip = false;

require("moment/locale/fa");
Vue.use(require("vue-moment-jalaali"));

moment.locale("fa");

Vue.component("VueMask", () => import("v-mask"));
