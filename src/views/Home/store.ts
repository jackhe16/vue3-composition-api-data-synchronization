import { biSyncRef } from "@vueuse/core";
import { reactive, toRef } from "vue";

import { useListQuery } from "@/hooks/useListQuery";
import { syncPersistData } from "@/hooks/usePersistStore";

export function usePageStore() {
  const { loading, total, query, list, fetchData, resetQuery } =
    useListQuery("/person");

  // I want store some data to localstorage, Every time the page is forced to refresh,
  // the data is restored from localstorage and synchronized to all relevant responsive data

  const persistData = reactive({
    query: query,
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

export default usePageStore();
