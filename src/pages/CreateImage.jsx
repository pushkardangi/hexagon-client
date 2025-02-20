import { useRef, useState } from "react";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { Error, FormField, Loader, Radio } from "../components";

import { generateImageApi, uploadImageApi } from "../api/image.api.js";

const CreateImage = () => {

  const [form, setForm] = useState({
    prompt: "",
    image: "",
    model: "dall-e-2",
    quality: "basic",
    size: "256x256",
    style: "simple",
  });

  let generatedImage = useRef(null); // store the saved image data

  const [message, setMessage] = useState(null);
  const [generatingImg, setGeneratingImg] = useState(false);
  const [savingImg, setSavingImg] = useState(false);

  // Options dynamically change based on selected model (UI)
  const options = {
    model: ["dall-e-2", "dall-e-3"],
    quality: form.model === "dall-e-2" ? ["basic"] : ["standard", "hd"],
    size: form.model === "dall-e-2"
      ? ["256x256", "512x512", "1024x1024"]
      : ["1024x1024", "1792x1024", "1024x1792"],
    style: form.model === "dall-e-2" ? ["simple"] : ["natural", "vivid"],
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "model") {
      // Reset form when model changes
      setForm({
        ...form,
        model: value,
        quality: value === "dall-e-2" ? "basic" : "standard",
        size: value === "dall-e-2" ? "256x256" : "1024x1024",
        style: value === "dall-e-2" ? "simple" : "natural",
      });
    } else {
      // Normal update for other fields
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    setMessage("");
  };

  // Generate a random prompt
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm((prev) => ({...prev, prompt: randomPrompt}));
    setMessage("");
  };

  const handleGenerateImage = async () => {
    try {
      setMessage("");
      setGeneratingImg(true);
      setForm((prev) => ({...prev, image: "", prompt: prev.prompt.trim()}));

      if (!form.prompt) {
        setMessage("Please enter a prompt.");
        setGeneratingImg(false);
        return;
      }

      const response = await generateImageApi(form);

      if (response?.error) {
        setMessage(response.error);
        setGeneratingImg(false);
        return;
      }

      setForm((prev) => ({...prev, image: response.data }));

      // store image details, use when saving the image
      generatedImage.current = { ...form, image: response.data };

    } catch (error) {
      setMessage(error.message);
      setGeneratingImg(false);
    }
    console.log(message)
  };

  const validateForm = () => {
    let data = generatedImage.current;
    let newMessage = "";
    if (!data.prompt.trim()) newMessage = "Prompt is required";
    if (!data.image.trim()) newMessage = "Image is required";
    setMessage(newMessage);
    return newMessage === "";
  };

  const handleSaveImage = async () => {
    try {
      setSavingImg(true);

      if (!validateForm()) {
        setSavingImg(false);
        return;
      }

      const response = await uploadImageApi(generatedImage.current);

      if (response?.error) {
        setMessage(response.error);
        setSavingImg(false);
        return;
      }

    } catch (error) {
      setMessage(error);
      setSavingImg(false);
    } finally {
      setSavingImg(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px]">
          Bring your ideas to life! Generate stunning AI images with DALL-E and use them instantly.
        </p>
      </div>

      <form className="mt-16 max-w-5xl">
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a white vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="flex md:flex-row flex-col gap-5">
            {/* Display generated image or placeholder */}
            <div className="relative bg-gray-50 border border-gray-300 text-sm rounded-lg p-3 w-64 h-64 flex justify-center items-center">
              <img
                src={form.image || preview}
                alt={form.prompt || "preview image"}
                className="w-full h-full object-contain"
                onLoad={() => setGeneratingImg(false)}
              />

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>

            {/* Image Customization Buttons */}
            <div className={`${(generatingImg || savingImg) && "pointer-events-none"} md:px-4 space-y-3`}>

              <label className="block">
                <span className="font-bold">Model</span>
                <div className="flex flex-wrap gap-2">
                  {options.model.map((value) => (
                    <Radio key={value} name="model" value={value} handleChange={handleChange} selectedValue={form.model} />
                  ))}
                </div>
              </label>

              <label className="block">
                <span className="font-bold">Quality</span>
                <div className="flex flex-wrap gap-2">
                  {options.quality.map((value) => (
                    <Radio key={value} name="quality" value={value} handleChange={handleChange} selectedValue={form.quality} />
                  ))}
                </div>
              </label>

              <label className="block">
                <span className="font-bold">Size</span>
                <div className="flex flex-wrap gap-2">
                  {options.size.map((value) => (
                    <Radio key={value} name="size" value={value} handleChange={handleChange} selectedValue={form.size} />
                  ))}
                </div>
              </label>

              <label className="block">
                <span className="font-bold">Style</span>
                <div className="flex flex-wrap gap-2">
                  {options.style.map((value) => (
                    <Radio key={value} name="style" value={value} handleChange={handleChange} selectedValue={form.style} />
                  ))}
                </div>
              </label>
            </div>

          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-4 items-center">
          {/* Generate Image Button */}
          <button
            type="button"
            onClick={handleGenerateImage}
            disabled={savingImg || generatingImg}
            className="font-medium rounded-md text-sm w-full md:w-48 px-5 py-2.5 text-center text-white bg-yellow-500"
          >
            {generatingImg ? "Generating . . ." : "Generate"}
          </button>

          {/* Save Image Button */}
          <button
            type="button"
            onClick={handleSaveImage}
            disabled={!form.image || generatingImg || savingImg}
            className={`${(!form.image || generatingImg) && "cursor-not-allowed opacity-30"} font-medium rounded-md text-sm w-full md:w-48 px-5 py-2.5 text-center text-white bg-green-700`}
          >
            {savingImg ? "Saving . . ." : "Save to Gallery"}
          </button>

          <Error error={message} />
        </div>
      </form>
    </section>
  );
};

export default CreateImage;
