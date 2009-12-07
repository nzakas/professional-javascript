import java.applet.Applet;
import java.awt.Graphics;
import java.awt.HeadlessException;
/*
 * Created on Nov 27, 2004
 *
 */

/**
 * @author Nicholas Zakas
 *
 */
public class ExampleApplet extends Applet {

	private String message = "Hello World!";

	public ExampleApplet() throws HeadlessException {
		super();
	}
	
	public void paint(Graphics g) {
		g.drawString(message, 20, 20);
	}
	
	public void setMessage(String message) {
		this.message = message;
		repaint();
	}
}
