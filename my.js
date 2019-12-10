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
			/*如果血量等于0，游戏结束*/
			/*这样写计时器未关闭，再次打开相当于打开了两个计时器*/
			/*if(heroic == 0) {
				gamediv.style.display = "none";
				//显示欢迎界面
				startDiv.style.display = "block";
			}*/
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
	//创建敌机
	var enmey = new Plane(x, y, w, h, img.src, sp, score, hp);
	//将创建的敌机加入敌机集合中
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

	//让子弹移动
	for(var i = 0; i < bt.length; i++) {
		var e = bt[i];
		e.imgnode.style.top = e.imgnode.offsetTop - e.sp + "px";
		//如果子弹移动到外面，删除子弹   (如果不写页面会越来越卡)
		if(e.imgnode.offsetTop < 0) {
			//删除子弹
			gamediv.removeChild(e.imgnode);
			//从数组中删除子弹
			bt.splice(i, 1);
		}
	}
}

function IreturnStart() {
	//隐藏游戏界面
	gamediv.style.display = "none";
	//显示欢迎界面
	startDiv.style.display = "block";
}

/*飞机类*/

function Plane(x, y, w, h, imagesrc, sp, score, hp) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.imagesrc = imagesrc;
	this.sp = sp; //表示速度
	this.score = score; //表示分数
	this.hp = hp; //表示血量

	this.imgnode = null;

	this.init = function() {
		//创建img标签，用来显示飞机的图片
		this.imgnode = document.createElement("img");
		//设置飞机的图片
		this.imgnode.src = imagesrc;
		//设置图片的位置
		this.imgnode.style.left = this.x + "px";
		this.imgnode.style.top = this.y + "px";
		//设置飞机的大小
		this.imgnode.style.width = this.w + "px";
		this.imgnode.style.height = this.h + "px";
		//讲创建好的img标签显示到游戏界面中
		gamediv.appendChild(this.imgnode);
	}
	//调用方法
	this.init();
}

//英雄机
function Hero(x, y, w, h, imagesrc) {
	//设置飞机的图片
	this.imgsrc = "img/hero.png";
	Plane.call(this, x, y, w, h, this.imgsrc);
	//设置ID属性，方便后面找到英雄机
	this.imgnode.setAttribute("id", "myplane");
}
//创建英雄机
//new Hero(横坐标，纵坐标，)
var hero = new Hero(200, 600, 100, 80);
//找到英雄机的图片
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
	//获取事件
	var oevent = window.event || arguments[0];
	//获取鼠标的横纵坐标
	var ox = oevent.clientX;
	var oy = oevent.clientY;
	//判断是否出界
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

//让英雄机移动的方法
function heroMove() {
	if(!over) {
		//获取事件
		var oevent = window.event || arguments[0];
		//获取鼠标的横纵坐标
		var ox = oevent.clientX;
		var oy = oevent.clientY;
		//让英雄机图片的坐标等于鼠标的坐标
		ourplane.style.left = (ox - hero.w / 2) + "px";
		ourplane.style.top = (oy - hero.h / 2) + "px";
	}
}

//定义英雄机子弹的集合
var bt = [];
//英雄机子弹出现的方法
function heroBullet() {
	//创建子弹图片
	var img = new Image();
	//设置子弹图片
	img.src = "img/bimg_bullet.png";
	//设置图片的高度和宽度
	var w = img.width;
	var h = img.height;
	//设置子弹的横纵坐标
	var x = ourplane.offsetLeft + hero.w / 2 - w / 2;
	var y = ourplane.offsetTop - hero.h / 2 + w / 2;
	//设置子弹速度
	var sp = 10;
	//创建子弹
	//设置三排多条子弹
	var img1 = new Image();
	img1.src = "img/zidan.png";
	var Bullet = new Plane(x, y, w, h, img.src, sp);
	var Bullet1 = new Plane(x - hero.h / 4 - w / 2, y + h / 2, w, h, img1.src, sp);
	var Bullet2 = new Plane(x + hero.h / 4 + w / 2, y + h / 2, w, h, img1.src, sp);
	//将创建的子弹加入子弹集合中
	bt.push(Bullet);
	bt.push(Bullet1);
	bt.push(Bullet2);
}

//定义敌机子弹出现的集合
var bt1 = [];
//敌机子弹出现的方法
function createBullet() {
	//创建子弹图片
	var img = new Image();
	//设置子弹图片
	img.src = "img/img_bullet.png";
	//设置图片的高度和宽度
	var w = img.width;
	var h = img.height;
}
