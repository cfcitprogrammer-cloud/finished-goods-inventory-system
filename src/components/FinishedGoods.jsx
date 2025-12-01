import React from "react";
import { useEffect, useState } from "react";
import { BASE_API_URL, GET_ACTION_FETCH_ALL_SHEET } from "../data/links";
import axios from "axios";
import ListItems from "./ListItems";
import useFinishedGoodsStore from "../stores/db";

const tabs = [
  "FINISHED GOODS BIHON",
  "FINISHED GOODS SF1",
  "FINISHED GOODS SF2",
  "CORNSTARCH STOCKS",
  "FINISHED GOODS 3M WHS",
];

export default function FinishedGoods() {
  const {
    setAsyncData,
    setLocalData,
    currentGoodsTab,
    setCurrentGoodsTab,
    submitData,
    localData,
  } = useFinishedGoodsStore();

  async function fetchAllCategories() {
    try {
      const res = await axios.get(
        `${BASE_API_URL}${GET_ACTION_FETCH_ALL_SHEET}`
      );

      setAsyncData(res.data);
      setLocalData(res.data, true);
    } catch (error) {
      alert("SOMETHING WENT WRONG. PLEASE REFRESH THE PAGE.");
    }
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    console.log("SUBMITTED DATA", submitData);
  }, [submitData]);

  return (
    <section>
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-box">
        {tabs.map((tabName, index) => (
          <React.Fragment key={index}>
            <input
              type="radio"
              name="my_tabs_6"
              className="tab"
              aria-label={tabName}
              checked={currentGoodsTab === tabName}
              onChange={() => setCurrentGoodsTab(tabName)}
            />
            <div className="tab-content bg-base-100 border-base-300 p-6">
              {/* PASS DATA TO LISTITEMS */}
              {localData[tabName] ? (
                <ListItems />
              ) : (
                <div className="text-center skeleton skeleton-text">
                  Loading...
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
