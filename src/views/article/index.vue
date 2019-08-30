<template>
  <div>
    <!-- 顶部 -->
    <el-card class="box-card">
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>

      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <el-select v-model="reqParams.channel_id" placeholder="请选择" clearable>
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
          <div class="block">
            <el-date-picker
              v-model="dateArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="getDatearr"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">根据筛选条件共查询到{{total}}条结果</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="cover" label="封面">
          <template slot-scope="scope">
            <div>
              <el-image :src="scope.row.cover.images[0]" style="width:120px;height:120px;">
                <div slot="error" class="image-slot">
                  <img src="../../assets/images/error.gif" alt style="width:120px;height:120px;" />
                </div>
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status ===2">审核成功</el-tag>
            <el-tag v-if="scope.row.status ===1">审核失败</el-tag>
            <el-tag v-if="scope.row.status ===0">草稿</el-tag>
            <el-tag v-if="scope.row.status ===3">待审核</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                plain
                @click="$router.push('/publish?id='+scope.row.id)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                plain
                @click="delArticle(scope.row.id)"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="reqParams.page"
      @current-change="changePage"
      :page-size="reqParams.per_page"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      channelOptions: [],
      dateArr: [],
      tableData: [],
      total: 0
    }
  },
  computed: {},
  created () {
    this.getChannelOptions()
    this.getArticles()
  },
  mounted () {},
  watch: {},
  methods: {
    delArticle (id) {
      // 危险操作
      this.$confirm('老铁，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击确认
          // 地址  articles/id  请求 delete
          // get 获取数据 post 添加数据 delete 删除属性 put 完整修改数据 patch 局部修改数据
          await this.$http.delete(`articles/${id}`)
          // 代码走这 成功
          this.$message.success('删除成功')
          this.getArticles()
        })
        .catch(() => {
          // 点击取消
        })
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    getDatearr (valueArr) {
      if (valueArr) {
        this.reqParams.begin_pubdate = valueArr[0]
        this.reqParams.end_pubdate = valueArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    search () {
      this.reqParams.page = 1
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      this.getArticles()
    },
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      // console.log(data)
      this.channelOptions = data.channels
    },
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      console.log(data)
      this.tableData = data.results
      this.total = data.total_count
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.el-pagination {
  text-align: center;
}
</style>
