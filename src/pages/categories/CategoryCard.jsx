import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
export function CategoryCard({ category }) {
  return (
    <div className="bg-white shadow rounded-xl flex justify-between p-4 h-50">
      <div className="flex flex-col justify-around">
        <div className="bg-primary text-white rounded-lg h-15 w-15 flex justify-center items-center">
          <FolderCopyOutlinedIcon />
        </div>
        <div className="text-xl font-extrabold">{category?.categoryName}</div>
        <div className="text-sm font-extrabold">
          {category?.categoryDescription}
        </div>
        <div className="text-sm text-secondary font-medium">
          {category?.quantityFood} sản phẩm
        </div>
      </div>
      <div className="flex items-start gap-3 pt-3">
        <button className=" active:scale-95">
          <EditOutlinedIcon className="text-blue-800 cursor-pointer" />
        </button>
        <button className=" active:scale-95">
          <DeleteForeverOutlinedIcon className="text-red-800 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
