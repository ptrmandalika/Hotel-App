import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import Layout from "@/components/Layout";

export default function CekPemesanan() {
  const [data, setData] = useState({});
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState({});
  const [guestName, setGuestName] = useState("");
  const total = room ? room.price * data.total_room : "";

  const checkInDate = data.check_in_date
    ? format(new Date(data.check_in_date), "yyyy-MM-dd")
    : "";
  const checkOutDate = data.check_out_date
    ? format(new Date(data.check_out_date), "yyyy-MM-dd")
    : "";
  const bookingDate = data.booking_date
    ? format(new Date(data.booking_date), "yyyy-MM-dd")
    : "";

  useEffect(() => {
    if (localStorage.getItem("booking")) {
      setData(JSON.parse(localStorage.getItem("booking")).data);
      setMsg(JSON.parse(localStorage.getItem("booking")).msg);
      setRoom(JSON.parse(localStorage.getItem("room")));

      setTimeout(() => {
        localStorage.removeItem("booking");
        localStorage.removeItem("room");
        setMsg("");
      }, 3000);
    } else {
      ("");
    }
  }, []);

  const getOrder = async (e) => {
    e.preventDefault();
    try {
      const getData = await axios.get(
        `http://localhost:8000/filtering?guest_name=${guestName}`
      );
      const getRoom = await axios.get(
        `http://localhost:8000/roomtype/${getData.data.room_type_id}`
      );

      setData(getData.data);
      setRoom(getRoom.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const downloadReceipt = () => {
    // Create a Blob object from the receipt content
    const receiptContent = generateReceiptContent();
    const blob = new Blob([receiptContent], { type: "text/plain" });

    // Create a download URL for the Blob
    const downloadUrl = URL.createObjectURL(blob);

    // Create a temporary link element and simulate a click to trigger the download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "receipt.txt";
    link.click();

    // Clean up the URL and the link element
    URL.revokeObjectURL(downloadUrl);
  };

  const generateReceiptContent = () => {
    // Generate the content of the receipt as a string
    let content = "Blueddoorz Receipt\n\n";
    content += `Date: ${bookingDate}\n`;
    content += `Invoice: ${data.booking_number}\n\n`;
    content += "Bill To:\n";
    content += `${data.booker_name}\n`;
    content += `${data.booker_email}\n\n`;
    content += "Detail:\n";
    content += `Check In: ${checkInDate}\n`;
    content += `Check Out: ${checkOutDate}\n`;
    content += `Status: ${data.booking_status}\n\n`;
    content += "Room Type\tAmount\n";
    content += `${room.room_type_name}\t${data.total_room}\n\n`;
    content += `Total\tIDR ${total}`;

    return content;
  };

  return (
    <Layout>
      {msg ? (
        <div className="toast">
          <div className="alert alert-info">
            <span>{msg}</span>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col items-center w-full p-8">
        <form className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Enter Your Name</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs mb-2"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={getOrder}>
            SEARCH
          </button>
        </form>

        <div className="divider"></div>
        {/* This is receipt */}
        {data && room ? (
          <div className="bg-white border rounded-lg shadow-lg px-6 py-8 w-96 mx-auto">
            <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
              Blueddoorz
            </h1>
            <hr className="mb-2" />
            <div className="flex flex-col mb-6">
              <h1 className="text-lg font-bold">Invoice</h1>
              <div className="text-gray-700">
                <div>Date: {bookingDate}</div>
                <div>Invoice: {data.booking_number}</div>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-bold">Bill To:</h2>
              <div className="text-gray-700">{data.booker_name}</div>
              <div className="text-gray-700">{data.booker_email}</div>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-bold">Detail:</h2>
              <div className="text-gray-700">Check In: {checkInDate}</div>
              <div className="text-gray-700">Check Out: {checkOutDate}</div>
              <div className="text-gray-700">Status: {data.booking_status}</div>
            </div>
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th className="text-left font-bold text-gray-700">
                    Room Type
                  </th>
                  <th className="text-right font-bold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left text-gray-700">
                    {room.room_type_name}
                  </td>
                  <td className="text-right text-gray-700">
                    {data.total_room}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="text-left font-bold text-gray-700">Total</td>
                  <td className="text-right font-bold text-gray-700">
                    IDR {total}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="flex justify-center">
              <button className="btn btn-primary" onClick={downloadReceipt}>
                Get Receipt
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border rounded-lg shadow-lg px-6 py-8 w-96 mx-auto">
            <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
              Blueddoorz
            </h1>
            <hr className="mb-2" />
            <div className="flex flex-col mb-6">
              <h1 className="text-lg font-bold">Invoice</h1>
              <div className="text-gray-700">
                <div>Date: </div>
                <div>Invoice: </div>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-bold">Bill To:</h2>
              <div className="text-gray-700"></div>
              <div className="text-gray-700"></div>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-bold">Detail:</h2>
              <div className="text-gray-700">Check In: </div>
              <div className="text-gray-700">Check Out:</div>
              <div className="text-gray-700">Status: </div>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left font-bold text-gray-700">
                    Room Type
                  </th>
                  <th className="text-right font-bold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left text-gray-700"></td>
                  <td className="text-right text-gray-700"></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="text-left font-bold text-gray-700">Total</td>
                  <td className="text-right font-bold text-gray-700">IDR</td>
                </tr>
              </tfoot>
            </table>
            <div className="flex justify-center">
              <button className="btn btn-primary" onClick={downloadReceipt}>
                Get Receipt
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
