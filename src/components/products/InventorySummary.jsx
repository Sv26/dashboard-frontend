import "./style/InventorySummary.css";

export default function InventorySummary({
  categories,
  totalProducts,
  totalAmount,
  topSellingCount,
  revenue,
  lowStock,
  notInStock,
}) {
  return (
    <div className="inventory-summary">
      <h2 className="summary-title">Overall Inventory</h2>

      <div className="summary-grid">
        {/* Categories */}
        <div className="summary-item">
          <h4>Categories</h4>
          <p className="summary-value">{categories}</p>
          <span>Last 7 days</span>
        </div>

        <div className="divider" />

        {/* Total Products */}
        <div className="summary-item dual">
          <h4>Total Products</h4>
          <div className="dual-values">
            <div>
              <p className="summary-value">{totalProducts}</p>
              <span>Last 7 days</span>
            </div>
            <div>
              <p className="summary-value">₹{totalAmount}</p>
              <span>Amount</span>
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* Top Selling */}
        <div className="summary-item dual">
          <h4>Top Selling</h4>
          <div className="dual-values">
            <div>
              <p className="summary-value">{topSellingCount}</p>
              <span>Last 7 days</span>
            </div>
            <div>
              <p className="summary-value">₹{revenue}</p>
              <span>Revenue</span>
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* Low Stocks */}
        <div className="summary-item dual">
          <h4>Low Stocks</h4>
          <div className="dual-values">
            <div>
              <p className="summary-value">{lowStock}</p>
              <span>Low Stock</span>
            </div>
            <div>
              <p className="summary-value">{notInStock}</p>
              <span>Not in stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
