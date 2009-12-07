var ListUtil = new Object();

ListUtil.getSelectedIndexes = function (oListbox) {
    var arrIndexes = new Array;

    for (var i=0; i < oListbox.options.length; i++) {
        if (oListbox.options[i].selected) {
            arrIndexes.push(i);
        }
    }

    return arrIndexes;
};

ListUtil.add = function (oListbox, sName, sValue) {

    var oOption = document.createElement("option");
    oOption.appendChild(document.createTextNode(sName));

    if (arguments.length == 3) {
        oOption.setAttribute("value", sValue);
    }

    oListbox.appendChild(oOption);

}

ListUtil.remove = function (oListbox, iIndex) {
    oListbox.remove(iIndex);
};

ListUtil.clear = function (oListbox) {
    for (var i=oListbox.options.length-1; i >= 0; i--) {
        ListUtil.remove(oListbox, i);
    }
};

ListUtil.move = function (oListboxFrom, oListboxTo, iIndex) {
    var oOption = oListboxFrom.options[iIndex];

    if (oOption != null) {
        oListboxTo.appendChild(oOption);
    }
};

ListUtil.shiftUp = function (oListbox, iIndex) {
    if (iIndex > 0) {    
        var oOption = oListbox.options[iIndex];
        var oPrevOption = oListbox.options[iIndex-1];
        oListbox.insertBefore(oOption, oPrevOption);
    }    
};

ListUtil.shiftDown = function (oListbox, iIndex) {
    if (iIndex < oListbox.options.length - 1) {
        var oOption = oListbox.options[iIndex];
        var oNextOption = oListbox.options[iIndex+1];
        oListbox.insertBefore(oNextOption, oOption);
    }
};

