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
          const today=new Date().toISOString().slice(0,10);
          
          const total=data.filter(order=>{
            const orderDate=new Date(order.created_at).toISOString().slice(0,10);
            return orderDate===today;
          }).reduce((total,item)=>(total+item.total_amount),0);
          setTotal(total);
          const orderCount=data.filter((order)=>{
            const ordernewDate=new Date(order.created_at).toISOString().slice(0,10);
            return ordernewDate===today;
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
  }, []);
  return (
      <div className="flex-col flex">
        <div className="flex flex-row gap-5">
        <div className="flex gap-3 flex-row bg-[#1F1D2B] px-2 py-2 text-white ml-5 ">
          <div className=" mt-2 my-auto">
            <img src="https://res.cloudinary.com/dnfbik3if/image/upload/v1753431793/Simple_Illustrative_Price_Tag_Logo_iixrfp.png" className="p-3 w-25 h-25 object-cover"></img>
          </div>
          <div className="flex flex-col flex-1 mx-4 my-2">
          <div className="text-lg">Todays Total</div>

             <div className="text-3xl">{total}</div>
          </div>
         <div className="justify-end  text-lg  items-start mx-5 my-2">{new Date().toLocaleString('en-CA').slice(0,10)}</div>
        </div>

          <div className="flex gap-3 flex-row bg-[#1F1D2B] px-2 py-2 text-white ml-5 ">
          <div className=" mt-2 my-auto">
            <img src="https://res.cloudinary.com/dnfbik3if/image/upload/v1753599951/shopingcart_logo_cryaib.png" className="p-3 w-25 h-25 object-contain"></img>
          </div>
          <div className="flex flex-col flex-1 mx-4 my-2">
          <div className="text-lg">Todays Total Orders</div>

             <div className="text-3xl">{count}</div>
          </div>
         <div className="justify-end  text-lg  items-start mx-5 my-2">{new Date().toLocaleString('en-CA').slice(0,10)}</div>
        </div>
          
      </div>
      <div className="flex flex-row w-full max-w-3xl bg-[#1F1D2B] ml-5 mt-5">
        <DashboardBarChart/>
      </div>
      </div>
        

     
      
 
  );
};
