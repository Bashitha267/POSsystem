// DashboardBarChart.tsx
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import supabase from "../supabaseClient";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);



const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top"as const ,
    },
  },
  layout: {
    padding: {
      top: 5, 
      bottom:10
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
type Order={
   id: number;
  created_at: Date;
  total_amount: number;

}

export default function DashboardBarChart() {
  const [orders,setOrders]=useState<Order []>([]);
  const[orderLoading,setOrdersLoading]=useState(false)
   const [monthlyCounts, setMonthlyCounts] = useState<number[]>(Array(12).fill(0));
   const [monthlyTotal, setMonthlyTotal] = useState<number[]>(Array(12).fill(0));

  useEffect(()=>{
    setOrdersLoading(true);
    const getOrders=async()=>{
      try{
        const { data, error } = await supabase
          .from("orders")
          .select("id, created_at, total_amount");
        if (error) {
          console.error("Error fetching orders:", error);
          return;
        }
        if(data){
const counts = Array(12).fill(0);
const total=Array(12).fill(0)
          data.forEach((order) => {
            const orderDate = new Date(order.created_at);
            const month = orderDate.getMonth();
            counts[month]++;
            total[month]=total[month]+order.total_amount;
          });
          setMonthlyCounts(counts)
          setMonthlyTotal(total)
        }

      }
      catch(e){
        console.log(e)
      }
      finally{
        setOrdersLoading(false)
      }





    }
    getOrders()
  },[])
  const chartdata = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May","June","July","August","September","Octomber","November","December"],
  datasets: [
    {
      label: "Orders",
      data: monthlyCounts,
      backgroundColor: "white", 
      borderRadius: 6,
      padding: 20,
      
    },
  ],
};
const chartdatatotal = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May","June","July","August","September","Octomber","November","December"],
  datasets: [
    {
      label: "Orders",
      data: monthlyTotal,
      backgroundColor: "white", 
      borderRadius: 6,
      padding: 20,
      
    },
  ],
};
  return (
     <div className="rounded-xl shadow  p-6 w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-4 text-white text-center mt-4" >Monthly Orders</h2>
      <div className="w-full h-80 flex flex-col bg-[#1F1D2B] mb-4"> 
        <Bar data={chartdata} options={options} />
        
      </div>
         <div className="w-full h-80 flex flex-col bg-[#1F1D2B] mt-2"> 
        <Bar data={chartdatatotal} options={options} />
        
      </div>
    </div>
  );
}
