var client = function(){

    var client = {
        
        //rendering engines
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,

        //specific version
        ver: null,
        
        //platform
        win: false,
        mac: false,
        x11: false,
        
        //mobile devices
        iphone: false,
        ipod: false,
        nokiaN: false,
        winMobile: false,
        
        //game systems
        wii: false,
        ps: false
    };

    //detect rendering engines
    var ua = navigator.userAgent;    
    if (window.opera){
        client.ver = window.opera.version();
        client.opera = parseFloat(client.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)){
        client.ver = RegExp["$1"];
        client.webkit = parseFloat(client.ver);
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
        client.ver = RegExp["$1"];
        client.khtml = parseFloat(client.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){    
        client.ver = RegExp["$1"];
        client.gecko = parseFloat(client.ver);
    } else if (/MSIE ([^;]+)/.test(ua)){    
       client.ver = RegExp["$1"];
       client.ie = parseFloat(client.ver);
    }

    //detect platform
    var p = navigator.platform;
    client.win = p.indexOf("Win") == 0;
    client.mac = p.indexOf("Mac") == 0;
    client.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

    //detect windows operating systems
    if (client.win){
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
            if (RegExp["$1"] == "NT"){
                switch(RegExp["$2"]){
                    case "5.0":
                        client.win = "2000";
                        break;
                    case "5.1":
                        client.win = "XP";
                        break;
                    case "6.0":
                        client.win = "Vista";
                        break;
                    default:
                        client.win = "NT";
                        break;                
                }                            
            } else if (RegExp["$1"] == "9x"){
                client.win = "ME";
            } else {
                client.win = RegExp["$1"];
            }
        }
    }
    
    //mobile devices
    client.iphone = ua.indexOf("iPhone") > -1;
    client.ipod = ua.indexOf("iPod") > -1;
    client.nokiaN = ua.indexOf("NokiaN") > -1;
    client.winMobile = (client.win == "CE");
    
    //gaming systems
    client.wii = ua.indexOf("Wii") > -1;
    client.ps = /playstation/i.test(ua);
    
    //return it
    return client;

}();
