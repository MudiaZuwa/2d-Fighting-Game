class Sprite {
    constructor({position, imageSrc, scale=1, framesMax=1, offset={x:0,y:0}}){
        this.position=position
        this.width= 50
        this.height=150
        this.image= new Image()
        this.image.src=imageSrc
        this.scale=scale
        this.framesMax=framesMax
        this.framesCurrent=0
        this.framesElapsed=0
        this.framesHold=5
        this.offset=offset
    }
    draw(ctx){
        ctx.drawImage(
            this.image,
            this.framesCurrent*(this.image.width/this.framesMax),
            0,
            this.image.width/ this.framesMax,
            this.image.height,
            this.position.x-this.offset.x,
            this.position.y-this.offset.y,
            (this.image.width/this.framesMax)*this.scale,
            this.image.height*this.scale
            )
         
    }

    animateFrames(){
        this.framesElapsed++
        if(this.framesElapsed%this.framesHold===0){
        if(this.framesCurrent<this.framesMax-1){
            this.framesCurrent++
        }else{
            this.framesCurrent=0
        }
        }
    }

    update(ctx){
        this.draw(ctx)
        this.animateFrames()
    }
    }
   

class Fighter extends Sprite {
    constructor({position, sprites, velocity, color="red", imageSrc, scale=1, framesMax=1, offset={x:0,y:0},
                    attckBox={offset:{}, width: undefined, height:undefined}, canvas, gravity, direction}){
        super({position,imageSrc, scale, framesMax,offset})
        this.velocity=velocity
        this.width= 50
        this.height=150
        this.lastkey
        this.attackBox={
            position:{
                x:this.position.x,
                y: this.position.y
            },
            width: attckBox.width,
            height: attckBox.height,
            offset:attckBox.offset
        }
        this.color=color,
        this.isAttacking
        this.health=100
        this.framesCurrent=0
        this.framesElapsed=0
        this.framesHold=5
        this.sprites = sprites
        this.dead=false
        this.canvas=canvas
        this.gravity = gravity
        this.control

        for (const direction in this.sprites) {
            for (const sprite in this.sprites[direction]) {
                sprites[direction][sprite].image= new Image()
                sprites[direction][sprite].image.src = sprites[direction][sprite].imageSrc
            }
        }
        
        this.direction = direction
    }

    update(ctx){
         this.draw(ctx)
        if(!this.dead) this.animateFrames()

        this.attackBox.position.x=this.position.x + this.attackBox.offset[this.direction].x
        this.attackBox.position.y=this.position.y + this.attackBox.offset[this.direction].y

       // ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.position.x+=this.velocity.x
        this.position.y += this.velocity.y

       // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        if(this.position.y+this.height+this.velocity.y>= this.canvas.height-96){
            this.velocity.y=0
            this.position.y=this.canvas.height-96-this.height
        }else this.velocity.y+=this.gravity

        if(this.position.x<0)this.position.x=0;
        
        if(this.position.x+this.width>this.canvas.width)
        this.position.x=this.canvas.width-this.width
    }

    attack(n){
        if(!this.isAttacking){
        this.switchSprite("attack"+n)
         this.isAttacking = true
         }
    }

         Restart() {
         this.health = 100
         this.velocity = {
             x: 0,
             y:0
         }
         this.framesCurrent = 0
         this.framesElapsed = 0
         this.dead = false
         this.image=this.sprites[this.direction].fall.image
     }

    takeHit(){
       this.health-=20
        if (this.health <= 0) {
            this.switchSprite("death")
        } else this.switchSprite("takeHit")
    }

    switchSprite(sprite) {
        if (this.image === this.sprites[this.direction].death.image) {
            if (this.framesCurrent === this.sprites[this.direction].death.framesMax - 1) this.dead = true
            return
        }

        //override when fighter is dead
        if (this.image === this.sprites[this.direction].death.image && this.framesCurrent < this.sprites[this.direction].death.framesMax - 1) return
        
        //overriding all other animations with attack animation
        if(this.image===this.sprites[this.direction].attack1.image&&this.framesCurrent<this.sprites[this.direction].attack1.framesMax-1) return
        if(this.image===this.sprites[this.direction].attack2.image&&this.framesCurrent<this.sprites[this.direction].attack2.framesMax-1) return

        //override when fighter get hit
        if (this.image === this.sprites[this.direction].takeHit.image && this.framesCurrent < this.sprites[this.direction].takeHit.framesMax - 1) return
        
        switch (sprite) {
            case "idle":
                if(this.image!==this.sprites[this.direction].idle.image){
                    this.framesCurrent=0
             this.image=this.sprites[this.direction].idle.image
             this.framesMax=this.sprites[this.direction].idle.framesMax   
              }
            break;
            case "run":
                if(this.image!==this.sprites[this.direction].run.image){
                    this.framesCurrent=0
                this.image=this.sprites[this.direction].run.image   
                this.framesMax=this.sprites[this.direction].run.framesMax 
                  }
            break;
            case "jump":
                if(this.image!==this.sprites[this.direction].jump.image){
                    this.framesCurrent=0
                this.image=this.sprites[this.direction].jump.image
                this.framesMax=this.sprites[this.direction].jump.framesMax 
                } 
                break  
            case "fall":
                if(this.image!==this.sprites[this.direction].fall.image){
                    this.framesCurrent=0
                this.image=this.sprites[this.direction].fall.image
                this.framesMax=this.sprites[this.direction].fall.framesMax 
                }   
            break;
            case "attack1":
                if(this.image!==this.sprites[this.direction].attack1.image){
                    this.framesCurrent=0
                this.image=this.sprites[this.direction].attack1.image
                this.framesMax=this.sprites[this.direction].attack1.framesMax 
                }   
            break;
            case "attack2":
                if(this.image!==this.sprites[this.direction].attack2.image){
                    this.framesCurrent=0
                this.image=this.sprites[this.direction].attack2.image
                this.framesMax=this.sprites[this.direction].attack2.framesMax 
                }   
            break;
            case "takeHit":
                if(this.image!==this.sprites[this.direction].takeHit.image){
                    this.framesCurrent=0
                this.image=this.sprites[this.direction].takeHit.image
                this.framesMax=this.sprites[this.direction].takeHit.framesMax 
                }   
            break;
            case "death":
                if(this.image!==this.sprites[this.direction].death.image){
                    this.framesCurrent=0
                this.image=this.sprites[this.direction].death.image
                this.framesMax=this.sprites[this.direction].death.framesMax 
                }   
            break;
        }
    }
}