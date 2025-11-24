export const colors = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  accent: "bg-accent text-white",
  neutral: "bg-neutral text-gray-800",
};

export const spacing = {
  small: "p-2",
  medium: "p-4",
  large: "p-6",
};

// Khi muốn dùng lại
// import { colors, spacing } from "../utils/theme";

// export default function Button({ children, variant = "primary" }) {
//   return (
//     <button className={`${colors[variant]} ${spacing.medium} rounded-xl font-bold`}>
//       {children}
//     </button>
//   );
// }
