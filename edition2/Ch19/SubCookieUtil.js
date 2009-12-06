var SubCookieUtil = {

    get: function (name, subName){
        var subCookies = this.getAll(name);
        if (subCookies){
            return subCookies[subName];
        } else {
            return null;
        }
    },
    
    getAll: function(name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            result = {};
            
        if (cookieStart > -1){
            var cookieEnd = document.cookie.indexOf(";", cookieStart)
            if (cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
            
            if (cookieValue.length > 0){
                var subCookies = cookieValue.split("&");
                
                for (var i=0, len=subCookies.length; i < len; i++){
                    var parts = subCookies[i].split("=");
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
    
                return result;
            }  
        } 

        return null;
    },
    
    set: function (name, subName, value, expires, path, domain, secure) {
    
        var subcookies = this.getAll(name) || {};
        subcookies[subName] = value;
        this.setAll(name, subcookies, expires, path, domain, secure);

    },
    
    setAll: function(name, subcookies, expires, path, domain, secure){
    
        var cookieText = encodeURIComponent(name) + "=";
        var subcookieParts = new Array();
        
        for (var subName in subcookies){
            if (subName.length > 0 && subcookies.hasOwnProperty(subName)){
                subcookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subcookies[subName]));
            }
        }
        
        if (subcookieParts.length > 0){
            cookieText += subcookieParts.join("&");
                
            if (expires instanceof Date) {
                cookieText += "; expires=" + expires.toGMTString();
            }
        
            if (path) {
                cookieText += "; path=" + path;
            }
        
            if (domain) {
                cookieText += "; domain=" + domain;
            }
        
            if (secure) {
                cookieText += "; secure";
            }
        } else {
            cookieText += "; expires=" + (new Date(0)).toGMTString();
        }
    
        document.cookie = cookieText;        
    
    },
    
    unset: function (name, subName, path, domain, secure){
        var subcookies = this.getAll(name);
        if (subcookies){
            delete subcookies[subName];
            this.setAll(name, subcookies, null, path, domain, secure);
        }
    },
    
    unsetAll: function(name, path, domain, secure){
        this.setAll(name, null, new Date(0), path, domain, secure);
    }

};