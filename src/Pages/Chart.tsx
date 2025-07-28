import { useEffect, useState } from "react";
import DashboardBarChart from "../Components/DashboardBarChart";
import supabase from "../supabaseClient";
type Order = {
  id: number;
  created_at: Date;
  total_amount: number;
};
export const Chart = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const[inputDate,setInputDate]=useState(new Date().toISOString().slice(0,10))
  const[inpOrderCountDay,setInpOrderCountDay]=useState(new Date().toISOString().slice(0,10))
  const [total, setTotal] = useState(0);
  const[count,setCount]=useState(0);
  // const[orderCount,setOrdercount]=useState(0)
  console.log(orders)
  console.log(orderLoading)
  useEffect(() => {
    const getOrders = async () => {
      setOrderLoading(true);
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("id, created_at, total_amount");
        if (error) {
          console.error("Error fetching orders:", error);
          return;
        }

        if (data) {
          setOrders(data);
          const inpDay=new Date(inputDate).toISOString().slice(0,10);
          const inpOrderDay=new Date(inpOrderCountDay).toISOString().slice(0,10)
          const total=data.filter(order=>{
            const orderDate=new Date(order.created_at).toISOString().slice(0,10);
            return orderDate===inpDay;
          }).reduce((total,item)=>(total+item.total_amount),0);
          setTotal(total);
          const orderCount=data.filter((order)=>{
            const ordernewDate=new Date(order.created_at).toISOString().slice(0,10);
            return ordernewDate===inpOrderDay;
          })
          setCount(orderCount.length)
          
        }
      } catch (e) {
        console.log(e);
      } finally {
        setOrderLoading(false);
      }
    };
    getOrders();
  }, [inputDate,inpOrderCountDay]);
  return (
      <div className="flex-col flex">
        <div className="flex flex-row gap-5">
        <div className="flex gap-3 flex-row bg-[#1F1D2B] px-2 py-2 text-white ml-5 h-full">
          <div className=" mt-2 my-auto">
            <img src="https://res.cloudinary.com/dnfbik3if/image/upload/v1753431793/Simple_Illustrative_Price_Tag_Logo_iixrfp.png" className="p-3 w-25 h-25 object-cover"></img>
          </div>
          <div className="flex flex-col flex-1 mx-4 my-2">
          <div className="text-lg">Total Amount Per Day</div>

             <div className="text-3xl">{total}</div>
          </div>
         <div className="justify-end  text-lg  items-start mx-5 my-2 flex flex-row"><input type="date" defaultValue={inputDate} onChange={(e)=>{
          setInputDate(e.target.value)
          // console.log(inputDate)
         }} className="block bg-white text-black w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></input></div>
        </div>

          <div className="flex gap-3 flex-row bg-[#1F1D2B] px-2 py-2 text-white ml-5 ">
          <div className=" mt-2 my-auto">
            <img src="https://res.cloudinary.com/dnfbik3if/image/upload/v1753599951/shopingcart_logo_cryaib.png" className="p-3 w-25 h-25 object-contain"></img>
          </div>
          <div className="flex flex-col flex-1 mx-4 my-2">
          <div className="text-lg">Total Orders Per Day</div>

             <div className="text-3xl">{count}</div>
          </div>
          <div className="justify-end  text-lg  items-start mx-5 my-2 flex flex-row"><input type="date" defaultValue={inputDate} onChange={(e)=>{
          setInpOrderCountDay(e.target.value)
          // console.log(inputDate)
         }} className="block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></input></div>
        </div>
          
      </div>
      <div className="flex flex-row ml-5 mt-5">
        <DashboardBarChart/>
      </div>
      </div>
        

     
      
 
  );
};
