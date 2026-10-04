"use client";
import "@/styles/admin/dashboard.scss";
const statsIconMap = {
  Students: "fa-solid fa-user-graduate",
  Teachers: "fa-solid fa-chalkboard-user",
  Parents: "fa-solid fa-people-roof",
  Buses: "fa-solid fa-bus",
};
const stats = [
    { title: "Students", count: 0, icon:'' },
    { title: "Teachers", count: 0, icon:'' },
    { title: "Parents", count: 0, icon:'' },
    { title: "Buses", count: 0, icon:'' },
];

export default function Dashboard() {
    return (
        <div className="dashboard">

            <div className="cards">
                {stats.map((item, i) => (
                    <div className="card" key={i}>
                        <div className="card-top">
                            <div className="icon"> <i className={statsIconMap[item.title] || "fa-solid fa-circle"}></i></div>
                        </div>

                        <div className="card-body">
                            <h3>{item.count}</h3>
                            <p>{item.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="chart">
                <h3>Analytics</h3>
                <div className="dummy-chart">📈 Chart Coming Soon</div>
            </div>

        </div>
    );
}