export const PanelChildrens = {
  category1: {
    icon: "mdi-home",
    title: "ماژول ها",
    items: [
      {
        path: "/admin/dashboard",
        name: "dashboard",
        title: "داشبورد",
        icon: "mdi-view-dashboard",
        show: true,
        roles: ["admin"],
      },

      {
        path: "/admin/products",
        name: "products",
        title: "آگهی ها",
        show: true,
        icon: "mdi-package-variant-closed",
        roles: ["admin"],
      },

      {
        path: "/admin/proposals",
        name: "proposals",
        title: "پیشنهاد ها",
        show: true,
        icon: "mdi-package-variant-closed",
        roles: ["admin"],
      },

      {
        path: "/admin/attributes",
        name: "products",
        title: "ویژگی ها",
        show: true,
        icon: "mdi-package-variant-closed",
        roles: ["admin"],
      },

      {
        path: "/admin/payments",
        name: "payments",
        title: "پرداخت ها",
        show: true,
        icon: "mdi-package-variant-closed",
        roles: ["admin"],
      },

      // {
      //   path: "/admin/categories/courses",
      //   name: "categoriesCourses",
      //   title: "دسته بندی آموزش",
      //   show: true,
      //   icon: "mdi-package-variant-closed",
      //   roles: ["admin"],
      // },
      // {
      //   path: "/admin/categories/projects",
      //   name: "categoriesProjects",
      //   title: "دسته بندی پروژه",
      //   show: true,
      //   icon: "mdi-package-variant-closed",
      //   roles: ["admin"],
      // },

      {
        path: "/admin/media",
        name: "media",
        title: "گالری",
        show: true,
        icon: "mdi-package-variant-closed",
        roles: ["admin"],
      },
    ],
  },
  support: {
    icon: "mdi-shield-account",
    title: "پشتیبانی",
    items: [
      {
        path: "/admin/reports",
        name: "reports",
        title: "گزارش ها",
        show: true,
        icon: "mdi-package-variant-closed",
        roles: ["admin"],
      },
      {
        path: "/admin/notifications",
        name: "notifications",
        title: "اعلان ها",
        show: true,
        icon: "mdi-package-variant-closed",
        roles: ["admin"],
      },
      {
        path: "/admin/tickets",
        name: "notifications",
        title: "پشتیبانی",
        show: true,
        icon: "mdi-package-variant-closed",
        roles: ["admin"],
      },
    ],
  },
  user: {
    icon: "mdi-account-box",
    title: "کاربران",
    items: [
      {
        path: "/admin/users",
        name: "users",
        title: "کاربر ها",
        show: true,
        icon: "mdi-account-group",
        roles: ["admin"],
      },
      {
        path: "/admin/bookmarks",
        name: "payments",
        title: "نشان شده ها",
        show: true,
        icon: "mdi-package-variant-closed",
        roles: ["admin"],
      },
    ],
  },

  // settings: {
  //   icon: "mdi-cog",
  //   title: "تنظیمات",
  //   items: [
  //     {
  //       path: "/admin/settings/home",
  //       name: "skills",
  //       title: "صفحه اصلی",
  //       show: true,
  //       icon: "mdi-cog-outline",
  //       roles: ["admin"],
  //     },
  //   ],
  // },
};

export const UserPanelChildrens = [
  {
    path: "/panel/dashboard",
    name: "dashboard",
    title: "پنل کاربری",
  },
  {
    path: "/panel/orders",
    name: "orders",
    title: "سفارشات",
  },
  {
    path: "/panel/purchases",
    name: "purchases",
    title: "خرید ها ",
  },
  {
    path: "/panel",
    name: "profile",
    title: "پروفایل من",
  },
  {
    path: "/panel/Messages",
    name: "Messages",
    title: "پیام های من",
  },
];
