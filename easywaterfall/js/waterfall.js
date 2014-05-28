/*ajax请求*/

/*整理数据函数*/

/*虚拟数据*/

var item = [{
	pic : "img/001.jpg"
},{
	pic : "img/002.jpg"
},{
	pic : "img/003.jpg"
},{
	pic : "img/004.jpg"
},{
	pic : "img/005.jpg"
},{
	pic : "img/006.jpg"
},{
	pic : "img/007.jpg"
},{
	pic : "img/008.jpg"
},{
	pic : "img/009.jpg"
},{
	pic : "img/010.jpg"
},{
	pic : "img/011.jpg"
},{
	pic : "img/012.jpg"
},{
	pic : "img/013.jpg"
},{
	pic : "img/014.jpg"
},{
	pic : "img/015.jpg"
}];


var num = item.length;  //当前刷新时要添加的数量

/*使用数据初始化每一小块函数*/

function initSmallBlock() {
	for (var i = 0; i < item.length; i++) {
		var img = $("#main .pin img").eq(i);
		img.attr("src", item[i].pic);
		img.load(function(){
			num--;
			if (!num){
				initOrderImg();
			}
		});
	};
	return false;
}

/*将每一小块加入dom的函数*/

function addDom() {
	//每一小块代码
	var sBlock = "<div class=\"pin\"><div class=\"box\"><img src=\"\"></div></div>";
	// var $parent = $("#main"); //获取父级对象
	for (var i = 0; i < item.length; i++) {
		var sb = $(sBlock);
		$("#main").append(sb);
	};
}

/*初始化排序*/

function initOrderImg(){
	var $parent = $("#main"); //获取父级对象
	var aPin = $("#main .pin");
	var num = 4;
	compareArray = [];
	for (var i = 0; i < aPin.length; i++) {
		if (i<num) {
			//第一行元素
			compareArray[i] = aPin[i].offsetHeight;
		}else
		{
			handleReceivedImg(i);
		};
	}
}

/*排序计算*/

function handleReceivedImg(n){
	var $parent = $("#main"); //获取父级对象
	var aPin = $("#main .pin");
	var num = 4;
	//获取成行元素中最低的
	var minHeight = Math.min.apply('',compareArray);
	//alert(compareArray + ",min=" + minHeight);
	//获取最低的那个的元素索引
	var minHkey = getMinHeightKey(compareArray,minHeight);
	//为新增瀑布定位
	aPin[n].style.position = "absolute";
	aPin[n].style.top = minHeight +"px";
	aPin[n].style.left = aPin[minHkey].offsetLeft +'px';
	compareArray[minHkey] += aPin[n].offsetHeight;
}
function getMinHeightKey(arr, minH) {
	for (key in arr) {
		if (arr[key] == minH) {
			return key;
		}
	}
}

function checkScrollSite() {
	console.log(1);

	var aPin = $("#main .pin");

	//加载数据依赖最后一个瀑布流块变化
	var lastPinHeight = aPin[aPin.length - 1].offsetTop + Math.floor(aPin[aPin.length - 1].offsetHeight / 2);
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	//浏览器高度
	var documentH = document.documentElement.clientHeight;

	if (lastPinHeight < documentH + scrollTop) {
 		var $loading = $("#loading");
 		var loadHeight = aPin[aPin.length-1].offsetTop + aPin[aPin.length - 1].offsetHeight +'px';
 		$loading.css("top",loadHeight);
 		$loading.css("display","block");
 		$post();
		return true;
	}
	return false;
}

addDom();
initSmallBlock();

$(window).scroll(function(){
	checkScrollSite();
})
