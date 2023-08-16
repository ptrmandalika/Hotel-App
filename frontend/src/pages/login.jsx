import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const saveLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:8000/login",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          localStorage.setItem("access", JSON.stringify(response.data.token));
          localStorage.setItem("user", JSON.stringify(response.data.data));
        });
      router.push("/management/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-base-200">
      {msg ? (
        <div className="toast">
          <div className="alert alert-info">
            <span>{msg}</span>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="card w-96 bg-base-100 shadow-xl">
        <form
          className="card-body"
          onSubmit={saveLogin}
          encType="application/json"
        >
          <h2 className="card-title">Login</h2>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered input-info w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered input-info w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="card-actions justify-end pt-2">
            <button className="btn btn-info" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
