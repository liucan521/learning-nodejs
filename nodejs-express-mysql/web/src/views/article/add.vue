<template>
  <div class="wrap">
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
      <FormItem label="文章标题" prop="title">
        <Input v-model="formItem.title" placeholder="文章标题"></Input>
      </FormItem>
      <FormItem label="文章作者" prop="author">
        <Input v-model="formItem.author" placeholder="文章作者"></Input>
      </FormItem>
      <FormItem label="文章内容" prop="content">
        <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 5,maxRows: 10}"
               placeholder="文章内容"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" :loading="loading" @click="insertArticle('formItem')">发布文章</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import article from '../../api/article'

  export default {
    data() {
      return {
        formItem: {
          title: '',
          author: '',
          content: '',
        },
        loading: false,
        ruleValidate: {
          // title: [
          //   {required: true, message: 'The title cannot be empty', trigger: 'blur'}
          // ],
          // author: [
          //   {required: true, message: 'author cannot be empty', trigger: 'blur'},
          // ],
          // content: [
          //   {required: true, message: 'content select the city', trigger: 'change'}
          // ]
        },
      }
    },
    methods: {

      /**
       * 发布文章
       * @returns {Promise<void>}
       */
      insertArticle(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loading = true;
            article.insert(this.formItem).then(ret => {
              this.tips('发布成功', name);
            }).catch(err => {
              this.tips('发布失败', name);
            })
          } else {
            this.$Message.error('Fail!');
          }
        })
      },

      tips(msg, name) {
        this.$Message.success(msg);
        this.$refs[name].resetFields();
        this.loading = false;
      },

    }
  }
</script>
<style scoped>
  body {
    background-color: #f8f8f8;
  }

  .wrap {
    width: 800px;
    margin: 120px auto;
    background-color: #fff;
    padding: 32px;
  }
</style>
