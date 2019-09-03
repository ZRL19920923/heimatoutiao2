<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改': '发布'}}文章</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题:">
          <el-input style="width:400px;" size="small" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor :options="editorOption" v-model="articleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]" style="display:inline-block"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image v-model="articleForm.cover.images[0]" style="display:inline-block"></my-image>
            <my-image v-model="articleForm.cover.images[1]" style="display:inline-block"></my-image>
            <my-image v-model="articleForm.cover.images[2]" style="display:inline-block"></my-image>
          </div>
        </el-form-item>

        <el-form-item label="频道:">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  props: {},
  data () {
    return {
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      articleForm: {
        content: null,
        title: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null,
        articleId: null
      }
    }
  },
  computed: {},
  created () {
    // 判断业务articleId 存在修改  不存在 发表
    this.articleId = this.$route.query.id
    if (this.articleId) {
      // 获取数据 填充表单
      this.getArticle()
    }
  },
  mounted () {},
  watch: {},
  methods: {
    async update (draft) {
      // 地址多了ID  请求方式put  其他不变
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      // 成功
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push('/article')
    },
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    changeType () {
      this.articleForm.cover.images = []
    },
    async submit (draft) {
      await this.$http.post(`/articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发布成功')
      this.$router.push('/article')
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style scoped lang="less">
</style>
