export function TextArea({ label, placeHolder }) {
  return (
    <>
      <label htmlFor="" className="text-sm font-bold">
        {label}
      </label>
      <textarea
        type="text"
        className="w-full h-full 
                        focus:border-primary 
                          focus:ring-0 
                          focus:outline-none 
                          border border-gray-300 rounded-lg placeholder:text-md placeholder:text-gray-400 text-md py-2 px-3"
        placeholder={placeHolder}
      ></textarea>
    </>
  );
}
