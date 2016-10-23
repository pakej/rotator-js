/*
* Rotator.js by Zaim Ramlan
*
* TEMPLATE:
* img_to_rotate			- `<img_to_rotate's ID>`
* left_button 			- `<ID of img_to_rotate>_left` 			(button for left rotation)
* right_button 			- `<ID of img_to_rotate>_right` 		(button for right rotation)
* hidden input field	- `<ID of img_to_rotate>_rotation`		(hidden field to store value of respective image rotation)
*
* let ID of,
* img_to_rotate 	 	- `my_image`
*
* therefore ID must be,
* rotate left button 	- `my_image_left`
* rotate right button 	- `my_image_right`
*
* acceptable arguments:
* var rotator_instance = new Rotator('my_image', 'my_image_2', ..., 'my_image_N')
*
* note:
* 1) requires jQuery to work
* 2) arguments accepted are only strings
*/
var Rotator = function() {
	// class-wide constants
	LEFT_BUTTON  = 0;
	RIGHT_BUTTON = 1;

	// initialize the rotator_groups from the parameters passed
	this.rotator_groups = split_parameters_from(arguments);

	this.activate = function() {
		/*
		* since function() in document.ready is another function deep, 
		* the 'this' context can't be preserved to the class's 'this' context.
		* so, we need to put it in a placeholder for it to be used in
		* function() in document.ready function.
		*/		
		var self = this;
		$(document).ready(function() {
			for(var i = 0; i < self.rotator_groups.length; i++) {
				rotator_group = self.rotator_groups[i];
				sessionStorage.setItem(rotator_group.img_to_rotate + "_orientation", 0);
				self.initialize_buttons_for(
									LEFT_BUTTON,
									rotator_group.left_button,
									rotator_group.img_to_rotate
								);
				self.initialize_buttons_for(
									RIGHT_BUTTON,
									rotator_group.right_button,
									rotator_group.img_to_rotate
								);
			}
		});

		clear_storage_after_finish(self);
	}

	this.initialize_buttons_for = function(type, button, image) {

		$("#" + button).on('click', function() {
			rotation_angle = parseInt(sessionStorage.getItem(image + "_orientation"));
			switch(type) {
				case LEFT_BUTTON:
					if(rotation_angle == 0) rotation_angle = 360;
					rotation_angle -= 90;
					break;

				case RIGHT_BUTTON:
					rotation_angle += 90;
					if(rotation_angle == 360) rotation_angle = 0;
					break;
			}
			// sets the respective hidden field's value for usage with form submission
			$("#" + image + "_rotation").attr("value", rotation_angle);
			// rotates the image at the rotation_angle
			$("#" + image).attr("style", cross_browser_rotation(rotation_angle));
			sessionStorage.setItem(image + "_orientation", rotation_angle);
		});
	}

	function split_parameters_from(parameters) {
		all_rotator_groups 	= [];

		for(var i = 0; i < parameters.length; i++) {
			rotator_group 	= {img_to_rotate: parameters[i], left_button: parameters[i] + "_left", right_button: parameters[i] + "_right"};
			all_rotator_groups.push(rotator_group);
		}

		return all_rotator_groups;
	}

	function cross_browser_rotation(angle) {
		css  = "-webkit-transform: 	rotate(" + angle + "deg);";
		css += " -moz-transform: 	rotate(" + angle + "deg);";
		css += " -ms-transform: 	rotate(" + angle + "deg);";
		css += " -o-transform: 		rotate(" + angle + "deg);";
		css += " transform: 		rotate(" + angle + "deg);";
		return css;
	}		

	function clear_storage_after_finish(self) {
		window.onbeforeunload = function() {
			for(var i = 0; i < self.rotator_groups.length; i++) {
				rotator_group = self.rotator_groups[i];
				// removes related items in sessionStorage
				sessionStorage.removeItem(rotator_group.img_to_rotate + "_orientation");
			}
		}		
	}	
}