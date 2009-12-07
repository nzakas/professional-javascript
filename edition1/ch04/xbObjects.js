/*
 * xbObjects.js
 * $Revision: 1.2 $ $Date: 2003/02/07 16:04:20 $
 */

/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Bob Clary code.
 *
 * The Initial Developer of the Original Code is
 * Bob Clary.
 * Portions created by the Initial Developer are Copyright (C) 2000
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s): Bob Clary <bc@bclary.com>
 *
 * ***** END LICENSE BLOCK ***** */

/*
ChangeLog: 2001-12-19 - bclary - changed xbException init method to 
           remove possible exception due to permission denied issues
           in gecko 0.9.5+
*/

function _Classes()
{
  if (typeof(_classes) != 'undefined')
    throw('Only one instance of _Classes() can be created');
    
  function registerClass(className, parentClassName)
  {
    if (!className)
      throw('xbObjects.js:_Classes::registerClass: className missing');
      
    if (className in _classes)
      return;
      
    if (className != 'xbObject' && !parentClassName)
      parentClassName = 'xbObject';
      
    if (!parentClassName)
      parentClassName = null;
    else if ( !(parentClassName in _classes))
      throw('xbObjects.js:_Classes::registerClass: parentClassName ' + parentClassName + ' not defined');

    // evaluating and caching the prototype object in registerClass
    // works so long as we are dealing with 'normal' source files
    // where functions are created in the global context and then 
    // statements executed. when evaling code blocks as in xbCOM,
    // this no longer works and we need to defer the prototype caching
    // to the defineClass method

    _classes[className] = { 'classConstructor': null, 'parentClassName': parentClassName };
  }
  _Classes.prototype.registerClass = registerClass;

  function defineClass(className, prototype_func)
  {
    var p;

    if (!className)
      throw('xbObjects.js:_Classes::defineClass: className not given');
      
    var classRef = _classes[className];
    if (!classRef)
      throw('xbObjects.js:_Classes::defineClass: className ' + className + ' not registered');
    
    if (classRef.classConstructor)
      return;
      
    classRef.classConstructor = eval( className );
    var childPrototype  = classRef.classConstructor.prototype;
    var parentClassName = classRef.parentClassName;
      
    if (parentClassName)
    {
      var parentClassRef = _classes[parentClassName];
      if (!parentClassRef)
        throw('xbObjects.js:_Classes::defineClass: parentClassName ' + parentClassName + ' not registered');

      if (!parentClassRef.classConstructor)
      {
        // force parent's prototype to be created by creating a dummy instance
        // note constructor must handle 'default' constructor case
        var dummy;
        eval('dummy = new ' + parentClassName + '();');
      }
        
      var parentPrototype = parentClassRef.classConstructor.prototype;
    
      for (p in parentPrototype)
      {
        switch (p)
        {
        case 'isa':
        case 'classRef':
        case 'parentPrototype':
        case 'parentConstructor':
        case 'inheritedFrom':
          break;
        default:
          childPrototype[p] = parentPrototype[p];
          break;
        }
      }
    }

    prototype_func();
    
    childPrototype.isa        = className;
    childPrototype.classRef   = classRef;

    // cache method implementor info
    childPrototype.inheritedFrom = new Object();
    if (parentClassName)
    {
      for (p in parentPrototype)
      {
        switch (p)
        {
        case 'isa':
        case 'classRef':
        case 'parentPrototype':
        case 'parentConstructor':
        case 'inheritedFrom':
          break;
        default:
          if (childPrototype[p] == parentPrototype[p] && parentPrototype.inheritedFrom[p])
          {
            childPrototype.inheritedFrom[p] = parentPrototype.inheritedFrom[p];
          }
          else
          {
            childPrototype.inheritedFrom[p] = parentClassName;
          }
          break;
        }
      }
    }
  }
  _Classes.prototype.defineClass = defineClass;
}

// create global instance
var _classes = new _Classes();

// register root class xbObject
_classes.registerClass('xbObject');

function xbObject()
{
  _classes.defineClass('xbObject', _prototype_func);

  this.init();
  
  function _prototype_func()
  {
    // isa is set by defineClass() to the className
    // Note that this can change dynamically as the class is cast
    // into it's ancestors...
    xbObject.prototype.isa        = null;  
    
    // classref is set by defineClass() to point to the 
    // _classes entry for this class. This allows access 
    // the original _class's entry no matter how it has 
    // been recast. 
    // *** This will never change!!!! ***
    xbObject.prototype.classRef      = null;
    
    xbObject.prototype.inheritedFrom = new Object();

    function init() { }
    xbObject.prototype.init        = init;
    
    function destroy() {}
    xbObject.prototype.destroy      = destroy;

    function parentMethod(method, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10)
    {
      // find who implemented this method
      var className       = this.isa;
      var parentClassName = _classes[className].classConstructor.prototype.inheritedFrom[method];
      var tempMethod      = _classes[parentClassName].classConstructor.prototype[method];
      // 'cast' this into the implementor of the method
      // so that if parentMethod is called by the parent's method, 
      // the search for it's implementor will start there and not
      // cause infinite recursion
      this.isa   = parentClassName;
      var retVal = tempMethod.call(this, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10);
      this.isa   = className;

      return retVal;
    }
    xbObject.prototype.parentMethod    = parentMethod;

    function isInstanceOf(otherClassConstructor)
    {
      var className = this.isa;
      var otherClassName = otherClassConstructor.prototype.isa;

      while (className)
      {
        if (className == otherClassName)
          return true;

        className = _classes[className].parentClassName;
      }

      return false;
    }
    xbObject.prototype.isInstanceOf    = isInstanceOf;
  }
}

// eof: xbObjects.js
//</SCRIPT>
