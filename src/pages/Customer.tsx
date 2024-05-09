import { Link } from "react-router-dom";

export default function Customer() {
  return (
    <main className="w-screen h-screen pt-28 px-28">
      <div className="mb-8">
        <Link to={"/"} className="text-xl">
          {"< "}Choose Menu
        </Link>
      </div>
      <div className="flex h-full pb-28 gap-8">
        <div className="border-2 border-black w-full h-full rounded-lg p-8 ">
          <h1 className="text-3xl">Order Details</h1>
          <table className="mt-6 w-full">
            <thead>
              <tr>
                <th className="text-start">Product Details</th>
                <th>Price</th>
                <th>Total</th>
                <th>Delete</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="border-2 border-black w-[70%] h-[60vh] rounded-lg p-8">
          <h1 className="text-3xl">Customer Information</h1>
          <form className="mt-6 flex flex-col gap-6">
            <div className="flex justify-between gap-4">
              <label htmlFor="customer">Customer Name</label>
              <input
                type="text"
                id="customer"
                className="border-2 border-black rounded-md"
              />
            </div>
            <div className="flex gap-8 justify-between">
              <p>Order Type</p>
              <div className="flex gap-4">
                <input
                  type="radio"
                  name="orderType"
                  id="orderType"
                  value={"dine in"}
                />
                <label htmlFor="orderType">Dine In</label>
              </div>
              <div className="flex gap-4">
                <input
                  type="radio"
                  name="orderType"
                  id="orderType"
                  value={"take away"}
                />
                <label htmlFor="orderType">Take Away</label>
              </div>
            </div>
            <div className="w-full h-[2px] bg-black rounded-full"></div>
            <h1 className="text-xl">
              <b>Order Summary</b>
            </h1>
            <div className="flex justify-between">
              <p>Items (0)</p>
              <p>Rp 10000</p>
            </div>
            <div className="flex justify-between">
              <p>Tax Change</p>
              <p>Rp 10000</p>
            </div>
            <div className="flex justify-between text-2xl ">
              <p>
                <b>Grand Total</b>
              </p>
              <p>
                <b>Rp 10000</b>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
