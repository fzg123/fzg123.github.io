const head = {
	imgArr: ["image/1.jpg", "image/2.jpg", "image/3.jpg", "image/4.jpg", "image/5.jpg", "image/6.jpg", "image/7.jpg"],
	currentContent: 0,
	dom: {
		imgBox: document.getElementsByClassName("img-box")[0],
		list: document.getElementsByClassName("list")[0],
		imgs: document.querySelectorAll(".img-box img"),
	},
	timerFun: null,
	timer: null,
	prevDom: null,
	init : function(){
		this.addEvent();
		this.addTiemr();
	},
	addEvent: function(){
		[].slice.call(this.dom.list.children).forEach((ele) => {
			var _this = this;
			ele.onmouseenter = function(){
				
				clearInterval(_this.timer);
				if(_this.currentContent == this.getAttribute("data-index")){
					return false;
				}
				let index = _this.currentContent = this.getAttribute("data-index");
				
				_this.changeBg(_this.dom.imgs[index]);
				
				_this.changeTitle(index);
				
			}
			
			ele.onmouseleave = function(){
				clearInterval(_this.timer);
				_this.timer = setInterval(_this.timerFun , 3000);
			}
		});
		
		this.dom.imgBox.onmouseenter =() => {
			clearInterval(this.timer);
			
			this.dom.imgBox.onmouseleave = () => {
				clearInterval(this.timer);
				this.timer = setInterval(this.timerFun , 3000);
			}
		}
		
	},
	addTiemr: function(){
		
		
		
		this.timerFun = () => {
			// console.log(111);
			this.currentContent = ++ this.currentContent % this.imgArr.length;		// 迭代
			
			this.changeBg(this.dom.imgs[this.currentContent]);		// 改变背景图片
			
			this.changeTitle(this.currentContent);			// 改变右侧对应标题样式
		}
		
		this.timer = setInterval(this.timerFun , 3000);
	},
	changeBg: function(dom){
		if(this.prevDom != null){
			this.prevDom.classList.remove("block");
		}
		dom.classList.add("block");
		this.prevDom = dom;
	},
	changeTitle: function(index){
		this.dom.list.querySelector(".active").classList.remove("active");
		
		this.dom.list.querySelectorAll(".count")[index].classList.add("active");
	},

	
}

head.init();