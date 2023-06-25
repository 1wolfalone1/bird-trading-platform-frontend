import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import s from "./productSuggest.module.scss";
import HomeProductSlider from "../../../component/slider/product/HomeProductSlider";
import { useSelector } from "react-redux";
import { getTopProductsSelector } from "../../home/HomeSlice";
import clsx from "clsx";

export default function ProductSuggest() {
  const topProduct = [
    {
      id: 1,
      name: "Parrot",
      quantity: 6,
      imgUrl:
        "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/3a3a8a99-1f33-470d-8606-ad278dda9885.png",
      videoUrl:
        "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/video/5f45b1a7-ceeb-4d69-91bb-a4cbeac82695.mp4",
      price: 200.0,
      shopOwner: {
        id: 3,
        shopName: "Bookstore",
        imgUrl:
          "https://th.bing.com/th/id/OIP.neVEf30M3wEdnQ_EKs8QwQHaHa?pid=ImgDet&rs=1",
        address: {
          id: 3,
          address:
            "Rạch Xẽo Xình Ấp Bình Dân, Rạch Miễu, Nhị Mỹ, Cao Lãnh, Đồng Tháp, Vietnam",
        },
      },
      discountRate: 0.0,
      discountedPrice: 200.0,
      star: 0.0,
      description:
        "<p>.Parrots, also known as psittacines, are birds of four families that contain roughly 410 species in 101 genera. These make up the order Psittaciformes and are found mostly in tropical and subtropical regions. The four families are: Psittaculidae, the Psittacidae, the Cacatuoidea, and the Strigopidae</p>",
      age: 1,
      gender: "MALE",
      color: "red",
      type: {
        id: 2,
        name: "normal bird",
      },
      tags: [
        {
          id: 65,
          name: "Aviary",
        },
      ],
      categoryId: 1,
    },
    {
      id: 2,
      name: "Eurasian bullfinch",
      quantity: 20,
      imgUrl:
        "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/7d61c9df-4979-42af-b60c-43c50c316373.png",
      videoUrl:
        "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/video/7157c37a-a1a0-4b8b-8937-60889589ba34.mp4",
      price: 100.0,
      shopOwner: {
        id: 3,
        shopName: "Bookstore",
        imgUrl:
          "https://th.bing.com/th/id/OIP.neVEf30M3wEdnQ_EKs8QwQHaHa?pid=ImgDet&rs=1",
        address: {
          id: 3,
          address:
            "Rạch Xẽo Xình Ấp Bình Dân, Rạch Miễu, Nhị Mỹ, Cao Lãnh, Đồng Tháp, Vietnam",
        },
      },
      discountRate: 0.0,
      discountedPrice: 100.0,
      star: 0.0,
      description:
        '<p><span style="background-color: rgb(255, 255, 255); color: rgb(32, 33, 34);">The&nbsp;</span><strong style="background-color: rgb(255, 255, 255); color: rgb(32, 33, 34);">Eurasian bullfinch</strong><span style="background-color: rgb(255, 255, 255); color: rgb(32, 33, 34);">,&nbsp;</span><strong style="background-color: rgb(255, 255, 255); color: rgb(32, 33, 34);">common bullfinch</strong><span style="background-color: rgb(255, 255, 255); color: rgb(32, 33, 34);">&nbsp;or&nbsp;</span><strong style="background-color: rgb(255, 255, 255); color: rgb(32, 33, 34);">bullfinch</strong><span style="background-color: rgb(255, 255, 255); color: rgb(32, 33, 34);">&nbsp;(</span><strong style="background-color: rgb(255, 255, 255); color: rgb(32, 33, 34);"><em>Pyrrhula pyrrhula</em></strong><span style="background-color: rgb(255, 255, 255); color: rgb(32, 33, 34);">) is a small&nbsp;</span><a href="https://en.wikipedia.org/wiki/Passerine" rel="noopener noreferrer" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(51, 102, 204);">passerine</a><span style="background-color: rgb(255, 255, 255); color: rgb(32, 33, 34);">&nbsp;</span><a href="https://en.wikipedia.org/wiki/Bird" rel="noopener noreferrer" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(51, 102, 204);">bird</a><span style="background-color: rgb(255, 255, 255); color: rgb(32, 33, 34);">&nbsp;in the&nbsp;</span><a href="https://en.wikipedia.org/wiki/Finch" rel="noopener noreferrer" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(51, 102, 204);">finch</a><span style="background-color: rgb(255, 255, 255); color: rgb(32, 33, 34);">&nbsp;family, Fringillidae. In Anglophone Europe it is known simply as the&nbsp;</span><strong style="background-color: rgb(255, 255, 255); color: rgb(32, 33, 34);">bullfinch</strong><span style="background-color: rgb(255, 255, 255); color: rgb(32, 33, 34);">, as it is the original bird to bear the name bullfinch.</span></p>',
      age: 12,
      gender: "OTHER",
      color: "Red",
      type: {
        id: 4,
        name: "normal bird",
      },
      tags: [
        {
          id: 32,
          name: "BeautifulBirds",
        },
        {
          id: 46,
          name: "BirdArt",
        },
      ],
      categoryId: 1,
    },
    {
      id: 90001,
      name: "Melopsittacus Undulatus",
      quantity: 99,
      imgUrl:
        "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/26.jpg",
      videoUrl: "NULL",
      price: 45.0,
      shopOwner: {
        id: 2,
        shopName: "Electronics Store",
        imgUrl:
          "https://th.bing.com/th/id/R.aeaa38b7aa3046ce9086cc361c820b4c?rik=uVb%2bxcU7Xy6ZzA&pid=ImgRaw&r=0",
        address: {
          id: 2,
          address:
            "141 Đường Nguyễn Huệ, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
        },
      },
      discountRate: 0.08,
      discountedPrice: 41.4,
      star: 0.0,
      description:
        "Purchase Melopsittacus Undulatus, the charming and sociable budgerigar, to bring joy and vibrant beauty into your home.<br/>With their playful nature and ability to mimic sounds, these intelligent birds make wonderful companions for bird lovers of all ages.",
      age: 1,
      gender: "MALE",
      color: "Green",
      type: {
        id: 1,
        name: "beautiful bird",
      },
      tags: [
        {
          id: 34,
          name: "BirdLover",
        },
        {
          id: 35,
          name: "BirdLife",
        },
        {
          id: 36,
          name: "BirdPhotography",
        },
      ],
      categoryId: 1,
    },
    {
      id: 90004,
      name: "Erythrura Gouldiae",
      quantity: 11,
      imgUrl:
        "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/29.jpg",
      videoUrl: "NULL",
      price: 43.21,
      shopOwner: {
        id: 2,
        shopName: "Electronics Store",
        imgUrl:
          "https://th.bing.com/th/id/R.aeaa38b7aa3046ce9086cc361c820b4c?rik=uVb%2bxcU7Xy6ZzA&pid=ImgRaw&r=0",
        address: {
          id: 2,
          address:
            "141 Đường Nguyễn Huệ, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
        },
      },
      discountRate: 0.0,
      discountedPrice: 43.21,
      star: 0.0,
      description:
        "Erythrura gouldiae, commonly known as the Gouldian Finch, is available for purchase, offering a stunning display of vibrant colors and captivating beauty.<br/>These small and enchanting finches are highly sought after for their distinct plumage, showcasing a combination of bright red, green, yellow, and purple feathers.<br/>Known for their peaceful nature and melodious calls, Gouldian Finches make wonderful additions to aviaries or as pet companions, bringing a touch of elegance and serenity to any environment.",
      age: 1,
      gender: "MALE",
      color: "colorful",
      type: {
        id: 4,
        name: "normal bird",
      },
      tags: [
        {
          id: 43,
          name: "BirdHabitat",
        },
        {
          id: 44,
          name: "BirdConservation",
        },
        {
          id: 45,
          name: "BirdBehavior",
        },
      ],
      categoryId: 1,
    },
    {
      id: 90005,
      name: "Amandava Amandava",
      quantity: 74,
      imgUrl:
        "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/30.jpg",
      videoUrl: "NULL",
      price: 22.001,
      shopOwner: {
        id: 2,
        shopName: "Electronics Store",
        imgUrl:
          "https://th.bing.com/th/id/R.aeaa38b7aa3046ce9086cc361c820b4c?rik=uVb%2bxcU7Xy6ZzA&pid=ImgRaw&r=0",
        address: {
          id: 2,
          address:
            "141 Đường Nguyễn Huệ, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
        },
      },
      discountRate: 0.1,
      discountedPrice: 19.8,
      star: 0.0,
      description:
        "Amandava amandava, commonly known as the Red Munia or Strawberry Finch, is available for purchase, offering a charming and colorful addition to your avian collection.<br/>These small finches are named after the striking red plumage of the male, while the female exhibits a more subtle appearance with shades of brown and gray.<br/>Enjoy the delightful chirping and playful antics of these social birds, known for their energetic nature and their ability to bring liveliness and joy to any aviary or bird-friendly environment.",
      age: 2,
      gender: "FEMALE",
      color: "Red",
      type: {
        id: 5,
        name: "birds sing very well",
      },
      tags: [
        {
          id: 47,
          name: "BirdEducation",
        },
        {
          id: 48,
          name: "FeatheredBeauty",
        },
        {
          id: 46,
          name: "BirdArt",
        },
      ],
      categoryId: 1,
    },
    {
      id: 90006,
      name: "Garrulax Canorus",
      quantity: 31,
      imgUrl:
        "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/71.jpg",
      videoUrl: "NULL",
      price: 67.5,
      shopOwner: {
        id: 2,
        shopName: "Electronics Store",
        imgUrl:
          "https://th.bing.com/th/id/R.aeaa38b7aa3046ce9086cc361c820b4c?rik=uVb%2bxcU7Xy6ZzA&pid=ImgRaw&r=0",
        address: {
          id: 2,
          address:
            "141 Đường Nguyễn Huệ, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
        },
      },
      discountRate: 0.0,
      discountedPrice: 67.5,
      star: 0.0,
      description:
        "Garrulax canorus, commonly known as the Chinese Hwamei or Melodious Laughingthrush, is available for purchase, bringing enchanting melodies and captivating beauty to your home.<br/>These medium-sized songbirds are cherished for their remarkable vocal abilities, producing a diverse range of melodious and captivating calls.<br/>With their striking black and white plumage, expressive facial markings, and elegant posture, Chinese Hwamei birds make for stunning additions to aviaries or as pet companions, providing endless entertainment and a delightful auditory experience.",
      age: 3,
      gender: "MALE",
      color: "pale brown",
      type: {
        id: 1,
        name: "beautiful bird",
      },
      tags: [
        {
          id: 49,
          name: "BirdsInFlight",
        },
        {
          id: 50,
          name: "BirdWatchingAdventures",
        },
        {
          id: 51,
          name: "FeatheredCreatures",
        },
      ],
      categoryId: 1,
    },
    {
      id: 90037,
      name: "Strawberry Finch Male",
      quantity: 29,
      imgUrl:
        "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/30.jpg",
      videoUrl: null,
      price: 40.0,
      shopOwner: {
        id: 2,
        shopName: "Electronics Store",
        imgUrl:
          "https://th.bing.com/th/id/R.aeaa38b7aa3046ce9086cc361c820b4c?rik=uVb%2bxcU7Xy6ZzA&pid=ImgRaw&r=0",
        address: {
          id: 2,
          address:
            "141 Đường Nguyễn Huệ, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
        },
      },
      discountRate: 0.0,
      discountedPrice: 40.0,
      star: 0.0,
      description:
        "The male Strawberry Finch, with its vibrant red face and chest, is a captivating sight in the bird world. Its black and white stripes add a touch of elegance to its overall appearance.<br/>During the breeding season, the male Strawberry Finch showcases its dazzling plumage to attract a female mate. Its vivid red coloration is a symbol of vitality and reproductive fitness.<br/>In addition to its striking appearance, the male Strawberry Finch is known for its delightful chirping songs. These social birds are often found in small flocks or pairs, bringing cheerful melodies to their surroundings.",
      age: 1,
      gender: "MALE",
      color: "Red",
      type: {
        id: 3,
        name: "beautiful bird",
      },
      tags: [],
      categoryId: 1,
    },
    {
      id: 90044,
      name: "Sparrow",
      quantity: 47,
      imgUrl:
        "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/53.jpg",
      videoUrl: null,
      price: 21.0,
      shopOwner: {
        id: 3,
        shopName: "Bookstore",
        imgUrl:
          "https://th.bing.com/th/id/OIP.neVEf30M3wEdnQ_EKs8QwQHaHa?pid=ImgDet&rs=1",
        address: {
          id: 3,
          address:
            "Rạch Xẽo Xình Ấp Bình Dân, Rạch Miễu, Nhị Mỹ, Cao Lãnh, Đồng Tháp, Vietnam",
        },
      },
      discountRate: 0.05,
      discountedPrice: 19.95,
      star: 0.0,
      description:
        "These little birds are known for their small size, rounded bodies, and short, stout beaks. They typically have brown or gray plumage, often with streaks or patterns on their wings and backs.<br/>Their diet mainly consists of seeds, grains, and small insects. They forage on the ground, using their beaks to crack open seeds or catch insects in the grass.<br/>Sparrows are known for their cheerful chirping, and their songs are a common sound in gardens and parks. They build nests in trees, shrubs, or man-made structures, using grass, twigs, and feathers.",
      age: 2,
      gender: "MALE",
      color: "Brown",
      type: {
        id: 5,
        name: "birds sing very well",
      },
      tags: [],
      categoryId: 1,
    },
  ];

  return (
    <>
      <div className={clsx(s.container)}>
        <div className={clsx(s.content)}>
          {/* <HomeProductSlider
            products={topProduct}
            title={"Products related to this item"}
          /> */}
        </div>
      </div>
    </>
  );
}
