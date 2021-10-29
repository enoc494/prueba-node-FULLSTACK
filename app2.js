//en blancolet autos = require("./autos.js")

let concesionaria = {
    //propiedades/atributos
    autos : autos,
    //métodos
    buscarAuto: function(patente){
          let posibles = this.autos.filter(function(auto){
             return auto.patente == patente;
          })
       return posibles.length ==1 ? posibles[0] : null;
    },
    venderAuto: function(patente){
       let auto = this.buscarAuto(patente)
       if(auto!=null){
          //Asignación directa
          this.autos[this.autos.indexOf(auto)].vendido = true;
       }
    },
    autosParaLaVenta:function(){
       let disponibles = this.autos.filter(function(auto){
          return auto.vendido == false;
       })
       return disponibles
    },
    autosNuevos: function(){
       let nuevos = this.autosParaLaVenta().filter(function(auto){
          return auto.km<=100;
       }) 
       return nuevos
    },
    listaDeVentas : function(){
       let vendidos= this.autos.filter(function(auto){
          return auto.vendido==true; 
       })
       let ventas = vendidos.map(function(auto){
          return auto.precio;
       })
       return ventas;
    },
    puedeComprar : function(auto,cliente){
       return !(cliente.capacidadDePagoTotal<auto.precio  ||cliente.capacidadDePagoEnCuotas<auto.precio/auto.cuotas)
    },
    autosQuePuedeComprar : function(cliente){
       //Carros disponibles
       let disponibles =  this.autosParaLaVenta()
 
       //Carros que puede comprar filtrando:
       let comprables = disponibles.filter(function(auto){
          return  cliente.capacidadDePagoEnCuotas > auto.precio/auto.cuotas && cliente.capacidadDePagoTotal > auto.precio;
       })
       //lista de autos que puede comprar:
       return comprables;
    },
 };
 
 
 
 let cliente = {
 nombre: "Juan",
 capacidadDePagoEnCuotas: 20000,
 capacidadDePagoTotal: 100000
 }
 
 console.log(concesionaria.autosQuePuedeComprar(cliente))
 