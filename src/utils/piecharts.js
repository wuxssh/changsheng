export function drawpieCharts(obj, key) {
    let data1 = []
    let data2 = []
    if (key == "channel1") {
        if (obj) {
            obj.numlist.map((item, index) => {
                data1.push({ value: item, name: obj.channellist[index] })
                data2.push({ value: item, name: obj.channellist[index] })
            })
        }
    }
    console.log('饼状图数据-----', data1, data2)
    var option = {
        tooltip: {
            trigger: 'item',
            // formatter: "{a} <br/>{b}: {c} ({d}%)"
            formatter: "{b} <br/>{c} ({d}%)"

        },
        title: {
            text: '2020年度按渠道赔付件数及占比',
            textStyle: {
                fontWeight: "normal",
                color: "#000",
                fontSize: 16
            }
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            x: 'left',
            data: []
        },
        series: [
            {
                type: 'pie',
                selectedMode: 'single',
                radius: ['0%', '30%'],
                center: ['50%', '55%'],// 设置内部饼状图的位置
                label: {
                    normal: {                      
                        position: 'inner',
                        // formatter: '{b|{b}：}{c}',
                        // formatter: '{b|{b}：}{c}',
                    }
                },
                labelLine: {
                    normal: {
                        // show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 8,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal: {
                        color: function (params) {
                            //自定义颜色
                            var colorList = [
                                '#005BED', '#1D046F', '#63E0FF', '#02A9FF', '#0D6DB2',
                            ];
                            // 30%  10% 10% 
                            return colorList[params.dataIndex]
                        }
                    }
                },
                data: data1,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: '{d}%',
                            fontSize: 10
                        },
                        labelLine: { show: true }
                    }
                }
            },
            {
                // name:'访问来源',
                type: 'pie',
                radius: ['40%', '55%'],
                center: ['50%', '55%'],// 设置外部圆环图的位置
                label: {
                    normal: {
                        formatter: '{b|{b}：}{c}',
                        // formatter: '{b|{b}：}{c}  {per|{d}%}  ',
                        fontSize: 8,
                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 22,
                                align: 'center'
                            },
                            c: {
                                fontSize: 12,
                            },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                // borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 12,
                                lineHeight: 33
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal: {
                        color: function (params) {
                            //自定义颜色
                            var colorList = [
                                '#7fae90', '#02A9FF', '#d7b961', '#797b7f', '#0D6DB2',
                            ];
                            // 30%  10% 10% 
                            return colorList[params.dataIndex]
                        }
                    }
                },
                data: data2
            }
        ]
    }
    return option

}