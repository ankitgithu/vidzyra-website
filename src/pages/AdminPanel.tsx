import React, { useState, useEffect } from "react";

function AdminPanel() {
  const [category, setCategory] = useState("video");
  const [activeTab, setActiveTab] = useState("creative");

  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [works, setWorks] = useState([]);
  const [title, setTitle] = useState("");

  // 🔥 POPUP STATE
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

 const API = "https://vidzyra-website.onrender.com";
  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    const res = await fetch(`${API}/api/upload-work`);
    const data = await res.json();
    setWorks(data);
  };

  const filteredWorks = works.filter(w => w.category === activeTab);

  // 🔥 STATS
  const total = works.length;
  const videoCount = works.filter(w => w.category === "video").length;
  const aiCount = works.filter(w => w.category === "ai").length;
  const creativeCount = works.filter(w => w.category === "creative").length;
  const brandingCount = works.filter(w => w.category === "branding").length;

  // 🔥 OPEN POPUP
  const openDeletePopup = (id) => {
    setDeleteId(id);
    setShowPopup(true);
  };

  // 🔥 CONFIRM DELETE
  const confirmDelete = async () => {
    await fetch(`${API}/api/upload-work/${deleteId}`, {
      method: "DELETE",
    });
    setShowPopup(false);
    fetchWorks();
  };

  const handleDeleteBefore = async (id) => {
    await fetch(`${API}/api/upload-work/delete-before/${id}`, { method: "DELETE" });
    fetchWorks();
  };

  const handleDeleteAfter = async (id) => {
    await fetch(`${API}/api/upload-work/delete-after/${id}`, { method: "DELETE" });
    fetchWorks();
  };

  // UPLOAD
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);

    if (category === "video") {
      formData.append("before", before);
      formData.append("after", after);
    } else {
      formData.append("file", file);
    }

    try {
      setLoading(true);

      await fetch(`${API}/api/upload-work/upload`, {
        method: "POST",
        body: formData,
      });

      alert("Uploaded ✅");
      setTitle("");
      fetchWorks();
    } catch {
      alert("Upload Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Vidzyra Admin Dashboard ⚡
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Stat title="Total" value={total} />
        <Stat title="Creative" value={creativeCount} />
        <Stat title="Branding" value={brandingCount} />
        <Stat title="AI Video" value={aiCount} />
        <Stat title="Video" value={videoCount} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-4">

          {/* TABS */}
          <div className="flex gap-3 mb-4 flex-wrap">
            {["creative", "branding", "ai", "video"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm capitalize
                  ${activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* DATA */}
          {filteredWorks.length === 0 ? (
            <p className="text-center text-gray-400 py-6">No data</p>
          ) : (
            filteredWorks.map((item) => (

              item.category === "video" ? (

                <div key={item._id} className="flex items-center justify-between border-b py-3">

                  <div className="flex items-center gap-4">

                    {/* BEFORE */}
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-14 bg-gray-100 rounded overflow-hidden">
                        <video src={`${API}/uploads/${item.before}`} className="w-full h-full object-cover"/>
                      </div>
                      <button onClick={() => handleDeleteBefore(item._id)} className="text-blue-600 p-2 rounded-full">🗑️</button>
                    </div>

                    {/* AFTER */}
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-14 bg-gray-100 rounded overflow-hidden">
                        <video src={`${API}/uploads/${item.after}`} className="w-full h-full object-cover"/>
                      </div>
                      <button onClick={() => handleDeleteAfter(item._id)} className="text-blue-600 p-2 rounded-full">🗑️</button>
                    </div>

                    <div>
                      <p className="text-sm font-medium">{item.title || "Video Project"}</p>
                      <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>

                  </div>

                  <button onClick={() => openDeletePopup(item._id)} className="text-red-500">🗑️</button>

                </div>

              ) : (

                <div key={item._id} className="flex items-center justify-between border-b py-3">

                  <div className="flex items-center gap-4">

                    <div className="w-24 h-14 bg-gray-100 rounded overflow-hidden">
                      {item.category === "ai" ? (
                        <video src={`${API}/uploads/${item.file}`} className="w-full h-full object-cover"/>
                      ) : (
                        <img src={`${API}/uploads/${item.file}`} className="w-full h-full object-cover" alt=""/>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium">{item.title || "Untitled"}</p>
                      <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>

                  </div>

                  <button onClick={() => openDeletePopup(item._id)} className="text-red-500">🗑️</button>

                </div>
              )
            ))
          )}

        </div>

        {/* RIGHT */}
        <div className="bg-white p-5 rounded-xl shadow h-fit">

          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            Upload Project
          </h2>

          <input
            type="text"
            placeholder="Enter project title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          >
            <option value="video">Video</option>
            <option value="ai">AI Video</option>
            <option value="creative">Creative</option>
            <option value="branding">Branding</option>
          </select>

          {category === "video" ? (
            <>
              <input type="file" onChange={(e) => setBefore(e.target.files[0])} className="mb-2"/>
              <input type="file" onChange={(e) => setAfter(e.target.files[0])}/>
            </>
          ) : (
            <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
          )}

          <button onClick={handleUpload} className="w-full mt-4 bg-blue-600 text-white py-2 rounded">
            {loading ? "Uploading..." : "Upload"}
          </button>

        </div>

      </div>

      {/* 🔥 POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">

            <h2 className="text-lg font-semibold mb-4">
              Delete this item?
            </h2>

            <div className="flex gap-4 justify-center">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// STAT
function Stat({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-bold text-blue-600">{value}</h2>
    </div>
  );
}

export default AdminPanel;