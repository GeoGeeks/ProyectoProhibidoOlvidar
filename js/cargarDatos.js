var servicio = "http://services.arcgis.com/8DAUcrpQcpyLMznu/arcgis/rest/services/ProhibidoOlvidar/FeatureServer/0";
var arrayURL = [];
var cont = 1;
var pagina = 1;
var paginas = 1;
var numpag;
var prueba=[2,4,6,9,10,11,12,14,19,20];
var totalArrays=[];
var consultaRango = "1=1";
var filtroEdadMenor = "1=1";
var filtroEdadMayor = "1=1";
var filtroGenero = "1=1";
var meses = [];
meses[0]="Enero";meses[1]="Febrero";meses[2]="Marzo";meses[3]="Abril";meses[4]="Mayo";meses[5]="Junio";meses[6]="Julio";meses[7]="Agosto";meses[8]="Septiembre";meses[9]="Octubre";meses[10]="Noviembre";meses[11]="Diciembre";


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
            
            paginacion();

            $("#anterior").click(function(){
                anterior();
            });
            $("#uno").click(function(){
                primerAno();
            });
            $("#dos").click(function(){
                segundoAno();
            });
            $("#tres").click(function(){
                tercerAno();
            });
            $("#cuatro").click(function(){
                cuartoAno();
            });
            $("#cinco").click(function(){
                quintoAno();
            });
            $("#actualidad").click(function(){
                actualidad();
            });

            

            function CreandoDiv(results){
              var marginleft = 0;
              var marginTop = 0;
              var imagen;
              var sexo = "";
              document.getElementById("rostrosGaleria").innerHTML="";

              for (var i = 0; i < results.features.length; i++) {
                 var datos = results.features[i].attributes;
                 if (arrayURL[results.features[i].attributes.OBJECTID]==undefined) {
                  imagen = 'http://ceibal.elpais.com.uy/wp-content/uploads/2014/01/cerebro-imagen-procesa.jpg';
                 }
                 else
                  imagen = arrayURL[results.features[i].attributes.OBJECTID];
               
                  var rostro = document.getElementById("rostrosGaleria");
                  var imagenDIV = document.createElement('div');
                  imagenDIV.id = "rostros";
                  imagenDIV.name = datos.OBJECTID;
                  imagenDIV.onclick = function(){
                    document.getElementById("nombreDetallePopUpRostro").innerHTML = ($("#nombre"+this.name+"").html()).toUpperCase();
                    document.getElementById("popUpRostro").style.display = "block";
                    document.getElementById("imagenDetallePopUpRostro").src = $("#imagen"+this.name+"").html();
                    var sexo = $("#sexo"+this.name+"").html();
                    var edad = $("#edad"+this.name+"").html();
                    console.log("edad" , $("#edad"+this.name+"").html());
                    var NumFecha = $("#fecha"+this.name+"").html();
                    if (NumFecha== "null") {
                      document.getElementById("fechaDetallesPopUpRostro").innerHTML ="Fecha: Sin Información";
                    
                    }
                    else{
                      NumFecha = parseInt(NumFecha);
                      var tiempo = new Date(NumFecha);
                      document.getElementById("fechaDetallesPopUpRostro").innerHTML = "Fecha: "+tiempo.getDate()+" de "+meses[tiempo.getMonth()]+" de "+tiempo.getFullYear()+"";
                    }
                    if (edad == "null") {
                      document.getElementById("edadDetallesPopUpRostro").innerHTML = "Sin Información";
                    }
                    else{
                      document.getElementById("edadDetallesPopUpRostro").innerHTML = $("#edad"+this.name+"").html()+" años";
                    }
                    if (sexo == 1) {
                      document.getElementById("generoDetallesPopUpRostro").innerHTML = "Hombre";
                    }
                    else if (sexo == 2) {
                      document.getElementById("generoDetallesPopUpRostro").innerHTML = "Mujer";
                    }
                    else{
                      document.getElementById("generoDetallesPopUpRostro").innerHTML = "Sin Información";
                    }
                    var profesion = $("#profesion"+this.name+"").html();
                    //console.log("Profesión", $("#profesion"+this.name+"").html());
                    if (profesion == "null") {
                      document.getElementById("profesionDetallesPopUpRostro").innerHTML = "Sin Información";
                    }
                    else{
                      document.getElementById("profesionDetallesPopUpRostro").innerHTML = $("#profesion"+this.name+"").html();
                    }
                    console.log("descripcion", $("#descripcion"+this.name+"").html());
                    if (($("#descripcion"+this.name+"").html() == "null") || ($("#descripcion"+this.name+"").html() == "")) {
                      document.getElementById("caracteristicas").style.display = "none";
                      document.getElementById("detallesPopUpRostro").style.height = "210px"
                    }
                    else{
                      document.getElementById("caracteristicas").style.display = "block";
                      document.getElementById("caracteristicasDetallesPopUpRostro").innerHTML = $("#descripcion"+this.name+"").html();
                      document.getElementById("detallesPopUpRostro").style.height = "320px"
                    }

                };
                imagenDIV.className = "rostro";
                imagenDIV.style.margin = marginTop+"px 0 0 "+marginleft+"px";
                imagenDIV.innerHTML += "<img height='150' width='150' style='opacity:0.25' src="+imagen+"><div id='rostroImagen' class='nombreRostro'>"+datos.Nombre+"<p style='display:none' id='nombre"+datos.OBJECTID+"'>"+datos.Nombre+"</p><p style='display:none' id='imagen"+datos.OBJECTID+"'>"+imagen+"</p><p style='display:none' id='edad"+datos.OBJECTID+"'>"+datos.Edad+"</p><p style='display:none' id='fecha"+datos.OBJECTID+"'>"+datos.Fecha_Evento+"</p><p style='display:none' id='sexo"+datos.OBJECTID+"'>"+datos.Genero+"</p><p style='display:none' id='profesion"+datos.OBJECTID+"'>"+datos.Profesión+"</p><p style='display:none' id='descripcion"+datos.OBJECTID+"'>"+datos.Descripción+"</p></div>";
                
                rostro.appendChild(imagenDIV);
                if((i+1)%6 != 0){
                  marginleft+= 186;
                }
                else{
                  marginTop += 180;
                  marginleft = 0;
                }
              }
            }

            function pintar2 (array){
              var marginleft = 0;
              var marginTop = 0;
              var consulta = crearStringCosulta(array);
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.returnGeometry = false;
              query.outFields = ["*"];
              query.orderByFields = ["OBJECTID DESC"];
              query.where = consulta;
              datos = myFeatureLayer.execute(query);
              datos.then(CreandoDiv);
            }

            function crearStringCosulta(array){
              var tamañoArray=array.length;
              var totalValores;
              var consulta="";
              if (tamañoArray < 18) {
                totalValores = tamañoArray; 
              }
              else{
                totalValores = 18;
              }
              for (var i = 0; i < totalValores; i++) {


                featureLayer = new esri.layers.FeatureLayer(servicio, {
                      mode: FeatureLayer.MODE_ONDEMAND
              });
              
              featureLayer.queryAttachmentInfos(array[i], function (infos) {
                  //cont++;
                        el = document.createElement('img');
                        try{
                          if (!!infos[0].url) {
                              el.setAttribute('src', infos[0].url);
                              arrayURL[infos[0].objectId] = infos[0].url;
                              
                          }
                          }catch(e){
                          }
                }); 



                if (i < totalValores-1) {
                  consulta += "OBJECTID ='"+array[i]+"' OR ";
                }
                else{
                consulta += "OBJECTID ='"+array[i]+"'"; 
                }
              }
              return consulta;

            }

            function paginacion(){
              var paginas;
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.where = "1=1 AND Validado = 1";
              query.orderByFields = ["OBJECTID DESC"];
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(totalIds);
              document.getElementById("paginacion").innerHTML="";
              
            }

            /* consulta por genero */
            $("#Genero").change(function(){
              //$("#cargandoFiltrosMapa").show();
              var seleccion = $("#Genero").val();
              switch(seleccion) {
                  case "genero":
                      filtroGenero = "1=1";
                      break;
                  case "fem":
                    filtroGenero = 'Genero=2';
                      break;
                  case "mas":
                      filtroGenero = 'Genero=1';
                      break;
                  default:
                      alert("Por favor vuelva a seleccionar una edad");
                      break;
              }
              genero()
             });

            /* consulta por edad */
            $("#Edad").change(function(){

              var seleccion = $("#Edad").val();
              switch(seleccion) {
                  case "edad":
                      filtroEdadMenor = "1=1";
                      filtroEdadMayor = "1=1";
                      break;
                  case "0-4":
                      filtroEdadMenor = 'Edad>=0';
                      filtroEdadMayor = 'Edad<=4';
                      break;
                    case "5-11":
                      filtroEdadMenor = 'Edad>=5';
                      filtroEdadMayor = 'Edad<=11';
                      break;
                  case "12-25":
                      filtroEdadMenor = 'Edad>=12';
                      filtroEdadMayor = 'Edad<=25';
                      break;
                    case "26-40":
                      filtroEdadMenor = 'Edad>=26';
                      filtroEdadMayor = 'Edad<=40';
                      break;
                  case "41-64":
                      filtroEdadMenor = 'Edad>=41';
                      filtroEdadMayor = 'Edad<=64';
                      break;
                  case "65":
                      filtroEdadMenor = 'Edad>=65';
                      filtroEdadMayor = '1=1';
                      break;
                  default:
                      alert("Por favor vuelva a seleccionar una edad");
                      break;
              }
              edad();
            
            });


            /* consulta por rango de edad */
            function edad(){
              var paginas;
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.where = consultaRango+' AND '+filtroEdadMenor+' AND '+filtroEdadMayor+' AND '+filtroGenero+' AND Validado = 1';
              query.orderByFields = ["OBJECTID DESC"];
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(totalIds);
              document.getElementById("paginacion").innerHTML="";
              
            }

            /* consulta por genero */
            function genero(){
              var paginas;
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.where = consultaRango+' AND '+filtroEdadMenor+' AND '+filtroEdadMayor+' AND '+filtroGenero+' AND Validado = 1';//+" AND "
              query.orderByFields = ["OBJECTID DESC"];
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(totalIds);
              document.getElementById("paginacion").innerHTML="";
              
            }

            /* consulta linea de tiempo rango de años 1990 a 1995 */
            function anterior(){
              var paginas;
              consultaRango = "Fecha_Evento<'1996'";
              filtroEdadMenor = "1=1";
              filtroEdadMayor = "1=1";
              filtroGenero = "1=1";
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.where = consultaRango+' AND '+filtroEdadMenor+' AND '+filtroEdadMayor+' AND '+filtroGenero+' AND Validado = 1';//+" AND "
              query.orderByFields = ["OBJECTID DESC"];
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(totalIds);
              document.getElementById("paginacion").innerHTML="";
              
            }

            /* consulta linea de tiempo rango de años 1990 a 1995 */
            function primerAno(){
              var paginas;
              consultaRango = "Fecha_Evento>'1989' AND Fecha_Evento<'1996'";
              filtroEdadMenor = "1=1";
              filtroEdadMayor = "1=1";
              filtroGenero = "1=1";
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.where = consultaRango+' AND '+filtroEdadMenor+' AND '+filtroEdadMayor+' AND '+filtroGenero+' AND Validado = 1';//+" AND "
              query.orderByFields = ["OBJECTID DESC"];
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(totalIds);
              document.getElementById("paginacion").innerHTML="";
              
            }

            /* consulta linea de tiempo rango de años 1996 a 2000 */
            function segundoAno(){
              var paginas;
              consultaRango = "Fecha_Evento>'1996' AND Fecha_Evento<'2001'";
              filtroEdadMenor = "1=1";
              filtroEdadMayor = "1=1";
              filtroGenero = "1=1";
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.where = consultaRango+' AND '+filtroEdadMenor+' AND '+filtroEdadMayor+' AND '+filtroGenero+' AND Validado = 1';//+" AND "
              query.orderByFields = ["OBJECTID DESC"];
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(totalIds);
              document.getElementById("paginacion").innerHTML="";
              
            }

            /* consulta linea de tiempo rango de años 2001 a 2005 */
            function tercerAno(){
              var paginas;
              consultaRango = "Fecha_Evento>'2001' AND Fecha_Evento<'2006'";
              filtroEdadMenor = "1=1";
              filtroEdadMayor = "1=1";
              filtroGenero = "1=1";
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.where = consultaRango+' AND '+filtroEdadMenor+' AND '+filtroEdadMayor+' AND '+filtroGenero+' AND Validado = 1';//+" AND "
              query.orderByFields = ["OBJECTID DESC"];
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(totalIds);
              document.getElementById("paginacion").innerHTML="";
              
            }

            /* consulta linea de tiempo rango de años 2006 a 2010 */
            function cuartoAno(){
              var paginas;
              consultaRango = "Fecha_Evento>'2006' AND Fecha_Evento<'2011'";
              filtroEdadMenor = "1=1";
              filtroEdadMayor = "1=1";
              filtroGenero = "1=1";
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.where = consultaRango+' AND '+filtroEdadMenor+' AND '+filtroEdadMayor+' AND '+filtroGenero+' AND Validado = 1';//+" AND "
              query.orderByFields = ["OBJECTID DESC"];
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(totalIds);
              document.getElementById("paginacion").innerHTML="";
              
            }

            /* consulta linea de tiempo rango de años 2011 a 2014 */
            function quintoAno(){
              var paginas;
              consultaRango = "Fecha_Evento>'2011' AND Fecha_Evento<'2015'";
              filtroEdadMenor = "1=1";
              filtroEdadMayor = "1=1";
              filtroGenero = "1=1";
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.where = consultaRango+' AND '+filtroEdadMenor+' AND '+filtroEdadMayor+' AND '+filtroGenero+' AND Validado = 1';//+" AND "
              query.orderByFields = ["OBJECTID DESC"];
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(totalIds);
              document.getElementById("paginacion").innerHTML="";
              

            }

             /* consulta linea de tiempo rango de años 2015 en adelante */
            function actualidad(){
              var paginas;
              consultaRango = "Fecha_Evento>'2015'";
              filtroEdadMenor = "1=1";
              filtroEdadMayor = "1=1";
              filtroGenero = "1=1";
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.where = consultaRango+' AND '+filtroEdadMenor+' AND '+filtroEdadMayor+' AND '+filtroGenero+' AND Validado = 1';//+" AND "
              query.orderByFields = ["OBJECTID DESC"];
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(totalIds);
              document.getElementById("paginacion").innerHTML="";
              
            }



            function totalIds(results){
              var nuevaPagina;
              arrayURL = [];
              totalArrays=[];
              if(results.length > 0){
                //for (var i = 0; i < results.length; i++) {
                  totalArrays = results;
               // }
                if ((totalArrays.length)%18 !=0){
                  paginas = parseInt((totalArrays.length)/18)+1;
                }
                else
                {
                  paginas= (totalArrays.length)/18;
                }
                for (var i = 0; i < paginas; i++) {
                  numpag = i+1;
                  var div = document.getElementById("paginacion");
                  

                  newElement = document.createElement('a');
                  newElement.title = i;
                  newElement.id=i;
                  newElement.innerHTML = i+1;
                  newElement.href= "#";
                  newElement.onclick =  function () {
                      var nuevoArreglo = [];
                      pagina = parseInt(this.id);
                      var tamañoNuevosElementos = (totalArrays.length)-((pagina)*18);
                      if (tamañoNuevosElementos >=18 ) {
                        nuevaPagina = 18;
                      }else{
                        nuevaPagina = tamañoNuevosElementos;
                      }
                      for (var i = 0; i < nuevaPagina; i++) {
                        nuevoArreglo[i] = totalArrays[i+(18*(pagina))]; 
                      }
                      pintar2(nuevoArreglo);
                  };
                  div.appendChild(newElement);
                }
                pintar2(totalArrays);
              }else{
                $("#rostrosGaleria").html("");
                document.getElementById("rostrosGaleria").innerHTML= "<p class='sinResultado'>No se encontraron resultados para esta busqueda</p>";
              }
            }

          })
      });
function cerrarPopupRostro(){
              document.getElementById("popUpRostro").style.display= "none";
            }