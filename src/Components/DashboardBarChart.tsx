import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import supabase from "../supabaseClient";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

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
const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "white", // Optional: to make legend text white
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  layout: {
    padding: 0, // Remove extra padding
  },
};
export default function DashboardBarChart() {
  const [monthlyCounts, setMonthlyCounts] = useState<number[]>(
    Array(12).fill(0)
  );
  const [monthlyTotal, setMonthlyTotal] = useState<number[]>(Array(12).fill(0));
  const [mostSaled, setMostSaled] = useState<any>(null);

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
      }
    };
    getOrders();
  }, []);

useEffect(() => {
  const getItems = async () => {
    try {
     const { data, error } = await supabase
  .from("order_details")
  .select("quantity, food_id, food_items(name)")
  .returns<
    {
      quantity: number;
      food_id: number;
      food_items: {
        name: string;
      } | null; // In case there's no matching food_item
    }[]
  >();

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        const freqMap: Record<number, { quantity: number; food_name: string }> = {};
  data.forEach(({ food_id, quantity, food_items }) => {
  const name = food_items?.name || "Unknown";

  if (!freqMap[food_id]) {
    freqMap[food_id] = { quantity: 0, food_name: name };
  }
  freqMap[food_id].quantity += quantity;
});

        const sorted = Object.entries(freqMap)
          .sort((a, b) => b[1].quantity - a[1].quantity)
          .slice(0, 4);

        const labels = sorted.map(([_, val]) => val.food_name);
        const values = sorted.map(([_, val]) => val.quantity);

        setMostSaled({
          labels,
          datasets: [
            {
              label: "Top 5 Items",
              data: values,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
             
              ],
              borderWidth: 1,
            },
          ],
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getItems();
}, []);

  const chartdata = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
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
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
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
      <h3 className="text-xl font-semibold mb-4 text-white text-center mt-4">
        Monthly Stats
      </h3>

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        <div className="w-full lg:w-1/2 bg-[#1F1D2B] p-4 rounded-lg h-fit">
          <h3 className="text-white text-center mb-2">Monthly Orders</h3>
          <div>
            <Bar data={chartdata} options={options} />
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-[#1F1D2B] p-4 rounded-lg h-fit">
          <h3 className="text-white text-center mb-2">Monthly Total</h3>
          <div>
            <Bar data={chartdatatotal} options={options} />
          </div>
        </div>
      </div>
     <h3 className="text-xl font-semibold mb-4 text-white text-center mt-4">
        Most Saled Items
      </h3>
      <div className="w-full lg:w-1/2 bg-[#1F1D2B] p-4 rounded-lg h-fit mt-3">
      
        {mostSaled ? (
          <Pie data={mostSaled} options={pieOptions} />
        ) : (
          <p className="text-white text-center">Loading...</p>
        )}
      </div>
    </div>
  );
}
