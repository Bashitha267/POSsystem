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
    <div className="flex flex-col w-full px-4 mt-4">
    
      <div className="flex flex-col md:flex-row gap-5 justify-between">

        
        <div className="flex flex-col md:flex-row gap-3 bg-[#1F1D2B] text-white p-3 rounded-lg w-full md:w-1/2">
          <div className="flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dnfbik3if/image/upload/v1753431793/Simple_Illustrative_Price_Tag_Logo_iixrfp.png"
              className="p-3 w-20 h-20 object-cover"
              alt="Total Amount"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center px-2">
            <div className="text-sm">Total Amount Per Day</div>
            <div className="text-3xl">{total}</div>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            <input
              type="date"
              defaultValue={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="bg-white text-black w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

       
        <div className="flex flex-col md:flex-row gap-3 bg-[#1F1D2B] text-white p-3 rounded-lg w-full md:w-1/2">
          <div className="flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dnfbik3if/image/upload/v1753599951/shopingcart_logo_cryaib.png"
              className="p-3 w-20 h-20 object-contain"
              alt="Total Orders"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center px-2">
            <div className="text-sm">Total Orders Per Day</div>
            <div className="text-3xl">{count}</div>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            <input
              type="date"
              defaultValue={inputDate}
              onChange={(e) => setInpOrderCountDay(e.target.value)}
              className="bg-white text-black w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      
      <div className="mt-6 w-full h-fit">
        <DashboardBarChart />
      </div>
    </div>
  );
};

