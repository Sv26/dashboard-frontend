import { useState } from "react";
import { addProduct, checkProductId } from "../../api/products.api";
import "./style/AddProductModal.css";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    productId: "",
    category: "",
    price: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    threshold: "",
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const submit = async () => {
    try {
      await addProduct({
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
        threshold: Number(form.threshold),
        image,
      });
      window.history.back();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="page">
      <div className="header">
        <h1>Product</h1>
      </div>
      <dir className="p">
        <h3>Add Product &gt; Individual Product</h3>
      </dir>
      <div className="form-card">
        {error && <p className="error">{error}</p>}

        <div className="product-form">
          {/* IMAGE ROW */}
          <div className="form-row image-row">
            <label>Image</label>

            <div
              className={`image-upload ${image ? "has-image" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith("image/")) {
                  setImage(URL.createObjectURL(file));
                }
              }}
              onClick={() =>
                document.getElementById("product-image-input").click()
              }
            >
              {image ? (
                <img src={image} alt="Preview" />
              ) : (
                <span>
                  Drag image here <br />
                  <b>Browse image</b>
                </span>
              )}

              <input
                id="product-image-input"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setImage(URL.createObjectURL(file));
                }}
              />
            </div>
          </div>

          {/* FIELD ROWS */}
          <div className="form-row">
            <label>Product Name</label>
            <input
              placeholder="Enter product name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>Product ID</label>
            <input
              placeholder="Enter product ID"
              onBlur={async () => {
                if (!form.productId) return;
                setChecking(true);
                const res = await checkProductId(form.productId);
                if (res.exists) setError("Product ID already exists");
                setChecking(false);
              }}
              onChange={(e) => {
                setError("");
                setForm({ ...form, productId: e.target.value });
              }}
            />
          </div>

          <div className="form-row">
            <label>Category</label>
            <input
              placeholder="Select product category"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>Price</label>
            <input
              placeholder="Enter price"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>Quantity</label>
            <input
              placeholder="Enter product quantity"
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>Unit</label>
            <input
              placeholder="Enter product unit"
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>Expiry Date</label>
            <input
              type="date"
              onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>Threshold Value</label>
            <input
              placeholder="Enter threshold value"
              onChange={(e) => setForm({ ...form, threshold: e.target.value })}
            />
          </div>

          {/* ACTIONS */}
          <div className="form-actions">
            <button onClick={() => window.history.back()}>Discard</button>
            <button onClick={submit} disabled={checking}>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
