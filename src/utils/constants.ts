
export const ConstantsFormContact  = {
    ERROR_NAME_REQUIRED: "Nombre es requerido!",
    ERROR_EMAIL_REQUIRED: "Correo es requerido!",
    ERROR_MESSAGE_REQUIRED: "Mensaje es requerido!",
    ERROR_SUBJECT_REQUIRED: "Asunto es requerido!",
    ERROR_EMAIL: "Correo no es correcto!",
    ERROR_MESSAGE_SEND: "El mensaje no ha sido enviado",
    SUCCESS_MESSAGE_SEND: "Mensaje enviado con éxito"
}

export const ConstantsResponsesGenerics = {
    FORBIDDEN: {code: 403, message: "This resource is forbidden"},
    BAD_REQUEST: {code: 400, message: "The request is incorrect"},
    NOT_FOUND: {code: 404, message: "The resource is not found"},
    UNKNOWN_ERROR: {code: 500, message: "An unknown error has occurred"},
    INTERNAL_SERVER_ERROR: {code: 500, message: "An internal server error has occurred"},
    CONFLICT: {code: 409, message: "Resource conflict"},
    OK: {code: 200, message: "Action successfully executed"},
}

export const ConstantsResponsesAuth = {
    UNAUTHORIZED_TOKEN: {code: 401, message: "The token is invalid"},
    UNAUTHORIZED_TOKEN_EXPIRED: {code: 401, message: "The token has expired"},
    UNAUTHORIZED_SESSION_EXPIRED: {code: 401, message: "The session has expired"},
    INCORRECT_CREDENTIALS: {code: 401, message: "The credentials are incorrect"},
    INCORRECT_CREDENTIALS_USER: {code: 401, message: "The username is incorrect"},
    INCORRECT_CREDENTIALS_PASS: {code: 401, message: "The password is incorrect"},
    OK: {code: 200, message: "Action successfully executed"},
    LOGIN_OK: {code: 200, message: "Login successful"},
    REGISTER_OK: {code: 200, message: "Register successful"}
}

export const ConstantsResponsesProjects = {
    GET_ALL_OK: {code: 200, message: "Projects successfully fetched"},
    GET_BY_PARAM_OK: {code: 200, message: "Project successfully fetched"},
    CREATED_OK: {code: 201, message: "Project successfully created"},
    DELETED_OK: {code: 200, message: "Project successfully deleted"},
    UPDATED_OK: {code: 200, message: "Project successfully updated"}
}

export const ConstantsResponsesSkills = {
    GET_ALL_OK: {code: 200, message: "Skills successfully fetched"},
    GET_BY_PARAM_OK: {code: 200, message: "Skill successfully fetched"},
    CREATED_OK: {code: 201, message: "Skill successfully created"},
    DELETED_OK: {code: 200, message: "Skill successfully deleted"},
    UPDATED_OK: {code: 200, message: "Skill successfully updated"}
}

export const ConstantsResponsesUsers = {
    GET_ALL_OK: {code: 200, message: "Users successfully fetched"},
    GET_BY_PARAM_OK: {code: 200, message: "User successfully fetched"},
    CREATED_OK: {code: 201, message: "User successfully created"},
    DELETED_OK: {code: 200, message: "User successfully deleted"},
    UPDATED_OK: {code: 200, message: "User successfully updated"}
}