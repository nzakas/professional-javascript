var TextUtil = new Object;

TextUtil.isNotMax = function(oTextArea) {
    return oTextArea.value.length != oTextArea.getAttribute("maxlength");
};

TextUtil.blockChars = function (oTextbox, oEvent, bBlockPaste) {

    oEvent = EventUtil.formatEvent(oEvent);
         
    var sInvalidChars = oTextbox.getAttribute("invalidchars");
    var sChar = String.fromCharCode(oEvent.charCode);
    
    var bIsValidChar = sInvalidChars.indexOf(sChar) == -1;
       
    if (bBlockPaste) {
        return bIsValidChar && !(oEvent.ctrlKey && sChar == "v");
    } else {
        return bIsValidChar || oEvent.ctrlKey;
    }
};

TextUtil.allowChars = function (oTextbox, oEvent, bBlockPaste) {

    oEvent = EventUtil.formatEvent(oEvent);
         
    var sValidChars = oTextbox.getAttribute("validchars");
    var sChar = String.fromCharCode(oEvent.charCode);
    
    var bIsValidChar = sValidChars.indexOf(sChar) > -1;
    
    if (bBlockPaste) {
        return bIsValidChar && !(oEvent.ctrlKey && sChar == "v");
    } else {
        return bIsValidChar || oEvent.ctrlKey;
    }
};

TextUtil.blurBlock = function(oTextbox) {

    //get the invalid characters
    var sInvalidChars = oTextbox.getAttribute("invalidchars");

    //split the invalid characters into a character array
    var arrInvalidChars = sInvalidChars.split("");
    
    //iterate through the characters
    for (var i=0; i< arrInvalidChars.length; i++){
        if (oTextbox.value.indexOf(arrInvalidChars[i]) > -1) {
            alert("Character '" + arrInvalidChars[i] + "' not allowed.");
            oTextbox.focus();
            oTextbox.select();
            return;
        }
    }    
};


TextUtil.blurAllow = function(oTextbox) {
    //get the valid characters
    var sValidChars = oTextbox.getAttribute("validchars");
    
    //split the textbox value string into a character array
    var arrTextChars = oTextbox.value.split("");
   
    //iterate through the characters
    for (var i=0; i< arrTextChars.length; i++){
        if (sValidChars.indexOf(arrTextChars[i]) == -1) {
             alert("Character '" + arrTextChars[i] + "' not allowed.");
             oTextbox.focus();
             oTextbox.select();
             return;
        }
    }
};    

TextUtil.numericScroll = function (oTextbox, oEvent) {

    oEvent = EventUtil.formatEvent(oEvent);
    var iValue = oTextbox.value.length == 0 ? 0 :parseInt(oTextbox.value);
    
    var iMax = oTextbox.getAttribute("max");
    var iMin = oTextbox.getAttribute("min");

    if (oEvent.keyCode == 38) {
        if (iMax == null || iValue < iMax) {
            oTextbox.value = (iValue + 1);
        }
    } else if (oEvent.keyCode == 40){
        if (iMin == null || iValue > iMin) {
            oTextbox.value = (iValue - 1);
        }
    }
};

TextUtil.autosuggestMatch = function (sText, arrValues) {

    var arrResult = new Array;

    if (sText != "") {
        for (var i=0; i < arrValues.length; i++) {
            if (arrValues[i].indexOf(sText) == 0) {
                arrResult.push(arrValues[i]);
            }
        }
    }

   return arrResult;

};

TextUtil.autosuggest = function (oTextbox, arrValues, sListboxId) {
    
    var oListbox = document.getElementById(sListboxId);
    var arrMatches = TextUtil.autosuggestMatch(oTextbox.value, arrValues);
    
    ListUtil.clear(oListbox);
    
    for (var i=0; i < arrMatches.length; i++) {
        ListUtil.add(oListbox, arrMatches[i]);
    }
    
};
