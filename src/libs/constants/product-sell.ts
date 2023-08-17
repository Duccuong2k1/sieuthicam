export const PRODUCT_BEST_SELL: {
  tab: string;
  title: string;
  listProduct: any[];
}[] = [
  {
    tab: "PIG",
    title: "Cám heo con",
    listProduct: [
      {
        title: "HP 01",
        id:"HP001",
        img: "/img/product/hp01.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn sữa từ 7 ngày tuổi đến 7kg",
        element: { feature: "", tutorial: "", nutrition: "" },
        tag: "SELL",
        amount: 500,
      },
      {
        title: "HP 02",
        id:"HP002",
        img: "/img/product/hp02.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn con từ 7kg đến 15kg",
        element: { feature: "", tutorial: "", nutrition: "" },
        tag: "SELL",
        discount: 10,
        amount: 70,
      },
      {
        title: "HP 02S",
        id:"HP02S",
        img: "/img/product/hp02s.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn con từ 12kg đến 25kg",
        element: { feature: "", tutorial: "", nutrition: "" },
        tag: "SELL",
        amount: 100,
      },
    ],
  },
  {
    tab: "CHICKEN",
    title: "Cám gà vịt",
    listProduct: [
      {
        title: "HP 20S",
        id:"HP020S",
        img: "/img/product/hp20.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho gà con từ 1 ngày đến 14 ngày tuổi",

        element: { feature: "", tutorial: "", nutrition: "" },
        tag: "SELL",
        discount: 10,
        amount: 100,
      },
      {
        title: "HP 22S",
        id:"HP022S",
        img: "/img/product/hp22s.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho gà siêu thịt từ 22 ngày đến 42 ngày tuổi",

        element: { feature: "", tutorial: "", nutrition: "" },
        tag: "SELL",
        amount: 130,
      },
      {
        title: "HP 23S",
        id:"HP023S",
        img: "/img/product/hp23s.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho gà siêu thịt từ 43 ngày đến xuất chuồng",

        element: { feature: "", tutorial: "", nutrition: "" },
        tag: "SELL",
        amount: 2200,
      },
      {
        title: "HP 40S",
        id:"HP040S",
        img: "/img/product/hp40s.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho vịt, ngan siêu thịt từ 1 ngày đến 21 ngày tuổi",

        element: { feature: "", tutorial: "", nutrition: "" },
        tag: "SELL",
        amount: 200,
      },
    ],
  },
  {
    tab: "RICE",
    title: "Gạo thơm lài",
    listProduct: [
      {
        title: "Thơm lài ",
        id:"HP0THOMLAI",
        img: "/img/product/gao-01.jpg",
        desc: "Loại gạo này có hạt thon dài, thơm hương lài và có giá cả phải chăng. Khi nấu lên thì mềm, dẻo, ngon cơm và dễ ăn.",
        element: { feature: "", tutorial: "", nutrition: "" },
        tag: "SELL",
        amount: 1400,
      },
      {
        title: "Gạo thơm dẻo",
        id:"HP0GAODEO",
        img: "/img/product/gao-02.jpg",
        desc: "Nguồn gốc của hầu hết các loại gạo thơm lài là từ giống gạo RVT, do nguyên Phó thủ tướng Nguyễn Công Tạn và cộng sự nhập nội và tuyển chọn.",
        element: { feature: "", tutorial: "", nutrition: "" },
        tag: "SELL",
        amount: 100,
      },
    ],
  },
];
