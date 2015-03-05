var servicio = "http://services.arcgis.com/8DAUcrpQcpyLMznu/arcgis/rest/services/ProhibidoOlvidar/FeatureServer/0";
var arrayURL = [];
var cont = 1;

require([
        "esri/layers/FeatureLayer",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "dojo/parser",
        'esri/layers/FeatureLayer',
        "dojo/ready"
      ], function (FeatureLayer,Query,QueryTask,parser,FeatureLayer,ready) {
          parser.parse();
          ready(function(){
            var MyFeatureLayer;
            cargarDatos();
            //loadPhotos();

            function cargarDatos(){
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              //query.returnGeometry = false;
              //query.outFields = ["*"];
              query.where = "1=1";
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(MostrarImagenes);  
            }

            function MostrarImagenes(results) {
              var contador;
              var objectId, el;
              featureLayer = new esri.layers.FeatureLayer(servicio, {
                      mode: FeatureLayer.MODE_ONDEMAND
              });
              var paginas= (results.length)/18;
              var consulta = "";
              
              if (results.length < 18) {
                contador = results.length;
              }
              else if(results.length >=18)
                contador = 18;
              for(var i=0;i<contador;i++){
                //console.log("i", i);
                consulta += cargarNombre(results, i);
                

                featureLayer.queryAttachmentInfos(results[i], function (infos) {
                  cont++;
                       //console.log("infos", infos+"contador: ",cont);
                        //alert("entro");
                        //console.log("El nombre es", nombres.Nombre);
                        el = document.createElement('img');
                        //console.log("url imagen", i);
                        try{
                          if (!!infos[0].url) {
                              //alert("entro");
                              el.setAttribute('src', infos[0].url);
                              arrayURL[infos[0].objectId] = infos[0].url;
                             // console.log("tamaño array",arrayURL.length);
                              //console.log("array", arrayURL);
                              
                          }
                          }catch(e){
                          }
                          //console.log("123infos", infos+"contador: ",cont);
                          if(cont==contador){
                            //console.log("array",arrayURL);
                            crearDiv(consulta, arrayURL);                            
                          }
                }); 
              }
              
              
              
            } 


            function cargarNombre(datos, posicion){

              var consulta;
              //console.log(datos.length);
                if (posicion < datos.length-1) {
                  consulta = "OBJECTID ='"+datos[posicion]+"' OR ";
                }
                else{
                consulta = "OBJECTID ='"+datos[posicion]+"'"; 
                }
              return consulta;
            }

            function crearDiv(consulta, arrayURL){
              var datos;
              //alert("entro");
              var marginleft = 0;
              var marginTop = 0;
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.returnGeometry = false;
              query.outFields = ["*"];
              query.where = consulta;
              datos = myFeatureLayer.execute(query);
              datos.then(CreandoDiv);
              //console.log("Esta es la consulta", consulta);
            }

            function CreandoDiv(results){
              var marginleft = 0;
              var marginTop = 0;
              var imagen;
              document.getElementById("rostrosGaleria").innerHTML="";
              //console.log("tamaño",results);
              for (var i = 0; i < results.features.length; i++) {
                 var datos = results.features[i].attributes;
                 //console.log("resultado datos",datos.Nombre);
                 //console.log("imagen", arrayURL[0]);
                 if (arrayURL[results.features[i].attributes.OBJECTID]==undefined) {
                  imagen = 'http://ceibal.elpais.com.uy/wp-content/uploads/2014/01/cerebro-imagen-procesa.jpg';
                 }
                 else
                  imagen = arrayURL[results.features[i].attributes.OBJECTID];
                if((i+1)%6 != 0){

                  document.getElementById("rostrosGaleria").innerHTML+="<div id='rostros' class='rostro' style='margin:"+marginTop+"px 0 0 "+marginleft+"px'><img  height='150' width='150' style='opacity:0.25' src="+imagen+"><div class='nombreRostro'>"+datos.Nombre+"</div></div>";
                  marginleft+= 186;
                }
                else{
                  document.getElementById("rostrosGaleria").innerHTML+="<div id='rostros' class='rostro' style='margin:"+marginTop+"px 0 0 "+marginleft+"px'><img height='150' width='150' style='opacity:0.25' src="+imagen+"><div class='nombreRostro'>"+datos.Nombre+"</div></div>";
                  marginTop += 180;
                  marginleft = 0;
                }
              }
            }

          })
      });
      
        
