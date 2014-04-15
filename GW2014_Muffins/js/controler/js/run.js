//boucle d'affichage des frames
function run(){
	//---------- CODE DE LA BOUCLE D'AFFICHAGE --------------------
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		//affichage du vaisseau
		cube.draw();
		//condition de déplacement du bouclier et du vaisseau
		cube.move();

		gameScene.Update();
		

		requestAnimFrame(run);
}