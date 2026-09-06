function ComplianceCard({ name, value, status, description }) {
  const isPassed = status === "pass";

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
      <div className="flex items-start justify-between gap-4">

        {/* Left side */}
        <div className="flex items-start gap-4">

          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
              isPassed
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {isPassed ? "✓" : "✕"}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {name}
            </h3>

            {value && (
              <p className="text-slate-300 mt-1">
                {value}
              </p>
            )}

            {description && (
              <p className="text-sm text-slate-500 mt-2">
                {description}
              </p>
            )}
          </div>

        </div>

        {/* Status */}
        <span
          className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold ${
            isPassed
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {isPassed ? "PASS" : "ISSUE"}
        </span>

      </div>
    </div>
  );
}

export default ComplianceCard;