import { Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";


function RootLayout() {
  return (
    <>
      {/* the component that shared by all children component */}
      <MainNavigation />

      {/* Outlet is where the child component should be rendered to */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
