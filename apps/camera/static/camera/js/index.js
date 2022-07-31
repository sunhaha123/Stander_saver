$(document).ready(function() {
    // 显示当前时间
    var t = null;
    t = setTimeout(time, 1000);//開始运行
    function time() {
        clearTimeout(t);//清除定时器
        dt = new Date();
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1;//(0-11,0代表1月)
        var date = dt.getDate();//获取天
        var num = dt.getDay();//获取星期
        var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var hour = dt.getHours();//获取时
        var minute = dt.getMinutes();//获取分
        var second = dt.getSeconds();//获取秒
        //分秒时间是一位数字，在数字前补0。
        date = extra(date);
        month = extra(month);
        minute = extra(minute);
        second = extra(second);
        $('#time').html( hour + ":" + minute + ":" + second)
        $('#date').html( month + "月" + date + "日"+ " " + weekday[num])
        // document.getElementById("start").innerHTML = year + " 年 " + month + " 月 " + date + " 日 " + hour + "：" + minute + "：" + second + " " + weekday[num];
        t = setTimeout(time, 1000); //设定定时器，循环运行
    }
    //补位函数。
    function extra(x) {
        //如果传入数字小于10，数字前补一位0。
        if (x < 10) {
            return "0" + x;
        }
        else {
            return x;
        }
    }
 
    // 全屏自适应
    function scale() {
        var ratioW = window.innerWidth / 1920; 
        var ratioH = window.innerHeight / 1080; 
        document.body.style.transform= `scale(${ratioW},${ratioH})`; 
        document.body.style.transformOrigin='left top';
    }
    scale()
    window.addEventListener('resize', function() {
        scale()
    })

    // 切屏
    $("#btnWrap").on('click','li', function () {
        if ($(this).hasClass('active')) {
            return
        } else {
            var index = $(this).index()
            $(this).addClass('active').siblings('li').removeClass('active')
            if (index == 4) {
                $('#imageWrap .image').addClass('show width2')
            } else {
                $('#imageWrap .image').removeClass('width2')
                $('#imageWrap .image').eq(index).addClass('show').siblings().removeClass('show')
            }
        }
    })

    var buildSitTime = null
    // 获取地图数据
    function getMapData() {
        $.ajax({
            type: "get",
            url: urlHomeDev + "/subregional/sports/place",
            data: {
                province: '310000',
                city: '310100'
            },
            dataType: "json",
            success: function(res) {
                var mapArr = res.data;
                for (var i = 0; i < res.data.length; i++) {
                    mapArr[i].itemStyle = itemStyle[i].itemStyle
                    mapArr[i].emphasis = itemStyle[i]
                }
                setMap(mapArr)
            },
            error: function(res) {
                console.log(res);
            }
        })
    }
    // getMapData()
    // 首页上海地图
    var itemStyle = [
        {"itemStyle":{"areaColor": '#A6FF0A'}, name: '黄浦区',zoom: 14},
        {"itemStyle":{"areaColor": '#FF9B06'}, name: '徐汇区',zoom: 13},
        {"itemStyle":{"areaColor": '#FF660A'}, name: '长宁区',zoom: 13},
        {"itemStyle":{"areaColor": '#09FFF1'}, name: '静安区',zoom: 13},
        {"itemStyle":{"areaColor": '#7DFF08'}, name: '普陀区',zoom: 13},
        {"itemStyle":{"areaColor": '#01B7FF'}, name: '虹口区',zoom: 13},
        {"itemStyle":{"areaColor": '#F6FF09'}, name: '杨浦区',zoom: 13},
        {"itemStyle":{"areaColor": '#F5FF7C'}, name: '闵行区',zoom: 11},
        {"itemStyle":{"areaColor": '#0DFFB7'}, name: '宝山区',zoom: 12},
        {"itemStyle":{"areaColor": '#FF9B9A'}, name: '嘉定区',zoom: 12},
        {"itemStyle":{"areaColor": '#E29BFF'}, name: '浦东新区',zoom: 11},
        {"itemStyle":{"areaColor": '#3254FF'}, name: '金山区',zoom: 13},
        {"itemStyle":{"areaColor": '#FFD23B'}, name: '松江区',zoom: 11},
        {"itemStyle":{"areaColor": '#AFC4FF'}, name: '青浦区',zoom: 11},
        {"itemStyle":{"areaColor": '#FF4547'}, name: '奉贤区',zoom: 11},
        {"itemStyle":{"areaColor": '#53C0FF'}, name: '崇明区',zoom: 11}
    ]
    var uploadedDataURL = "static/shanghai.json"
    var shMap = echarts.init(document.getElementById('shMap'));
    $.getJSON(uploadedDataURL, function (geoJson) { 
        echarts.registerMap('shanghai', geoJson);
        option = {
            series: [{
                type: 'map',
                mapType: 'shanghai',
                zoom: 1.1,
                // aspectScale: 1,
                roam: false, //是否开启鼠标缩放和平移漫游
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#389BB7',
                        areaColor: '#031525',
                    },
                    emphasis: {
                        areaColor: itemStyle,
                        borderWidth: 2,
                        borderColor: '#fff',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    }
                },
                data: itemStyle
            }]
        }
        shMap.setOption(option);
    })
    function setMap(data) {
        // $.getJSON(uploadedDataURL, function(geoJson) {
            // echarts.registerMap('shanghai', geoJson);
            option = {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    showDelay: 0,
                    hideDelay: 0,
                    enterable: true,
                    transitionDuration: 0,
                    alwaysShowContent: true,
                    extraCssText: 'z-index:100',
                    // position: ['3%', '13%'],
                    formatter: function(params, ticket, callback) {
                        //根据业务自己拓展要显示的内容
                        var res = "";
                        var name = params.name;
                        var value = params.value;
                        var area = params.data.area;
                        var number = params.data.population;
                        res = '<div style="width: 346px; height: 250px; background: url(images/infobg.png) no-repeat; background-size: 100% 100%; padding-left: 28px; line-height:30px; box-sizing: border-box; font-size: 28px; color:#ffffff;">'
                            +'<h3 style="font-size:26px; line-height:58px;">'+ name +'</h3>'
                            +'<p style="margin-top: 26px; padding-left: 6px;">数量：'+ value +'个</p>'
                            +'<p style="margin-top: 20px; padding-left: 6px;">面积：'+ area +'平方米</p>'
                            +'<p style="margin-top: 20px; padding-left: 6px;">人口：'+ number +'人</p></div>'
                        return res;
                    }
                },
                series: [{
                        data: data
                    }
                ]
            };
            shMap.setOption(option);
            var count = 0;
            var timeTicket = null;
            var dataLength = option.series[0].data.length;
            timeTicket && clearInterval(timeTicket);
            timeTicket = setInterval(function() {
                shMap.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                });
                shMap.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: (count) % dataLength
                });
                shMap.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: (count) % dataLength
                });
                count++;
            }, 5000);
            shMap.on('mouseover', function(params) {
                // console.log(params)
                clearInterval(timeTicket);
                shMap.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0
                });
                shMap.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: params.dataIndex
                });
                shMap.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: params.dataIndex,
                });
            });
            shMap.on('mouseout', function(params) {
                timeTicket && clearInterval(timeTicket);
                timeTicket = setInterval(function() {
                    shMap.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                    });
                    shMap.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: (count) % dataLength
                    });
                    shMap.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: (count) % dataLength
                    });
                    count++;
                }, 5000);
            });
            // 电子地图点击获取设施点地图信息
            shMap.on('click', function (param) {
                $('.mapBox').show()
                $('#shMap').hide()
                $('#regTab').attr('val', param.data.code)
                $('#regTab').attr('longitude', param.data.longitude)
                $('#regTab').attr('latitude', param.data.latitude)
                $('#regTab').attr('zoom', param.data.emphasis.zoom)
                $('#regTab').text(param.data.name)
                mapData(param.data.code, param.data.longitude, param.data.latitude, param.data.emphasis.zoom)
                getList(getParams())
                clearInterval(buildSitTime);
                getBuildNum(getParams())
                listData.pageNo = 1;
                getStatusData(getParams())
            })
        // });
    }
    $('#goMap').click(function() {
        $('.mapBox').hide()
        $('#shMap').show()
        $('#regTab').removeAttr('val')
        $('#regTab').removeAttr('longitude')
        $('#regTab').removeAttr('latitude')
        $('#regTab').text('上海市')
        getList(getParams())
        clearInterval(buildSitTime);
        getBuildNum(getParams())
        getStatusData(getParams())
    })

    // 获取初始参数
    function getParams() {
        data = {
            "province": '310000',
            "city": '310100',
            "district": $('#regTab').attr('val')
        }
        return data
    }
     // 设施全貌
    function getList(params) {
        $.ajax({
            type: "get",
            url: urlHomeDev + "/all/sports/place",
            data: params,
            dataType: "json",
            success: function (res) {
                var data = res.data.jsonObjects
                for (var i = 0; i < data.length; i++) {
                    if (data[i].typeId == '1') {
                        $("#typeId1").text(toThousands(data[i].sportsPlaceNum));
                        $("#typeId11").text(toThousands(data[i].quantity));
                    } else if (data[i].typeId == '2') {
                        $("#typeId2").text(toThousands(data[i].sportsPlaceNum));
                        $("#typeId22").text(toThousands(data[i].fieldCount));
                    } else if (data[i].typeId == '3') {
                        $("#typeId3").text(toThousands(data[i].sportsPlaceNum));
                        $("#typeId33").text(toThousands(data[i].acreage));
                    } else if (data[i].typeId == '4') {
                        $("#typeId4").text(toThousands(data[i].sportsPlaceNum));
                        $("#typeId44").text(toThousands(Math.round(data[i].lengthNum/1000)));
                    } else if (data[i].typeId == '7') {
                        $("#typeId7").text(toThousands(data[i].sportsPlaceNum));
                        $("#typeId77").text(toThousands(data[i].acreage));
                    }
                }
                // $('.counter-value').each(function(){
                //     $(this).prop('Counter',0).animate({
                //         Counter: $(this).text()
                //     },{
                //         duration: 2000,
                //         easing: 'swing',
                //         step: function (now){
                //             $(this).text(Math.ceil(now));
                //         }
                //     });
                // });
            },
            error: function (res) { 
                console.log(res);
            }
        })
    }
    getList(getParams())

    // 建设总况
    function getBuildNum(params) {
        params.typeId = '1'
        $.ajax({
            type: "get",
            url: urlHomeDev + "/declare/project",
            dataType: "json",
            data: params,
            success: function(res) {
                var xAxisDataPro = getArrayValue(res.data,'codeName')
                var nstartedNumAllPro = []
                var buildNumAllPro = []
                var startedNumAllPro = []
                for (var i = 0; i < res.data.length; i++) {
                    for (var j = 0; j < res.data[0].list.length; j++) {
                        if (res.data[0].list[j].schedule == '1') {
                            startedNumAllPro.push(res.data[i].list[j].num)
                        } else if (res.data[0].list[j].schedule == '2') {
                            buildNumAllPro.push(res.data[i].list[j].num)
                        } else if (res.data[0].list[j].schedule == '3'){
                            nstartedNumAllPro.push(res.data[i].list[j].num)
                        }
                    }
                }
                // 默认显示10条
                if (xAxisDataPro.length >20) {
                    // var dataZoom_end = (20/xAxisData.length)*100;
                    var zoomState = true
                } else {
                    // var dataZoom_end = 100;
                    var zoomState = false
                }
                loadBuildSitChart(xAxisDataPro,nstartedNumAllPro,buildNumAllPro,startedNumAllPro,zoomState)
            },
            error: function (res) { 
                console.log(res);
            }
        })
    }
    getBuildNum(getParams())

    // 建设总况图表
    var buildSitChart = echarts.init(document.getElementById('buildSitChart'));
    // function loadBuildSitChart(xAxisData, seriesData, zoomState) {
    //     buildSitChart.clear();
    //     var fig
    //     optionA = {
    //         grid: {
    //             left: '6%',
    //             top: '16%',
    //             bottom: 50,
    //             right: '6%'
    //         },
    //         xAxis: {
    //             data: xAxisData,
    //             axisTick: {
    //                 show: false
    //             },
    //             axisLine: {show: false},
    //             axisLabel: {
    //                 interval:0,  
    //                 // rotate:30,
    //                 formatter:function(value) {  
    //                     // return value;
    //                     var ret = "";//拼接加\n返回的类目项  
    //                     var maxLength = 2;//每项显示文字个数  
    //                     if(value.length <= 6) {
    //                         var valLength = value.length;//X轴类目项的文字个数 
    //                     } else {
    //                         var valLength = 6   //X轴类目项的文字个数最多显示六位
    //                     } 
    //                     // var valLength = value.length;//X轴类目项的文字个数  
    //                     var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
    //                     if (rowN > 1)//如果类目项的文字大于3,  
    //                     {  
    //                         for (var i = 0; i < rowN; i++) {  
    //                             var temp = "";//每次截取的字符串  
    //                             var start = i * maxLength;//开始截取的位置  
    //                             var end = start + maxLength;//结束截取的位置  
    //                             //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
    //                             temp = value.substring(start, end) + "\n";  
    //                             ret += temp; //凭借最终的字符串  
    //                         }  
    //                         return ret;  
    //                     }  
    //                     else {  
    //                         return value;  
    //                     }  
    //                 },
    //                 textStyle: {
    //                     color: '#C3D9FF',
    //                     fontSize: 8
    //                 }
    //             }
    //         },
    //         yAxis: [{
    //             splitLine: {show: false},
    //             axisTick: {show: false},
    //             axisLine: {show: false},
    //             axisLabel: {show: false}
    //             }
    //         ],
    //         series: [{
    //             name: 'hill',
    //             type: 'pictorialBar',
    //             barCategoryGap: '0%',
    //             symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
    //             label: {
    //                 show: true,
    //                 position: 'top',
    //                 distance: 15,
    //                 color: '#ffffff',
    //                 fontWeight: 'bolder',
    //                 fontSize: 10,
    //             },
    //             itemStyle: {
    //                 normal: {
    //                     color: {
    //                         type: 'linear',
    //                         x: 0,
    //                         y: 0,
    //                         x2: 0,
    //                         y2: 1,
    //                         colorStops: [{
    //                                 offset: 0,
    //                                 color: '#FFEF34' //  0%  处的颜色
    //                             },
    //                             {
    //                                 offset: 1,
    //                                 color: '#2CFFE7' //  100%  处的颜色
    //                             }
    //                         ],
    //                         global: false //  缺省为  false
    //                     }
    //                 },
    //                 emphasis: {
    //                     opacity: 1
    //                 }
    //             },
    //             data: seriesData,
    //             z: 10
    //         }]
    //     };
    //     if (zoomState) {
    //         fig = crtDataZoom()
    //         $.extend(true, optionA, fig)
    //     }
    //     buildSitChart.setOption(optionA, true);
    //     var length = xAxisData.length - 1
    //     if (length > 19) {
    //         buildSitTime = setInterval(function() {
    //             // 每次向后滚动一个，最后一个从头开始。
    //             if (optionA.dataZoom[0].endValue == length ) {
    //                 optionA.dataZoom[0].endValue = 19; 
    //                 optionA.dataZoom[0].startValue = 0;
    //             }
    //             else {
    //                 optionA.dataZoom[0].endValue = optionA.dataZoom[0].endValue + 1;
    //                 optionA.dataZoom[0].startValue = optionA.dataZoom[0].startValue + 1;
    //             }
    //             buildSitChart.setOption(optionA);
    //         }, 2000)
    //     }
    // }
    var xAxisDataNum = ['徐汇区','长宁区','静安区','普陀区','虹口区','闵行区','浦东新区','奉贤区','崇明区']
    var someNumAll = [10,10,10,10,10,10,0,0,0]
    var nstartedNumAll = someNumAll
    var buildNumAll = someNumAll
    var startedNumAll = someNumAll
    var zoomStateNum = false
    var myImgSrc = 'https://tools-1yd.1yd.me/test/upload/1592549548480_ydBar.png'
    var myImg = new Image();
	myImg.src = myImgSrc;
    // loadBuildSitChart(xAxisDataNum, seriesDataNum, zoomStateNum)

    function loadBuildSitChart(xAxisData,nstartedNumAll,buildNumAll,startedNumAll,zoomState) {
        buildSitChart.clear()
        var fig
        optionA = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function(params,ticket,callback) {
                    var res = "";
                    var paramsAll = params[0].value + params[1].value + params[2].value;
                    res = '<div>'
                         + '<p>'+ params[0].name +'</p>'
                        + '<p style="color:#2FFF1F;">计划数：'+ paramsAll +'</p>'
                        + '<p>已完工：'+ params[0].value +'</p>'
                        + '<p>建设中：'+ params[1].value +'</p>'
                        + '<p>未开工：'+ params[2].value +'</p>'
                    +'</div>'
                    return res;
                }
            },
            legend: {
                // data: ['未开工', '建设中', '已完成'],
                right: 10,
                top: 10,
                textStyle: {
                    color: '#ffffff'
                },
                itemWidth: 20,
                itemHeight: 8,
                data: [
                    {
                        name: '未开工',
                        icon: 'image://https://tools-1yd.1yd.me/test/upload/1592550651859_ydLenN.jpg'
                    },{
                        name: '建设中',
                        icon: 'image://https://tools-1yd.1yd.me/test/upload/1592550631476_ydLenB.png'
                    }, {
                        name: '已完成',
                        icon: 'rect',
                    }
                ]
            },
            grid: {
                top: '30%',
                left: '2%',
                right: '2%',
                bottom: '1%',
                containLabel: true
            },
            yAxis: {
                type: 'value',
                name : '数量(个)',
                nameTextStyle: {
                    color: "#9599A2"
                },
                axisLabel: {
                    interval: 0,
                    color: '#C3D9FF',
                    textStyle: {
                        fontSize: 12,
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: '#676C7B',
                    }
                },
                splitLine: {
                    show: false
                }
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                axisLabel: {
                    interval: 0,
                    formatter:function(value) {  
                        // return value;
                        var ret = "";//拼接加\n返回的类目项  
                        var maxLength = 2;//每项显示文字个数  
                        // var valLength = value.length;//X轴类目项的文字个数
                        if(value.length <= 6) {
                            var valLength = value.length;//X轴类目项的文字个数 
                        } else {
                            var valLength = 6   //X轴类目项的文字个数最多显示六位
                        }    
                        var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
                        if (rowN > 1)//如果类目项的文字大于3,  
                        {  
                            for (var i = 0; i < rowN; i++) {  
                                var temp = "";//每次截取的字符串  
                                var start = i * maxLength;//开始截取的位置  
                                var end = start + maxLength;//结束截取的位置  
                                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                                temp = value.substring(start, end) + "\n";  
                                ret += temp; //凭借最终的字符串  
                            }  
                            return ret;  
                        }  
                        else {  
                            return value;  
                        }  
                    },
                    //坐标轴刻度标签的相关设置
                    textStyle: {
                        color:'#C3D9FF',
                        fontSize: 10,
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: "#676C7B"
                    }
                }
            },
            series: [
                {
                    name: '已完成',
                    type: 'bar',
                    barWidth: 12,
                    stack: '总量',
                    data: startedNumAll.map((value) => {
                        if (value == 0) {
                            var borderW = 0
                        } else {
                            var borderW = 1
                        }
                        return {
                            value,
                            itemStyle: {
                                normal: {
                                   color: '#FFB1EF',
                                   borderColor: "#FFB1EF",
                                   borderWidth: borderW
                               }
                            }
                        }
                    }),
                    itemStyle: {
                        normal: {
                           color: '#FFB1EF',
                       }
                    }
                },
                {
                    name: '建设中',
                    type: 'bar',
                    barWidth: 12,
                    stack: '总量',
                    data: buildNumAll.map((value) => {
                        if (value == 0) {
                            var borderW = 0
                        } else {
                            var borderW = 1
                        }
                        return {
                            value,
                            itemStyle: {
                                normal: {
                                    color: {
                                        image: myImg,
                                        repeat: 'repeat'
                                    },
                                    borderColor: "#FFB1EF",
                                    borderWidth: borderW
                               }
                            }
                        }
                    })
                },
                {
                    name: '未开工',
                    type: 'bar',
                    barWidth: 12,
                    stack: '总量',
                    data: nstartedNumAll.map((value) => {
                        if (value == 0) {
                            var borderW = 0
                        } else {
                            var borderW = 1
                        }
                        return {
                            value,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0,0,0,0)',
                                    borderColor: "#FFB1EF",
                                    borderWidth: borderW,
                                }
                            }
                        }
                    })
                }
            ]
        };
        if (zoomState) {
            fig = crtDataZoom()
            $.extend(true, optionA, fig)
        }
        buildSitChart.setOption(optionA, true);
        var length = xAxisData.length - 1
        if (length > 19) {
            clearInterval(buildSitTime);
            buildSitTime = setInterval(function() {
                // 每次向后滚动一个，最后一个从头开始。
                if (optionA.dataZoom[0].endValue == length ) {
                    optionA.dataZoom[0].endValue = 19; 
                    optionA.dataZoom[0].startValue = 0;
                }
                else {
                    optionA.dataZoom[0].endValue = optionA.dataZoom[0].endValue + 1;
                    optionA.dataZoom[0].startValue = optionA.dataZoom[0].startValue + 1;
                }
                buildSitChart.setOption(optionA);
            }, 2000)
        }
    }
    loadBuildSitChart(xAxisDataNum,nstartedNumAll,buildNumAll,startedNumAll,zoomStateNum)



    // 巡维动态
    var listData = {
        pageNo: 1,
        pageSize: 20,
    }
    var int = null
    function getStatusData(params) {
        params.pageNo = listData.pageNo
        params.pageSize = listData.pageSize
        params.buttonType = 1
        $.ajax({
            type: "get",
            url: urlHomeDev + "/repair/sign/list",
            dataType: "json",
            data:  params,
            success: function(res) {
                $('.repairCount').text(res.data.repairCount)
                $('.passRepairCount').text(res.data.passRepairCount)
                $('.overdueRepairCount').text(res.data.overdueRepairCount)
                $('.stopRepairCount').text(res.data.stopRepairCount)
                $('.sportsAppraiseCount').text(res.data.sportsAppraiseCount)
                if (listData.pageNo >= res.data.dataList.pageCount) {
                    listData.pageNo = 0;
                }
                var datalist = res.data.dataList.dataList
                var list = ""
                for (var i = 0; i < datalist.length; i++) {
                    list+= '<li><span>'+datalist[i].code+'</span><span>'+datalist[i].districtName+'</span><span>'+datalist[i].streetName+'</span><span>'+datalist[i].placeName+'</span><span>'+datalist[i].meterialName+'</span><span>'+datalist[i].repairRecordTime+'</span><span>'+datalist[i].reporterType+'</span><span>'+formatName(datalist[i].reporterName)+'</span><span>'+formatPhone(datalist[i].reporterMobile)+'</span><span class="state '+datalist[i].repairStatus+'">'+datalist[i].repairStatus+'</span></li>'  
                }
                $("#quPoint").html(list)
                if (datalist.length>8) {
                    $('#quPoint').addClass('animationTop')
                } else {
                    $('#quPoint').removeClass('animationTop')
                }
                clearInterval(int);
                if (res.data.dataList.pageCount > 1) {
                    int=setInterval(function(){
                        listData.pageNo ++;
                        getStatusData(getParams())
                    }, 20000);
                }
                if (params.district) {
                    $(".trendsTitle span:nth-child(2)").addClass('districtHide')
                    $("#quPoint li span:nth-child(2)").addClass('districtHide')
                } else {
                    $(".trendsTitle span:nth-child(2)").removeClass('districtHide')
                    $("#quPoint li span:nth-child(2)").removeClass('districtHide')
                }
            },
            error: function(res) {
                console.log(res);
            }
        })
    }
    getStatusData(getParams())

});