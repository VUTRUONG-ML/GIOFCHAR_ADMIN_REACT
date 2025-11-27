export function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  ...props
}) {
  return (
    <div className=" border-solid border-b border-gray-300 mb-4 relative">
      <input
        type={type}
        label={label}
        placeholder=""
        value={value}
        {...props}
        className=" w-full pt-4 pb-2 text-lg 
         placeholder:text-[14px]
         focus:outline-none
         peer
        "
      />
      <label
        className="
         absolute left-0
         peer-placeholder-shown:top-5 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-gray-500
         peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-primary
         peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:text-primary
         transition-all duration-200 ease-in-out
         "
      >
        {placeholder}
      </label>
    </div>
  );
}
