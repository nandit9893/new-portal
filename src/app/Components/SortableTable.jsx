"use client";
import { useState } from "react";
import { FaSort } from "react-icons/fa";

const SortableTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);

  const initialData = [
    { id: 1, description: "Resume Making", paymentBy: "Stripe", amount: 2897, customerId: 26, paymentDate: "6/3/22" },
    { id: 2, description: "Resume Making", paymentBy: "Paypal", amount: 9387, customerId: 35, paymentDate: "12/2/22" },
    { id: 3, description: "Job Applied", paymentBy: "Paypal", amount: 402, customerId: 48, paymentDate: "4/19/23" },
    { id: 4, description: "Job Applied", paymentBy: "Paypal", amount: 276, customerId: 90, paymentDate: "1/2/23" },
    { id: 5, description: "Job Applied", paymentBy: "Stripe", amount: 276, customerId: 67, paymentDate: "9/4/23" },
    { id: 6, description: "Resume Making", paymentBy: "Stripe", amount: 1098, customerId: 35, paymentDate: "6/3/22" },
    { id: 7, description: "Job Applied", paymentBy: "Stripe", amount: 4298, customerId: 48, paymentDate: "12/2/22" },
    { id: 8, description: "Resume Making", paymentBy: "Stripe", amount: 1928, customerId: 90, paymentDate: "4/19/23" },
    { id: 9, description: "Resume Making", paymentBy: "Stripe", amount: 640, customerId: 67, paymentDate: "1/2/23" },
  ];

  const [data, setData] = useState(initialData);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className="bg-green-100 p-4 md:p-6 rounded-xl w-full mx-auto mt-6 shadow-lg">
      <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-4 uppercase tracking-wider">
        Details
      </h2>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl overflow-hidden shadow-md">
          <thead className="bg-green-200 text-gray-700">
            <tr>
              <th className="p-2 md:p-3"></th> {/* Checkbox Column */}
              {["description", "paymentBy", "amount", "customerId", "paymentDate"].map((key) => (
                <th key={key} className="p-2 md:p-3 text-left">
                  <button
                    onClick={() => handleSort(key)}
                    className="bg-white px-2 md:px-3 py-1 rounded-lg shadow-md flex items-center space-x-2 text-sm md:text-base"
                  >
                    <span className="capitalize font-semibold">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <FaSort className="text-xs md:text-sm" />
                  </button>
                </th>
              ))}
              <th className="p-2 md:p-3 text-left font-semibold">Options</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-gray-800 hover:bg-gray-100 transition">
                <td className="p-2 md:p-3 text-center">
                  <label className="cursor-pointer relative">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="hidden"
                    />
                    <span
                      className={`w-4 h-4 md:w-5 md:h-5 inline-block rounded-full border-2 border-gray-500 transition-all duration-200 ${
                        selectedRows.includes(item.id)
                          ? "bg-green-300 border-green-300 shadow-md"
                          : "bg-white"
                      }`}
                    ></span>
                  </label>
                </td>
                <td className="p-2 md:p-3 text-sm md:text-base">{item.description}</td>
                <td className="p-2 md:p-3 text-sm md:text-base">{item.paymentBy}</td>
                <td className="p-2 md:p-3 text-sm md:text-base">{item.amount.toLocaleString()}</td>
                <td className="p-2 md:p-3 text-sm md:text-base">{item.customerId}</td>
                <td className="p-2 md:p-3 text-sm md:text-base">{item.paymentDate}</td>
                <td className="p-2 md:p-3 text-sm md:text-base">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SortableTable;