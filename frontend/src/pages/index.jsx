import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import Layout from "@/components/Layout";

export default function Home() {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [roomType, setRoomType] = useState([]);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    getRoomType();
  }, []);

  const getRoomType = async () => {
    const response = await axios.get("http://localhost:8000/roomtype");
    setRoomType(response.data);
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const saveDate = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:8000/filtering",
          {
            check_in_date: value.startDate,
            check_out_date: value.endDate,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) =>
          localStorage.setItem("roomData", JSON.stringify(response.data.room))
        );
      localStorage.setItem("value", JSON.stringify(value));
      router.push("/user/list");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <header className="hero bg-[url(https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg)] bg-base-100 bg-blend-multiply py-48">
        <div>
          <div className="hero-content text-center">
            <div className="max-w-xl">
              <h1 className="text-4xl font-semibold">
                hai kamu
                <span className="text-5xl font-bold">, mau staycation?</span>
              </h1>
              <form
                className="flex space-x-2 mt-6"
                onSubmit={saveDate}
                encType="application/json"
              >
                <Datepicker
                  inputClassName="w-full p-3 rounded-lg"
                  placeholder="Check In ~ Check Out"
                  value={value}
                  onChange={handleValueChange}
                />
                <button className="btn btn-primary" type="submit">
                  Cari
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>
      {/* Content */}
      <article className="py-8">
        <h2 className="text-center text-2xl font-semibold">Our Room Types</h2>
        <div className="flex flex-row justify-center gap-4 mt-8">
          {roomType.map((data, index) => (
            <div className="card w-96 bg-base-100 shadow-xl" key={index}>
              <figure className="max-h-56">
                <img src={data.image} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {data.room_type_name}
                  <div className="badge badge-secondary">IDR {data.price}</div>
                </h2>
                <p>{data.description}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </Layout>
  );
}
