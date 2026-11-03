// Ye ek chhota REUSABLE wrapper hai. Har field mein label upar aur error neeche
// aata hai, to ye kaam baar baar likhne ki bajaye ek jagah rakh diya.
//
// label    -> field ka naam (jo upar dikhega)
// error    -> error message (khali string ho to kuch nahi dikhega)
// children -> jo cheez is component ke TAG ke andar likhi jaye (input, select etc.)
function FormField({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {/* children: yahan wo input aayega jo parent ne tag ke andar likha */}
      {children}

      {/* && ka matlab: error mein kuch likha ho tabhi ye <p> dikhao */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default FormField;
