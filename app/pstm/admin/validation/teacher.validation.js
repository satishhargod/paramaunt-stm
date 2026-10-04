export const TEACHER_VALIDATION_RULES = {
    create: {
        first_name: { required: true, min: 2 },
        last_name: { required: true },
        // email: { required: true, email: true },
        // phone: { required: true, min: 10, max: 10 },
        designation: { required: true },
        qualification: { required: true },


        // basic_salary: { required: true, number: true },
        // hra: { number: true },
        // allowances: { number: true },
        // deductions: { number: true },
    },
    update: {
        first_name: { required: true, min: 2 },
        last_name: { required: true },
        // email: { required: true, email: true },
        // phone: { required: true, min: 10, max: 10 },
        designation: { required: true },
        qualification: { required: true },


        // basic_salary: { required: true, number: true },
        // hra: { number: true },
        // allowances: { number: true },
        // deductions: { number: true },
    },
};