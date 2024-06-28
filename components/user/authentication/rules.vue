<template>
  <span>
    <div class="mt-5">
      <p class="text-justify mx-5" style="color: var(--text-200)">
        <!-- Your long text content here -->
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با
        نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
        خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
        داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان
        رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
        پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
      </p>
      <v-divider class="my-2"></v-divider>
      <span class="d-flex align-center mx-5" @click="clicked">
        <v-form-checkbox v-model="checked" />
        <p style="color: var(--gray)">قوانین را مطالعه کرده و پذیرفته‌ام </p>
      </span>
      <!-- Button to trigger the modal -->
      <v-btn
        class="custom-rounded mt-3 mb-1 mx-auto expand-width"
        color="var(--text-700)"
        outlined
        @click="openModal"
      >
        مزایای احراز هویت
      </v-btn>
      <!-- Additional button -->
      <v-btn
        class="custom-rounded mt-1 mb-3 mx-auto expand-width"
        color="var(--text-700)"
        outlined
        @click="nextLevel"
      >
        پایان و پرداخت
      </v-btn>
    </div>

    <!-- Modal component -->
    <v-dialog v-model="dialogShow" max-width="600">
      <v-card class="custom-card">
        <v-card-title class="headline custom-title">مزایای احراز هویت</v-card-title>
        <v-card-text>
          <!-- Content of your modal here -->
          <div class="benefits-grid">
            <div class="benefit-item">
              <svg
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.3969 19.1919C21.2982 19.9257 21.1178 20.3142 20.841 20.591C20.5642 20.8678 20.1757 21.0482 19.4419 21.1469C18.6865 21.2484 17.6854 21.25 16.25 21.25L11.25 21.25C8.40431 21.25 7.14773 21.2419 6.14543 20.9378C3.82833 20.2349 2.01507 18.4217 1.31218 16.1046C1.00814 15.1023 1 13.8457 1 11C1 8.15431 1.00814 6.89773 1.31218 5.89544C2.01507 3.57833 3.82833 1.76507 6.14544 1.06218C7.14773 0.758142 8.40431 0.750001 11.25 0.750001C14.0957 0.750002 15.3523 0.758142 16.3546 1.06218C18.6717 1.76507 20.4849 3.57833 21.1878 5.89544C21.4919 6.89773 21.5 8.15431 21.5 11L21.5 16C21.5 17.4354 21.4984 18.4365 21.3969 19.1919Z"
                  stroke="#424038"
                  stroke-width="1.5"
                />
                <path
                  d="M9.25 14L13.25 14"
                  stroke="#424038"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.25 9L16.25 9"
                  stroke="#424038"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p>چت آنلاین</p>
            </div>
            <div class="benefit-item">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.5"
                  y="0.75"
                  width="22.5"
                  height="22.5"
                  rx="5.25"
                  stroke="#424038"
                  stroke-width="1.5"
                />
                <path
                  d="M12.75 8V16M16.75 12H8.75"
                  stroke="#424038"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p>امکان پست محصول</p>
            </div>
            <div class="benefit-item">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.74648 6.93008L9.49256 6.18176C11.2534 5.42711 13.2466 5.42711 15.0074 6.18176L16.7535 6.93008C17.0633 7.06286 17.2854 7.34281 17.3443 7.67473L18.25 12.7857L13.0188 19.0756C12.619 19.5563 11.881 19.5563 11.4812 19.0756L6.25 12.7857L7.15574 7.67473C7.21457 7.34281 7.43665 7.06286 7.74648 6.93008Z"
                  stroke="#424038"
                  stroke-width="1.5"
                />
                <rect
                  x="1"
                  y="0.75"
                  width="22.5"
                  height="22.5"
                  rx="5.25"
                  stroke="#424038"
                  stroke-width="1.5"
                />
              </svg>

              <p>افزایش امنیت برای کاربران</p>
            </div>
            <div class="benefit-item">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.5"
                  y="0.75"
                  width="22.5"
                  height="22.5"
                  rx="5.25"
                  stroke="#424038"
                  stroke-width="1.5"
                />
                <circle
                  cx="12.75"
                  cy="12"
                  r="5.25"
                  stroke="#424038"
                  stroke-width="1.5"
                />
                <path
                  d="M14.75 7L16.75 5M16.75 8.5L20.25 5"
                  stroke="#424038"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>

              <p>4 روز استفاده رایگان ابزار گرمی</p>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="#2F2F2F" dark @click="closeModal">بستن</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      dialogShow: false,
    };
  },
  methods: {
    clicked() {
      this.checked = !this.checked;
    },
    openModal() {
      this.dialogShow = true;
    },
    closeModal() {
      this.dialogShow = false;
    },
    nextLevel() {
      if (this.checked) {
        this.$emit("accepted");
        console.log("ran")
      } else {
        this.$toast.error("لطفاً قوانین را بپذیرید.");
      }
    },
  },
};
</script>

<style scoped>
  .benefits-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px; /* تغییر فاصله بین آیکون‌ها */
  }

  .benefit-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .icon {
    width: 70px; 
    height: 70px; 
    margin-bottom: 10px;
    border-radius: 8px; 
  }

  .benefit-item p {
    display: block; 
  }

  /* Custom styles for the card */
  .custom-card {
    background-color: #F7F6F3; 
    min-height: 400px; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px; 
  }

  .custom-title {
    margin-top: 1px;
    text-align: center;
  }

  .v-dialog__content {
    padding: 20px; 
  }

  .v-card-actions {
    margin-top: auto; 
  }
</style>
