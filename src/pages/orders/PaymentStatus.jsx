export default function PaymentStatus({ status }) {
  const mapStatus = {
    success: {
      status: "Đã thanh toán",
      style: "bg-green-200 text-primary",
    },
    pending: {
      status: "Đang chờ",
      style: "bg-amber-200 text-red-700",
    },
    failed: {
      status: "Thất bại",
      style: "bg-red-300 text-red-700",
    },
  };
  const displayStatus = mapStatus[status];
  return (
    <div className={`${displayStatus?.style} px-3 py-2 text-sm rounded-md`}>
      {displayStatus?.status}
    </div>
  );
}
