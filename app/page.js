"use client"
import { useEffect, useState } from "react"
import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Slider from "@/components/Slider";
import Image from "next/image";
import AnnouncementModal from "@/components/Admin/Announcementmodal";
import NewsLineHome from "@/components/NewsLineHome";

export default function Home() {
   const [users, setUsers] = useState([]);
 

// useEffect(() => {
//   console.log("hello i am satish");

//   const fetchData = async () => {
//     try {
//       const res = await fetch("/api/users");

//       if (!res.ok) {
//         throw new Error("API failed");
//       }

//       const data = await res.json();
//       console.log("data", data);
//       setUsers(data);

//     } catch (e) {
//       console.log("error", e);
//     }
//   };

//   fetchData();
// }, []);

useEffect(() => {
  console.log("hello i am satish");
  fetch("/api/users")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}, []);

  return (
    <div className="">
       <Navbar/>
       <Slider/>
       <NewsLineHome/>
       <Content/>
        <AnnouncementModal/>
       <Footer/>
    </div>
  );
}
