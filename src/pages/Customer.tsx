import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../constants/constants";

export default function Customer() {
  const [coffee, setCoffee] = useState<Array<any>>();
  const [order, setOrder] = useState<{
    customer_name: string;
    order_type: "dine in" | "take away";
    order_date: Date;
    order_detail: { coffee_id: number; quantity: number }[];
  }>({
    customer_name: "",
    order_type: "dine in",
    order_date: new Date(),
    order_detail: [],
  });

  const handleOrderChange = (e: any) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e: any) => {
    e.preventDefault();
    const ls = localStorage.getItem("cartItems");
    if (ls) {
      const lsArray = JSON.parse(ls).map((item: any) => {
        return { coffee_id: item.id, quantity: item.quantity };
      });
      const amba = { ...order, order_detail: lsArray };
      await fetch(BACKEND_URL + "/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(amba),
      });
      setOrder({
        customer_name: "",
        order_type: "dine in",
        order_date: new Date(),
        order_detail: [],
      });
      localStorage.removeItem("cartItems");
      setCoffee([]);
    } else {
      alert("Please order at least 1 item!");
    }
  };

  const getCoffee = async () => {
    await fetch(BACKEND_URL + "/coffee/search?keyword=")
      .then(async (result: any) => {
        let json = await result.json();
        const ls = localStorage.getItem("cartItems");
        if (ls) {
          const lsArray = JSON.parse(ls);
          const coffeeJson = json.data;
          const updatedJson = coffeeJson
            .map((item: any) => {
              const m = lsArray.find((itx: any) => {
                return itx.id === item.id;
              });
              if (m) {
                return { ...item, quantity: m.quantity };
              }
            })
            .filter((item: any) => {
              return item !== undefined;
            });
          setCoffee(updatedJson);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteItem = (id: number) => {
    const ls = localStorage.getItem("cartItems");
    if (ls) {
      const lsArray = JSON.parse(ls);
      const deleteItem = coffee
        ?.map((item: any) => {
          const itemWillDeleted = lsArray.find((itx: any) => {
            return itx.id === id;
          });
          if (itemWillDeleted.id === item.id) {
            return null;
          }
          return item;
        })
        .filter((item: any) => {
          return item !== null;
        });
      setCoffee(deleteItem);
      localStorage.setItem("cartItems", JSON.stringify(deleteItem));
    }
  };

  const handleModifyItem = (id: any, operator: boolean) => {
    const ls = localStorage.getItem("cartItems");
    if (ls) {
      const lsArray = JSON.parse(ls);
      let updatedItems = lsArray
        .map((item: any) => {
          if (item.quantity <= 0) {
            return null;
          }
          if (item.id === id) {
            return { ...item, quantity: item.quantity + (operator ? +1 : -1) };
          }
          return item;
        })
        .filter((item: any) => {
          return item !== null;
        });
      updatedItems = updatedItems
        .map((item: any) => {
          if (item.quantity === 0) {
            return null;
          }
          return item;
        })
        .filter((item: any) => {
          return item !== null;
        });
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      getCoffee();
    }
  };

  useEffect(() => {
    getCoffee();
  }, []);

  const rupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <main className="w-full h-full pt-28 px-28">
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
                <th className="text-start">Price</th>
                <th className="text-start">Total</th>
                <th className="text-start">Delete</th>
              </tr>
            </thead>
            <tbody>
              {coffee &&
                coffee.map((item: any, index) => (
                  <tr key={index}>
                    <td className="flex w-fit py-4 gap-4">
                      <div className="relative h-[60px] w-[100px] ">
                        <img
                          src={BACKEND_URL + "/coffee/image/" + item.image}
                          alt=""
                          className="absolute object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h1>{item.name}</h1>
                        <div className="flex gap-4 items-center">
                          <button
                            className="border-2 border-black rounded-full w-8 h-8"
                            onClick={() => handleModifyItem(item.id, false)}
                          >
                            -
                          </button>
                          <p className="border-2 border-black text-center w-12 h-7">
                            {item.quantity}
                          </p>
                          <button
                            className="border-2 border-black rounded-full w-8 h-8"
                            onClick={() => handleModifyItem(item.id, true)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>{rupiah(item.price)}</td>
                    <td>{rupiah(item.price * item.quantity)}</td>
                    <td>
                      <button
                        className="p-2 border-2 border-black rounded-md"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="border-2 border-black w-[70%] h-fit rounded-lg p-8">
          <h1 className="text-3xl">Customer Information</h1>
          <form
            className="mt-6 flex flex-col gap-6"
            onSubmit={handleOrderSubmit}
          >
            <div className="flex justify-between gap-4">
              <label htmlFor="customer">Customer Name</label>
              <input
                type="text"
                id="customer"
                name="customer_name"
                className="border-2 border-black rounded-md"
                onChange={(e) => handleOrderChange(e)}
                value={order.customer_name}
                required
              />
            </div>
            <div className="flex gap-8 justify-between">
              <p>Order Type</p>
              <div className="flex gap-4">
                <input
                  type="radio"
                  name="order_type"
                  id="orderType"
                  onChange={(e) => handleOrderChange(e)}
                  value="dine in"
                  checked={order.order_type === "dine in" ? true : false}
                  required
                />
                <label htmlFor="orderType">Dine In</label>
              </div>
              <div className="flex gap-4">
                <input
                  type="radio"
                  name="order_type"
                  id="orderType"
                  onChange={(e) => handleOrderChange(e)}
                  value="take away"
                  checked={order.order_type === "take away" ? true : false}
                  required
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
            <button
              type="submit"
              className="mt-8 border-2 border-black rounded-md text-xl py-1"
            >
              <b>Process Payment on Cashier</b>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
