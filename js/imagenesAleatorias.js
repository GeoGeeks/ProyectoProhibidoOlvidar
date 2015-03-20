var servicio = "http://services.arcgis.com/8DAUcrpQcpyLMznu/arcgis/rest/services/ProhibidoOlvidar/FeatureServer/0";
var totalArrays=[];
var arrayURL=[];
var featureLayer;

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

          	totalResultados();

          	function imagenesAleatorias(results){
          		var totaliamgenes=0;          		
          		featureLayer = new esri.layers.FeatureLayer(servicio, {
                      mode: FeatureLayer.MODE_ONDEMAND
              });

          		llenarImagenes(totaliamgenes, results);
          	}
          	function llenarImagenes(param, results){
          		var IDimagen = "imagen";
          		var random = Math.floor((Math.random() * (results.length)) + 1);					
          		featureLayer.queryAttachmentInfos(results[random], function (infos) {
          					if (infos.length>0) {
          						results.splice(random, 1);
          						IDimagen += param+1;
          						document.getElementById(IDimagen).innerHTML= "<img  height='150' width='150' style='opacity:0.25' src="+infos[0].url+">"
          						//console.log("valor para el ID",IDimagen);
          						//console.log("entro y muestra", infos[0].url);

          						param++;
          						if(param !=3)
          							llenarImagenes(param, results);
          					}
          					else{
          						llenarImagenes(param, results);
          					}

          				});
          	}
          	function totalResultados(){
              var paginas;
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.where = "1=1";
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(imagenesAleatorias);              
            }
           function pintarImagen(){
           		var imagen;
           }
          
        });
});