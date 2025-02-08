import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader, Radio } from "../components";

import { generateImageApi } from "../api/image.api.js";

const CreateImage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    prompt: "",
    image: "",
    model: "dall-e-2",
    quality: "basic",
    size: "256x256",
    style: "simple",
  });

  const options = {
    model: ["dall-e-2", "dall-e-3"],
    quality: form.model === "dall-e-2" ? ["basic"] : ["standard", "hd"],
    size: form.model === "dall-e-2"
      ? ["256x256", "512x512", "1024x1024"]
      : ["256x256", "512x512", "1024x1024", "landscape", "portrait"],
    style: form.model === "dall-e-2" ? ["simple"] : ["natural", "vivid"],
  };

  const [generatingImg, setGeneratingImg] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "model") {
      // Reset form when model changes
      setForm({
        ...form,
        model: value,
        quality: value === "dall-e-2" ? "basic" : "standard",
        size: value === "dall-e-2" ? "256x256" : "256x256",
        style: value === "dall-e-2" ? "simple" : "natural",
      });
    } else {
      // Normal update for other fields
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSurpriseMe = (e) => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleSubmit = () => {};

  const generateImage = async (e) => {
    // resume later
    setGeneratingImg(true);
    const result = await generateImageApi(form);
    console.log("Result:", result)
    setGeneratingImg(false);
  };

  const saveGeneratedImage = () => {};

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px]">
          Bring your ideas to life! Generate stunning AI images with DALL-E and use them instantly.
        </p>
      </div>

      <form className="mt-16 max-w-5xl" onSubmit={handleSubmit}>
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
            {/* Image Preview */}
            <div className="relative bg-gray-50 border border-gray-300 text-sm rounded-lg p-3 w-64 h-64 flex justify-center items-center">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>

            {/* Image Customization Buttons */}
            <div className="md:px-4 space-y-3">

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

        <div className="mt-5 flex gap-4">
          {/* Generate Image Button */}
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-yellow-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>

          {/* Save Image Button */}
          {form.image && (
            <button
              type="submit"
              onClick={saveGeneratedImage}
              className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {saving ? "Saving..." : "Save to Gallery"}
            </button>
          )}
        </div>

      </form>
    </section>
  );
};

export default CreateImage;
