import React from "react";
import { useEffect, useState } from "react";
import { BASE_API_URL, GET_ACTION_FETCH_ALL_SHEET } from "../data/links";
import axios from "axios";
import ListItems from "./ListItems";
import useFinishedGoodsStore from "../stores/db";
import { Link } from "react-router-dom";

const tabs = [
  "FINISHED GOODS BIHON",
  "FINISHED GOODS SF1",
  "FINISHED GOODS SF2",
  "CORNSTARCH STOCKS",
  "FINISHED GOODS 3M WHS",
  "KINGSFORTH",
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
  const [showAlert, setShowAlert] = useState(true);

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
                <>
                  {showAlert && (
                    <div
                      role="alert"
                      className="alert alert-vertical sm:alert-horizontal mb-6"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-info h-6 w-6 shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <div>
                        <h3 className="font-bold">Add New Finished Good</h3>
                        <div className="text-xs">
                          Don't see the item you need? Add it to your finished
                          goods list so you can manage and monitor it
                          effectively.
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center gap-4">
                        <button
                          onClick={() => setShowAlert(false)}
                          className="btn btn-sm"
                        >
                          Close
                        </button>
                        <Link to={"https://forms.gle/nt45b4Z66tUdu8ZU6"}>
                          <button className="btn btn-sm btn-primary">
                            Add Item
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                  <ListItems />
                </>
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
