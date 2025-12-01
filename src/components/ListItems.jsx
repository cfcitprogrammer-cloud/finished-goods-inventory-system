import { useEffect, useState } from "react";
import useFinishedGoodsStore from "../stores/db";
import { BASE_API_URL } from "../data/links";
import axios from "axios";
import ConfirmModal from "./ConfirmModal";

export default function ListItems() {
  const {
    asyncData,
    submitData,
    mergeSubmitData,
    localData,
    setLocalData,
    setSubmitData,
    currentGoodsTab,
    resetData,
  } = useFinishedGoodsStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Merge localData into submitData whenever localData changes
  useEffect(() => {
    console.log("Local Data", localData);
  }, [localData]);

  // Handle changes in input fields
  function handleLocalChange(e, category, index, field) {
    const value = e.target.value;

    const updated = { ...localData };
    updated[category] = [...updated[category]];
    updated[category][index] = { ...updated[category][index] };
    updated[category][index][field] = value;

    setLocalData(updated);
  }

  // Reset local data
  function handleReset() {
    setSearchTerm(""); // clear search
    resetData(false);
  }

  // Handle submit
  async function handleLocalSubmit() {
    console.log(submitData);
    setIsSubmitting(true);

    try {
      // Send the POST request to the Google Apps Script Web App
      const response = await axios.post(
        BASE_API_URL,
        JSON.stringify(submitData),
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      // Handle the response from the Google Apps Script Web App
      console.log("Response from Google Apps Script:", response.data);

      if (response.data?.ok) {
        alert("Data submitted successfully!");
      } else {
        alert("There was an error submitting your data. Please try again.");
      }

      handleReset();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("There was an error submitting your data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle search input
  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  function closeModal() {
    setShowModal(false);
  }

  // Filter items based on search term
  const filteredItems =
    localData[currentGoodsTab]?.filter((item) =>
      item.ITEM.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div>
      <ConfirmModal
        handleSubmit={handleLocalSubmit}
        showModal={showModal}
        closeModal={closeModal}
        isSubmitting={isSubmitting}
      />
      <header className="flex gap-4">
        <input
          type="text"
          className="input input-sm flex-1"
          placeholder="Search Goods"
          value={searchTerm}
          onChange={handleSearch}
        />

        <div className="space-x-2">
          <button className="btn btn-secondary btn-sm" onClick={handleReset}>
            Reset
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowModal(true)}
          >
            Submit
          </button>
        </div>
      </header>

      <div className="mt-4">
        {filteredItems.length > 0 ? (
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-2">{currentGoodsTab}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item, index) => {
                const allowedFields = item.TAGS
                  ? item.TAGS.split(",").map((t) => t.trim().toUpperCase())
                  : [];

                return (
                  <div
                    key={index}
                    className="border rounded p-3 mb-3 bg-base-200 flex flex-col justify-between"
                  >
                    <div className="font-semibold">{item.ITEM}</div>

                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {allowedFields.map((field) => (
                        <div key={field}>
                          <label className="text-xs opacity-70">{field}</label>

                          <input
                            type="number"
                            value={item[field]}
                            onChange={(e) =>
                              handleLocalChange(
                                e,
                                currentGoodsTab,
                                index,
                                field
                              )
                            }
                            className="input input-sm input-bordered w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
}
