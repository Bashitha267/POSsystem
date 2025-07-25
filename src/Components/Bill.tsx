import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

type Order = {
  img: string;
  
  unit_price: number;
  total_price: number;
  name: string;
  qty: number;
  food_id:number;
};
export const Bill = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [success,setSuccess]=useState(false);
  const[orderEmpty,setOrderEmpty]=useState(false);

  const confirm_order = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault(); // ✅ fixed typo
  try {
        if(orders.length==0){
      setOrderEmpty(true);
      return;
    }
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        total_amount: total,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order insert error:", orderError);
      return;
    }
 
    const newOrderId = orderData.id;

    const orderDetails = orders.map((item) => ({
      order_id: newOrderId,
      food_id: item.food_id,
     
      quantity: item.qty,
      unit_price: item.unit_price,
      total_price: item.total_price,
    }));
   
    const { error: detailsError } = await supabase
      .from("order_details")
      .insert(orderDetails);

    if (detailsError) {
      console.error("Order details insert error:", detailsError);
      return;
    }

    console.log("Order and details saved successfully!");

    // Reset
    localStorage.removeItem("pos_orders");
    window.dispatchEvent(new Event("ordersUpdated"));
    setOrders([]);
    setSuccess(true); // Show success message if you want

  } catch (error) {
    console.error("Unexpected error:", error);
    
  }
};

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
<>
{orderEmpty && (
  <div
    className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center"
    onClick={() => setOrderEmpty(false)}
  >
    <div
      className="bg-[#1F1D2B] rounded-lg p-8 w-96 text-white relative text-center text-lg font-bold"
      onClick={(e) => e.stopPropagation()} 
    >
      Your Order is Empty.
    </div>
  </div>
)}
{success && (
  <div
    className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center"
    onClick={() => setSuccess(false)}
  >
    <div
      className="bg-[#1F1D2B] rounded-lg p-8 w-96 text-white relative text-center text-lg font-bold"
      onClick={(e) => e.stopPropagation()} 
    >
      Order Added Successfully.
    </div>
  </div>
)}
    <div className="fixed top-0 right-0 h-screen w-96 bg-[#1F1D2B] flex flex-col  gap-8 pt-5 text-white overflow-y-scroll scrollbar-hide">
      <div className=" ml-8 flex flex-row text-lg font-bold ">Order</div>
      {orders.map((item) => (
        <div
          className="flex flex-col ml-5 bg-[#2C2F3D] p-4 w-84 h-32 mb-1"
          key={item.food_id}
        >
          <div className="flex flex-row gap-2 ">
            <div>
              <img src={item.img} className="w-20 h-24 object-cover"></img>
            </div>
            <div className="flex flex-col justify-between text-gray-100">
              <div className="flex flex-row w-56 justify-between">
                <div>{item.name}</div>
                <div className="text-xl font-bold">{item.total_price}</div>
              </div>
              <div className="flex flex-row justify-between w-56">
                <div>{item.unit_price}</div>
                <div className="flex flex-row items-center gap-1">
                  <div className="text-white text-lg  px-2  bg-[#14151a] hover:bg-[] cursor-pointer">
                    -
                  </div>
                  <div className="text-white text-xl  px-3  bg-[#14151a] cursor-pointer">
                    {item.qty}
                  </div>
                  <div className="text-white text-lg  px-2  bg-[#14151a] cursor-pointer">
                    +
                  </div>
                </div>
                <div className="cursor-pointer" onClick={() => {}}>
                  <Trash color="red" size={27} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="mb-32 flex"></div>
      <div className="border-t-2 border-white flex flex-col p-4 fixed bottom-0 right-0 w-96 z-50 bg-[#1F1D2B]">
        <div className="flex flex-row justify-between mb-4 text-lg font-semibold">
          <div>Total</div>
          <div className="font-bold text-xl">{total}</div>
        </div>
        <div className="flex flex-row gap-4 justify-center text-lg">
          <button className="px-6 py-1 rounded-xl border-2 border-white">
            Cancel
          </button>
          <button className="bg-[tomato] px-6 py-1 rounded-xl text-white" onClick={(e)=>(
            confirm_order(e)
          )}>
            Confirm
          </button>
        </div>
      </div>
    </div>
    </>
  );
};
