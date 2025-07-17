import { History, HomeIcon, PieChart, PlusCircle, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SideMenu = () => {
  const [active,setActive]=useState("home");
  return (
    <div className="fixed top-0 left-0 h-full w-32 bg-[#1F1D2B] flex flex-col items-center gap-8 py-6 " >
      <div className="text-white text-2xl h-14 w-20 mr-3 font-bold">BitePOS</div>
      <Link  to={"/"}><div className={`px-4 py-3 mr-3 rounded-lg  ${active==="home" ?"bg-[#EA7C69] text-white":"text-[tomato]"} `} onClick={()=>{
        setActive("home")
      
      }}>
     <HomeIcon size={35} ></HomeIcon>
      </div></Link>
<Link to={"/history"}>
     <div className={`px-4 py-3 mr-3 rounded-lg  ${active==="history" ?"bg-[#EA7C69] text-white":"text-[tomato]"} `} onClick={()=>{
        setActive("history")
      }}>
     <History size={35} ></History>
      </div>
</Link>
<Link to={"/chart"}>
      <div className={`px-4 py-3 mr-3 rounded-lg  ${active==="chart" ?"bg-[#EA7C69] text-white":"text-[tomato]"} `} onClick={()=>{
        setActive("chart")
      }}>
     <PieChart size={35} ></PieChart>
      </div>
</Link>
 <Link to={"/add"}>
      <div className={`px-4 py-3 mr-3 rounded-lg  ${active==="add" ?"bg-[#EA7C69] text-white":"text-[tomato]"} `} onClick={()=>{
        setActive("add")
      }}>
   <PlusCircle size={35} ></PlusCircle>
      </div>
</Link>
<Link to={"/user"}>
       <div className={`px-4 py-3 mr-3 rounded-lg  ${active==="user" ?"bg-[#EA7C69] text-white":"text-[tomato]"} `} onClick={()=>{
        setActive("user")
      }}>
    <User size={35} ></User>
      </div>
</Link>
    </div>
  )
}
