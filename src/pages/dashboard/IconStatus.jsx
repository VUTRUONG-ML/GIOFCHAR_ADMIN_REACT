import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

export function CartIcon() {
  return (
    <div className="bg-primary text-white px-2 py-4 flex items-center justify-center rounded-2xl">
      <ShoppingCartOutlinedIcon />
    </div>
  );
}

export function MoneyIcon() {
  return (
    <div className="bg-secondary-orange text-white px-2 py-4 flex items-center justify-center rounded-2xl">
      <AttachMoneyOutlinedIcon />
    </div>
  );
}

export function PeopleIcon() {
  return (
    <div className="bg-secondary-yellow text-white px-2 py-4 flex items-center justify-center rounded-2xl">
      <PeopleAltOutlinedIcon />
    </div>
  );
}

export function TrendingUpIcon() {
  return (
    <div className="bg-blue-400 text-white px-2 py-4 flex items-center justify-center rounded-2xl">
      <TrendingUpOutlinedIcon />
    </div>
  );
}
