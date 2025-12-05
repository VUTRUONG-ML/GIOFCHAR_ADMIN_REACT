import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import categoriesApi from "../../api/categoriesApi";
import { toast } from "react-toastify";
import { useState } from "react";
import { ModelCategory } from "./ModalCategory";
import { useConfirm } from "../../contexts/ConfirmContext";
import { useLoader } from "../../contexts/LoaderContext";
export function CategoryCard({
  category,
  categories,
  setCategories,
  setQuantityCategory,
}) {
  const { confirm } = useConfirm();
  const { setLoading } = useLoader();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const handleDelete = async (categoryId) => {
    const ok = await confirm({
      title: "Xác nhận xóa danh mục!",
      message: "Bạn có chắc chắn muốn xóa danh mục này?",
    });
    if (!ok) return;
    if (category.quantityFood) {
      toast.warning("Sản phẩm trong danh mục vẫn còn!");
      return;
    }
    setLoading(true);
    try {
      await categoriesApi.deleteCategory(category.categoryID);
      setCategories(
        categories.filter((category) => category.categoryID !== categoryId)
      );
      setQuantityCategory((prev) => prev + 1);
      toast.success("Xóa danh mục thành công");
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
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
          <button
            className=" active:scale-95"
            onClick={() => setOpenUpdateModal(true)}
          >
            <EditOutlinedIcon className="text-blue-800 cursor-pointer" />
          </button>
          <button
            className="cursor-pointer active:scale-95"
            onClick={() => handleDelete(category.categoryID)}
          >
            <DeleteForeverOutlinedIcon className="text-red-800 " />
          </button>
        </div>
      </div>

      {openUpdateModal && (
        <ModelCategory
          nameBtnSubmit={"Cập nhật"}
          onClose={() => setOpenUpdateModal(false)}
        />
      )}
    </>
  );
}
