<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  page?: number
  pageSize?: number
  totalItems: number
}>(), {
  page: 1,
  pageSize: 10,
  totalItems: 0,
})

const emit = defineEmits<{
  'update:page': [value: number]
}>()

const length = computed(() => Math.ceil(props.totalItems / props.pageSize))
</script>

<template>
  <v-pagination
    :model-value="props.page" :length="length" rounded="circle"
    @update:model-value="$e => emit('update:page', $e)"
  />
</template>

<style scoped></style>
