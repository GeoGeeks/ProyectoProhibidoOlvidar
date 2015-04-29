var servicio = "http://services.arcgis.com/8DAUcrpQcpyLMznu/arcgis/rest/services/Reporte_Prohibido_Olvidar/FeatureServer/0";
var arrayURL = [];
var cont = 1;
var pagina = 1;
var paginas = 1;
var numpag;
var pagSeleccionada=0;
var prueba=[2,4,6,9,10,11,12,14,19,20];
var totalArrays=[];
var consultaRango = "1=1";
var filtroEdadMenor = "1=1";
var filtroEdadMayor = "1=1";
var filtroGenero = "1=1";
var filtroGrupoRostros="1=1";
var meses = [];
var anoSeleccionado="";
var grupoArmado;
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
            $("#primerAno").click(function(){
                primerAno();
            });
            $("#segundoAno").click(function(){
                segundoAno();
            });
            $("#tercerAno").click(function(){
                tercerAno();
            });
            $("#cuartoAno").click(function(){
                cuartoAno();
            });
            $("#quintoAno").click(function(){
                quintoAno();
            });
            $("#actualidad").click(function(){
                actualidad();
            });

            
            function CrearCampos(results,i,marginleft,marginTop){
              var featureLayer = new esri.layers.FeatureLayer(servicio, {
                      mode: FeatureLayer.MODE_ONDEMAND
              });
              
              featureLayer.queryAttachmentInfos(results.features[i].attributes.OBJECTID, function (infos) {
                var imagen;
                try{
                  if (infos.length>0) {
                      console.log("url:"+infos[0].url);
                      imagen = infos[0].url;
                  }else{
                    if(results.features[i].attributes.Genero == 1)
                      imagen = 'imagenes/rostros/avatar_hombre.png';
                    else if(results.features[i].attributes.Genero == 2)
                      imagen = 'imagenes/rostros/avatar_mujer.png';
                    else if(results.features[i].attributes.Genero == 3)
                      imagen = 'imagenes/rostros/avatar_lgbti.png';
                  }
                  }catch(e){
                    console.log("error obteniendo la imagen:"+e);
                  }
                  var datos = results.features[i].attributes;
                  var rostro = document.getElementById("rostrosGaleria");
                  var imagenDIV = document.createElement('div');
                  imagenDIV.id = "rostros";
                  imagenDIV.name = datos.OBJECTID;
                  imagenDIV.onclick = function(){
                    grupoArmado = $("#grupoArmado"+this.name+"").html();
                    var palabra = $("#nombre"+this.name+"").html();
                    var nombreImprimir;
                    nombreImprimir = palabra;
                    document.getElementById("nombreDetallePopUpRostro").innerHTML = nombreImprimir.toUpperCase();
                    document.getElementById("popUpRostro").style.display = "block";
                    var url = $("#imagen"+this.name+"").html();
                    $('#imagenDetallePopUpRostro').css('background', "url('" + url + "') no-repeat center center");
                    $('#imagenDetallePopUpRostro').css('background-size', "contain");
                    var sexo = $("#sexo"+this.name+"").html();
                    var edad = $("#edad"+this.name+"").html();
                    var NumFecha = $("#fecha"+this.name+"").html();
                    if (NumFecha== "null") {
                      document.getElementById("fechaDetallesPopUpRostro").innerHTML ="Fecha: Sin Información";
                    }else{
                      NumFecha = parseInt(NumFecha);
                      var tiempo = new Date(NumFecha);
                      document.getElementById("fechaDetallesPopUpRostro").innerHTML = "Fecha: "+tiempo.getDate()+" de "+meses[tiempo.getMonth()]+" de "+tiempo.getFullYear()+"";
                    }
                    if (edad == "null") {
                      document.getElementById("edadDetallesPopUpRostro").innerHTML = "Sin Información";
                    }else{
                      document.getElementById("edadDetallesPopUpRostro").innerHTML = $("#edad"+this.name+"").html()+" años";
                    }
                    if (sexo == 1) {
                      document.getElementById("generoDetallesPopUpRostro").innerHTML = "Hombre";
                    }else if (sexo == 2) {
                      document.getElementById("generoDetallesPopUpRostro").innerHTML = "Mujer";
                    }else if(sexo == 3){
                      document.getElementById("generoDetallesPopUpRostro").innerHTML = "LGBTI";
                    }else
                      document.getElementById("generoDetallesPopUpRostro").innerHTML = "Sin Información";
                    var profesion = $("#profesion"+this.name+"").html();
                    if (profesion == "null") {
                      document.getElementById("profesionDetallesPopUpRostro").innerHTML = "Sin Información";
                    }else{
                      document.getElementById("profesionDetallesPopUpRostro").innerHTML = $("#profesion"+this.name+"").html();
                    }
                    if (grupoArmado == "null") {
                       document.getElementById("grupoArmadoRostro").innerHTML = "Grupo del que fue víctima: Sin Información";
                     }
                     else{
                       var grupoArmadoFinal;
                       if (grupoArmado == 1) {
                         grupoArmadoFinal= "FARC";
                       }
                       if (grupoArmado == 2) {
                         grupoArmadoFinal = "ELN";
                       }
                       if (grupoArmado == 3) {
                         grupoArmadoFinal = "PARAMILITARES";
                       }
                       if (grupoArmado == 4) {
                         grupoArmadoFinal = "BACRIM";
                       }
                       if (grupoArmado == 5) {
                         grupoArmadoFinal = "FUERZAS ARMADAS";
                       }
                       if (grupoArmado == 6) {
                         grupoArmadoFinal = "OTROS";
                       }
                       document.getElementById("grupoArmadoRostro").innerHTML= "Grupo del que fue víctima: " +grupoArmadoFinal;
                     }
                    if (($("#descripcion"+this.name+"").html() == "null") || ($("#descripcion"+this.name+"").html() == "")) {
                      document.getElementById("caracteristicas").style.display = "none";
                      document.getElementById("detallesPopUpRostro").style.height = "210px";
                      document.getElementById("detallesPopUpRostro").style.minHeight = "";
                    }else{
                      document.getElementById("caracteristicas").style.display = "block";
                      document.getElementById("caracteristicasDetallesPopUpRostro").innerHTML = $("#descripcion"+this.name+"").html();
                      document.getElementById("detallesPopUpRostro").style.height = "390px";
                      document.getElementById("detallesPopUpRostro").style.minHeight = "320px";
                    }
                    document.getElementById("lugarDetallesPopUpRostro").innerHTML= "Lugar: "+$("#lugar"+this.name+"").html();
                  };
                  imagenDIV.className = "rostro";
                  imagenDIV.style.margin = marginTop+"px 0 0 "+marginleft+"%";
                  var palabra = datos.Nombre;
                  var nombreImprimir;
                  if (palabra.length <= 18) {
                    nombreImprimir = palabra;
                  }
                  else{
                    nombreImprimir = palabra.substring(0, 18);
                  }
                  // imagenDIV.innerHTML += "<div class='fotoRostro' style=\"height:150px; width: 150px;opacity:0.25; background: url('"+imagen+"') no-repeat center center;background-size: contain;\"></div><div id='rostroImagen' class='nombreRostro'>"+nombreImprimir+"<p style='display:none' id='nombre"+datos.OBJECTID+"'>"+datos.Nombre+"</p><p style='display:none' id='imagen"+datos.OBJECTID+"'>"+imagen+"</p><p style='display:none' id='edad"+datos.OBJECTID+"'>"+datos.Edad+"</p><p style='display:none' id='fecha"+datos.OBJECTID+"'>"+datos.Fecha_Evento+"</p><p style='display:none' id='sexo"+datos.OBJECTID+"'>"+datos.Genero+"</p><p style='display:none' id='profesion"+datos.OBJECTID+"'>"+datos.Profesion+"</p><p style='display:none' id='descripcion"+datos.OBJECTID+"'>"+datos.Descripcion+"</p></div>";
                  imagenDIV.innerHTML += "<div class='fotoRostro' style=\"height:150px; width: 150px;opacity:0.25; background: url('"+imagen+"') no-repeat center center;background-size: contain;\"></div><div id='rostroImagen' class='nombreRostro'>"+nombreImprimir+"<p style='display:none' id='nombre"+datos.OBJECTID+"'>"+datos.Nombre+"</p><p style='display:none' id='imagen"+datos.OBJECTID+"'>"+imagen+"</p><p style='display:none' id='edad"+datos.OBJECTID+"'>"+datos.Edad+"</p><p style='display:none' id='fecha"+datos.OBJECTID+"'>"+datos.Fecha_Evento+"</p><p style='display:none' id='lugar"+datos.OBJECTID+"'>"+datos.Lugar+"</p><p style='display:none' id='sexo"+datos.OBJECTID+"'>"+datos.Genero+"</p><p style='display:none' id='profesion"+datos.OBJECTID+"'>"+datos.Profesion+"</p><p style='display:none' id='descripcion"+datos.OBJECTID+"'>"+datos.Descripcion+"</p><p style='display:none' id='grupoArmado"+datos.OBJECTID+"'>"+datos.Grupo_Armado+"</p></div>";
                  rostro.appendChild(imagenDIV);
                  if(i < results.features.length-1){
                    if((i+1)%6 != 0){
                      marginleft+= 16;
                    }else{
                      marginTop += 180;
                      marginleft = 0;
                    }
                    var numero = i+1;
                    CrearCampos(results,numero,marginleft,marginTop);
                  }else{
                    $("#cargandoFiltrosMapa").hide();
                  }
              });
            }
            function CreandoDiv(results){
              document.getElementById("rostrosGaleria").innerHTML="";
              CrearCampos(results,0,0,0);
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
                  case "lgbti":
                      filtroGenero = 'Genero=3';
                      break;
                  default:
                      alert("Por favor vuelva a seleccionar una edad");
                      break;
              }
              genero();
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

            /* consulta por grupo armado */
            $("#filtroGrupoArmado").change(function(){

              var seleccion = $("#filtroGrupoArmado").val();
              switch(seleccion) {
                case "grupo":
                    filtroGrupoRostros = "1=1";
                    break;
                case "1":
                  filtroGrupoRostros = "Grupo_Armado=1";
                    break;
                  case "2":
                    filtroGrupoRostros = "Grupo_Armado=2";
                    break;
                case "3":
                    filtroGrupoRostros = "Grupo_Armado=3";
                    break;
                case "4":
                    filtroGrupoRostros = "Grupo_Armado=4";
                    break;
                case "5":
                    filtroGrupoRostros = "Grupo_Armado=5";
                    break;
                case "6":
                    filtroGrupoRostros = "Grupo_Armado=6";
                    break;
                default:
                    alert("Por favor vuelva a seleccionar un grupo armado");
                    break;
            }
              filtroGrupoArmado();
             });


            /* consulta por rango de edad */
            function edad(){
              var paginas;
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.where = consultaRango+' AND '+filtroEdadMenor+' AND '+filtroEdadMayor+' AND '+filtroGenero+' AND '+filtroGrupoRostros+' AND Validado = 1';
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
              query.where = consultaRango+' AND '+filtroEdadMenor+' AND '+filtroEdadMayor+' AND '+filtroGenero+' AND '+filtroGrupoRostros+' AND Validado = 1';//+" AND "
              query.orderByFields = ["OBJECTID DESC"];
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(totalIds);
              document.getElementById("paginacion").innerHTML="";
              
            }

            /* consulta por Grupo Armado */
            function filtroGrupoArmado(){
              var paginas;
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.where = consultaRango+' AND '+filtroEdadMenor+' AND '+filtroEdadMayor+' AND '+filtroGenero+' AND '+filtroGrupoRostros+' AND Validado = 1';//+" AND "
              query.orderByFields = ["OBJECTID DESC"];
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(totalIds);
              document.getElementById("paginacion").innerHTML="";
              
            }

            /* consulta linea de tiempo rango de años 1990 a 1995 */
            function anterior(){
              $("#Edad").prop('selectedIndex',0);
              $("#Genero").prop('selectedIndex',0);
              $("#filtroGrupoArmado").prop('selectedIndex',0);
              if(anoSeleccionado!="anterior"){
                if(anoSeleccionado!="")
                  $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + ".png')");
                anoSeleccionado = "anterior";
                $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + "_seleccion.png')");
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
            }

            /* consulta linea de tiempo rango de años 1990 a 1995 */
            function primerAno(){
              $("#Edad").prop('selectedIndex',0);
              $("#Genero").prop('selectedIndex',0);
              $("#filtroGrupoArmado").prop('selectedIndex',0);
              if(anoSeleccionado!="primerAno"){
                if(anoSeleccionado!="")
                  $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + ".png')");
                anoSeleccionado = "primerAno";
                $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + "_seleccion.png')");
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
            }

            /* consulta linea de tiempo rango de años 1996 a 2000 */
            function segundoAno(){
              $("#Edad").prop('selectedIndex',0);
              $("#Genero").prop('selectedIndex',0);
              $("#filtroGrupoArmado").prop('selectedIndex',0);
              if(anoSeleccionado!="segundoAno"){
                if(anoSeleccionado!="")
                  $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + ".png')");
                anoSeleccionado = "segundoAno";
                $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + "_seleccion.png')");
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
            }

            /* consulta linea de tiempo rango de años 2001 a 2005 */
            function tercerAno(){
              $("#Edad").prop('selectedIndex',0);
              $("#Genero").prop('selectedIndex',0);
              $("#filtroGrupoArmado").prop('selectedIndex',0);
              if(anoSeleccionado!="tercerAno"){
                if(anoSeleccionado!="")
                  $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + ".png')");
                anoSeleccionado = "tercerAno";
                $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + "_seleccion.png')");
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
            }

            /* consulta linea de tiempo rango de años 2006 a 2010 */
            function cuartoAno(){
              $("#Edad").prop('selectedIndex',0);
              $("#Genero").prop('selectedIndex',0);
              $("#filtroGrupoArmado").prop('selectedIndex',0);
              if(anoSeleccionado!="cuartoAno"){
                if(anoSeleccionado!="")
                  $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + ".png')");
                anoSeleccionado = "cuartoAno";
                $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + "_seleccion.png')");
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
            }

            /* consulta linea de tiempo rango de años 2011 a 2014 */
            function quintoAno(){
              $("#Edad").prop('selectedIndex',0);
              $("#Genero").prop('selectedIndex',0);
              $("#filtroGrupoArmado").prop('selectedIndex',0);
              if(anoSeleccionado!="quintoAno"){
                if(anoSeleccionado!="")
                  $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + ".png')");
                anoSeleccionado = "quintoAno";
                $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + "_seleccion.png')");
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
            }

             /* consulta linea de tiempo rango de años 2015 en adelante */
            function actualidad(){
              $("#Edad").prop('selectedIndex',0);
              $("#Genero").prop('selectedIndex',0);
              $("#filtroGrupoArmado").prop('selectedIndex',0);
              if(anoSeleccionado!="actualidad"){
                if(anoSeleccionado!="")
                  $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + ".png')");
                anoSeleccionado = "actualidad";
                $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + "_seleccion.png')");
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
            }



            function totalIds(results){
              var nuevaPagina;
              arrayURL = [];
              totalArrays=[];
              if(results.length > 0){
                $("#cargandoFiltrosMapa").show();
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
                      $("#"+pagSeleccionada+"").removeClass("pagSeleccionada");
                      $("#"+pagina+"").addClass("pagSeleccionada");
                      pagSeleccionada = pagina;
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
                $("#0").addClass("pagSeleccionada");
                pintar2(totalArrays);
              }else{
                $("#rostrosGaleria").html("");
                document.getElementById("rostrosGaleria").innerHTML= "<p class='sinResultado'>No se encontraron resultados para esta búsqueda</p>";
              }
            }

          })
      });
function cerrarPopupRostro(){
              document.getElementById("popUpRostro").style.display= "none";
            }

function compartirGoogle(){
       $("#googlePlus").click();
     }
function limpiarFiltros(){
  var selectEdad = $("#Edad");
  var selectGenero = $("#Genero");
  var selectGrupo = $("#filtroGrupoArmado");
  if(selectEdad.val()!="edad" || selectGenero.val()!="genero" || selectGrupo.val()!="grupo" || anoSeleccionado != ""){
    if(anoSeleccionado!="")
      $("#"+anoSeleccionado).css('background', "url('imagenes/Fechas/" + anoSeleccionado + ".png')");
    anoSeleccionado = "";
    consultaRango = "1=1";
    filtroEdadMenor = "1=1";
    filtroEdadMayor = "1=1";
    filtroGenero = "1=1";
    filtroGrupoRostros = "1=1";
    selectGenero.prop('selectedIndex',0);
    selectGrupo.prop('selectedIndex',0);
    selectEdad.prop('selectedIndex',0).change();
  }
}

function mostrarCreditos(){
  $("#creditos").show();
  $("#creditos").animate({
    opacity: '+=1'
    });
}

function cerrarCreditos(){
  $("#creditos").animate({opacity: '-=1'}, "normal", function(){
    $("#creditos").hide();
  });
}