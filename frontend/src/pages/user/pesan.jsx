import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/Layout";

export default function Pesan() {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [room, setRoom] = useState([]);
  const [bookerName, setBookerName] = useState("");
  const [bookerEmail, setBookerEmail] = useState("");
  const [guestName, setGuestName] = useState("");
  const [totalRoom, setTotalRoom] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem("value")));
    setRoom(JSON.parse(localStorage.getItem("room")));
  }, []);

  const savePemesanan = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:8000/booking",
          {
            booker_name: bookerName,
            booker_email: bookerEmail,
            check_in_date: value.startDate,
            check_out_date: value.endDate,
            guest_name: guestName,
            total_room: totalRoom,
            room_type_id: room.room_type_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) =>
          localStorage.setItem("booking", JSON.stringify(response.data))
        );
      localStorage.removeItem("roomData");
      localStorage.removeItem("value");
      router.push("/user/cek-pemesanan");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col w-full lg:flex-row p-8">
        {room ? (
          <div className="card w-96 max-h-72 bg-base-100 shadow-xl image-full">
            <figure>
              <img src={room.image} alt="Image" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{room.room_type_name}</h2>
              <p>
                {value.startDate} ~ {value.endDate}
              </p>
              <div className="card-actions justify-end">
                <p className="text-xl text-end font-semibold">
                  IDR {room.price}
                </p>
              </div>
            </div>
          </div>
        ) : (
          router.push("/")
        )}
        <div className="divider lg:divider-horizontal"></div>
        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
          <form
            className="form-control w-full max-w-xs p-8"
            onSubmit={savePemesanan}
            encType="application/json"
          >
            <h2 className="text-xl text-center font-semibold">
              Form Pemesanan
            </h2>
            <label className="label">
              <span className="label-text">Nama Pemesan</span>
            </label>
            <input
              type="text"
              placeholder="Type Here"
              className="input input-bordered w-full max-w-xs"
              value={bookerName}
              onChange={(e) => setBookerName(e.target.value)}
            />
            <label className="label">
              <span className="label-text">Email Pemesan</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={bookerEmail}
              onChange={(e) => setBookerEmail(e.target.value)}
            />
            <label className="label">
              <span className="label-text">Nama Tamu</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
            <label className="label">
              <span className="label-text">Jumlah Kamar</span>
              <span className="label-text-alt">
                Tersisa {room.room ? room.room.length : ""} kamar!
              </span>
            </label>
            <input
              type="Number"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={totalRoom}
              onChange={(e) => setTotalRoom(e.target.value)}
            />
            <button className="btn btn-primary mt-4" type="submit">
              Pesan Sekarang!
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
