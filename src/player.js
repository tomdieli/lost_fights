import { Container, Texture, AnimatedSprite, Graphics } from 'pixi.js';

export class Player
{
    constructor()
    {
        // Create the main view.
        this.view = new Container();

        // Add debug visualization
        const debugRect = new Graphics();
        debugRect.fill({ color: 0xff0000, alpha: 0.3 })
            .rect(0, 0, 64, 64);
        this.view.addChild(debugRect);

        const standImages = ['/assets/stick_stand1.png', '/assets/stick_stand2.png'];
        const walkImages = ['/assets/stick_walk1.png', '/assets/stick_walk2.png'];
        const blockingImages = ['/assets/stick_block1.png', '/assets/stick_block2.png'];
        this.standingTextures = [];
        this.walkingTextures = [];
        this.blockingTextures = [];
        this.isMoving = false;
        
        for (let i = 0; i < 2; i++)
        {
            const texture = Texture.from(standImages[i]);
            this.standingTextures.push(texture);
        }

        this.animation = new AnimatedSprite(this.standingTextures);
        this.animation.play();

        for (let i = 0; i < 2; i++)
        {
            const texture = Texture.from(walkImages[i]);
            this.walkingTextures.push(texture);
        }

        for (let i = 0; i < 2; i++)
        {
                const texture = Texture.from(blockingImages[i]);
                this.blockingTextures.push(texture);
        } 
        
        // add it to the container and configure!
        this.view.addChild(this.animation);
        this.animation.animationSpeed = .05;
        this.animation.x = 0;
        this.animation.y = 0;
        this.animation.eventMode = 'static';

        console.log("Player created with debug visualization");
    }

    walk() {
        console.log('walking!');
        this.isMoving = true;
        this.animation.stop();
        this.animation.textures = this.walkingTextures;
        this.animation.gotoAndStop(0)
        this.animation.play();
    }

    stand() {
        console.log('standing.');
        this.isMoving = false;
        this.animation.stop();
        this.animation.textures = this.standingTextures;
        this.animation.gotoAndStop(0)
        this.animation.play();
    }

    block() {
        console.log('blocking!');
        this.blocking = false;
        this.animation.stop();
        this.animation.textures = this.blockingTextures;
        this.animation.gotoAndStop(0)
        this.animation.play();
    }
}
