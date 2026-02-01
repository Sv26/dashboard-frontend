import "./style/ProductTable.css";

export default function ProductTable({ products, onRowClick }) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Products</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Threshold</th>
          <th>Expiry</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => {
          let status = "in-stock";
          if (p.quantity === 0) status = "out-of-stock";
          else if (p.quantity <= p.threshold) status = "low-stock";

          return (
            <tr key={p._id} onClick={() => onRowClick(p)}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.threshold}</td>
              <td>
                {p.expiryDate
                  ? new Date(p.expiryDate).toLocaleDateString()
                  : "—"}
              </td>
              <td className={status}>{status.replace("-", " ")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
