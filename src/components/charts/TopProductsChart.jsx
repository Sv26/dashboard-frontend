export default function TopProductsChart({ data = [] }) {
  return (
    <div className="top-products-card">
      <h4 className="top-products-title">Top Products</h4>

      <div className="top-products-list">
        {data.length === 0 ? (
          <p className="empty">No data available</p>
        ) : (
          data.map((item) => (
            <div key={item.name} className="product-row">
              {item.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
