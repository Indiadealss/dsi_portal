import React from 'react'

const Collapage = ({images = [], video = [], columns = 2, gap = 4}) => {

// console.log(images,video);

  
//   const items = images.map((item) => ({
//   title: item.type,
//   count: item.src.length || 0,
//   img: item.src,
//   video: item.video || false
// }));


if (!images || images.length === 0) {
  return <p>No images available</p>;
}



    const gridStyle = {
        gridTemplateColumns: `repeat(${Math.max(1,columns)}, minmax(0, 1fr))`,
        gap: `${gap * 0.25}rem`,
    };


    const fallbackImage = "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg";

const coverImages = images.filter((i) => i.type === "cover");
const outdoorImg = coverImages.length > 0 ? coverImages[0].src : fallbackImage;

const videoImg = video && video.length > 0 ? video[0].src : fallbackImage;
const videoCount = video && video.length > 0 ? video.length : 0;

const items = [
  {
    title: "All Photos & Videos",
    count: images.length + videoCount,
    img: images.length > 0 ? images[0].src : fallbackImage,
    large: true,
  },
  {
    title: "Videos",
    count: videoCount,
    img: videoImg,
    video: videoCount > 0, // ✅ only true if video exists
  },
  {
    title: "Outdoors",
    count: coverImages.length,
    img: outdoorImg,
  },
];


    
  return (
   <div className="grid grid-cols-3 gap-3 rounded overflow-hidden w-full max-w-5xl mx-auto">
      {/* Left large image */}
      <div className="relative col-span-2 aspect-[16/9] rounded shadow-xs overflow-hidden cursor-pointer group">
        <img
          src={items[0].img}
          alt={items[0].title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-3 left-3 text-white">
          <p className="font-semibold">{items[0].title}</p>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4h16v16H4V4z"
            />
          </svg>
          {items[0].count}
        </div>
      </div>

      {/* Right side stacked images */}
      <div className="flex flex-col gap-3">
        {items.slice(1).map((item, index) => (
          <div
            key={index}
            className="relative aspect-[16/9] rounded shadow-xs overflow-hidden cursor-pointer group"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Play icon for video */}
            {item.video && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/30 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Text overlay */}
            <div className="absolute bottom-3 left-3 text-white">
              <p className="font-semibold">{item.title}</p>
            </div>

            <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4h16v16H4V4z"
                />
              </svg>
              {item.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Collapage
