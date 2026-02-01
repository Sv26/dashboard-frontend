import { useState } from "react";
import "./style/BuyModal.css";

export default function BuyModal({ product, onClose, onBuy }) {
  const [qty, setQty] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Simulate Buy Product</h3>

        <input
          type="number"
          min="1"
          placeholder="Enter quantity"
          value={qty}
          onChange={(e) => {
            setQty(e.target.value);
            setError("");
          }}
        />

        {error && <p className="error-text">{error}</p>}

        <div className="actions">
          <button onClick={onClose}>Cancel</button>

          <button
            disabled={!qty || Number(qty) <= 0}
            onClick={() => onBuy(qty, setError)}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
