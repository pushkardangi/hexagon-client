import { useState } from "react";
import { Breadcrumbs, Button, InputField, SelectField, TextAreaField } from "../../components";

const RequestFeature = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    useCase: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feature request submitted:", formData);
    // TODO: send to backend
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
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium (default)" },
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

        {/* Submit */}
        <Button type="submit">Submit Feature Request</Button>
      </form>
    </main>
  );
};

export default RequestFeature;
