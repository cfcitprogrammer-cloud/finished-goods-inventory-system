import { useEffect } from "react";
import useFinishedGoodsStore from "../stores/db";

export default function ConfirmModal({
  handleSubmit,
  showModal,
  closeModal,
  isSubmitting,
}) {
  const { submitData } = useFinishedGoodsStore();

  function onSubmit() {
    handleSubmit().then(() => {
      closeModal();
    });
  }

  useEffect(() => {
    console.log("MODAL DATA:", submitData);
  }, [submitData]);

  if (!showModal) return null;

  const excludedFields = ["AS OF", "TAGS"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg max-h-[85vh] overflow-y-auto w-[90%] max-w-5xl shadow-xl">
        <h1 className="text-2xl font-bold">Heads Up</h1>
        <p>Confirm the final tally before submitting.</p>
        <br />

        {/* LOOP OVER CATEGORY GROUPS */}
        {Object.entries(submitData).map(([category, items]) => (
          <div key={category} className="mb-10">
            <h2 className="text-xl font-semibold mb-2">{category}</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm table table-sm">
                <thead className="bg-gray-100">
                  <tr>
                    {items.length > 0 &&
                      Object.keys(items[0])
                        .filter((header) => !excludedFields.includes(header))
                        .map((header) => (
                          <th
                            key={header}
                            className="border border-gray-300 p-2"
                          >
                            {header}
                          </th>
                        ))}
                  </tr>
                </thead>

                <tbody>
                  {items.length > 0 ? (
                    items.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        {Object.entries(row)
                          .filter(([key]) => !excludedFields.includes(key))
                          .map(([key, value], i) => (
                            <td key={i} className="border border-gray-300 p-2">
                              {value}
                            </td>
                          ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={100} className="text-center p-2">
                        No items to display
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={closeModal} className="btn btn-secondary btn-sm">
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className={`btn btn-primary btn-sm ${
              isSubmitting && "btn-disabled"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="loading loading-bars loading-sm"></span>
            )}
            Confirm Submit
          </button>
        </div>
      </div>
    </div>
  );
}
