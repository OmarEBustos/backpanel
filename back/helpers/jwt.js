var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'diego';

exports.createToken = function(usuario){
    var payload = {
        sub: usuario._id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        email: usuario.email,
        rol: usuario.rol,
        iat: moment().unix(),
        exp: moment().add(30,'day').unix()
    }

    return jwt.encode(payload,secret);
}