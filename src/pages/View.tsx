import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/constants";

export default function View() {
  const [dataHistory, setDataHistory] = useState<
    {
      id: number;
      customer_name: string;
      order_type: string;
      order_date: string;
      createdAt: string;
      updatedAt: string;
      order_details: {
        id: number;
        order_id: number;
        coffee_id: number;
        quantity: number;
        price: number;
        createdAt: string;
        updatedAt: string;
        coffee: {
          id: number;
          name: string;
          size: string;
          price: number;
          image: string;
          createdAt: string;
          updatedAt: string;
        };
      }[];
    }[]
  >([]);

  const fetchData = async () => {
    await fetch(BACKEND_URL + "/order", {
      method: "GET",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(async (result: any) => {
        const json = await result.json();
        setDataHistory(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const asd = (order: any) => {
    let amba = 0;
    order.order_details.forEach((detail: any) => {
      amba += detail.price;
    });
    return amba;
  };

  return (
    <main className="pt-28 min-h-screen w-screen flex justify-center items-center">
      <div className="border-2 border-black p-8 rounded-lg gap-8 flex flex-col w-[90vw]">
        <h1 className="text-3xl text-center">
          <b>Transaction History</b>
        </h1>
        <table className="w-full">
          <thead className="border-2 border-black">
            <tr>
              <td>No</td>
              <td>Date</td>
              <td>Customer Name</td>
              <td>Order Type</td>
              <td>Detail Order</td>
              <td>Total Price</td>
            </tr>
          </thead>
          <tbody className="border-2 border-black">
            {dataHistory &&
              dataHistory.map((list, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{list.order_date}</td>
                  <td>{list.customer_name}</td>
                  <td>{list.order_type}</td>
                  <td>
                    <ul>
                      {list.order_details.map((detail, index) => (
                        <li key={index}>- {detail.coffee.name} size {detail.coffee.size} ({detail.quantity})</li>
                      ))}
                    </ul>
                  </td>
                  <td>{asd(list)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
