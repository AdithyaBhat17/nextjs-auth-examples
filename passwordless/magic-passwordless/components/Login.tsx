import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { useUser } from "../lib/hooks";

export default function Login() {
  useUser({ redirectTo: "/", redirectIfFound: true });

  const router = useRouter();

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
      const DIDT = await magic.auth.loginWithMagicLink({
        email,
      });

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + DIDT,
        },
        body: JSON.stringify({ email }),
      });
      if (res.status === 200) {
        router.push("/");
      } else {
        setError("Failed to login");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
          placeholder="email"
        />
        <button disabled={loading} type="submit">
          {loading ? "Please wait..." : "Login"}
        </button>
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
      </form>
      <style jsx>
        {`
          * {
            font-family: Inter;
          }
          form {
            display: block;
            margin: 0 auto;
            width: 30%;
          }
          input {
            display: block;
            margin: 25vh auto 25px;
            width: 100%;
            padding: 20px;
            font-size: 18px;
            border-radius: 10px;
            border: 2px solid #845ec2;
            width: 100%;
          }
          button {
            display: block;
            background-color: #845ec2;
            color: #fff;
            padding: 20px;
            border-radius: 10px;
            border: none;
            width: 100%;
            font-size: 18px;
            cursor: pointer;
          }
          button::disabled: {
            opacity: 0.6;
          }
        `}
      </style>
    </>
  );
}
