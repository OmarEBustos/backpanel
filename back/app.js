var express = require('express');
var mongoose = require ("mongoose");
var dotenv = require ('dotenv')




var bodyparser = require ('body-parser');
var port = process.env.port || 4201;
const { createServer } = require("http");
const { Server } = require("socket.io");

var app = express();

dotenv.config()

const httpServer = createServer(app);



const io = new Server(httpServer, { 
    cors:{origin: '*' }
   
 });
//origin:'https://paneladmin-sandy.vercel.app'
io.on("connection", (socket) => {
  // ...
  socket.on('send_cart',function(data){
    io.emit('listen_cart',data);
  });
});





var cliente_router = require('./routes/cliente');
var usuario_router = require('./routes/usuario');
var producto_router = require('./routes/producto');
var public_router = require('./routes/public');
var customer_router = require('./routes/customer');
var venta_router = require('./routes/venta');

app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

mongoose.connect('mongodb+srv://Root:TiendaJD9!@cluster0.epkrue0.mongodb.net/?retryWrites=true&w=majority/tiendaprueba');

httpServer.listen(port,function(){
    console.log('Servidor corriendo '+port);
});

// arrancar la app


app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE,OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE,OPTIONS');
    next();
});

app.use('/api', cliente_router);
app.use('/api', usuario_router);
app.use('/api', usuario_router);
app.use('/api', producto_router);
app.use('/api', public_router);
app.use('/api', customer_router);
app.use('/api', venta_router);

module.exports = app;