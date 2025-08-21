export const setUsuario = (auxi) => {
    return {
        type: 'SET_USUARIO',
        usuario: auxi
    }
}

export const clearUsuario = () => {
    return {
        type: 'CLEAR_USUARIO'
    }
}

export const setNavigationRed = (auxi) => {
    return {
        type: 'SET_NAVIGATIONRED',
        navigationRid: auxi
    }
}

export const clearNavigationRed = () => {
    return {
        type: 'CLEAR_NAVIGATIONRED'
    }
}