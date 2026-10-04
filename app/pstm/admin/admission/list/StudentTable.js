"use client";

import { useEffect, useState } from "react";
import "@/styles/admin/students.scss";
import "@/styles/admin/common.scss";
import { FaEdit, FaEye } from "react-icons/fa";
import Link from "next/link";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [total, setTotal] = useState(0);

  const [selected, setSelected] = useState(null);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  const fetchData = async () => {
    const res = await fetch(
      `/api/admin/students?page=${page}&limit=${limit}&search=${search}&filterType=${filterType}&filterValue=${filterValue}`
    );
    const data = await res.json();

    setStudents(data.data);
    setTotal(data.total);
  };
  // console.log("students", students)
  useEffect(() => {
    fetchData();
  }, [page, search, filterType, filterValue]);

  // dynamic filter options
  const getFilterOptions = () => {
    if (filterType === "gender") {
      return ["male", "female"];
    }
    if (filterType === "class") {
      return ["1", "2", "3", "4", "5", "6"];
    }
    return [];
  };

  return (
    <div className="student-page">
      {/* <h2>Students</h2> */}

      {/* Filters */}
      <div className="filters">
        <input
          placeholder="Search by name / admission / roll..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilterType(e.target.value)}>
          <option value="">Select Filter</option>
          <option value="gender">Gender</option>
          <option value="class">Class</option>
        </select>

        {filterType && (
          <select onChange={(e) => setFilterValue(e.target.value)}>
            <option value="">Select Value</option>
            {getFilterOptions().map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Father Name</th>
            <th>Mother Name</th>
            <th>Roll</th>
            <th>Gender</th>
            <th>Class</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.first_name} {s.last_name}</td>
              <td>{s.father_name} </td>
              <td> {s.mother_name}</td>
              <td>{s.roll_no}</td>
              <td>{s.gender}</td>
              <td>{s.class}</td>
              <td>
                <span className={`status ${s.status}`}>
                  {s.status}
                </span>
              </td>
              <td>
                {/* EDIT */}
                <Link href={`/pstm/admin/admission/edit/${s.id}`}>
                  <button className="action-btn edit">
                    <FaEdit style={{ marginRight: "4px" }} />
                    
                  </button>
                </Link>

                {/* VIEW (optional) */}
                <Link href={`/pstm//admin/admission/view/${s.id}`}>
                  <button className="action-btn view">
                    <FaEye style={{ marginRight: "4px" }} />
                    
                  </button>
                </Link>
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


    </div>
  );
}