import { useEffect, useState } from "react";
import {
  getInvoices,
  getInvoiceSummary,
  updateInvoiceStatus,
  deleteInvoice,
} from "../../../api/invoice.api";
import InvoiceModal from "./component/InvoiceModal";

import "./Invoices.css";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [summary, setSummary] = useState(null);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [viewInvoice, setViewInvoice] = useState(null);

  /* =========================
     SEARCH
  ========================= */
  const [search, setSearch] = useState("");

  /* =========================
     PAGINATION
  ========================= */
  const [page, setPage] = useState(1);
  const limit = 8;

  /* =========================
     LOAD DATA
  ========================= */
  const loadData = async () => {
    const [list, summaryData] = await Promise.all([
      getInvoices(),
      getInvoiceSummary(),
    ]);

    setInvoices(list);
    setSummary(summaryData);
    setPage(1);
  };

  useEffect(() => {
    loadData();
  }, []);

  /* =========================
     FILTERED DATA
  ========================= */
  const filteredInvoices = invoices.filter((inv) =>
    inv._id.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredInvoices.length / limit);
  const paginatedInvoices = filteredInvoices.slice(
    (page - 1) * limit,
    page * limit,
  );

  /* =========================
     STATUS TOGGLE
  ========================= */
  const toggleStatus = async (inv) => {
    const newStatus = inv.status === "paid" ? "unpaid" : "paid";
    await updateInvoiceStatus(inv._id, newStatus);
    loadData();
  };

  /* =========================
     DELETE
  ========================= */
  const confirmDelete = async () => {
    await deleteInvoice(deleteId);
    setDeleteId(null);
    loadData();
  };

  return (
    <div className="invoice-page">
      <div className=" invoice-header">
        <h1>Invoice</h1>

        {/* SEARCH */}
        <div className="invoice-Search">
          <input
            className="search-input"
            placeholder="Search invoice ID"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* SUMMARY */}
      {summary && (
        <section>
          <h2>Overall Invoice</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <h4>Recent Transactions</h4>
              <h3>{summary.totalInvoices}</h3>
              <span>Last 7 days</span>
            </div>

            <div className="overview-card">
              <h4>Total Invoices</h4>

              <div className="overview-card-min">
                <div>
                  <h3>{summary.totalInvoices}</h3>
                  <span>Total Till Date</span>
                </div>

                <div>
                  <h3>138</h3>
                  <span>Processed</span>
                </div>
              </div>
            </div>

            <div className="overview-card">
              <h4>Paid Amount</h4>

              <div className="overview-card-min">
                <div>
                  <h3>₹{summary.paidAmount}</h3>
                  <span>Last 7 days</span>
                </div>

                <div>
                  <h3>{summary.paidInvoices}</h3>
                  <span>Customers</span>
                </div>
              </div>
            </div>

            <div className="overview-card">
              <h4>Unpaid Amount</h4>

              <div className="overview-card-min">
                <div>
                  <h3>₹{summary.unpaidAmount}</h3>
                  <span>Total Pending</span>
                </div>

                <div>
                  <h3>{summary.unpaidInvoices}</h3>
                  <span>Customers</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TABLE */}
      <div className="invoice-card">
        <h3 className="table-title">Invoices List</h3>

        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Reference</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Due Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginatedInvoices.map((inv) => (
              <tr key={inv._id}>
                <td>{"INV-" + inv._id.slice(-4)}</td>
                <td>{inv._id}</td>
                <td>₹ {inv.amount}</td>

                {/* STATUS COLUMN */}
                <td className="status-col">
                  <span className={`status-pill ${inv.status}`}>
                    {inv.status === "paid" ? "Paid" : "Unpaid"}
                  </span>
                </td>

                <td>{new Date(inv.dueDate).toLocaleDateString()}</td>

                {/* MENU COLUMN */}
                <td style={{ position: "relative" }}>
                  <button
                    className="menu-btn"
                    onClick={() =>
                      setOpenMenuId(openMenuId === inv._id ? null : inv._id)
                    }
                  >
                    ⋮
                  </button>

                  {openMenuId === inv._id && (
                    <div className="row-menu">
                      <button
                        className={`menu-status-btn ${
                          inv.status === "paid" ? "unpaid" : "paid"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStatus(inv);
                          setOpenMenuId(null);
                        }}
                      >
                        {inv.status === "paid" ? "Unpaid" : "Paid"}
                      </button>

                      <button
                        onClick={() => {
                          setViewInvoice(inv);
                          setOpenMenuId(null);
                        }}
                      >
                        👁 View Invoice
                      </button>

                      <button
                        className="danger"
                        onClick={() => {
                          setDeleteId(inv._id);
                          setOpenMenuId(null);
                        }}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>

            <span>
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

      {/* VIEW MODAL */}

      {/* MODAL */}
      <InvoiceModal open={viewInvoice} onClose={() => setViewInvoice(false)} />

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>This invoice will be deleted.</p>
            <div className="modal-actions">
              <button onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="danger" onClick={confirmDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
