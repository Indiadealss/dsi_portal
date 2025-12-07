import { useEffect } from "react";
import "flowbite/dist/flowbite.min.js";

export default function RightDrawer() {
  useEffect(() => {
    import("flowbite/dist/flowbite.min.js");
  }, []);

  return (
    <>
      {/* Drawer Trigger */}
      <button
        data-drawer-target="drawer-right"
        data-drawer-show="drawer-right"
        data-drawer-placement="right"
        className="px-4 py-2 bg-blue-600 text-white"
      >
        Open Drawer
      </button>

      {/* Drawer */}
      <div
        id="drawer-right"
        className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80"
        tabIndex="-1"
      >
        <button
          data-drawer-hide="drawer-right"
          className="absolute top-2 right-2"
        >
          ❌
        </button>

        <h2 className="font-bold text-lg mb-4">Right Drawer</h2>
      </div>
    </>
  );
}
