<template>
  <q-btn-dropdown
    :color="color"
    :label="label"
  >
    <q-list>
      <q-item
        v-for="(item) in list"
        :key="item.id"
        v-close-popup
        clickable
      >
        <q-item-section>
          <q-item-label @click="item.click!(item.id)">
            {{ item.name[0].toUpperCase() + item.name.slice(1) }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts" setup>
import { toRefs, watch, ref } from 'vue';

const props = defineProps<{
  list: { id: number, name: string, click?:(...args: any) => void }[],
  label: string,
  color: 'red' | 'primary' | 'green' | 'black',
}>();

const { list, color } = toRefs(props);

const label = ref<string>(props.label);

watch(() => props.label, (value) => {
  label.value = value;
});
</script>
