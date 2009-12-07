
function XmlDom() {
    if (window.ActiveXObject) {
        var arrSignatures = ["MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0",
                             "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument",
                             "Microsoft.XmlDom"];
                         
        for (var i=0; i < arrSignatures.length; i++) {
            try {
        
                var oXmlDom = new ActiveXObject(arrSignatures[i]);
            
                return oXmlDom;
        
            } catch (oError) {
                //ignore
            }
        }          

        throw new Error("MSXML is not installed on your system."); 
              
    } else if (document.implementation && document.implementation.createDocument) {
        
        var oXmlDom = document.implementation.createDocument("","",null);

        oXmlDom.parseError = {
            valueOf: function () { return this.errorCode; },
            toString: function () { return this.errorCode.toString() }
        };
        
        oXmlDom.__initError__();
                
        oXmlDom.addEventListener("load", function () {
            this.__checkForErrors__();
            this.__changeReadyState__(4);
        }, false);

        return oXmlDom;        
        
    } else {
        throw new Error("Your browser doesn't support an XML DOM object.");
    }
}

if (isMoz) {

    Document.prototype.readyState = 0;
    Document.prototype.onreadystatechange = null;

    Document.prototype.__changeReadyState__ = function (iReadyState) {
        this.readyState = iReadyState;

        if (typeof this.onreadystatechange == "function") {
            this.onreadystatechange();
        }
    };

    Document.prototype.__initError__ = function () {
        this.parseError.errorCode = 0;
        this.parseError.filepos = -1;
        this.parseError.line = -1;
        this.parseError.linepos = -1;
        this.parseError.reason = null;
        this.parseError.srcText = null;
        this.parseError.url = null;
    };
    
    Document.prototype.__checkForErrors__ = function () {

        if (this.documentElement.tagName == "parsererror") {

            var reError = />([\s\S]*?)Location:([\s\S]*?)Line Number (\d+), Column (\d+):<sourcetext>([\s\S]*?)(?:\-*\^)/;

            reError.test(this.xml);
            
            this.parseError.errorCode = -999999;
            this.parseError.reason = RegExp.$1;
            this.parseError.url = RegExp.$2;
            this.parseError.line = parseInt(RegExp.$3);
            this.parseError.linepos = parseInt(RegExp.$4);
            this.parseError.srcText = RegExp.$5;
        }
    };
    
        
    Document.prototype.loadXML = function (sXml) {
    
        this.__initError__();
    
        this.__changeReadyState__(1);
    
        var oParser = new DOMParser();
        var oXmlDom = oParser.parseFromString(sXml, "text/xml");
 
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        for (var i=0; i < oXmlDom.childNodes.length; i++) {
            var oNewNode = this.importNode(oXmlDom.childNodes[i], true);
            this.appendChild(oNewNode);
        }
        
        this.__checkForErrors__();
        
        this.__changeReadyState__(4);

    };
    
    Document.prototype.__load__ = Document.prototype.load;

    Document.prototype.load = function (sURL) {
        this.__initError__();
        this.__changeReadyState__(1);
        this.__load__(sURL);
    };
    
    Node.prototype.__defineGetter__("xml", function () {
        var oSerializer = new XMLSerializer();
        return oSerializer.serializeToString(this, "text/xml");
    });

}