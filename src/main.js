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
    'assets/stick_walk1.png', 'assets/stick_walk2.png'
  ]);

  const player = new Player();

  // TODO: extract to 'factory' type function
  const button = new Button(
    new Graphics()
        .rect(0, 0, 100, 50)
        .fill(0xFFFFFF)
  );

  // add it to the stage and render!
  app.stage.addChild(button.view);
  app.stage.addChild(player.view);

  button.view.on('pointerdown', () => player.walk())
  button.view.on('pointerup', () => player.stand())

  app.ticker.add(() => {
    if (player.isMoving) {
        // Update the sprite's position
        player.animation.x += 1;
        // sprite.y += speed * direction.y;

        // Add any necessary boundary checks to prevent the sprite from moving off-screen
        // if (player.animation.x > app.screen.width - player.animation.width || player.animation.x < 0) {
        //     direction.x *= -1;
        // }
        // if (sprite.y > app.screen.height - sprite.height || sprite.y < 0) {
        //     direction.y *= -1;
        // }
    }
  });

})();
