import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Datepicker from "react-tailwindcss-datepicker";
import Layout from "@/components/Layout";
import axios from "axios";

export default function List() {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [roomData, setRoomData] = useState([]);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem("value")));
    setRoomData(JSON.parse(localStorage.getItem("roomData")));
  }, []);

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
        .then((response) => setRoomData(response.data.room));
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Layout>
      <form
        className="flex relative gap-4 p-8"
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
      <article>
        <div className="flex flex-row justify-center gap-4">
          {roomData
            ? roomData.map((data, index) => (
                <div className="card w-96 bg-base-100 shadow-xl" key={index}>
                  <figure className="max-h-56">
                    <img src={data.image} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {data.room_type_name}
                      <div className="badge badge-secondary">
                        Tersisa {data.room.length}
                      </div>
                    </h2>
                    <p>{data.description}</p>
                    <p className="text-red-500 text-xl font-semibold">
                      IDR {data.price}
                    </p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          localStorage.setItem("value", JSON.stringify(value));
                          localStorage.setItem(
                            "room",
                            JSON.stringify(roomData[index])
                          );
                          router.push("/user/pesan");
                        }}
                      >
                        PESAN
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </article>
    </Layout>
  );
}
