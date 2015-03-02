$( document ).ready(function() {
	var dias = {};
	dias['daysMin'] = ['LU','MA','MI','JU','VI','SA','DO'];
	dias['months'] = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
	dias['monthsShort'] = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
	$('#date').DatePicker({
		flat: true,
		date: '1111-11-11',
		current: '2008-07-29',
		calendars: 1,
		starts: 6,
		view: 'years',
		locale: dias,
	});
});

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