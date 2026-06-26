import { useState } from "react";
import CampImage from "./CampImage";

const MAX_IMAGE_SIZE = 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const inputClassName =
  "w-full rounded-xl border border-orange-200 bg-white/80 px-4 py-3 text-orange-950 outline-none placeholder:text-orange-300 focus:ring-2 focus:ring-orange-400";

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
        <label className="mb-2 block text-sm font-bold text-orange-950">
          Activity Name
        </label>
        <input
          name="activityName"
          value={form.activityName}
          onChange={handleChange}
          placeholder="Football Camp"
          className={inputClassName}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-orange-950">
          Location
        </label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Delhi"
          className={inputClassName}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-orange-950">
          Price (₹)
        </label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="5000"
          className={inputClassName}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-orange-950">
          Camp Image
        </label>

        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleImageChange}
          disabled={busy}
          className={inputClassName}
        />

        <p className="mt-2 text-sm text-orange-800">
          JPG or PNG only. Maximum size: 1 MB.
        </p>

        {imageError && (
          <p className="mt-2 text-sm font-semibold text-red-600">
            {imageError}
          </p>
        )}

        {form.photo && (
          <div className="mt-4">
            <CampImage
              src={form.photo}
              alt="Camp preview"
              className="h-56 w-full"
              rounded="rounded-2xl"
            />

            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={busy}
              className="mt-3 rounded-full bg-orange-900 px-5 py-2.5 font-bold text-white hover:bg-orange-950 disabled:opacity-50"
            >
              Remove Image
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-orange-950">
          Description
        </label>
        <textarea
          name="description"
          rows={5}
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your camp..."
          className={`${inputClassName} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-600 py-3 font-bold text-white shadow-lg transition hover:bg-orange-700 disabled:opacity-50"
      >
        {submitting ? submittingLabel : submitLabel}
      </button>

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 py-3 font-bold text-white shadow-lg transition hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Camp"}
        </button>
      )}
    </form>
  );
};

export default CampForm;
