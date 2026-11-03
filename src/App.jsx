import { useState } from "react";
import AdmissionForm from "./components/AdmissionForm";
import SuccessCard from "./components/SuccessCard";

function App() {
  // application: shuru mein null (kuch nahi). Submit ke baad us mein data aa jata hai.
  const [application, setApplication] = useState(null);

  // AdmissionForm jab sahi data bheje to ye chalega
  function handleSubmit(values) {
    setApplication({
      ...values, // form ka saara data copy karo
      // Date.now() ke aakhri 6 digits se chhota sa ID bana liya
      id: "ADM-" + Date.now().toString().slice(-6),
    });
  }

  // Naya form shuru karna
  function handleReset() {
    setApplication(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            📝 Student Admission
          </h1>
          <p className="text-gray-500">
            Fill in the form to apply for a course
          </p>
        </div>

        {/* Conditional rendering: application hai to Success Card, warna Form.
            Jab Form hat kar wapas aata hai to ye dobara bilkul naya (khali) ban jata hai,
            isi liye reset ke liye alag code nahi likhna pada. */}
        {application ? (
          <SuccessCard application={application} onReset={handleReset} />
        ) : (
          <AdmissionForm onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}

export default App;
