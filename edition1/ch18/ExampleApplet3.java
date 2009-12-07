import java.applet.Applet;
import java.awt.Graphics;
import java.awt.HeadlessException;

import netscape.javascript.JSObject;

/**
 * @author Nicholas Zakas
 */
public class ExampleApplet3 extends Applet {

    /**
     * @throws java.awt.HeadlessException
     */
    public ExampleApplet3() throws HeadlessException {
        super();
    }

    public void paint(Graphics g) {
        JSObject window = JSObject.getWindow(this);
        JSObject document = (JSObject) window.getMember("document");
        JSObject location = (JSObject) document.getMember("location");
        
        g.drawString("Title: " + document.getMember("title"), 10, 20);
        g.drawString("URL: " + location.getMember("href"), 10, 40);
        
        window.eval("getMessageFromApplet(\"Hello from the Java applet!\")");
        
    }
}
