import { useState } from "react";
import axios from "axios";

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
      console.log(response)
      setResult(response.data);
    } catch (err) {
      console.log('err ')
      console.log(err)
      setError("Unexpected model output format");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Age & Gender Predictor</h1>
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
        {preview && <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded mb-4" />}
        <button
          onClick={handleSubmit}
          disabled={loading || !image}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
        {result && (
          <div className="mt-4 p-4 bg-green-100 rounded">
            <p><strong>Age:</strong> {result.age}</p>
            <p><strong>Gender:</strong> {result.gender}</p>
          </div>
        )}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
