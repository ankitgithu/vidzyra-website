import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function WorkGallery() {
  const [activeTab, setActiveTab] = useState("creative");
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

const API = "https://vidzyra-website.onrender.com";

  const filteredWorks = works.filter(
    (item) => item.category === activeTab
  );

  useEffect(() => {
    fetch(`${API}/api/upload-work`)
      .then((res) => res.json())
      .then((data) => {
        setWorks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white p-6">

      {/* BACK */}
      <Link to="/">
        <button className="mb-6 bg-white text-blue-900 px-5 py-2 rounded-full font-semibold">
          ← Back
        </button>
      </Link>

      {/* HEADING */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Our Works 🚀
      </h1>

      {/* TABS */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {[
          { key: "creative", label: "Creative Edit" },
          { key: "branding", label: "Branding" },
          { key: "ai", label: "AI Video" },
          { key: "video", label: "Video" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2 rounded-full ${
              activeTab === tab.key
                ? "bg-white text-blue-900"
                : "bg-white/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto">

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : filteredWorks.length === 0 ? (
          <p className="text-center">No content found 😢</p>
        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

            {filteredWorks.map((item) => (
              <div
                key={item._id}
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer bg-white/10 rounded-lg p-2 hover:scale-105 transition"
              >

                {/* 🎬 VIDEO */}
                {item.category === "video" ? (
                  <div>
                    <p className="text-xs text-center mb-2 font-semibold">
                      Before | After
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      <video
                        src={`${API}/uploads/${item.before}`}
                        className="w-full h-auto object-contain rounded"
                      />
                      <video
                        src={`${API}/uploads/${item.after}`}
                        className="w-full h-auto object-contain rounded"
                      />
                    </div>
                  </div>
                ) : item.category === "ai" ? (
                  <video
                    src={`${API}/uploads/${item.file}`}
                    className="w-full h-auto object-contain rounded"
                  />
                ) : (
                  <img
                    src={`${API}/uploads/${item.file}`}
                    className="w-full h-auto object-contain rounded"
                    alt=""
                  />
                )}

              </div>
            ))}

          </div>
        )}

      </div>

      {/* 🔥 POPUP CARD (NOT FULLSCREEN) */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white p-4 rounded-xl max-w-xl w-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="text-black mb-2"
            >
              ✕ Close
            </button>

            {/* VIDEO */}
            {selectedItem.category === "video" && (
              <div>
                <p className="text-center text-black font-semibold mb-2">
                  Before | After
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <video
                    src={`${API}/uploads/${selectedItem.before}`}
                    controls
                    className="w-full rounded"
                  />
                  <video
                    src={`${API}/uploads/${selectedItem.after}`}
                    controls
                    className="w-full rounded"
                  />
                </div>
              </div>
            )}

            {/* AI VIDEO */}
            {selectedItem.category === "ai" && (
              <video
                src={`${API}/uploads/${selectedItem.file}`}
                controls
                autoPlay
                className="w-full rounded"
              />
            )}

            {/* IMAGE */}
            {(selectedItem.category === "creative" ||
              selectedItem.category === "branding") && (
              <img
                src={`${API}/uploads/${selectedItem.file}`}
                className="w-full rounded"
                alt=""
              />
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default WorkGallery;