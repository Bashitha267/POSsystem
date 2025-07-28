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
      position: "top" as const,
    },
  },
  layout: {
    padding: {
      top: 5,
      bottom: 10,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function DashboardBarChart() {
 
  const [monthlyCounts, setMonthlyCounts] = useState<number[]>(Array(12).fill(0));
  const [monthlyTotal, setMonthlyTotal] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    
    const getOrders = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("id, created_at, total_amount");
        if (error) {
          console.error("Error fetching orders:", error);
          return;
        }
        if (data) {
          const counts = Array(12).fill(0);
          const total = Array(12).fill(0);
          data.forEach((order) => {
            const orderDate = new Date(order.created_at);
            const month = orderDate.getMonth();
            counts[month]++;
            total[month] += order.total_amount;
          });
          setMonthlyCounts(counts);
          setMonthlyTotal(total);
        }
      } catch (e) {
        console.log(e);
      } finally {
       
      }
    };
    getOrders();
  }, []);

  const chartdata = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Orders Count",
        data: monthlyCounts,
        backgroundColor: "white",
        borderRadius: 6,
      },
    ],
  };

  const chartdatatotal = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Monthly Total",
        data: monthlyTotal,
        backgroundColor: "white",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="w-full flex flex-col mt-3">
      <h2 className="text-xl font-semibold mb-4 text-white text-center mt-4">Monthly Stats</h2>

      <div className="flex flex-col lg:flex-row gap-6">
     
        <div className="w-full lg:w-1/2 bg-[#1F1D2B] p-4 rounded-lg h-fit">
          <h3 className="text-white text-center mb-2">Monthly Orders</h3>
          <div className="">
            <Bar data={chartdata} options={options} />
          </div>
        </div>

      
        <div className="w-full lg:w-1/2 bg-[#1F1D2B] p-4 rounded-lg h-fit">
          <h3 className="text-white text-center mb-2">Monthly Total</h3>
          <div className="">
            <Bar data={chartdatatotal} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}
