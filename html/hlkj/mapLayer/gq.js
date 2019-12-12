var isloadgq = false;
function init_gq(index){
	if(!isloadgq || index == 2){
		init_unit_gq();
		init_gqpoint();
		isloadgq = true;
	}
	

}

//初始化单位信息
function init_unit_gq(){
	//$.ajax({
	//	type:		'POST',
	//
	//	url:		api_url+'/stbprpB/getStbprpBAddvcd',
	//	data:		{czlx:'SW'},
	//	dataType:	'json',
	//	success:	function(data){
	//		var options = "<option value=''>全部</option>";
	//		$.each(data,function(i,item){
	//			options += "<option value='"+item+"'>"+item+"</option>";
	//		})
	//		$("#gqunit").html(options);
			
	//	}
	//});
	$("#gqunit").val(sxqy);
}
function init_gqpoint() {
    map.infoWindow.hide();
    init_gqpoint2();
}
//初始化水位站点信息
function init_gqpoint2(){
	$("#mapspinner").removeClass("myhide");
    changequyu2($("#gqunit").val());
	$.ajax({
		type:		'GET',
		url:		api_url+'/gate/getGateR',
		data:       {addvcd:$("#gqunit").val(),stnm:$("#gqname").val()},
		dataType:	'json',
		success:	function(data){
			
			var zgsj = [];
			var dt = null;
			gqLayer.clear();
			gqLayer1.clear();
			gqLayer2.clear();
			gqLayer3.clear();
			$.each(data,function(i,item){
				dt = null;
				var stnm = item.stnm;
				if(stnm == '白屈港套闸'){
					zgsj.push({stnm:stnm,zhamen:'',bengji:'',tm:'',isold:'',other:''});
				}
				var zhamen = '';
				$.each(item.gaterlist,function(i,item2){
					if(item2.eqpno >0){
						if(!dt || dt<new Date(item2.tm)){
                            dt = new Date(item2.tm);
						}

						zhamen += item2.gtophgt==null?'0/':item2.gtophgt+'/';
					}
				});
				var bengji = '';
				$.each(item.pumprlist,function(i,item2){
					if(item2.eqpno >0){
                        if(!dt || dt<new Date(item2.tm)) {
                            dt = new Date(item2.tm);
                        }
						bengji += item2.status==null?'0/':item2.status+'/';
					}
					
				});
				if(dt){
                    var isold = (new Date().getTime() - dt.getTime()) / (1000 * 3600) > 3 ? true : false;
					var tms = formatdate(dt);
					zgsj.push({stnm:stnm,zhamen:zhamen,bengji:bengji,tm:tms,isold:isold,other:item});
					drawpoint_noshow_gq({stnm:stnm,zhamen:zhamen,bengji:bengji,tm:tms,other:item},gqLayer);
//					if(i == 0 && $("#gqunit").val().length>0){
//						var x = item.lgtd;
//						var y = item.lttd;
//						if(x&&y){
//							var point = new esri.geometry.Point({"x": x,"y": y,"spatialReference": {"wkid": 4490}});  
//							map.centerAndZoom(point,10);
//						}
//					}
				}
			})

			$("#toolbarDemo2").html('<span class="jl_s pull-left" id="jls">共找到<strong id="gqcount">'+zgsj.length+'</strong>条记录</span> ');
			
			var thistableheight = $(window).height()-290+30;
			layui.use('table', function(){
				var table = layui.table;
				  
				table.render({
				    elem: '#gqtable',
				    cols: [[
						{type: 'numbers', width:45, title: ''},
						{field:'stnm', width:70, title: '站点名称',align:'left'},
						{field:'zhamen',width:150, title: '闸门开度(m)',align:'left',
							templet: function(d){
                                if(d.other.usfl == 1){
                                    return '--';
                                }
                                if(d.other.usfl == 2){
                                    return '--';
                                }
								
								var zhamens = d.zhamen.split('/');
								var xinxi = '';
								$.each(zhamens,function(i,item3){
									if(item3){
                                        if(Number(item3).toFixed(1) <0){

                                            xinxi += '<a class="text-bg5 hd mb_padding">0.0</a>';
                                        }else if(Number(item3).toFixed(1) <=0.2){
											xinxi += '<a class="text-bg5 hd mb_padding">'+Number(item3).toFixed(1)+'</a>';
										}else{
											xinxi += '<a class="text-bg5 mb_padding">'+Number(item3).toFixed(1)+'</a>';
										}
									}
								})
								return xinxi;
							}
						},
						{field:'bengji',width:200, title: '泵机状态',align:'left',
							templet: function(d){
                                if(d.other.usfl == 1){
                                    return '--';
                                }
                                if(d.other.usfl == 2){
                                    return '--';
                                }
								var bengjis = d.bengji.split('/');
								var xinxi = '';
								$.each(bengjis,function(i,item3){
									if(item3){
										if(item3 <= 0){
											xinxi +=  '<span class="bj_yx"><img src="images/gis/bg.png"></span>';
										}else{
											xinxi +=  '<span class="bj_yx"><img src="images/gis/bk.gif"></span>';
										}
									}
								})
								return xinxi;
							}
						},
						{field:'tm',width:100,  title: '数据时间',align:'center',
							templet: function(d){

                                if(d.other.usfl == 1){
                                    return '离线';
                                }
                                if(d.other.usfl == 2){
                                    return '故障';
                                }

								if(d.isold){
									return '<span class="mycolor3">'+d.tm.substring(5,d.tm.length)+'</span>';
								}else{
									return '<span>'+d.tm.substring(5,d.tm.length)+'</span>';
								}

							}
						}
				    ]],
					data: zgsj,
					even: true,
					limit: 10000,
					toolbar: '#toolbarDemo2',
					height:thistableheight
				});
				//监听行单击事件（单击事件为：rowDouble）
			  table.on('row(gqtable)', function(obj){
			    var data = obj.data;
			    gqpointto2(data.other);
			  });
			  
			
			
			$(".gq_alltab .layui-table-tool").insertAfter($(".gq_alltab .layui-table-box"));
			$(".gq_alltab .layui-table-tool-self").append('<a href="javascript:showgqmore()" class="pull-right mymorebtn">更多</a>');
			});

			$("#mapspinner").addClass("myhide");
			
		}
	});
	
	
}

var gqpointgras = [];
//画点
function drawpoint_noshow_gq(shuju,layernm){
	var x,y;
	var zdname = '';
	
	x = shuju.other.lgtd;
	y = shuju.other.lttd;
	zdname = shuju.other.stnm;
	
	var index = shuju.other.stcd.substring(shuju.other.stcd.length-2,shuju.other.stcd.length);
	
	if(shuju.other.addvcd =='青阳与肖山'){
		
		layername = gqLayer;
		
	}else if(shuju.other.addvcd =='白屈港管理处' || shuju.other.addvcd =='江港堤闸管理处'){
		if(index<=1){
			layername = gqLayer;
		}else{
			layername = gqLayer1;
		}
	}else{
	
		if(index<=5){
			layername = gqLayer;
		}else{
			layername = gqLayer1;
		}
	}
	
	var zhamens = [];
	var bengjis = [];
	if(shuju.zhamen.length>1){
		zhamens = shuju.zhamen.substring(0,shuju.zhamen.length-1).split("/");
	}
	if(shuju.bengji.length>1){
		bengjis = shuju.bengji.substring(0,shuju.bengji.length-1).split("/");
	}
	if(x&&y){
		var point = new esri.geometry.Point({"x": x,"y": y,"spatialReference": {"wkid": 4490}});  
		var font2 = new esri.symbol.Font("8pt", esri.symbol.Font.STYLE_NORMAL, esri.symbol.Font.VARIANT_NORMAL, esri.symbol.Font.WEIGHT_NORMAL, "Verdana");
		
		var point_symbol = new esri.symbol.PictureMarkerSymbol("images/gis/beng.png", 38, 38);

        if(shuju.other.usfl == 1 || shuju.other.usfl == 2 ){
            point_symbol = new esri.symbol.PictureMarkerSymbol("images/gis/wx.png", 40, 40);
            var graphic = new esri.Graphic(point, point_symbol);

            layername.add(graphic);

        }else {
            point_symbol.setOffset(0, 1);

            var graphic = new esri.Graphic(point, point_symbol);
            graphic.attributes = shuju.other;

            var gqpointobj = new Object();

            var bglength = 30 + 15 * (zhamens.length + bengjis.length);
            var zdnamecolor = new dojo.Color([255, 255, 255, 1]);
            var upperBgGraphic = new esri.Graphic(graphic.geometry, null, null, null);
            var upperBgSymbol = new esri.symbol.PictureMarkerSymbol("images/gis/11.png", bglength, 34);
            upperBgSymbol.setOffset(bglength / 2, 3);
            upperBgGraphic.setSymbol(upperBgSymbol);
            layername.add(upperBgGraphic);

            var zzdatagras = [];
            var bjdatagras = [];
            for (var i = 0; i < zhamens.length; i++) {
                var zmkaiurl = '';
                if (zhamens[i] > 0.2) {
                    zmkaiurl = "images/gis/zk.png";
                } else {
                    zmkaiurl = "images/gis/zg.png";
                }
                var upperDataGraphic = new esri.Graphic(graphic.geometry, null, null, null);

                var upperDataSymbol = new esri.symbol.PictureMarkerSymbol(zmkaiurl, 16, 16);
                upperDataSymbol.setOffset(30 + 15 * i, 6);
                upperDataGraphic.setSymbol(upperDataSymbol);
                layername.add(upperDataGraphic);
                zzdatagras.push(upperDataGraphic);
            }
            gqpointobj.zzlength = zzdatagras.length;
            gqpointobj.zzdatagras = zzdatagras;
            for (var i = 0; i < bengjis.length; i++) {
                var zmkaiurl = '';
                if (bengjis[i] > 0) {
                    zmkaiurl = "images/gis/bk.gif";
                } else {
                    zmkaiurl = "images/gis/bg.png";
                }
                var upperDataGraphic = new esri.Graphic(graphic.geometry, null, null, null);

                var upperDataSymbol = new esri.symbol.PictureMarkerSymbol(zmkaiurl, 12, 12);
                upperDataSymbol.setOffset(30 + 15 * zhamens.length + 15 * i, 6);
                upperDataGraphic.setSymbol(upperDataSymbol);
                layername.add(upperDataGraphic);
                bjdatagras.push(upperDataGraphic);
            }
            gqpointobj.bjlength = bjdatagras.length;
            gqpointobj.bjdatagras = bjdatagras;

            gqpointobj.upperBgGraphic = upperBgGraphic;

            var namewidth = zdname.length * 12 + 30;
            var nameOffset = zdname.length * 5 + 97 + 22;

            gqpointobj.namelength = zdname.length;
            var nameBgGraphic = new esri.Graphic(graphic.geometry, null, null, null);
            var nameBgSymbol = new esri.symbol.PictureMarkerSymbol("images/gis/22.png", namewidth, 34);
            var nameDataGraphic = new esri.Graphic(graphic.geometry, null, null, null);
            var nameDataSymbol = new esri.symbol.TextSymbol({
                text: (zdname),
                font: font2,
                color: zdnamecolor,
                xoffset: bglength - 4 * (zhamens.length + bengjis.length),
                yoffset: 0,
                align: "start"
            });
            nameBgSymbol.setOffset(bglength + namewidth / 2, 3);
            nameBgGraphic.setSymbol(nameBgSymbol);
            nameDataGraphic.setSymbol(nameDataSymbol);

            var wBgGraphic = new esri.Graphic(graphic.geometry, null, null, null);
            var wBgSymbol = new esri.symbol.PictureMarkerSymbol("images/gis/33.png", 12, 34);
            wBgSymbol.setOffset(bglength + namewidth + 5, 3);
            wBgGraphic.setSymbol(wBgSymbol);

            layername.add(nameBgGraphic);
            layername.add(nameDataGraphic);
            layername.add(wBgGraphic);

            gqpointobj.nameBgGraphic = nameBgGraphic;
            gqpointobj.nameDataGraphic = nameDataGraphic;
            gqpointobj.wBgGraphic = wBgGraphic;


//    	var infoTemplate = new esri.InfoTemplate();
//		//设置infoWindow的尺寸
//		map.infoWindow.resize(635, 480);
//		//设置Title
//		infoTemplate.setTitle(shuju.other.stnm);
//		
//		
//		var infoall = '<iframe src="gqxinxi.html" style="width:100%;height:428px;" frameborder="0">';
//		
//		//设置Content
//		infoTemplate.setContent(infoall);
//		//设置graphic的信息模板
//		graphic.setInfoTemplate(infoTemplate);

            shuju.other.infoTemplateTitle = shuju.other.stnm;
            shuju.other.infoTemplateContent = '<iframe src="gqxinxi.html" style="width:100%;height:428px;" frameborder="0">';

            graphic.attributes = shuju.other;

            layername.add(graphic);

            gqpointobj.graphic = graphic;

            gqpointgras.push(gqpointobj);

        }
			
	}else{
	}
}

var gqisallchecktemp = 7;
function changetubiaogq(index,ischecked){
	if(ischecked){
		gqisallchecktemp += Number(index);
	}else{
		gqisallchecktemp -= Number(index);
	}
	changetbxsgq();
}

function changetbxsgq(){
	for(var i = 0;i<gqpointgras.length;i++){
		var gqpointobj = gqpointgras[i];
		
		if(gqisallchecktemp == 0){
			
			gqpointobj.upperBgGraphic.hide();
			if(gqpointobj.zzdatagras){
				for(var ii = 0;ii<gqpointobj.zzdatagras.length;ii++){
					gqpointobj.zzdatagras[ii].hide();
				}
			}
			if(gqpointobj.bjdatagras){
				for(var ii = 0;ii<gqpointobj.bjdatagras.length;ii++){
					gqpointobj.bjdatagras[ii].hide();
				}
			}
			
			gqpointobj.nameBgGraphic.hide();
	 		gqpointobj.nameDataGraphic.hide();
	 		gqpointobj.wBgGraphic.hide();
	 		
		}else if(gqisallchecktemp == 1){
			if(gqpointobj.zzdatagras.length>0){
				gqpointobj.upperBgGraphic.show();
				gqpointobj.wBgGraphic.show();
				
				var bglength = 30+15*gqpointobj.zzlength;
				var upperBgSymbol = gqpointobj.upperBgGraphic.symbol;
				upperBgSymbol.width = bglength;
				upperBgSymbol.setOffset(bglength/2, 3);
				gqpointobj.upperBgGraphic.setSymbol(upperBgSymbol);
				if(gqpointobj.zzdatagras){
					for(var ii = 0;ii<gqpointobj.zzdatagras.length;ii++){
						var upperDataSymbol = gqpointobj.zzdatagras[ii].symbol;
						upperDataSymbol.setOffset(30+15*ii, 6);
						gqpointobj.zzdatagras[ii].setSymbol(upperDataSymbol);
						gqpointobj.zzdatagras[ii].show();
					}
				}
				if(gqpointobj.bjdatagras){
					for(var ii = 0;ii<gqpointobj.bjdatagras.length;ii++){
						gqpointobj.bjdatagras[ii].hide();
					}
				}
				
				gqpointobj.nameBgGraphic.hide();
				gqpointobj.nameDataGraphic.hide();
				var wBgSymbol = gqpointobj.wBgGraphic.symbol;
				wBgSymbol.setOffset(bglength+5, 3);
				gqpointobj.wBgGraphic.setSymbol(wBgSymbol);
			}
	 		
		}else if(gqisallchecktemp == 2){
			if(gqpointobj.bjdatagras.length>0){
				gqpointobj.upperBgGraphic.show();
				gqpointobj.wBgGraphic.show();
				
				var bglength = 30+15*gqpointobj.bjlength;
				var upperBgSymbol = gqpointobj.upperBgGraphic.symbol;
				upperBgSymbol.width = bglength;
				upperBgSymbol.setOffset(bglength/2, 3);
				gqpointobj.upperBgGraphic.setSymbol(upperBgSymbol);
				
				if(gqpointobj.zzdatagras){
					for(var ii = 0;ii<gqpointobj.zzdatagras.length;ii++){
						gqpointobj.zzdatagras[ii].hide();
					}
				}
				if(gqpointobj.bjdatagras){
					if(gqpointobj.bjdatagras.length>0){
						for(var ii = 0;ii<gqpointobj.bjdatagras.length;ii++){
							var upperDataSymbol = gqpointobj.bjdatagras[ii].symbol;
							upperDataSymbol.setOffset(30+15*ii, 6);
							gqpointobj.bjdatagras[ii].setSymbol(upperDataSymbol);
							gqpointobj.bjdatagras[ii].show();
						}
					}else{
						bglength = 0;
						gqpointobj.upperBgGraphic.hide();
					}
				}
				
				gqpointobj.nameBgGraphic.hide();
				gqpointobj.nameDataGraphic.hide();
				var wBgSymbol = gqpointobj.wBgGraphic.symbol;
				wBgSymbol.setOffset(bglength+5, 3);
				gqpointobj.wBgGraphic.setSymbol(wBgSymbol);
			}
	 		
		}else if(gqisallchecktemp == 3){
			
			gqpointobj.upperBgGraphic.show();
	 		gqpointobj.wBgGraphic.show();
			
			var bglength = 30+15*(gqpointobj.zzlength+gqpointobj.bjlength);
			var upperBgSymbol = gqpointobj.upperBgGraphic.symbol;
			upperBgSymbol.width = bglength;
			upperBgSymbol.setOffset(bglength/2, 3);
			gqpointobj.upperBgGraphic.setSymbol(upperBgSymbol);
			
			if(gqpointobj.zzdatagras){
				for(var ii = 0;ii<gqpointobj.zzdatagras.length;ii++){
					var upperDataSymbol = gqpointobj.zzdatagras[ii].symbol;
					upperDataSymbol.setOffset(30+15*ii, 6);
		            gqpointobj.zzdatagras[ii].setSymbol(upperDataSymbol);
					gqpointobj.zzdatagras[ii].show();
				}
			}
			if(gqpointobj.bjdatagras){
				for(var ii = 0;ii<gqpointobj.bjdatagras.length;ii++){
					var upperDataSymbol = gqpointobj.bjdatagras[ii].symbol;
					upperDataSymbol.setOffset(30+15*gqpointobj.zzlength+15*ii, 6);
		            gqpointobj.bjdatagras[ii].setSymbol(upperDataSymbol);
					gqpointobj.bjdatagras[ii].show();
				}
			}
			
			gqpointobj.nameBgGraphic.hide();
	 		gqpointobj.nameDataGraphic.hide();
	 		var wBgSymbol = gqpointobj.wBgGraphic.symbol;
	 		wBgSymbol.setOffset(bglength+5, 3);
			gqpointobj.wBgGraphic.setSymbol(wBgSymbol);
	 		
		}else if(gqisallchecktemp == 4){
			
			gqpointobj.upperBgGraphic.hide();
			if(gqpointobj.zzdatagras){
				for(var ii = 0;ii<gqpointobj.zzdatagras.length;ii++){
					gqpointobj.zzdatagras[ii].hide();
				}
			}
			if(gqpointobj.bjdatagras){
				for(var ii = 0;ii<gqpointobj.bjdatagras.length;ii++){
					gqpointobj.bjdatagras[ii].hide();
				}
			}
			
			gqpointobj.nameBgGraphic.show();
	 		gqpointobj.nameDataGraphic.show();
	 		gqpointobj.wBgGraphic.show();
	 		
	 		var namewidth = gqpointobj.namelength*10+50;
			
	 		var symbolname = gqpointobj.nameBgGraphic.symbol;
			symbolname.width = namewidth;
			symbolname.xoffset = (namewidth/2);
			gqpointobj.nameBgGraphic.setSymbol(symbolname);
					
			var symbolbac = gqpointobj.nameDataGraphic.symbol;
			symbolbac.setOffset(28-gqpointobj.namelength, 1);
			gqpointobj.nameDataGraphic.setSymbol(symbolbac);
			
			var symbolw = gqpointobj.wBgGraphic.symbol;
			symbolw.xoffset = namewidth+symbolw.width/2;
 			gqpointobj.wBgGraphic.setSymbol(symbolw);
	 		
		}else if(gqisallchecktemp == 5){
			if(gqpointobj.zzdatagras.length>0){
				gqpointobj.upperBgGraphic.show();
				gqpointobj.nameBgGraphic.show();
				gqpointobj.nameDataGraphic.show();
				gqpointobj.wBgGraphic.show();
				
				var bglength = 30+15*gqpointobj.zzlength;
				var upperBgSymbol = gqpointobj.upperBgGraphic.symbol;
				upperBgSymbol.width = bglength;
				upperBgSymbol.setOffset(bglength/2, 3);
				gqpointobj.upperBgGraphic.setSymbol(upperBgSymbol);
				
				if(gqpointobj.zzdatagras){
					for(var ii = 0;ii<gqpointobj.zzdatagras.length;ii++){
						var upperDataSymbol = gqpointobj.zzdatagras[ii].symbol;
						upperDataSymbol.setOffset(30+15*ii, 6);
						gqpointobj.zzdatagras[ii].setSymbol(upperDataSymbol);
						gqpointobj.zzdatagras[ii].show();
					}
				}
				if(gqpointobj.bjdatagras){
					for(var ii = 0;ii<gqpointobj.bjdatagras.length;ii++){
						gqpointobj.bjdatagras[ii].hide();
					}
				}
				
				var namewidth = gqpointobj.namelength*10+50;
				
				var symbolname = gqpointobj.nameBgGraphic.symbol;
				symbolname.width = namewidth;
				symbolname.xoffset = bglength+namewidth/2;
				gqpointobj.nameBgGraphic.setSymbol(symbolname);
						
				var symbolbac = gqpointobj.nameDataGraphic.symbol;
				symbolbac.setOffset(bglength+10, 3);
				gqpointobj.nameDataGraphic.setSymbol(symbolbac);
				
				var symbolw = gqpointobj.wBgGraphic.symbol;
				symbolw.xoffset = bglength+namewidth+5;
				gqpointobj.wBgGraphic.setSymbol(symbolw);
			}else{
				//和4一样
				gqpointobj.upperBgGraphic.hide();
				if(gqpointobj.zzdatagras){
					for(var ii = 0;ii<gqpointobj.zzdatagras.length;ii++){
						gqpointobj.zzdatagras[ii].hide();
					}
				}
				if(gqpointobj.bjdatagras){
					for(var ii = 0;ii<gqpointobj.bjdatagras.length;ii++){
						gqpointobj.bjdatagras[ii].hide();
					}
				}
				
				gqpointobj.nameBgGraphic.show();
				gqpointobj.nameDataGraphic.show();
				gqpointobj.wBgGraphic.show();
				
				var namewidth = gqpointobj.namelength*10+50;
				
				var symbolname = gqpointobj.nameBgGraphic.symbol;
				symbolname.width = namewidth;
				symbolname.xoffset = (namewidth/2);
				gqpointobj.nameBgGraphic.setSymbol(symbolname);
						
				var symbolbac = gqpointobj.nameDataGraphic.symbol;
				symbolbac.setOffset(28-gqpointobj.namelength, 1);
				gqpointobj.nameDataGraphic.setSymbol(symbolbac);
				
				var symbolw = gqpointobj.wBgGraphic.symbol;
				symbolw.xoffset = namewidth+symbolw.width/2;
				gqpointobj.wBgGraphic.setSymbol(symbolw);
			}
 			
	 		
		}else if(gqisallchecktemp == 6){
			if(gqpointobj.bjdatagras.length>0){
				gqpointobj.upperBgGraphic.show();
				gqpointobj.nameBgGraphic.show();
				gqpointobj.nameDataGraphic.show();
				gqpointobj.wBgGraphic.show();
				var bglength = 30+15*gqpointobj.bjlength;
				var upperBgSymbol = gqpointobj.upperBgGraphic.symbol;
				upperBgSymbol.width = bglength;
				upperBgSymbol.setOffset(bglength/2, 3);
				gqpointobj.upperBgGraphic.setSymbol(upperBgSymbol);
				
				if(gqpointobj.zzdatagras){
					for(var ii = 0;ii<gqpointobj.zzdatagras.length;ii++){
						gqpointobj.zzdatagras[ii].hide();
					}
				}
				if(gqpointobj.bjdatagras){
					if(gqpointobj.bjdatagras.length>0){
						for(var ii = 0;ii<gqpointobj.bjdatagras.length;ii++){
						var upperDataSymbol = gqpointobj.bjdatagras[ii].symbol;
							upperDataSymbol.setOffset(30+15*ii, 6);
							gqpointobj.bjdatagras[ii].setSymbol(upperDataSymbol);
							gqpointobj.bjdatagras[ii].show();
						}
					}else{
						bglength = 0;
						gqpointobj.upperBgGraphic.hide();
					}
				}
				
				var namewidth = gqpointobj.namelength*10+50;
				
				var symbolname = gqpointobj.nameBgGraphic.symbol;
				symbolname.width = namewidth;
				symbolname.xoffset = bglength+namewidth/2;
				gqpointobj.nameBgGraphic.setSymbol(symbolname);
						
				var symbolbac = gqpointobj.nameDataGraphic.symbol;
				symbolbac.setOffset(bglength+10, 3);
				gqpointobj.nameDataGraphic.setSymbol(symbolbac);
				
				var symbolw = gqpointobj.wBgGraphic.symbol;
				symbolw.xoffset = bglength+namewidth+5;
				gqpointobj.wBgGraphic.setSymbol(symbolw);
 			}else{
				//和4一样
				gqpointobj.upperBgGraphic.hide();
				if(gqpointobj.zzdatagras){
					for(var ii = 0;ii<gqpointobj.zzdatagras.length;ii++){
						gqpointobj.zzdatagras[ii].hide();
					}
				}
				if(gqpointobj.bjdatagras){
					for(var ii = 0;ii<gqpointobj.bjdatagras.length;ii++){
						gqpointobj.bjdatagras[ii].hide();
					}
				}
				
				gqpointobj.nameBgGraphic.show();
				gqpointobj.nameDataGraphic.show();
				gqpointobj.wBgGraphic.show();
				
				var namewidth = gqpointobj.namelength*10+50;
				
				var symbolname = gqpointobj.nameBgGraphic.symbol;
				symbolname.width = namewidth;
				symbolname.xoffset = (namewidth/2);
				gqpointobj.nameBgGraphic.setSymbol(symbolname);
						
				var symbolbac = gqpointobj.nameDataGraphic.symbol;
				symbolbac.setOffset(28-gqpointobj.namelength, 1);
				gqpointobj.nameDataGraphic.setSymbol(symbolbac);
				
				var symbolw = gqpointobj.wBgGraphic.symbol;
				symbolw.xoffset = namewidth+symbolw.width/2;
				gqpointobj.wBgGraphic.setSymbol(symbolw);
			}
	 		
		}else if(gqisallchecktemp == 7){
			gqpointobj.upperBgGraphic.show();
			gqpointobj.nameBgGraphic.show();
	 		gqpointobj.nameDataGraphic.show();
	 		gqpointobj.wBgGraphic.show();
	 		
			var bglength = 30+15*(gqpointobj.zzlength+gqpointobj.bjlength);
			var upperBgSymbol = gqpointobj.upperBgGraphic.symbol;
			upperBgSymbol.width = bglength;
			upperBgSymbol.setOffset(bglength/2, 3);
			gqpointobj.upperBgGraphic.setSymbol(upperBgSymbol);
			
			if(gqpointobj.zzdatagras){
				for(var ii = 0;ii<gqpointobj.zzdatagras.length;ii++){
					var upperDataSymbol = gqpointobj.zzdatagras[ii].symbol;
					upperDataSymbol.setOffset(30+15*ii, 6);
		            gqpointobj.zzdatagras[ii].setSymbol(upperDataSymbol);
					gqpointobj.zzdatagras[ii].show();
				}
			}
			if(gqpointobj.bjdatagras){
				for(var ii = 0;ii<gqpointobj.bjdatagras.length;ii++){
					var upperDataSymbol = gqpointobj.bjdatagras[ii].symbol;
					upperDataSymbol.setOffset(30+15*gqpointobj.zzlength+15*ii, 6);
		            gqpointobj.bjdatagras[ii].setSymbol(upperDataSymbol);
					gqpointobj.bjdatagras[ii].show();
				}
			}
	 		
	 		var namewidth = gqpointobj.namelength*10+50;
			
	 		var symbolname = gqpointobj.nameBgGraphic.symbol;
			symbolname.width = namewidth;
			symbolname.xoffset = bglength+namewidth/2;
			gqpointobj.nameBgGraphic.setSymbol(symbolname);
					
			var symbolbac = gqpointobj.nameDataGraphic.symbol;
			symbolbac.setOffset(bglength+10, 3);
			gqpointobj.nameDataGraphic.setSymbol(symbolbac);
			
			var symbolw = gqpointobj.wBgGraphic.symbol;
			symbolw.xoffset = bglength+namewidth+5;
 			gqpointobj.wBgGraphic.setSymbol(symbolw);
 			
	 		
		}
	}
}

var dangqiangqshuju;


//定位到改点，并显示
function gqpointto(shuju){
	
	dangqiangqshuju = shuju;
    dangqianswshuju = null;
    thisstnm = shuju.stnm;

    $("#stcdxx").val(shuju.stcd);
    thisylzd = shuju.ylzdbh;
	tabindex = 2;
}
//定位到改点，并显示
function gqpointto2(shuju){
	var x,y;
    if(shuju.usfl == 0) {
        dangqiangqshuju = shuju;
        dangqianswshuju = null;
        $("#stcdxx").val(shuju.stcd);
        thisstnm = shuju.stnm;
        thisylzd = shuju.ylzdbh;
        x = shuju.lgtd;
        y = shuju.lttd;
        if (x && y) {
            tabindex = 2;
            var point = new esri.geometry.Point({"x": x, "y": y, "spatialReference": {"wkid": 4490}});
            map.centerAt(point);
            map.infoWindow.hide();
            setTimeout(delay, 1000);

            function delay() {
                map.infoWindow.resize(635, 480);
                map.infoWindow.setTitle(shuju.stnm);
                map.infoWindow.setContent('<iframe src="gqxinxi.html" style="width:100%;height:428px;" frameborder="0">');
                map.infoWindow.show(point);

            }
        }
    }
}

function showdetail_more2(index){
	$("#sqmode").modal("show");
	if(dangqianswshuju.gates || dangqianswshuju.pumps){

	}else{
        $("#mapdetailul2 li:eq(2)").addClass('myhide');
	}
	$("#mapdetailul2 li:eq("+index+")").click();
}

function shuaxingq(){
	 gqiframe.window.showgqdetail();
}
function showyckz(){

	$("#yckzmode").modal("show");
}
function showgqmore(){
    $('#morehead').html("工情信息");
    $('#moreiframe').height($(window).height()-75);
    $('#moreiframe').html('<iframe src="gongqing.html" width="100%" height="100%" style="border:none" ></iframe>');
    $('#moremode').modal("show");
}