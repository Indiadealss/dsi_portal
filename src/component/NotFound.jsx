import Seo from "./Seo";

const NotFound = () => {
  return (
    <>
    <Seo
        title='404 Not Fount'
        canonical={window.location.href}
        description=' '
      />
    <div className=" min-h-screen bg-white flex flex-col items-center justify-start pt-16">
      
      {/* Title */}
      <h1 className="text-4xl font-semibold text-black">
        404 Not Found
      </h1>

      {/* Line */}
      <hr className="w-full border-gray-300 mt-4" />

      {/* nginx text */}
      <p className="mt-4 text-gray-600 text-lg">
        nginx
      </p>

    </div>
    </>
  );
};

export default NotFound;