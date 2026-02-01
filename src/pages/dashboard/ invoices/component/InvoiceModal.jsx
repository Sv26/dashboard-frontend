import "./InvoiceModal.css";

export default function InvoiceModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="invoice-wrapper">
        {/* ACTION ICONS */}
        <div className="invoice-actions">
          <button className="close" onClick={onClose}>
            ✕
          </button>
          <button className="download">⬇</button>
          <button className="print">🖨</button>
        </div>

        {/* INVOICE CARD */}
        <div className="invoice-modal">
          <header className="invoice-header">
            <h1>INVOICE</h1>

            <div className="invoice-address">
              <div>
                <strong>Billed to</strong>
                <p>Company Name</p>
                <p>Company Address</p>
                <p>City, Country</p>
              </div>

              <div className="right">
                <p>Business Address</p>
                <p>City, State</p>
                <p>TAX ID 00XXXX1234XXX</p>
              </div>
            </div>
          </header>

          <section className="invoice-body">
            <table>
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Qty</th>
                  <th className="right">Price</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Tata Salt (1kg)</td>
                  <td>2</td>
                  <td className="right">₹55</td>
                </tr>
                <tr>
                  <td>Maggi Noodles (12 pack)</td>
                  <td>1</td>
                  <td className="right">₹136</td>
                </tr>
                <tr>
                  <td>Good Day Biscuits (10 pack)</td>
                  <td>1</td>
                  <td className="right">₹227</td>
                </tr>
                <tr>
                  <td>Red Label Tea (500g)</td>
                  <td>1</td>
                  <td className="right">₹263</td>
                </tr>
                <tr>
                  <td>Sugar (5kg)</td>
                  <td>1</td>
                  <td className="right">₹272</td>
                </tr>
                <tr>
                  <td>Mixed Vegetables</td>
                  <td>1 set</td>
                  <td className="right">₹1,090</td>
                </tr>
              </tbody>
            </table>

            <div className="invoice-total">
              <div>
                <p>Subtotal</p>
                <p>Tax (10%)</p>
                <p className="grand">Total due</p>
              </div>

              <div className="right">
                <p>₹5,090</p>
                <p>₹510</p>
                <p className="grand">₹5,600</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
