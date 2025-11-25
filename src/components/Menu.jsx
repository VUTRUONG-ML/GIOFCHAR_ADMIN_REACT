import { NavLink } from "react-router";

export function Menu({ icon: Icon, title, to }) {
  const baseStyle =
    " flex items-center cursor-pointer rounded-2xl h-12 hover:bg-gray-300 hover:text-black group transition-colors duration-200 ";
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? baseStyle + "bg-primary text-white" : baseStyle
      }
      end
    >
      <div className=" w-10 h-10 flex items-center justify-center">
        <Icon className="transition-colors" />
      </div>
      <div className="flex items-center ">
        <p className="text-md font-medium transition-colors  ">{title}</p>
      </div>
    </NavLink>
  );
}
