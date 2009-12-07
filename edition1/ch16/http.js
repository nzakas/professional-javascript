
var bXmlHttpSupport = (typeof XMLHttpRequest == "object" || window.ActiveXObject);

function httpPost(sURL, sParams) {
                       
    var oURL = new java.net.URL(sURL);
    var oConnection = oURL.openConnection();

    oConnection.setDoInput(true);
    oConnection.setDoOutput(true);
    oConnection.setUseCaches(false);                
    oConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");                

    var oOutput = new java.io.DataOutputStream(oConnection.getOutputStream());
    oOutput.writeBytes(sParams);
    oOutput.flush();
    oOutput.close();

    var sLine = "", sResponseText = "";

    var oInput = new java.io.DataInputStream(oConnection.getInputStream());                                
    sLine = oInput.readLine();
    
    while (sLine != null){                                
        sResponseText += sLine + "\n";
        sLine = oInput.readLine();
    }
                                  
    oInput.close();                                  

    return sResponseText;                         
}

function addPostParam(sParams, sParamName, sParamValue) {
    if (sParams.length > 0) {
        sParams += "&";
    }
    return sParams + encodeURIComponent(sParamName) + "=" 
                   + encodeURIComponent(sParamValue);
}

function addURLParam(sURL, sParamName, sParamValue) {
    sURL += (sURL.indexOf("?") == -1 ? "?" : "&");
    sURL += encodeURIComponent(sParamName) + "=" + encodeURIComponent(sParamValue);
    return sURL;   
}

function httpGet(sURL) {
    var sResponseText = "";
    var oURL = new java.net.URL(sURL);
    var oStream = oURL.openStream();
    var oReader = new java.io.BufferedReader(new java.io.InputStreamReader(oStream));
    
    var sLine = oReader.readLine();
    while (sLine != null) {
        sResponseText += sLine + "\n";
        sLine = oReader.readLine();
    }
    
    oReader.close();
    return sResponseText;
}

if (typeof XMLHttpRequest == "undefined" && window.ActiveXObject) {

    function XMLHttpRequest() {

        var arrSignatures = ["MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0",
                             "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP",
                             "Microsoft.XMLHTTP"];
                         
        for (var i=0; i < arrSignatures.length; i++) {
            try {
        
                var oRequest = new ActiveXObject(arrSignatures[i]);
            
                return oRequest;
        
            } catch (oError) {
                //ignore
            }
        }          

        throw new Error("MSXML is not installed on your system.");               
    }
}


var Http = new Object;

Http.get = function (sURL, fnCallback) {
 
    if (bXmlHttpSupport) {
   
        var oRequest = new XMLHttpRequest();
        oRequest.open("get", sURL, true);
        oRequest.onreadystatechange = function () {
            if (oRequest.readyState == 4) {
                fnCallback(oRequest.responseText);
            }
        }
        oRequest.send(null);    
    
    } else if (navigator.javaEnabled() && typeof java != "undefined" 
            && typeof java.net != "undefined") {
            
        setTimeout(function () {
            fnCallback(httpGet(sURL));
        }, 10);
    } else {
        alert("Your browser doesn't support HTTP requests.");
    }          

};

Http.post = function (sURL, sParams, fnCallback) {
 
    if (bXmlHttpSupport) {
   
        var oRequest = new XMLHttpRequest();
        oRequest.open("post", sURL, true);
        oRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        oRequest.onreadystatechange = function () {
            if (oRequest.readyState == 4) {
                fnCallback(oRequest.responseText);
            }
        }
        oRequest.send(sParams);    
    
    } else if (navigator.javaEnabled() && typeof java != "undefined" 
            && typeof java.net != "undefined") {
            
        setTimeout(function () {
            fnCallback(httpPost(sURL, sParams));
        }, 10);
    } else {
        alert("Your browser doesn't support HTTP requests.");
    }          

};