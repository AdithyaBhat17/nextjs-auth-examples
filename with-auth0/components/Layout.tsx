import React, { ReactNode } from "react";
import UserProvider from "../lib/user";

export type ChildrenProps = {
  children?: ReactNode;
};

const Layout = ({ children }: ChildrenProps) => (
  <UserProvider>
    <main>
      <div className="container">{children}</div>
    </main>
  </UserProvider>
);

export default Layout;
