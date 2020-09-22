import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { useRouter } from "next/router";

interface UserParams {
  redirectTo: string;
  redirectIfFound?: boolean;
}

interface User {
  email: string;
}

export function useUser({
  redirectTo,
  redirectIfFound,
}: UserParams): User | null {
  const router = useRouter();
  const { data, error } = useSWR("/api/user", fetcher);
  const user = data?.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    // if redirect is set, redirect if user is not found
    if (
      (redirectTo && !redirectIfFound && !hasUser) ||
      // if redirectIfFound is set, redirect user if found.
      (redirectIfFound && hasUser)
    ) {
      router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, hasUser, finished]);

  return error ? null : user;
}
