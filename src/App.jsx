//https://age-gender-prediction-api-jlzf.onrender.com/predict/
import { useState } from "react";
import axios from "axios";
import "./index.css";

export default function AgeGenderPredictor() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("https://age-gender-prediction-api-jlzf.onrender.com/predict/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (err) {
      console.log(err)
      setError("Unexpected model output format");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Fixed Top Navigation Bar */}
      <nav className="navbar">
        <h1 className="app-title">🚀 Gen Vision</h1>
      </nav>

      {/* Centered Content */}
      <div className="content">
        <div className="card">
          <h1 className="title">🔍 Age & Gender Predictor</h1>
          <label className="upload-btn">
            📤 Upload Image
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
          {preview && <img src={preview} alt="Preview" className="preview" />}
          <button onClick={handleSubmit} disabled={loading || !image} className="predict-btn">
            {loading ? "⏳ Predicting..." : "🚀 Predict"}
          </button>
          {result && (
            <div className="result">
              <p>👤 <strong>Age:</strong> {result.age}</p>
              <p>🚹🚺 <strong>Gender:</strong> {result.gender}</p>
            </div>
          )}
          {error && <p className="error">⚠️ {error}</p>}
        </div>
      </div>
    </div>
  );
}
