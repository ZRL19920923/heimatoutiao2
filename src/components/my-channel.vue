<template>
  <el-select :value="value" placeholder="请选择" clearable @change="changeChannel">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  computed: {},
  created () {
    this.getChannelOptions()
  },
  mounted () {},
  watch: {},
  methods: {
    changeChannel (channelId) {
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    },
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      // console.log(data)
      this.channelOptions = data.channels
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
</style>
