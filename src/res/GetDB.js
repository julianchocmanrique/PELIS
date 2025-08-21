import request from 'superagent';


export const getTiposDocumento = () => {
    return new Promise((resolve, reject) => {
        request
            .get('http://192.168.20.22:3020/api/responseRID/tiposDocumento')
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    reject(err)
                } else {

                    const respuestaLogin = JSON.parse(res.text);
                    resolve(respuestaLogin)

                }
            });
    })
}

export const getTiposGenero = () => {
    return new Promise((resolve, reject) => {
        request
            .get('http://192.168.20.22:3020/api/responseRID/tiposGenero')
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    reject(err)
                } else {

                    const respuestaLogin = JSON.parse(res.text);
                    resolve(respuestaLogin)

                }
            });
    })
}

export const getPermisosXIdInterface = (id) => {
    return new Promise((resolve, reject) => {
        request
            .get('http://192.168.20.22:3020/api/responseRID/permisoXIdInterface/' + id)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    reject(err)
                } else {

                    const respuestaLogin = JSON.parse(res.text);
                    resolve(respuestaLogin)

                }
            });
    })
}