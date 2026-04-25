import React from "react";
import { useNavigate } from "react-router-dom";

const LeadsTable = ({ data }) => {
  // group data by projectname

    const navigate = useNavigate();
  console.log("LeadsTable data", data);
  const groupedData = data.reduce((acc, item) => {
    if (!item.projectname) return acc;

    acc[item.projectname] = (acc[item.projectname] || 0) + 1;
    return acc;
  }, {});

  const tableData = Object.entries(groupedData).map(([project, count]) => ({
    project,
    leads: count,
  }));

   const handleResponse = (id, item) => {
    navigate(`/mybrandsdoor/all_listings/responce/${id}`, {
      state: item
    });
    };
  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-700">
            Project Leads Summary
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-3">Project Name</th>
                <th className="px-6 py-3 text-center">Leads</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {item.project}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-semibold">
                      {item.leads}
                    </span>
                      <p><span className='text-sm cursor-pointer text-blue-500' onClick={() => handleResponse(item.id, item)}>Response</span></p>
                  </td>
                </tr>
              ))}

              {tableData.length === 0 && (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center py-6 text-gray-500"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadsTable;