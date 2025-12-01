import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL, GET_ACTION_FETCH_MASTER_DB } from "../data/links";
import LoadingSkeleton from "./LoadingSkeleton";
import { getFormattedDateNow } from "../utils/datetime";

export default function MasterDB() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMasterDB();
  }, []);

  async function fetchMasterDB() {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_API_URL}${GET_ACTION_FETCH_MASTER_DB}`
      );

      console.log(res.data);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      alert("SOMETHING WENT WRONG. PLEASE REFRESH THE PAGE.");
    }
  }

  return (
    <>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <section>
          <header>
            <h1 className="font-bold text-2xl">Master Database</h1>
            <p className="text-sm text-gray-700">
              All finished goods in total. Please refresh to see updated data.
            </p>
            <p className="text-light italic text-gray-500">
              Updated as of {getFormattedDateNow()}
            </p>
            <br />
          </header>

          <div>
            {data.map((group, index) => {
              const items = group.items;

              if (!items || items.length === 0) return null;

              let columns = Object.keys(items[0]);

              columns = columns.filter(
                (col) =>
                  col.toUpperCase() !== "AS OF" && col.toUpperCase() !== "TAGS"
              );

              return (
                <div key={index} className="mb-96">
                  <h2 className="text-lg font-semibold sticky top-0 z-40 bg-black text-white p-4">
                    {group.goodsName}
                  </h2>

                  <table className="table">
                    <thead>
                      <tr>
                        {columns.map((col, idx) => (
                          <th
                            key={idx}
                            className="sticky top-14 z-40 bg-orange-300"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {items.map((item, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-base-300">
                          {columns.map((col, colIndex) => (
                            <td className="font-semibold" key={colIndex}>
                              {item[col]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
