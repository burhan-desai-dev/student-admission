// Ye file sirf validation ka kaam karti hai. Is mein React nahi, sirf plain JavaScript hai.
// Ye ek "pure function" hai: values do, errors lo. Kuch aur change nahi hota.
// Isay alag file mein rakhne se form ka code saaf rehta hai aur test karna aasan hota hai.

// Email ka pattern (regex): kuch @ kuch . kuch, aur koi space nahi
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Pakistani mobile number: "03" se shuru, aur kul 11 digits (03001234567)
const phonePattern = /^03\d{9}$/;

// values: form ke saare inputs ka object
// Return: errors ka object. Sirf wahi fields us mein hongi jin mein galti hai.
// Agar errors khali ({}) hai to form bilkul sahi hai.
export function validate(values) {
  const errors = {};

  // ----- Full Name -----
  // trim(): shuru aur aakhir ke extra spaces hata deta hai
  if (values.fullName.trim() === "") {
    errors.fullName = "Full name is required";
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = "Name must be at least 3 characters";
  }

  // ----- Email -----
  if (values.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!emailPattern.test(values.email.trim())) {
    // pattern.test(text): true deta hai agar text pattern se match kare
    errors.email = "Enter a valid email (e.g. name@gmail.com)";
  }

  // ----- Phone -----
  if (values.phone.trim() === "") {
    errors.phone = "Phone number is required";
  } else if (!phonePattern.test(values.phone.trim())) {
    errors.phone = "Use format 03001234567 (11 digits)";
  }

  // ----- Age -----
  // Number input ki value bhi string hoti hai, isliye Number() se convert karte hain
  if (values.age === "") {
    errors.age = "Age is required";
  } else if (Number(values.age) < 15 || Number(values.age) > 60) {
    errors.age = "Age must be between 15 and 60";
  }

  // ----- Course aur Gender: bas select hona chahiye -----
  if (values.course === "") {
    errors.course = "Please select a course";
  }
  if (values.gender === "") {
    errors.gender = "Please select an option";
  }

  // ----- Message -----
  if (values.message.trim().length < 20) {
    errors.message = "Please write at least 20 characters";
  }

  // ----- Terms checkbox -----
  // agree true ya false hota hai. !false = true, matlab tick nahi hai to error
  if (!values.agree) {
    errors.agree = "You must agree to continue";
  }

  return errors;
}
