<script setup lang='ts'>
  import { showError, showSuccess } from '@/utils/message';
  import { watch, onMounted, ref, inject, Ref } from 'vue';
  import Dialog from '@components/Dialog/index.vue';
  import Form from '@components/Form/index.vue';
  import { ThemeEnum, themeMap } from '@utils/enum';
  import {
    querytrueTopicList,
    addTrueTopic,
    editTrueTopicName,
    queryTrueTopicQuestions,
    editTrueTopicsQuestion,
    deleteTrueTopicsQuestion,
    deleteTrueTopicsAndQuestion,
    addTrueTopicsQuestions
  } from '@api/trueTopic';
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
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElIcon,
    ElTag
  } from 'element-plus';
  const theme = inject<Ref<keyof typeof ThemeEnum>>('theme');
  const editQuestionFormOptions = ref();
  const tagClickData: any = ref();
  const editOrDeletetrueTopicData: any = ref();
  const edittrueTopicFlag = ref();
  const editRowData = ref();
  const questionList = ref();
  const deletetrueTopicVisible = ref(false);
  const editQuestionVisible = ref(false);
  const loading = ref(false);
  const tableShow = ref(false);
  const addtrueTopicDiaVisval = ref(false);
  const addQuestionDiaVisval = ref(false);
  const formEl = ref();
  const editQuestionFormEl = ref();
  const trueTopicList: any = ref([]);
  const fileList = ref();
  const fileData = ref();
  const fileDataList: any = ref([]);
  const getEditQuestionFormOptions = ( values: any ) => {
    return [
      {
        label: '题目名称',
        prop: 'title',
        rules: [{ required: true, message: '请输入题目名称', trigger: 'blur' }],
        defaultValue: values?.title,
        placeholder: '请输入题目名称'
      },
      {
        label: '题目类型',
        prop: 'type',
        rules: [{ required: true, message: '请输入题目类型', trigger: 'change' }],
        defaultValue: values?.type,
        placeholder: '请选择题目类型'
      },
      {
        label: '题目内容',
        prop: 'options',
        rules: [{ required: true, message: '请输入题目内容', trigger: 'change' }],
        defaultValue: values?.options,
        placeholder: '请选择题目内容'
      },
      {
        label: '题目答案',
        prop: 'answer',
        rules: [{ required: true, message: '请输入题目答案', trigger: 'change' }],
        defaultValue: values?.answer,
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
  let getFormOptions: any = [
    {
      label: '真题名称',
      prop: 'trueTopicName',
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
    () => {
      tableShow.value = false;
      init();
    }
  );
  const init = () => {
    loading.value = true;
    let params: any = {}
    if(props.grade == 'questionsEasy') {
      params.grade = '1';
    } else if (props.grade == 'questionsMiddle') {
      params.grade = '2';
    } else params.grade = '3';
    querytrueTopicList(params).then(res => {
      trueTopicList.value = res.data;
      trueTopicList.value.map((item: any) => {
        item.trueTopicName = item.name;
        item.type = 'success';
      })
      loading.value = false;
    }).catch(error => {
      loading.value = false;
      showError(error);
    })
  }
  const sureAddQuestion = () => {
    addQuestionDiaVisval.value = false;
    fileDataList.value.map((item: any) => {
      item.ztid = tagClickData.value.id
    })
    addTrueTopicsQuestions(fileDataList.value).then(res => {
      showSuccess('批量导入题目成功');
      loading.value = false;
      tagClick(tagClickData.value);
    }).catch(error => {
      loading.value = false;
      showError(error);
    })
  }
  const sureAddtrueTopic = () => {
    formEl.value.validate(async (valid: boolean, values: any) => {
      if (valid) {
        let params: any = {
          name: values.trueTopicName
        }
        if(props.grade == 'questionsEasy') {
          params.grade = '1';
        } else if (props.grade == 'questionsMiddle') {
          params.grade = '2';
        } else params.grade = '3';
        addtrueTopicDiaVisval.value = false;
        loading.value = true;
        tableShow.value = false;
        if (!edittrueTopicFlag.value) {
          // 新增真题
          addTrueTopic(params).then(() => {
            showSuccess('新增真题成功');
            loading.value = false;
            init();
          }).catch(error => {
            loading.value = false;
            showError(error);
          })
        } else {
          // 修改真题名称
          let editParams: any = {
            name: values.trueTopicName,
            id: editOrDeletetrueTopicData.value.id
          }
          editTrueTopicName(editParams).then(() => {
            showSuccess('编辑真题名称成功');
            loading.value = false;
            init();
          }).catch((error: any) => {
            loading.value = false;
            showError(error);
          })
        }
      }
    })
  }
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
            title: item['题目'],
            option: item['选项'],
            answer: item['答案'] + '',
            type: item['类型'],
            analysis: item['解析']
          })
        })
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
  const deleteQuestion = (row: any) => {
    loading.value = true;
    let params: any = {
      tmid: row.tmid
    }
    deleteTrueTopicsQuestion(params).then(res => {
      showSuccess('删除题目成功');
      loading.value = false;
      tagClick(tagClickData.value);
    }).catch(error => {
      loading.value = false;
      showError(error);
    })
  }
  const editQuesBtn = (row: any) => {
    editRowData.value = row;
    editQuestionFormOptions.value = getEditQuestionFormOptions(row);
    editQuestionVisible.value = true;
  }
  const editQuestionConfirm = () => {
    editQuestionFormEl.value.validate(async (valid: boolean, values: any) => {
      if (valid) {
        let params: any = {
          tmid: editRowData.value.tmid,
          analysis: values.analysis,
          answer: values.answer,
          options: values.options,
          title: values.title,
          type: values.type
        }
        editQuestionVisible.value = false;
        loading.value = true;
        editTrueTopicsQuestion(params).then(res => {
          showSuccess('编辑题目成功');
          loading.value = false;
          tagClick(tagClickData.value);
        }).catch(error => {
          loading.value = false;
          showError(error);
        })
      }
    })
  }
  const tagClick = (item: any) => {
    tagClickData.value = item;
    loading.value = true;
    trueTopicList.value.map((jtem: any) => {
      if (jtem.trueTopicName == item.trueTopicName) {
        jtem.type = 'danger';
      } else {
        jtem.type = 'success';
      }
    })
    let params: any = {ztid: item.id}
    queryTrueTopicQuestions(params).then(res => {
      questionList.value = res.data || [];
      tableShow.value = true;
      loading.value = false;
    }).catch(error => {
      loading.value = false;
      showError(error);
    })
  }
  const uploadBtn = () => {
    fileDataList.value = [];
    fileList.value = [];
    addQuestionDiaVisval.value = true;
  }
  const dropdownClick = (val: any) => {
    const { type, command } = val;
    editOrDeletetrueTopicData.value = command;
    if (type === 'edit') {
      edittrueTopicFlag.value = true;
      getFormOptions[0].defaultValue = editOrDeletetrueTopicData.value.trueTopicName;
      addtrueTopicDiaVisval.value = true;
    } else if (type === 'delete') {
      deletetrueTopicVisible.value = true;
    }
  }
  const commandValue = (type: any, command: any) => {
    return {
      'type': type,
      'command': command
    }
  }
  const addtrueTopicClick = () => {
    edittrueTopicFlag.value = false;
    getFormOptions[0].defaultValue = '';
    addtrueTopicDiaVisval.value = true;
  }
  const deletetrueTopicConfirm = () => {
    loading.value = true;
    tableShow.value = false;
    deletetrueTopicVisible.value = false;
    let params: any = {
      id: editOrDeletetrueTopicData.value.id
    };
    deleteTrueTopicsAndQuestion(params).then(() => {
      showSuccess('删除真题成功');
      loading.value = false;
      init();
    }).catch(error => {
      loading.value = false;
      showError(error);
    })
  }
</script>
<template>
  <div v-loading="loading">
    <el-button @click="addtrueTopicClick" class="mb-10" type="primary">新增真题</el-button>
    <el-card class="box-card">
      <div class="tags-flex">
        <div v-for="item in trueTopicList" :key="item" class="tag-position">
          <el-dropdown @command="dropdownClick">
            <span class="el-dropdown-link">
              <el-tag @click="tagClick(item)" :type='item.type'>{{ item.trueTopicName }}</el-tag>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :command="commandValue('edit', item)">修改真题</el-dropdown-item>
                <el-dropdown-item :command="commandValue('delete', item)">删除真题</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
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
        <el-table-column prop="title" label="题目名称" align="center">
          <template v-slot="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题目类型" align="center"></el-table-column>
        <el-table-column prop="options" label="题目内容" align="center">
          <template v-slot="scope">
            <span v-html="scope.row.options"></span>
          </template>
        </el-table-column>
        <el-table-column prop="answer" label="题目答案" align="center"></el-table-column>
        <el-table-column prop="analysis" label="题目分析" align="center">
          <template v-slot="scope">
            <span v-html="scope.row.analysis"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <div>
              <el-button size="mini" @click="editQuesBtn(scope.row)" type="primary">编辑</el-button>
              <el-popconfirm title="确认删除该题目?" @confirm="() => deleteQuestion(scope.row)">
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
      :title="edittrueTopicFlag ? '编辑真题' : '新增真题'"
      v-model:dialogVisible="addtrueTopicDiaVisval"
      @confirm="sureAddtrueTopic">
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
          :limit="1"
          :file-list="fileList"
          :auto-upload="false"
          :on-exceed="handleExceed"
          :on-change="changeFile">
          <el-button size="small" type="primary">点击上传文件</el-button>
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
          <el-table-column prop="title" label="题目名称" align="center"></el-table-column>
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
    <Dialog
      title="删除真题"
      v-model:dialogVisible="deletetrueTopicVisible"
      @confirm="deletetrueTopicConfirm">
      <span>是否确定删除真题,这将会同时删除该真题下的所有题目！</span>
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
    display: inline-block;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
  .box-card {
    width: 100%;
  }
</style>