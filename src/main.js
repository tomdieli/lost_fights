import { Application, Assets, Graphics, Text } from "pixi.js";
import { Button } from '@pixi/ui';
import { Player } from './player';

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container").appendChild(app.canvas);

  // Load the assets
  await Assets.load(['assets/stick_stand1.png', 'assets/stick_stand2.png',
    'assets/stick_walk1.png', 'assets/stick_walk2.png', 'assets/stick_block1.png',
    'assets/stick_block2.png'
  ]);

  const player = new Player();

  // Create the text for the button
  //const buttonText = new Text('Click Me', { fontFamily: 'Arial', fontSize: 20, fill: 0xFFFFFF });
  ///buttonText.x = 150 / 2 - buttonText.width / 2;    // Center the text horizontally
  //buttonText.y = 50 / 2 - buttonText.height / 2;    // Center the text vertically

  // Create the button background using Graphics
  const buttonBackground = new Graphics()
    .rect(0, 0, 100, 50)
    .fill(0xFFFFFF)

  // or....
  const button_style = {
    fontFamily: 'Arial',
    fontSize: 20,
    fill: 0xFFFFFF,
  };

  // TODO: extract to 'factory' type function
  const button_walk = new Button(
    buttonBackground
  );

  // const walk_text = new Text('Click Me', { fontFamily: 'Arial', fontSize: 20, fill: 0xFFFFFF });
  const walk_text = new Text({ text: 'Click Me', button_style });

  walk_text.x = (buttonBackground.width - walk_text.width) / 2; // Center the text horizontally
  walk_text.y = (buttonBackground.height - walk_text.height) / 2; // Center the text vertically

  const button_block = new Button({});

  // add it to the stage and render!
  app.stage.addChild(button_walk.view);
  app.stage.addChild(button_block.view);
  app.stage.addChild(player.view);

  button_walk.view.on('pointerdown', () => player.walk())
  button_walk.view.on('pointerup', () => player.stand())

  button_block.view.on('pointerdown', () => player.block())
  button_block.view.on('pointerup', () => player.stand())

  app.ticker.add(() => {
    if (player.isMoving) {
        // Update the sprite's position
        player.animation.x += 1;
    }
  });

})();
