export function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100">
      <div className="bg-white w-[30%] py-4 px-8 rounded-xl flex flex-col gap-2 animate-zoomIn">
        <p className="text-2xl font-extrabold text-black">{title}</p>
        <p className="text-md font-medium text-primary">{message}</p>
        <div className="w-full flex items-center gap-1">
          <button
            className="flex-1 bg-primary text-white text-md rounded-lg border-none cursor-pointer active:scale-95 py-2 px-3"
            onClick={onConfirm}
          >
            Xác nhận
          </button>
          <button
            className="flex-1 bg-gray-300 text-secondary text-md rounded-lg border-none cursor-pointer active:scale-95 py-2 px-3"
            onClick={onCancel}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
