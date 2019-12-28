//获取欢迎界面的div
var startDiv = document.getElementById("startdiv");
//获取游戏简介界面的div
var introducediv = document.getElementById("introducediv");
//获取游戏界面的div
var gamediv = document.getElementById("gamediv");
//获取gameover界面
var gameover = document.getElementById("gameover");
//定义总分数
var score = 0;
//定义英雄机的血量
var heroHp = 3;
//获取显示血量的界面
var heroHpDiv = document.getElementById("herohp");
//开关，判断游戏是否结束
var over = false;

//初始化英雄级的血量
for(var i = 0; i < heroHp; i++) {
	var div = document.createElement("div");
	var img = document.createElement("img");
	//设置图片
	img.src = "img/hero.png";
	//设置图片的宽度
	img.style.width = 30 + "px";
	img.style.marginTop = 35 * i + "px";
	//将图片加入到div中
	div.appendChild(img);
	div.setAttribute("id", "div" + (i + 1));
	//将div加入到显示血量的界面中
	heroHpDiv.appendChild(div);
}

//当点击游戏简介按钮时执行的函数(方法)
//隐藏欢迎页面,显示游戏简介界面
function showIntroduce() {
	//隐藏欢迎界面
	startDiv.style.display = "none";
	//显示游戏简介界面
	introducediv.style.display = "block";
}

function returnStart() {
	//隐藏游戏简介界面
	introducediv.style.display = "none";
	//显示欢迎界面
	startDiv.style.display = "block";
}

//控制背景移动的计时器
var bgTimer;
//控制敌机出现的计时器
var enmeyTimer;
//控制英雄子弹出现的计时器
var fireTimer;
//定义计时器控制子弹和敌机碰撞
var shootTimer;
//定义计时器控制英雄机和敌机的碰撞
var heroicTimer;

function startgame() {
	//隐藏欢迎界面
	startDiv.style.display = "none";
	//显示游戏界面
	gamediv.style.display = "block"
	//启动计时器，让背景移动
	//代表每隔100毫秒执行一次bgMove()方法
	bgTimer = setInterval("bgMove()", 10);
	//启动计时器，让敌机出现
	enmeyTimer = setInterval("createEnmey()", 400);
	//启动计时器，让子弹出现
	fireTimer = setInterval("heroBullet()", 100);
	//启动计时器，检测子弹与敌机的碰撞
	shootTimer = setInterval("shootEnmey()", 10);
	//启动计时器，检测英雄机和敌机的碰撞
	heroicTimer = setInterval("hitTimer()", 10);
}

/**
 * 检测英雄级撞到敌机
 */
var heroic = heroHp;

function hitTimer() {
	//遍历所有敌机
	for(var i = 0; i < es.length; i++) {
		//获取一个敌机
		var e = es[i]
		//获取敌机的横纵坐标
		var ex = e.imgnode.offsetLeft;
		var ey = e.imgnode.offsetTop;
		//获取敌机的宽度和高度
		var ew = e.w;
		var eh = e.h;
		//获取英雄级的横纵坐标
		var hx = hero.imgnode.offsetLeft;
		var hy = hero.imgnode.offsetTop;
		//获取英雄级的宽度和高度
		var hw = hero.w;
		var hh = hero.h;
		//也可以用ourplane.offset……

		//判断碰撞
		if(hx >= ex - hw && hx <= ex + ew && hy <= ey + eh && hy >= ey - eh) {
			//删除敌机图片
			gamediv.removeChild(e.imgnode);
			//从数组中删除敌机
			es.splice(i, 1);
			var div = document.getElementById("div" + heroic);
			heroic--;
			if(heroic <= 0) {
				//显示结束界面
				gameover.style.display = "block";
				//让游戏结束
				over = true;
				//结束创建敌机的计时器
				clearInterval(enmeyTimer);
				//结束敌机移动的计时器
				clearInterval(bgTimer);
				//结束发射子弹的计时器
				clearInterval(fireTimer);
				//结束英雄级撞击敌机的计时器
				clearInterval(heroicTimer);
			}
			if(div != undefined) {
				//删除英雄机血量图片
				heroHpDiv.removeChild(div);
			}
		}
	}
}

/**
 * 检测子弹是否打中敌机
 */
function shootEnmey() {
	//遍历所有子弹
	for(var i = 0; i < bt.length; i++) {
		//获取一课子弹
		var f = bt[i];
		//遍历所有的敌机
		for(var j = 0; j < es.length; j++) {
			//获取一个敌机
			var e = es[j];
			//获取子弹的横纵坐标
			var fx = f.imgnode.offsetLeft;
			var fy = f.imgnode.offsetTop;
			//获取子弹的宽度和高度
			var fw = f.w;
			var fh = f.h;
			//获取敌机的横纵坐标
			var ex = e.imgnode.offsetLeft;
			var ey = e.imgnode.offsetTop;
			//获取敌机的宽度和高度
			var ew = e.w;
			var eh = e.h;

			//如果子弹打到敌机
			if(ex <= fx + fw && ex >= fx - ew && ey <= fy + fh && ey >= fy - eh) {
				//敌机血量减少
				e.hp--;
				//如果敌机血量减少为0
				if(e.hp <= 0) {
					//删除敌机图片
					gamediv.removeChild(e.imgnode);
					//增加分数
					score += e.score;
					//将新分数显示到页面中
					document.getElementById("score").innerHTML = score;
					//从数组中删除敌机
					es.splice(j, 1);
				}
				//删除子弹图片
				gamediv.removeChild(f.imgnode);
				//从数组中删除子弹
				bt.splice(i, 1);
			}
		}
	}
}
//产生随机数
/**
 * 
 * @param {Object} min 最小值
 * @param {Object} max 最大值
 */
function random(min, max) {
	//Math.random() 0-1之间的小数 
	//floor取最小值的整数 
	return Math.floor(Math.random() * (max - min)) + min
}

//定义敌机大本营
var es = [];

function createEnmey() {
	//创建敌机图片
	var img = new Image();
	//生成一个随机数
	var index = random(1, 15);
	//设置敌机图片
	img.src = "img/ep" + (index < 10 ? "0" : "") + index + ".png";
	//获取图片的宽度和高度
	var w = img.width;
	var h = img.height;
	//设置敌机出现的位置
	//设置敌机的纵坐标
	var y = 0;
	//在屏幕的宽度范围内随机生成敌机的横坐标
	var x = random(0, 480 - w);
	//设置敌机的速度
	var sp = 16 - index;
	//设置分数
	var score = index * 10;
	//设置血量
	var hp = index;
	var enmey = new Plane(x, y, w, h, img.src, sp, score, hp);
	es.push(enmey);
}

var positionY = 0;

function bgMove() {
	positionY += 0.5;
	gamediv.style.backgroundPosition = 0 + "px " + positionY + "px";

	//让敌机移动
	for(var i = 0; i < es.length; i++) {
		var e = es[i];
		e.imgnode.style.top = e.imgnode.offsetTop + e.sp + "px";
		//如果敌机移动到到外面，删除敌机
		if(e.imgnode.offsetTop > 800 - e.h) {
			//删除敌机
			gamediv.removeChild(e.imgnode);
			//从数组中删除敌机
			es.splice(i, 1);
		}
	}
	for(var i = 0; i < bt.length; i++) {
		var e = bt[i];
		e.imgnode.style.top = e.imgnode.offsetTop - e.sp + "px";
		if(e.imgnode.offsetTop < 0) {
			gamediv.removeChild(e.imgnode);
			bt.splice(i, 1);
		}
	}
}
function Plane(x, y, w, h, imagesrc, sp, score, hp) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.imagesrc = imagesrc;
	this.sp = sp;
	this.score = score; 
	this.hp = hp;

	this.imgnode = null;

	this.init = function() {
		this.imgnode = document.createElement("img");
		this.imgnode.src = imagesrc;
		this.imgnode.style.left = this.x + "px";
		this.imgnode.style.top = this.y + "px";
		this.imgnode.style.width = this.w + "px";
		this.imgnode.style.height = this.h + "px";
		gamediv.appendChild(this.imgnode);
	}
	//调用方法
	this.init();
}
function Hero(x, y, w, h, imagesrc) {
	this.imgsrc = "img/hero.png";
	Plane.call(this, x, y, w, h, this.imgsrc);
	this.imgnode.setAttribute("id", "myplane");
}
var hero = new Hero(200, 600, 100, 80);
var ourplane = document.getElementById("myplane");
//添加鼠标监听器
var bodyObj = document.getElementsByTagName("body")[0];
if(document.addEventListener) {
	gamediv.addEventListener("mousemove", heroMove, true);
	bodyObj.addEventListener("mousemove", outOfBounds, true);
} else if(document.attachEvent) {
	gamediv.attachEvent("mousemove", heroMove);
	bodyObj.attachEvent("mousemove", outOfBounds);
}
function outOfBounds() {
	var oevent = window.event || arguments[0];
	//获取鼠标的横纵坐标
	var ox = oevent.clientX;
	var oy = oevent.clientY;
	if(ox <= hero.w / 2 || ox >= 480 - hero.w / 2 || oy <= hero.h / 2 || oy >= 800 - hero.h / 2) {
		if(document.removeEventListener) {
			gamediv.removeEventListener("mousemove", heroMove, true);
		} else if(document.attachEvent) {
			gamediv.detachEvent("mousemove", heroMove);
		}
	} else {
		if(document.addEventListener) {
			gamediv.addEventListener("mousemove", heroMove, true);
		} else if(document.attachEvent) {
			gamediv.attachEvent("mousemove", heroMove);
		}
	}
}
function heroMove() {
	if(!over) {
		var oevent = window.event || arguments[0];
		var ox = oevent.clientX;
		var oy = oevent.clientY;
		ourplane.style.left = (ox - hero.w / 2) + "px";
		ourplane.style.top = (oy - hero.h / 2) + "px";
	}
}
var bt = [];
function heroBullet() {
	var img = new Image();
	img.src = "img/bimg_bullet.png";
	var w = img.width;
	var h = img.height;
	var x = ourplane.offsetLeft + hero.w / 2 - w / 2;
	var y = ourplane.offsetTop - hero.h / 2 + w / 2;
	var sp = 10;
	var img1 = new Image();
	img1.src = "img/zidan.png";
	var Bullet = new Plane(x, y, w, h, img.src, sp);
	var Bullet1 = new Plane(x - hero.h / 4 - w / 2, y + h / 2, w, h, img1.src, sp);
	var Bullet2 = new Plane(x + hero.h / 4 + w / 2, y + h / 2, w, h, img1.src, sp);
	bt.push(Bullet);
	bt.push(Bullet1);
	bt.push(Bullet2);
}
var bt1 = [];
function createBullet() {
	var img = new Image();
	img.src = "img/img_bullet.png";
	var w = img.width;
	var h = img.height;
}
