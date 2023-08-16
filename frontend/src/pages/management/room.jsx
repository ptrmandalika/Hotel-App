import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function Room() {
  const [room, setRoom] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else {
      localStorage.clear;
    }
    getRoom();
  }, []);

  const getRoom = async () => {
    const token = JSON.parse(localStorage.getItem("access"));
    const response = await axios.get("http://localhost:8000/room", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRoom(response.data);
  };

  const deleteRoom = async (id) => {
    const token = JSON.parse(localStorage.getItem("access"));
    await axios.delete(`http://localhost:8000/room/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getRoom();
  };

  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Link
          className="btn btn-outline btn-sm mb-2"
          href="/management/room/add"
        >
          ADD
        </Link>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Number</th>
                <th>Room Type</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {room &&
                room.map((data, index) => (
                  <tr key={index}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>{data.room_number}</td>
                    <td>{data.room_type.room_type_name}</td>
                    <td className="flex gap-2 pt-5">
                      <Link
                        className="btn btn-outline btn-sm"
                        href={`/management/room/edit/${data.room_id}`}
                      >
                        EDIT
                      </Link>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => deleteRoom(data.room_id)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
