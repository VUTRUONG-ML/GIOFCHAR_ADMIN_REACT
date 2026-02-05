import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useEffect, useState } from "react";

const datetimeToDate = (v) => (v ? v.split(" ")[0] : "");

export default function PromotionModal({
  open,
  mode = "edit", // edit | duplicate | create
  initialData = {},
  onClose,
  onSubmit,
}) {
  const isEdit = mode === "edit";
  const isDuplicate = mode === "duplicate";
  const isCreate = mode === "create";

  const [formData, setFormData] = useState({
    name: "",
    type: "PERCENT",
    value: "",
    start_at: "",
    end_at: "",
    isActive: false,
  });

  // init / refill khi mở modal hoặc đổi mode
  useEffect(() => {
    if (!open) return;

    setFormData({
      name: initialData.name
        ? isEdit
          ? initialData.name
          : `${initialData.name} (Copy)`
        : "",
      type: initialData.type ?? "PERCENT",
      value: initialData.value ?? "",
      start_at: isEdit ? datetimeToDate(initialData.start_at) : "",
      end_at: isEdit ? datetimeToDate(initialData.end_at) : "",
      isActive: isEdit ? !!initialData.isActive : false,
    });
  }, [open, isEdit, initialData]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      start_at: `${formData.start_at} 00:00:00`,
      end_at: `${formData.end_at} 23:59:59`,
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="animate-zoomIn bg-white rounded-2xl shadow-xl w-[560px] p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <CloseOutlinedIcon />
        </button>

        {/* Header */}
        <div className="mb-5">
          <h2 className="text-xl font-bold">
            {isEdit ? "Chỉnh sửa đợt giảm giá" : "Tạo đợt giảm giá mới"}
          </h2>
          <p className="text-sm text-gray-500">
            {isEdit
              ? "Chỉnh sửa chương trình giảm giá trước khi hoạt động"
              : "Tạo một chương trình giảm giá mới dựa vào thông tin cũ"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tên giảm giá
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ví dụ: Khai trương, Giảm tết, ..."
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Type & Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Loại</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="PERCENT">Giảm theo phần trăm (%)</option>
                <option value="FIXED">Giảm theo giá tiền</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Giảm</label>
              <input
                name="value"
                type="number"
                value={formData.value}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Ngày bắt đầu
              </label>
              <input
                name="start_at"
                type="date"
                value={formData.start_at}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Đến hết ngày
              </label>
              <input
                name="end_at"
                type="date"
                value={formData.end_at}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 pt-2">
            <label className="text-sm font-medium">Trạng thái</label>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              disabled={isDuplicate}
              className="w-11 h-6 accent-primary"
              onChange={handleChange}
            />
            <span className="text-sm text-primary">
              {formData.isActive ? "Hoạt động" : "Ngừng hoạt động"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-md"
            >
              {isEdit ? "Lưu thay đổi" : "Tạo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
