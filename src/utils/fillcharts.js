// import {stringTonum,maxNum} from './service'
export function drawCharts(obj, key, typelist) {
    console.log(obj)
    console.log(key)
    let text
    let maxprecent = 0.8
    if (key === 'medical') {
        text = '医疗险各分公司渠道赔付件数及占比'
    } else if (key === 'life') {
        text = '寿险各分公司渠道赔付件数及占比'
    } else if (key === 'illness') {
        text = '重疾险各分公司渠道赔付件数及占比'
    } else if (key === 'accident') {
        text = '意外险各分公司渠道赔付件数及占比'
    } else if (key === 'all') {
        text = '各分公司渠道赔付件数及占比'
    } else if (key === 'medical1') {
        text = '医疗险各分公司渠道赔付金额及占比'
    } else if (key === 'life1') {
        text = '寿险各分公司渠道赔付金额及占比'
    } else if (key === 'illness1') {
        text = '重疾险各分公司渠道赔付金额及占比'
    } else if (key === 'accident1') {
        text = '意外险各分公司渠道赔付金额及占比'
    } else if (key === 'all1') {
        text = '各分公司渠道赔付金额及占比'
    }
    // if(key === 'Approved') {
    //     console.log(stringTonum(obj.Approved1))
    //     console.log(stringTonum(obj.Approved2))
    //     console.log(maxNum(stringTonum(obj.Approved2)))
    //     console.log(maxNum(stringTonum(obj.Approved1)))
    //     // console.log(obj.Approved2.map(Number))
    //     // console.log(Math.max.apply(null, obj.Approved1.map(Number)))
    //     var maxint1 = Math.ceil(maxNum(stringTonum(obj.Approved1)) / 10); // 向上取整
    //     var maxappreg = maxint1 * 10; // 最终设置的最大值
    //     var maxint2 = Math.ceil(maxNum(stringTonum(obj.Approved2)) / 10); // 向上取整
    //     var maxactive = maxint2 * 20; // 最终设置的最大值

    //     // var maxappreg = maxNum(stringTonum(obj.Approved1)); //注册Y轴值
    //     // var maxactive = maxNum(stringTonum(obj.Approved2)) //活跃Y轴值
    // } else if(key === 'Approvedshuttle') {
    //     // var maxappreg = stringTonum(obj.Approvedshuttle1).Math(...stringTonum(obj.Approvedshuttle1)); //注册Y轴值
    //     // var maxactive = stringTonum(obj.Approvedshuttle2).Math(...stringTonum(obj.Approvedshuttle2)); //活跃Y轴值
    //     // var maxappreg = maxNum(stringTonum(obj.Approvedshuttle1)); //注册Y轴值
    //     // var maxactive = maxNum(stringTonum(obj.Approvedshuttle2)) //活跃Y轴值
    //     // var maxint1 = Math.ceil(maxNum(stringTonum(obj.Approvedshuttle1)) / 10); // 向上取整
    //     // var maxappreg = maxint1 * 10; // 最终设置的最大值
    //     // var maxint2 = Math.ceil(maxNum(stringTonum(obj.Approvedshuttle2)) / 10); // 向上取整
    //     // var maxactive = maxint2 * 10; // 最终设置的最大值

    //     var maxint1 = Math.ceil(maxNum(stringTonum(obj.Approvedshuttle1)) / 10); // 向上取整
    //     var maxappreg = maxint1 * 10; // 最终设置的最大值
    //     var maxint2 = Math.ceil(maxNum(stringTonum(obj.Approvedshuttle2)) / 10); // 向上取整
    //     var maxactive = maxint2 * 20; // 最终设置的最大值
    // }

    // console.log(maxappreg)
    // console.log(maxactive)

    // var interval_left = maxappreg / 5; //左轴间隔
    // var interval_right = maxactive / 5; //右轴间隔

    var option = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        title: {
            text: text,
            textStyle: {
                fontWeight: "normal",
                color: "#000",
                fontSize: 16
            }
        },
        xAxis: [        //x轴属性设置
            {
                type: "category",
                data: [],
                axisTick: {
                    alignWithLabel: true
                },
                // min : 0,
                // max: 1000,
                // splitNumber: 5,
                // interval: 200,
            }
        ],
        yAxis: [                            //（可以有多个坐标轴），数组中的对象位置决定了yAxisIndex的值（yAxisIndex会在series中用到）
            {
                name: "数量",
                type: "value",
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false //y轴线消失
                },
                min: 0,
                // max: 1000,
                splitNumber: 5,
                // interval: 200,
                axisLabel: {	//x轴字体
                    formatter: function (value, index) {
                        return value;
                    }
                },
            },
            {
                name: "百分比",
                type: "value",
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false //y轴线消失
                },
                min: 0,
                max: 1,
                splitNumber: 5,
                // interval: 0.2,
                splitLine: {
                    show: false
                },
                axisLabel: {	//x轴字体
                    formatter: function (value, index) {
                        return value * 100 + '%';
                        // return value;
                    }
                },



            }
        ],
        series: [
            // '#005BED', '#1D046F', '#63E0FF', '#02A9FF', '#0D6DB2',
            // #7fae90', '#02A9FF', '#d7b961', '#797b7f', '#0D6DB2',
            //  坐标轴实际数据内容
            {
                name: typelist ? typelist[0] : '',//数据名称
                type: 'bar',
                yAxisIndex: 0,                //数据表现形式（bar为柱形图，line为折线图）
                barGap: '0',/*多个并排柱子设置柱子之间的间距*/
                // barCategoryGap:'50%',/*多个并排柱子设置柱子之间的间距*/
                // barWidth: '25%',            //柱形图宽度
                itemStyle: {                 //柱子的属性设置
                    normal: {
                        color: '#7fae90',   //柱子的颜色设置
                        // barBorderRadius: key==="Approved" ? [3,3,3,3]:[9,9,9,9], //设置柱形图的边框弧度
                        // label: {
                        //     show: true,		//开启显示
                        //     position: 'top',	//在上方显示
                        //     textStyle: {	    //数值样式
                        //         color: '#313131',
                        //         fontSize: 8
                        //     }
                        // }
                    },

                },


                data: obj.Approved1   //该条数据对应一条记录
            },
            {
                name: typelist ? typelist[1] : '',
                type: 'bar',
                // barGap:'100%',/*多个并排柱子设置柱子之间的间距*/
                // barCategoryGap:'70%',/*多个并排柱子设置柱子之间的间距*/
                yAxisIndex: 0,
                // barWidth:'25%',
                itemStyle: {
                    normal: {
                        color: "#005BED",
                        // barBorderRadius: key==="Approved" ? [3,3,3,3]:[9,9,9,9], //设置柱形图的边框弧度
                        label: {
                            // show: true,		//开启显示
                            // position: 'top',	//在上方显示
                            // textStyle: {	    //数值样式
                            //     color: '#313131',
                            //     fontSize: 8
                            // }
                        }
                    }
                },
                data: obj.Approved2
                // data: [obj. Approved2,obj.Approved2]

            },
            {
                name: typelist ? typelist[2] : '',
                type: 'bar',
                // barGap:'100%',/*多个并排柱子设置柱子之间的间距*/
                // barCategoryGap:'70%',/*多个并排柱子设置柱子之间的间距*/
                yAxisIndex: 0,
                // barWidth:'25%',
                itemStyle: {
                    normal: {
                        color: "#d7b961",
                        // barBorderRadius: key==="Approved" ? [3,3,3,3]:[9,9,9,9], //设置柱形图的边框弧度
                        label: {
                            // show: true,		//开启显示
                            // position: 'top',	//在上方显示
                            // textStyle: {	    //数值样式
                            //     color: '#313131',
                            //     fontSize: 8
                            // }
                        }
                    }
                },
                data: obj.Approved3
            },
            {
                name: typelist ? typelist[3] : '',
                type: 'bar',
                // barGap:'100%',/*多个并排柱子设置柱子之间的间距*/
                // barCategoryGap:'70%',/*多个并排柱子设置柱子之间的间距*/
                yAxisIndex: 0,
                // barWidth:'25%',
                itemStyle: {
                    normal: {
                        color: "#f64e6f",
                        // barBorderRadius: key==="Approved" ? [3,3,3,3]:[9,9,9,9], //设置柱形图的边框弧度
                        label: {
                            // show: true,		//开启显示
                            // position: 'top',	//在上方显示
                            // textStyle: {	    //数值样式
                            //     color: '#313131',
                            //     fontSize: 8
                            // }
                        }
                    }
                },
                data: obj.Approved4
            },
            {
                name: typelist ? typelist[4] : '',
                type: 'bar',
                // barGap:'',/*多个并排柱子设置柱子之间的间距*/
                // barCategoryGap:'70%',/*多个并排柱子设置柱子之间的间距*/
                yAxisIndex: 0,
                // barWidth:'25%',
                itemStyle: {
                    normal: {
                        color: "#63E0FF",
                        // barBorderRadius: key==="Approved" ? [3,3,3,3]:[9,9,9,9], //设置柱形图的边框弧度
                        label: {
                            // show: true,		//开启显示
                            // position: 'top',	//在上方显示
                            // textStyle: {	    //数值样式
                            //     color: '#313131',
                            //     fontSize: 8
                            // }
                        }
                    }
                },
                data: obj.Approved5
            },
        ],
        grid: {             //设置网格属性
            // left:'10%',     //网格距离容器左侧的距离
            // right:'10%',       //网格距离容器右侧的距离
            // borderWidth:1
        }
    }
    if (obj.hasOwnProperty('xAxis')) { // x轴的数据

        // option.xAxis[0].data = obj.ApprovedxAxis
        option.xAxis[0].data = obj.xAxis.map(e => {
            return e
        })
    }
    if (obj.hasOwnProperty('ApprovedshuttlexAxis')) { // x轴的数据

        option.xAxis[0].data = obj.ApprovedshuttlexAxis
    }



    // if(obj.hasOwnProperty('Approved1')){ // 获取的数据的值
    //     // 判断是
    // 	option.series[0].data = obj.Approved1.map(e => {
    // 		// if(parseFloat(e) >=0) {
    // 		// 	option.series[0].itemStyle.normal.label.textStyle.color = 'red';
    // 		// } else {
    // 		// 	option.series[0].itemStyle.normal.label.textStyle.color = 'green';
    // 		// }
    // 		if(e.indexOf(',')!==-1) {
    //              return parseFloat(e.replace(/,/g, ""))
    // 		} else {
    // 			 return e
    // 		}

    // 	});
    // }
    // if(obj.hasOwnProperty('Approved2')){ // 获取的数据的值
    //     // 判断是
    // 	option.series[1].data = obj.Approved2.map(e => {
    // 		// if(parseFloat(e) >=0) {
    // 		// 	option.series[0].itemStyle.normal.label.textStyle.color = 'red';
    // 		// } else {
    // 		// 	option.series[0].itemStyle.normal.label.textStyle.color = 'green';
    // 		// }
    // 		if(e.indexOf(',')!==-1) {
    //              return parseFloat(e.replace(/,/g, ""))
    // 		} else {
    // 			 return e
    // 		}

    // 	});
    // }
    // if(obj.hasOwnProperty('Approvedshuttle1')){ // 获取的数据的值
    //     // 判断是
    // 	option.series[0].data = obj.Approvedshuttle1.map(e => {
    // 		// if(parseFloat(e) >=0) {
    // 		// 	option.series[0].itemStyle.normal.label.textStyle.color = 'red';
    // 		// } else {
    // 		// 	option.series[0].itemStyle.normal.label.textStyle.color = 'green';
    // 		// }
    // 		if(e.indexOf(',')!==-1) {
    //              return parseFloat(e.replace(/,/g, ""))
    // 		} else {
    // 			 return e
    // 		}

    // 	});
    // }
    // if(obj.hasOwnProperty('Approvedshuttle2')){ // 获取的数据的值
    //     // 判断是
    // 	option.series[1].data = obj.Approvedshuttle2.map(e => {
    // 		// if(parseFloat(e) >=0) {
    // 		// 	option.series[0].itemStyle.normal.label.textStyle.color = 'red';
    // 		// } else {
    // 		// 	option.series[0].itemStyle.normal.label.textStyle.color = 'green';
    // 		// }
    // 		if(e.indexOf(',')!==-1) {
    //              return parseFloat(e.replace(/,/g, ""))
    // 		} else {
    // 			 return e
    // 		}

    // 	});
    // }


    return option;


}