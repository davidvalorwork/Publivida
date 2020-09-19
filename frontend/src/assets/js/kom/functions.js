// ================================================================= fungsi-fungsi

	// @---------------------------------------------------------------- f__init
	var f__init = function(){
		//'use strict';
		fabric.Object.prototype.setControlsVisibility( {
			ml: false,
			mr: false,
			mt: false,
			mb: false
		} );
		
		// customize icon controls
		fabric.Canvas.prototype.customiseControls({			
			tl: {
				action: function( e, target ) {		
					var v__o_id = target.get('id');
					
					canvas.discardActiveObject();
					canvas.remove(target);
					canvas.renderAll();
					
					
					// history
					// tentukan indeks views
					var vl__views = ['front','right','back','left'];
					var p = 0;
					$.each(vl__views, function(i,o){
						if(vs__views_port == o){
							p = i;
						}
					});		
					// hapus history
					var vl__history_new = [];
					vl__history_undo[p].forEach(function(target){
						if(target.id != v__o_id){
							vl__history_new.push(target);
						}
					});
					
					vl__history_undo[p] = new Array();
					vl__history_undo[p] = [];
					vl__history_undo[p] = vl__history_new;
					//
				},
				cursor: 'pointer'
			},
			tr: {
				action: 'rotate',				
				cursor: 'pointer'
			},
			bl: {
				action: function(e, target){
					console.log(target);
					target.clone(function(clone) {
						canvas.add(clone.set({
							left: target.left + (target.width/4), 
							top: target.top + (target.top/4),
							hasRotatingPoint: false
						})).setActiveObject(clone);
					});
				},			
				cursor: 'pointer'
			},
			br: {
				action: 'scale',				
				cursor: 'pointer'
			}
		}, function() { canvas.renderAll(); });
			
		// corner icons
		fabric.Object.prototype.customiseCornerIcons({
			settings: {
				borderColor: 'black',
                cornerSize: 20,
                cornerBackgroundColor: 'black',
                cornerShape: 'circle',
                cornerPadding: 10,
                hoverCursor: 'pointer'
			},
			tl: {				
				icon: v__url_domain + '/assets/icons/fa-trash.svg'
			},
			tr: {				
				icon: v__url_domain + '/assets/icons/fa-rotate.svg'
			},
			bl: {
				icon: v__url_domain + '/assets/icons/fa-clone.svg'				
			},
			br: {				
				icon: v__url_domain + '/assets/icons/fa-resize.svg'
			}
		}, function() { canvas.renderAll(); });
		
	};
	
	
	// @---------------------------------------------------------------- f__load_product
	var f__load_product = function(){
		
		el_product_img = $('.cl__product_img');
		//el_product_img_h = el_product_img.height();
		//el_product_img_w = el_product_img.width();
		
		el_product_img_h = el_product_img[0].naturalHeight;
		el_product_img_w = el_product_img[0].naturalWidth;
		
		// ------------------------------------------------------------- front
		el__canvas_front = document.createElement("canvas");  
		canvas__front_id = 'id__front_canvas';   
		canvas__front_class = 'cl__front_canvas';
		
		el__canvas_front.id = canvas__front_id;
		el__canvas_front.className = canvas__front_class;
		
		el__canvas_front.height = el_product_img[0].naturalHeight;
		el__canvas_front.width = el_product_img[0].naturalWidth;		
		
		el__canvas_front.style.zIndex = zindex; 
		//el__canvas.hoverCursor = 'pointer';	
		
		parentDiv.append(el__canvas_front);
		
		// el__canvas masuk di canvas
		canvas_front = new fabric.Canvas(canvas__front_id);
		canvas_front.selection = true; 
		
		// set front canvas bg
		canvas_front.setBackgroundImage(el_product_img.attr('src'), canvas_front.renderAll.bind(canvas_front), {
			top: 0,
			left: 0,
			originX: 'left',
			originY: 'top',
			width: el_product_img[0].naturalWidth, 
			height: el_product_img[0].naturalHeight
		});
		canvas_front.renderAll();
		
		// ------------------------------------------------------------- back
		
		//
		el_product_img_back = $('.cl__product_img_back');
		el_product_img_back.hide();
		el__canvas_back = document.createElement("canvas");  
		canvas__back_id = 'id__back_canvas';   
		canvas__back_class = 'cl__back_canvas';
		
		el__canvas_back.id = canvas__back_id;
		el__canvas_back.className = canvas__back_class;
		
		el__canvas_back.height = el_product_img[0].naturalHeight;
		el__canvas_back.width = el_product_img[0].naturalWidth;		
		
		el__canvas_back.style.zIndex = zindex; 		
		//el__canvas.hoverCursor = 'pointer';	
		
		parentDiv.append(el__canvas_back);
		
		// el__canvas masuk di canvas
		canvas_back = new fabric.Canvas(canvas__back_id);
		canvas_back.selection = true;
		//canvas.backgroundColor="red";
		// set canvas bg
		canvas_back.setBackgroundImage(el_product_img_back.attr('src'), canvas_back.renderAll.bind(canvas_back), {
			top: 0,
			left: 0,
			originX: 'left',
			originY: 'top',
			width: el_product_img[0].naturalWidth, 
			height: el_product_img[0].naturalHeight
		});
		canvas_back.renderAll();
		
		// ------------------------------------------------------------- left
		
		//
		el_product_img_left = $('.cl__product_img_left');
		el_product_img_left.hide();
		el__canvas_left = document.createElement("canvas");  
		canvas__left_id = 'id__left_canvas';   
		canvas__left_class = 'cl__left_canvas';
		
		el__canvas_left.id = canvas__left_id;
		el__canvas_left.className = canvas__left_class;
		
		el__canvas_left.height = el_product_img[0].naturalHeight;
		el__canvas_left.width = el_product_img[0].naturalWidth;		
		
		el__canvas_left.style.zIndex = zindex; 		
		//el__canvas.hoverCursor = 'pointer';	
		
		parentDiv.append(el__canvas_left);
		
		// el__canvas masuk di canvas
		canvas_left = new fabric.Canvas(canvas__left_id);
		canvas_left.selection = true;
		
		// set canvas bg
		canvas_left.setBackgroundImage(el_product_img_left.attr('src'), canvas_left.renderAll.bind(canvas_left), {
			top: 0,
			left: 0,
			originX: 'left',
			originY: 'top',
			width: el_product_img[0].naturalWidth, 
			height: el_product_img[0].naturalHeight
		});
		canvas_left.renderAll();
		
		// ------------------------------------------------------------- right
		
		//
		el_product_img_right = $('.cl__product_img_right');
		el_product_img_right.hide();
		el__canvas_right = document.createElement("canvas");  
		canvas__right_id = 'id__right_canvas';   
		canvas__right_class = 'cl__right_canvas';
		
		el__canvas_right.id = canvas__right_id;
		el__canvas_right.className = canvas__right_class;
		
		el__canvas_right.height = el_product_img[0].naturalHeight;
		el__canvas_right.width = el_product_img[0].naturalWidth;		
		
		el__canvas_right.style.zIndex = zindex; 		
		//el__canvas.hoverCursor = 'pointer';	
		
		parentDiv.append(el__canvas_right);
		
		// el__canvas masuk di canvas
		canvas_right = new fabric.Canvas(canvas__right_id);
		canvas_right.selection = true;
		
		// set canvas bg
		canvas_right.setBackgroundImage(el_product_img_right.attr('src'), canvas_right.renderAll.bind(canvas_right), {
			top: 0,
			left: 0,
			originX: 'left',
			originY: 'top',
			width: el_product_img[0].naturalWidth, 
			height: el_product_img[0].naturalHeight
		});
		canvas_right.renderAll();
		
		// ------------------------------------------------------------- iteration display
		// iteration display
		$('.canvas-container').each(function(i,o){
			console.log(o.children[0].id);
			console.log($(o));			
			
			if(o.children[0].id == "id__front_canvas"){
				$(this).attr('style','visibility:visible').attr('style','display:flex');
			}else{
				$(this).attr('style','visibility:hidden').attr('style','display:none');
			}
		});
		
		// ------------------------------------------------------------- init canvas & front canvas background
		el__canvas = el__canvas_front;
		canvas = canvas_front;
		
		// font
		f__load_use_font(vs__font, canvas_front);
	};
	
	// @---------------------------------------------------------------- f__load_product_ajax	
	var f__load_product_ajax = function(){
		
		// canvas
		el__canvas = document.createElement("canvas");  
		id = 'id__front_canvas';      
		el__canvas.id = id;
		el__canvas.className = 'cl__front_canvas';
		
		// url
		var v__url_im = "http://localhost/customim/assets/images/products/white/front-white.png";
		
		jQuery.ajax({
			url: v__url_im,
			cache:false,
			xhr:function(){
				var xhr = new XMLHttpRequest();
				xhr.responseType= 'blob'
				return xhr;
			},
			success: function(data){
				console.log(data);
				var img = $('#id__product_img');
				var url = window.URL || window.webkitURL;
				img.src = url.createObjectURL(data);				
				
				// canvas
				el__canvas.height = img[0].naturalHeight;
				el__canvas.width = img[0].naturalWidth;		
				el__canvas.style.zIndex = zindex; 
				el__canvas.hoverCursor = 'pointer';	
				
				parentDiv.append(el__canvas);
				
				// fc
				canvas = new fabric.Canvas(id);
				canvas.selection = true; 
				
				//
				f__change_product_color();				
			},
			error:function(){
				
			}
		});
		
		
	};
	
	// @---------------------------------------------------------------- f__change_product_color
	var f__change_product_color = function(){
		
		// ------------------------------------------------------------- front
		el_product_img = $('.cl__product_img');
		//el_product_img_h = el_product_img.height();
		//el_product_img_w = el_product_img.width();
		
		el_product_img_h = el_product_img[0].naturalHeight;
		el_product_img_w = el_product_img[0].naturalWidth;
		
		canvas_front.setBackgroundImage(el_product_img.attr('src'), canvas_front.renderAll.bind(canvas_front), {
			top: 0,
			left: 0,
			originX: 'left',
			originY: 'top',
			width: el_product_img[0].naturalWidth, 
			height: el_product_img[0].naturalHeight
		});
		canvas_front.renderAll();
		
		// ------------------------------------------------------------- back
		el_product_img_back = $('.cl__product_img_back');		
		
		canvas_back.setBackgroundImage(el_product_img_back.attr('src'), canvas_back.renderAll.bind(canvas_back), {
			top: 0,
			left: 0,
			originX: 'left',
			originY: 'top',
			width: el_product_img[0].naturalWidth, 
			height: el_product_img[0].naturalHeight
		});
		canvas_back.renderAll();
		
		// ------------------------------------------------------------- left
		el_product_img_left = $('.cl__product_img_left');		
		
		canvas_left.setBackgroundImage(el_product_img_left.attr('src'), canvas_left.renderAll.bind(canvas_left), {
			top: 0,
			left: 0,
			originX: 'left',
			originY: 'top',
			width: el_product_img[0].naturalWidth, 
			height: el_product_img[0].naturalHeight
		});
		canvas_left.renderAll();
		
		// ------------------------------------------------------------- right
		el_product_img_right = $('.cl__product_img_right');		
		
		canvas_right.setBackgroundImage(el_product_img_right.attr('src'), canvas_right.renderAll.bind(canvas_right), {
			top: 0,
			left: 0,
			originX: 'left',
			originY: 'top',
			width: el_product_img[0].naturalWidth, 
			height: el_product_img[0].naturalHeight
		});
		canvas_right.renderAll();
		
		//
		
		
	};
	
	    
	// @---------------------------------------------------------------- f__select_text_align  
	var f__select_text_align = function(vf__text_align){
		
		var vl__aligns = ['left','center','right'];
		
		$.each(vl__aligns , function (index, value){
			if(vf__text_align == value){
				$('.cl_lb__text_align[for="text-' + value + '"]')
					.css('background-color','#989898');
			}else{
				$('.cl_lb__text_align[for="text-' + value + '"]')
					.css('background-color','transparent');
			}
		});
		
		/* $('.cl_lb__text_align').each(function(i, o) {
			var v__text_align = o.attributes.for.nodeValue.split("-");
			if(v__text_align[1] == vf__text_align){
				$('.cl_lb__text_align[for="text-' + vf__text_align + '"]')
					.css('background-color','#989898');
			}
		}); */
		
	};
	    
    // @---------------------------------------------------------------- f__create_text
    
    var f__create_text = function(vf_o__options){
		console.log('-- vf_o__options: ');
		console.log(vf_o__options);
		console.log('## vf_o__options: ');
		
		f__init();
		var v__id_textbox = 'id__textbox_' + cl__text;
		var v__text_textbox = vs__text_textbox;
		var o__textbox = new fabric.Textbox(v__text_textbox, {
			id: v__id_textbox,
			left: vf_o__options.pointer.x, // vf_o__options.e.layerX,
			top: vf_o__options.pointer.y,
			width: 150,
			lineHeight: 1,
			fontSize: vs__font_size,
			originX: 'center',
			originY: 'center',
			fontFamily: vs__font,
			fill: vs__color,
			borderColor: 'black',
			hasRotatingPoint: false,
			hoverCursor: 'pointer',
			textAlign: vs__textalign
			//breakWords: true,
			//splitByGrapheme: true			
		});
		
		// bold?
		if(vb_state__text_bold) o__textbox.set("fontWeight", "bold");
		
		// italic?
		if(vb_state__text_italic) o__textbox.set("fontStyle", "italic");
		
		// underline?
		if(vb_state__text_underline) o__textbox.set("textDecoration", "underline")
					.set('underline',true)
					.set('dirty',true);
		
		canvas.set({uniScaleTransform: true, 
			lockUniScaling: true,
			hoverCursor: 'pointer',
			moveCursor: 'pointer'});
		//
		//o__textbox.set('fill','black');
		canvas.add(o__textbox)
			.setActiveObject(o__textbox);			
		
			
		//o__textbox.enterEditing();
		//o__textbox.hiddenTextarea.focus();
		//fonts.unshift(vs__font);
		
		//canvas.getActiveObject(); //.set("fontFamily", "Inconsolata");
		canvas.requestRenderAll();
		
		// reset komponen
		//$('#reverse_text').prop('checked', false);
		//$('#lock').prop('checked', false);
		
		cl__text = cl__text + 1;
		
		//============================= reset komponen kustomasi
		$('#lock').prop('checked', false);
	};
	
	// @---------------------------------------------------------------- f__textbox_editable
	var f__textbox_editable = function(vf__canvas){
		if(vf__canvas.getActiveObject() != null){
			if(vf__canvas.getActiveObject().get('editable')){
				return true;
			}else{
				return false;
			}
		}
	}
	
	// @---------------------------------------------------------------- f__object_rotation
	
	var f__object_rotation = function(vf__object, vf__canvas){
		v_o__active_object = vf__canvas.getActiveObject();
			
		if(v_o__active_object && v_o__active_object.type == "textbox"){
			var v__angle = v_o__active_object.get("angle");
			$('.cl__span_ir_rotate_text').text(Math.ceil(v__angle));
			$('.cl__ir_rotate').val(v__angle);
			vf__canvas.requestRenderAll();
		}
	};

	// @---------------------------------------------------------------- f__load_use_font
	var f__load_use_font = function(vf__font, vf__canvas) {
		var v__selected_font = new FontFaceObserver(vf__font);
		v__selected_font.load()
		.then(function() {		  
			vf__canvas.getActiveObject().set("fontFamily", vf__font);
			vf__canvas.requestRenderAll();
		}).catch(function(e) {
			//console.log(e);		  
		});
	};

	// @---------------------------------------------------------------- f__lock_object
	var f__lock_object = function(vf_o__object, vf__o_canvas){
		
		if(vf_o__object != null && vf__o_canvas != null){
			//vf_o__product_img.set('id', vf__id);
			//vf_o__object.set('selectable', false);
			vf_o__object.set('lockMovementX', true);
			vf_o__object.set('lockMovementY', true);
			vf_o__object.set('lockScalingX', true);
			vf_o__object.set('lockScalingY', true);
			vf_o__object.set('lockSkewingX', true);
			vf_o__object.set('lockSkewingY', true);
			vf_o__object.set('lockUniScaling', true);
			vf_o__object.set('lockRotation', true);
			vf_o__object.set('lockScalingFlip', true);
			vf_o__object.set('hasControls', false);
			
			// -- special case
			if(vf_o__object.isType('textbox')){
				console.log('-- ini textbox');
				vf_o__object.set('editable', false);
			}
			
			vf__o_canvas.requestRenderAll();
		}
		//console.log(vf_o__object);
	}
	
	// @---------------------------------------------------------------- f__unlock_object
	var f__unlock_object = function(vf_o__object, vf__o_canvas){
		
		if(vf_o__object != null && vf__o_canvas != null){
			//vf_o__product_img.set('id', vf__id);
			//vf_o__object.set('selectable', true);
			vf_o__object.set('lockMovementX', false);
			vf_o__object.set('lockMovementY', false);
			vf_o__object.set('lockScalingX', false);
			vf_o__object.set('lockScalingY', false);
			vf_o__object.set('lockSkewingX', false);
			vf_o__object.set('lockSkewingY', false);
			vf_o__object.set('lockUniScaling', false);
			vf_o__object.set('lockRotation', false);
			vf_o__object.set('lockScalingFlip', false);
			vf_o__object.set('hasControls', true);
			
			// -- special case
			if(vf_o__object.isType('textbox')){
				console.log('-- ini textbox');
				vf_o__object.set('editable', true);
			}
			
			vf__o_canvas.requestRenderAll();
		}
		//console.log(vf_o__object);
	}
	
	// @---------------------------------------------------------------- f__download_image
	var f__download_image = function(vf__canvas){		
		var o__img = vf__canvas.toDataURL({
			 format: 'png',
			 multiplier: 3
		}).replace("image/png", "image/octet-stream");
		$('.cl__item_menu_download').attr("href", o__img);
		$('.cl__item_menu_download').attr("download", 'product-' + vs__views_port + '.png');
	};

	// @---------------------------------------------------------------- f__print_canvas
	var f__print_canvas = function(vf__canvas){
		var o__canvas = vf__canvas.toDataURL("image/png")
			.replace("image/png", "image/octet-stream");  
		var windowContent = '<!DOCTYPE html>';
		windowContent += '<html>'
		windowContent += '<head><title>Print Product ' + vs__views_port.charAt(0).toUpperCase() + vs__views_port.slice(1) + ' View</title></head>';
		windowContent += '<body>'
		windowContent += '<div align="center"><img src="' + o__canvas + '" onload=window.print();window.close();></div>';
		windowContent += '</body>';
		windowContent += '</html>';
		var printWin = window.open('', '', 'width=' + vf__canvas.width + ',height=' + vf__canvas.height);
		printWin.document.open();
		printWin.document.write(windowContent);
	}

	// @---------------------------------------------------------------- f__radius_text
	var f__radius_text = function(){
		// ambil text
		v_o__active_object = canvas.getActiveObject();
		if(v_o__active_object && v_o__active_object.isType('curved-text')){
			v_o__active_object.set(diameter, vRadius);
		}
				
		// set posisi checked
		/* var v_b__status_curve_text = $('.cl__cb_curve_text').is(":checked");
		if(!v_b__status_curve_text){			
			$('.cl__cb_curve_text').prop('checked', true);
		}else{			
			$('.cl__cb_curve_text').prop('checked', false);
		} */
		
		// render ulang canvas
		canvas.requestRenderAll();
	}	
	
	// @---------------------------------------------------------------- f__handle_image
	var f__handle_image = function(e){
		
		if(vs__tab == "image"){
			
			var reader = new FileReader();
			reader.onload = function(event){
				var o__im = new Image();
				
				o__im.onload = function(){					
					f__load_image(o__im);
				}				
				o__im.src = event.target.result;
				
			}
			
			reader.readAsDataURL(e.target.files[0]);
		}     
	}
	
	// @---------------------------------------------------------------- f__scale_asp_ratio
	function f__scale_asp_ratio(vf__im_w, vf__im_h, vf__w_max, vf__h_max){
	  return(Math.min((vf__w_max/vf__im_w),(vf__h_max/vf__im_h)));
	}
	
	
	// @---------------------------------------------------------------- f__load_image
	var f__load_image = function(vf_o__image){
		
		f__init();
		
		var o__img_item_src = vf_o__image;
		o__img_item_src.className  = "cl__image_upload";
		
		// scaling
		var v__scale_w = parseFloat((el_product_img.width() * 80)/100);
		var v__scale_h = parseFloat((el_product_img.height() * 80)/100);
		
		var o_resize = f__scale_asp_ratio(
			o__img_item_src.width,
			o__img_item_src.height,
			v__scale_w,
			v__scale_h
		);
		
		// kalkulasi posisi tengah
		var vCenterPosH = (parseInt(el_product_img.height()) - parseInt(o__img_item_src.height * o_resize))/2;
		var vCenterPosW = (parseInt(el_product_img.width()) - parseInt(o__img_item_src.width * o_resize))/2;
		
		var o__image_fab = new fabric.Image(o__img_item_src, {
			id: 'id__c_item_' + cl__img,
			left: vCenterPosW,
			top: vCenterPosH,
			hasRotatingPoint: false,
			hoverCursor: 'pointer'
		},
		function(item, object) {
			object.set('id', item.getAttribute('id'));			
			group.push(object);
		});			
		
		o__image_fab.scaleToHeight(o__img_item_src.height * o_resize);
		o__image_fab.scaleToWidth(o__img_item_src.width * o_resize);
		o__image_fab.set('selectable', true);
		
		canvas.set({
			uniScaleTransform: false, // proporsional: false
			lockUniScaling: false, // proporsional: false
			hasRotatingPoint: false
		});
		
		canvas.add(o__image_fab)
				.calcOffset()
				.renderAll();	
		cl__img = cl__img + 1;		
	}

	// @---------------------------------------------------------------- f__mouse_down
	var f__mouse_down = function(vs__tab, options){
		if(vs__tab == "text"){
			try{				
				if(options.target.type != null){
					
					//console.log('-- options: ');
					//console.log(vs__tab, options.e.clientX, options.e.clientY, options.target.type);
					//console.log(options);
					
					if(options.target.type == "path"){
						f__create_text(options);
					}
					
					if(options.target.type == "textbox"){
						$('.cl__cb_curve_text').prop('checked', false);
						
						
						if(options.target.get("text").trim() != ""){
							
							//==========================================
							console.log(options.target.get("fontFamily"));
							vs__font = options.target.get("fontFamily");
							
							/* $('.font-select option').removeAttr('selected')
								 .filter('[value="' + vs__font + '"]')
									 .attr('selected', true); */
							
							$('.font-select option').removeAttr('selected');
							$('.font-select option[value="' + vs__font + '"]').prop("selected", true);
;
							
							
							//==========================================
							// reverse aka flipX
							//var v_b__status_reverse_text = $('.cl__cb_reverse_text').is(":checked");
							//if(options.target.get("flipX")){
							$('.cl__cb_reverse_text').prop('checked', false);
							
							//if(v_b__status_reverse_text){
							//	$('.cl__cb_reverse_text').prop('checked', true);
							//}else{
							//	$('.cl__cb_reverse_text').prop('checked', false);
							//}
							
							// lock
							if(options.target.get('editable')){
								$('#lock').prop('checked', false);
							}else{
								$('#lock').prop('checked', true);
							}
							//==========================================
							
							// opacity
							var v__opacity = options.target.get('opacity');													
							$('.cl__span_ir_transparency_text').text(v__opacity * 100);
							$('.cl__ir_transparency').val(v__opacity * 100);
							
							// rotation
							var v__angle = options.target.get('angle');
							$('.cl__span_ir_rotate_text').text(Math.ceil(v__angle));
							$('.cl__ir_rotate').val(v__angle);
						}
					}
					
					if(options.target.type == "curved-text"){
						$('.cl__cb_curve_text').prop('checked', true);
					}
				}
			}catch(e){				
				f__create_text(options);
				$('.cl__cb_curve_text').prop('checked', false);
				$('.cl__cb_reverse_text').prop('checked', false);
			}		  
		}
		
		if(vs__tab == "image"){
			try{				
				if(options.target.type != null){
					
					console.log('-- options: ');
					console.log(vs__tab, options.e.clientX, options.e.clientY, options.target.type);
					console.log(options);
					
					
				}
			}catch (e) {
				
			}		  
			
		}	
		
	};
	
	
	// @---------------------------------------------------------------- f__canvas_on__object_added
	var f__canvas_on__object_added = function(e){
		// tentukan indeks views
		var vl__views = ['front','right','back','left'];
		var p = 0;
		$.each(vl__views, function(i,o){
			if(vs__views_port == o){
				p = i;
			}
		});		
	
		console.log('-- f__canvas_on__object_added->p: ' + p);
		//
		
		var o__fab = e.target;
		
		// add to history
		console.log('-- id: ' + o__fab.get('id'));
		console.log('-- x: ' + o__fab.get('top') + ', y: ' + o__fab.get('left'));			
		
		var v__o_id = o__fab.get('id');
		var v__o_ob = JSON.parse(JSON.stringify(o__fab));
		
		var o = {'id':v__o_id, 'ev':'added', 'ob': v__o_ob};
		
		vl__history_undo[p].push(o);
		vl__history_undo[p].push(o);
	};
	
	// @---------------------------------------------------------------- f__canvas_on__object_modified
	var f__canvas_on__object_modified = function(e){
		
		// tentukan indeks views
			var vl__views = ['front','right','back','left'];
			var p = 0;
			$.each(vl__views, function(i,o){
				if(vs__views_port == o){
					p = i;
				}
			});	
			
			console.log('-- f__canvas_on__object_modified->p: ' + p);
			
			//
			
			vb_hist[p] = false;
			
			var o__fab = e.target;
			
			// add to history
			console.log('-- id: ' + o__fab.get('id'));
			console.log('-- x: ' + o__fab.get('top') + ', y: ' + o__fab.get('left'));			
			
			var v__o_id = o__fab.get('id');
			var v__o_ob = JSON.parse(JSON.stringify(o__fab));
			
			var o = {'id':v__o_id, 'ev':'modified', 'ob': v__o_ob};
			
			vl__history_undo[p].push(o);
	};
	
	// @---------------------------------------------------------------- f__undo_action
	var f__undo_action = function(vf__canvas){
		
		// tentukan indeks views
		var vl__views = ['front','right','back','left'];
		var p = 0;
		$.each(vl__views, function(i,o){
			if(vs__views_port == o){
				p = i;
			}
		});		
		
		console.log('-- p: ' + p);
		//
		
		var n = vl__history_undo[p].length;
		var o_hist = (n > 0) ? vl__history_undo[p][n-1] : null;
		
		if(n > 0 && !vb_hist[p]){			
			if(o_hist != null) vl__history_redo[p].push(o_hist);
			vl__history_undo[p].pop();
			vb_hist[p] = true;
		}
		
		
		n = vl__history_undo[p].length;
		
		if(n > 0){			
			console.log('-- vl__history_undo: ' + n);
			o_hist = vl__history_undo[p][n-1];
			var o_hist__id = o_hist.id;
			var o_hist__ev = o_hist.ev;
			var o_hist__ob = o_hist.ob;
		
			// hitung banyak history sebuah id
			var m = 0;
			vl__history_undo[p].forEach(function(object){
				if(object.id == o_hist__id){
					m = m + 1;
				}				
			});
			
			console.log('-- m: ' + m);
						
			// bila history sebuah id sisa 1, remove object[id]
			if(m == 1){
				
				var o__all = vf__canvas.getObjects();
				
				if(o__all.length > 0){
					o__all.forEach(function(o) {
					  if(o.id == o_hist__id) {	
						vl__history_redo[p].push(o_hist); // ke larik redo				
						vf__canvas.remove(o);
						vf__canvas.renderAll();					
						vl__history_undo[p].pop();	// hapus dari history			
					  }
					});
				}else{
					console.log('m == 1 -- o__all.lengt == 0');
					vl__history_redo[p].push(o_hist); // ke larik redo											
					vl__history_undo[p].pop();					
				}
			}
			
			// bila lebih dari 1, set opsi
			if(m > 1){
				// iterasi object
				console.log('-- iterasi m > 1');
				var o__all = vf__canvas.getObjects();
				//console.log(o__all);
				
				if(o__all.length > 0){
					o__all.forEach(function(o) {
						console.log('--o: ' + o + ' -- o.id: ' + o.id + " -- o_hist__id: " + o_hist__id);
						if(o.id == o_hist__id) {
							console.log("o.id == o_hist__id");
							vl__history_redo[p].push(o_hist); // ke larik redo
							o.set(o_hist__ob);
							o.setCoords();
							vf__canvas.renderAll();					
							vl__history_undo[p].pop();				
						}else{
							console.log("o.id != o_hist__id");
						}	
						
					});
				}else{
					console.log('-- else -- o_hist__id: ' + o_hist__id);
					console.log('-- type: ' + o_hist.ob.type);
					
					var o = null;
					
					if(o_hist.ob.type == "curved-text"){
						var v__id_textbox_curved = 'id__textbox_' + cl__text + '_curved';
						o = new fabric.CurvedText(o_hist.ob.text);
						o.set(o_hist.ob);
						o.set('id', v__id_textbox_curved);
						o.set("hasRotatingPoint", false);
						cl__text = cl__text + 1;
					}
					
					if(o_hist.ob.type == "textbox"){
						var v__id_textbox = 'id__textbox_' + cl__text;
						o = new fabric.Textbox(o_hist.ob.text);
						o.set(o_hist.ob);
						o.set('id', v__id_textbox);
						o.set("hasRotatingPoint", false);
						cl__text = cl__text + 1;
					}
					
					vl__history_redo[p].push(o_hist); // ke larik redo
					o.set(o_hist__ob);
					o.setCoords();
					vf__canvas.add(o).renderAll();					
					vl__history_undo[p].pop();
				}
			}
			
		}		
		
		vb_redo[p] = false;
		//canvas.undo();
		
	};
	

	// @---------------------------------------------------------------- f__get_browser_h
	var f__get_browser_w = function() {
	  return Math.max(
		document.body.scrollWidth,
		document.documentElement.scrollWidth,
		document.body.offsetWidth,
		document.documentElement.offsetWidth,
		document.documentElement.clientWidth
	  );
	}
	
	// @---------------------------------------------------------------- f__get_browser_h
	var f__get_browser_h = function() {
	  return Math.max(
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.offsetHeight,
		document.documentElement.clientHeight
	  );
	}

	// @---------------------------------------------------------------- f__window_adaptive_content_load
	var f__window_adaptive_content_load = function(){		
			
		var o__parent_w = $('.item-mid-column').get(0).clientWidth;
		var o__parent_h = $('.item-mid-column').get(0).clientHeight;
		//console.log(o__parent_w, o__parent_h);
		
		$('#id__product_img').attr('height', o__parent_h + 'px');
		var o__img_w = 	$('#id__product_img').get(0).clientWidth;
		
		el_product_img_h = o__parent_h; 
		el_product_img_w = o__img_w;			
		
		$('.canvas-container').each(function(i,o){			
			console.log(o.children[0].id);
			//console.log($(o));			
			
			if(o.children[0].id == "id__front_canvas"){					
				canvas_front.setWidth(o__img_w);
				canvas_front.setHeight(o__parent_h);
				canvas_front.calcOffset();
				
				canvas_front.renderAll();
				
				$(o.children[0]).attr('width', o__img_w + 'px').attr('height', o__parent_h + 'px');
				$(o.children[1]).attr('width', o__img_w + 'px').attr('height', o__parent_h + 'px');
				
				$(this).css('position','absolute');
			}
		});
		
		// root problem
		if(f__get_browser_w() > f__get_browser_h()){ // landscape
			$('.root').css('max-height','84vh');
		}else{
			$('.root').css('max-height','90vh');
		}
		
	};

	// @---------------------------------------------------------------- f__window_adaptive_content
	var f__window_adaptive_content = function(){
		if(vs__views_port == "front") canvas = canvas_front;
		if(vs__views_port == "right") canvas = canvas_right;
		if(vs__views_port == "back") canvas = canvas_back;
		if(vs__views_port == "left") canvas = canvas_left;
			
		var o__parent_w = $('.item-mid-column').get(0).clientWidth;
		var o__parent_h = $('.item-mid-column').get(0).clientHeight;
		//console.log(o__parent_w, o__parent_h);
			
		$('#id__product_img').attr('height', o__parent_h + 'px');
		var o__img_w = 	$('#id__product_img').get(0).clientWidth;
		
		el_product_img_h = o__parent_h; 
		el_product_img_w = o__img_w;			
		
		$('.canvas-container').each(function(i,o){			
			console.log(o.children[0].id);
			//console.log($(o));			
			
			if(o.children[0].id == "id__" + vs__views_port + "_canvas"){					
				canvas.setWidth(o__img_w);
				canvas.setHeight(o__parent_h);
				canvas.calcOffset();
				
				canvas.renderAll();
				
				$(o.children[0]).attr('width', o__img_w + 'px').attr('height', o__parent_h + 'px');
				$(o.children[1]).attr('width', o__img_w + 'px').attr('height', o__parent_h + 'px');
				
				$(this).css('position','absolute');
			}
		});		
		
		// root problem
		if(f__get_browser_w() > f__get_browser_h()){ // landscape
			$('.root').css('max-height','84vh');
		}else{
			$('.root').css('max-height','90vh');
		}
		
	};
	
	// @---------------------------------------------------------------- f__window_adaptive_content
	var f__change_view_port = function(vf__canvas, vf__curr_id, vf__curr_class, vf__view_port){
		var o__parent_w = $('.item-mid-column').get(0).clientWidth;
		var o__parent_h = $('.item-mid-column').get(0).clientHeight;
			
		$('#id__product_img').attr('height', o__parent_h + 'px');
		var o__img_w = 	$('#id__product_img').get(0).clientWidth;
		
		$('#id__product_img_back').attr('height', o__parent_h + 'px');
		//var o__img_w = 	$('#id__product_img_back').get(0).clientWidth;
		console.log('-- o__img_h: ' + o__parent_h);
		console.log('-- o__img_w: ' + o__img_w);
		
		el_product_img_h = o__parent_h; 
		el_product_img_w = o__img_w;
		
		// scaling
		var o__img_back = $('#id__product_img_back').get(0);
		console.log('-- o__img_back.naturalWidth: ' + o__img_back.naturalWidth);
		
		vf__canvas.backgroundImage.scaleToWidth(o__img_w);
		vf__canvas.backgroundImage.scaleToHeight(o__parent_h);
		vf__canvas.setDimensions({width: o__img_w, height: o__parent_h});
		
		// iterate display
		$('.canvas-container').each(function(i,o){			
			if(o.children[0].id == vf__curr_id){
				$(o.children[0]).attr('width', o__img_w + 'px').attr('height', o__parent_h + 'px');
				$(o.children[1]).attr('width', o__img_w + 'px').attr('height', o__parent_h + 'px');
				
				$(this).attr('style','visibility:visible').attr('style','display:flex');
				$(this).css({'position':'absolute','height':o__parent_h + 'px', 'width':o__img_w + 'px'});				
			}else{
				$(this).attr('style','visibility:hidden').attr('style','display:none');
			}
		});
		
						
		vf__canvas.discardActiveObject().calcOffset().renderAll();
		canvas = vf__canvas;	
		
		// tampilan link active
		$('.cl__view_product').each(function(i,o){
			if($(this).hasClass(vf__curr_class)){
				$(this).addClass('active');
			}else{
				$(this).removeClass('active');
			}
		});
		
		// view status
		vs__views_port = vf__view_port;
		
		// tab
		f__reset_tab__text(vf__canvas);
		
	};

