import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { getSavedImagesApi } from "../api/image.api";
import { Download, PlusCircle } from "lucide-react";

// import { allImages } from "../constants/assets"; // temp

const getThumbnailUrl = (url) => {
  if (!url) return "";
  return url.replace("/upload/", "/upload/w_200,h_200,c_fill/");
};

const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  return isTouch;
};

const Gallery = () => {
  const [loading, setLoading] = useState(true); // false
  const [images, setImages] = useState([]); // allImages

  const [pagination, setPagination] = useState({
    hasMoreImages: true,
    page: 1,
  });

  const isTouchDevice = useIsTouchDevice();
  const [downloadProgress, setDownloadProgress] = useState(0);  // add this to toast message
  
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

  const handleDownloadImageOffline = async ({ image, prompt }) => {
    try {
      const response = await axios.get(image, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setDownloadProgress(percentCompleted);
        },
      });

      saveAs(response.data, `Hexagon - ${prompt}.png`);
    } catch (error) {
      console.alert("Error downloading the image:", error, "\nPlease try again.");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="font-extrabold text-[#222328] text-[32px] mb-10">
        Your Gallery
      </h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 grid-cols-1 gap-3">
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

                {isTouchDevice ? (
                  <div onClick={() => handleDownloadImageOffline(img)} className="absolute bottom-0 right-0 bg-white m-2 p-2 rounded-md">
                    <Download className="w-7 h-7" />
                  </div>
                ) : (
                  <div className="absolute bottom-0 inset-x-0 rounded-md m-2 p-2 bg-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col">
                    <div>{img?.prompt}</div>

                    <div className="flex justify-end mt-2">
                      <Download onClick={() => handleDownloadImageOffline(img)} className="w-6 h-6 animate-bounce" />
                    </div>
                  </div>
                )}

              </div>
            ))}
      </div>

      <div className={`mt-10 flex justify-center ${images.length ? "md:justify-end" : ""}`}>
      {pagination.hasMoreImages ? (
          <button
            className="px-4 py-2 font-inter text-white rounded-md bg-custom-blue-3 hover:bg-custom-blue-4 shadow-lg shadow-slate-300 flex gap-2 transition duration-300"
            onClick={loadMoreImages}
          >
            <PlusCircle className="animate-pulse" /> Load more
          </button>
        ) : (
          <p className="text-gray-500 my-4 font-inter">
            {images.length ? "🎉 You've reached the end!" : "Looks like your gallery is empty! Start uploading images to see them here. 🚀"}
          </p>
        )}
      </div>

    </section>
  );
};

export default Gallery;
