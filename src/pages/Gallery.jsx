import React, { useState, useEffect } from "react";
import { getSavedImagesApi } from "../api/image.api";
import { MdDownloading, MdOutlineExpandMore } from "react-icons/md";

const getThumbnailUrl = (url) => {
  if (!url) return "";
  return url.replace("/upload/", "/upload/w_200,h_200,c_fill/");
};

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  const [pagination, setPagination] = useState({
    hasMoreImages: true,
    page: 1,
  });
  
  const fetchGalleryImages = async () => {
    try {
      const response = await getSavedImagesApi(pagination.page);

      console.log(response); // log

      setPagination((prev) => ({ ...prev, hasMoreImages: response.data.hasMoreImages }));
      setImages((prev) => [...prev, ...response.data.images]);

    } catch (error) {
      console.log("Error fetching images:", error.message); // log
    } finally {
      setLoading(false);
    }
  }

  const loadMoreImages = () => {
    setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
  }

  useEffect(() => {
    if (!pagination.hasMoreImages) return;
    fetchGalleryImages();
  }, [pagination.page]);

  const handleDownloadImageOffline = async () => {
    console.log("Image downloaded successfully.", Math.random()); // log
  }

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="font-extrabold text-[#222328] text-[32px] mb-10">
        Your Gallery
      </h1>

      <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-300 rounded-lg aspect-square w-full h-full"
              ></div>
            ))
          : images.map((img, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg bg-gray-200 group"
              >
                <img
                  src={getThumbnailUrl(img?.image)}
                  alt={img.prompt}
                  className={`w-full h-full object-cover aspect-square`}
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 rounded-md m-2 p-2 bg-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col">
                  <div>{img?.prompt}</div>

                  <div className="flex justify-end mt-1">
                    <MdDownloading onClick={handleDownloadImageOffline} className="hover:scale-110 transition duration-300" size={36}/>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="mt-10 flex justify-center md:justify-end">
      {pagination.hasMoreImages ? (
          <button
            className={`px-4 pt-2 pb-0.5 font-inter text-white rounded-md  bg-custom-blue-3 hover:bg-custom-blue-4 flex gap-2`}
            onClick={loadMoreImages}
          >
            <MdOutlineExpandMore className="animate-bounce mt-1" size={26} /> Load more
          </button>
        ) : (
          <p className="text-gray-500 text-center my-4">
            🎉 You've reached the end!
          </p>
        )}
      </div>

    </section>
  );
};

export default Gallery;
