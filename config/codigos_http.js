exports.HTTP = {
    _200: {
        'estatus': 200,
        'mensaje': 'Operación exitosa',
        'error_fecha': 'Ya se cuenta con tareas pendientes con esa fecha/hora'
    },
    _404: {
        'estatus': 200,
        'mensaje': 'Dato no encontrado',
        'correo': 'El correo se encuentra previamente registrado',
    },
    _201: {
        'estatus': 201,
        'mensaje': 'Operación exitosa'
    },
    _400: {
        'estatus': 400,
        'mensaje': 'Datos inválidos',
    },
    _500: {
        'estatus': 500,
        'mensaje': 'Error al ejecutar proceso'
    }
}
