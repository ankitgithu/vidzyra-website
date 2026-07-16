import React from "react";
import { Link } from "react-router-dom";

function WorkGallery() {
  const works = [
    {
      id: 1,
      title: "Project 1",
      embed: "https://www.youtube.com/embed/CbHKfmsAh50",
    },
    {
      id: 2,
      title: "Project 2",
      embed: "https://www.youtube.com/embed/dSmH3bRwxR8",
    },
    {
      id: 3,
      title: "Project 3",
      embed: "https://www.youtube.com/embed/vNy1VMZdP9I",
    },
    {
      id: 4,
      title: "Project 4",
      embed: "https://www.youtube.com/embed/_LRCoihKTBA",
    },
    {
      id: 5,
      title: "Project 5",
      embed: "https://www.youtube.com/embed/LqFCZ5nw1qk",
    },
    {
      id: 6,
      title: "Project 6",
      embed: "https://www.youtube.com/embed/ORpVEL1QYko",
    },
    {
      id: 7,
      title: "Project 7",
      embed: "https://www.youtube.com/embed/CRFdOD19QQ4",
    },
    {
      id: 8,
      title: "Project 8",
      embed: "https://www.youtube.com/embed/dJr6TQEVU7A",
    },
    {
      id: 9,
      title: "Project 9",
      embed: "https://www.youtube.com/embed/bXAVVwtHmYc",
    },
    {
      id: 10,
      title: "Project 10",
      embed: "https://www.youtube.com/embed/7V8zJaTxpYw",
    },
    {
      id: 11,
      title: "Project 11",
      embed: "https://www.youtube.com/embed/wUjjHoXg_Pk",
    },
    {
      id: 12,
      title: "Project 12",
      embed: "https://www.youtube.com/embed/jpIC3TVNP2g",
    },
    {
      id: 13,
      title: "Project 13",
      embed: "https://www.youtube.com/embed/oF-l8EbSGTY",
    },
    {
      id: 14,
      title: "Project 14",
      embed: "https://www.youtube.com/embed/AnFkvO7Ez6A",
    },
    {
      id: 15,
      title: "Project 15",
      embed: "https://www.youtube.com/embed/nus2LzMPnLA",
    },
     {
  id: 16,
  title: "Project 16",
  embed: "https://www.youtube.com/embed/jcN9fuSSbzI",
},
{
  id: 17,
  title: "Project 17",
  embed: "https://www.youtube.com/embed/2ACAl-BtSqQ",
},

  ];

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <Link to="/">
          <button className="mb-8 border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-black transition">
            ← Back to Home
          </button>
        </Link>

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">Our Works</h1>
          <p className="text-gray-400 mt-3">
            Explore Our Video Editing Portfolio
          </p>
        </div>

        {/* Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {works.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  {item.title}
                </h3>

                <div className="mx-auto max-w-[340px]">
                  <iframe
                    src={item.embed}
                    title={item.title}
                    className="w-full h-[600px] rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default WorkGallery;