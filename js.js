function initCanvas() {
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var background_Image = new Image();
    var nave_Image = new Image();
    var enemis_pic1 = new Image();
    var enemis_pic2 = new Image();
    var grupo=1; 

    background_Image.src = "imagenes/negro.png";
    nave_Image.src = "imagenes/nave2.png";

    enemis_pic1.src = "imagenes/iceT.png";
    enemis_pic2.src = "imagenes/pepinillo.png";

    var cW = ctx.canvas.width;
    var cH = ctx.canvas.height;
    var dato=0;
    var enemy_template = function (options) {
        
        if(dato%2!=0){
            return {
                id: options.id || '',
                x: options.x || '',
                y: options.y || '',
                w: options.w || '',
                h: options.h || '',
                image: options.image || enemis_pic2
            }
        }else{
            return {
                id: options.id || '',
                x: options.x || '',
                y: options.y || '',
                w: options.w || '',
                h: options.h || '',
                image: options.image || enemis_pic1
            }
        }
        
       

    }
    var enemies = [
        new enemy_template({ id: 'Ice-T dm-998', x: 100, y: -20, w: 50, h: 30 }),
        new enemy_template({ id: 'Ice-T dm-872', x: 220, y: -20, w: 50, h: 30 }),
        new enemy_template({ id: 'Ice-T dm-488', x: 350, y: -20, w: 50, h: 30 }),
        new enemy_template({ id: 'Ice-T dm-23', x: 100, y: -70, w: 80, h: 30 }),
        new enemy_template({ id: 'Ice-T dm-887', x: 250, y: -70, w: 80, h: 30 }),
       /* new enemy_template({ id: 'enemy6', x: 350, y: -70, w: 80, h: 30 }),
        new enemy_template({ id: 'enemy7', x: 400, y: -70, w: 80, h: 30 }),
        new enemy_template({ id: 'enemy8', x: 600, y: -70, w: 80, h: 30 }),
        new enemy_template({ id: 'enemy9', x: 450, y: -70, w: 50, h: 30 }),
        new enemy_template({ id: 'enemy10', x: 550, y: -20, w: 50, h: 30 }),
    */];
    var puntuacion=0;

    

    class Launcher {
        constructor() {

            this.y = 350;
            this.x = cW * .5 - 25;
            this.w = 100;
            this.h = 100;
            this.direction;
            this.bg = "white";
            this.misiles = [];

            this.game_status={
                over: false,
                message: "",
                fillStyle:"red",
                font: "italic bold 20px Arial, sans-serif",
            }

            this.render = function () {

                if (this.direction == "left") {
                    this.x -= .5;
                }
                else if (this.direction == "right") {
                    this.x += .5;
                }
                else if (this.direction == "downArrow") {
                    this.y += .5;
                }
                else if (this.direction == "upArrow") {
                    this.y -= .5;

                }


                ctx.fileStyle = this.bg;
                ctx.fileStyle = ''
                ctx.drawImage(background_Image, 10, 10);
                ctx.drawImage(nave_Image, this.x, this.y, 100, 90);
                
                for(var i=0;i<this.misiles.length;i++){
                    var m= this.misiles[i];
                    ctx.fillStyle = 'white';
                    ctx.fillRect(m.x, m.y-=.5, m.w, m.h);
                    this.hit_detect(m,i);           //Detecta coliciones
                    
                    if(m.y<=0){
                        this.misiles.splice(i,1); //Borrar la bala
                        
                    }
                }
                if(enemies.length==0){
                    //alert("You Win")
                   
                
                    if(grupo!=100){
                        dato++;
                        if(dato%2!=0){
                         enemies = [
                            new enemy_template({ id: 'Pepinillo hd-762', x: 100, y: -20, w: 50, h: 30 }),
                            new enemy_template({ id: 'Pepinillo vd-762', x: 220, y: -20, w: 50, h: 30 }),
                            new enemy_template({ id: 'Pepinillo re-762', x: 350, y: -20, w: 50, h: 30 }),
                            new enemy_template({ id: 'Pepinillo wfe-762', x: 100, y: -70, w: 80, h: 30 }),
                            new enemy_template({ id: 'Pepinillo 34f-762', x: 250, y: -70, w: 80, h: 30 }),
                           /* new enemy_template({ id: 'enemy6', x: 350, y: -70, w: 80, h: 30 }),
                            new enemy_template({ id: 'enemy7', x: 400, y: -70, w: 80, h: 30 }),
                            new enemy_template({ id: 'enemy8', x: 600, y: -70, w: 80, h: 30 }),
                            new enemy_template({ id: 'enemy9', x: 450, y: -70, w: 50, h: 30 }),
                            new enemy_template({ id: 'enemy10', x: 550, y: -20, w: 50, h: 30 }),
                        */];}
                        else{
                            enemies = [
                                new enemy_template({ id: 'Ice-T dm-998', x: 100, y: -20, w: 50, h: 30 }),
                                new enemy_template({ id: 'Ice-T dm-872', x: 220, y: -20, w: 50, h: 30 }),
                                new enemy_template({ id: 'Ice-T dm-488', x: 350, y: -20, w: 50, h: 30 }),
                                new enemy_template({ id: 'Ice-T dm-23', x: 100, y: -70, w: 80, h: 30 }),
                                new enemy_template({ id: 'Ice-T dm-887', x: 250, y: -70, w: 80, h: 30 }),
                               /* new enemy_template({ id: 'enemy6', x: 350, y: -70, w: 80, h: 30 }),
                                new enemy_template({ id: 'enemy7', x: 400, y: -70, w: 80, h: 30 }),
                                new enemy_template({ id: 'enemy8', x: 600, y: -70, w: 80, h: 30 }),
                                new enemy_template({ id: 'enemy9', x: 450, y: -70, w: 50, h: 30 }),
                                new enemy_template({ id: 'enemy10', x: 550, y: -20, w: 50, h: 30 }),
                            */];
                        }
                        render_enemys(enemies);}
                    if(grupo==100){
                    clearInterval(animate_setInterval);
                    ctx.fillStyle="yellow";
                    ctx.font=this.game_status.font;
                    ctx.fillText("You Win!!!", cW*.5-80,50);
                    }
                    
                    grupo+=1;
                }
            
            }
            this.hit_detect=function (m,mi) {
                
                for(var i=0; i<enemies.length;i++){
                    var e=enemies[i];
                    
                    if( m.y <= (e.y+e.h) && 
                        m.x <= e.x + e.w && m.x + m.w >=e.x){
                        this.misiles.splice(mi, 1);
                        enemies.splice(i,1);
                        puntuacion++;
                        var level='Level: 0. ';
                        if(dato>0){
                            level='Level: ' + dato + '. ';
                        }
                        document.querySelector('.barra').innerHTML=level+" Puntuacion: "+ puntuacion + ".  Destroyed : "+e.id;

                    }
                }
                
            }
            this.hit_detect_lower_level= function (enemy) {
                if(enemy.y>550){
                    this.game_status.over=true;
                    this.game_status.message="Ice-T callo en la tu casa... tu laboratorio fue destruido!";
                }
                if(/*((enemy.y>this.y -25 && enemy.y < this.y+25)
                && enemy.x < this.x +45 && enemy.x > this.x -45)
                    || */ 
                    (enemy.y>=this.y && enemy.y<=(this.y+this.h/2) && 
                    enemy.x+enemy.w/1.75>= this.x && enemy.x <=this.x+this.w/1.25)){
                    this.game_status.over=true;
                    this.game_status.message="Ice-T impacto con morti... Ya no tienes compañero!!";
                }

                if(this.game_status.over==true){
                    clearInterval(animate_setInterval);
                    ctx.fillStyle=this.game_status.fillStyle;
                    ctx.font=this.game_status.font;
                    ctx.fillText(this.game_status.message, cW*.2 -80,50);
                }
                
            }
        }
    }

    var launcher = new Launcher()
    function animate() {
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        render_enemys(enemies);

    }
    var render_enemys = function (enemy_list) {

        for (var i = 0; i < enemy_list.length; i++) {

            var enemy = enemy_list[i];
            ctx.drawImage(enemy.image, enemy.x, enemy.y += .5, enemy.w, enemy.h);
            launcher.hit_detect_lower_level(enemy);
        }
        
    }
    render_enemys(enemies);

    var animate_setInterval = setInterval(animate, 6);
    document.addEventListener("keydown", function (event) {
        if (event.keyCode == 37) {
            launcher.direction = 'left';
            if (launcher.x < cW * .2 - 130) {
                launcher.x += 0;
                launcher.direction = '';
            }
        }

    });
    document.addEventListener("keyup", function (event) {
        if (event.keyCode == 37) {

            launcher.x += 0;
            launcher.direction = '';

        }

    });
    document.addEventListener("keydown", function (event) {
        if (event.keyCode == 39) {
            launcher.direction = 'right';
            if (launcher.x > cW - 110) {
                launcher.x -= 0;
                launcher.direction = '';
            }
        }
    });
    document.addEventListener("keyup", function (event) {
        if (event.keyCode == 39) {

            launcher.x -= 0;
            launcher.direction = '';

        }

    });
    document.addEventListener("keydown", function (event) {
        if (event.keyCode == 38) {
            launcher.direction = 'upArrow';
            if (launcher.y < cH*.2 - 80) {
                launcher.y += 0;
                launcher.direction = '';
            }
        }
    });
    document.addEventListener("keyup", function (event) {
        if (event.keyCode == 38) {

            launcher.y -= 0;
            launcher.direction = '';

        }

    });
    document.addEventListener("keydown", function (event) {
        if (event.keyCode == 40) {
            launcher.direction = 'downArrow';
            if (launcher.y > cW - 360) {
                launcher.y -= 0;
                launcher.direction = '';
            }
        }
    });
    document.addEventListener("keyup", function (event) {
        if (event.keyCode == 40) {

            launcher.y -= 0;
            launcher.direction = '';

        }

    });
    
    var left_btn=document.getElementById("left_btn");
    var rigth_btn=document.getElementById("right_btn");
    var fire_btn=document.getElementById("fire_btn");
    fire_btn.addEventListener('mousedown', function (event) {
        launcher.misiles.push({
            x: launcher.x + launcher.w*.5,
            y: launcher.y,
            w:3,
            h:10
        })
        
    })
    left_btn.addEventListener('mousedown', function () {
        launcher.direction="left";
    });
    rigth_btn.addEventListener('mousedown', function () {
        launcher.direction="right";
    });
    left_btn.addEventListener('mouseup', function () {
        launcher.direction="";
    });
    rigth_btn.addEventListener('mouseup', function () {
        launcher.direction="";
    });
    
    document.addEventListener('keydown', function (event) {
        if(event.keyCode==32){
            launcher.misiles.push({
                x: launcher.x + launcher.w*.5,
                y: launcher.y,
                w:3,
                h:10
            })
        }
        
    })
}

window.addEventListener('load', function (event) { initCanvas(); });



//ME Quede en en min 36 con 40s url:https://www.youtube.com/watch?v=DkeG4MVeNzI






