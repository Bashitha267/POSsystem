import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

type Order = {
  img: string;
  id: number;
  unit_price: number;
  total_price: number;
  name: string;
  qty: number;
};
export const Bill = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [total,setTotal]=useState(0)
  
    useEffect(() => {
  const total_price = orders.reduce((acc, item) => acc + item.total_price, 0);
  setTotal(total_price);
}, [orders]);
  useEffect(() => {
  const loadOrders = () => {
    const storedOrders = localStorage.getItem("pos_orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
   
    }
  };

  
  loadOrders();

  
  window.addEventListener("ordersUpdated", loadOrders);

  return () => {
    window.removeEventListener("ordersUpdated", loadOrders);
  };
}, []);

  return (
    <div className="fixed top-0 right-0 h-screen w-96 bg-[#1F1D2B] flex flex-col  gap-8 pt-5 text-white overflow-y-scroll scrollbar-hide">
      <div className=" ml-8 flex flex-row text-lg font-bold ">Order</div>
      {
        orders.map((item)=>(
        <div className="flex flex-col ml-5 bg-[#2C2F3D] p-4 w-84 h-32 mb-1" key={item.id}>
          <div className="flex flex-row gap-2 " >
            <div><img src={item.img} className="w-20 h-24 object-cover"></img></div>
            <div className="flex flex-col justify-between text-gray-100">
              <div className="flex flex-row w-56 justify-between">
                <div>{item.name}</div>
                 <div className="text-xl font-bold">{item.total_price}</div>
              </div>
              <div className="flex flex-row justify-between w-56">
              <div>{item.unit_price}</div>
                   <div className="flex flex-row items-center gap-1">
                 <div className="text-white text-lg  px-2  bg-[#14151a] hover:bg-[] cursor-pointer" >-</div>
                <div className="text-white text-xl  px-3  bg-[#14151a] cursor-pointer">{item.qty}</div>
                <div className="text-white text-lg  px-2  bg-[#14151a] cursor-pointer"  >+</div>

              </div>
<div className="cursor-pointer"><Trash color="red" size={27}/></div>
              </div>

            </div>

      
          </div>







        </div>
        ))
      }
      <div className="mb-32 flex"></div>
<div className="border-t-2 border-white flex flex-col p-4 fixed bottom-0 right-0 w-96 z-50 bg-[#1F1D2B]">
  <div className="flex flex-row justify-between mb-4 text-lg font-semibold">
    <div>Total</div>
    <div className="font-bold text-xl">{total}</div>
  </div>
  <div className="flex flex-row gap-4 justify-center text-lg">
    <button className="px-6 py-1 rounded-xl border-2 border-white">Cancel</button>
    <button className="bg-[tomato] px-6 py-1 rounded-xl text-white">Confirm</button>
  </div>
</div>
    </div>
  )
}
