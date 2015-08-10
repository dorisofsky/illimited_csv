/*	dataPath = "http://dorisofsky.github.io/illimited_csv/";
	dataFile = "d3demoData141011.csv";
	dataUrl = dataPath + dataFile;*/
	//定義SVG的大小
	d3.csv("http://dorisofsky.github.io/illimited_csv/d3demoData141011.csv", function(data){
		console.debug(JSON.stringify(data));
		dataset = data;

		var w = 600,h = 250,padding = 30, barMargin = 2;
		//定義寬高,padding等等值

		var Ymax = d3.max(dataset, function(d){return d.value}),
			Ymin = d3.min(dataset, function(d){return d.value});
			//取得Y軸的最大值

		var xScale = d3.scale.linear() //產生一個屬於X軸的線性尺度
			.domain([0, dataset.length]) //傳入的值是原始資料的最小及最大值
			.range([padding , w - padding]) 
			//輸出的範圍是左邊的padd距離，到右邊的padding

		var yScale = d3.scale.linear()
			.domain([Ymin, Ymax])
			.range([padding, h - padding])
			//類似X軸的尺度
		var yScale = d3.scale.linear()
			.domain([Ymin, Ymax])
			.range([padding, h - padding])
			//類似X軸的尺度

		var colorScale = d3.scale.linear()
			.domain([Ymin, Ymax])
			.range([0, 700])
			//這次顏色都要用尺度來算

		var barWidth = (w - padding*2) / dataset.length - barMargin;

		var svg = d3.select('.demo').append('svg').attr({'width': w,'height': h})
			//接下來開始產生SVG
			
		svg.selectAll('rect').data(dataset).enter() //和先前一樣，選取'circle'並把資料加入
		.append('rect') // 增加圓到SVG內
		.attr({	//加入屬性到圓
			'x': function(d, i){return xScale(i)}, //利用尺度算出X的位置
			'y': function(d){return h - yScale(d.value)}, //同理算出Y
			'width': barWidth,
			'height':function(d){return yScale(d.value)}, //同理算出Y
			// 'r': function(d){return Math.sqrt(h - d[1])}, //圓的大小是高 - Y值的平方
			'fill': function(d){
				var color = 0.2 + colorScale(d.value) * 0.001;
				return  d3.hsl(200 ,color, color); //利用尺度來算出顏色
			},
			'title': function(d){
				return 'Name : ' + d.name;
			}
			//介紹一個顏色的function hsl，可以將顏色算出後轉成色碼
			//格式 (360色相, 1彩度, 1明度)
		});

		svg.selectAll('text').data(dataset).enter() //補上資料數值
		.append('text') 
		.text(function(d){ return d.value}) //將值寫到SVG上
		.attr({
			'x': function(d, i){return xScale(i) + barWidth/2}, //和上面相同，算出X、Y的位置
			'y': function(d){return h - yScale(d.value) + 15},
			'fill': 'white', //文字填滿為紅色
			'text-anchor': 'middle',
			'font-size': '10px' //Fill、font-size也可以用CSS寫喔～
		});

		svg.append('g').selectAll('text').data(dataset).enter() //這邊再多做一個人名顯示的區域
		.append('text') 
		.text(function(d){ return d.name}) //寫入人名
		.attr({
			'x': function(d, i){return xScale(i) + barWidth/2}, //和上面相同，算出X、Y的位置
			'y': function(d){return h - yScale(d.value) - 10},
			'fill': 'SlateGray', //文字填滿為超漂亮灰色
			'text-anchor': 'middle',
			'font-size': '10px' //Fill、font-size也可以用CSS寫喔～
		});

	});
