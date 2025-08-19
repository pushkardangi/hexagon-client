import { useState } from "react";
import { Breadcrumbs, Button, InputField, SelectField, TextAreaField } from "../../components";
import { submitFeatureRequest } from "../../api";
import toast from "react-hot-toast";

const RequestFeature = () => {
  const [loading, setLoading] = useState(false);

  const initialFormData = {
    title: "",
    priority: "low",
    description: "",
    useCase: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim values first
    const trimmedData = {
      title: formData.title.trim(),
      priority: formData.priority.trim(),
      description: formData.description.trim(),
      useCase: formData.useCase.trim(),
    };

    // Validation after trimming
    if (!trimmedData.title) {
      toast.error("Feature title is required");
      return;
    }
    if (!trimmedData.description) {
      toast.error("Feature description is required");
      return;
    }
    if (!trimmedData.useCase) {
      toast.error("Use case is required");
      return;
    }

    setLoading(true);
    try {
      const response = await submitFeatureRequest(trimmedData);

      if (response?.statusCode === 201) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message || "Failed to submit feature request");
      }

      setFormData({
        title: "",
        priority: "low",
        description: "",
        useCase: "",
      });
    } catch (error) {
      console.error("Error submitting feature request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setFormData(initialFormData);
    e.currentTarget.blur();
  };

  return (
    <main className="flex-1 p-2 md:px-5 pb-10 max-w-5xl space-y-8">
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Feature Request" }]} />

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Request a Feature</h1>
        <p className="text-gray-600">Help us improve Hexagon! Suggest a feature and share why it matters to you.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Feature title */}
        <InputField
          label="Feature Title"
          type="text"
          name="title"
          placeholder="e.g. Bulk image generation"
          value={formData.title}
          handleChange={handleChange}
          required
        />

        {/* Priority */}
        <SelectField
          label="Priority"
          value={formData.priority}
          onChange={(val) => setFormData({ ...formData, priority: val })}
          options={[
            { value: "low", label: "Low  (default)" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
          placeholder="Select Priority"
        />

        {/* Feature description */}
        <TextAreaField
          label="Feature Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Explain the feature in detail"
          required
          className="h-28"
          labelClassName="block text-sm font-medium mb-1"
        />

        {/* Use case */}
        <TextAreaField
          label="Use Case"
          name="useCase"
          value={formData.useCase}
          onChange={handleChange}
          placeholder="How would you or others use this feature?"
          required
          className="rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          labelClassName="block text-sm font-medium mb-1"
        />

        {/* Submit + Cancel */}
        <div className="flex gap-4 justify-end">
          <Button type="button" onClick={handleReset} variant="outline" disabled={loading}>
            Reset
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting Feature Request" : "Submit Feature Request"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default RequestFeature;
