import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/constants";

export default function Menu() {
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
    }[]
  >([]);

  const handleSearch = async () => {
    try {
      const data = await fetch(
        BACKEND_URL + `/coffee/search?keyword=${search}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!data.ok) {
        setFoodData([]);
      }
      const json = await data.json();
      setFoodData(json.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search]);

  const [openForm, setOpenForm] = useState(false);
  const [im, setIm] = useState<string | ArrayBuffer | null>(null);

  const [formData, setFormData] = useState<{
    image: any;
    name: string;
    size: string;
    price: number;
  }>({ image: null, name: "", size: "", price: 0 });

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIm(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormDataChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormDataSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const amba = new FormData();
    amba.append("image", formData.image);
    amba.append("name", formData.name);
    amba.append("size", formData.size);
    amba.append("price", formData.price.toString());

    await fetch(BACKEND_URL + "/coffee", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: amba,
    });

    setOpenForm(false);
    setFormData({ image: null, name: "", size: "", price: 0 });
    handleSearch();
  };

  const handleDelete = async (id: number) => {
    await fetch(BACKEND_URL + "/coffee/" + id.toString(), {
      method: "DELETE",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    handleSearch();
  };

  const [edit, setEdit] = useState<{ status: boolean; id: number | null }>({
    status: false,
    id: null,
  });

  const handleFormDataEdit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const amba = new FormData();
    amba.append("image", formData.image);
    amba.append("name", formData.name);
    amba.append("size", formData.size);
    amba.append("price", formData.price.toString());

    await fetch(BACKEND_URL + "/coffee/" + edit.id, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: amba,
    });

    setOpenForm(false);
    setFormData({ image: null, name: "", size: "", price: 0 });
    handleSearch();
  };

  return (
    <main className="w-screen min-h-screen bg-white flex justify-center pt-20">
      <div
        className={`${
          openForm ? "" : "-translate-y-full"
        }  absolute h-screen w-screen z-20 backdrop-blur top-0 transition duration-300 ease-in-out`}
      >
        <div className="h-screen w-screen flex justify-center items-center">
          <form
            className="flex flex-col justify-center items-center  gap-12 border border-black p-4 rounded-lg bg-white"
            onSubmit={edit.status ? handleFormDataEdit : handleFormDataSubmit}
          >
            <h1 className="text-3xl">
              <b>New Coffee</b>
            </h1>
            <div className="flex justify-start flex-col gap-4">
              <div className="w-full h-[300px] relative">
                <img
                  src={im as string}
                  alt=""
                  className="absolute object-cover h-full w-full"
                />
              </div>
              <div className="col-span-2 grid">
                <label htmlFor="image" className="text-start">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                  required
                />
              </div>
              <div className="col-span-2 grid">
                <label htmlFor="name" className="text-start">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border-2 border-black rounded-md"
                  onChange={(e) => handleFormDataChange(e)}
                  value={formData.name ? formData.name : ""}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="col-span-2 grid">
                <label htmlFor="size" className="text-start">
                  Size
                </label>
                <input
                  type="text"
                  name="size"
                  id="size"
                  className="border-2 border-black rounded-md"
                  onChange={(e) => handleFormDataChange(e)}
                  value={formData.size ? formData.size : ""}
                  placeholder="Size"
                  required
                />
              </div>
              <div className="col-span-2 grid">
                <label htmlFor="price" className="text-start">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="border-2 border-black rounded-md"
                  onChange={(e) => handleFormDataChange(e)}
                  value={formData.price !== 0 ? formData.price : ""}
                  placeholder="Price"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={(e) => {
                  setOpenForm(!openForm), e.preventDefault();
                  setFormData({
                    image: null,
                    name: "",
                    size: "",
                    price: 0,
                  });
                }}
                className="border-2 border-black py-1 px-3 rounded-md"
              >
                Close
              </button>
              <button
                type="submit"
                className="border-2 border-black py-1 px-3 rounded-md"
              >
                {edit.status ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className=" flex flex-col justify-center items-center gap-16 w-[70vw]">
        <h1 className="text-3xl">
          <b>Coffee Menu</b>
        </h1>
        <input
          type="text"
          placeholder="Search Menu"
          className="w-[50%] border-2 border-black p-2 rounded-md"
          onChange={(e) => setSearch(e.target.value)}
          value={search as string}
        />
        <button
          onClick={(e) => {
            setOpenForm(!openForm),
              e.preventDefault(),
              setEdit({ id: null, status: false });
          }}
          className="self-start border-2 p-2  rounded-md border-black"
        >
          Add Menu
        </button>
        <table className="w-full rounded-lg border-2 border-black">
          <thead>
            <tr className="border-2 border-black">
              <th className="text-center">Menu Name</th>
              <th className="text-center">Image</th>
              <th className="text-center">Size</th>
              <th className="text-center">Price</th>
              <th className="text-center">Action </th>
            </tr>
          </thead>
          <tbody>
            {foodData &&
              foodData.map((item, index) => (
                <tr key={index} className="border-2 border-black">
                  <td className="text-center">{item.name}</td>
                  <td className="flex justify-center items-center">
                    <img
                      src={BACKEND_URL + "/coffee/image/" + item.image}
                      alt={item.image}
                      className="w-[50px] h-[50px] p-2"
                    />
                  </td>
                  <td className="text-center">{item.size}</td>
                  <td className="text-center">{item.price}</td>
                  <td>
                    <div className="flex justify-evenly">
                      <button
                        className="rounded-md border-2 border-black px-4 py-1"
                        onClick={async () => {
                          setEdit({ status: true, id: item.id });
                          setFormData({
                            image: item.image,
                            name: item.name,
                            size: item.size,
                            price: item.price,
                          });
                          setOpenForm(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                        className="rounded-md border-2 border-black px-4 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
