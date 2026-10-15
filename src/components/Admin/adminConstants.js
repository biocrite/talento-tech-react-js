
export const LANGUAGES = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
];

export const createEmptyForm = () => ({
  name: { en: "", es: "", pt: "" },
  description: { en: "", es: "", pt: "" },
  price: "",
  image: "",
  imageDeleteUrl: "",
  categories: "",
});
