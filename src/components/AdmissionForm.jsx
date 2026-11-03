import { useState } from "react";
import FormField from "./FormField";
import { validate } from "../utils/validate";

// Ye lists component ke BAHAR hain kyunke ye kabhi badalti nahi
const courses = [
  "Computer Science",
  "Software Engineering",
  "Data Science",
  "Business Administration",
  "Electrical Engineering",
];
const genders = ["Male", "Female", "Other"];

// Form ki shuru ki (khali) values. Ye object ki keys, input ke "name" se match karti hain.
const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  course: "",
  gender: "",
  message: "",
  agree: false,
};

// onSubmit: parent (App) ka function. Form sahi ho to data upar bhejne ke liye.
function AdmissionForm({ onSubmit }) {
  // ---------- STATES ----------
  const [values, setValues] = useState(initialValues); // saare inputs ki values
  const [touched, setTouched] = useState({}); // kaun si fields user chhu chuka hai
  const [submitted, setSubmitted] = useState(false); // kya Submit dabaya gaya?

  // ---------- DERIVED DATA (state nahi, calculate hota hai) ----------

  // Har render par values se errors dobara nikalte hain
  const errors = validate(values);

  // Progress bar ke liye: kitni fields sahi hain
  const totalFields = Object.keys(initialValues).length; // 8
  const validFields = totalFields - Object.keys(errors).length; // jin mein error nahi
  const percent = Math.round((validFields / totalFields) * 100);

  // ---------- FUNCTIONS ----------

  // EK handler, SAARE inputs ke liye
  function handleChange(e) {
    // e.target = wo input jis mein change hua
    // name = input ka name attribute, value = naya text, type/checked checkbox ke liye
    const { name, value, type, checked } = e.target;

    // [name]: computed property. Agar name "email" hai to ye { email: value } ban jata hai.
    // Checkbox ki value "checked" (true/false) hoti hai, baaqi ki "value".
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  // Jab user kisi field ko chhod kar aage jaye (focus hat jaye)
  function handleBlur(e) {
    const { name } = e.target;
    // Is field ko "touched" mark kar do
    setTouched({ ...touched, [name]: true });
  }

  // Form submit hone par
  function handleSubmit(e) {
    e.preventDefault(); // page reload na ho
    setSubmitted(true); // ab saari fields ke errors dikhne lagenge

    // Agar errors mein kuch bhi hai to ruk jao, parent ko data mat bhejo
    if (Object.keys(errors).length > 0) return;

    // Sab theek hai, data parent ko bhej do
    onSubmit(values);
  }

  // Error sirf tab dikhao jab field touched ho YA submit dabaya gaya ho
  function getError(name) {
    return touched[name] || submitted ? errors[name] : "";
  }

  // Input ka style: error ho to laal border, warna normal
  function inputStyle(name) {
    return `w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
      getError(name)
        ? "border-red-400 focus:ring-red-300"
        : "border-gray-300 focus:ring-sky-400"
    }`;
  }

  // ---------- UI ----------
  return (
    // noValidate: browser ki apni validation band. Hum apni custom validation use kar rahe hain.
    // Iske baghair type="email" wale input par browser apna bada sa popup dikha deta hai.
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl shadow-md p-6 space-y-5"
    >
      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Form progress</span>
          <span>{percent}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          {/* style={{ width: ... }}: width dynamic hai (percent se), isliye inline style */}
          <div
            className="h-full bg-sky-500 transition-all duration-300"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>

      {/* Fields ka grid: chhoti screen par 1 column, badi par 2 */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Full Name */}
        <FormField label="Full Name" error={getError("fullName")}>
          <input
            type="text"
            name="fullName"
            placeholder="e.g. Ahmed Khan"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputStyle("fullName")}
          />
        </FormField>

        {/* Email */}
        <FormField label="Email" error={getError("email")}>
          <input
            type="email"
            name="email"
            placeholder="name@gmail.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputStyle("email")}
          />
        </FormField>

        {/* Phone */}
        <FormField label="Phone Number" error={getError("phone")}>
          <input
            type="tel"
            name="phone"
            placeholder="03001234567"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputStyle("phone")}
          />
        </FormField>

        {/* Age */}
        <FormField label="Age" error={getError("age")}>
          <input
            type="number"
            name="age"
            placeholder="e.g. 19"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputStyle("age")}
          />
        </FormField>
      </div>

      {/* Course dropdown */}
      <FormField label="Select Course" error={getError("course")}>
        <select
          name="course"
          value={values.course}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputStyle("course")}
        >
          <option value="">-- Choose a course --</option>
          {/* .map(): har course ke liye ek option */}
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </FormField>

      {/* Gender radio buttons */}
      <FormField label="Gender" error={getError("gender")}>
        <div className="flex gap-6 py-2">
          {genders.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-gray-700"
            >
              {/* Radio: sab ka name same ("gender"), is se sirf ek select hota hai.
                  checked: ye wala option tab tick hoga jab state ki value iske barabar ho */}
              <input
                type="radio"
                name="gender"
                value={option}
                checked={values.gender === option}
                onChange={handleChange}
                onBlur={handleBlur}
                className="accent-sky-500"
              />
              {option}
            </label>
          ))}
        </div>
      </FormField>

      {/* Message (textarea) with character counter */}
      <FormField label="Why do you want to join?" error={getError("message")}>
        <textarea
          name="message"
          rows="4"
          maxLength="200"
          placeholder="Tell us a little about yourself (min 20 characters)"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputStyle("message")}
        ></textarea>
        {/* Character counter: values.message.length se live count */}
        <p className="text-right text-xs text-gray-400 mt-1">
          {values.message.length}/200
        </p>
      </FormField>

      {/* Terms checkbox */}
      <FormField label="" error={getError("agree")}>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          {/* Checkbox mein "checked" use hota hai, "value" nahi */}
          <input
            type="checkbox"
            name="agree"
            checked={values.agree}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-4 h-4 accent-sky-500"
          />
          I confirm that the information provided is correct
        </label>
      </FormField>

      {/* Submit button. Disabled nahi kiya taake click par errors dikhein */}
      <button
        type="submit"
        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Submit Application
      </button>
    </form>
  );
}

export default AdmissionForm;
