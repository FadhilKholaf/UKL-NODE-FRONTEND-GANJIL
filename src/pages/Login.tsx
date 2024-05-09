import { useState } from "react";
import { BACKEND_URL } from "../constants/constants";

export default function Login() {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const response = await fetch(BACKEND_URL + "/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await response.json();

    if (json.status === true) {
      localStorage.setItem("token", json.token);
      alert("Login Berhasil");
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    } else {
      alert("Login Gagal");
    }
  };
  return (
    <main className="flex w-screen h-screen justify-center items-center">
      <div className="border border-black rounded-lg p-12 h-[20rem] flex flex-col justify-center ">
        <h1 className="text-center text-3xl mb-8">
          <b>Login</b>
        </h1>
        <form onSubmit={handleLogin} className="grid col-span-2">
          <label htmlFor="email">Email</label>
          <input
            className="border-2 border-red-700 hover:border-black rounded-md "
            type="email"
            name="email"
            id="email"
            placeholder="example@email.com"
            required
            onChange={(e) => handleFormChange(e)}
            value={form.email}
          />
          <label htmlFor="password">Password</label>
          <input
            className="border-2 border-red-700 hover:border-black rounded-md "
            type="password"
            name="password"
            id="password"
            placeholder="********"
            required
            onChange={(e) => handleFormChange(e)}
            value={form.password}
          />
          <button
            type="submit"
            className="mt-8 border-2 border-red-700 rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
