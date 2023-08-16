import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function User() {
  const [user, setUser] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else {
      localStorage.clear;
    }

    getUser();
  }, []);

  const getUser = async () => {
    const token = JSON.parse(localStorage.getItem("access"));
    const response = await axios.get("http://localhost:8000/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    const token = JSON.parse(localStorage.getItem("access"));
    await axios.delete(`http://localhost:8000/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getUser();
  };

  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Link
          className="btn btn-outline btn-sm mb-2"
          href="/management/user/add"
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
                <th>Email</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user.map((data, index) => (
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
                              src={data.photo}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{data.username}</div>
                          <div className="text-sm opacity-50">{data.role}</div>
                        </div>
                      </div>
                    </td>
                    <td>{data.email}</td>
                    <td className="flex gap-2 pt-5">
                      <Link
                        className="btn btn-outline btn-sm"
                        href={`/management/user/edit/${data.user_id}`}
                      >
                        EDIT
                      </Link>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => deleteUser(data.user_id)}
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
