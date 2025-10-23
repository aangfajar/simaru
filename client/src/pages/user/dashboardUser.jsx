const dashboardUser = () => {
  const username = localStorage.getItem("username") || "User";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white">
      <h1 className="text-5xl font-bold mb-6">Selamat Datang, {username} 👋</h1>
      <p className="text-gray-400 text-lg mb-8">Ini halaman Dashboard kamu.</p>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          window.location.href = "/";
        }}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default dashboardUser;
