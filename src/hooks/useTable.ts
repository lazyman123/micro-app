import type { Table } from "./interface";
import { reactive, computed, toRefs } from "vue";

/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法 (必传)
 * @param {Object} initParam 获取数据初始化参数 (非必传，默认为{})
 * @param {Boolean} isPageable 是否有分页 (非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法 (非必传)
 * */
export const useTable = (
  api?: (params: any) => Promise<any>,
  initParam: object = {},
  isPageable: boolean = true,
  dataCallBack?: (data: any) => any,
  requestError?: (error: any) => void,
  type?: string
) => {
  const state = reactive<Table.StateProps>({
    // 表格数据
    tableData: [],
    // 分页数据
    pageable: {
      // 当前页数
      pageNumber: 1,
      // 每页显示条数
      pageSize: 10,
      // 总条数
      total: 0,
      start: "",
      end: "",
      hasNext: false,
      hasPrevious: false,
      tableType: type || "cursor",
    },
    // 查询参数(只包括查询)
    searchParam: {},
    // 初始化默认的查询参数
    searchInitParam: {},
    // 总参数(包含分页和查询参数)
    totalParam: {},
  });

  /**
   * @description 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
   * */
  const pageParam = computed({
    get: () => {
      return {
        pageNumber: state.pageable.pageNumber,
        pageSize: state.pageable.pageSize,
      };
    },
    set: (newVal: any) => {
      console.log("我是分页更新之后的值", newVal);
    },
  });

  /**
   * @description 获取表格数据
   * @return void
   * */
  const getTableList = async (params: any) => {
    if (!api) return;
    try {
      // 先把初始化参数和分页参数放到总参数里面
      Object.assign(
        state.totalParam,
        initParam,
        isPageable ? pageParam.value : {}
      );
      let data = await api({
        ...state.searchInitParam,
        ...state.totalParam,
      });

      dataCallBack && (data = dataCallBack(data));
      if (state.pageable.tableType === "cursor") {
        if (data.count !== null) {
          localStorage.setItem("total", JSON.stringify(data.count));
        }
        state.tableData = data.data.data;
        state.pageable.start = data.start;
        state.pageable.end = data.end;
        state.pageable.total =
          Number(localStorage.getItem("total")) || data.count;
      } else {
        state.tableData = data.data;
        state.pageable.total = data.totalElements;
      }
      // 解构后台返回的分页数据 (如果有分页更新分页信息)
      // if (isPageable) {
      //   state.pageable.total = data.length;
      // }
    } catch (error) {
      requestError && requestError(error);
    }
  };

  /**
   * @description 更新查询参数
   * @return void
   * */
  const updatedTotalParam = () => {
    state.totalParam = {};
    // 处理查询参数，可以给查询参数加自定义前缀操作
    let nowSearchParam: Table.StateProps["searchParam"] = {};
    // 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
    for (let key in state.searchParam) {
      // 某些情况下参数为 false/0 也应该携带参数
      if (
        state.searchParam[key] ||
        state.searchParam[key] === false ||
        state.searchParam[key] === 0
      ) {
        nowSearchParam[key] = state.searchParam[key];
      }
    }
    Object.assign(state.totalParam, nowSearchParam);
  };

  /**
   * @description 表格数据查询
   * @return void
   * */
  const search = () => {
    state.pageable.pageNumber = 1;
    updatedTotalParam();
    getTableList(state.searchParam);
  };

  /**
   * @description 表格数据重置
   * @return void
   * */
  const reset = () => {
    state.pageable.pageNumber = 1;
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    state.searchParam = { ...state.searchInitParam };
    updatedTotalParam();
    getTableList(state.searchParam);
  };

  /**
   * @description 每页条数改变
   * @param {Number} val 当前条数
   * @return void
   * */
  const handleSizeChange = (val: number) => {
    state.pageable.pageNumber = 1;
    state.pageable.pageSize = val;
    getTableList(state.searchParam);
  };

  /**
   * @description 当前页改变
   * @param {Number} val 当前页
   * @return void
   * */
  const handleCurrentChange = (val: number) => {
    state.pageable.pageNumber = val;
    // getTableList(state.searchParam);
  };

  /**
   * @description 上一页
   * @param {Number} val 当前页
   * @return void
   * */
  const handlePrevClick = (val: number) => {
    handleCurrentChange(val);
    state.pageable.pageNumber = val - 1;
    state.totalParam.cursor = state.pageable.start;
    state.totalParam.backward = true;
  };

  watch(
    () => state.pageable.pageNumber,
    () => {
      // updatedTotalParam();
      getTableList(state.searchParam);
    }
  );

  /**
   * @description 下一页
   * @param {Number} val 当前页
   * @return void
   * */
  const handleNextClick = (val: number) => {
    handleCurrentChange(val);
    state.pageable.pageNumber = val + 1;
    state.totalParam.cursor = state.pageable.end;
    state.totalParam.backward = false;
  };

  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
    updatedTotalParam,
    handleNextClick,
    handlePrevClick,
  };
};
