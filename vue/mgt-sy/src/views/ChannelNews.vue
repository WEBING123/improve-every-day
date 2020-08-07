<template>
  <div>
      <div class="type-title">
          {{ channelName }}
      </div>
      <Loading v-if="isLoading"></Loading>
      <NewsList v-else :news="news"></NewsList>
      <Pager :page="page" :limit="limit" :total="total" :panelNumber="panelNumber"
        @pageChange="handleChange">
      </Pager>
  </div>
</template>

<script>
import NewsList from '../components/news/NewsList'
import Pager from '../components/Pager'
import Loading from '../components/Loading'
import * as newsServ from '../services/newsServices'
export default {
    components: {
        Loading,
        NewsList,
        Pager
    },
    data() {
        return {
            isLoading: true,
            channelName: "",
            news: [],
            page: 1,
            limit: 15,
            total: 0,
            panelNumber: 10,
        }
    },
    created() {
        // 即使切换不同的频道，但也还是在同一组件中，所以 created 不会再次执行
        // this.setChannelName();
        // this.setDatas();
    },
    methods: {
        // 设置频道名称
        async setChannelName() {
            var channels = await newsServ.getNewsChannels();
            var channel = channels.find((item) => {
                return item.channelId === this.$route.params.id;
            });
            console.log(channel);
            this.channelName = channel.name;
        },
        // 设置所有新闻相关数据
        async setDatas() {
            this.isLoading = true;
            var resp = await newsServ.getNews(this.$route.params.id, this.page, this.limit);
            this.total = resp.allNum;
            this.news = resp.contentlist;
            this.isLoading = false;
            console.log(resp);
        },
        handleChange(newPage) {
            this.page = newPage;
            this.setDatas();
        }
    },
    watch: {
        "$route.params.id": {
            immediate: true, // 一开始的数据也要当做是一种变化
            handler() {
                this.page = 1;
                this.setChannelName();
                this.setDatas();
            }
        }
    },
}
</script>

<style scoped>
.type-title {
  font-size: 2em;
  color: #888;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
</style>