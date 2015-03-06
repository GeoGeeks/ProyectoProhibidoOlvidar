var filtroEdadMapaMenor ="1=1",filtroEdadMapaMayor ="1=1", filtroGeneroMapa="1=1", filtroGrupoMapa="1=1", capaPuntosMapa;
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
}
function inicialMapa(){
	var map = L.map('mapa').setView([ 4.283532, -73.352951], 5);
  	console.log(L, L.esri);
  	//L.esri.basemapLayer('http://54.187.22.10:6080/arcgis/rest/services/Prohibido_olvidar/MAPABASE/MapServer').addTo(map);
  	L.esri.tiledMapLayer("http://54.187.22.10:6080/arcgis/rest/services/Prohibido_olvidar/MAPABASE/MapServer", {}).addTo(map);
  	//L.esri.basemapLayer('DarkGrayLabels').addTo(map);
  	/*L.esri.featureLayer('http://54.187.22.10:6080/arcgis/rest/services/TESIS/Tesis/MapServer/0',{
  		style: function (feature) {
	        return {opacity: 1,fillColor: '#1E1C21', color: '#62A1B3', weight: 1.5, fillOpacity: 1};
	    }
  	}).addTo(map);*/

  	capaPuntosMapa = L.esri.clusteredFeatureLayer('http://services.arcgis.com/8DAUcrpQcpyLMznu/arcgis/rest/services/ProhibidoOlvidar/FeatureServer/0', {
    spiderfyOnMaxZoom:false,
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
		return L.Util.template('<strong>Nombre:{Nombre}</strong><br><strong>Edad:{Edad}</strong><br><strong>Grupo:{Grupo_Armado}</strong>', feature.properties);
	});
  	capaPuntosMapa.on('clusterclick', function (a) {
    console.log("Hola");
    return false;
});
}
function verCalendario(){
	$('#backgroundPopUp').show();
}
function mostrar(){
	console.log(Obtenerfecha());
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
	capaPuntosMapa.setWhere(filtroEdadMapaMenor+' AND '+filtroEdadMapaMayor+' AND '+filtroGeneroMapa+' AND '+filtroGrupoMapa,function(){
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
	capaPuntosMapa.setWhere(filtroEdadMapaMenor+' AND '+filtroEdadMapaMayor+' AND '+filtroGeneroMapa+' AND '+filtroGrupoMapa,function(){
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
	capaPuntosMapa.setWhere(filtroEdadMapaMenor+' AND '+filtroEdadMapaMayor+' AND '+filtroGeneroMapa+' AND '+filtroGrupoMapa,function(){
		$("#cargandoFiltrosMapa").hide();
	});
}