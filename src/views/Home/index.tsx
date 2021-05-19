import { defineComponent, onMounted } from "vue";

import store from "./store";

export default defineComponent({
  name: "Home",
  setup() {
    const { loading, total, query, list, fetchData, resetQuery } = store;

    onMounted(() => {
      fetchData();
    });

    return () => {
      return (
        <div>
          <div>
            <label>name</label>
            <input
              value={query.value.name}
              onInput={(e: any) => {
                query.value.name = e.target.value;
              }}
            />
          </div>

          <div>
            <label>age</label>
            <input
              value={query.value.age}
              onInput={(e: any) => {
                query.value.age = e.target.value;
              }}
            />
          </div>

          <div>
            <button
              onClick={() => {
                fetchData();
              }}
            >
              search
            </button>
            <button
              onClick={() => {
                resetQuery();
              }}
            >
              reset
            </button>
          </div>

          <div>
            {JSON.stringify({
              loading,
              total,
              list,
            })}
          </div>
        </div>
      );
    };
  },
});
