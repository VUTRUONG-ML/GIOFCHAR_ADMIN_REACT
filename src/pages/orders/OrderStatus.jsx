import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
export function OrderStatus({ status }) {
  const mapStatus = {
    delivered: {
      status: "Đã giao",
      style: "bg-green-200 text-primary",
      icon: <DoneOutlinedIcon />,
    },
    delivering: {
      status: "Đang giao",
      style: "bg-gray-200 text-gray-700",
      icon: <DeliveryDiningOutlinedIcon />,
    },
    unconfirmed: {
      status: "Chờ xác nhận",
      style: "bg-amber-200 text-red-700",
      icon: <MoreHorizOutlinedIcon />,
    },
    cancelled: {
      status: "Đã hủy",
      style: "bg-red-300 text-red-700",
      icon: <ClearOutlinedIcon />,
    },
  };
  const displayStatus = mapStatus[status];
  return (
    <div
      className={`flex ${displayStatus.style}  justify-start items-center gap-1  py-1 px-2 rounded-2xl text-[12px] w-30`}
    >
      {displayStatus.icon}
      <p>{displayStatus.status}</p>
    </div>
  );
}
