const { check, } = require("express-validator");
const validateResult = require("../utils/validate");

const createCustomerValidator = [
    check("nombre", "Error con el campo nombre")
        .exists().withMessage("El campo nombre es obligatorio")
        .notEmpty().withMessage("El campo nombre no debe de estar vacío")
        .isString().withMessage("El tipo de dato debe ser string")
        .isLength({min: "5"}).withMessage("El nombre del usuario debe tener mínimo 5 caracteres"),
    
    check("apellido", "Error con el campo apellido")
        .exists().withMessage("El campo apellido es obligatorio")
        .notEmpty().withMessage("El campo apellido no debe de estar vacío")
        .isString().withMessage("El tipo de dato debe ser string")
        .isLength({min: "5"}).withMessage("El apellido del usuario debe tener mínimo 5 caracteres"),
    
    check("empresa", "Error con el campo empresa")
        .exists().withMessage("El campo empresa es obligatorio")
        .notEmpty().withMessage("El campo empresa no debe de estar vacío")
        .isString().withMessage("El tipo de dato debe ser string")
        .isLength({min: "5"}).withMessage("El empresa del usuario debe tener mínimo 5 caracteres"),
    
    check("email", "Error con el campo email")
        .exists().withMessage("El campo email es obligatorio")
        .notEmpty().withMessage("El campo email no debe de estar vacío")
        .isString().withMessage("El tipo de dato debe ser string")
        .isEmail().withMessage("El campo email no tiene el formato de correo")
        .isLength({min: "10", max: "60"}).withMessage("El email debe de tener mínimo 10 caracteres y máximo 60"),
    
    validateResult
    
]


module.exports = createCustomerValidator;