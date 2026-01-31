import { createContext, useContext, useState } from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [options, setOptions] = useState(null);
  // option lưu thông tin nội dung của dialog (title, mesage ....) và cả trạng thái resolve

  // Khởi tạo một object option có các thuộc tính là title, message thêm trạng thái resolve chờ người dùng chọn onConfirm hay onCancel
  const confirm = (opts) => {
    return new Promise((resolve) => {
      setOptions({
        ...opts,
        resolve,
      });
    });
  };

  // hàm này truyền vào ConfirmDialog khi người dùng nhấn ok hay xác nhận thì resolve của options sẽ trả về true, từ đó lấy kết quả này để thực hiện hành động nào sau đó
  const onConfirm = () => {
    options.resolve(true);
    setOptions(null); // xóa toàn bộ title, message trong option
  };

  const onCancel = () => {
    options.resolve(false);
    setOptions(null);
  };

  // Khi mà resolve của promise trả về true | false thì nó sẽ ngắt promise
  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {options && (
        <ConfirmDialog
          title={options.title}
          message={options.message}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}
