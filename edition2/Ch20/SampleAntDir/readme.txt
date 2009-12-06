In a command window, navigate to this directory, then run:

    ant js.concatenate

To create the output.js file in the /js directory.

Before running, you will need to download the JDK and Ant. The JDK can be downloaded from http://java.sun.com/javase/downloads/index.jsp. Ant can be downloaded from http://ant.apache.org. Follow the setup instructions for each.

To run the js.verify target, you'll need to download Rhino (http://www.mozilla.org/rhino/) and JSLint (http://www.jslint.com/rhino/).

To run the js.compress target, you'll need to download the YUI Compressor (http://developer.yahoo.com/yui/compressor/).

You can run all tasks by running:

    ant all