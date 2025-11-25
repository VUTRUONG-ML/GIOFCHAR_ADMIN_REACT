export function Menu({ icon: Icon, title }) {
  return (
    <div className="flex cursor-pointer rounded-2xl hover:bg-primary group transition-colors duration-500">
      <div className=" w-10 h-10 flex items-center justify-center">
        <Icon className="text-gray-500 group-hover:text-white transition-colors duration-500" />
      </div>
      <div className="flex items-center ">
        <p className=" text-md text-gray-700 font-medium group-hover:text-white  transition-colors duration-300">
          {title}
        </p>
      </div>
    </div>
  );
}
