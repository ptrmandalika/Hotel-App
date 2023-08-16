import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Sidebar from "@/components/Sidebar";

export default function EditUser() {
  const [status, setStatus] = useState();
  const [userId, setUserId] = useState();
  const [user, setUser] = useState([]);
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getBookingById = async () => {
      const token = JSON.parse(localStorage.getItem("access"));
      try {
        const response = await axios.get(
          `http://localhost:8000/booking/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStatus(response.data.booking_status);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getBookingById();
  }, [id]);

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
    setUserId(response.data[0].user_id);
  };

  const saveBooking = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("access"));
    try {
      await axios.put(
        `http://localhost:8000/booking/${id}`,
        {
          booking_status: status,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/management/booking");
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
              onSubmit={saveBooking}
              encType="application/json"
            >
              <h2 className="card-title">Edit Status</h2>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  className="select select-bordered"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="new">New</option>
                  <option value="check_in">Check In</option>
                  <option value="check_out">Check Out</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">User</span>
                </label>
                <select
                  className="select select-bordered"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                >
                  {user &&
                    user.map((data, index) => (
                      <option value={data.user_id} key={index}>
                        {data.username}
                      </option>
                    ))}
                </select>
              </div>
              <div className="card-actions justify-end mt-2">
                <button className="btn btn-primary" type="submit">
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
