import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        data
      );

      const res_data = res.data;
      setResponse(res_data);
      toast(res_data.message.title, {
        description: res_data.message.description,
      });

      // if (rememberMe) {
      // }

      localStorage.setItem("token", res_data.data.token);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      toast(res.message.title, {
        description: res.message.description,
      });
    } finally {
      setLoading(false);
    }
  };

  function handleInput(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  return (
    <div className="gird-cols-1 grid h-dvh lg:grid-cols-3">
      <div className="flex items-center justify-center lg:col-span-2">
        <div className="w-[384px]">
          <div className="">
            <img
              width={100}
              height={80}
              className="-ml-6"
              src="/images/coffee-logo.png"
              alt="Coffee shop"
            />
            <h2 className="mt-2 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login to your account
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Not a member?
            <Link
              to="/auth/signup"
              className="ml-1 font-semibold leading-6 text-primary hover:text-primary/90"
            >
              Sign up
            </Link>
          </p>

          <div className="mt-10 sm:w-full">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={(e) => handleInput(e)}
                    required
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-primary hover:text-primary-foreground"
                    >
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => handleInput(e)}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <p className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-primary"
                />
                <label
                  htmlFor="remember-me"
                  className="cursor-pointer text-sm font-medium text-slate-800"
                >
                  Remember me
                </label>
              </p>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="hover:bg-primarytext-primary-foreground flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden overflow-hidden lg:block">
        <img
          width={700}
          height={950}
          src="/images/login-thumbnail.jpg"
          className="h-full w-full object-cover"
          alt="Login Thumbnail"
        />
      </div>
    </div>
  );
}
