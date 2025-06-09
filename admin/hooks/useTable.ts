import { computed, onMounted, ref } from 'vue';

export const useTable = (options) => {
  const {
    defaultSearchParams = {},
    columns,
    request,
    formatter = (item) => item,
    selectable = false,
  } = options;

  const dataSource = ref([]);
  const loading = ref(false);
  const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total) => `共 ${total} 条`,
    showSizeChanger: true,
  });
  const rowSelection = ref({
    onChange: (keys) => {
      selectedRowKeys.value = keys;
    },
  });
  const selectedRowKeys = ref([]);

  const searchParams = ref({ ...defaultSearchParams });

  const scroll = {
    x: columns.reduce((acc, item) => acc + (item.width || 100), 0),
  };

  const fetchList = async () => {
    loading.value = true;
    try {
      const res = await request({
        ...searchParams.value,
        pageNum: pagination.value.current,
        pageSize: pagination.value.pageSize,
      });
      const list = res.data.list;
      dataSource.value = list.map(formatter);
      pagination.value.total = res.data.total || 0;
    } finally {
      loading.value = false;
    }
  };

  const handleChangeTable = (page, filters, sorter) => {
    pagination.value.current = page.current;
    pagination.value.pageSize = page.pageSize;

    if (sorter.field) {
      searchParams.value.sort = sorter.field;
      searchParams.value.order = sorter.order;
    } else {
      delete searchParams.value.sort;
      delete searchParams.value.order;
    }

    fetchList();
  };

  const handleSearch = () => {
    pagination.value.current = 1;
    fetchList();
  };

  const handleReset = () => {
    Object.assign(searchParams.value, defaultSearchParams);
    handleSearch();
  };

  onMounted(fetchList);

  const tableProps = computed(() => ({
    dataSource: dataSource.value,
    columns,
    scroll,
    loading: loading.value,
    pagination: pagination.value,
    onChange: handleChangeTable,
    rowKey: 'id',
    rowSelection: selectable ? rowSelection.value : undefined,
    selectedRowKeys: selectedRowKeys.value,
  }));

  return {
    tableProps,
    searchParams,
    handleSearch,
    handleReset,
    fetchList,
  };
};
