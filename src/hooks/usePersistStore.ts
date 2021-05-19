import { useLocalStorage, biSyncRef } from "@vueuse/core";
import { reactive, toRef } from "vue";

import { useListQuery } from "./useListQuery";

export function usePersistStore() {
  const persist = useLocalStorage<Record<string, any>>("store", {});
  return persist;
}

export function syncPersistData(data: Record<string, any>, key: string) {
  const persistStore = usePersistStore();

  if (!persistStore.value[key]) {
    persistStore.value[key] = data;
  } else {
    Object.assign(data, persistStore.value[key]);
  }
}

export function usePageStore() {
  const { loading, total, query, list, fetchData, resetQuery } =
    useListQuery("/person");

  // I want store some data to localstorage, 在每次强制刷新页面时, 从localstorage恢复这些数据, 并同步到所有相关的响应性数据

  const persistData = reactive({
    query: query.value,
    // ... other data
  });
  syncPersistData(persistData, "Person");
  biSyncRef(toRef(persistData, "query"), query);
  // ... other biSyncRef

  return {
    loading,
    total,
    query,
    list,
    fetchData,
    resetQuery,
  };
}
