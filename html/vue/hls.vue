<template>
    <div class="ep-main">
      <!-- search -->
      <div class="ep-top">
        <div class="ep-top-cond">
          <div class="ep-label" style="padding-left: 0 !important;">设备名称</div>
          <div class="ep-select">
            <el-autocomplete class="inline-input" v-model="cableName" :fetch-suggestions="querySearchCable" placeholder="请输入设备名称" size="mini" style="width: 200rem;"
            @select="handleSelectCable" @blur="handleBlurCable" @change="handleChangeCable" @clear="handleClearCable" value-key="text" :clearable="true" ref="elautocompleteCable"></el-autocomplete>
          </div>
          <div class="ep-label">所属隧道</div>
          <div class="ep-select">
            <el-select v-model="tunnel" placeholder="请选择隧道" size="mini" @change="tunnelChange" style="width: 200rem;">
              <el-option v-for="(item, index) in tunnelList" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="ep-top-btn">
          <!-- <el-button size="mini" @click="stop()">停止</el-button> -->
          <el-button size="mini" @click="reset()">重置</el-button>
          <el-button size="mini" type="primary" @click="search()">查询</el-button>
        </div>
      </div>
      <!-- video -->
      <div class="videoList">
        <el-row :gutter="20" v-if="hlsVideoUrl.length > 0">
          <el-col :span="12" v-for="(item, index) in hlsVideoUrl" :key="index">
            <el-card class="box-card">
              <!-- <video class="videoCon" ref="hlsVideo" controls :poster="videoImg"></video> -->
              <video class="videoCon" ref="hlsVideo" controls autoplay muted preload="true" :poster="videoImg"></video>
              <div class="tool">
                <div class="tool-item history" @click="videoRecording(item)">
                  <i class="el-icon-time"></i>视频记录
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div class="no-data" v-if="hlsVideoUrl.length === 0">
          <p class="center">暂无数据</p>
        </div>
      </div>
      <!-- page -->
      <div class="ep-page">
        <div class="ep-page-total">
          共
          <span style="color: green;">{{ total }}</span> 条数据
          <!-- ，每页展示 -->
          <!-- <el-select v-model="pageSize" size="mini" @change="currentType" style="width: 80rem;">
            <el-option v-for="(item, index) in pageList" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>条数据 -->
        </div>
        <div class="ep-page-current">
          <el-pagination background layout="prev, pager, next" :page-size="pageSize" :current-page="current"
            :total="total" @current-change="currentChange"></el-pagination>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
    import Hls from "hls.js";
    import videoImg from '@/assets/videoError.png'
    export default {
      // inject: ['reload'],
      data() {
        return {
          // 设备
          cableList: [],
          cableName: '',
          cableVal: '',
          tunnel: "",
          tunnelList: [],
          current: 1,
          total: 1000,
          pageSize: 4,
          hls: "",
          hlsVideoUrl: [], // 视频流地址
          videoUrl: [],
          videoImg: videoImg,
          refresh: 0
        };
      },
      methods: {
        // 选择所属隧道
        tunnelChange(val) {
          // console.log(val);
        },
        // 分页改变
        currentChange(val) {
          // console.log(val);
          this.stop();
          this.current = val;
          this.getHlsSrc();
        },
        // 每页多少条
        currentType(val) {
          this.pageSize = val;
          // this.getHlsSrc();
        },
        // 获取设备名称列表
        getEquipmentList() {
          this.$http
            .get("/otd-video/api/video/queryCameraByName", {
              deviceName: this.cableVal
            })
            .then(res => {
              if (res.status) {
                let arr = [];
                let data = res.data;
                data.forEach((item, index) => {
                  arr.push({
                    text: item.deviceName,
                    value: item.deviceName
                  });
                });
                arr.unshift({
                  text: '全部',
                  value: ''
                })
                this.cableList = arr;
              }
            })
            .catch(err => { });
        },
        // 获取隧道名称列表
        getTunnelList() {
          this.$http
            .get("/otd-video/api/video/queryTunnelName", {})
            .then(res => {
              // console.log(res.data);
  
              if (res.status) {
                let arr = [];
                let data = res.data;
                data.forEach((item, index) => {
                  arr.push({
                    label: item.tunnelName,
                    value: item.regionIndexCode
                  });
                });
                arr.unshift({
                  label: '全部',
                  value: ''
                })
                this.tunnelList = arr;
                // console.log(arr);
              }
            })
            .catch(err => {
              console.log(err);
            });
        },
        // ----------------------------------------- 设备名称搜索
        querySearchCable(queryString, cb) {
          let cableList = this.cableList;
          let results = queryString ? cableList.filter(this.createFilterCable(queryString)) : cableList;
          cb(results);
          this.$refs.elautocompleteCable.focus();
        },
        createFilterCable(queryString) {
          return (restaurant) => {
            return (restaurant.text.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
          };
        },
        handleSelectCable(item) {
          this.cableVal = item.value;
        },
        handleChangeCable(val) {
          let obj = {}
          obj = this.cableList.find(item => {
            return item.text === val
          });
          if (obj) {
            this.cableVal = obj.value;
          } else {
            this.handleBlurCable();
          }
        },
        handleBlurCable() {
          this.cableName = '';
          this.cableVal = '';
        },
        handleClearCable() {
          this.activated = false;
          this.$emit('clearCable');
        },
        // 搜索
        search() {
          this.current = 1;
          this.getHlsSrc();
        },
        // 重置
        reset() {
          this.cableName = '';
          this.cableVal = '';
          this.tunnel = "";
          this.current = 1;
          this.getHlsSrc();
        },
        // 视频流销毁
        destroyHls: function () {
          // console.log(this.videoUrl.length);
          for (let i = 0; i <= this.videoUrl.length; i++) {
            if (this.hls) {
              this.$refs.hlsVideo[i].pause();
              this.hls.destroy();
              this.hls = null;
            }
          }
        },
        // 加载视频流
        loadVideoFn: function (hlsSrc) {
          // console.log(hlsSrc);
          for (let i = 0; i < hlsSrc.length; i++) {
            if (Hls.isSupported()) {
              this.hls = new Hls();
              this.hls.loadSource(hlsSrc[i].value);
              this.hls.attachMedia(this.$refs.hlsVideo[i]);
              this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                // console.log("加载成功");
                this.$refs.hlsVideo[i].play();
                // this.$refs.hlsVideo[i].pause();
              });
              this.hls.on(Hls.Events.ERROR, (event, data) => {
                // console.log(event, data);
                // console.log(this.$refs.hlsVideo[i]);
                // 监听出错事件
                // console.log("加载失败");
                this.$refs.hlsVideo[i].pause();
                // if (this.hls) {
                //   this.$refs.hlsVideo[i].pause();
                //   this.hls.destroy();
                //   this.hls = null;
                // }
              });
            } else {
            }
          }
        },
        // 页面初始化获取视频流地址
        getHlsSrc() {
          this.$http
            .get("/otd-video/api/video/queryCameraPreviewVideoURLHls", {
              cameraName: this.cableVal,
              regionIndexCode: this.tunnel,
              current: this.current,
              size: this.pageSize
            })
            .then(result => {
              this.total = result.data.total;
              this.hlsVideoUrl = result.data.records;
  
              if (result.status) {
                let arr = [];
                let data = result.data.records;
                // console.log(data);
                data.forEach((item, index) => {
                  arr.push({
                    label: item.cameraName,
                    value: item.url
                  });
                });
                this.videoUrl = arr;
                // console.log(arr);
              }
            })
            .catch(err => {
              console.log(err);
            });
        },
        // 销毁
        stop() {
          // console.log(this.videoUrl.length);
          // console.log(this.$refs.hlsVideo[0]);
          for (let i = 0; i <= this.videoUrl.length; i++) {
            if (this.hls) {
              this.$refs.hlsVideo[i].pause();
              this.hls.destroy();
              this.hls = null;
            }
          }
        },
        // 视频记录
        videoRecording(item) {
          // let row = this.cableVal;
          // console.log(item);
          this.refresh = 1;
          this.$router.push({
            name: "VideoHistory",
            params: item
          });
        },
      },
      created() {
        this.getEquipmentList();
        this.getTunnelList();
  
        this.getHlsSrc();
        let _this = this;
        _this.$once("hook:beforeDestroy", () => {
          _this.destroyHls();
        });
      },
      mounted() {
      },
      watch: {
        videoUrl: function () {
          this.$nextTick(() => {
            let _this = this;
            _this.loadVideoFn(this.videoUrl);
          });
        }
      },
      destroyed() {
        this.stop();
        if (this.refresh === 0) {
          location.reload();
        }
        // this.reload();
      },
    };
  </script>
  
  <style scoped>
    .ep-main {
      width: 100%;
    }
  
    .ep-top {
      width: calc(100% - 40rem);
      height: 50rem;
      padding: 10rem 20rem;
      border-radius: 4rem;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .ep-top-cond {
      width: 80%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  
    .ep-label {
      padding: 0 10rem 0 30rem;
      font-size: 16rem;
      color: #333333;
    }
  
    .ep-top-btn {
      width: 20%;
      text-align: right;
    }
  
    .ep-cont {
      margin-top: 10rem;
      width: 100%;
      height: calc(100vh - 220rem);
      border-radius: 4rem;
      background-color: #ffffff;
    }
  
    .ep-cont-btn {
      width: calc(100% - 40rem);
      padding: 0 20rem;
      line-height: 50rem;
      display: flex;
      justify-content: space-between;
      align-content: center;
      font-size: 16rem;
      color: #302c58;
    }
  
    .ep-cont /deep/ .el-divider--horizontal {
      margin: 0 !important;
    }
  
    .ep-page {
      width: 100%;
      padding: 10rem 0;
      display: flex;
      justify-content: space-between;
    }
  
    .box-card {
      position: relative;
      height: calc(100vh / 2 - 150rem);
      margin-top: 20rem;
    }
  
    video {
      width: 100%;
      height: 90%;
      object-fit: fill;
    }
  
    .center {
      text-align: center;
      line-height: 100rem;
      font-size: 15rem;
    }
    .tool {
    position: absolute;
    bottom: 5rem;
    width: 100%;
    height: 35rem;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .videoList .tool .tool-item {
    color: #ffffff;
    line-height: 38rem;
    cursor: pointer;
  }
  .videoList .tool .tool-item i {
    padding-right: 5rem;
  }
  .videoList .tool .history {
    position: absolute;
    right: 20%;
    color: #ffffff;
    font-size: 21rem;
  }
  </style>
  
  <style>
    .el-card__body {
      height: 100%;
      padding: 0;
    }
  </style>