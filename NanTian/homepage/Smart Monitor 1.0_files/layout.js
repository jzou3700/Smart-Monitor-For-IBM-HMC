var viewportwidth;
var viewportheight;

// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight

if (typeof window.innerWidth != 'undefined')
{
	viewportwidth = window.innerWidth;
	viewportheight = window.innerHeight;
}

//IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)

else if (typeof document.documentElement != 'undefined'
	&& typeof document.documentElement.clientWidth !=
		'undefined' && document.documentElement.clientWidth != 0)
{
	viewportwidth = document.documentElement.clientWidth;
	viewportheight = document.documentElement.clientHeight;
}

// older versions of IE

else
{
	viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
	viewportheight = document.getElementsByTagName('body')[0].clientHeight;
}

//-->


var ob;
var over = false;
var iEdgeThreshold = 10;
var obwidth, obwidth2;

function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
	}
	return [ curleft, curtop ];
}

/* Function that tells me if on the border or not */
function isOnBorderRight(objTable, objTh, event) {
	var width = objTh.offsetWidth;
	var left = objTh.offsetLeft;
	var pos = findPos(objTable);
	var absRight = pos[0] + left + width;

	if (event.clientX > (absRight - iEdgeThreshold)) {
		return true;
	}

	return false;
}

function getNodeName(objReference, nodeName) {
	var oElement = objReference;
	while (oElement != null && oElement.tagName != null
			&& oElement.tagName != "BODY") {
		if (oElement.tagName.toUpperCase() == nodeName) {
			return oElement;
		}
		oElement = oElement.parentNode;
	}
	return null;
}

function doResize(objTh, event) {
	if (!event)
		event = window.event;
	var objTable = getNodeName(objTh, "DIV");
	if (isOnBorderRight(objTable, objTh, event)) {
		over = true;
		objTh.style.cursor = "e-resize";
	} else {
		over = false;
		objTh.style.cursor = "";
	}
	return over;
}

function doneResizing() {
	over = false;
}

function MD(event) {
	if (!event)
		event = window.event;

	MOUSTSTART_X = event.clientX;
	MOUSTSTART_Y = event.clientY;

	if (over) {
		if (event.srcElement)
			ob = event.srcElement;
		else if (event.target)
			ob = event.target;
		else
			return;

		ob = getNodeName(ob, "DIV");
		if (ob == null)
			return;
		obwidth = parseFloat(ob.style.width);
		ob2 = document.getElementById("center");
		obwidth2 = parseFloat(ob2.offsetWidth);
	}
}

function MM(event) {
	if (!event)
		event = window.event;

	if (ob) {
		st = event.clientX - MOUSTSTART_X + obwidth * screenWidth / 100;
		st2 = obwidth2 - event.clientX + MOUSTSTART_X;

		if (st >= 10) {
			ob.style.width = (st / screenWidth * 100.0).toFixed(2) + "%";
			ob2.style.width = (100.0 - st / screenWidth * 100.0 - 0.5).toFixed(2) + "%";
			// document.innerHTML(document.innerHTML + st + ",");
		}
		if (document.selection)
			document.selection.empty();
		else if (window.getSelection)
			window.getSelection().removeAllRanges();
	}
}

function MU(event) {
	if (!event)
		event = window.event;
	if (ob) {
		if (document.selection)
			document.selection.empty();
		else if (window.getSelection)
			window.getSelection().removeAllRanges();
		var form = document.createElement('form');
		var cmd = document.createElement('input');
		cmd.name='cmd';
		cmd.type='hidden';
		cmd.value='top';
		var subcommand = document.createElement('input');
		subcommand.name='subcommand';
		subcommand.type='hidden';
		subcommand.value='set';
		var left = document.createElement('input');
		left.name='leftWidth';
		left.type='hidden';
		left.value=parseFloat(ob.style.width);
		var right = document.createElement('input');
		right.name='centerWidth';
		right.type='hidden';
		right.value=parseFloat(ob2.style.width);
		form.appendChild(cmd);
		form.appendChild(subcommand);
		form.appendChild(left);
		form.appendChild(right);
		document.body.appendChild(form);
		form.submit();
		ob = null;
	}
}

document.onmousedown = MD;
document.onmousemove = MM;
document.onmouseup = MU;

var screenWidth, screenHeight;
function InitColumnsSize() {
	var myWidth = 0, myHeight = 0;
	if (typeof (window.innerWidth) == 'number') {
		//Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	} else if (document.documentElement
			&& (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		//IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	} else if (document.body
			&& (document.body.clientWidth || document.body.clientHeight)) {
		//IE 4 compatible
		myWidth = document.body.clientWidth;
		myHeight = document.body.clientHeight;
	}
	screenWidth = myWidth;
	screenHeight = myHeight - 50;
	// window.alert('Width = ' + screenHeight);
	// window.alert('screenHeight = ' + screenHeight);
	var headHeight = 90;
	var head = document.getElementById("ibm-universal-nav");
	head.style.height = headHeight + "px";
//	var left = document.getElementById("left");
//	left.style.height = (screenHeight - headHeight) + "px";
	var center = document.getElementById("center");
	center.style.height = (screenHeight - headHeight) + "px";
}

function initDocument() {
	FixedSize();
	alert('initdocument');
	setScrollTop();
}
function saved_FixedSize() {
	var w=window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;

	var h=window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight;

	x=document.getElementById("demo");
	x.innerHTML="Browser inner window width: " + w + ", height: " + h + ".";
	var headHeight = 900;
	var head = document.getElementById("head");
	head.style.height = headHeight + "px";
	var left = document.getElementById("left");
	left.style.height = (h - headHeight) + "px";
	var center = document.getElementById("center");
	center.style.height = (h - headHeight) + "px";
}

function display_off(obj) {
	var string="";
	for (i in obj) {
		string += i + " : " + this[i] + "\n";
	}
	alert(string);
	obj.style.display = 'none';
	window.location = "http://news.sina.com.cn";
}

function displayMatchedOnly(torf) {
	window.location = "zsh?cmd=top&subcommand=set&displayMatchedOnly="
		+ torf;
}

function displayForm(torf) {
	window.location = "zsh?cmd=top&form="
		+ torf;
}

function enableSwitch(torf) {
	window.location = "zsh?cmd=top&subcommand=set&&switchNode="
		+ torf;
}

function scan() {
	window.location = "zsh?cmd=top&scan=true";
}

function changView(view) {
	window.location = "zsh?cmd=top&subcommand=changeview&view=" + view;
}

function clean() {
	window.location = "zsh?cmd=top&subcommand=clean";
}

function run() {
	var newScript = document.createElement('script'); 
	newScript.setAttribute('src', 'hello'); 
	document.body.appendChild(newScript); 		
}

function displayResult(element) {
	string = "";
	for(i in element) {
		string += i + "\n";
	}
	alert(string);
}
function treeExpandLevel(level) {
	var form = document.createElement('form');
	form.innerHTML += "<input type='hidden' name='cmd' value='top'>";
	form.innerHTML += "<input type='hidden' name='subcommand' value='set'>";
	form.innerHTML += "<input type='hidden' name='level' value='" + level + "'>";
	document.body.appendChild(form);
	form.submit();
}

function setLevel(level) {
	window.location = "zsh?cmd=top&subcommand=set&level=" + level;
}

function changeNode(cwd) {
	window.location = "zsh?cmd=top&cwd=" + cwd;
}

function print(o) {
	var output = ''; 
	for(item in o) { 
		if ( item == "innerHTML" ) {
		} else if ( item == "outerHTML" ) {
		} else if ( item == "textContent" ) {
		} else {
			output += item + '=' + o[item] + '\n'; 
		}
	}
	alert(output);
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
}