export function WarningStock({ warningStock }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Tồn kho cảnh báo</h3>
      </div>
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
        {warningStock.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0"
          >
            <div>
              <p className="font-bold text-gray-800">{item.foodName}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-500">
                  Còn lại: {item.stock} phần
                </p>

                {/* weight_gram badge */}
                <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                  {item.weight_gram}g / phần
                </span>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                item.status === "critical"
                  ? "bg-red-100 text-red-600"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              {item.status === "critical" ? "Rất thấp" : "Thấp"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
