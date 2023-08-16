import { useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else {
      localStorage.clear;
    }
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div>
          <p>Hello!</p>
        </div>
      </div>
    </div>
  );
}
