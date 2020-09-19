	
	// @----------------------------------------------------------------
	// @ URL
	
	var v__url_domain = "http://localhost/customim"
	
	// @----------------------------------------------------------------
	var vl__history_undo = [[],[],[],[]]; // front
		
	var vl__history_redo = [[],[],[],[]];
	
	var i__h = 0; // history counter
	var vb_hist = [false, false, false, false];
	var vb_redo = [false, false, false, false];
	
	// @----------------------------------------------------------------
	var v_o__active_object = null;
	var vs__views_port = "front";
	
	// @----------------------------------------------------------------
	var parentDiv = $('.item-mid-column');
	//var parentContainer = $('.canvas-container');
	//var parentDiv = $('#id__parent_canvas');
	var canvas = null, 
		canvas_front = null, 
		canvas_back = null,
		canvas_left = null,
		canvas_right = null;
		
	var ol__img_item = [];
	var group = [];
	var group__fb = new fabric.Group(group, {
		subTargetCheck: true
	});
	var canvas__front_id = null, 
		canvas__back_id = null,
		canvas__left_id = null,
		canvas__right_id = null;
		
	var canvas__front_class = null, 
		canvas__back_class = null,
		canvas__left_class = null,
		canvas__right_class = null;
		
	var el_product_img = null,
		el_product_img_back = null,
		el_product_img_left = null,
		el_product_img_right = null;
	var el_product_img_h = null;
	var el_product_img_w = null;
	
	var el__canvas = null, 
		el__canvas_front = null,
		el__canvas_back = null,
		el__canvas_left = null,
		el__canvas_right = null;
		
	var cl__img = 0;
	var cl__text = 0;
	var zindex = 15;
	
	// @----------------------------------------------------------------
	
	// tabs
	var vs__tab = "";
		
	// @----------------------------------------------------------------
	
	// tab: text
	var vs__text_textbox = 'Start type here';
	var vs__font_size = 20;
	
	// color
	var vs__color = "black";
	var vs__color_text = "black";
	
	// fonts
	var vs__font = "Acme";
	
	// textAlign
	var vs__textalign = "center";
	
	// bold
	var vb_state__text_bold = false;
	
	// italic
	var vb_state__text_italic = false;
	
	// underline
	var vb_state__text_underline = false;
	
	// transparency/opacity
	var vs__opacity = 100;
	
	// radius
	var vs__radius = 600;
	
	// lineheight
	var vs__lineheight = 1;
	
	// rotate
	var vs__rotate_angle = 0;
	
	// @----------------------------------------------------------------
	
	var vl__curved_text = [];
	
	// @----------------------------------------------------------------
	
	// qr button
	var vb_item_menu_qrcode = false;	

	// @----------------------------------------------------------------
	var vl__object_status_lock = [];
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


	// @---------------------------------------------------------------- initialization
	f__init();
	
	f__select_text_align(vs__textalign);
	
	// @----------------------------------------------------------------	
	// =================================================================
	// tab: product / image / text
	// =================================================================
	
	// @---------------------------------------------------------------- product tab
	
	$("#product-tab").prop("checked", true);
	 
	$('.cl__text_product').on('click', function (e) {
		//e.preventDefault();
		vs__tab = "product";
	});
	
	// @---------------------------------------------------------------- image tab
	$('.cl__text_image').on('click', function (e) {
		//e.preventDefault();
		vs__tab = "image";
		
		// disable
		canvas.getObjects().forEach(function (target) {
			if(target.type == "textbox"){
				console.log('-- lock: ' + target);
				f__lock_object(target, canvas);
			}			
		});
		
		canvas.discardActiveObject().renderAll();
	});
	
	// @---------------------------------------------------------------- text tab
	$('.cl__text_tab').on('click', function (e) {
		//e.preventDefault();
		vs__tab = "text";
		
		if(vs__views_port == "front") f__reset_tab__text(canvas_front);
		if(vs__views_port == "right") f__reset_tab__text(canvas_right);
		if(vs__views_port == "back") f__reset_tab__text(canvas_back);
		if(vs__views_port == "left") f__reset_tab__text(canvas_left);
	});
	
	
	// @---------------------------------------------------------------- background/product image
	
	f__load_product();
	
	
	// @---------------------------------------------------------------- menu close mobile
	$('#menu-close-label').click(function(e){
		
		var o__canvas_color = null;
		
		if(vs__views_port == "front") o__canvas_color = canvas_front;
		if(vs__views_port == "right") o__canvas_color = canvas_right;
		if(vs__views_port == "back") o__canvas_color = canvas_back;
		if(vs__views_port == "left") o__canvas_color = canvas_left;
		
		f__change_view_port(o__canvas_color, 
			"id__" + vs__views_port + "_canvas", 
			"cl__" + vs__views_port + "_view_product", vs__views_port);
	});
	// @---------------------------------------------------------------- product colour button
	
	$('.product-color-select[for="product-white"]').css('border-radius','100% 0% 100% 100%');
	$('.product-color-select').click(function(e){
		e.preventDefault();
		
		//if(f__textbox_editable(canvas)){
			var vl__color = $(this).attr('for').split('product-');
			var v__color = vl__color[1].replace('-',' ');
			
			$('.product-color-select').css('border-radius','100% 100% 100% 100%');
			$(this).css('border-radius','100% 0% 100% 100%');
			//$(this).css('border-top-right-radius','0% !important');
			
			// http://localhost/customim/assets/images/products/white/front-white.png
			var v__url_im_front = v__url_domain + "/assets/images/products/" + vl__color[1] + "/front-";
			v__url_im_front = v__url_im_front + vl__color[1] + ".png";
			
			
			jQuery.ajax({
				url: v__url_im_front,
				cache:false,
				xhr:function(){
					var xhr = new XMLHttpRequest();
					xhr.responseType= 'blob'
					return xhr;
				},beforeSend: function() {
					$('.product-color-select[for="product-' + vl__color[1] + '"]')
						.addClass('fas fa-spinner fa-spin')
						.css('color','white').css('border-radius','100% 100% 100% 100%');
					$('.cl__front_view_product').text('').append('<i class="fas fa-spinner fa-spin cl__loader_front"></i>');
				},complete: function(){
					$('.cl__front_view_product').remove('.cl__loader_front');
					$('.cl__front_view_product').text('Front');
					 
					if(vs__views_port == "front"){
						$('.product-color-select[for="product-' + vl__color[1] + '"]')
							.removeClass('fas fa-spinner fa-spin')
							.css('color','white').css('border-radius','100% 0% 100% 100%');
					}
				},
				success: function(data){
					console.log(data);
					var img = document.getElementById('id__product_img');
					var url = window.URL || window.webkitURL;
					var binaryData = [];
					binaryData.push(data);					
					img.src = url.createObjectURL(new Blob(binaryData, {type: "image/png"}))
					
					f__change_product_color();
					//if(f__change_product_color()) f__change_view_port(canvas_front, "id__front_canvas", "cl__front_view_product", "front" );
				},
				error:function(){
					
				}
			});
			
			// back
			var v__url_im_back = v__url_domain + "/assets/images/products/" + vl__color[1] + "/back-";
			v__url_im_back = v__url_im_back + vl__color[1] + ".png";
			
			jQuery.ajax({
				url: v__url_im_back,
				cache:false,
				xhr:function(){
					var xhr = new XMLHttpRequest();
					xhr.responseType= 'blob'
					return xhr;
				},beforeSend: function() {
					$('.product-color-select[for="product-' + vl__color[1] + '"]')
						.addClass('fas fa-spinner fa-spin')
						.css('color','white').css('border-radius','100% 100% 100% 100%');
					$('.cl__back_view_product').text('').append('<i class="fas fa-spinner fa-spin cl__loader_back"></i>');
				},complete: function(){
					 $('.cl__back_view_product').remove('.cl__loader_back');
					 $('.cl__back_view_product').text('Back');
					 
					if(vs__views_port == "back"){
						$('.product-color-select[for="product-' + vl__color[1] + '"]')
							.removeClass('fas fa-spinner fa-spin')
							.css('color','white').css('border-radius','100% 0% 100% 100%');
					}
				},success: function(data){
					console.log(data);
					var img = document.getElementById('id__product_img_back');
					var url = window.URL || window.webkitURL;
					var binaryData = [];
					binaryData.push(data);					
					img.src = url.createObjectURL(new Blob(binaryData, {type: "image/png"}))
					
					f__change_product_color();
					//if(f__change_product_color()) f__change_view_port(canvas_back, "id__back_canvas", "cl__back_view_product", "back" );
				},
				error:function(){
					
				}
			});
			
			// left
			var v__url_im_left = v__url_domain + "/assets/images/products/" + vl__color[1] + "/left-";
			v__url_im_left = v__url_im_left + vl__color[1] + ".png";
			
			jQuery.ajax({
				url: v__url_im_left,
				cache:false,
				xhr:function(){
					var xhr = new XMLHttpRequest();
					xhr.responseType= 'blob'
					return xhr;
				},beforeSend: function() {
					$('.product-color-select[for="product-' + vl__color[1] + '"]')
						.addClass('fas fa-spinner fa-spin')
						.css('color','white').css('border-radius','100% 100% 100% 100%');
					$('.cl__left_view_product').text('').append('<i class="fas fa-spinner fa-spin cl__loader_left"></i>');
				},complete: function(){
					 $('.cl__left_view_product').remove('.cl__loader_left');
					 $('.cl__left_view_product').text('Left Sleeve');
					 
					if(vs__views_port == "left"){
						$('.product-color-select[for="product-' + vl__color[1] + '"]')
							.removeClass('fas fa-spinner fa-spin')
							.css('color','white').css('border-radius','100% 0% 100% 100%');
					}
				},
				success: function(data){
					console.log(data);
					var img = document.getElementById('id__product_img_left');
					var url = window.URL || window.webkitURL;
					var binaryData = [];
					binaryData.push(data);					
					img.src = url.createObjectURL(new Blob(binaryData, {type: "image/png"}))
					
					f__change_product_color();
					//if(f__change_product_color()) f__change_view_port(canvas_left, "id__left_canvas", "cl__left_view_product", "left" );
				},
				error:function(){
					
				}
			});
			
			// right
			var v__url_im_right = v__url_domain + "/assets/images/products/" + vl__color[1] + "/right-";
			v__url_im_right = v__url_im_right + vl__color[1] + ".png";
			
			jQuery.ajax({
				url: v__url_im_right,
				cache:false,
				xhr:function(){
					var xhr = new XMLHttpRequest();
					xhr.responseType= 'blob'
					return xhr;
				},beforeSend: function() {
					$('.product-color-select[for="product-' + vl__color[1] + '"]')
						.addClass('fas fa-spinner fa-spin')
						.css('color','white').css('border-radius','100% 100% 100% 100%');
					$('.cl__right_view_product').text('').append('<i class="fas fa-spinner fa-spin cl__loader_right"></i>');
				},complete: function(){
					 $('.cl__right_view_product').remove('.cl__loader_right');
					 $('.cl__right_view_product').text('Right Sleeve');
					 
					if(vs__views_port == "right"){
						$('.product-color-select[for="product-' + vl__color[1] + '"]')
							.removeClass('fas fa-spinner fa-spin')
							.css('color','white').css('border-radius','100% 0% 100% 100%');
					}
				},
				success: function(data){
					console.log(data);
					var img = document.getElementById('id__product_img_right');
					var url = window.URL || window.webkitURL;
					img.src = url.createObjectURL(data);
					
					f__change_product_color();
					//if(f__change_product_color()) f__change_view_port(canvas_right, "id__right_canvas", "cl__right_view_product", "right" );
				},
				error:function(){
					
				}
			});
		//}
	});
	
	// @---------------------------------------------------------------- image colour button
	
	$('.color-pick-image[for="black-color-image"]').css('border-radius','100% 0% 100% 100%');
	$('.color-pick-image').click(function(e){
		e.preventDefault();
		
		//if(f__textbox_editable(canvas)){
			var vl__color = $(this).attr('for').split('-color-');
			var v__color = vl__color[0].replace('-',' ');
			
			$('.color-pick-image').css('border-radius','100% 100% 100% 100%');
			$(this).css('border-radius','100% 0% 100% 100%');
			//$(this).css('border-top-right-radius','0% !important');
			
			if(v__color == "dark gray"){
				
				v__color = "#6A6B66";
			}			
			
			if(v__color == "light gray"){
				v__color = "#B6B6B6";
			}
			
			if(v__color == "gray"){
				v__color = "#B6B6B6";
			}
			
			if(v__color == "magenta blue"){
				v__color = "#5B12FF";
			}
			
			if(v__color == "indian red"){
				v__color = "#E57271";
			}
			
			if(v__color == "light orange"){
				v__color = "#FCBD53";
			}
			
			if(v__color == "cyan blue"){
				v__color = "#127DFF";
			}
			
			if(v__color == "aqua"){
				v__color = "#00C2C1";
			}
			
			vs__color = v__color;
			
			v_o__active_object = canvas.getActiveObject();
			
			if(v_o__active_object 
				&& v_o__active_object.isType('path')){
				v_o__active_object.set({'fill': v__color});
			}
			
			canvas.requestRenderAll();
		//}
	});
	
	// @---------------------------------------------------------------- image effect button
	
	$('.image-effect-label[for="normal"]').css('border-radius','100% 0% 100% 100%');
	$('.image-effect-label').click(function(e){
		e.preventDefault();
		
		//if(f__textbox_editable(canvas)){
			var vl__image_effect = $(this).attr('for');
			
			console.log('-- ' + vl__image_effect);
			
			v_o__active_object = canvas.getActiveObject();
			
			if(v_o__active_object 
				&& v_o__active_object.isType('image')){
					
				console.log('-- ' + vl__image_effect);
				
				if(vl__image_effect == "sepia"){
					v_o__active_object.filters.push(new fabric.Image.filters.Sepia());
				}
				
				if(vl__image_effect == "invert"){
					v_o__active_object.filters.push(new fabric.Image.filters.Invert());
				}
				
				if(vl__image_effect == "greyscale"){
					v_o__active_object.filters.push(new fabric.Image.filters.Grayscale());
				}
				
				if(vl__image_effect == "normal"){
					v_o__active_object.filters = [];
				}
				
				var timeStart = +new Date();
				v_o__active_object.applyFilters();
				var timeEnd = +new Date();
			}
			
			canvas.requestRenderAll();
		//}
	});
	
	
	
	// @---------------------------------------------------------------- center align button
	
	var vb_state__text_center = false;
	$('.cl__text_center').click(function(e){
		e.preventDefault();
		
		vs__textalign = 'center';
		f__select_text_align(vs__textalign);
		
		if(f__textbox_editable(canvas)){ // posisi unlock
			canvas.getActiveObject().set("textAlign", "center");
			canvas.requestRenderAll();
		}
	});
	
	// @---------------------------------------------------------------- left align text button
	
	var vb_state__text_left = false;
	$('.cl__text_left').click(function(e){
		e.preventDefault();
		
		vs__textalign = 'left';
		f__select_text_align(vs__textalign);
			
		if(f__textbox_editable(canvas)){
			canvas.getActiveObject().set("textAlign", "left");
			canvas.requestRenderAll();
		}
	});
	
	// @---------------------------------------------------------------- right align button button
	
	var vb_state__text_right = false;
	$('.cl__text_right').click(function(e){
		e.preventDefault();
		
		vs__textalign = 'right';
		f__select_text_align(vs__textalign);
			
		if(f__textbox_editable(canvas)){
			canvas.getActiveObject().set("textAlign", "right");
			canvas.requestRenderAll();
		}
	});
	
	// @---------------------------------------------------------------- bold text button	
	$('.cl__lbl_text_bold').css('background-color','transparent');
	$('.cl__text_bold').click(function(e){
		e.preventDefault();
		
		if(f__textbox_editable(canvas)){
			if(!vb_state__text_bold){
				canvas.getActiveObject().set("fontWeight", "bold");
				canvas.requestRenderAll();
							
				$('.cl__lbl_text_bold').css('background-color','#989898');
				vb_state__text_bold = true;
			}else{		
				canvas.getActiveObject().set("fontWeight", "normal");
				canvas.requestRenderAll();
				
				$('.cl__lbl_text_bold').css('background-color','transparent');
				vb_state__text_bold = false;
			}
		}else{
			// inisialisasi
			if(!vb_state__text_bold){
				$('.cl__lbl_text_bold').css('background-color','#989898');
				vb_state__text_bold = true;
			}else{
				$('.cl__lbl_text_bold').css('background-color','transparent');
				vb_state__text_bold = false;
			}
		}
	});
	
	// @---------------------------------------------------------------- italic text button
	
	$('.cl__text_italic').css('background-color','transparent');
	$('.cl__text_italic').click(function(e){
		e.preventDefault();
		
		if(f__textbox_editable(canvas)){
			if(canvas != null){
				if(!vb_state__text_italic){
					canvas.getActiveObject().set("fontStyle", "italic");
					canvas.requestRenderAll();
									
					$('.cl__text_italic').css('background-color','#989898');					
					vb_state__text_italic = true;
				}else{
					canvas.getActiveObject().set("fontStyle", "normal");
					canvas.requestRenderAll();
										
					$('.cl__text_italic').css('background-color','transparent');					
					vb_state__text_italic = false;
				}
			}
		}else{
			if(!vb_state__text_italic){
				$('.cl__text_italic').css('background-color','#989898');					
				vb_state__text_italic = true;
			}else{
				$('.cl__text_italic').css('background-color','transparent');					
				vb_state__text_italic = false;
			}
		}
	});
	
	// @---------------------------------------------------------------- underline text button	
	$('.cl__text_underline').css('background-color','transparent');
	$('.cl__text_underline').click(function(e){
		e.preventDefault();
		
		if(f__textbox_editable(canvas)){
			if(!vb_state__text_underline){				
				canvas.getActiveObject()
					.set("textDecoration", "underline")
					.set('underline',true)
					.set('dirty',true);
				canvas.requestRenderAll();
				
				$('.cl__text_underline').css('background-color','#989898');
				vb_state__text_underline = true;
			}else{
				canvas.getActiveObject()
					.set("textDecoration", "none")
					.set('underline',false)
					.set('dirty',true);;
				canvas.requestRenderAll();
				
				$('.cl__text_underline').css('background-color','transparent');
				vb_state__text_underline = false;
			}
		}else{
			if(!vb_state__text_underline){
				$('.cl__text_underline').css('background-color','#989898');
				vb_state__text_underline = true;
			}else{
				$('.cl__text_underline').css('background-color','transparent');
				vb_state__text_underline = false;
			}
		}
	});
	
	// @---------------------------------------------------------------- transparency text slider
	$('.cl__span_ir_transparency_text').text(vs__opacity);
	$('.cl__ir_transparency').val(vs__opacity);
	$('.cl__ir_transparency').change(function(){
		if(f__textbox_editable(canvas)){		
			var vNilai = $(this).val();
			$('.cl__span_ir_transparency_text').text(vNilai);
			var vOpacity = parseFloat(parseFloat(vNilai)/parseFloat(100));
			
			canvas.getActiveObject().set({opacity: vOpacity});
			canvas.requestRenderAll();
		}
	});
	
	// @---------------------------------------------------------------- radius text slider
	$('.cl__span_ir_radius_text').text(vs__radius);
	$('.cl__ir_radius').val(vs__radius);
	$('.cl__ir_radius').change(function(){		
		var vNilai = $(this).val();
		$('.cl__span_ir_radius_text').text(vNilai);			
		$('.cl__ir_radius').val(vNilai);
		vs__radius = vNilai;
	});
	
	// @---------------------------------------------------------------- lineheight text slider
	$('.cl__span_ir_lineheight_text').text(vs__lineheight);
	$('.cl__ir_lineheight').val(vs__lineheight);
	$('.cl__ir_lineheight').change(function(){
		if(f__textbox_editable(canvas)){	
			var vNilai = $(this).val();
			$('.cl__span_ir_lineheight_text').text(vNilai);
			;
			
			f__init();
			canvas.getActiveObject().set({lineHeight: vNilai});
			canvas.requestRenderAll();
		}
	});
	
	// @---------------------------------------------------------------- rotate text slider	
	$('.cl__span_ir_rotate_text').text(vs__rotate_angle);
	$('.cl__ir_rotate').val(vs__rotate_angle);
	$('.cl__ir_rotate').change(function(){
		if(f__textbox_editable(canvas)){
			var vNilai = $(this).val();
			
			$('.cl__span_ir_rotate_text').text(vNilai);
			var v__rotate = parseFloat(vNilai);
			
			v_o__active_object = canvas.getActiveObject();
				
			if(v_o__active_object 
				&& v_o__active_object.isType('textbox')){
				v_o__active_object.set('angle', v__rotate);
			}
			
			if(v_o__active_object 
				&& v_o__active_object.isType('curved-text')){
				v_o__active_object.set('angle', v__rotate);
			}
			
			canvas.requestRenderAll();
		}
	});	
	
	// @---------------------------------------------------------------- gallery item click
	$('.gallery-item').click(function(e){
		e.preventDefault();
			
		if(vs__tab == "image"){
			f__init();
			
			var o__img_item_src = $(this).children('img');
			var o__text_item = $(this).children('span');
			
			// kalkulasi posisi tengah
			var vCenterPosH = (parseInt(el_product_img.height()) - parseInt(o__img_item_src.height()))/2;
			var vCenterPosW = (parseInt(el_product_img.width()) - parseInt(o__img_item_src.width()))/2;		
			
			fabric.loadSVGFromURL(o__img_item_src.attr('src'), function(objects, options) {
				ol__img_item[cl__img] = fabric.util.groupSVGElements(objects, options);
				ol__img_item[cl__img].set('id', 'id__c_item_' + cl__img);
				ol__img_item[cl__img].set({
					left: vCenterPosW,
					top: vCenterPosH,
					hasRotatingPoint: false,
					hoverCursor: 'pointer'
				});
							
				ol__img_item[cl__img].scaleToHeight(o__img_item_src.height());
				ol__img_item[cl__img].scaleToWidth(o__img_item_src.width());			
				
				ol__img_item[cl__img].set('selectable', true);			
				
				canvas.set({
					uniScaleTransform: false, // proporsional: false
					lockUniScaling: false, // proporsional: false
					hasRotatingPoint: false
				});
				// add to canvas
				canvas.add(ol__img_item[cl__img])
					//.calcOffset()
					.renderAll();	
				cl__img = cl__img + 1;
			},
			function(item, object) {
				object.set('id', item.getAttribute('id'));			
				group.push(object);
			});		
		}
		
	});	
	
	
	// =================================================================
	// menu item
	// =================================================================
	
	// @---------------------------------------------------------------- print button
	
	$('.cl__item_menu_print').click(function(e){
		e.preventDefault();	
		if(vs__views_port == "front") f__print_canvas(canvas_front);
		if(vs__views_port == "right") f__print_canvas(canvas_right);
		if(vs__views_port == "back") f__print_canvas(canvas_back);
		if(vs__views_port == "left") f__print_canvas(canvas_left);
	});
	
	// @---------------------------------------------------------------- qr code button
	
	$('.cl__item_menu_qrcode').click(function(e){
		e.preventDefault();	
		
		if(!vb_item_menu_qrcode){
			var o__div_qrcode = '<div id="id__qrcode_container"><div id="qrcode"></div></div>';
			
			if ($("#id__qrcode_container").length > 0){
				$("#id__qrcode_container").remove();
			}
			
			parentDiv.append(o__div_qrcode);
			$('#id__qrcode_container').css({'width':'100%','z-index':'100','position':'absolute','text-align':'center','display':'none'});
			$('#qrcode').css({'width':'100%','display':'none'});
			
			$('#id__qrcode_container').css('display','block');
			$('#qrcode').css('display','block');
			$('#qrcode').qrcode({
				width: parseInt(el_product_img_w/1.5),
				height: parseInt(el_product_img_w/1.5),
				text: "http://www.test.com"
			});
			
			$(this).addClass('active');
			vb_item_menu_qrcode = true;
		}else{
			
			if ($("#id__qrcode_container").length > 0){
				$("#id__qrcode_container").remove();
			}
			
			$(this).removeClass('active');
			vb_item_menu_qrcode = false;
		}
		
	});
	
	// @---------------------------------------------------------------- download button
	$('.cl__item_menu_download').click(function(e){
		//e.preventDefault();
		if(vs__views_port == "front") f__download_image(canvas_front);
		if(vs__views_port == "right") f__download_image(canvas_right);
		if(vs__views_port == "back") f__download_image(canvas_back);
		if(vs__views_port == "left") f__download_image(canvas_left);
	});
			
	
	
	
	
	// =================================================================
	// mouse manipulasi text
	// =================================================================

	// @---------------------------------------------------------------- text colour button
	
	$('.color-pick-text[for="black-color-text"]').css('border-radius','100% 0% 100% 100%');
	$('.color-pick-text').click(function(e){
		e.preventDefault();
		
		
			var vl__color = $(this).attr('for').split('-color-');
			var v__color = vl__color[0].replace('-',' ');
			
			$('.color-pick-text').css('border-radius','100% 100% 100% 100%');
			$(this).css('border-radius','100% 0% 100% 100%');
			//$(this).css('border-top-right-radius','0% !important');
			
			if(v__color == "light gray"){
				v__color = "#B6B6B6";
			}
			
			if(v__color == "magenta blue"){
				v__color = "#5B12FF";
			}
			
			if(v__color == "indian red"){
				v__color = "#E57271";
			}
			
			if(v__color == "light orange"){
				v__color = "#FCBD53";
			}
			
			if(v__color == "cyan blue"){
				v__color = "#127DFF";
			}
			
			if(v__color == "aqua"){
				v__color = "#00C2C1";
			}
			
			vs__color = v__color;
			
		if(f__textbox_editable(canvas)){
			v_o__active_object = canvas.getActiveObject();
			
			if(v_o__active_object 
				&& v_o__active_object.isType('textbox')){
				v_o__active_object.set({'fill': v__color});
			}
			
			if(v_o__active_object 
				&& v_o__active_object.isType('curved-text')){
				v_o__active_object.set({'fill': v__color});
			}
			
			canvas.requestRenderAll();
		}
	});
	
	// @---------------------------------------------------------------- fonts select
	
	$('.font-select option[value="' + vs__font + '"]').attr('selected', 'selected');
	$('.font-select').change(function(){
		
		var vl__option = $(this).find('option:selected');		
		var v__option_value = vl__option.val();
		var v__option_text = vl__option.text();
			
		if(f__textbox_editable(canvas)){
			if(vs__views_port == "front") canvas = canvas_front;
			if(vs__views_port == "right") canvas = canvas_right;
			if(vs__views_port == "back") canvas = canvas_back;
			if(vs__views_port == "left") canvas = canvas_left;			
			
			if (v__option_value !== vs__font) {
				f__load_use_font(v__option_value, canvas);
			} else {
				canvas.getActiveObject().set("fontFamily", v__option_value);
				canvas.requestRenderAll();
			}
		}
		
		// selected
		vs__font = v__option_value;
		//$('.font-select option[value="' + vs__font + '"]').attr('selected', 'selected');
		$('.font-select option').removeAttr('selected');
		$('.font-select option[value="' + vs__font + '"]').prop("selected", true);
	});
		
	// @---------------------------------------------------------------- curve text button
	var id__curved_text = "";
	$('.cl__cb_curve_text').prop('checked', false);
	$('.cl__curve_text').click(function(e){
		e.preventDefault();
		
		// set posisi checked
		var v_b__status_curve_text = $('.cl__cb_curve_text').is(":checked");	
		var o__curved_text = null;
		
		if(f__textbox_editable(canvas) && !v_b__status_curve_text){	
			// ambil text object
			v_o__active_object = canvas.getActiveObject();
			if(v_o__active_object && v_o__active_object.isType('textbox')){
				var v__isi_text = v_o__active_object.get('text');
				
				if(v__isi_text != ""){
					
					o__curved_text = new fabric.CurvedText(v__isi_text, {
						id: v_o__active_object.get('id') + "_curved",
						diameter: vs__radius,
						fontSize: v_o__active_object.get('fontSize'),
						fontFamily: v_o__active_object.get('fontFamily'),
						//scaleX: v_o__active_object.get('scaleX'),
						//scaleY: v_o__active_object.get('scaleY'),
						left: parseInt(el_product_img_w/2),
						top: parseInt(el_product_img_h/2),
						//left: v_o__active_object.get('left'),
						//top: v_o__active_object.get('top') + 20,
						fill: v_o__active_object.get('fill'),
						hasRotatingPoint: false
					});
					o__curved_text.set('left', parseFloat((el_product_img_w - o__curved_text.width)/2));
					o__curved_text.set('top', parseFloat((el_product_img_h - o__curved_text.height)/2));
					o__curved_text.setCoords();
					
					// masukkan ke larik curved text					
					var v__o_ob_curved_text = JSON.parse(JSON.stringify(v_o__active_object));					
					var o = {'id':v_o__active_object.get('id') + "_curved", "id_": v_o__active_object.get('id'),'ob': v__o_ob_curved_text};					
					vl__curved_text.push(o);
			
					// render					
					canvas.remove(v_o__active_object);
					canvas.add(o__curved_text).requestRenderAll();
					canvas.setActiveObject(o__curved_text);
					
				}
			}
			
			// set curved status: true	
			$('.cl__cb_curve_text').prop('checked', true);
			
		}
		
		// bila slider --> curved true
		if(v_b__status_curve_text){
			// kembalikan ke text awal
			v_o__active_object = canvas.getActiveObject();
			console.log(v_o__active_object.type);
			
			if(v_o__active_object.type == "curved-text"){
				
				if(vl__curved_text.length > 0){
					console.log('-- isi vl__curved_text: ');
					
					var vl__curved_text__new = [];
					
					$.each(vl__curved_text, function(i,o){					
						if(v_o__active_object.get('id') == o.id){
							// buat textbox
							console.log('-- o.ob.text: ' + o.ob.text);
							var v__id_textbox = 'id__textbox_' + cl__text;
							
							var o__textbox = new fabric.Textbox(o.ob.text);
							o__textbox.set(o.ob);
							o__textbox.set('id',v__id_textbox);
							o__textbox.set('hasRotatingPoint', false);
							o__textbox.setCoords();
							
							canvas.remove(v_o__active_object);
							canvas.add(o__textbox).requestRenderAll();
							canvas.setActiveObject(o__textbox);
							
							cl__text = cl__text + 1;
						}else{
							vl__curved_text__new.push(o);
						}			
					});
					
					// update vl__curved_text
					vl__curved_text = [];
					vl__curved_text = new Array();
					vl__curved_text = vl__curved_text__new; 
				}
			}
			
			$('.cl__cb_curve_text').prop('checked', false);
		}
		
		
		
	});
	
	// @---------------------------------------------------------------- reverse text button
	$('.cl__cb_reverse_text').prop('checked', false);
	$('.cl__reverse_text').click(function(e){
		e.preventDefault();
		
		if(f__textbox_editable(canvas)){
			var v_b__status_reverse_text = $('.cl__cb_reverse_text').is(":checked");
							
			v_o__active_object = canvas.getActiveObject();
			if(v_o__active_object && v_o__active_object.isType('textbox')){
				var v__isi_text = v_o__active_object.get('text');
				
				if(v__isi_text != ""){
					var v__text_reverse = esrever.reverse(v__isi_text);				
					v_o__active_object.set('text', v__text_reverse);				
					if(!v_b__status_reverse_text){
						//v_o__active_object.set('flipX', true);
						$('.cl__cb_reverse_text').prop('checked', true);
					}else{
						v_o__active_object.set('flipX', false);
						$('.cl__cb_reverse_text').prop('checked', false);
					}
					
					canvas.requestRenderAll();
				}
			}
		}
	});
	
	
	// @---------------------------------------------------------------- lock object text button	
	
	$('#lock').prop('checked', false);
	$('.cl__lock_text').click(function(e){
		e.preventDefault();
		
		v_o__active_object = canvas.getActiveObject();
		
		if(!v_o__active_object.get('editable')){
			f__unlock_object(v_o__active_object, canvas);
			$('#lock').prop('checked', false);
		}
		
		// cek apakah object ada di larik vl__object_status_lock
		console.log('-- -- cl__lock_text + vl__object_status_lock.length: ' + vl__object_status_lock.length);
		if(vl__object_status_lock.length > 0){
			vl__history.forEach(function(target){
				var o = target;
				console.log('-- o');
				console.log(target);
			});
		}
		
		
	});
	
	// @---------------------------------------------------------------- unlock object text button
	$('.cl__lock_text_open').click(function(e){
		e.preventDefault();	
		
		v_o__active_object = canvas.getActiveObject();
		
		if(v_o__active_object.get('editable')){
			f__lock_object(v_o__active_object, canvas);
			$('#lock').prop('checked', true);
		}

		// cek apakah object ada di larik vl__object_status_lock
		console.log('-- cl__lock_text_open + vl__object_status_lock.length: ' + vl__object_status_lock.length);
		if(vl__object_status_lock.length > 0){
			vl__object_status_lock.forEach(function(target){
				var o = target;
				console.log('-- o');
				console.log(target);
			});
		}
		
		// masukkan ke larik
		var o_lock = {'o':v_o__active_object, 's':'lock'};
		vl__object_status_lock.push(o_lock);
	});
	
	
	// @---------------------------------------------------------------- upload bar	
	
	var o__image_loader = document.getElementById('file');
	o__image_loader.addEventListener('change', f__handle_image, false);
		
	
	// =================================================================
	// PRODUCT DESIGN VIEWS
	// =================================================================
	
	// @---------------------------------------------------------------- front view product button
	var o__canvas_front = null;
	$('.cl__front_view_product').click(function(e){
		e.preventDefault();
				
		f__change_view_port(canvas_front, "id__front_canvas", "cl__front_view_product", "front" );
	});
	
	// @---------------------------------------------------------------- back view product button
	$('.cl__back_view_product').click(function(e){
		e.preventDefault();	
		
		f__change_view_port(canvas_back, "id__back_canvas", "cl__back_view_product", "back" );
		
		
	});
	
	// @---------------------------------------------------------------- left view product button
	$('.cl__left_view_product').click(function(e){
		e.preventDefault();				
		
		f__change_view_port(canvas_left, "id__left_canvas", "cl__left_view_product", "left" );
	});
	
	// @---------------------------------------------------------------- right view product button
	$('.cl__right_view_product').click(function(e){
		e.preventDefault();		
		
		f__change_view_port(canvas_right, "id__right_canvas", "cl__right_view_product", "right" );
	});
	
	
	
    // =================================================================
	// menu: undo / redo / refresh
	// =================================================================
	
	// @---------------------------------------------------------------- undo button
	$('.cl__btn_undo').click(function(e){
		e.preventDefault();		
		
		f__undo_action(canvas);
	});
	
	// @---------------------------------------------------------------- redo button
	$('.cl__btn_redo').click(function(e){
		e.preventDefault();
		
		var n = vl__redo.length;
		var o_hist = (n > 0) ? vl__redo[n-1] : null;
		
		if(n > 0 && !vb_redo){					
			if(o_hist != null) vl__history.push(o_hist);
			vl__redo.pop();
			vb_redo = true;	
		}
		
		n = vl__redo.length;
		if(n > 0){			
			
			o_hist = vl__redo[n-1];
			var o_hist__id = o_hist.id;
			var o_hist__ev = o_hist.ev;
			var o_hist__ob = o_hist.ob;
						
			// hitung banyak history sebuah id
			var m = 0;
			vl__redo.forEach(function(object){
				if(object.id == o_hist__id){
					m = m + 1;
				}				
			});
			
			// bila history sebuah id sisa 1, remove object[id]
			if(m == 1){
				canvas.getObjects().forEach(function(o) {
				  if(o.id == o_hist__id) {					
					vl__history.push(o_hist); // ke larik undo
					o.set(o_hist__ob);
					o.setCoords();
					canvas.renderAll();					
					vl__redo.pop();	// hapus dari redo			
				  }
				});	
			}
			
			// bila lebih dari 1, set opsi
			if(m > 1){
				// iterasi object
				canvas.getObjects().forEach(function(o) {
				  if(o.id == o_hist__id) {
					vl__history.push(o_hist); // ke larik undo
					o.set(o_hist__ob);
					o.setCoords();
					canvas.renderAll();					
					vl__redo.pop();	// hapus dari redo				
				  }		
					
				});	
			}			
		}
		
		vb_hist = false;
		//canvas.redo();
	});
	
	// @---------------------------------------------------------------- clear button
	$('.cl__btn_refresh').click(function(e){
		e.preventDefault();
		
		vl__history = new Array();
		vl__history = [];
		vl__redo = new Array();
		vl__redo = [];
		vb_hist = false;
		vb_redo = false;
		
		//canvas.clear();		
		canvas.getObjects().forEach(function(o) {
			canvas.remove(o);
		});
		canvas.renderAll();	
	});
	
	// @---------------------------------------------------------------- context menu
    
    // @---------------------------------------------------------------- cm front
    $( ".cl__front_canvas" ).contextmenu(function(e) {
		e.preventDefault();
		v_o__active_object = canvas.getActiveObject();
		
		canvas.discardActiveObject();
		
		if(v_o__active_object && v_o__active_object.isType('textbox')){
			var v__isi_text = v_o__active_object.get('text');
			if(v__isi_text == ""){
				canvas.remove(v_o__active_object);
			}
		}
		
		canvas.renderAll();		
	});    
	
	// @---------------------------------------------------------------- cm back
	$( ".cl__back_canvas" ).contextmenu(function(e) {
		e.preventDefault();
		v_o__active_object = canvas_back.getActiveObject();
		
		canvas_back.discardActiveObject();
		
		if(v_o__active_object && v_o__active_object.isType('textbox')){
			var v__isi_text = v_o__active_object.get('text');
			if(v__isi_text == ""){
				canvas_back.remove(v_o__active_object);
			}
		}
		
		canvas_back.renderAll();		
	});    
	
	// @---------------------------------------------------------------- cm left
	$( ".cl__left_canvas" ).contextmenu(function(e) {
		e.preventDefault();
		v_o__active_object = canvas_left.getActiveObject();
		
		canvas_left.discardActiveObject();
		
		if(v_o__active_object && v_o__active_object.isType('textbox')){
			var v__isi_text = v_o__active_object.get('text');
			if(v__isi_text == ""){
				canvas_left.remove(v_o__active_object);
			}
		}
		
		canvas_left.renderAll();		
	});    
	
	// @---------------------------------------------------------------- cm right
	$( ".cl__right_canvas" ).contextmenu(function(e) {
		e.preventDefault();
		v_o__active_object = canvas_right.getActiveObject();
		
		canvas_right.discardActiveObject();
		
		if(v_o__active_object && v_o__active_object.isType('textbox')){
			var v__isi_text = v_o__active_object.get('text');
			if(v__isi_text == ""){
				canvas_right.remove(v_o__active_object);
			}
		}
		
		canvas_right.renderAll();		
	});    
    
	
	// =================================================================
	// window
	// =================================================================
	
	window.addEventListener('load', 
	  function() {
		  
		f__change_view_port(canvas_front, "id__front_canvas", "cl__front_view_product", "front" );
		
	}, false);
  
	window.addEventListener('resize', function(event){
		
		f__window_adaptive_content();
		
	});
	
	window.deleteObject = function() {
		canvas.getActiveObject().remove();
	}
	
	$(window).keypress(function(e) {
       var key = e.which;
       //
    });
    
    $(window).keyup(function(e) {
		var key = e.which;
				
		// delete object
		if(key == 46) {
			v_o__active_object = canvas.getActiveObject();
			
			if(v_o__active_object){
				if(v_o__active_object.type == "textbox"){
					// mencegah textbox dihapus saat sedang meng-edit
					if(!v_o__active_object.get("isEditing")){
						canvas.discardActiveObject();
						canvas.remove(v_o__active_object);
					}
				}else{
					canvas.discardActiveObject();
					canvas.remove(v_o__active_object);
				}
			}
			
			canvas.renderAll()
		}
       
    });
    
    
   
    

 

	// =================================================================
	// canvas
	// =================================================================
	
	// @---------------------------------------------------------------- canvas mouse down
	canvas_front.on('mouse:down', function(options) {		
		f__mouse_down(vs__tab, options); 
	});	
	
	
	canvas_back.on('mouse:down', function(options) {
		console.log('back');
		f__mouse_down(vs__tab, options); 
	});
	
	canvas_left.on('mouse:down', function(options) {
		console.log('left');
		f__mouse_down(vs__tab, options); 
	});
	
	canvas_right.on('mouse:down', function(options) {
		console.log('right');
		f__mouse_down(vs__tab, options); 
	});
	
	
	// @---------------------------------------------------------------- canvas mouse:up
	canvas.on('mouse:up', function(options) {
		console.log('-- isi vl__history: ');
		
		// tentukan indeks views
		var vl__views = ['front','right','back','left'];
		var p = 0;
		$.each(vl__views, function(i,o){
			if(vs__views_port == o){
				p = i;
			}
		});		
			
		console.log(vl__history_undo[p]);
	});
	
	
	// =================================================================
	// canvas: ON-OBJECT: _____________
	// =================================================================
	
	// @---------------------------------------------------------------- #canvas on front
	canvas_front.on({
		
	// @---------------------------------------------------------------- co-front: added
		'object:added': function(e){
			console.log('-- added');
			
			f__canvas_on__object_added(e);
		},
		
	// @---------------------------------------------------------------- co-front: modified
		'object:modified': function(e){
			console.log('-- modified');
			
			f__canvas_on__object_modified(e);
		},
	// @---------------------------------------------------------------- co-front: moving
		'object:moving' : function(e){
		},
	// @---------------------------------------------------------------- co-front: scaling
		'object:scaling' : function(e){
		},
	// @---------------------------------------------------------------- co-front: rotating
        'object:rotating': function(e){
            f__object_rotation(e.target, canvas_front);
            f__init();
        },
	// @---------------------------------------------------------------- co-front: skewing
		'object:skewing' : function(e){},
		'object:moved' : function(e){			
		},
	// @---------------------------------------------------------------- co-front: scaled
		'object:scaled' : function(){},
	// @---------------------------------------------------------------- co-front: rotated
		'object:rotated' : function(){},
	// @---------------------------------------------------------------- co-front: skewed
		'object:skewed' : function(){}
    });
    
    // =================================================================
    // @---------------------------------------------------------------- #canvas on: right
	canvas_right.on({
		
	// @---------------------------------------------------------------- co-right: added
		'object:added': function(e){
			console.log('-- added');
			
			f__canvas_on__object_added(e);
		},
		
	// @---------------------------------------------------------------- co-right: modified
		'object:modified': function(e){
			console.log('-- modified');
			
			f__canvas_on__object_modified(e);
		},
	// @---------------------------------------------------------------- co-right: moving
		'object:moving' : function(e){
		},
	// @---------------------------------------------------------------- co-right: scaling
		'object:scaling' : function(e){
		},
	// @---------------------------------------------------------------- co-right: rotating
        'object:rotating': function(e){
            f__object_rotation(e.target, canvas_right);
            f__init();
            
        },
	// @---------------------------------------------------------------- co-right: skewing
		'object:skewing' : function(e){},
		'object:moved' : function(e){			
		},
	// @---------------------------------------------------------------- co-right: scaled
		'object:scaled' : function(){},
	// @---------------------------------------------------------------- co-right: rotated
		'object:rotated' : function(){},
	// @---------------------------------------------------------------- co-right: skewed
		'object:skewed' : function(){}
    });
    
    // =================================================================
    // @---------------------------------------------------------------- #canvas on: back
	canvas_back.on({
		
	// @---------------------------------------------------------------- co-back: added
		'object:added': function(e){
			console.log('-- added');
			
			f__canvas_on__object_added(e);
		},
		
	// @---------------------------------------------------------------- co-back: modified
		'object:modified': function(e){
			console.log('-- modified');
			
			f__canvas_on__object_modified(e);
		},
	// @---------------------------------------------------------------- co-back: moving
		'object:moving' : function(e){
		},
	// @---------------------------------------------------------------- co-back: scaling
		'object:scaling' : function(e){
		},
	// @---------------------------------------------------------------- co-back: rotating
        'object:rotating': function(e){
            f__object_rotation(e.target, canvas_back);
            f__init();
            
        },
	// @---------------------------------------------------------------- co-back: skewing
		'object:skewing' : function(e){},
		'object:moved' : function(e){			
		},
	// @---------------------------------------------------------------- co-back: scaled
		'object:scaled' : function(){},
	// @---------------------------------------------------------------- co-back: rotated
		'object:rotated' : function(){},
	// @---------------------------------------------------------------- co-back: skewed
		'object:skewed' : function(){}
    });
    
    // =================================================================
    // @---------------------------------------------------------------- #canvas on: left
	canvas_left.on({
		
	// @---------------------------------------------------------------- co-left: added
		'object:added': function(e){
			console.log('-- added');
			
			f__canvas_on__object_added(e);
		},
		
	// @---------------------------------------------------------------- co-left: modified
		'object:modified': function(e){
			console.log('-- modified');
			
			f__canvas_on__object_modified(e);
		},
	// @---------------------------------------------------------------- co-left: moving
		'object:moving' : function(e){
		},
	// @---------------------------------------------------------------- co-left: :scaling
		'object:scaling' : function(e){
		},
	// @---------------------------------------------------------------- co-left: rotating
        'object:rotating': function(e){
            f__object_rotation(e.target, canvas_left);
            f__init();           
        },
	// @---------------------------------------------------------------- co-left: skewing
		'object:skewing' : function(e){},
		'object:moved' : function(e){			
		},
	// @---------------------------------------------------------------- co-left: scaled
		'object:scaled' : function(){},
	// @---------------------------------------------------------------- co-left: rotated
		'object:rotated' : function(){},
	// @---------------------------------------------------------------- co-left: skewed
		'object:skewed' : function(){},
	// @---------------------------------------------------------------- ar-left: render	
		'after:render': function() {}
    });
    
    // ==============================
    
