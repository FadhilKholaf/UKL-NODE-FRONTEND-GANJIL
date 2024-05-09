import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  let token = localStorage.getItem("token");

  const navText =
    "text-3xl px-2 rounded-md transition duration-300 ease-in-out";

  return (
    <nav className="fixed w-screen p-4 top-0 z-10">
      <div className="flex justify-between items-center p-4 rounded-lg border-2 border-black backdrop-blur bg-white/50">
        <Link to="/" className="text-3xl">
          KOPI FADHIL
        </Link>
        <div className="flex gap-2">
          {token ? (
            <>
              <Link
                to="/"
                className={`${
                  pathname === "/" ? "border-black border-2" : ""
                } ${navText}`}
              >
                ORDER
              </Link>
              <h1 className="text-3xl">|</h1>
              <Link
                to="/menu"
                className={`${
                  pathname === "/menu" ? "border-black border-2" : ""
                } ${navText}`}
              >
                MENU
              </Link>
              <h1 className="text-3xl">|</h1>
              <Link
                to="/cart"
                className={`${
                  pathname === "/cart" ? "border-black border-2" : ""
                } ${navText}`}
              >
                CART
              </Link>
              <h1 className="text-3xl">|</h1>
              <Link
                to="/view"
                className={`${
                  pathname === "/view" ? "border-black border-2" : ""
                } ${navText}`}
              >
                VIEW HISTORY
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className={`${
                  pathname === "/" ? "border-black border-2" : ""
                } ${navText}`}
              >
                ORDER
              </Link>
              <h1 className="text-3xl">|</h1>
              <Link
                to="/cart"
                className={`${
                  pathname === "/cart" ? "border-black border-2" : ""
                } ${navText}`}
              >
                CART
              </Link>
            </>
          )}
        </div>
        <div className="flex gap-2">
          {!token ? (
            <>
              <Link
                to="/login"
                className={`${
                  pathname === "/login" ? "border-black border-2" : ""
                } ${navText}`}
              >
                LOGIN
              </Link>
            </>
          ) : (
            <>
              <h1
                className="text-3xl"
                onClick={() => {
                  localStorage.removeItem("token"), window.location.reload();
                }}
              >
                LOGOUT
              </h1>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
