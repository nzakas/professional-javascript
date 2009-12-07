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
public class ExampleApplet2 extends Applet {

	private String message = "Hello World!";

	public ExampleApplet2() throws HeadlessException {
		super();
	}
	
	public void paint(Graphics g) {
		g.drawString(message, 20, 20);
	}
	
	public void setMessage(String message) throws Exception {
		if (message.length()== 0) {
			throw new Exception("Message must have at least one character.");
		}
		
		this.message = message;
		repaint();
	}
}
