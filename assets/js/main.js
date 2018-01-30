(function($){
	var pacmanStatus = {x: -1, y: -1, f: ''};
	var directionList = ['north','east','south','west'];
	var board = {cols: 5, rows: 5};	

	$(document).ready(function(){
		$('.commands').val('');		
	});

	$(document).on('click','.btn-move',function(){
		var commandList = $('.command-list');
		var commandStr = commandList.html();
		var newPos = {x: 0, y: 0};				

		if(pacmanStatus.f == 'north') {
			newPos.y = 1;		
		} else if(pacmanStatus.f == 'east') {
			newPos.x = 1;
		} else if(pacmanStatus.f == 'south') {
			newPos.y = -1;
		} else if(pacmanStatus.f == 'west') {
			newPos.x = -1;
		}

		if(newPos.x != 0 && (pacmanStatus.x + newPos.x) >= 0 && (pacmanStatus.x + newPos.x) < board.cols) {
			pacmanStatus.x += newPos.x;
		} else if(newPos.y != 0 && (pacmanStatus.y + newPos.y) >= 0 && (pacmanStatus.y + newPos.y) < board.rows) {
			pacmanStatus.y += newPos.y;
		}

		if(commandStr != '')
			commandStr += '<br/>';

		commandStr += 'MOVE';

		commandList.html(commandStr).scrollTop(commandList.prop('scrollHeight'));

		drawBoard();
	});

	$(document).on('click','.btn-place',function(){
		var actionGroups = $('.action-groups');
		var commandList = $('.command-list');
		var x = $('#xcoordinate');
		var y = $('#ycoordinate');
		var f = $('#ddl-face-direction');		
		var commandStr = commandList.html();

		if(!$.isNumeric(x.val()) || ($.isNumeric(x.val()) && (x.val() < 0 || x.val() > (board.cols - 1)))) {
			alert('X must be an integer between 0 and ' + (board.cols - 1));
		} else if(!$.isNumeric(y.val()) || ($.isNumeric(y.val()) && (y.val() < 0 || y.val() > (board.rows - 1)))) {
			alert('Y must be an integer between 0 and ' + (board.rows - 1));
		} else {

			pacmanStatus.x = parseInt(x.val());
			pacmanStatus.y = parseInt(y.val());
			pacmanStatus.f = f.val();

			if(commandStr != '')
				commandStr += '<br/>';

			commandStr += 'PLACE ' + x.val() + ',' + y.val() + ',' + f.val().toUpperCase();

			commandList.html(commandStr).scrollTop(commandList.prop('scrollHeight'));

			if(!actionGroups.is(':visible'))
				actionGroups.fadeIn('slow');

			drawBoard();
		}
	});

	$(document).on('click','.btn-rotate-left',function(){
		var commandList = $('.command-list');
		var commandStr = commandList.html();

		pacmanStatus.f = getFacingDirection('left');

		if(commandStr != '')
			commandStr += '<br/>';

		commandStr += 'LEFT';

		commandList.html(commandStr).scrollTop(commandList.prop('scrollHeight'));
	});

	$(document).on('click','.btn-rotate-right',function(){
		var commandList = $('.command-list');
		var commandStr = commandList.html();

		pacmanStatus.f = getFacingDirection('right');

		if(commandStr != '')
			commandStr += '<br/>';

		commandStr += 'RIGHT';

		commandList.html(commandStr).scrollTop(commandList.prop('scrollHeight'));
	});

	$(document).on('click','.btn-report',function(){
		var outputContainer = $('.output-container');
		var result = outputContainer.find('.result');
		var outputStr = result.html();

		outputContainer.fadeIn('slow');

		result.html(pacmanStatus.x + ',' + pacmanStatus.y + ',' + pacmanStatus.f.toUpperCase());
	});

	function drawBoard() {
		var canvas = $('#board').show().get(0);				
		var context = canvas.getContext('2d');
		context.lineWidth = 1;
		
		var gridSize = 60;
		canvas.width = board.cols * gridSize;
		canvas.height = board.rows * gridSize;

		var pacmanSize = {w: 40, h: 40};

		var pacmanImage = new Image();
		pacmanImage.src = 'assets/images/pacman.png';
		pacmanImage.onload = function() {				
			for(var row = 0; row < board.rows; row++) {
				for(var col = 0; col < board.cols; col++) {
					context.rect(col * gridSize , row * gridSize, gridSize, gridSize);
					context.stroke();

					if(pacmanStatus.x == col && (Math.abs(pacmanStatus.y - board.rows) - 1) == row) {																		
						context.drawImage(pacmanImage, col * gridSize + 10, row * gridSize + 10, 40, 40);						
					}
				}
			}
			
		};		
	}

	function getFacingDirection(newDirection) {
		var step = 0;

		if(newDirection == 'left')
			step = -1;
		else if(newDirection == 'right')
			step = 1;
			
		if(step != 0) {
			var index = $.inArray(pacmanStatus.f,directionList);
			index += step;

			if(index < 0)
				index = directionList.length - 1;
			else if(index >= directionList.length)
				index = 0;

			return directionList[index];
		}

		return '';
	}
})(jQuery);