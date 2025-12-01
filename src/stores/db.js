// store/finishedGoodsStore.js
import { create } from "zustand";

const useFinishedGoodsStore = create((set, get) => ({
  asyncData: {}, // fetched data for all tabs
  submitData: {}, // merged submissions from all tabs
  localData: {}, // local editable copy
  currentGoodsTab: "FINISHED GOODS BIHON",
  skeletonActive: false,

  // Set async data after fetching
  setAsyncData: (data) => set({ asyncData: data }),

  // Set current tab
  setCurrentGoodsTab: (tabName) => set({ currentGoodsTab: tabName }),

  // Toggle skeleton loader
  setSkeletonActive: (active) => set({ skeletonActive: active }),

  // Merge filtered data into submitData
  mergeSubmitData: (data) =>
    set((state) => {
      const updated = {};

      return { submitData: data };
    }),

  // Replace submitData completely
  setSubmitData: (data) => set({ submitData: data }),

  setLocalData: (data, initial = false) => {
    let updated = {};
    let processedData = {};

    for (const key in data) {
      if (!Array.isArray(data[key])) continue;

      processedData[key] = data[key].map((item) => {
        // Split tags and convert to uppercase to match object keys
        const tags = item.TAGS.split(",").map((tag) =>
          tag.trim().toUpperCase()
        );

        // If initial load, force all tag fields to "0"
        if (initial) {
          tags.forEach((tag) => {
            item[tag] = "0";
          });
        }

        return item;
      });

      if (!initial) {
        // Perform filtering only if NOT initial
        processedData[key].forEach((item) => {
          const tags = item.TAGS.split(",").map((tag) =>
            tag.trim().toUpperCase()
          );

          const allZero = tags.every((tag) => item[tag] === "0");

          if (allZero) return; // skip item

          if (!updated[key]) updated[key] = [];
          updated[key].push(item);
        });
      }
    }

    set(() => ({
      localData: processedData,
      submitData: initial ? {} : updated,
    }));
  },

  // ----- NEW: Reset localData and submitData -----
  resetData: (tabOnly = true) =>
    set((state) => {
      const newLocalData = {};
      const newSubmitData = {};

      if (tabOnly) {
        const tab = state.currentGoodsTab;

        // Reset localData for current tab from asyncData
        if (state.asyncData[tab]) {
          newLocalData[tab] = state.asyncData[tab].map((item) => ({ ...item }));
        }

        // Reset submitData for current tab
        newSubmitData[tab] = [];
      } else {
        // Reset all tabs
        for (const [tab, items] of Object.entries(state.asyncData)) {
          newLocalData[tab] = items.map((item) => ({ ...item }));
        }

        // Reset all submitData
        for (const tab of Object.keys(state.submitData)) {
          newSubmitData[tab] = [];
        }
      }

      return { localData: newLocalData, submitData: newSubmitData };
    }),
}));

export default useFinishedGoodsStore;
