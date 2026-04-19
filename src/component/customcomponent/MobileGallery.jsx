import { Carousel } from "antd";

const MobileGallery = ({ images = [] }) => {
  const validImages = images?.filter(
    (item) =>
      item?.src &&
      !item.src.toLowerCase().endsWith(".pdf")
  );

  if (!validImages.length) return null;

  return (
    <div className="w-full h-[220px] overflow-hidden rounded-xl">
      <Carousel autoplay dots>
        {validImages.map((item, index) => (
          <div key={index} className="h-[220px]">
            <img
              src={item.src}
              alt="property"
              className="w-full h-full object-cover"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MobileGallery;