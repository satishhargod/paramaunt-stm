export const validateForm = (form, rules, type = "create") => {
  const schema = rules[type];
  const errors = {};

  Object.keys(schema).forEach((field) => {
    const value = form[field];
    const rule = schema[field];

    if (rule.required && !value) {
      errors[field] = rule.message || `${field} is required`;
      return;
    }

    if (rule.min && value && value.length < rule.min) {
      errors[field] =
        rule.message || `${field} must be at least ${rule.min}`;
      return;
    }

    if (rule.pattern && value && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${field} is invalid`;
      return;
    }
  });

  return errors;
};