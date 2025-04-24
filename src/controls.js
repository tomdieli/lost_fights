import { Container,  Graphics, Text } from 'pixi.js';


// Function to create a button
export function createButton(text, style, width, height, onPointerDown, onPointerUp) {
    const buttonContainer = new Container();
    buttonContainer.interactive = true; // Make the container interactive
    buttonContainer.buttonMode = true; // Enable pointer cursor on hover

    // Create the button background
    const buttonBackground = new Graphics();

    // Create the button text
    const buttonText = new Text({text, style});
    buttonText.x = (width - buttonText.width) / 2;
    buttonText.y = (height - buttonText.height) / 2;

    // Add background and text to the container
    buttonContainer.addChild(buttonBackground);
    buttonContainer.addChild(buttonText);

    // Add event listeners
    buttonContainer.on("pointerdown", onPointerDown);
    buttonContainer.on("pointerup", onPointerUp);

    return buttonContainer;
  }
