// 远程获取新闻类别和新闻的数据
import axios from "axios";
import { APPCODE } from "./config"

// 获取所有新闻类别
export async function getNewsChannels() {
    var resp = await axios.get("http://ali-news.showapi.com/channelList", {
        headers: {
            Authorization: `APPCODE ${APPCODE}`,
        }
    })
    return resp;
    // return resp.data.showapi_res_body.channelList;
}

getNewsChannels();

/**
 * 根据频道，分页获取新闻
 * @param {*} channelId 频道id
 * @param {*} page 页码，从1开始
 * @param {*} limit 每页多少条数据
 */
// export async function getNews(channelId, page = 1, limit = 10) {
//     var newsList = await axios.get("http://ali-news.showapi.com/newsList", {
//         headers: {
//             Authorization: `APPCODE ${APPCODE}`,
//         },
//         params: {
//             channelId,
//             page,
//             maxResult: limit,
//             needAllList: false,
//             needContent: 1
//         }
//     })
//     return newsList.data.showapi_res_body.pagebean;
// }

// getNews("5572a108b3cdc86cf39001cd");