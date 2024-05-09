import { Link } from "react-router-dom";

export default function Customer() {
  return (
    <main className="w-screen h-screen pt-28 px-28">
      <Link to={"/"}>{"< "}Choose Menu</Link>
      <div className="flex">
        <div className="border-2 border-black "></div>
      </div>
    </main>
  );
}
