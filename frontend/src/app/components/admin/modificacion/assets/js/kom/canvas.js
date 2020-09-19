
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
    
