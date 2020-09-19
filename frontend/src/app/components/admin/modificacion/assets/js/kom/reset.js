
var f__reset_tab__text = function(vf__canvas){
	
	// enable
	vf__canvas.getObjects().forEach(function (target) {
		if(target.type == "textbox"){				
			f__unlock_object(target, vf__canvas);
		}			
	});
	
	vf__canvas.discardActiveObject().renderAll();
		
	// -----------------------------------------------------------------	
	// transparency
	$('.cl__span_ir_transparency_text').text(100);
	$('.cl__ir_transparency').val(100);
	
	// radius
	$('.cl__span_ir_radius_text').text(600);
	$('.cl__ir_radius').val(600);
	
	// line height
	$('.cl__span_ir_lineheight_text').text(1);
	$('.cl__ir_lineheight').val(1)
	
	// rotate angle
	$('.cl__span_ir_rotate_text').text(Math.ceil(0));
	$('.cl__ir_rotate').val(0);
	
	// -----------------------------------------------------------------
	$('.cl__cb_curve_text').prop('checked', false);
	$('.cl__cb_reverse_text').prop('checked', false);
	$('#lock').prop('checked', false);
	
};
