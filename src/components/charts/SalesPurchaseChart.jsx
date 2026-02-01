import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMemo } from "react";
import normalizeToFixedMonths from "../../utils/normalizeToMonths";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function SalesPurchaseChart({ data = [], range = "month" }) {
  const chartData = useMemo(() => {
    if (!data.length) {
      return { labels: [], sales: [], purchase: [] };
    }

    // DAILY
    if (range === "day") {
      return {
        labels: data.map((d) =>
          new Date(d._id).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          }),
        ),
        sales: data.map((d) => Number(d.sales) || 0),
        purchase: data.map((d) => Number(d.purchase) || 0),
      };
    }

    // WEEKLY
    if (range === "week") {
      return {
        labels: data.map((_, i) => `Week ${i + 1}`),
        sales: data.map((d) => Number(d.sales) || 0),
        purchase: data.map((d) => Number(d.purchase) || 0),
      };
    }

    // MONTHLY (multiple months)
    if (range === "month" && data.length > 1) {
      return normalizeToFixedMonths(data);
    }

    // MONTHLY (single month)
    return {
      labels: data.map((d) =>
        new Date(d._id).toLocaleString("en-US", {
          month: "short",
          year: "2-digit",
        }),
      ),
      sales: data.map((d) => Number(d.sales) || 0),
      purchase: data.map((d) => Number(d.purchase) || 0),
    };
  }, [data, range]);

  return (
    <div style={{ height: 380 }}>
      <Bar
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: "Purchase",
              data: chartData.purchase,
              backgroundColor: "#60a5fa",
              borderRadius: 6,
              barThickness: 10,
            },
            {
              label: "Sales",
              data: chartData.sales,
              backgroundColor: "#22c55e",
              borderRadius: 6,
              barThickness: 10,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { bottom: 48 } },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
                pointStyle: "circle",
                padding: 20,
                font: { size: 13 },
              },
            },
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  `${ctx.dataset.label}: ₹${ctx.raw.toLocaleString()}`,
              },
            },
          },
          scales: {
            x: {
              offset: true,
              grid: { display: false },
              ticks: {
                autoSkip: false,
                padding: 4,
                color: "#6b7280",
                font: { size: 10, weight: "500" },
              },
            },
            y: {
              grace: "10%",
              grid: { color: "#e5e7eb" },
              ticks: {
                stepSize: 100000,
                callback: (v) => `₹${Number(v).toLocaleString()}`,
              },
            },
          },
        }}
      />
    </div>
  );
}
