import { useState } from "react";
import CampImage from "./CampImage";

const MAX_IMAGE_SIZE = 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const CampForm = ({
  initialValues = {},
  onSubmit,
  onDelete,
  submitting = false,
  deleting = false,
  submitLabel = "Update",
  submittingLabel = "Updating...",
}) => {
  const [imageError, setImageError] = useState("");
  const [form, setForm] = useState({
    activityName: initialValues.activityName || "",
    price: initialValues.price || "",
    location: initialValues.location || "",
    description: initialValues.description || "",
    photo: initialValues.photo || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageError("");

    if (!file) {
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setImageError("Please upload only JPG or PNG images.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("Image must be 1 MB or smaller.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((currentForm) => ({
        ...currentForm,
        photo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setForm((currentForm) => ({
      ...currentForm,
      photo: "",
    }));
    setImageError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const busy = submitting || deleting;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Activity Name
        </label>
        <input
          name="activityName"
          value={form.activityName}
          onChange={handleChange}
          placeholder="Football Camp"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Location
        </label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Delhi"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Price (₹)
        </label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="5000"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Camp Image
        </label>

        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleImageChange}
          disabled={busy}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="mt-2 text-sm text-gray-500">
          JPG or PNG only. Maximum size: 1 MB.
        </p>

        {imageError && (
          <p className="mt-2 text-sm text-red-600">{imageError}</p>
        )}

        {form.photo && (
          <div className="mt-4">
            <CampImage
              src={form.photo}
              alt="Camp preview"
              className="h-48 w-full"
              rounded="rounded-xl"
            />

            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={busy}
              className="mt-3 rounded-lg bg-gray-700 px-4 py-2 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
            >
              Remove Image
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          name="description"
          rows={5}
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your camp..."
          className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {submitting ? submittingLabel : submitLabel}
      </button>

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          disabled={busy}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Camp"}
        </button>
      )}
    </form>
  );
};

export default CampForm;
