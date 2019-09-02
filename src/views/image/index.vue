<template>
  <el-card>
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <el-radio-group v-model="reqParams.collect" size="small" @change="toggleCollect">
      <el-radio-button :label="false">全部</el-radio-button>
      <el-radio-button :label="true">收藏</el-radio-button>
    </el-radio-group>
    <el-button type="success" plain style="float:right;" size="small" @click="openDialog">添加素材</el-button>
    <div class="img_list">
      <div class="img_item" v-for="item in images" :key="item.id">
        <img :src="item.url" alt />
        <div class="footer" v-if="!reqParams.collect">
          <span
            @click="toggleStatus(item)"
            class="el-icon-star-off"
            :class="{red : item.is_collected}"
          ></span>
          <span class="el-icon-delete" @click="delImage(item.id)"></span>
        </div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="changePage"
      hide-on-single-page
    ></el-pagination>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px" style="text-align: center;">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        name="image"
        :headers="header"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import Store from '@/store'
export default {
  props: {},
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      header: { Authorization: `Bearer ${Store.getUser().token}` }
    }
  },
  computed: {},
  created () {
    this.getImages()
  },
  mounted () {},
  watch: {},
  methods: {
    handleSuccess (res) {
      // 成功提示
      this.$message.success('上传素材成功')
      // 赋值
      this.imageUrl = res.data.url
      // 两秒关闭
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    openDialog () {
      this.dialogVisible = true
      //   清空上次上传的图片
      this.imageUrl = null
    },
    delImage (id) {
      // 确认框
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发请求
          await this.$http.delete(`user/images/${id}`)
          // 提示+更新列表
          this.$message.success('删除素材成功')
          this.getImages()
        })
        .catch(() => {})
    },
    // 切换图片状态
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 成功
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      // 更新列表  重新获取数据---->按照后台的排序更新图片的顺序----->图片的位置改变---->体验不好
      // 只更新当图片的状态 即可。
      item.is_collected = data.collect
    },
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      console.log(data)
      this.images = data.results
      this.total = data.total_count
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.img_list {
  margin-top: 20px;
  .img_item {
    display: inline-block;
    width: 160px;
    height: 160px;
    margin-right: 50px;
    margin-bottom: 20px;
    position: relative;
    //   margin-top: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .footer {
      width: 100%;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
