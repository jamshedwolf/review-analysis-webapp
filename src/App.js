import React, { useState } from "react";
import axios from "axios";
import Particles from "react-tsparticles";

function App() {
  const [review, setReview] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        review: review,
      });
      console.log(response.data)
      setResult(response.data.prediction);

    } catch (error) {
      console.error(error);
      setResult("Error connecting to backend 😢");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-sans">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0"
        options={{
          background: { color: { value: "#fcd34d" } },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            color: { value: ["#f472b6", "#fcd34d", "#f87171"] },
            links: { enable: false },
            collisions: { enable: false },
            move: { direction: "top", enable: true, outModes: { default: "out" }, speed: 1 },
            number: { value: 50 },
            opacity: { value: 0.8 },
            shape: { type: "circle" },
            size: { value: { min: 3, max: 6 } },
          },
          detectRetina: true,
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 bg-white/80 p-10 rounded-3xl shadow-xl w-full max-w-lg text-center">
        <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-400">
          Sentiment Analyzer
        </h1>

        <textarea
          rows={6}
          placeholder="Type your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full p-4 rounded-xl border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-6 text-lg"
        />

        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-bold rounded-xl shadow-lg hover:from-yellow-400 hover:to-pink-400 transition-colors duration-300"
        >
          Check Sentiment
        </button>

        {result && (
          <h2
            className={`mt-8 text-2xl font-semibold ${
              result === "positive" ? "text-green-600" : "text-red-600"
            }`}
          >
            Result: {result === "positive" ? "😊 Positive" : "😡 Negative"}
          </h2>
        )}
      </div>
    </div>
  );
}

export default App;
