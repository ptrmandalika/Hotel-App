import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Sidebar from "@/components/Sidebar";

export default function EditUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(
    "https://bulma.io/images/placeholders/96x96.png"
  );
  const [photo, setPhoto] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getUserById = async () => {
      const token = JSON.parse(localStorage.getItem("access"));
      try {
        const response = await axios.get(`http://localhost:8000/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(response.data.username);
        setImage(response.data.photo);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

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

  const saveUser = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("access"));
    try {
      await axios.put(
        `http://localhost:8000/user/${id}`,
        {
          username: username,
          photo: photo,
          email: email,
          password: password,
          role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      router.push("/management/user");
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
              onSubmit={saveUser}
              encType="multipart/form-data"
            >
              <h2 className="card-title">Edit User</h2>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  className="select select-bordered"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="receptionist">Receptionist</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Photo</span>
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
