import { PanelChildrens } from "../constants/Pages";

export default function ({ redirect, store, route }) {
  if (process.server) return;

  console.log("store.state.userData", store.state.userData, route);
  const isAuthenticated = store.state.userData ? true : false;
  if (!isAuthenticated) redirect({ name: "login" });

  const matchedRoute = route.matched.length ? route.matched[0] : null;
  console.log("matchedRoute", matchedRoute?.path);
  if (matchedRoute?.path) {
    const foundRoute = Object.values(PanelChildrens)
      .map((val) => val.items)
      .flat()
      .find((val) => val?.path?.indexOf(matchedRoute?.path) >= 0);

    if (
      foundRoute &&
      !foundRoute?.roles?.includes(store.state.userData?.roleName)
    )
      redirect({ name: "login" });
  } else redirect({ name: "login" });
}
