import { ref } from "vue";

export function useListQuery(listUrl: string) {
  const total = ref(0);
  const query = ref<Record<string, any>>({ page: 1, size: 10 });
  const list = ref<any[]>([]);
  const loading = ref(false);

  async function fetchData() {
    try {
      loading.value = true;

      //   const response = await fetch(listUrl);
      //   const data = await response.json();
      const data = { total: 0, list: [] };
      total.value = data.total;
      list.value = data.list;
    } catch (error) {
      //
    } finally {
      loading.value = false;
    }
  }

  function resetQuery() {
    query.value = { page: 1, size: 10 };
  }

  return {
    loading,
    total,
    query,
    list,
    fetchData,
    resetQuery,
  };
}
