

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
	$('.cl__ir_transparency').mousemove(function(){
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
	$('.cl__ir_radius').mousemove(function(){		
		var vNilai = $(this).val();
		$('.cl__span_ir_radius_text').text(vNilai);			
		$('.cl__ir_radius').val(vNilai);
		vs__radius = vNilai;
		
		//
		var obj = canvas.getActiveObject();
						obj.set("radius",vNilai);
						 
						canvas.renderAll();
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
	$('.cl__ir_rotate').mousemove(function(){
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
    
   
