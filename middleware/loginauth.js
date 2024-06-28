export default function ({ redirect, store }) {
  if (process.server) return;

  const isAuthenticated = store.state.userData ? true : false;
  console.log(isAuthenticated);
  if (isAuthenticated) {
    redirect({ path: "/" });
  }
}
