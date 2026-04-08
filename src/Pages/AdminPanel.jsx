import React, { useState, useEffect } from "react";

function AdminPanel() {
  const [category, setCategory] = useState("video");
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [works, setWorks] = useState([]);

  const API = "http://localhost:5000";

  // 🔥 FETCH
  const fetchWorks = async () => {
    try {
      const res = await fetch(`${API}/api/upload-work`);
      const data = await res.json();
      setWorks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  // 📊 STATS
  const total = works.length;
  const videoCount = works.filter(w => w.category === "video").length;
  const aiCount = works.filter(w => w.category === "ai").length;
  const creativeCount = works.filter(w => w.category === "creative").length;
  const brandingCount = works.filter(w => w.category === "branding").length;

  // 🚀 UPLOAD
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("category", category);

    if (category === "video") {
      if (!before || !after) return alert("Before & After required");
      formData.append("before", before);
      formData.append("after", after);
    } else {
      if (!file) return alert("File required");
      formData.append("file", file);
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/upload-work/upload`, {
        method: "POST",
        body: formData,
      });

      await res.json();

      alert("Uploaded ✅");

      setBefore(null);
      setAfter(null);
      setFile(null);

      fetchWorks();

    } catch (err) {
      alert("Upload Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    await fetch(`${API}/api/upload-work/${id}`, {
      method: "DELETE",
    });

    fetchWorks();
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Vidzyra Admin Dashboard ⚡
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Stat title="Total" value={total} />
        <Stat title="Video" value={videoCount} />
        <Stat title="AI" value={aiCount} />
        <Stat title="Creative" value={creativeCount} />
        <Stat title="Branding" value={brandingCount} />
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT SIDE (DATA LIST) */}
        <div className="md:col-span-2">

          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Uploaded Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {works.map((item) => (
              <div key={item._id} className="bg-white p-3 rounded shadow">

                <p className="text-blue-500 text-sm mb-2">
                  {item.category}
                </p>

                {item.category === "video" ? (
                  <>
                    <video
                      src={`${API}/uploads/${item.before}`}
                      controls
                      className="mb-2"
                    />
                    <video
                      src={`${API}/uploads/${item.after}`}
                      controls
                    />
                  </>
                ) : (
                  <img
                    src={`${API}/uploads/${item.file}`}
                    alt=""
                    className="rounded"
                  />
                )}

                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-2 w-full bg-red-500 text-white py-1 rounded"
                >
                  Delete ❌
                </button>

              </div>
            ))}

          </div>
        </div>

        {/* RIGHT SIDE (UPLOAD PANEL) */}
        <div className="bg-white p-5 rounded-xl shadow h-fit">

          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            Upload Project
          </h2>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          >
            <option value="video">Video (Before/After)</option>
            <option value="ai">AI Video</option>
            <option value="creative">Creative</option>
            <option value="branding">Branding</option>
          </select>

          {category === "video" ? (
            <>
              <input
                type="file"
                onChange={(e) => setBefore(e.target.files[0])}
                className="mb-2"
              />
              <input
                type="file"
                onChange={(e) => setAfter(e.target.files[0])}
              />
            </>
          ) : (
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          )}

          <button
            onClick={handleUpload}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

        </div>
      </div>
    </div>
  );
}

// STAT COMPONENT
function Stat({ title, value }) {
  return (
    <div className="bg-white p-4 rounded text-center shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-bold text-blue-600">{value}</h2>
    </div>
  );
}

export default AdminPanel;