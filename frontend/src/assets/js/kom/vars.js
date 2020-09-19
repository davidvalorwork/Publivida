	
	// @----------------------------------------------------------------
	// @ URL
	
	var v__url_domain = "https://localhost/customim"
	
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
