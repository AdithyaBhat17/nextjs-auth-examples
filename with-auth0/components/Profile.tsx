import React from "react";
import { useUser } from "../lib/user";

export default function Profile() {
  const { user, loading } = useUser();
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      {user ? (
        <a href="/api/logout?returnTo=http://localhost:3000">Logout</a>
      ) : null}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
