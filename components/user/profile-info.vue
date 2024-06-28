<template>
  <div class="d-flex align-center px-2 mt-5 mb-8 overflow-hidden relative">
    <div
      v-if="
        (isMine && $store.state.userData?.role === 'seller') ||
        (!isMine && user?.role === 'seller')
      "
      class="absolute top-0 right-0 z-10"
      ><svg
        width="40"
        height="39"
        viewBox="0 0 40 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.941162"
          y="19.5"
          width="27.5772"
          height="27.5772"
          rx="6"
          transform="rotate(-45 0.941162 19.5)"
          fill="#D9BA4B"
        />
        <path
          d="M15.5002 13.5V15.9271C15.5002 16.2435 15.2437 16.5 14.9273 16.5C14.5014 16.5 14.2244 16.0518 14.4148 15.6708L15.5002 13.5Z"
          fill="white"
        />
        <path
          d="M15.7502 14C15.7502 13.7239 15.9741 13.5 16.2502 13.5H16.7502C17.0264 13.5 17.2502 13.7239 17.2502 14V15.75C17.2502 16.1642 16.9145 16.5 16.5002 16.5C16.086 16.5 15.7502 16.1642 15.7502 15.75V14Z"
          fill="white"
        />
        <path
          d="M17.5002 14C17.5002 13.7239 17.7241 13.5 18.0002 13.5H18.5002C18.7764 13.5 19.0002 13.7239 19.0002 14V15.75C19.0002 16.1642 18.6645 16.5 18.2502 16.5C17.836 16.5 17.5002 16.1642 17.5002 15.75V14Z"
          fill="white"
        />
        <path
          d="M19.2502 14C19.2502 13.7239 19.4741 13.5 19.7502 13.5H20.2502C20.5264 13.5 20.7502 13.7239 20.7502 14V15.75C20.7502 16.1642 20.4145 16.5 20.0002 16.5C19.586 16.5 19.2502 16.1642 19.2502 15.75V14Z"
          fill="white"
        />
        <path
          d="M21.0002 14C21.0002 13.7239 21.2241 13.5 21.5002 13.5H22.0002C22.2764 13.5 22.5002 13.7239 22.5002 14V15.75C22.5002 16.1642 22.1645 16.5 21.7502 16.5C21.336 16.5 21.0002 16.1642 21.0002 15.75V14Z"
          fill="white"
        />
        <path
          d="M22.7502 14C22.7502 13.7239 22.9741 13.5 23.2502 13.5H23.7502C24.0264 13.5 24.2502 13.7239 24.2502 14V15.75C24.2502 16.1642 23.9145 16.5 23.5002 16.5C23.086 16.5 22.7502 16.1642 22.7502 15.75V14Z"
          fill="white"
        />
        <path
          d="M24.5002 13.5L25.5857 15.6708C25.7761 16.0518 25.4991 16.5 25.0732 16.5C24.7568 16.5 24.5002 16.2435 24.5002 15.9271V13.5Z"
          fill="white"
        />
        <path
          d="M15.5002 13L14.5002 15H25.5002L24.5002 13H15.5002Z"
          fill="white"
        />
        <path
          d="M15.0002 18C15.0002 17.4477 15.448 17 16.0002 17H24.0002C24.5525 17 25.0002 17.4477 25.0002 18V23C25.0002 24.1046 24.1048 25 23.0002 25H17.0002C15.8957 25 15.0002 24.1046 15.0002 23V18Z"
          fill="white"
        />
        <path
          d="M18.5002 23C18.5002 22.1716 19.1718 21.5 20.0002 21.5C20.8287 21.5 21.5002 22.1716 21.5002 23V25.5H18.5002V23Z"
          fill="white"
          stroke="#D9BA4B"
        />
      </svg>
    </div>
    <div v-else class="absolute top-0 right-0 z-10">
      <svg
        width="28"
        height="32"
        viewBox="0 0 28 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.5 1.44343C14.953 0.550269 13.047 0.550269 11.5 1.44343L2.64355 6.55668C1.09655 7.44985 0.143555 9.10048 0.143555 10.8868V21.1133C0.143555 22.8996 1.09655 24.5503 2.64355 25.4434L11.5 30.5567C13.047 31.4498 14.953 31.4498 16.5 30.5567L25.3564 25.4434C26.9034 24.5503 27.8564 22.8996 27.8564 21.1133V10.8868C27.8564 9.10048 26.9034 7.44985 25.3564 6.55668L16.5 1.44343ZM19.3011 12.2847C19.6916 12.6752 19.6916 13.3084 19.3011 13.6989L13.9503 19.0497L13.9581 19.0576L13.251 19.7647C12.8605 20.1552 12.2273 20.1552 11.8368 19.7647L9.70707 17.6349C9.31654 17.2444 9.31655 16.6112 9.70707 16.2207C10.0976 15.8302 10.7308 15.8302 11.1213 16.2207L12.5361 17.6355L17.8869 12.2847C18.2774 11.8942 18.9106 11.8942 19.3011 12.2847Z"
          fill="#43A274"
        />
      </svg>
    </div>
    <v-form-avatar-picker
      :value="avatar"
      @input="updateAvatar"
      withCrop
      :editable="editable"
    />
    <div v-if="isMine" class="mr-5">
      <p class="xl-text font-weight-500 truncate"
        >{{
          $store.state.userData?.shop_name ||
          ($store.state.userData?.first_name &&
            $store.state.userData?.last_name)
            ? $store.state.userData?.first_name +
              " " +
              $store.state.userData?.last_name
            : "کاربر گرمی"
        }}
      </p>
      <p
        v-if="$store.state.userData?.role === 'seller'"
        class="md-text grey--text"
      >
        <v-icon color="grey" small> mdi-phone</v-icon>
        {{ $store.state.userData?.phone || $store.state.userData?.cellphone }}
      </p>
      <p v-if="user?.shop_address || user?.address" class="md-text grey--text">
        <v-icon color="grey" small> mdi-map-marker</v-icon>
        {{
          $store.state.userData?.shop_address || $store.state.userData?.address
        }}
      </p>
    </div>
    <div v-else class="mr-5">
      <p class="xl-text font-weight-500 truncate"
        >{{ user?.shop_name || user?.first_name + " " + user?.last_name }}
      </p>
      <p class="md-text grey--text">
        <v-icon color="grey" small> mdi-phone</v-icon>
        {{ user?.phone || user?.cellphone }}
      </p>
      <p v-if="user?.shop_address || user?.address" class="md-text grey--text">
        <v-icon color="grey" small> mdi-map-marker</v-icon>
        {{ user?.shop_address || user?.address }}
      </p>
    </div>
  </div>
</template>
<script>
  import services from "@/services";
  export default {
    props: {
      editable: {
        type: Boolean,
        default: false,
      },
      user: {
        type: Object,
        required: true,
      },
      isMine: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        avatar: this.isMine
          ? this.$store.state.userData?.image
          : this.user.image,
      };
    },
    methods: {
      updateAvatar(media_id) {
        services.user
          .update({
            avatar: media_id,
          })
          .then((response) => {
            this.$store.commit("updateUser", response.data);
          });
      },
    },
  };
</script>
