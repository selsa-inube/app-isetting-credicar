const validationMessages = {
  maxCharacters: (count: number) => `Debe tener máximo ${count} caracteres`,
  numbers: "Este campo solo acepta números",
  required: "Este campo no puede estar vacío",
  identification: "Ya existe una empresa con esta identificación.",
  code: "Ya existe este codigo",
};

export { validationMessages };
