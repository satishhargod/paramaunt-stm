export const ADMISSION_VALIDATION_RULES = {
  create: {
    // 👤 Student Basic
    first_name: {
      required: true,
      min: 2,
      message: "First name must be at least 2 characters",
    },
    last_name: {
      required: true,
      min: 2,
      message: "Last name must be at least 2 characters",
    },

    gender: {
      required: true,
      message: "Gender is required",
    },

    dob: {
      required: true,
      message: "Date of birth is required",
    },

    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email format",
    },

    admission_no: {
      required: true,
      message: "Admission number is required",
    },

    roll_no: {
      required: true,
      message: "Roll number is required",
    },

    class: {
      required: true,
      message: "Class is required",
    },

    section: {
      required: true,
      message: "Section is required",
    },

    status: {
      required: true,
      message: "Status is required",
    },

    // 👨‍👩‍👧 Parents
    father_name: {
      required: true,
      message: "Father name is required",
    },

    mother_name: {
      required: true,
      message: "Mother name is required",
    },

    phone: {
      required: true,
      pattern: /^[0-9]{10}$/,
      message: "Phone must be 10 digits",
    },

    alternate_phone: {
      pattern: /^[0-9]{10}$/,
      message: "Alternate phone must be 10 digits",
    },

    p_email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid parent email",
    },

    occupation: {
      required: true,
      message: "Occupation is required",
    },

    p_address: {
      required: true,
      min: 5,
      message: "Address must be at least 5 characters",
    },

    p_city: {
      required: true,
      message: "City is required",
    },

    p_state: {
      required: true,
      message: "State is required",
    },

    p_pincode: {
      required: true,
      pattern: /^[0-9]{6}$/,
      message: "Pincode must be 6 digits",
    },
  },
  update: {
    // 👤 Student Basic
    first_name: {
      required: true,
      min: 2,
      message: "First name must be at least 2 characters",
    },
    last_name: {
      required: true,
      min: 2,
      message: "Last name must be at least 2 characters",
    },

    gender: {
      required: true,
      message: "Gender is required",
    },

    dob: {
      required: true,
      message: "Date of birth is required",
    },

    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email format",
    },

    admission_no: {
      required: true,
      message: "Admission number is required",
    },

    roll_no: {
      required: true,
      message: "Roll number is required",
    },

    class: {
      required: true,
      message: "Class is required",
    },

    section: {
      required: true,
      message: "Section is required",
    },

    status: {
      required: true,
      message: "Status is required",
    },

    // 👨‍👩‍👧 Parents
    father_name: {
      required: true,
      message: "Father name is required",
    },

    mother_name: {
      required: true,
      message: "Mother name is required",
    },

    phone: {
      required: true,
      pattern: /^[0-9]{10}$/,
      message: "Phone must be 10 digits",
    },

    alternate_phone: {
      pattern: /^[0-9]{10}$/,
      message: "Alternate phone must be 10 digits",
    },

    p_email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid parent email",
    },

    occupation: {
      required: true,
      message: "Occupation is required",
    },

    p_address: {
      required: true,
      min: 5,
      message: "Address must be at least 5 characters",
    },

    p_city: {
      required: true,
      message: "City is required",
    },

    p_state: {
      required: true,
      message: "State is required",
    },

    p_pincode: {
      required: true,
      pattern: /^[0-9]{6}$/,
      message: "Pincode must be 6 digits",
    },
  },
};