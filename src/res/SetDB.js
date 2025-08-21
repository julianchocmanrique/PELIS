import request from 'superagent';


export const agregarUsuario = (id, nombres, apellidos, genero, tipoDocumento, imgUrl, celular, wp, email, pass) => {
    return new Promise((resolve, reject) => {
        request
        .post('http://192.168.20.22:3020/api/responseRID/agregarUsuario')
        .send({id: id, nombres: nombres, apellidos: apellidos, genero: genero, tipoDocumento: tipoDocumento, imgUrl: imgUrl, telefono: celular, wp: wp, email: email, pass: pass})
        .set('accept', 'json')
        .end((err, res) => {
                if (err) {
                    
                    reject("Error al guardar información")

                } else {
                    agregarEventoBitacora(7, "id estudiante: ")
                    resolve()
                    
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


const agregarEventoBitacora = (tipoEvento, info) => {
    console.log('nuevo evento bitacora: ' + tipoEvento + ' - ' + info)
}