/*---------------- NUN DATA ----------------*/

let $_nun = $('#nun'),
	$_body = $('#body'),
	$_shoulders = $('#shoulders'),
	$_trunk = $('#trunk'),
	$_visage = $('#visage'),
	$_face = $('#face'),
	$_right_eye = $('#right-eye'),
	$_right_eye_sclera = $('#right-eye-sclera'),
	$_right_eye_pupil = $('#right-eye-pupil'),
	$_left_eye = $('#left-eye'),
	$_left_eye_sclera = $('#left-eye-sclera'),
	$_left_eye_pupil = $('#left-eye-pupil'),
	$_veil = $('#back-veil'),
	$_variable_veil = $('#variable-front-veil'),
	$_hinge = $('#hinge'),
	$_background = $('#background')

/*---------------- INTERFACE DATA ----------------*/

let $_face_roundness = $('input#face-roundness'),
	$_nun_dress = $('input#nun-dress'),
	$_nun_width = $('input#nun-width'),
	$_pupil_proportion = $('input#pupil-proportion'),
	$_eye_width = $('input#eye-width')
	$_color_button = $('#color-button')

/*---------------- USEFUL STUFF ----------------*/

let pupil_prop = .5
let nun_center_x = 1814.15;
function map(value, start1, stop1, start2, stop2) {
	return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

/*---------------- MAIN FUNCTION ----------------*/

jQuery(document).ready(function($){

	/*---------------- FACE ROUNDNESS ----------------*/

	let mouseAbsPosition
	let cursorXDifference

	$_face_roundness.on('mousedown', function (e) {
		let mouse = findSVGCoords(uniqueEvent(e))
		let $_container = $('#face-roundness .cursor-container')
		mouseAbsPosition = mouse.x-parseInt($_container.attr('x'))
		cursorXDifference = mouseAbsPosition-$('#face-roundness-cursor').attr('x')
		$(document).on('mousemove', change_roundness)
		$(document).on('mouseup', end_change_roundness)
	})


	$('#face-roundness-cursor').on('mousedown', (e) => {
		$(document).on('mousemove', change_roundness)
		$(document).on('mouseup', end_change_roundness)
	})

	let change_roundness = function (e) {	
		let roundness = $_face_roundness.val()*30
		$_face.attr('rx', roundness)
		$_face.attr('rx', roundness)
		$_variable_veil.attr('height', $_face_roundness.val()*19)
	}
	let end_change_roundness = function (e) {
		$(document).off('mousemove', change_roundness)
		$(document).off('mouseup', end_change_roundness)
	}

	/*---------------- EYE WIDTH  ----------------*/
	$_eye_width.on('mousedown', function (e) {
		$(document).on('mousemove', change_eye_width)
		$(document).on('mouseup', end_change_eye_width)
	})

	let change_eye_width = function (e) {
		let width = $_eye_width.val() * 5 + 30
		$_right_eye_sclera.attr('r', width)
		$_right_eye_pupil.attr('r', width * pupil_prop)
		$_left_eye_sclera.attr('r', width)
		$_left_eye_pupil.attr('r', width * pupil_prop)
	}

	let end_change_eye_width = function (e) {
		$(document).off('mousemove', change_eye_width)
		$(document).off('mouseup', end_change_eye_width)
	}

	/*---------------- PUPIL PROPORTION  ----------------*/

	$_pupil_proportion.on('mousedown', function (e) {
		$(document).on('mousemove', change_pupil_proportion)
		$(document).on('mouseup', end_change_pupil_proportion)
	})

	let change_pupil_proportion = function (e) {
		pupil_prop = $_pupil_proportion.val()/10
		let sclera_width = $_right_eye_sclera.attr('r')
		$_right_eye_pupil.attr('r', sclera_width * pupil_prop)
		$_left_eye_pupil.attr('r', sclera_width * pupil_prop)
	}

	let end_change_pupil_proportion = function (e) {
		$(document).off('mousemove', change_pupil_proportion)
		$(document).off('mouseup', end_change_pupil_proportion)
	}

	/*---------------- BODY WIDTH  ----------------*/

	$_nun_width.on('mousedown', function (e) {
		$(document).on('mousemove', change_nun_width)
		$(document).on('mouseup', end_change_nun_width)
	})

	let change_nun_width = function (e) {
		let width = $_nun_width.val()*180+150
		let x = nun_center_x - (width/2)
		$_trunk.attr('width',width)
		$_shoulders.attr('r',width/2)
		$_trunk.attr('x',x)
		$_hinge.attr('y1', $_shoulders.attr('cy')-$_shoulders.attr('r'))
		let visage_x =
		$_visage.attr('transform', `translate(${0}, ${$_shoulders.attr('cy')-$_shoulders.attr('r')-($_face.attr('height')*3.6)})`)
		$_veil.attr('transform', `translate(${0}, ${$_shoulders.attr('cy')-$_shoulders.attr('r')-($_face.attr('height')*3.6)})`)

	}

	let end_change_nun_width = function (e) {
		$(document).off('mousemove', change_nun_width)
		$(document).off('mouseup', end_change_nun_width)
	}

	/*---------------- NUN DRESS  ----------------*/

	$_nun_dress.on('mousedown', function (e) {
		$(document).on('mousemove', change_nun_dress)
		$(document).on('mouseup', end_change_nun_dress)
	})

	let change_nun_dress = function (e) {
		let dress = $_nun_dress.val()
		console.log(dress)
		switch(dress) {
		case "0":
	$_veil.attr('fill', '#FFFFFF')
	$_shoulders.attr('fill', '#FFFFFF')
	$_trunk.attr('fill', '#FFFFFF')
	$_left_eye_pupil.attr('fill', '#000000')
	$_right_eye_pupil.attr('fill', '#000000')
	$_hinge.attr('stroke', '#000000')
	break;
		case "1":
	$_veil.attr('fill', '#E6E6E6')
	$_shoulders.attr('fill', '#E6E6E6')
	$_trunk.attr('fill', '#E6E6E6')
	$_left_eye_pupil.attr('fill', '#000000')
	$_right_eye_pupil.attr('fill', '#000000')
	$_hinge.attr('stroke', '#000000')
	break;
		case "2":
	$_veil.attr('fill', '#CCCCCC')
	$_shoulders.attr('fill', '#CCCCCC')
	$_trunk.attr('fill', '#CCCCCC')
	$_left_eye_pupil.attr('fill', '#000000')
	$_right_eye_pupil.attr('fill', '#000000')
	$_hinge.attr('stroke', '#000000')
	break;
		case "3":
	$_veil.attr('fill', '#B3B3B3')
	$_shoulders.attr('fill', '#B3B3B3')
	$_trunk.attr('fill', '#B3B3B3')
	$_left_eye_pupil.attr('fill', '#000000')
	$_right_eye_pupil.attr('fill', '#000000')
	$_hinge.attr('stroke', '#000000')
	break;
		case "4":
	$_veil.attr('fill', '#808080')
	$_shoulders.attr('fill', '#808080')
	$_trunk.attr('fill', '#808080')
	$_left_eye_pupil.attr('fill', '#000000')
	$_right_eye_pupil.attr('fill', '#000000')
	$_hinge.attr('stroke', '#000000')
	break;
		case "5":
	$_veil.attr('fill', '#666666')
	$_shoulders.attr('fill', '#666666')
	$_trunk.attr('fill', '#666666')
	$_left_eye_pupil.attr('fill', '#DC143C')
	$_right_eye_pupil.attr('fill', '#DC143C')
	$_hinge.attr('stroke', '#FFFFFF')
	break;
		case "6":
	$_veil.attr('fill', '#4D4D4D')
	$_shoulders.attr('fill', '#4D4D4D')
	$_trunk.attr('fill', '#4D4D4D')
	$_left_eye_pupil.attr('fill', '#000000')
	$_right_eye_pupil.attr('fill', '#000000')
	$_hinge.attr('stroke', '#FFFFFF')
	break;
		case "7":
	$_veil.attr('fill', '#333333')
	$_shoulders.attr('fill', '#333333')
	$_trunk.attr('fill', '#333333')
	$_left_eye_pupil.attr('fill', '#000000')
	$_right_eye_pupil.attr('fill', '#000000')
	$_hinge.attr('stroke', '#FFFFFF')
	break;
		case "8":
	$_veil.attr('fill', '#1A1A1A')
	$_shoulders.attr('fill', '#1A1A1A')
	$_trunk.attr('fill', '#1A1A1A')
	$_left_eye_pupil.attr('fill', '#000000')
	$_right_eye_pupil.attr('fill', '#000000')
	$_hinge.attr('stroke', '#FFFFFF')
	break;
		default:
	$_veil.attr('fill', '#000000')
	$_shoulders.attr('fill', '#000000')
	$_trunk.attr('fill', '#000000')
	$_left_eye_pupil.attr('fill', '#000000')
	$_right_eye_pupil.attr('fill', '#000000')
	$_hinge.attr('stroke', '#FFFFFF')
	break;
		}
	}

	let end_change_nun_dress = function (e) {
		$(document).off('mousemove', change_nun_dress)
		$(document).off('mouseup', end_change_nun_dress)
	}

	$_color_button.on('click', function () {
		let colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
						  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
						  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
						  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
						  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
						  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
						  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
						  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
						  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
						  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
		$_face.attr('fill', colorArray[Math.floor(Math.random()*colorArray.length)])
	})
})

/*add batman mode*/
