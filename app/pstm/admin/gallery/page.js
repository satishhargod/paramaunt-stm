"use client";

import { useEffect, useState } from "react";
import "@/styles/admin/common.scss";
import "@/styles/admin/gallery.scss";
import { useRouter } from "next/navigation";
export default function GalleryPage() {
    const [data, setData] = useState([]);
    const [tab, setTab] = useState("image");
    const [year, setYear] = useState("");
    const [type, setType] = useState("");
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const fetchData = async () => {
        let url = `/api/admin/gallery?upload_type=${tab}`;

        if (year) url += `&year=${year}`;
        if (type) url += `&type=${type}`;

        const res = await fetch(url);
        const json = await res.json();
        setData(json.data || []);
    };

    useEffect(() => {
        fetchData();
    }, [tab, year, type]);

    // const handleDelete = async (id) => {
    //     await fetch(`/api/admin/gallery/${id}`, {
    //         method: "DELETE",
    //     });
    //     fetchData();
    // };

    const openDeleteModal = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            setDeleting(true);

            await fetch(`/api/admin/gallery/${selectedId}`, {
                method: "DELETE",
            });

            setShowModal(false);
            setSelectedId(null);
            fetchData();
        } catch (err) {
            console.error(err);
        } finally {
            setDeleting(false);
        }
    };

    const addGallery = (event) => {
        router.push(`/pstm/admin/gallery/add`);
    };

    const changeTab = (tabType) => {
        setTab(tabType);
    };

    return (
        <>  <div className="container">
            <h2>Gallery</h2>

            {/* Tabs */}
            <div className="tabs">
                <button className={tab === "image" ? "active" : ""} onClick={() => changeTab("image")}>Images</button>
                <button className={tab === "video" ? "active" : ""} onClick={() => changeTab("video")}>Videos</button>
                {/* Filters */}
                <div className="filters">
                    <select onChange={(e) => setYear(e.target.value)}>
                        <option value="">All Year</option>
                        {Array.from({ length: 6 }, (_, i) => 2020 + i).map((y) => (
                            <option key={y}>{y}</option>
                        ))}
                    </select>

                    <select onChange={(e) => setType(e.target.value)}>
                        <option value="">All Type</option>
                        <option value="cultural program">Cultural Program</option>
                        <option value="curricular activities">Curricular Activities</option>
                    </select>
                </div>
                <button className="add-btn" onClick={addGallery}>+ Add Image/Video</button>
            </div>



            {/* Cards */}
            <div className="grid">
                {data.length === 0 && <p>No Data Found</p>}

                {data.map((item) => (
                    <div className="card" key={item.id}>
                        {item.upload_type === "image" ? (
                            <img src={item.image} alt="" />
                        ) : (
                            <iframe src={item.video_url} />
                        )}

                        <h3>{item.title}</h3>
                        <p className="meta">
                            <span className="type">{item.type}</span>
                            <span className="year">{item.year}</span>
                        </p>

                        <div className="actions">
                            <a href={`/pstm/admin/gallery/edit/${item.id}`}>Edit</a>
                            {/* <button onClick={() => handleDelete(item.id)}>Delete</button> */}
                            <button onClick={() => openDeleteModal(item.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>


        </div>
            {showModal && (
                <div className="admin-modal">
                    <div className="admin-modal__box">
                        <h3 className="admin-modal__title">Delete Confirmation</h3>

                        <p className="admin-modal__text">
                            Are you sure you want to delete this item?
                        </p>

                        <div className="admin-modal__actions">
                            <button
                                className="admin-modal__btn admin-modal__btn--cancel"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="admin-modal__btn admin-modal__btn--delete"
                                onClick={confirmDelete}
                                disabled={deleting}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )} </>
    );
}