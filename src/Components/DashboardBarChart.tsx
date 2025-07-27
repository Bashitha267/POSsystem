// DashboardBarChart.tsx
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Orders",
      data: [120, 190, 300, 250, 200],
      backgroundColor: "white", 
      borderRadius: 6,
    },
  ],
};

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
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function DashboardBarChart() {
  return (
     <div className="rounded-xl shadow  p-6 w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-4 text-white text-center mt-4" >Monthly Orders</h2>
      <div className="w-full h-80"> 
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
