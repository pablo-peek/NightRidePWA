export const CUSTOM_ERRORS = {
    UserNotFoundException:'El usuario especificado no existe',
    UserNotConfirmedException:'El usuario aún no ha sido confirmado.',
    NotAuthorizedException:'Contraseña incorrecta',
    ExpiredCodeException:'El código de verificación ha caducado.',
    InvalidParameterException:'Uno o más de los parámetros proporcionados no son válidos.',
    InvalidPasswordException:'La contraseña proporcionada no cumple con los requisitos de la política de contraseñas.',
    UserLambdaValidationException:'Ha fallado un desencadenador de validación de usuario.',
    ResourceNotFoundException:'El recurso solicitado no se ha encontrado.',
    AliasExistsException:'El alias especificado ya existe.',
    InternalErrorException:'Se produjo un error interno en el servicio.',
} as const