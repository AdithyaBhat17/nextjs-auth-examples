import { createContext, useContext, useEffect, useState } from "react";
import { Auth0User, User } from "../interfaces";

let userState: Auth0User;

const UserContext = createContext<User>({
  user: null,
  loading: false,
});

// @ts-ignore
export default function UserProvider({ children }) {
  const value = useUserValue();
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

async function fetchUser() {
  if (userState) {
    return userState;
  }

  const response = await fetch("/api/me");
  userState = response.ok ? await response.json() : null;
  return userState;
}

export function useUserValue(): User {
  const [data, setData] = useState({
    user: userState || null,
    loading: userState === undefined,
  });

  useEffect(() => {
    if (userState) {
      return;
    }

    let mounted = true;
    fetchUser().then((user: Auth0User) => {
      if (mounted) {
        setData({ user, loading: false });
      }
    });

    return () => {
      mounted = false;
    };
  }, [userState]);

  return data;
}

export const useUser = () => useContext(UserContext);
