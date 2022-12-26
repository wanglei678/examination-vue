<script setup lang='ts'>
  import { ref, reactive, onMounted, watch } from 'vue';
  // import {  } from '@/api/questions';
  import Tabs from '@components/Tabs/index.vue';
  import Chapter from './Chapter.vue';
  import TrueTopic from './TrueTopic.vue';
  import Simulation from './Simulation.vue';
  import DenseVolume from './DenseVolume.vue';
  import { useRouter} from 'vue-router'
  import { ElTabs, ElTabPane } from 'element-plus';
  const router = useRouter()
  const grade = ref();
  const chapterShow = ref(true);
  const trueTopicShow = ref(false);
  const denseVolumeShow = ref(false);
  const simulationShow = ref(false);
  const activeName = ref('chapters');
  onMounted(() => {});
  watch(
    () => router.currentRoute.value,
    (newValue: any) => {
      grade.value = newValue.name;
      activeName.value = 'chapters';
      chapterShow.value = true;
      trueTopicShow.value = false;
      simulationShow.value = false;
      denseVolumeShow.value = false;
    },
    { immediate: true }
  )
  const handleClick = (tab:  typeof Tabs) => {
    if (tab.props.label === '章节') {
      chapterShow.value = true;
      trueTopicShow.value = false;
      simulationShow.value = false;
      denseVolumeShow.value = false;
    }
    if (tab.props.label === '真题') {
      chapterShow.value = false;
      trueTopicShow.value = true;
      simulationShow.value = false;
      denseVolumeShow.value = false;
    }
    if (tab.props.label === '模拟') {
      chapterShow.value = false;
      trueTopicShow.value = false;
      simulationShow.value = true;
      denseVolumeShow.value = false;
    }
    if (tab.props.label === '密卷') {
      chapterShow.value = false;
      trueTopicShow.value = false;
      simulationShow.value = false;
      denseVolumeShow.value = true;
    }
  }
</script>
<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="章节" name="chapters">
        <Chapter ref="RefChapter" :grade="grade" v-if="chapterShow"></Chapter>
      </el-tab-pane>
      <el-tab-pane label="真题" name="trueTopics">
        <TrueTopic :grade="grade" v-if="trueTopicShow"></TrueTopic>
      </el-tab-pane>
      <el-tab-pane label="模拟" name="simulations">
        <Simulation :grade="grade" v-if="simulationShow"></Simulation>
      </el-tab-pane>
      <el-tab-pane label="密卷" name="denseVolumes">
        <DenseVolume :grade="grade" v-if="denseVolumeShow"></DenseVolume>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>