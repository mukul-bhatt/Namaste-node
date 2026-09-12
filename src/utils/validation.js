const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, emailId, password, age, gender } = req.body;

    const allowedGenders = ["male", "female", "others"];

    if (!firstName || firstName.length < 2) {
        throw new Error("First name is required and must be at least 2 characters");
    }
    if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("A valid email Id is required");
    }
    if (!password ) {
        throw new Error("Password is required");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
    if (!age || age < 18 || age > 65) {
        throw new Error("Age is required and must be between 18 and 65");
    }
    if (!gender || !allowedGenders.includes(gender)) {
        throw new Error(`Gender is required and must be one of: ${allowedGenders.join(", ")}`);
    }
};

const validateUpdateData = (data) => {
    console.log("data" , data);

    const notAllowedToUpdate = ["emailId", "password"];

    const hasForbiddenKeys = Object.keys(data).some((curr) => notAllowedToUpdate.includes(curr));

    if (hasForbiddenKeys){

        const listOfWrongKeys = Object.keys(data).filter((curr) => notAllowedToUpdate.includes(curr));

        throw new Error(`You are not allowed to update: ${listOfWrongKeys.join(", ")}`);
    }
}

module.exports = {
    validateSignUpData,
    validateUpdateData
};
