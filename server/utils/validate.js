export const validateRequest = async (req, schema) => {
  let data = {};

  const contentType = req.headers.get("content-type");

  if (contentType?.includes("multipart/form-data")) {
    const formData = await req.formData();
    data = Object.fromEntries(formData.entries());
  } else {
    data = await req.json();
  }

  const errors = {};

  Object.keys(schema).forEach((key) => {
    const rules = schema[key];
    const value = data[key];

    // required
    if (rules.required && !value) {
      errors[key] = rules.message || `${key} is required`;
      return;
    }

    if (!value) return;

    // min
    if (rules.min && value.length < rules.min) {
      errors[key] =
        rules.message || `${key} must be at least ${rules.min} characters`;
    }

    // max
    if (rules.max && value.length > rules.max) {
      errors[key] =
        rules.message || `${key} must be less than ${rules.max} characters`;
    }

    // pattern
    if (rules.pattern && !rules.pattern.test(value)) {
      errors[key] = rules.message || `${key} is invalid`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data,
  };
};