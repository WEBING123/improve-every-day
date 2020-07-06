<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>导航一
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>导航二
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>导航三
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>管理员</span>
        </el-header>

        <el-main>
          <!-- search -->
          <el-row :gutter="20">
            <el-col :span="10">
              <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" icon="el-icon-circle-plus-outline">添加用户</el-button>
            </el-col>
          </el-row>

          <!-- table -->
          <el-table :data="channels" style="width: 100%">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="channelId" label="channelId"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <!-- 作用域插槽渲染状态列 -->
            <!-- <el-table-column prop="state" label="状态">
            <template slot-scope="scope">-->
            <!-- 显示当前行的所有数据 -->
            <!-- {{ scope.row }}
              </template>
              <el-switch v-model="scope.row.state"></el-switch>
            </el-table-column>-->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit"></el-button>
                <el-button type="danger" icon="el-icon-share"></el-button>
                <el-button type="warning" icon="el-icon-delete"></el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- page -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getNewsChannels } from "../services/newsServices";
export default {
  data() {
    return {
      input: "",
      channels: [],
      total: 0
    };
  },
  async created() {
    var result = await getNewsChannels();
    this.channels = result.data.showapi_res_body.channelList;
    // channels 是数组，无需for循环添加
    console.log(this.channels);
    this.total = result.data.showapi_res_body.totalNum;
  },
  methods: {
    // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
          console.log(newSize);
      },
    //   监听 页码值 改变的事件
      handleCurrentChange() {

      }
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>