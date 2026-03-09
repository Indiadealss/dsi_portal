import React from "react";

const ResponseList = ({ data }) => {

  console.log(data,'faskdjjn');
  

  const leads = data || [];
  console.log(leads);

  const handleDownload = () => {

  const headers = [
    "Name",
    "PhoneNumber",
    "LeadIdentity",
    "Project",
    "Purpose",
    "Date"
  ];

  const rows = leads.map(item => [
    item.Name,
    item.PhoneNumber,
    item.leadIdentity,
    item.projectname,
    item.purpose,
    new Date(item.createdAt).toLocaleDateString()
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows]
      .map(e => e.join(","))
      .join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "leads.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  

  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <div>
          <span>All Responses</span>
        </div>
      <button onClick={handleDownload} className="mb-3 bg-gray-600 px-5 text-white cursor-pointer">Download</button>
      </div>
      {leads.map((item, index) => (

        <div
          key={item._id}
          className="shadow-md rounded p-4 mb-3 flex justify-between"
        >

          {/* Left Section */}
          <div>

            <h3 className="font-semibold">
              {item.Name}
              <span className="text-gray-500 ml-1">
                (Individual)
              </span>
            </h3>

            <p className="text-sm text-gray-600">
              +91-{item.PhoneNumber}
            </p>

            <p className="text-sm text-blue-600">
              {item.purpose}
            </p>

          </div>


          {/* Middle Section */}
          <div>

            <p className="text-yellow-500 font-semibold">
              ⭐ 3.5
            </p>

            <p className="text-sm text-gray-600">
              Query on{" "}
              {new Date(item.createdAt).toLocaleDateString()}
            </p>

          </div>


          {/* Right Section */}
          <div className="text-right">

            <p className="font-medium">
              X{item.npxid}
              <span className="text-red-500 ml-2">
                Expired
              </span>
            </p>

            <p className="text-sm text-gray-600">
              {item.projectname}
            </p>

          </div>

        </div>

      ))}

    </div>
  );
};

export default ResponseList;