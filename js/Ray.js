class Ray {
	
	constructor(pos, a){
		this.pos = pos;
		this.a = a;
		this.isMoving = false;
		this.FOV = Math.PI/6;
	}
	
	/*
	setAngle(a){
		this.dir.x = Math.cos(a);
		this.dir.y = Math.sin(a);		
	}
	*/
	
	walk(){

	}
	
	update(){
	
		if( this.isMoving ){
			this.pos.x += Math.cos(this.a) * 0.8;
			this.pos.y += Math.sin(this.a) * 0.8;
		}else if( this.isBacking ){
			this.pos.x -= Math.cos(this.a) * 0.8;
			this.pos.y -= Math.sin(this.a) * 0.8;
		}
		
		if( this.isTurningLeft ){
			this.a -= 0.02;
		}else if( this.isTurningRight ){
			this.a += 0.02;
		}
		
	}	
	
	show(){
		c.beginPath();
		c.moveTo( this.pos.x, this.pos.y);
		c.lineTo( this.pos.x + Math.cos(this.a - this.FOV/2) * 10, this.pos.y + Math.sin(this.a - this.FOV/2) * 10 );
		c.lineTo( this.pos.x + Math.cos(this.a + this.FOV/2) * 10, this.pos.y + Math.sin(this.a + this.FOV/2) * 10 );
		c.lineTo( this.pos.x, this.pos.y);
		c.stroke();
	}

	distance(x1,y1,x2,y2){
		return Math.sqrt( (x1-x2) ** 2 + (y1-y2) ** 2 );
	}

	lookAt( lines ){
		const arr = [];
		for(let i = this.a - this.FOV/2, end = i + this.FOV; i < end; i+= 0.005){
			let maxDist = Infinity, _p = null, texture = null, l = null, total;
			for(const line of lines){
				const p = this.intersect(
						{start: { x: this.pos.x, y: this.pos.y } , end: {x: this.pos.x + Math.cos(i) * w, y: this.pos.y + Math.sin(i) * w} },
						line 
					);
				if( p ){
					const d = this.distance( this.pos.x, this.pos.y, p.x, p.y );
					if( d < maxDist ){
						maxDist = d
						_p = p;
						total = Math.sqrt( (line.end.x-line.start.x) ** 2 + (line.end.y-line.start.y) ** 2 );
						l = Math.sqrt( (p.x-line.start.x) ** 2 + (p.y-line.start.y) ** 2 ) / total;
						texture = line.texture;
					}
				}
			}
			arr.push( {'p': _p, 'a': i, 'l': l, 't': total, 'texture': texture} );
		}
		return arr;
	}
	
	intersect(l1, l2){
		const x1 = l1.start.x, y1 = l1.start.y, x2 = l1.end.x, y2 = l1.end.y,
					x3 = l2.start.x, y3 = l2.start.y, x4 = l2.end.x, y4 = l2.end.y;
		const d = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
		const _t = (x1-x3)*(y3-y4)-(y1-y3)*(x3-x4);
		const _u = -((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3));
		const t = _t/d;
		const u = _u/d;
		
		if( t >= 0 && t <= 1 &&  u > 0 && u < 1 ){
			return {
				x: x1 + t * (x2 - x1),
				y: y1 + t * (y2 - y1)
			};
		}
		
		return null;
	}
	
}
