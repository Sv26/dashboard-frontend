import { useEffect, useState } from "react";
import { fetchHomeDashboard } from "../../../api/dashboard.api";
import SalesPurchaseChart from "../../../components/charts/SalesPurchaseChart";
import TopProductsChart from "../../../components/charts/TopProductsChart";

import revenueIcon from "../../../asetes/Revenue.png";
import profitIcon from "../../../asetes/Profit.png";
import costIcon from "../../../asetes/Cost.png";
import salesIon from "../../../asetes/Sales.png";

import purchaseIcon from "../../../asetes/Purchase.png";
import costIcon1 from "../../../asetes/Cost1.png";
import cancelIcon from "../../../asetes/Cancel.png";
import returnIcon from "../../../asetes/Return.png";

import quantityIcon from "../../../asetes/Quantity.png";
import onTheWayIcon from "../../../asetes/On the way.png";
import categoriesIcon from "../../../asetes/Categories.png";
import suppliersIcon from "../../../asetes/Suppliers.png";

import "./Home.css";

/* =======================
   Reusable Mini Card
======================= */
function MiniCard({ label, value, icon }) {
  return (
    <div className="mini-card">
      {icon && <img src={icon} alt={label} className="mini-icon" />}
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}

export default function Home() {
  const [range, setRange] = useState("month");
  const [graph, setGraph] = useState([]);
  const [cards, setCards] = useState(null);

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
      <h1 className="heding">Home</h1>

      <div className="main">
        {/* ================= LEFT COLUMN ================= */}
        <section className="left">
          <div className="overview">
            <h4>Sales Overview</h4>
            <div className="overview-grid">
              <MiniCard
                label="Sales"
                value={cards?.sales?.count || 0}
                icon={salesIon}
              />
              <MiniCard label="Revenue" value="₹18,300" icon={revenueIcon} />
              <MiniCard label="Profit" value="₹868" icon={profitIcon} />
              <MiniCard label="Cost" value="₹17,432" icon={costIcon} />
            </div>
          </div>

          <div className="overview">
            <h4>Purchase Overview</h4>
            <div className="overview-grid">
              <MiniCard
                label="Purchase"
                value={cards?.purchase?.count || 0}
                icon={purchaseIcon}
              />
              <MiniCard label="Cost" value="₹13,573" icon={costIcon1} />
              <MiniCard label="Cancel" value="5" icon={cancelIcon} />
              <MiniCard label="Return" value="₹17,432" icon={returnIcon} />
            </div>
          </div>

          <div className="table">
            <div className="table-header">
              <h4>Sales & Purchase</h4>
              <select value={range} onChange={(e) => setRange(e.target.value)}>
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
              </select>
            </div>

            <SalesPurchaseChart data={graph} range={range} />
          </div>
        </section>

        {/* ================= RIGHT COLUMN ================= */}
        <section className="right-cards">
          <div className="summary-card">
            <h4>Inventory Summary</h4>
            <div className="summary-grid">
              <MiniCard
                label="In Stock"
                value={cards?.inventory?.inStock || 0}
                icon={quantityIcon}
              />
              <MiniCard
                label="To be received"
                value="200"
                icon={onTheWayIcon}
              />
            </div>
          </div>

          <div className="summary-card">
            <h4>Product Summary</h4>
            <div className="summary-grid">
              <MiniCard
                label="Suppliers"
                value={cards?.products?.suppliers || 31}
                icon={suppliersIcon}
              />
              <MiniCard
                label="Categories"
                value={cards?.products?.categories || 21}
                icon={categoriesIcon}
              />
            </div>
          </div>

          <TopProductsChart data={topProducts} />
        </section>
      </div>
    </div>
  );
}
