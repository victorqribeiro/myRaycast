const canvas = document.createElement('canvas');
canvas.width = w = 640;
canvas.height = h = 480;
const c = canvas.getContext('2d');

canvas2 = canvas.cloneNode();
c2 = canvas2.getContext('2d');

document.body.appendChild( canvas );
document.body.appendChild( canvas2 );

const lines = [
	{
		start: {x: w/2+w/2/2, y: 0},
		end: {x: w/2+w/2/2, y: h}
	},
	{
		start: {x: w/2/2, y: 0},
		end: {x: w/2/2, y: h}
	},
	{
		start: {x: 10, y: 10},
		end: {x: w-10, y: 10}
	},
	{
		start: {x: w-10, y: h-10},
		end: {x: 10, y: h-10}
	},
	{
		start: {x: 100, y: 300},
		end: {x: 300, y: 200}
	}
]

const ray = new Ray({x: w/2, y: h/2}, 0);

const draw = function(){
	c.fillStyle = "black";
	c.clearRect(0,0,w,h);
	const grad = c.createLinearGradient(0,0,0,h);
	grad.addColorStop(0,'#666');
	grad.addColorStop(0.5,'black');
	grad.addColorStop(1,'#444');
	c2.fillStyle = grad;
	c2.fillRect(0,0,w,h);
	for(const line of lines ){
		c.beginPath();
		c.moveTo(line.start.x,line.start.y);
		c.lineTo(line.end.x,line.end.y);
		c.stroke();
	}
	ray.show();
}
//_ = 0;
const loop = function(){
	draw();
	ray.update();
	const points = ray.lookAt( lines );
	const ws = Math.ceil(canvas2.width / points.length);
	for(let i = 0; i < points.length; i++ ){
		const p = points[i].p;
		const a = points[i].a;
		const l = points[i].l;
		if( !p )	
			continue
		c.fillStyle = "red";
		c.beginPath();
		c.arc(p.x, p.y, 3, 0, Math.PI*2);
		c.fill();
		{
			const textStep = Math.ceil(texture.width / points.length);
			const hs = Math.sqrt( (ray.pos.x-p.x)**2 + (ray.pos.y-p.y)**2 ) * Math.cos( ray.a - a );
			ini = (l*textStep*texture.width)%texture.width;
			
			c2.drawImage(
				texture,
				ini,
				0,
				ini + textStep >= texture.width ? texture.width - (ini + textStep) : textStep,
				texture.height/2,
				i*ws,
				(hs-h)/2+h/2,
				ws,
				h-hs
			);
			
			
			c2.fillStyle = "rgba(0,0,0,"+(hs/h)+")";
			c2.fillRect(i*ws,(hs-h)/2+h/2,ws,h-hs);
			
			/*
			console.log(  );
			if( _ >= 20	 )
				return;
			_++
			*/
		}
	}
	window.requestAnimationFrame( loop );
}


document.addEventListener("keydown",e=>{
	switch( e.keyCode ){

		case 37 :
				ray.isTurningLeft = true;
			break;
			
		case 38 :
				ray.isMoving = true;
			break;
		
		case 39 :
				ray.isTurningRight = true;
			break;
		case 40 :
				ray.isBacking = true;
			break;
		
	}
});

document.addEventListener("keyup",e=>{
	switch( e.keyCode ){

		case 37 :
				ray.isTurningLeft = false;
			break;
			
		case 38 :
				ray.isMoving = false;
			break;
		
		case 39 :
				ray.isTurningRight = false;
			break;
		case 40 :
				ray.isBacking = false;
			break;

	}
});

if( ((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)) ){

	const resetEverything = function(){
		if(ray.isTurningLeft) ray.isTurningLeft = false;
		if(ray.isTurningRight) ray.isTurningRight = false;
	}

	const menuSettings = {
		innerCircle: 0,
		outerCircle: 60,
		isFixed: true, 
		posX: innerWidth/2-70, 
		posY: innerHeight-140, 
		rotation: Math.PI/4, 
		buttons: [
			{text: '\uf063', action: ()=>{ resetEverything(); if(ray.isBacking) ray.isBacking = false; else ray.isBacking = true; } },
			{text: '\uf060', action: ()=>{ if(ray.isTurningLeft) ray.isTurningLeft = false; else ray.isTurningLeft = true; } },
			{text: '\uf062', action: ()=>{ resetEverything(); if(ray.isMoving) ray.isMoving = false; else ray.isMoving = true; } },
			{text: '\uf061', action: ()=>{ if(ray.isTurningRight) ray.isTurningRight = false; else ray.isTurningRight = true; } }
		]
	};

	document.fonts.ready.then(function() {
		radial = new RadialMenu(menuSettings);
	});

	
}

const texture = new Image();
texture.src = "red_brick_wall.jpg";
texture.onload = ()=>{
	loop();
	if( radial )
		radial.show() /* ugly fix */
};
