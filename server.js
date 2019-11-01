var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

app.use(bodyParser.json()); 

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

var dbConfig = {
    user:  "SA",
    password: "quintero1.",
    server: "localhost",
    database: "prueba",
    port:1433,
    options: {
      encrypt: false
    }
};

app.get("/persona/:id/", function(req, res){
  var id = req.body.id 
  var conn = new sql.ConnectionPool(dbConfig);
  conn.connect(function(err){
   if(err) throw err;
   var req = new sql.Request(conn);
   var query = `select * from persona where id=${id}`
   req.query(query, function(err, recordset){
     if(err) throw err;
     else 
    conn.close();
     return res.send(recordset.recordset);
   })
 })
});


app.get("/persona", function(req, res){
    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(function(err){
     if(err) throw err;
     var req = new sql.Request(conn);
     req.query("select * from persona", function(err, recordset){
       if(err) throw err;
       else 
       conn.close();
       return res.send(recordset.recordset);
     })
   })
});

app.post("/persona", function(req, res){
  var nombre = req.body.nombre
  var edad = req.body.edad
  var data = "guardarpersona";

  var conn = new sql.ConnectionPool(dbConfig);
  conn.connect(function(err){
   if(err) throw err;
   var req = new sql.Request(conn);
   req.input( "nombre", sql.VarChar( 50 ), nombre );
   req.input( "edad", sql.Int, edad );
   req.execute(data, function(err, recordset){
     if(err) throw err;
     else 
     conn.close();
     return res.send(recordset.recordset);
   })
 })
});

app.put("/persona", function(req, res){
  var nombre = req.body.nombre
  var edad = req.body.edad
  var id = req.body.id
  var data = "actualizarpersona";

  var conn = new sql.ConnectionPool(dbConfig);
  conn.connect(function(err){
   if(err) throw err;
   var req = new sql.Request(conn);
   req.input( "nombre", sql.VarChar( 50 ), nombre );
   req.input( "edad", sql.Int, edad );
   req.input( "id", sql.Int, id );
   req.execute(data, function(err, recordset){
     if(err) throw err;
     else 
     conn.close();
     return res.send(recordset.recordset);
   })
 })
});

app.put("/persona", function(req, res){
  var id = req.body.id
  var data = "eliminarpersona";

  var conn = new sql.ConnectionPool(dbConfig);
  conn.connect(function(err){
   if(err) throw err;
   var req = new sql.Request(conn);
   req.input( "id", sql.Int, id );
   req.execute(data, function(err, recordset){
     if(err) throw err;
     else 
     conn.close();
     return res.send(recordset.recordset);
   })
 })
});
