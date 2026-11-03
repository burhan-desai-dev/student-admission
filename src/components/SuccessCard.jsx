// Form sahi submit hone ke baad ye card dikhta hai.
// application -> form ka data + id
// onReset     -> naya form shuru karne ka function (parent ka)
function SuccessCard({ application, onReset }) {
  // Table ki rows ek array mein. Har row: [label, value]
  const rows = [
    ["Full Name", application.fullName],
    ["Email", application.email],
    ["Phone", application.phone],
    ["Age", application.age],
    ["Course", application.course],
    ["Gender", application.gender],
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 text-center">
      <p className="text-6xl mb-3">🎉</p>
      <h2 className="text-2xl font-bold text-gray-800">
        Application Submitted!
      </h2>
      <p className="text-gray-500 mt-1">
        Thank you, {application.fullName}. We will contact you soon.
      </p>

      {/* Application ID ka badge */}
      <div className="inline-block mt-4 bg-sky-100 text-sky-700 font-semibold px-4 py-1 rounded-full text-sm">
        Application ID: {application.id}
      </div>

      {/* Summary: array destructuring ([label, value]) se har row ke do hisse nikalte hain */}
      <div className="mt-6 text-left divide-y divide-gray-100 border border-gray-100 rounded-xl">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between px-4 py-2 text-sm">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-800">{value}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
      >
        Submit another application
      </button>
    </div>
  );
}

export default SuccessCard;
