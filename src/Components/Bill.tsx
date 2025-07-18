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
  useEffect(() => {
  const loadOrders = () => {
    const storedOrders = localStorage.getItem("pos_orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  };

  // Load once on mount
  loadOrders();

  // Listen for changes
  window.addEventListener("ordersUpdated", loadOrders);

  return () => {
    window.removeEventListener("ordersUpdated", loadOrders);
  };
}, []);

  return (
    <div className="fixed top-0 right-0 h-screen w-80 bg-[#1F1D2B] flex flex-col items-center gap-8 py-6 text-white">
      {
        orders.map((item)=>(
          <div className="text-white">{item.name}</div>
        ))
      }
    </div>
  )
}
