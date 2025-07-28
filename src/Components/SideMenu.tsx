import { History, HomeIcon, PieChart, PlusCircle, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SideMenu = () => {
  const [active, setActive] = useState("home");

  const menuItems = [
    { path: "/", icon: <HomeIcon size={30} />, key: "home" },
    { path: "/history", icon: <History size={30} />, key: "history" },
    { path: "/chart", icon: <PieChart size={30} />, key: "chart" },
    { path: "/add", icon: <PlusCircle size={30} />, key: "add" },
    { path: "/user", icon: <User size={30} />, key: "user" },
  ];

  return (
    <div className="h-screen w-32 bg-[#1F1D2B] flex flex-col items-center gap-8 py-6 sticky top-0 left-0">
      <div className="text-white text-2xl font-bold">BitePOS</div>

      {menuItems.map(item => (
        <Link to={item.path} key={item.key}>
          <div
            className={`px-4 py-3 rounded-lg mr-3 cursor-pointer ${
              active === item.key
                ? "bg-[#EA7C69] text-white"
                : "text-[tomato]"
            }`}
            onClick={() => setActive(item.key)}
          >
            {item.icon}
          </div>
        </Link>
      ))}
    </div>
  );
};
