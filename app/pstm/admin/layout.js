"use client";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/Admin/Sidebar";
import "@/styles/admin/layout.scss";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    // localStorage token remove
    localStorage.removeItem("adminToken");

    // agar cookies use kar rahe ho to:
    // document.cookie = "token=; Max-Age=0; path=/";

    router.push("/pstm/admin-login");
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="main">
        <header className="topbar">
          <div className="left">
            {/* <h2>Dashboard</h2> */}
          </div>

          <div className="right">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <div className="content">{children}</div>
      </div>
    </div>
  );
}