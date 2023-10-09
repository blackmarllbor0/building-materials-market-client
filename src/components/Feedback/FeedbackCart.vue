<template>
  {{ feedback.title }}
</template>

<script setup lang="ts">
import { Feedback } from 'stores/feedbacks';
import { toRefs } from 'vue';

const props = defineProps<{feedback: Feedback}>();
const { feedback } = toRefs(props);
</script>

<style scoped lang="scss">

</style>
