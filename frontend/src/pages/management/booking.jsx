import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import format from "date-fns/format";
import Sidebar from "@/components/Sidebar";

export default function Booking() {
  const [booking, setBooking] = useState([]);
  const [guestName, setGuestName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else {
      localStorage.clear;
    }

    getBooking();
  }, []);

  const getOrder = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("access"));
    try {
      const response = await axios.get(
        `http://localhost:8000/filtering2?guest_name=${guestName}`, {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBooking(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getBooking = async () => {
    const token = JSON.parse(localStorage.getItem("access"));
    const response = await axios.get("http://localhost:8000/booking", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBooking(response.data);
  };

  const deleteBooking = async (id) => {
    const token = JSON.parse(localStorage.getItem("access"));
    await axios.delete(`http://localhost:8000/booking/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getBooking();
  };

  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <form className="flex gap-4 my-6">
          <div className="flex gap-4">
            <input type="text" placeholder="Input Guest Name" className="input input-bordered w-full max-w-xs" value={guestName} onChange={e => setGuestName(e.target.value)} />
            <button className="btn" onClick={getOrder}>Button</button>
          </div>
        </form>
        <div className="overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Guest</th>
                  <th>Total Room</th>
                  <th>Room Type</th>
                  <th>Status</th>
                  <th>User</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {booking &&
                  booking.map((data, index) => (
                    <tr key={index}>
                      <th>{index}</th>
                      <td>{data.booker_name}</td>
                      <td>{data.booker_email}</td>
                      <td>
                        {format(new Date(data.check_in_date), "yyyy-MM-dd")}
                      </td>
                      <td>
                        {format(new Date(data.check_out_date), "yyyy-MM-dd")}
                      </td>
                      <td>{data.guest_name}</td>
                      <td>{data.total_room}</td>
                      <td>{data.room_type.room_type_name}</td>
                      <td>{data.booking_status}</td>
                      <td>{data.user ? data.user.username : ""}</td>
                      <td className="flex gap-2">
                        <Link
                          className="btn btn-outline btn-xs"
                          href={`/management/booking/edit/${data.booking_id}`}
                        >
                          EDIT
                        </Link>
                        <button
                          className="btn btn-outline btn-xs"
                          onClick={() => deleteBooking(data.booking_id)}
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
    </div>
  );
}
