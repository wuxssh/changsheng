<template>
  <div ref="chartDom" style="height: 510px"></div>
</template>
<script>
import echarts from "echarts/lib/echarts";
import "echarts/extension/bmap/bmap";
import mapData from "../../utils/mapcharts";
import { MP } from "../../map";
// import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
export default {
  props: {},
  data() {
    return {
      chart: null
    };
  },

  created() {},
  mounted() {
    this.$nextTick(function() {
      var _this = this;
      MP(_this.ak).then(BMap => {
        console.log(_this.ak);

        this.renderChart();
      });
    });
    this.renderChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    renderChart() {
      this.chart = echarts.init(this.$refs.chartDom);
      console.log(this.chart);

      this.chart.setOption({
        title: {
          text: "",
          sublink: "",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          // formatter:function(b,c){
          //   console.log(b,c)
          //   return b
          // }
          formatter: function(params) {
            return params.name + ":" + params.value[2];
          }
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
            data: mapData.convertData(mapData.data),
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
      });
    }
  }
};
</script>