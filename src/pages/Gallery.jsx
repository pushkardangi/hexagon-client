import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { getSavedImagesApi } from "../api/image.api";
import { Download, PlusCircle, PartyPopper, Rocket, CircleAlert, RotateCcw } from "lucide-react";

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
    page: 1,
    hasMoreImages: true,
    totalImages: 0,
  });

  const isTouchDevice = useIsTouchDevice();
  const [downloadProgress, setDownloadProgress] = useState(0); // add this to toast message

  const fetchGalleryImages = async () => {
    try {
      const response = await getSavedImagesApi(pagination.page);

      console.log(response); // log

      const {
        images = [],
        hasMoreImages = false,
        totalImages = 0,
      } = response?.data || {};

      if (!Array.isArray(images)) {
        throw new Error("Invalid image data received from server.");
      }

      setPagination((prev) => ({
        ...prev,
        hasMoreImages,
        totalImages,
      }));

      setImages((prev) => [...prev, ...images]);
    } catch (error) {
      console.error("Error fetching images:", error?.message || error); // log
      // also update error message here (context)
      setPagination({
        page: -1,
        hasMoreImages: false,
        totalImages: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = () => {
    setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
  };

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
      <h1 className="font-extrabold text-black text-3xl mb-10">Your Gallery</h1>

      {/* Images Grid */}
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
                  <div
                    onClick={() => handleDownloadImageOffline(img)}
                    className="absolute bottom-0 right-0 bg-white m-2 p-2 rounded-md"
                  >
                    <Download className="w-7 h-7" />
                  </div>
                ) : (
                  <div className="absolute bottom-0 inset-x-0 rounded-md m-2 p-2 bg-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col">
                    <div>{img?.prompt}</div>

                    <div className="flex justify-end mt-2">
                      <Download
                        onClick={() => handleDownloadImageOffline(img)}
                        className="w-6 h-6 animate-bounce"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
      </div>

      {/* show 'load more' button, or end message, or empty gallery message */}
      <div className={`flex justify-center select-none ${ loading || pagination.totalImages ? "md:justify-end" : ""}`}>
        {pagination.hasMoreImages ? (
          <button
            className="mt-10 px-4 py-2 font-inter text-white rounded-md bg-custom-blue-3 hover:bg-custom-blue-4 shadow-lg shadow-slate-300 flex gap-2 transition duration-300"
            onClick={loadMoreImages}
          >
            <PlusCircle className="animate-pulse" /> Load more
          </button>
        ) : (
          <div className="my-4 font-inter flex items-center justify-center gap-3 font-medium text-gray-500">
            {pagination.totalImages ? (
              <>
                <PartyPopper className="w-6 h-6 shrink-0" />
                <span>You've reached the end!</span>
              </>
            ) : pagination.page === -1 ? (
              <div className="text-red-500 flex sm:flex-row flex-col items-center justify-center gap-3">
                <CircleAlert className="w-6 h-6 shrink-0 hidden sm:block" />
                <div>Please check your internet connection or try again later.</div>
                <button
                  onClick={() => {
                    setLoading(true);
                    setPagination({ page: 1, hasMoreImages: true, totalImages: 0 });
                  }}
                  className="ml-2 mt-10 sm:mt-0 flex items-center gap-3 text-blue-600 underline hover:text-blue-800"
                >
                  Retry <RotateCcw className="w-4 h-4 mt-1 shrink-0"/>
                </button>
              </div>
            ) : (
              <>
                <span>Looks like your gallery is empty! Start uploading images to see them here</span>
                <Rocket className="w-6 h-6 shrink-0 text-gray-600 hidden sm:block" />
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
