import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
export function OrderStatus({ status }) {
  const mapStatus = {
    delivered: {
      status: "Đã giao",
      style: "status-delivered",
      icon: <DoneOutlinedIcon />,
    },
    delivering: {
      status: "Đang giao",
      style: "status-delivering",
      icon: <DeliveryDiningOutlinedIcon />,
    },
    unconfirmed: {
      status: "Chờ xác nhận",
      style: "status-unconfirmed",
      icon: <MoreHorizOutlinedIcon />,
    },
    cancelled: {
      status: "Đã hủy",
      style: "status-cancelled",
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
