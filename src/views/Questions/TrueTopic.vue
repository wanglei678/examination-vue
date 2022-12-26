<script setup lang='ts'>
  import { showError, showSuccess } from '@/utils/message';
  import { watch, onMounted, ref, inject, Ref } from 'vue';
  import Dialog from '@components/Dialog/index.vue';
  import Form from '@components/Form/index.vue';
  import { ThemeEnum, themeMap } from '@utils/enum';
  import * as XLSX from 'xlsx';
  import moment from 'moment';
  import { export_json_to_excel } from '@/utils/export2Excel';
  import {
    ElButton,
    ElDialog,
    ElCard,
    ElTableColumn,
    ElPopconfirm,
    ElTable,
    ElUpload,
    ElTag
  } from 'element-plus';
  const theme = inject<Ref<keyof typeof ThemeEnum>>('theme');
  const editQuestionFormOptions = ref();
  const editRowData = ref();
  const questionList = ref();
  const editQuestionVisible = ref(false);
  const loading = ref(false);
  const tableShow = ref(false);
  const addChapterDiaVisval = ref(false);
  const addQuestionDiaVisval = ref(false);
  const formEl = ref();
  const editQuestionFormEl = ref();
  const chapterList: any = ref([]);
  const fileList = ref();
  const fileData = ref();
  const fileDataList: any = ref([]);
  const getEditQuestionFormOptions = ( values: any ) => {
    return [
      {
        label: '题目名称',
        prop: 'questionName',
        rules: [{ required: true, message: '请输入题目名称', trigger: 'blur' }],
        defaultValue: values?.questionName,
        placeholder: '请输入题目名称'
      },
      {
        label: '题目类型',
        prop: 'questionType',
        rules: [{ required: true, message: '请输入题目类型', trigger: 'change' }],
        defaultValue: values?.questionType,
        placeholder: '请选择题目类型'
      },
      {
        label: '题目内容',
        prop: 'questionContent',
        rules: [{ required: true, message: '请输入题目内容', trigger: 'change' }],
        defaultValue: values?.questionContent,
        placeholder: '请选择题目内容'
      },
      {
        label: '题目答案',
        prop: 'questionAnswer',
        rules: [{ required: true, message: '请输入题目答案', trigger: 'change' }],
        defaultValue: values?.questionAnswer,
        placeholder: '请选择题目答案'
      },
      {
        label: '题目解析',
        prop: 'analysis',
        rules: [{ required: true, message: '请输入题目解析', trigger: 'change' }],
        defaultValue: values?.analysis,
        placeholder: '请选择题目解析'
      }
    ];
  };
  const getFormOptions = [
    {
      label: '真题名称',
      prop: 'username',
      rules: [{ required: true, message: '请输入真题名称', trigger: 'blur' }],
      placeholder: '请输入真题名称'
    }
  ]
  const props = defineProps({
    grade: String
  })
  onMounted(() => {
    window.document.title = '真题';
    init();
  });
  watch(
    () => props.grade,
    () => init()
  );
  const init = () => {
    // todo
    console.log(`真题tab重新加载等级为${props.grade}的数据`);
    chapterList.value = [
      {chapterName: '真题一', type: 'success'},
      {chapterName: '真题二', type: 'success'},
      {chapterName: '真题三', type: 'success'},
      {chapterName: '真题四', type: 'success'},
      {chapterName: '真题五', type: 'success'},
      {chapterName: '真题六', type: 'success'},
      {chapterName: '真题七', type: 'success'},
      {chapterName: '真题八', type: 'success'},
      {chapterName: '真题九', type: 'success'},
      {chapterName: '真题十', type: 'success'},
      {chapterName: '真题十一', type: 'success'},
      {chapterName: '真题十二', type: 'success'},
      {chapterName: '真题十三', type: 'success'},
      {chapterName: '真题十四', type: 'success'},
      {chapterName: '真题十五', type: 'success'},
      {chapterName: '真题十六', type: 'success'},
      {chapterName: '真题十七', type: 'success'},
      {chapterName: '真题十八', type: 'success'},
      {chapterName: '真题十九', type: 'success'},
      {chapterName: '真题二十', type: 'success'},
      {chapterName: '真题二十一', type: 'success'}
    ]
    questionList.value = [
      {questionName: '1+1=?', questionType: '选择题', questionContent: '1***2***3***4', questionAnswer: '2', analysis: '1+1=2'}
    ];
  }
  const sureAddQuestion = () => {
    showSuccess('批量导入成功');
    addQuestionDiaVisval.value = false;
  }
  const sureAddChapter = () => {}
  const handleRemove = () => {}
  const handlePreview = () => {}
  const changeFile = (file: any) => {
    fileData.value = file; // 保存当前选择文件
    readExcel(); // 调用读取数据的方法
  }
  const readExcel = (e?: any) => {
    const files = fileData.value;
    if (!files) {
      // 如果没有文件
      return false;
    } else if (!/.(xls|xlsx)$/.test(files.name.toLowerCase())) {
      showError('上传格式不正确，请上传xls或者xlsx格式');
      fileList.value = [];
      return false;
    }
    const fileReader = new FileReader();
    fileReader.onload = (ev: any) => {
      try {
        const data = ev.target.result;
        const workbook = XLSX.read(data, {
          type: 'binary'
        });
        const wsname = workbook.SheetNames[0]; // 取第一张表
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // 生成json表格内容
        fileDataList.value = [];
        ws.map((item: any) => {
          fileDataList.value.push({
            question: item['题目'],
            option: item['选项'],
            answer: item['答案'] + '',
            type: item['类型'],
            analysis: item['解析']
          })
        })
        console.log('fileDataList.value:', fileDataList.value);
      } catch (e) {
        return false;
      }
    };
    // 如果为原生 input 则应是 files[0]
    fileReader.readAsBinaryString(files.raw);
  }
  const cancelUploadDia = () => {
    fileDataList.value = [];
    fileList.value = [];
    addQuestionDiaVisval.value = false;
  }
  const handleExceed = () => {
    showError(`当前限制选择 1 个文件！`);
  }
  const deleteQuestion = (row: any) => {}
  const editQuesBtn = (row: any) => {
    editRowData.value = row;
    editQuestionFormOptions.value = getEditQuestionFormOptions(row);
    editQuestionVisible.value = true;
  }
  const editQuestionConfirm = (row: any) => {}
  const tagClick = (item: any) => {
    loading.value = true;
    chapterList.value.map((jtem: any) => {
      if (jtem.chapterName == item.chapterName) {
        jtem.type = 'danger';
      } else {
        jtem.type = 'success';
      }
    })
    setTimeout(()=>{
      tableShow.value = true;
      loading.value = false;
    },1000)
  }
  const uploadBtn = () => {
    fileDataList.value = [];
    fileList.value = [];
    addQuestionDiaVisval.value = true;
  }
</script>
<template>
  <div v-loading="loading">
    <el-button @click="addChapterDiaVisval = true" class="mb-10" type="primary">新增真题</el-button>
    <el-card class="box-card">
      <div class="tags-flex">
        <el-tag @click="tagClick(item)" v-for="item in chapterList" :key="item" :type='item.type' class="tag-position">{{ item.chapterName }}</el-tag>
      </div>
    </el-card>
    <el-card v-if="tableShow" class="box-card">
      <el-button @click="uploadBtn" class="mb-10 tag-position" type="primary">批量导入</el-button>
      <el-table
        style="width: 100%"
        :data="questionList"
        stripe
        :header-row-class-name="themeMap[theme || 'default'].className"
        border
        align="center">
        <el-table-column prop="questionName" label="题目名称" align="center"></el-table-column>
        <el-table-column prop="questionType" label="题目类型" align="center"></el-table-column>
        <el-table-column prop="questionContent" label="题目内容" align="center"></el-table-column>
        <el-table-column prop="questionAnswer" label="题目答案" align="center"></el-table-column>
        <el-table-column prop="analysis" label="题目分析" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <div>
              <el-button size="mini" @click="editQuesBtn(scope.row)" type="primary">编辑</el-button>
              <el-popconfirm title="确认删除该用户?" @confirm="() => deleteQuestion(scope.row)">
                <template #reference>
                  <el-button size="mini" type="primary">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Dialog
      title="添加真题"
      v-model:dialogVisible="addChapterDiaVisval"
      @confirm="sureAddChapter">
      <Form :options="getFormOptions" ref="formEl" />
    </Dialog>
    <el-dialog
      title="批量导入题目"
      width="1100px"
      :destroy-on-close="true"
      :model-value="addQuestionDiaVisval">
      <el-card class="box-card">
        <el-upload
          class="upload-demo"
          action=""
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :limit="1"
          :file-list="fileList"
          :auto-upload="false"
          :on-exceed="handleExceed"
          :on-change="changeFile">
          <el-button size="small" type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">只能上传 xlsx,xls 文件</div>
          </template>
        </el-upload>
      </el-card>
      <el-card class="box-card">
        <el-table
          style="width: 100%"
          :data="fileDataList"
          stripe
          :header-row-class-name="themeMap[theme || 'default'].className"
          border
          align="center">
          <el-table-column prop="question" label="题目名称" align="center"></el-table-column>
          <el-table-column prop="type" label="题目类型" align="center"></el-table-column>
          <el-table-column prop="option" label="题目内容" align="center"></el-table-column>
          <el-table-column prop="answer" label="题目答案" align="center"></el-table-column>
          <el-table-column prop="analysis" label="题目分析" align="center"></el-table-column>
        </el-table>
      </el-card>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelUploadDia">取消</el-button>
          <el-button type="primary" @click="sureAddQuestion">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <Dialog
      title="编辑题目"
      v-model:dialogVisible="editQuestionVisible"
      @confirm="editQuestionConfirm">
      <Form :options="editQuestionFormOptions" ref="editQuestionFormEl" />
    </Dialog>
  </div>
</template>
<style>
  .el-card__body {
    width: 100%;
  }
  .el-table__header th.el-table__cell {
    background-color: #205aa4;
    color: #fff;
  }
  /* .el-table .bronze-green th {
    background: linear-gradient(45deg, #1278f6, #00b4aa 50%, #1278f6) !important;
  }
  .el-table .reds th {
    background: linear-gradient(45deg, #e9ef34, #06a41e 50%, #e9ef34) !important;
  }
  .el-table .blacks th {
    background: linear-gradient(45deg, #545c64, #c62334 50%, #545c64) !important;
  } */
</style>
<style lang="less" scoped>
  .box-card {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .tag-position {
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
  .box-card {
    width: 100%;
  }
</style>