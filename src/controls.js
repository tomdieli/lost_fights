import { Container,  Graphics } from 'pixi.js';
import { Button } from '@pixi/ui';

export class Control
{
    constructor()
    {
        this.view = new Container();
        this.button = new Button(
        new Graphics()
            .rect(0, 0, 100, 50)
            .fill(0xFFFFFF)
            //.label('walk')
        );
        //button.onPress.connect(() => console.log('onPress'));
        this.view.addChild(this.button.view);
    }
}