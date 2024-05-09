import { useEffect, useState } from "react";
import "./App.css";
import { BACKEND_URL } from "./constants/constants";

function App() {
  const [search, setSearch] = useState<String>("");
  const [foodData, setFoodData] = useState<
    {
      id: number;
      name: string;
      size: string;
      price: number;
      image: string;
      createdAt: string;
      updatedAt: string;
      quantity: string | null;
    }[]
  >();

  const handleSearch = async () => {
    try {
      await fetch(BACKEND_URL + `/coffee/search?keyword=${search}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then(async (data) => {
          if (!data.ok) {
            setFoodData([]);
          }
          const json = await data.json();
          let tempJson;
          const ls = localStorage.getItem("cartItems");
          if (ls) {
            const lsArray = JSON.parse(ls);
            tempJson = json.data.map((item: any) => {
              const will = lsArray.find((itx: any) => {
                return itx.id === item.id;
              });
              if (will !== undefined) {
                return { ...item, quantity: will.quantity };
              }
              return item;
            });
            return setFoodData(tempJson);
          }
          return setFoodData(json.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  const handleAddCartItems = (id: number) => {
    const ls = localStorage.getItem("cartItems");
    let cartItems;
    let updatedCartItems;
    if (ls) {
      cartItems = JSON.parse(ls);
    }
    if (cartItems === undefined) {
      updatedCartItems = [{ id, quantity: 1 }];
    } else {
      const existingItemIndex = cartItems.findIndex(
        (item: any) => item.id === id
      );
      if (existingItemIndex !== -1) {
        updatedCartItems = cartItems.map((item: any, index: number) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        updatedCartItems = [...cartItems, { id, quantity: 1 }];
      }
    }
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setQuantity();
  };

  const setQuantity = async () => {
    let tempFood;
    const ls = localStorage.getItem("cartItems");
    if (foodData && ls) {
      const lsArray = JSON.parse(ls);
      tempFood = foodData.map((item) => {
        const will = lsArray.find((itx: any) => {
          return itx.id === item.id;
        });
        if (will !== undefined) {
          return { ...item, quantity: will.quantity };
        }
        return item;
      });
      setFoodData(tempFood);
    } else {
      setFoodData([]);
    }
  };

  return (
    <main className="flex flex-col gap-20 mt-28 justify-center items-center">
      <h1 className="text-3xl">Coffee Ordering System</h1>
      <input
        type="text"
        className="border-2 border-black rounded-full p-2 w-1/3"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        value={search as string}
      />
      <div className="col-span-3 flex gap-8">
        {foodData &&
          foodData.map((coffee, index) => (
            <div
              key={index}
              className="w-[300px] h-[500px] border-2 border-black flex flex-col gap-4 p-4 rounded-lg"
            >
                <div className="relative w-full h-[300px]">
                  <img
                    src={BACKEND_URL + "/coffee/image/" + coffee.image}
                    alt={coffee.image}
                    className="absolute left-1/2 -translate-x-1/2 h-full w-full object-cover rounded-lg"
                  />
                </div>
              <h1>{coffee.name}</h1>
              <h1>Size : {coffee.size}</h1>
              <h1>Size : {coffee.price}</h1>
              <div className="flex gap-4 items-center">
                <button
                  className="border-2 border-black w-[2rem] h-[2rem] rounded-full"
                  onClick={() => {}}
                >
                  -
                </button>
                <p>{coffee.quantity ? coffee.quantity : 0}</p>
                <button
                  className="border-2 border-black w-[2rem] h-[2rem] rounded-full"
                  onClick={() => {
                    handleAddCartItems(coffee.id);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
