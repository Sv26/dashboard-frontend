import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, buyProduct } from "../../../api/products.api";
import { fetchHomeDashboard } from "../../../api/dashboard.api";
import "./Products.css";

import ProductTable from "../../../components/products/ProductTable";
import BuyModal from "../../../components/products/BuyModal";
import CSVUploadModal from "../../../components/products/CSVUploadModal";
import InventorySummary from "../../../components/products/InventorySummary";

export default function Products() {
  const navigate = useNavigate();

  // ======================
  // STATE
  // ======================
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [dashboard, setDashboard] = useState(null);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showCSVModal, setShowCSVModal] = useState(false);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  // ======================
  // FETCH PAGINATED DATA
  // ======================
  const load = useCallback(async () => {
    const data = await fetchProducts({ page, limit, search });
    setProducts(data.products || []);
    setTotal(data.total || 0);
  }, [page, search]);

  // ======================
  // FETCH ALL PRODUCTS (SUMMARY)
  // ======================
  const loadAllProducts = useCallback(async () => {
    const data = await fetchProducts({
      page: 1,
      limit: 100000,
      search,
    });
    setAllProducts(data.products || []);
  }, [search]);

  // ======================
  // FETCH DASHBOARD (TOP SELLING)
  // ======================
  const loadDashboard = useCallback(async () => {
    const res = await fetchHomeDashboard("month");
    setDashboard(res.data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    loadAllProducts();
  }, [loadAllProducts]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // ======================
  // BUY PRODUCT
  // ======================
  const handleBuy = async (qty, setError) => {
    const quantity = Number(qty);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }

    if (quantity > selectedProduct.quantity) {
      setError(`Only ${selectedProduct.quantity} items available`);
      return;
    }

    try {
      setError("");
      await buyProduct({
        productId: selectedProduct._id,
        quantity,
      });

      setSelectedProduct(null);
      load();
      loadAllProducts();
      loadDashboard();
    } catch (err) {
      setError("Purchase failed. Try again.");
    }
  };

  // ======================
  // SUMMARY CALCULATIONS
  // ======================
  const categories = new Set(allProducts.map((p) => p.category)).size;

  const totalQuantity = allProducts.reduce(
    (sum, p) => sum + Number(p.quantity || 0),
    0,
  );

  const lowStock = allProducts.filter(
    (p) => p.quantity > 0 && p.quantity <= p.threshold,
  ).length;

  const notInStock = allProducts.filter((p) => p.quantity === 0).length;

  const totalAmount = allProducts.reduce(
    (sum, p) => sum + Number(p.price || 0) * Number(p.quantity || 0),
    0,
  );

  // ======================
  // RENDER
  // ======================
  return (
    <div className="dashboard-layout dashboard-fluid">
      <main>
        <div className="page">
          {/* HEADER */}

          <div className="header">
            <h1>Products</h1>
            <div className="toolbar">
              <input
                placeholder="Search product or ID"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          <div className="inventory">
            {/* SUMMARY */}
            <InventorySummary
              categories={categories}
              totalProducts={totalQuantity}
              totalAmount={totalAmount}
              topSellingCount={dashboard?.topSelling?.count || 0}
              revenue={dashboard?.topSelling?.revenue || 0}
              lowStock={lowStock}
              notInStock={notInStock}
            />

            {/* TABLE */}
            <div className="table-card">
              <div className="table-header">
                <h4>Products</h4>
                <button
                  className="add-btn"
                  onClick={() => setShowTypeModal(true)}
                >
                  Add Product
                </button>
              </div>

              <ProductTable
                products={products}
                onRowClick={setSelectedProduct}
              />

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>

                  <span className="page-info">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            {/* ADD PRODUCT TYPE MODAL */}
            {showTypeModal && (
              <div
                className="modal-backdrop"
                onClick={() => setShowTypeModal(false)}
              >
                <div
                  className="add-type-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="add-type-btn"
                    onClick={() => {
                      setShowTypeModal(false);
                      navigate("/dashboard/product/add");
                    }}
                  >
                    Individual product
                  </button>

                  <button
                    className="add-type-btn secondary"
                    onClick={() => {
                      setShowTypeModal(false);
                      setShowCSVModal(true);
                    }}
                  >
                    Multiple product
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* BUY MODAL */}
          {selectedProduct && (
            <BuyModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onBuy={handleBuy}
            />
          )}

          {/* CSV UPLOAD MODAL */}
          {showCSVModal && (
            <CSVUploadModal
              onClose={() => {
                setShowCSVModal(false);
                load();
                loadAllProducts();
                loadDashboard();
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
