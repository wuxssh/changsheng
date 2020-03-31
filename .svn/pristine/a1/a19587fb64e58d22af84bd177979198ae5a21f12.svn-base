<template>
  <div>
    <div>
      <Charts :option="chartOption" />
    </div>
  </div>
</template>

<script>
// import request from "../../utils/request";
import Charts from "./Charts";
import mapData from "../../utils/mapcharts";
export default {
  data() {
    return {
      chartOption: {}
    };
  },
  mounted() {
    this.getChartData();
  },
  methods: {
    getChartData() {
    //   request({
    //     url: "/goods/list",
    //     method: "get",
    //     params: {}
    //   }).then(response => {
        this.chartOption = {
          title: {
            text: "全国分布图",
            sublink: "http://www.pm25.in",
            left: "center"
          },
          tooltip: {
            trigger: "item"
          },
          bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,
            roam: true,
            mapStyle: {
              styleJson: [
                {
                  featureType: "water",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1"
                  }
                },
                {
                  featureType: "land",
                  elementType: "all",
                  stylers: {
                    color: "#f3f3f3"
                  }
                },
                {
                  featureType: "railway",
                  elementType: "all",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "highway",
                  elementType: "all",
                  stylers: {
                    color: "#fdfdfd"
                  }
                },
                {
                  featureType: "highway",
                  elementType: "labels",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "arterial",
                  elementType: "geometry",
                  stylers: {
                    color: "#fefefe"
                  }
                },
                {
                  featureType: "arterial",
                  elementType: "geometry.fill",
                  stylers: {
                    color: "#fefefe"
                  }
                },
                {
                  featureType: "poi",
                  elementType: "all",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "green",
                  elementType: "all",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "subway",
                  elementType: "all",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "manmade",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1"
                  }
                },
                {
                  featureType: "local",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1"
                  }
                },
                {
                  featureType: "arterial",
                  elementType: "labels",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "boundary",
                  elementType: "all",
                  stylers: {
                    color: "#fefefe"
                  }
                },
                {
                  featureType: "building",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1"
                  }
                },
                {
                  featureType: "label",
                  elementType: "labels.text.fill",
                  stylers: {
                    color: "#999999"
                  }
                }
              ]
            }
          },
          series: [
            {
              name: "",
              type: "scatter",
              coordinateSystem: "bmap",
              data: mapData.convertData(),
              symbolSize: function(val) {
                return val[2] / 10;
              },
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: " #17257D"
                }
              }
            },
            {
              name: "",
              type: "effectScatter",
              coordinateSystem: "bmap",
              data: mapData.convertData(
                mapData.data
                  .sort(function(a, b) {
                    return b.value - a.value;
                  })
                  .slice(0, 6)
              ),
              symbolSize: function(val) {
                return val[2] / 10;
              },
              showEffectOn: "render",
              rippleEffect: {
                brushType: "stroke"
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: " #17257D",
                  shadowBlur: 10,
                  shadowColor: "#333"
                }
              },
              zlevel: 1
            }
          ]
        };
    //   });
    }
  },
  components: {
    Charts
  }
};
</script>