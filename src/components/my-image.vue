<template>
  <div class="img-container">
    <!-- 图片按钮 -->
    <div class="img_btn" @click="openDialog">
      <img :src="value || defaultImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group
            size="small"
            style="width:100%;"
            v-model="reqParams.collect"
            @change="toggleCollect"
          >
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="list_img">
            <div
              class="list_item"
              v-for="item in images"
              :key="item.id"
              @click="selectedImage(item.url)"
              :class="{selected:item.url === selectedImageUrl}"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="reqParams.page"
            @current-change="changePage"
            :page-size="reqParams.per_page"
            hide-on-single-page
            ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload" style="text-align:center;">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :on-success="handleSuccess"
            name="image"
            :headers="headers"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      total: 0,
      images: [],
      uploadImageUrl: null,
      selectedImageUrl: null,
      headers: {
        Authorization: `Bearer ${Store.getUser().token}`
      },
      defaultImage
    }
  },
  computed: {},
  created () {
    this.getImages()
  },
  mounted () {},
  watch: {},
  methods: {
    confirmImage () {
      let src = null
      if (this.activeName === 'image') {
        // 使用 selectedImageUrl
        if (!this.selectedImageUrl) return this.$message.info('请选择素材图片')
        src = this.selectedImageUrl
      } else {
        // 使用 uploadImageUrl
        if (!this.uploadImageUrl) return this.$message.info('请上传素材图片')
        src = this.uploadImageUrl
      }
      // 给图片按钮的src属性赋值
      this.$emit('input', src)
      this.dialogVisible = false
    },
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      //   console.log(data)
      this.images = data.results
      this.total = data.total_count
    },
    handleSuccess (res) {
      this.$message.success('上传图片成功')
      // 预览即可
      this.uploadImageUrl = res.data.url
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      //   this.getImages()
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.img_btn {
  height: 160px;
  width: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.list_img {
  .list_item {
    display: inline-block;
    height: 120px;
    width: 120px;
     margin-left: 50px;
      margin-top: 20px;
    position: relative;
    // text-align: center;
    &.selected {
      &::after {
        // .img_item.selected::after{} 添加选中效果
        content: "";
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center/ 50px;
      }
    }
    img {
      width: 120px;
      height: 120px;
    }
  }
}
</style>
