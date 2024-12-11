<template>
  <!-- 分页组件 -->
  <el-pagination
    v-if="pageable.type === 'default'"
    :background="true"
    :current-page="pageable.pageNumber"
    :page-size="pageable.pageSize"
    :page-sizes="[10, 25, 50, 100]"
    :total="pageable.total"
    :size="globalStore?.assemblySize ?? 'default'"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
  <el-pagination
    v-else
    :background="true"
    :current-page="pageable.pageNumber"
    :page-size="pageable.pageSize"
    :page-sizes="[10]"
    :total="pageable.total"
    :size="globalStore?.assemblySize ?? 'default'"
    layout="total, sizes, prev, next"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    @prev-click="handlePrevClick"
    @next-click="handleNextClick"
  ></el-pagination>
</template>

<script setup lang="ts" name="Pagination">
import { useGlobalStore } from "@/store/modules/global";
const globalStore = useGlobalStore();

interface Pageable {
  pageNumber: number;
  pageSize: number;
  total: number;
  type: string
}

interface PaginationProps {
  pageable: Pageable;
  handleSizeChange: (size: number) => void;
  handleCurrentChange: (currentPage: number) => void;
  handlePrevClick: (currentPage: number) => void;
  handleNextClick: (currentPage: number) => void;
}

defineProps<PaginationProps>();
</script>
