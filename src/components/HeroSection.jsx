import { useCardAPI } from "../utils/hooks/useRestaurantMenu";
import Slider from "react-slick";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";

const CustomPrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    style={{ position: "absolute", left: 0, zIndex: 1 }}
  >
    <ArrowBackIos />
  </IconButton>
);

const CustomNextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    style={{ position: "absolute", right: 0, zIndex: 1 }}
  >
    <ArrowForwardIos />
  </IconButton>
);

const HeroSection = () => {
  const { resData } = useCardAPI();

  const HeroData = resData?.data?.cards[0]?.card?.card?.imageGridCards?.info;
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="px-4 py-2">
      <h2 className="font-bold py-1 text-2xl">What's on your mind?</h2>
      <Slider {...settings}>
        {HeroData?.map((item) => {
          const Entity = item.action.link.split("?")[1];
          // console.log(Entity);
          return (
            <Link
              to={`/heromenu?${Entity}`}
              key={item?.id}
            >
              <div key={item?.id} className="cursor-pointer">
                <img
                  className="w-[150px] h-auto mx-auto "
                  src={
                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
                    item?.imageId
                  }
                  alt={item?.altText}
                />
               
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

export default HeroSection;
