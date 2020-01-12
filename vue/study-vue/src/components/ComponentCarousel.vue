<template>
  <div class="progress">
      <div class="progress-bar">
          <div class="progress-bar__outer" :style="{height: strokeWidth + 'px'}">
              <div class="progress-bar__inner" :style="{width: percentage + '%', backgroundColor: stroke}"></div>
          </div>
      </div>
      <div class="progress-text" :style="{fontSize: progressTextSize + 'px'}">
          90%
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
    strokeWidth: {
        type: Number,
        default: 6
    },
    percentage: {
        type: Number,
        default: 0,
        required: true,
        validator(value) {
            return value >= 0 && value <= 100;
        }
    },
    status: {
        type: String
    }
  },
  computed: {
      progressTextSize () {
          return 12 + this.strokeWidth * 0.4;
      },
      stroke() {
          let color;
          switch (this.status) {
              case 'scuess':
                  color = '#13ce66'
                  break;
          case 'exeption':
              color = '#ff4949'
              break;
              default:
                  color = '#20a0ff'
          }
          return color;
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
        color: #606266
    }
</style>
