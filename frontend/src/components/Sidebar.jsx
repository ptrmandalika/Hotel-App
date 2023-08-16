import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Sidebar() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0">
      <div className="px-6">
        <Link className="flex-none text-xl font-semibold" href="/">
          Blueddoorz
        </Link>
      </div>
      <nav className="p-6 w-full flex flex-col flex-wrap">
        {user && user.role === "admin" && (
          <ul className="space-y-1.5">
            <li>
              <Link
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-md hover:bg-gray-100"
                href="/management/dashboard"
              >
                <svg
                  className="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                  />
                </svg>
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-md hover:bg-gray-100"
                href="/management/user"
              >
                <svg
                  className="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                </svg>
                User
              </Link>
            </li>

            <li>
              <Link
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-md hover:bg-gray-100"
                href="/management/room"
              >
                <svg
                  className="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                </svg>
                Room
              </Link>
            </li>

            <li>
              <Link
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-md hover:bg-gray-100"
                href="/management/roomtype"
              >
                <svg
                  className="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 15H1V11H14V15H15V4H14V7H1V0H0V15Z" />
                  <path d="M6 6H2V5H6V6Z" />
                </svg>
                Room Type
              </Link>
            </li>
          </ul>
        )}
        {user && user.role === "receptionist" && (
          <ul className="space-y-1.5">
            <li>
              <Link
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-md hover:bg-gray-100"
                href="/management/booking"
              >
                <svg
                  className="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 46 46"
                >
                  <rect
                    x="9"
                    y="8"
                    width="30"
                    height="36"
                    rx="2"
                    fill="none"
                    stroke="#333"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 4V10"
                    stroke="#333"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M30 4V10"
                    stroke="#333"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 19L32 19"
                    stroke="#333"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 27L28 27"
                    stroke="#333"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 35H24"
                    stroke="#333"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Booking
              </Link>
            </li>
          </ul>
        )}
        <ul className="space-y-1.5">
          <li>
            <button
              className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-md hover:bg-gray-100"
              onClick={() => {
                localStorage.clear();
                router.push("/login");
              }}
            >
              <svg
                className="w-3.5 h-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                />
                <path
                  fillRule="evenodd"
                  d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                />
              </svg>
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
