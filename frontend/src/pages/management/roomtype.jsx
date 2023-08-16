import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function RoomType() {
  const [roomType, setRoomType] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else {
      localStorage.clear;
    }

    getRoomType();
  }, []);

  const getRoomType = async () => {
    const token = JSON.parse(localStorage.getItem("access"));
    const response = await axios.get("http://localhost:8000/roomtype", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRoomType(response.data);
  };

  const deleteRoomType = async (id) => {
    const token = JSON.parse(localStorage.getItem("access"));
    await axios.delete(`http://localhost:8000/roomtype/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getRoomType();
  };

  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Link
          className="btn btn-outline btn-sm mb-2"
          href="/management/roomtype/add"
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
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {roomType &&
                roomType.map((data, index) => (
                  <tr key={index}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={data.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{data.room_type_name}</div>
                          <div className="text-sm opacity-50">{data.price}</div>
                        </div>
                      </div>
                    </td>
                    <td>{data.description}</td>
                    <td className="flex gap-2 pt-5">
                      <Link
                        className="btn btn-outline btn-sm"
                        href={`/management/roomtype/edit/${data.room_type_id}`}
                      >
                        EDIT
                      </Link>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => deleteRoomType(data.room_type_id)}
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
