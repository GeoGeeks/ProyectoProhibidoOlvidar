var filtroEdadMapaMenor ="1=1",filtroEdadMapaMayor ="1=1", filtroGeneroMapa="1=1", filtroGrupoMapa="1=1", capaPuntosMapa, victimas = [], meses=[],viejoId, validado="Validado = 1";
meses[0]="Enero";meses[1]="Febrero";meses[2]="Marzo";meses[3]="Abril";meses[4]="Mayo";meses[5]="Junio";meses[6]="Julio";meses[7]="Agosto";meses[8]="Septiembre";meses[9]="Octubre";meses[10]="Noviembre";meses[11]="Diciembre";
function inicialFormulario(){
	cargarDeptos();
	var dias = {};
	dias['daysMin'] = ['LU','MA','MI','JU','VI','SA','DO'];
	dias['months'] = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
	dias['monthsShort'] = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
	$('#date').DatePicker({
		flat: true,
		date: '1111-11-11',
		current: '2008-07-29',
		calendars: 1,
		starts: 6,
		view: 'years',
		locale: dias,
		prev: "<",
		next: ">"
	});
	var fecha = 2015;
	while(fecha>1849){
		$('#ano').html($('#ano').html()+'<option value="'+fecha+'">'+fecha+'</option>');
		fecha--;
	}
	var edad = 0;
	while(edad<121){
		$('#edad').html($('#edad').html()+'<option value="'+edad+'">'+edad+'</option>');
		edad++;
	}
}
function inicialMapa(){
	var map = L.map('mapa',{
		minZoom : 5,
		maxZoom : 12
	}).setView([ 4.283532, -73.352951], 5);
  	//L.esri.basemapLayer('http://54.187.22.10:6080/arcgis/rest/services/Prohibido_olvidar/MAPABASE/MapServer').addTo(map);
  	L.esri.tiledMapLayer("http://54.187.22.10:6080/arcgis/rest/services/Prohibido_olvidar/MAPABASE/MapServer", {}).addTo(map);
  	//L.esri.basemapLayer('DarkGray').addTo(map);
  	/*L.esri.featureLayer('http://54.187.22.10:6080/arcgis/rest/services/TESIS/Tesis/MapServer/0',{
  		style: function (feature) {
	        return {opacity: 1,fillColor: '#1E1C21', color: '#62A1B3', weight: 1.5, fillOpacity: 1};
	    }
  	}).addTo(map);*/

	var mapaDeptal = L.esri.featureLayer('http://services.arcgis.com/8DAUcrpQcpyLMznu/arcgis/rest/services/Division_Departamental_Colombia/FeatureServer/0', {
		simplifyFactor: 0.35,
    	precision: 5,
		fields: ['DEPTO',"OBJECTID","COD_DEPTO"],
		style: function(feature) {
		  return {
		    color: 'transparent'
		  }
		}
	}).addTo(map);

	var queryDeptal = L.esri.Tasks.query({
	    url: 'http://services.arcgis.com/8DAUcrpQcpyLMznu/arcgis/rest/services/Reporte_Prohibido_Olvidar/FeatureServer/0'
	});


	$("#cerrarPopUpMapa").click(function(){
		$("#popUpMapa").hide();
	});

  	capaPuntosMapa = L.esri.clusteredFeatureLayer('http://services.arcgis.com/8DAUcrpQcpyLMznu/arcgis/rest/services/Reporte_Prohibido_Olvidar/FeatureServer/0', {
    spiderfyOnMaxZoom:false,
    where : validado,
    disableClusteringAtZoom: 16,
    polygonOptions: {
      color: 'transparent',
      weight: 4,
      opacity: 1,
      fillOpacity: 0.5
    },
    // this function defines how the icons
    // representing  clusters are created
    iconCreateFunction: function(cluster) {
      // get the number of items in the cluster
      var count = cluster.getChildCount();


      // figure out how many digits long the number is
      var digits = (count+'').length;
      // return a new L.DivIcon with our classes so we can
      // style them with CSS. Take a look at the CSS in
      // the <head> to see these styles. You have to set
      // iconSize to null if you want to use CSS to set the
      // width and height.
      return new L.DivIcon({
        html: count,
        className:'cluster digits-'+digits,
        iconSize: null
      });
    }
  	}).addTo(map);
	capaPuntosMapa.bindPopup(function(feature){
		//verPopUp();
		var tiempo = new Date(parseInt(L.Util.template('{Fecha_Evento}', feature.properties)));
		if(tiempo == "Invalid Date")
			var texto = L.Util.template('{"Nombre":"{Nombre}","Genero":"{Genero}","lugar":"{Lugar}","Edad":"{Edad}","Fecha":"Sin Información","Profesion":"{Profesion}" }', feature.properties);
		else
			var texto = L.Util.template('{"Nombre":"{Nombre}","Genero":"{Genero}","lugar":"{Lugar}","Edad":"{Edad}","Fecha":"'+tiempo.getDate()+' de '+meses[tiempo.getMonth()]+' de '+tiempo.getFullYear()+'","Profesion":"{Profesion}" }', feature.properties);
		var victima = JSON.parse(texto);
		victimas[feature.id] = victima;
		return  null; // L.Util.template('<strong>Nombre:{Nombre}</strong><br><strong>Edad:{Edad}</strong><br><strong>Grupo:{Grupo_Armado}</strong>', feature.properties);
	});

	mapaDeptal.on('mouseover', function(e){
		mapaDeptal.resetStyle(viejoId);
		viejoId = e.layer.feature.id;
		queryDeptal.where("Validado = 1 AND cod_dane='"+e.layer.feature.properties.COD_DEPTO+"'");
		$("#descripcionDeptoMapa").html(e.layer.feature.properties.DEPTO);
		queryDeptal.count(function(error, count, response){
			$("#totalDescripcionDeptoMapa").html(count+" víctimas");
		});
		mapaDeptal.setFeatureStyle(e.layer.feature.id, {
		  color: '#3E6380',
		  weight: 3,
		  opacity: 1
		});
	});
	mapaDeptal.on('click', function(e){
		//window.location = "rostrosMapa.html?tit=CUndimarca&depto=91";
		window.location = "rostrosMapa.html?tit="+e.layer.feature.properties.DEPTO+"&depto="+e.layer.feature.properties.COD_DEPTO;
	});
  	capaPuntosMapa.on('clusterclick', function (a) {
    	if(map.getZoom()==12){
    		var nodos = a.layer.getAllChildMarkers();
    		var ids = "";
    		for (var i = 0; i < nodos.length; i++) {
    			if(i<nodos.length-1)
    				ids += nodos[i].feature.properties.OBJECTID+",";
    			else
    				ids += nodos[i].feature.properties.OBJECTID;
    		}
    		window.location = "rostrosMapa.html?tit="+nodos[0].feature.properties.Lugar+"&ids="+ids;
    	}
    return false;
	});
	capaPuntosMapa.on('click', function(e) {
		$("#cargandoFiltrosMapa").show();
    	verPopUp(victimas[e.layer.feature.id],e.layer.feature.id);
	});
}

function obtenerTotalVictimas(id){

}

function verPopUp(victima, id){
	var nombre;
	if (victima.Nombre.length <= 18) {
	  nombre = victima.Nombre;
	}
	else{
	  nombre = victima.Nombre.substring(0, 18);
	}
	$("#nombreDetallePopUpMapa").html(nombre.toUpperCase());
	var genero;
	(victima.Genero == 1 ) ? genero = "Hombre" : (victima.Genero == 2 ) ? genero = "Mujer" :  genero = "Sin Información";
	$("#generoDetallesPopUpMapa").html(genero);
	$("#lugarDetallesPopUpMapa").html("Lugar: "+victima.lugar);
	(victima.Edad != "null" ) ? $("#edadDetallesPopUpMapa").html(victima.Edad+" años") : $("#edadDetallesPopUpMapa").html("Edad: Sin Información");
	(victima.Fecha != "null" ) ? $("#fechaDetallesPopUpMapa").html("Fecha: "+victima.Fecha) : $("#fechaDetallesPopUpMapa").html("Fecha: Sin Información");
	(victima.Profesion != "null" ) ? $("#profesionDetallesPopUpMapa").html(victima.Profesion) : $("#profesionDetallesPopUpMapa").html("Profesión: Sin Información");
	obtenerImagen(id);
}

function verCalendario(){
	$('#backgroundPopUp').show();
}
/*Obtiene la fecha que se ha seleccionado en el componente del calendario,
  en caso de que el usuario no haya seleccionado ninguna fecha se enviara un null*/
function Obtenerfecha(){
	try{
		var Obtenerfecha = $('#date').DatePickerGetDate(true);
		if(Obtenerfecha != '1111-11-11')
			return Obtenerfecha;
		else
			return null;
	}catch(err){
		return null;
	}
}
function cerraCalendario(){
	var fechaSeparada = Obtenerfecha().split("-");
	$('#dia').val(fechaSeparada[2]);
	$('#mes').val(fechaSeparada[1]);
	$('#ano').val(fechaSeparada[0]);
	$('#backgroundPopUp').hide();
}

function filtrarEdadMapa(){
	$("#cargandoFiltrosMapa").show();
	var seleccion = $("#filtroEdadMapa").val();
	switch(seleccion) {
	    case "edad":
	        filtroEdadMapaMenor = "1=1";
	        filtroEdadMapaMayor = "1=1";
	        break;
	    case "0-4":
	    	filtroEdadMapaMenor = 'Edad>=0';
	        filtroEdadMapaMayor = 'Edad<=4';
	        break;
        case "5-11":
        	filtroEdadMapaMenor = 'Edad>=5';
	        filtroEdadMapaMayor = 'Edad<=11';
	        break;
    	case "12-25":
			filtroEdadMapaMenor = 'Edad>=12';
	        filtroEdadMapaMayor = 'Edad<=25';
	        break;
        case "26-40":
        	filtroEdadMapaMenor = 'Edad>=26';
	        filtroEdadMapaMayor = 'Edad<=40';
	        break;
	    case "41-64":
        	filtroEdadMapaMenor = 'Edad>=41';
	        filtroEdadMapaMayor = 'Edad<=64';
	        break;
	    case "65":
        	filtroEdadMapaMenor = 'Edad>=65';
	        filtroEdadMapaMayor = '1=1';
	        break;
	    default:
	        alert("Por favor vuelva a seleccionar una edad");
	        break;
	}
	capaPuntosMapa.setWhere(filtroEdadMapaMenor+' AND '+filtroEdadMapaMayor+' AND '+filtroGeneroMapa+' AND '+filtroGrupoMapa+' AND '+validado,function(){
		$("#cargandoFiltrosMapa").hide();
	});
}
function filtrarGeneroMapa(){
	$("#cargandoFiltrosMapa").show();
	var seleccion = $("#filtroGeneroMapa").val();
	switch(seleccion) {
	    case "genero":
	        filtroGeneroMapa = "1=1";
	        break;
	    case "fem":
	    	filtroGeneroMapa = "Genero=2";
	        break;
        case "mas":
        	filtroGeneroMapa = "Genero=1";
	        break;
	    default:
	        alert("Por favor vuelva a seleccionar un genéro");
	        break;
	}
	capaPuntosMapa.setWhere(filtroEdadMapaMenor+' AND '+filtroEdadMapaMayor+' AND '+filtroGeneroMapa+' AND '+filtroGrupoMapa+' AND '+validado,function(){
		$("#cargandoFiltrosMapa").hide();
	});
}
function filtrarGrupoMapa(){
	$("#cargandoFiltrosMapa").show();
	var seleccion = $("#filtroGrupoMapa").val();
	switch(seleccion) {
	    case "grupo":
	        filtroGrupoMapa = "1=1";
	        break;
	    case "1":
	    	filtroGrupoMapa = "Grupo_Armado=1";
	        break;
        case "2":
        	filtroGrupoMapa = "Grupo_Armado=2";
	        break;
	    case "3":
        	filtroGrupoMapa = "Grupo_Armado=3";
	        break;
	    case "4":
        	filtroGrupoMapa = "Grupo_Armado=4";
	        break;
	    default:
	        alert("Por favor vuelva a seleccionar un grupo armado");
	        break;
	}
	capaPuntosMapa.setWhere(filtroEdadMapaMenor+' AND '+filtroEdadMapaMayor+' AND '+filtroGeneroMapa+' AND '+filtroGrupoMapa+' AND '+validado,function(){
		$("#cargandoFiltrosMapa").hide();
	});
}

function obtenerImagen(id){
	require([
        "dojo/parser",
        'esri/layers/FeatureLayer',
        "dojo/ready"
      ], function (parser,FeatureLayer,ready) {
          parser.parse();
          var servicio = new FeatureLayer('http://services.arcgis.com/8DAUcrpQcpyLMznu/arcgis/rest/services/ProhibidoOlvidar/FeatureServer/0');
          servicio.on("load", function () {
          	servicio.queryAttachmentInfos(id, agregarImagen, function(err){console.log(err);});
          });
          function agregarImagen(imgs){
          	if(imgs.length>0)
          		$("#imagenDetallePopUpMapa").attr('src', imgs[0].url);
          	else
          		$("#imagenDetallePopUpMapa").attr('src',"imagenes/default.png");
          	$("#popUpMapa").show();
          	$("#cargandoFiltrosMapa").hide();
          }
      });
}