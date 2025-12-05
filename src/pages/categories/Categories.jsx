import { useEffect, useState } from "react";
import { SubTitle } from "../../components/SubTitle";
import { CategoryCard } from "./CategoryCard";
import categoriesApi from "../../api/categoriesApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ModelCategory } from "./ModalCategory";
import { useLoader } from "../../contexts/LoaderContext";
import { toast } from "react-toastify";
export default function Categories() {
  const { setLoading } = useLoader();

  const [categories, setCategories] = useState([]);
  const [quantityCategory, setQuantityCategory] = useState(0);
  const [loadingPage, setLoadingPage] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const loadCategories = async () => {
      setLoadingPage(true);
      try {
        const response = await categoriesApi.getCategories(controller.signal);
        setCategories(response.data?.categories);
        setQuantityCategory(response.data?.quantity);
      } catch (error) {
        if (error.name === "CanceledError") return;
      } finally {
        if (!controller.signal.aborted) setLoadingPage(false);
      }
    };
    loadCategories();

    return () => controller.abort();
  }, []);

  const handleCreateCategory = async (categoryName, categoryDescription) => {
    setLoading(true);
    try {
      const response = await categoriesApi.createCategory({
        categoryName,
        categoryDescription,
      });
      const newCategory = response.data?.categoryId;
      setCategories((prev) => [
        ...prev,
        {
          categoryID: newCategory,
          categoryName,
          categoryDescription,
          quantityFood: 0,
        },
      ]);

      setQuantityCategory((prev) => prev + 1);
      setOpenAddModal(false);
      toast.success("Tạo danh mục mới thành công!");
    } catch (error) {
      if (error.response?.status == 409) {
        toast.warn("Tên danh mục đã tồn tại!");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingPage) return <LoadingSpinner />;

  return (
    <>
      {quantityCategory === 0 ? (
        <div>Danh sách danh mục rỗng</div>
      ) : (
        <>
          {/*subTitle */}
          <SubTitle
            active
            nameActive="danh mục"
            handleMove={() => setOpenAddModal(true)}
            title="Quản lý danh mục"
            miniTitle={`Tổng: ${quantityCategory} danh mục`}
          />
          {/* data */}
          <div className="flex-1 grid grid-cols-3 gap-4  py-1 px-4 overflow-y-auto max-h-[calc(100vh-180px)]">
            {categories.map((category) => {
              return (
                <CategoryCard
                  key={category.categoryID}
                  category={category}
                  setCategories={setCategories}
                  categories={categories}
                  setQuantityCategory={setQuantityCategory}
                />
              );
            })}
          </div>
        </>
      )}
      {openAddModal && (
        <ModelCategory
          onClose={() => setOpenAddModal(false)}
          nameBtnSubmit={"Tạo"}
          onSubmit={handleCreateCategory}
        />
      )}
    </>
  );
}
