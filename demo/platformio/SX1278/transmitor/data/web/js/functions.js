function getXhr(){
	var xhr = null; 
	if(window.XMLHttpRequest) // Firefox et autres
	   xhr = new XMLHttpRequest(); 
	else if(window.ActiveXObject){ // Internet Explorer 
	   try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
	}
	else { // XMLHttpRequest non supporté par le navigateur 
	   alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
	   xhr = false; 
	} 
	return xhr;
}

function power(mac,cmd)
{
	var xhr = getXhr();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 ){
			leselect = xhr.responseText;
			document.getElementById(mac).innerHTML=leselect;
		}
	}
	xhr.open("GET","SetPower?mac="+escape(mac)+"&cmd="+escape(cmd),true);
	xhr.setRequestHeader('Content-Type','application/html');
	xhr.send();
	
}
function GetGSMStatus()
{
	var xhr = getXhr();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 ){
			leselect = xhr.responseText;
			document.getElementById("gsmstatus").innerHTML=leselect;
		}
	}
	xhr.open("GET","GetGSMStatus",true);
	xhr.setRequestHeader('Content-Type','application/html');
	xhr.send();
	
}
function GetThermostatStatus()
{
	var xhr = getXhr();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 ){
			leselect = xhr.responseText;
			document.getElementById("thermostat").innerHTML=leselect;
		}
	}
	xhr.open("GET","GetThermostatStatus",true);
	xhr.setRequestHeader('Content-Type','application/html');
	xhr.send();
}

function GetAction(mac)
{
	var xhr = getXhr();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 ){
			leselect = xhr.responseText;
			document.getElementById(mac).innerHTML=leselect;
			setTimeout(function(){ GetAction(mac); }, 3000);
		}
	}
	xhr.open("GET","GetAction?mac="+escape(mac),true);
	xhr.setRequestHeader('Content-Type','application/html');
	xhr.send();
}

function readfile(file)
{
	var xhr = getXhr();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 ){
			leselect = xhr.responseText;
			document.getElementById("title").innerHTML=file;
			document.getElementById("filename").value=file;
			document.getElementById("file").innerHTML=leselect;
		}
	}
	xhr.open("GET","readFile?file="+escape(file),true);
	xhr.setRequestHeader('Content-Type','application/html');
	xhr.send();
}

function logRefresh(ms)
{
	var xhr = getXhr();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 ){
			leselect = xhr.responseText;
			document.getElementById("console").value=leselect;
			setTimeout(function(){ logRefresh(); }, ms);
		}
	}
	xhr.open("GET","getLogBuffer",true);
	xhr.setRequestHeader('Content-Type','application/html');
	xhr.send();
}

function scanNetwork()
{
	var xhr = getXhr();
	document.getElementById("networks").innerHTML="<img src='/web/img/wait.gif'>";
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 ){
			leselect = xhr.responseText;
			document.getElementById("networks").innerHTML=leselect;
		}
	}
	xhr.open("GET","scanNetwork",true);
	xhr.setRequestHeader('Content-Type','application/html');
	xhr.send();
}

function updateSSID(val)
{
	document.getElementById("ssid").value=val;
}

function cmd(val)
{

	var xhr = getXhr();
	xhr.open("GET","cmd"+val,true);
	xhr.setRequestHeader('Content-Type','application/html');
	xhr.send();
}

//############ DO NOT CHANGE BELOW ###################

window.addEventListener('load', init, false);
function init() {
  SetConfiguredPorts();
  SetAvailablePorts();
}

function SetConfiguredPorts() {
  var _parent, _select, _option, i, j, k;
  var objects = document.querySelectorAll('input[type=number][id^=ConfiguredPorts]');
  for( j=0; j< objects.length; j++) {
    _parent = objects[j].parentNode;
    _select = document.createElement('select');
    _select.id = objects[j].id;
    _select.name = objects[j].name;
    for ( i = 0; i < configuredPorts.length; i += 1 ) {
        _option = document.createElement( 'option' );
        _option.value = configuredPorts[i].port; 
        _option.text  = configuredPorts[i].name;
        if(objects[j].value == configuredPorts[i].port) { _option.selected = true;}
        _select.add( _option ); 
    }
    _parent.removeChild( objects[j] );
    _parent.appendChild( _select );
  }
}

function SetAvailablePorts() {
  var _parent, _select, _option, i, j, k;
  var objects = document.querySelectorAll('input[type=number][id^=AllePorts], input[type=number][id^=GpioPin]');
  for( j=0; j< objects.length; j++) {
    _parent = objects[j].parentNode;
    _select = createGpioPortSelectionList(objects[j].id, objects[j].name, objects[j].value);
    _parent.removeChild( objects[j] );
    _parent.appendChild( _select );
  }

  var objects = document.querySelectorAll('input[type=number][id^=AnalogPin]');
  for( j=0; j< objects.length; j++) {
    _parent = objects[j].parentNode;
    _select = createAnalogPortSelectionList(objects[j].id, objects[j].name, objects[j].value);
    _parent.removeChild( objects[j] );
    _parent.appendChild( _select );
  }
}

function createGpioPortSelectionList(id, name, value) {
  _select = document.createElement('select');
  _select.id = id;
  _select.name = name;
  for ( i = 0; i < gpio.length; i += 1 ) {
    // alle GPIO Pins in die Liste
    _option = document.createElement( 'option' );
    _option.value = gpio[i].port; 
    if(gpio_disabled.indexOf(gpio[i].port)>=0) {_option.disabled = true;}
    if(value == (gpio[i].port)) { _option.selected = true;}
    _option.text  = gpio[i].name;
    _select.add( _option ); 
  }
  if (id.match(/^Alle.*/)) {
    // Alle PCF Ports in die Liste wenn ID match "Alle*"
    for ( k = 0; k < availablePorts.length; k++ ) {
      _option = document.createElement( 'option' );
      _option.value = _option.text = availablePorts[k];
      if(value == availablePorts[k]) { _option.selected = true;}
      _select.add( _option );
    }
  }
  return _select;
}
function createAnalogPortSelectionList(id, name, value) {
  _select = document.createElement('select');
  _select.id = id;
  _select.name = name;
  for ( i = 0; i < gpioanalog.length; i += 1 ) {
    // alle GPIO Pins in die Liste
    _option = document.createElement( 'option' );
    _option.value = gpioanalog[i].port; 
    if(value == (gpioanalog[i].port)) { _option.selected = true;}
    _option.text  = gpioanalog[i].name;
    _select.add( _option ); 
  }
  
  return _select;
}

function ShowError(t){
  if(t && t.length>0) { t += '<br>Breche Speichervorgang ab. Es wurde nichts gespeichert!' }
  document.getElementById('ErrorText').innerHTML = t;
}

/*******************************
jsontype:
	1 = standard, 1 level
  	2 = array, each item separately
*******************************/
function onSubmit(DataForm, SubmitForm, jsontype){
  //set default
  if (!jsontype) jsontype = 1;
  
  // init json String
  var formData; 
  if (jsontype == 1) { formData =  {}; }
  else if (jsontype == 2) { formData =  {data: []}; }
  
	var count = 0;
  ShowError('');
  
  var elems = document.getElementById(DataForm).elements; 
  for(var i = 0; i < elems.length; i++){ 
    if(elems[i].name && elems[i].value) {
      if (elems[i].style.display == 'none') {continue;}
      if (elems[i].parentNode.tagName == 'DIV' && elems[i].parentNode.style.display == 'none') {continue;}
      if (elems[i].parentNode.parentNode.tagName == 'TR' && elems[i].parentNode.parentNode.style.display == 'none') {continue;}
      
      if (elems[i].type == "checkbox") {
        count++;
        if (jsontype == 1) { formData[elems[i].name] = (elems[i].checked==true?1:0); }
        else if (jsontype == 2) {
        	formData.data.push({ "name" : elems[i].name,
        											 "value": (elems[i].checked==true?1:0) });
        }
      } else if (elems[i].id.match(/^Alle.*/) || 
                 elems[i].id.match(/^GpioPin.*/) || 
                 elems[i].id.match(/^AnalogPin.*/) || 
                 elems[i].type == "number") {
        count++;
        if (jsontype == 1) { formData[elems[i].name] = parseInt(elems[i].value); }
        else if (jsontype == 2) {
        	formData.data.push({ "name" : elems[i].name,
        										 	 "value": parseInt(elems[i].value) });
        }
      } else if (elems[i].type == "radio") {
        if (jsontype == 1) { if (elems[i].checked==true) {formData[elems[i].name] = elems[i].value;} }
        else if (jsontype == 2) {
        	if (elems[i].checked==true) {
            count++;
            formData.data.push({ "name" : elems[i].name,
                                 "value": elems[i].value });
           }
        }
      } else {
        if (jsontype == 1) { formData[elems[i].name] = elems[i].value; }
        else if (jsontype == 2) {
          count++;
          formData.data.push({ "name" : elems[i].name,
                               "value": elems[i].value });
        }
      }
    }
  } 
  formData["count"] = count;
  json = document.getElementById(SubmitForm).querySelectorAll("input[name='json']");

  if (json[0].value.length <= 3) {
    json[0].value = JSON.stringify(formData);
  }
 
  return true;
}

/*******************************
blendet Zeilen der Tabelle aus
  a: Array of shown IDs 
  b: Array of hidden IDs 
*******************************/
function radioselection(a,b) {
  for(var i = 0; i < a.length; i++){
    if (document.getElementById(a[i])) {document.getElementById(a[i]).style.display = 'table-row';}
  }
  for(var j = 0; j < b.length; j++){
    if(document.getElementById(b[j])) {document.getElementById(b[j]).style.display = 'none';}
  }
}

/* https://jsfiddle.net/tobiasfaust/p5q9hgsL/ */
/*******************************
reset of rawdata views
*******************************/
function reset_rawdata(rawdatatype) {
  const string_rawdata = document.getElementById(rawdatatype + '_org').innerHTML;
  let bytes = string_rawdata.split(" ");

	bytes = prettyprint_rawdata(rawdatatype, bytes, bytes);
  document.getElementById(rawdatatype).innerHTML = bytes.join(' ');
}

/*******************************
insert Tooltips and linebreaks
*******************************/
function prettyprint_rawdata(rawdatatype, bytearray, bytearray_org) {
	
  for( i=0; i< bytearray.length; i++) {
    const bstr = byte2string(bytearray_org[i]);
    const bint = byte2int(bytearray_org[i]);
    
    bytearray[i] = "<dfn class=\'tooltip_simple\' id=\'" + rawdatatype + "_" + i + "\' onclick=\'cpRawDataPos(" + i + ")\'>" + bytearray[i] + "<span role=\'tooltip_simple\'>Position: " + i + " <hr>Integer: " + bint + "<br>String: " + bstr + "</span></dfn>";
    if (i % 10 == 0) {
      bytearray[i] = ' <br>' + bytearray[i];
    }
  }
  
  return bytearray;
}

/*******************************
take over the clicked byte position into posTextField 
*******************************/
function cpRawDataPos(pos) {
	let posarray;
  const obj = document.getElementById('positions'); 
  
  if(obj.value.trim().length > 0 ) {
  	posarray = obj.value.trim().split(" ");
  } else {
  	posarray = [];
  }
  
  posarray.push(pos);
  document.getElementById('positions').value = posarray.join(",");
  
}

/*******************************
helper function
*******************************/
function byte2string(bytestring) {
	//return bytestring;
  return String.fromCharCode(parseInt(bytestring, 16));
}

/*******************************
helper function
*******************************/
function byte2int(bytestring) {
	return parseInt(Number(bytestring), 10);
}

/*******************************
compute result from selected positions
*******************************/
function check_rawdata() {
  const datatype = document.querySelector('input[name="datatype"]:checked').value;
  const rawdatatype = document.querySelector('input[name="rawdatatype"]:checked').value;
  const string_positions = document.getElementById('positions').value;
  const string_rawdata = document.getElementById(rawdatatype + '_org').innerHTML;
  
  let   bytes = string_rawdata.split(" ");
  const pos = string_positions.split(",");
  const bytes_org = string_rawdata.split(" ");
  
  // reset all rawdata containers
	reset_rawdata('id_rawdata');
  reset_rawdata('live_rawdata');
  
	let result;
  if (datatype == 'int') { result = 0; }
  if (datatype == 'string') { result = "";}
  
	for( j=0; j< pos.length; j++) {
    if (datatype == 'int') { 
    	result = result << 8 | byte2int(bytes[Number(pos[j])]); 
    }
		if (datatype == 'string') { 
    	result = result + byte2string(bytes[Number(pos[j])]); 
    }
    
   bytes[Number(pos[j])] = "<span id=\'" + rawdatatype +"_" + Number(pos[j]) + "_val\' style='color: red;'>" + bytes[Number(pos[j])] + "</span>";
  }
  
  document.getElementById('rawdata_result').innerHTML = "= " + result;
  document.getElementById(rawdatatype).innerHTML = prettyprint_rawdata(rawdatatype, bytes, bytes_org).join(' ');
}

function directory_button_handler(fileName, action) {
  // 构造基础URL

  let url = `/file-action?name=${encodeURIComponent(fileName)}`;

  // 根据动作类型修改HTTP方法和URL
  let fetchOptions = { method: 'GET' };

  if (action === 'delete') {
    // 如果是删除动作，发送DELETE请求
    fetchOptions.method = 'DELETE';
  }

  // 发送请求到服务器
  fetch(url, fetchOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.blob();
    })
    .then(blob => {
      if (action === 'download') {
        // 处理文件下载
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        alert('Download started!');
      } else if (action === 'delete') {
        // 删除成功后，可以刷新文件列表或进行其他操作
        alert('File deleted successfully!');
        // 这里可能需要刷新文件列表或者重新加载页面部分
      }
    })
    .catch(e => {
      console.error('There was a problem with the fetch operation:', e);
      alert('Error handling the file operation.');
    });
}
