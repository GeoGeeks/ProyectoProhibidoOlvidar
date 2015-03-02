
$(document).ready(function(){
    $("#flechaDespliegue1").click(function(){
    	if($('#respuesta1').css('display') == 'none'){
    		$('#flechaDespliegue1').attr('src','imagenes/arrow_up_preguntasFrecuentes.png');
            $('#pregunta1').css('border-color', '#508DBC transparent #508DBC transparent');
    		
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
            $('#pregunta2').css('border-color', '#508DBC transparent #508DBC transparent');
            
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
            $('#pregunta3').css('border-color', '#508DBC transparent #508DBC transparent');
            
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
            $('#pregunta4').css('border-color', '#508DBC transparent #508DBC transparent');
            
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
            $('#pregunta5').css('border-color', '#508DBC transparent #508DBC transparent');
            
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
            $('#pregunta6').css('border-color', '#508DBC transparent #508DBC transparent');
            
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
            $('#pregunta7').css('border-color', '#508DBC transparent #508DBC transparent');
            
        }else{
            $('#flechaDespliegue7').attr('src','imagenes/arrow_down_preguntasFrecuentes.png');
            $('#pregunta7').css('border-color', '#738082 transparent #738082 transparent');
            
        }
        $("#respuesta7").animate({
            height: 'toggle'
        });         
    });

    
    
});

