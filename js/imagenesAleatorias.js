var servicio = "http://services.arcgis.com/8DAUcrpQcpyLMznu/ArcGIS/rest/services/Reporte_Prohibido_Olvidar/FeatureServer/0";
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
          		var random = Math.floor((Math.random() * (results.length)) + 0);					
          		featureLayer.queryAttachmentInfos(results[random], function (infos) {
                    results.splice(random, 1);
          					if (infos.length>0) {
          						IDimagen += param+1;
          						document.getElementById(IDimagen).innerHTML= "<div class='fotoRostro' style=\"margin-left: auto;margin-right: auto;height:150px; width: 150px;opacity:0.25; background: url('"+infos[0].url+"') no-repeat center center;background-size: contain;\"></div>";
          						param++;
          						if(param !=3)
          							llenarImagenes(param, results);
          					}
          					else{
                      if(results.length>0)
          						  llenarImagenes(param, results);
          					}

          				});
          	}
          	function totalResultados(){
              var paginas;
              myFeatureLayer = new QueryTask(servicio);
              var query = new Query();
              query.where = "1=1 AND VALIDADO=1";
              Ids = myFeatureLayer.executeForIds(query);
              Ids.then(imagenesAleatorias);              
            }
           function pintarImagen(){
           		var imagen;
           }
          
        });
});