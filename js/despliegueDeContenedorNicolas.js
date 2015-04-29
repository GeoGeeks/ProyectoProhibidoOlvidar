$(document).ready(function(){
  
  $("#cancelarUno").click(function(){
    window.location ="mapa.html";
  });

  $("#cancelarDos").click(function(){
     $('#formularioDos').css('display', 'none'); 
     $('.fotosAleatorias').css('display', 'none');
     $('#formulario').css('display', 'block');
     $("#body").css('height', '1248px');
  });
 
    $("#flechaDespliegue1").click(function(){
    	if($('#respuesta1').css('display') == 'none'){
    		$('#flechaDespliegue1').attr('src','imagenes/arrow_up_preguntasFrecuentes.png');
            $('#pregunta1').css('border-color', 'rgba(80, 141, 188, 0.4) transparent rgba(80, 141, 188, 0.4) transparent');
            $('#respuesta1').css('border-color', 'rgba(80, 141, 188, 0.4) transparent rgba(115, 128, 130, 0.4) transparent');
            $('#respuesta1').css('border-width', '2px');
    	}else{
    		$('#flechaDespliegue1').attr('src','imagenes/arrow_down_preguntasFrecuentes.png');
            $('#pregunta1').css('border-color', '#738082 transparent #738082 transparent');
    		
    	}
    	$("#respuesta1").animate({
            height: 'toggle'
        }); 
    });

    /* Pregunta 2 */
    $("#flechaDespliegue2").click(function(){
        if($('#respuesta2').css('display') == 'none'){
            $('#flechaDespliegue2').attr('src','imagenes/arrow_up_preguntasFrecuentes.png');
            $('#pregunta2').css('border-color', 'rgba(80, 141, 188, 0.4) transparent rgba(80, 141, 188, 0.4) transparent');
            $('#respuesta2').css('border-color', 'rgba(80, 141, 188, 0.4) transparent rgba(115, 128, 130, 0.4) transparent');
            $('#respuesta2').css('border-width', '2px');
            
        }else{
            $('#flechaDespliegue2').attr('src','imagenes/arrow_down_preguntasFrecuentes.png');
            $('#pregunta2').css('border-color', '#738082 transparent #738082 transparent');
            
        }
        $("#respuesta2").animate({
            height: 'toggle'
        });         
    });

    /* Pregunta 3*/
    $("#flechaDespliegue3").click(function(){
        if($('#respuesta3').css('display') == 'none'){
            $('#flechaDespliegue3').attr('src','imagenes/arrow_up_preguntasFrecuentes.png');
            $('#pregunta3').css('border-color', 'rgba(80, 141, 188, 0.4) transparent rgba(80, 141, 188, 0.4) transparent');
            $('#respuesta3').css('border-color', 'rgba(80, 141, 188, 0.4) transparent rgba(115, 128, 130, 0.4) transparent');
            $('#respuesta3').css('border-width', '2px');
            
        }else{
            $('#flechaDespliegue3').attr('src','imagenes/arrow_down_preguntasFrecuentes.png');
            $('#pregunta3').css('border-color', '#738082 transparent #738082 transparent');
            
        }
        $("#respuesta3").animate({
            height: 'toggle'
        });         
    });

    /* Pregunta 4*/
    $("#flechaDespliegue4").click(function(){
        if($('#respuesta4').css('display') == 'none'){
            $('#flechaDespliegue4').attr('src','imagenes/arrow_up_preguntasFrecuentes.png');
            $('#pregunta4').css('border-color', 'rgba(80, 141, 188, 0.4) transparent rgba(80, 141, 188, 0.4) transparent');
            $('#respuesta4').css('border-color', 'rgba(80, 141, 188, 0.4) transparent rgba(115, 128, 130, 0.4) transparent');
            $('#respuesta4').css('border-width', '2px');
            
        }else{
            $('#flechaDespliegue4').attr('src','imagenes/arrow_down_preguntasFrecuentes.png');
            $('#pregunta4').css('border-color', '#738082 transparent #738082 transparent');
            
        }
        $("#respuesta4").animate({
            height: 'toggle'
        });         
    });

    
    
 /* Pregunta 5*/
    $("#flechaDespliegue5").click(function(){
        if($('#respuesta5').css('display') == 'none'){
            $('#flechaDespliegue5').attr('src','imagenes/arrow_up_preguntasFrecuentes.png');
            $('#pregunta5').css('border-color', 'rgba(80, 141, 188, 0.4) transparent rgba(80, 141, 188, 0.4) transparent');
            $('#respuesta5').css('border-color', 'rgba(80, 141, 188, 0.4) transparent rgba(115, 128, 130, 0.4) transparent');
            $('#respuesta5').css('border-width', '2px');
            
        }else{
            $('#flechaDespliegue5').attr('src','imagenes/arrow_down_preguntasFrecuentes.png');
            $('#pregunta5').css('border-color', '#738082 transparent #738082 transparent');
            
        }
        $("#respuesta5").animate({
            height: 'toggle'
        });         
    });

     /* Pregunta 6*/
    $("#flechaDespliegue6").click(function(){
        if($('#respuesta6').css('display') == 'none'){
            $('#flechaDespliegue6').attr('src','imagenes/arrow_up_preguntasFrecuentes.png');
            $('#pregunta6').css('border-color', 'rgba(80, 141, 188, 0.4) transparent rgba(80, 141, 188, 0.4) transparent');
            $('#respuesta6').css('border-color', 'rgba(80, 141, 188, 0.4) transparent rgba(115, 128, 130, 0.4) transparent');
            $('#respuesta6').css('border-width', '2px');
            
        }else{
            $('#flechaDespliegue6').attr('src','imagenes/arrow_down_preguntasFrecuentes.png');
            $('#pregunta6').css('border-color', '#738082 transparent #738082 transparent');
            
        }
        $("#respuesta6").animate({
            height: 'toggle'
        });         
    });

     /* Pregunta 7*/
    $("#flechaDespliegue7").click(function(){
        if($('#respuesta7').css('display') == 'none'){
            $('#flechaDespliegue7').attr('src','imagenes/arrow_up_preguntasFrecuentes.png');
            $('#pregunta7').css('border-color', 'rgba(80, 141, 188, 0.4) transparent rgba(80, 141, 188, 0.4) transparent');
            $('#respuesta7').css('border-color', 'rgba(80, 141, 188, 0.4) transparent rgba(115, 128, 130, 0.4) transparent');
            $('#respuesta7').css('border-width', '2px');
            
        }else{
            $('#flechaDespliegue7').attr('src','imagenes/arrow_down_preguntasFrecuentes.png');
            $('#pregunta7').css('border-color', '#738082 transparent #738082 transparent');
            
        }
        $("#respuesta7").animate({
            height: 'toggle'
        });         
    });
    
    document.getElementById("examinar").onchange = function () {
        document.getElementById("foto").value = this.value;
    };

});


var foto=false,municipio=false;
var map, locator;
$( document ).ready(function() {
    require([
      "esri/map", "esri/tasks/locator", "esri/graphic",
      "esri/InfoTemplate", "esri/symbols/SimpleMarkerSymbol",
      "esri/symbols/Font", "esri/symbols/TextSymbol",
      "dojo/_base/array", "esri/Color",
      "dojo/number", "dojo/parser", "dojo/dom", "dijit/registry","esri/layers/FeatureLayer", "esri/geometry/Point", "esri/symbols/SimpleMarkerSymbol",
      "esri/Color","esri/graphic",

      "dijit/form/Button", "dijit/form/Textarea",
      "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"
    ], function(
      Map, Locator, Graphic,
      InfoTemplate, SimpleMarkerSymbol, 
      Font, TextSymbol,
      arrayUtils, Color,
      number, parser, dom, registry,FeatureLayer, Point, SimpleMarkerSymbol, Color,Graphic
    ) {
      var departamentos = 0;
      var genero = -1;

      $("#irPasoDos").click(function(){
      //    var fecha = ($('#dia').val()+"/"+$('#mes').val()+"/"+$('#ano').val());
          var alertaUno = "Por favor diligenciar los siguientes campos:\n ";
          var alertaDos = "";
          console.log("tamaño:"+alertaDos.length);
          var dia = $('#dia').val(), mes = $('#mes').val(), ano = $('#ano').val();
          $("#verificarCampos").attr("href", "#titulo");
          if($("#nombreVictima").val().length < 1){
              alertaDos = "-Nombre de la victima \n "; 
              $('#nombreObligatorio').css('display', 'block');
              $('#nombreVictima').css('border-color', '#4c637f');
              $("#verificarCampos").attr("href", "#formulario");
          }else{
              $('#nombreObligatorio').css('display', 'none');
              $('#nombreVictima').css('border-color', '#FFFFFF');
          }
          if(genero < 0){
              if(alertaDos.length < 1) 
                $("#verificarCampos").attr("href", "#contenedorGenero");
             alertaDos = alertaDos + "\n -Genero";
             $('#generoObligatorio').css('display', 'block'); 
             $('#contenedorGenero').css('margin-top', '54px');
          }else{
              $('#generoObligatorio').css('display', 'none'); 
              $('#contenedorGenero').css('margin-top', '54px');
          }
          if(departamentos < 1){
                if(alertaDos.length < 1) 
                  $("#verificarCampos").attr("href", "#contenedorDepto");
                alertaDos = alertaDos + "\n -Departamento";
                $('#deptoObligatorio').css('display', 'block'); 
                $('#departamentos').css('border-color', '#4c637f');
                $('#contenedorDepto').css('margin-top', '45px');
          }else{
                $('#deptoObligatorio').css('display', 'none'); 
                $('#departamentos').css('border-color', '#FFFFFF');
          }
          if(dia != "" || mes != "" || ano != ""){
            if(dia == "" || mes == "" || ano == ""){
              if(alertaDos.length < 1) 
                $("#verificarCampos").attr("href", "#denosFecha");
              alertaDos += "\n -Faltan campos en la fecha ingresada";
              $('#fechaIncorrecta').css('display', 'block'); 
              $('#fechaIncorrecta').html('Faltan campos en la fecha ingresada');
            }else{
              var fecha = dia + "/"+ mes +"/"+ano;
              console.log(fecha);
              if(existeFecha(fecha)){
                if(!validarFechaMenorActual(fecha)){
                  if(alertaDos.length < 1) 
                    $("#verificarCampos").attr("href", "#denosFecha");
                  alertaDos += "\n -Por favor seleccione una fecha menor a la actual";
                  $('#fechaIncorrecta').css('display', 'block'); 
                  $('#fechaIncorrecta').html('Por favor seleccione una fecha menor a la actual');
                }
              }else{
                if(alertaDos.length < 1) 
                  $("#verificarCampos").attr("href", "#denosFecha");
                alertaDos += "\n -La fecha ingresada no existe";
                $('#fechaIncorrecta').css('display', 'block'); 
                $('#fechaIncorrecta').html('La fecha ingresada no existe');
              }
            }
          }
          
          if(alertaDos.length > 1){
            //alert(alertaUno + " " + alertaDos);
          }else{
            //locate();
             $('#formulario').css('display', 'none');  
             $('#formularioDos').css('display', 'block'); 
             $('.fotosAleatorias').css('display', 'block');
             $("#formularioDos").css('height', '816px');
             $("#body").css('height', '997px');
          }
      });

      function validarFechaMenorActual(date){
            var x=new Date();
            var fecha = date.split("/");
            x.setFullYear(fecha[2],fecha[1]-1,fecha[0]);
            var today = new Date();
       
            if (x >= today)
              return false;
            else
              return true;
      }

      function existeFecha(fecha){
        var fechaf = fecha.split("/");
        var day = fechaf[0];
        var month = fechaf[1];
        var year = fechaf[2];
        var date = new Date(year,month,'0');
        if((day-0)>(date.getDate()-0)){
              return false;
        }
        return true;
      }

       

      $("#c1").click(function(){
          genero = 1;
          $('#lgbti').css('background', 'url(imagenes/radio.png) -28px top no-repeat');
          $('#mujer').css('background', 'url(imagenes/radio.png) -28px top no-repeat');
          $('#hombre').css('background', 'url(imagenes/radio.png) left top no-repeat');

      });
      $("#c2").click(function(){
          genero = 2;
          $('#lgbti').css('background', 'url(imagenes/radio.png) -28px top no-repeat');
          $('#hombre').css('background', 'url(imagenes/radio.png) -28px top no-repeat');
          $('#mujer').css('background', 'url(imagenes/radio.png) left top no-repeat');
      });
      $("#c3").click(function(){
          genero = 3;
          $('#lgbti').css('background', 'url(imagenes/radio.png) left top no-repeat');
          $('#hombre').css('background', 'url(imagenes/radio.png) -28px top no-repeat');
          $('#mujer').css('background', 'url(imagenes/radio.png) -28px top no-repeat');
      });

      $("#departamentos").change(function() {
          departamentos = 1;
      });
   
      $("#publicar").click(function(){
         locate();
      });

      parser.parse();
      locator = new Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
      locator.on("address-to-locations-complete", agregarPunto);

      // listen for button click then geocode
      //registry.byId("locate").on("click", locate);

      var featureLayer = new FeatureLayer("http://services.arcgis.com/8DAUcrpQcpyLMznu/arcgis/rest/services/Reporte_Prohibido_Olvidar/FeatureServer/0",{
          mode: FeatureLayer.MODE_ONDEMAND,
          outFields: ["*"]
        });
      featureLayer.on("edits-complete", agregarImagen);
      //map.infoWindow.resize(200,125);  
    function locate() {
     // map.graphics.clear();
      var address;
      if($("#municipios option:selected").text()!="Ciudades y municipios")
        address = {
          "SingleLine": $("#municipios option:selected").text()+", "+$("#departamentos option:selected").text()+", Colombia"
        };
      else
        address = {
          "SingleLine": "Departamento "+$("#departamentos option:selected").text()+", Colombia"
        };
      var options = {
        address: address,
        outFields: ["Loc_name"]
      };
      locator.addressToLocations(options);
    }

    function agregarPunto(evt) {
      var geom;
      arrayUtils.every(evt.addresses, function(candidate) {
        console.log(candidate.score);
        if (candidate.score > 80) {
          console.log(candidate.location);
          var attributes = { 
            address: candidate.address, 
            score: candidate.score, 
            locatorName: candidate.attributes.Loc_name 
          };   
          geom = candidate.location;
          var pt = new Point(geom.x,geom.y,geom.spatialReference)
          var sms = new SimpleMarkerSymbol().setStyle(
            SimpleMarkerSymbol.STYLE_SQUARE).setColor(
            new Color([255,0,0,0.5]));
          var select = document.getElementById("departamentos");
          var nombre = select.options[select.selectedIndex].innerHTML;
          var lugar = nombre;
          var municipio = $("#municipios option:selected").text();
          if(municipio!="Ciudades y municipios"){
           /* select = document.getElementById("municipios");
            nombre = select.options[select.selectedIndex].innerHTML;*/
            lugar +=","+municipio;
          }
          var fecha = ($('#ano').val()+"/"+$('#mes').val()+"/"+$('#dia').val()+" 06:00:00");
          console.log("tamaño:"+fecha.length)
          if(fecha.length<12)
            fecha = null;
          console.log("fecha:"+fecha);
          var attr = {"Nombre":$("#nombreVictima").val(), 
                      "Genero":genero,
                      "cod_dane":$("#departamentos").val(),
                      "Edad":$("#edad").val(),
                      "Fecha_Evento":fecha,
                      "Profesion":$("#profesion").val(),
                      "Descripcion":$("#descripcion").val(),
                      "Lugar":lugar,
                      "Grupo_Armado":$("#selectGrupoArmado").val(),
                      "Validado":0};
          console.log("attr",attr);
          var graphic = new Graphic(pt,sms,attr);
          featureLayer.applyEdits([graphic]);
          return false; //break out of loop after one candidate with score greater  than 80 is found.
        }
      });
      if ( geom !== undefined ) {
      }
    }
    function agregarImagen(evt){
        var objectId=evt.adds[0].objectId
        console.log("es:",evt.adds[0].objectId);
        featureLayer.addAttachment(objectId, document.getElementById("archivo") ,callback , function(err){console.log(err);});
    }
    function callback(result){  
      console.log(result);  
     }
    });
});


function cargarDeptos(){
      require([
        "esri/layers/FeatureLayer",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "dojo/parser",
        "dojo/ready"
      ], function (FeatureLayer,Query,QueryTask,parser,ready) {

        parser.parse();

        ready(function(){
          var myFeatureLayer;
          cargarDatos();

          function cargarDatos(){
            myFeatureLayer = new QueryTask("http://services.arcgis.com/8DAUcrpQcpyLMznu/arcgis/rest/services/Division_Departamental_Colombia/FeatureServer/0");
            var query = new Query();
            query.returnGeometry = false;
            query.outFields = ["DEPTO","COD_DEPTO"];
            query.where = "1=1";
            departamentos = myFeatureLayer.execute(query);
            departamentos.then(showResults);
        
          }

          function showResults(results) {
            var bogota = results.features[4].attributes;
            $("#departamentos").html($("#departamentos").html()+"<option value=\""+bogota.COD_DEPTO+"\">"+bogota.DEPTO+"</option>");

            for(var i=0;i<results.features.length;i++){
              var datos = results.features[i].attributes;
              if(datos.DEPTO != "BOGOTÁ D.C."){
                $("#departamentos").html($("#departamentos").html()+"<option value=\""+datos.COD_DEPTO+"\">"+datos.DEPTO+"</option>");
              }
            }
          }          
        });
      });
  }



  function cargarMunicipios(){
    $("#cargandoMunicipios").show();
    var depto = $("#departamentos").val();
    $("#municipios").html("<option value=\"\" disabled selected>Ciudades y municipios</option>");
    require([
        "esri/layers/FeatureLayer",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "dojo/parser",
        "dojo/ready"
      ], function (FeatureLayer,Query,QueryTask,parser,ready) {

        parser.parse();

        ready(function(){
          var myFeatureLayer;
          cargarDatos();
          function cargarDatos(){
            myFeatureLayer = new QueryTask("http://54.187.22.10:6080/arcgis/rest/services/TESIS/Tesis/MapServer/1");
            var query = new Query();
            query.returnGeometry = false;
            query.outFields = ["NOMBRE_ENT","COD_MUNICI"];
            query.where = "COD_DEPART='"+depto+"'";
            query.orderByFields = ["NOMBRE_ENT ASC"];
            departamentos = myFeatureLayer.execute(query);
            departamentos.then(showResults);
          }

          function showResults(results) {
            for(var i=0;i<results.features.length;i++){
              var datos = results.features[i].attributes;
              $("#municipios").html($("#municipios").html()+"<option value=\""+datos.COD_MUNICI+"\">"+datos.NOMBRE_ENT+"</option>");
            }
            $("#cargandoMunicipios").hide();
          }          
        });
      });
  }


function compartirGoogle(){
       $("#googlePlus").click();
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