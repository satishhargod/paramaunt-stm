"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaEdit,
  FaEye,
  FaTrash,
} from "react-icons/fa";

import { toast } from "react-toastify";

import "@/styles/admin/common.scss";
import "@/styles/admin/teachers.scss";

export default function TCListPage() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  const [search, setSearch] =
    useState("");

  const [deleteId, setDeleteId] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [total, setTotal] =
    useState(0);

  const limit = 10;

  const totalPages = Math.ceil(
    total / limit
  );

  const fetchTC = async () => {
    const query =
      new URLSearchParams({
        page,
        limit,
        search,
      });

    const res = await fetch(
      `/api/admin/tc?${query}`
    );

    const data = await res.json();

    setList(data.data || []);
    setTotal(data.total || 0);
  };

  useEffect(() => {
    fetchTC();
  }, [page, search]);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/admin/tc/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!data.success) {
        toast.error(
          data.message ||
            "Delete failed"
        );

        return;
      }

      toast.success(
        "TC deleted successfully"
      );

      setDeleteId(null);

      fetchTC();
    } catch (error) {
      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="teacher-page">
      <div className="page-header">
        <h2>
          Transfer Certificates
        </h2>

       
      </div>

      {/* FILTER */}
      <div className="filters">
        <input
          placeholder="Search student..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
         <Link href="/pstm/admin/tc/add">
          <button className="add-btn">
            Add TC
          </button>
        </Link>
      </div>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            {/* <th>Image</th> */}
            <th>Student</th>
            <th>TC No.</th>
            <th>Scholar No.</th>
            <th>Admission</th>
            <th>TC Year</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              {/* <td>
                <img
                  src={
                    item.tc_image ||
                    "/dummy.jpg"
                  }
                  alt=""
                  className="tc-thumb"
                />
              </td> */}

              <td>
                {item.student_name}
              </td>

              <td>
                {item.tc_number}
              </td>

              <td>
                {
                  item.scholar_number
                }
              </td>

              <td>
                {
                  item.year_of_admission
                }
              </td>

              <td>
                {
                  item.year_of_issued_tc
                }
              </td>

              <td>
                <div className="action-btns">
                  <Link
                    href={`/pstm/admin/tc/edit/${item.id}`}
                  >
                    <button>
                      <FaEdit />
                    </button>
                  </Link>

                  <Link
                    href={`/pstm/admin/tc/view/${item.id}`}
                  >
                    <button>
                      <FaEye />
                    </button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      setDeleteId(
                        item.id
                      )
                    }
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="pagination">
        <div className="pages">
          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
          >
            Prev
          </button>

          {[
            ...Array(totalPages),
          ].map((_, i) => (
            <button
              key={i}
              className={
                page === i + 1
                  ? "active"
                  : ""
              }
              onClick={() =>
                setPage(i + 1)
              }
            >
              {i + 1}
            </button>
          ))}

          {page < totalPages && (
            <button
              onClick={() =>
                setPage(page + 1)
              }
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Delete TC</h3>

            <p>
              Are you sure you want
              to delete this TC?
            </p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() =>
                  setDeleteId(
                    null
                  )
                }
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={
                  handleDelete
                }
                disabled={
                  loading
                }
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
