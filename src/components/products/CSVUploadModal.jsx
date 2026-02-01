import { useState } from "react";
import Papa from "papaparse";
import { uploadCSV } from "../../api/products.api";
import "./style/CSVUploadModal.css";

export default function CSVUploadModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!file) return;

    setLoading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (res) => {
        try {
          await uploadCSV(res.data);
          onClose(); // ✅ close modal + refresh list
        } catch (err) {
          setError("CSV upload failed");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="csv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="csv-card">
          {error && <p className="csv-error">{error}</p>}

          <div className="csv-form">
            {/* Upload Box */}
            <div className="csv-upload-box">
              <input
                id="csv-file-input"
                type="file"
                accept=".csv"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />

              <label htmlFor="csv-file-input" className="csv-upload-label">
                <div className="csv-upload-icon">📄</div>
                <p className="csv-upload-text">
                  Drag your file to start uploading
                  <br />
                  <span>or browse files</span>
                </p>

                {file && <p className="csv-file-name">{file.name}</p>}
              </label>
            </div>

            {/* Actions */}
            <div className="csv-actions">
              <button className="csv-btn csv-btn-cancel" onClick={onClose}>
                Cancel
              </button>

              <button
                className="csv-btn csv-btn-upload"
                disabled={!file || loading}
                onClick={handleSubmit}
              >
                {loading ? "Uploading..." : "Upload CSV"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
