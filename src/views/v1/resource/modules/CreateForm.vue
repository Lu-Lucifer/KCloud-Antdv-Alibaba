<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="标题" prop="title">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-model-item>
      <a-form-model-item label="资源">
        <a-input v-model="form.url" placeholder="请上传资源" style="display: none" />
        <a-upload name="file" @change="uploadFile" accept=".gif,.GIF,.jpg,.JPG,.jpeg,.JPEG,.png,.PNG,.bmp,.BMP,.webp,.WEBP" :before-upload="beforeUpload">
          <a-button :disabled="disabled">
            上传资源
          </a-button>
        </a-upload>
        <img :src="form.url" v-show="display1" width="100" height="100"/>
        <audio v-show="display2" loop="loop" :src="form.url" controls="controls"><object :data="form.url" ><embed :src="form.url" /></object></audio>
        <video
          v-show="display3"
          :src="form.url"
          loop="loop"
          width="200"
          height="100"
          controls="controls"><source :src="form.url" type="video/mp4"><object :data="form.url" width="200" height="100"><embed :src="form.url" width="200" height="100" /></object></video>
      </a-form-model-item>
      <a-form-model-item label="备注" prop="remark">
        <a-input v-model="form.remark" placeholder="请输入备注" type="textarea" allow-clear />
      </a-form-model-item>
      <div class="bottom-control">
        <a-space>
          <a-button type="primary" :loading="submitLoading" @click="submitForm">
            保存
          </a-button>
          <a-button type="dashed" @click="cancel">
            取消
          </a-button>
        </a-space>
      </div>
    </a-form-model>
  </a-drawer>
</template>

<script>

  import { getResourceById, addImage, updateResource, uploadResource } from '@/api/v1/resource'

  export default {
    name: 'CreateForm',
    components: {
    },
    data () {
      return {
        submitLoading: false,
        formTitle: '',
        tagInputVisible: false,
        tagInputValue: '',
        // 表单参数
        form: {
          id: undefined,
          title: undefined,
          url: undefined,
          code: '',
          remark: undefined,
          instanceId: undefined
        },
        disabled: false,
        open: false,
        display1: false,
        display2: false,
        display3: false,
        rules: {
          title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
          remark: [{ required: true, message: '备注不能为空', trigger: 'blur' }]
        }
      }
    },
    filters: {
    },
    created () {
    },
    computed: {
    },
    watch: {
    },
    methods: {
      onClose () {
        this.open = false
      },
      // 取消按钮
      cancel () {
        this.open = false
        this.reset()
      },
      // 表单重置
      reset () {
        this.disabled = false
        this.form = {
          id: undefined,
          title: undefined,
          url: undefined,
          code: '',
          remark: undefined,
          instanceId: undefined
        }
      },
      uploadFile (data) {
        if (data.fileList.length > 0) {
          this.disabled = true
          const formData = new FormData()
          formData.append('file', data.file)
          uploadResource(formData).then(response => {
            this.form.url = response.data.url
            this.display1 = true
          })
        } else {
          this.display1 = false
          this.disabled = false
          this.form.url = undefined
        }
      },
      beforeUpload () {
        return false
      },
      /** 新增按钮操作 */
      handleAdd () {
        this.reset()
        this.open = true
        this.formTitle = '图片新增'
      },
      /** 修改按钮操作 */
      handleUpdate (row, ids) {
        this.reset()
        const id = row ? row.id : ids
        getResourceById(id).then(response => {
          this.form.id = response.data.id
          this.form.url = response.data.url
          this.form.title = response.data.title
          this.form.code = response.data.code
          if (this.form.code === 'image') {
            this.display1 = true
            this.display2 = false
            this.display3 = false
          }
          if (this.form.code === 'audio') {
            this.display1 = false
            this.display2 = true
            this.display3 = false
          }
          if (this.form.code === 'video') {
            this.display1 = false
            this.display2 = false
            this.display3 = true
          }
          this.form.instanceId = response.data.instanceId
          this.form.remark = response.data.remark
          this.open = true
          this.formTitle = '资源修改'
        })
      },
      /** 提交按钮 */
      submitForm: function () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.submitLoading = true
            if (this.form.id !== undefined) {
              const data = { resourceCO: this.form }
              updateResource(data).then(() => {
                this.$message.success(
                  '修改成功',
                  3
                )
                this.open = false
                this.$emit('ok')
              }).finally(() => {
                this.submitLoading = false
              })
            } else {
              addImage(this.form).then(response => {
                this.$message.success(
                  '新增成功',
                  3
                )
                this.open = false
                this.$emit('ok')
              }).finally(() => {
                this.submitLoading = false
              })
            }
          } else {
            return false
          }
        })
      }
    }
  }
</script>
