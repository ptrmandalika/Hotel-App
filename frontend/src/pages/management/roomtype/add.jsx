import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Sidebar from "@/components/Sidebar";

export default function AddRoomType() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://bulma.io/images/placeholders/96x96.png"
  );
  const [photo, setPhoto] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else {
      localStorage.clear;
    }
  }, []);

  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setPhoto(uploaded);
  };

  const saveRoomType = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("access"));
    try {
      await axios.post(
        "http://localhost:8000/roomtype",
        {
          room_type_name: name,
          price: price,
          description: description,
          image: photo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      router.push("/management/roomtype");
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
              onSubmit={saveRoomType}
              encType="multipart/form-data"
            >
              <h2 className="card-title">Add Room Type</h2>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Room Type Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-24 rounded">
                      <img src={image} />
                    </div>
                  </div>
                  <input
                    type="file"
                    className="file-input file-input-ghost file w-full"
                    onChange={handleUploadChange}
                    accept="image/*"
                  />
                </div>
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
