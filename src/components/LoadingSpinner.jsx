export default function LoadingSpinner() {
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-full">
      Vui lòng đợi trong giây lát
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
