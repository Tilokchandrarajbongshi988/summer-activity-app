import { useState } from "react";
import CampImage from "./CampImage";

const MAX_IMAGE_SIZE = 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const inputClassName =
  "w-full rounded-lg border-2 border-black bg-white px-4 py-3 text-black outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black";

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
        <label className="mb-2 block text-sm font-medium text-black">
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
        <label className="mb-2 block text-sm font-medium text-black">
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
        <label className="mb-2 block text-sm font-medium text-black">
          Price (Rs.)
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
        <label className="mb-2 block text-sm font-medium text-black">
          Camp Image
        </label>

        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleImageChange}
          disabled={busy}
          className={inputClassName}
        />

        <p className="mt-2 text-sm text-black/70">
          JPG or PNG only. Maximum size: 1 MB.
        </p>

        {imageError && (
          <p className="mt-2 text-sm font-semibold text-black">
            {imageError}
          </p>
        )}

        {form.photo && (
          <div className="mt-4">
            <CampImage
              src={form.photo}
              alt="Camp preview"
              className="h-56 w-full"
              rounded="rounded-xl"
            />

            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={busy}
              className="mt-3 rounded-lg border-2 border-black bg-yellow-300 px-4 py-2 font-medium text-black hover:bg-yellow-200 disabled:opacity-50"
            >
              Remove Image
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-black">
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
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 font-semibold text-white hover:bg-black/80 disabled:opacity-50"
      >
        {submitting ? submittingLabel : submitLabel}
      </button>

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white py-3 font-semibold text-black hover:bg-yellow-200 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Camp"}
        </button>
      )}
    </form>
  );
};

export default CampForm;
