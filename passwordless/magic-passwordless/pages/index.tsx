import React from "react";
import Login from "../components/Login";
import { useUser } from "../lib/hooks";

export default function Home() {
  const user = useUser({
    redirectTo: "/",
  });

  if (!user) {
    return <Login />;
  }

  return <div>Logged in as {JSON.stringify(user, null, 2)}</div>;
}
