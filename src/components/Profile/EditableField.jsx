import { Pencil } from "lucide-react";

const EditableField = ({ label, value, fieldName, editingField, setEditingField, formData, setFormData, onSave }) => {
  const isEditing = editingField === fieldName;

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        {isEditing ? (
          <input
            type="text"
            value={formData[fieldName]}
            onChange={(e) => setFormData({ ...formData, [fieldName]: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        ) : (
          <p className="text-gray-800">{value}</p>
        )}
      </div>
      {isEditing ? (
        <button onClick={() => onSave(fieldName)} className="text-blue-600 text-sm hover:underline">
          Save
        </button>
      ) : (
        <button onClick={() => setEditingField(fieldName)}>
          <Pencil className="w-4 h-4 text-gray-500" />
        </button>
      )}
    </div>
  );
};

export default EditableField;
