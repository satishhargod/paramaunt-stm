"use client";

import { useEffect, useState } from "react";
import "@/styles/admin/common.scss";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import "@/styles/admin/teachers.scss";
import Link from "next/link";
import { toast } from "react-toastify";

export default function TeacherTable() {
  const [selected, setSelected] = useState(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [designation, setDesignation] = useState("");
 const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [total, setTotal] = useState(0);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  const fetchData = async () => {
    const query = new URLSearchParams({
      page,
      limit,
      search,
      gender,
      designation,
    });
    const res = await fetch(`/api/admin/teachers?${query}`);
    const data = await res.json()
    setTeachers(data.data);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchData();
  }, [page, search, gender, designation]);

   const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/admin/teachers/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!data.success) {
        toast.error(
          data.message || "Delete failed"
        );
        return;
      }

      toast.success(
        "Teacher deleted successfully"
      );

      setDeleteId(null);

      fetchData?.();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="teacher-page">
      <h2>Teachers</h2>

      {/* Filters */}
      <div className="filters">
        <input
          placeholder="Search by name..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setGender(e.target.value)}>
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          placeholder="Designation (e.g. Math Teacher)"
          onChange={(e) => setDesignation(e.target.value)}
        />
        {/* <input
          placeholder="Min Salary"
          onChange={(e) => setMinSalary(e.target.value)}
        />

        <input
          placeholder="Max Salary"
          onChange={(e) => setMaxSalary(e.target.value)}
        /> */}
      </div>

      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Email</th> */}
            <th>Phone</th>
            <th>Designation</th>
            <th>Experience</th>
            {/* <th>Salary</th>
            <th>HRA</th>
            <th>Allowance</th> */}
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((t) => (
            <tr key={t.id}>
              <td>{t.first_name} {t.last_name}</td>
              {/* <td>{t.email}</td> */}
              <td>{t.phone}</td>
              <td>{t.designation}</td>
              <td>{t.experience_years} yrs</td>
              {/* <td>₹{t.basic_salary}</td>
              <td>₹{t.hra}</td>
              <td>₹{t.allowances}</td> */}
              <td>
                <span className={`status ${t.status}`}>
                  {t.status}
                </span>
              </td>
              <td>
                <Link href={`/pstm/admin/teachers/edit/${t.id}`}>
                  <button onClick={() => setSelected({ ...t, mode: "edit" })}>
                    <FaEdit />
                  </button>
                </Link>
                <Link href={`/pstm/admin/teachers/view/${t.id}`}>
                  <button onClick={() => setSelected({ ...t, mode: "view" })}>
                    <FaEye />
                  </button> </Link>
                   {/* DELETE */}
                <Link href={`/pstm/admin/teachers/`}>
                <button
                  className="delete-btn"
                  onClick={() =>
                    setDeleteId(t.id)
                  }
                >
                  <FaTrash />
                </button></Link> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <div className="pages">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          {page < totalPages && (
            <button onClick={() => setPage(page + 1)}>
              Next
            </button>
          )}
        </div>
      </div>

       {/* DELETE CONFIRM MODAL */}
      {/* ========================= */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Delete Teacher</h3>

            <p>
              Are you sure you want to delete
              this teacher?
            </p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() =>
                  setDeleteId(null)
                }
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}