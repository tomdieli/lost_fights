import { Application, Assets, Graphics } from "pixi.js";
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

  // TODO: extract to 'factory' type function
  const button_walk = new Button(
    new Graphics()
        .rect(0, 0, 100, 50)
        .fill(0xFFFFFF)
  );

  const button_block = new Button(
    new Graphics()
        .rect(0, 100, 100, 50)
        .fill(0xFFFFFF)
  );

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
