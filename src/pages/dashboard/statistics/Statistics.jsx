import { useEffect, useState } from "react";
import { fetchHomeDashboard } from "../../../api/dashboard.api";
import SalesPurchaseChart from "../../../components/charts/SalesPurchaseChart";
import TopProductsChart from "../../../components/charts/TopProductsChart";
import "./Statistics.css";

export default function Statistics() {
  const [cards, setCards] = useState(null);
  const [range, setRange] = useState("month");
  const [graph, setGraph] = useState([]);

  useEffect(() => {
    fetchHomeDashboard(range).then((res) => {
      setGraph(res.data?.graph || []);
      setCards(res.data || {});
    });
  }, [range]);
  const topProducts =
    cards?.topSelling?.map((item) => ({
      name: item.name,
      value: item.count,
    })) || [];

  return (
    <div className="page">
      {/* ===== STAT CARDS ===== */}
      <h1>Statistics</h1>

      <div className="summary">
        <div className="stat-card yellow">
          <p>Total Revenue</p>
          <h3>₹{cards?.sales?.totalValue || 0}</h3>
          <span>+20.1% from last month</span>
        </div>

        <div className="stat-card green">
          <p>Products Sold</p>
          <h3>{cards?.sales?.count || 0}</h3>
          <span>+180.1% from last month</span>
        </div>

        <div className="stat-card pink">
          <p>Products In Stock</p>
          <h3>{cards?.inventory?.inStock || 0}</h3>
          <span>+19% from last month</span>
        </div>
      </div>

      {/* ===== GRAPH ===== */}
      <section className="r">
        <div className="table-card">
          <div className="table-header">
            <h4>Sales vs Purchase</h4>

            <select value={range} onChange={(e) => setRange(e.target.value)}>
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
            </select>
          </div>

          <SalesPurchaseChart data={graph} range={range} />
        </div>
        <div className="top-products-card">
          {topProducts.length > 0 && <TopProductsChart data={topProducts} />}
        </div>
      </section>
    </div>
  );
}
