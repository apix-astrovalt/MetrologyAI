import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
    {
      name: "Scan Product",
      path: "/scan",
      icon: "🔍",
    },
    {
      name: "History",
      path: "/history",
      icon: "🕒",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-950 border-r border-slate-800 p-5 flex flex-col">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl">
          ⚖️
        </div>

        <div>
          <h1 className="text-white font-bold">
            MetrologyAI
          </h1>

          <p className="text-xs text-slate-500">
            Compliance Checker
          </p>
        </div>
      </Link>

      {/* Menu */}
      <div className="space-y-2">

        <p className="text-xs uppercase tracking-wider text-slate-600 px-3 mb-3">
          Menu
        </p>

        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}

      </div>

      {/* Bottom */}
      <div className="mt-auto">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xl mb-2">
            🤖
          </div>

          <h3 className="text-sm font-semibold text-white">
            AI Compliance
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            Analyze product packages with AI.
          </p>
        </div>

        <Link
          to="/"
          className="flex items-center gap-3 text-slate-500 hover:text-white mt-5 px-3 py-2 transition"
        >
          ← Back to Home
        </Link>

      </div>

    </aside>
  );
}

export default Sidebar;