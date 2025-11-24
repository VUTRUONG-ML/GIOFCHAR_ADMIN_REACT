export default function AdminDraft() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-amber-300 shadow-lg p-4">{/* ...menu... */}</div>

      {/* Main layout */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-white shadow p-4 flex items-center justify-between">
          {/* ...profile / title... */}
        </div>

        {/* Content */}
        <div className="p-6">{/* ...dashboard / page content... */}</div>
      </div>
    </div>
  );
}
