import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Sidebar from "@/components/Sidebar";

export default function EditUser() {
  const [number, setNumber] = useState(0);
  const [type, setType] = useState(1);
  const [roomType, setRoomType] = useState([]);
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getRoomById = async () => {
      const token = JSON.parse(localStorage.getItem("access"));
      try {
        const response = await axios.get(`http://localhost:8000/room/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNumber(response.data.room_number);
        setType(response.data.room_type_id);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getRoomById();
  }, [id]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else {
      localStorage.clear;
    }

    getRoomType();
  }, []);

  const getRoomType = async () => {
    const response = await axios.get("http://localhost:8000/roomtype");
    setRoomType(response.data);
  };

  const saveRoom = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("access"));
    try {
      await axios.put(
        `http://localhost:8000/room/${id}`,
        {
          room_number: number,
          room_type_id: type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/management/room");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="flex items-center justify-center rounded">
          <div className="card w-full bg-base-100 shadow max-w-xl">
            <form
              className="card-body"
              onSubmit={saveRoom}
              encType="application/json"
            >
              <h2 className="card-title">Edit Room</h2>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Room Number</span>
                </label>
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Room Type</span>
                </label>
                <select
                  className="select select-bordered"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {roomType &&
                    roomType.map((data, index) => (
                      <option value={data.room_type_id} key={index}>
                        {data.room_type_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="card-actions justify-end mt-2">
                <button className="btn btn-outline" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
