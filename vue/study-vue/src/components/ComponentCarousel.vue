<template>
  <div class="progress">
      <div class="progress-bar">
          <div class="progress-bar__outer" :style="{height: strokeWidth + 'px'}">
              <div class="progress-bar__inner" :style="barStyle"></div>
          </div>
      </div>
      <div class="progress-text" :style="{fontSize: progressTextSize + 'px'}">
          <template v-if="!status">{{ percentage }}%</template>
          <span v-else class="icon" :class="progressTextStyle"></span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentCarousel',
  data() {
      return {

      }
  },
  props: {
    // 进度条高度
    strokeWidth: {
        type: Number,
        default: 10
    },
    // 百分比数字
    percentage: {
        type: Number,
        default: 0,
        required: true,
        validator(value) {
            return value >= 0 && value <= 100;
        }
    },
    // 进度条状态
    status: {
        type: String
    },
    // 进度条类型（类型只能是 circle 或 line）
    type: {
        type: String,
        default: 'line',
        validator: val => ['circle', 'line'].includes(val)
    }
  },
  computed: {
      // 进度百分比字体大小【字体大小根据进度条的宽度而变化】  
      progressTextSize () {
          return 12 + this.strokeWidth * 0.4;
      },
      // 进度条颜色【颜色根据状态改变】   
      stroke() {
          let color;
          switch (this.status) {
              case 'success':
                  color = '#13ce66'
                  break;
          case 'exeption':
              color = '#ff4949'
              break;
              default:
                  color = '#20a0ff'
          }
          return color;
      },
      // 进度条样式【宽度（进度）和背景色】   
      barStyle() {
          return {
              width: this.percentage + '%', 
              backgroundColor: this.stroke
          }
      },
      // 进度百分比字体样式
      progressTextStyle() {
          if (this.type == 'line') {
              return this.status == 'success'
                ? 'icon-circle-check'
                : 'icon-circle-close'
          } else {
              return this.status == 'success'
                ? 'icon-check'
                : 'icon-close'
          }
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    .progress {
        padding: 5px 0;
    }
    .progress-bar {
        box-sizing: border-box;
        display: inline-block;
        width: 100%;
        padding-right: 50px;
        margin-right: -50px;
    }
    .progress-bar__outer {
        border-radius: 100px;
        background-color: #ebeef5
    }
    .progress-bar__inner {
        height: 100%;
        border-radius: 100px;
        background-color: #ff4757;
        transition: width .6s ease;
    }
    .progress-text {
        display: inline-block;
        margin-left: 10px;
        color: #606266;
    }
    .icon {
        font-size: 18px;
        vertical-align: middle;
    }
    .icon-circle-check::after {
        content: "☑"
    }
    .icon-circle-close::after {
        content: "☒"
    }
    .icon-check::after {
        content: "✔"
    }
    .icon-close::after {
        content: "✘"
    }
</style>
