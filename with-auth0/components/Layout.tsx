import React, { ReactNode } from "react";
import UserProvider from "../lib/user";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => (
  <UserProvider>
    <main>
      <div className="container">{children}</div>
    </main>
  </UserProvider>
);

export default Layout;
