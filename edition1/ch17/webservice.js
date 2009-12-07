
function WebService() {
    this.action = " ";
    this.url = "";
}

WebService.prototype.buildRequest = function () {
    return "";
};

WebService.prototype.handleResponse = function (oSOAP) {

};

WebService.prototype.send = function () {

    if (isMoz) {        
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
        } catch (oError) {
            alert(oError);
            return false;
        } 
    }
    
    var oRequest = new XMLHttpRequest;
    oRequest.open("post", this.url, false);
    oRequest.setRequestHeader("Content-Type", "text/xml");
    oRequest.setRequestHeader("SOAPAction", this.action);
    oRequest.send(this.buildRequest());
    if (oRequest.status == 200) {
        return this.handleResponse(oRequest.responseText);
    } else{
        throw new Error("Request did not complete, code " + oRequest.status);
    }
};


function TemperatureService() {
        WebService.apply(this);
        this.url = "http://services.xmethods.net:80/soap/servlet/rpcrouter";
        this.zipcode = "";
}

TemperatureService.prototype = new WebService;

TemperatureService.prototype.buildRequest = function () {
    var oBuffer = new StringBuffer();
    
    oBuffer.append("<soap:Envelope xmlns:n=\"urn:xmethods-Temperature\" ");
    oBuffer.append("xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" ");
    oBuffer.append("xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\" ");
    oBuffer.append("xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" ");
    oBuffer.append("xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">");
    oBuffer.append("<soap:Body soap:encodingStyle=");
    oBuffer.append("\"http://schemas.xmlsoap.org/soap/encoding/\">");
    oBuffer.append("<n:getTemp><zipcode xsi:type=\"xs:string\">");
    oBuffer.append(this.zipcode);
    oBuffer.append("</zipcode></n:getTemp></soap:Body></soap:Envelope>");
    
    return oBuffer.toString();
};

TemperatureService.prototype.handleResponse = function (sResponse) {
    var oRE = /<return .*?>(.*)<\/return>/gi;
    oRE.test(sResponse);
    return parseFloat(RegExp["$1"]);
};


TemperatureService.prototype.webServiceSend = TemperatureService.prototype.send;
TemperatureService.prototype.send = function (sZipcode) {
        this.zipcode = sZipcode;
        return this.webServiceSend();
};


