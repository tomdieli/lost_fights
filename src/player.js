import { Container, Texture, AnimatedSprite } from 'pixi.js';

export class Player
{
    constructor()
    {
        // Create the main view.
        this.view = new Container();

        const standImages = ['assets/stick_stand1.png', 'assets/stick_stand2.png'];
        const walkImages = ['assets/stick_walk1.png', 'assets/stick_walk2.png'];
        this.standingTextures = [];
        this.walkingTextures = [];
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
        
        // add it to the container and configure!
        this.view.addChild(this.animation);
        this.animation.animationSpeed = .05;
        this.animation.x = 400;
        this.animation.y = 400;
        this.animation.eventMode = 'static';
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
}
