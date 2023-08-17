export const PRODUCT_POPULAR: {
  tab: string;
  title: string;
  imgTab: string;
  listProduct: any[];
}[] = [
  {
    tab: "FOR_YOU",
    title: "Dành cho bạn",
    imgTab: "/img/tab-1.png",

    listProduct: [
      {
        title: "HP 01",
        id:"HP001",
        img: "/img/product/hp01.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn sữa từ 7 ngày tuổi đến 7kg",
        element: {
          feature: `
          - Nguyên liệu sữa lactsoe thay thế nguồn sữa mẹ, heo dễ tập ăn
          - Tăng cường hoạt chất hỗ trợ đường ruột tăng khả năng tiêu hóa và hấp thu dưỡng chất
          - Bổ sung nguồn flavonoid tự nhiên giúp chống oxy hóa và chống viêm cao
          - Heo con khỏe mạnh, tăng trọng nhanh. Hạn chế tiêu chảy
          - Giảm stress khi thay đổi từ sữa qua thức ăn tập ăn
        `,
          tutorial: `
          - Dùng cho lợn sữa từ 7 ngày đến 7kg.
          - Cho ăn nhiều lần trong ngày, không cần pha trộn với các loại nguyên liệu khác.
          - Cung cấp đầy đủ nước uống sạch và mát cho vật nuôi.
          - Màu sắc sản phẩm thay đổi không ảnh hưởng đến chất lượng sản phẩm.
        `,
          nutrition: `
        
          Độ ẩm (max) % 14
          Năng lượng TĐ (min) Kcal/kg 3400
          Protein thô (min) % 20
          Xơ thô (max) % 5
          Canxi (min-max) % 0.5-1.5
          Phospho tổng số (min- max) % 0.4-1.4
          Lysine tổng số (min) % 1.3
          Methionine + cystine tổng số (min) % 0.75
        `,
        },
        discount: 20,
      },
      {
        title: "HP 01 plus",
        id:"HP001PLUS",
        img: "/img/product/hp01plus.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn từ tập ăn đến 18 ngày tuổi",
        element: {
          feature: `
              - Nguyên liệu sữa lactsoe thay thế nguồn sữa mẹ, heo dễ tập ăn
              - Tăng cường hoạt chất hỗ trợ đường ruột tăng khả năng tiêu hóa và hấp thu dưỡng chất
              - Bổ sung nguồn flavonoid tự nhiên giúp chống oxy hóa và chống viêm cao
              - Heo con khỏe mạnh, tăng trọng nhanh. Hạn chế tiêu chảy
              - Giảm stress khi thay đổi từ sữa qua thức ăn tập ăn
              - Protein pedtide mạch ngắn -> hấp thu tối ưu, tăng cường hệ tiêu hóa
          `,
          tutorial: `
              - Dùng cho lợn từ tập ăn đến 18 ngày tuổi.
              - Cho ăn nhiều lần trong ngày, không cần pha trộn với các loại nguyên liệu khác.
              - Cung cấp đầy đủ nước uống sạch và mát cho vật nuôi.
              - Màu sắc sản phẩm thay đổi không ảnh hưởng đến chất lượng sản phẩm.
          `,
          nutrition: `
          
               Độ ẩm (max) % 14
              Năng lượng TĐ (min) Kcal/kg 3800
              Protein thô (min) % 19
              Xơ thô (max) % 5
              Canxi (min-max) % 0.4-1.5
              Phospho tổng số (min- max) % 0.3-1.4
              Lysine tổng số (min) % 1.4
              Methionine + cystine tổng số (min) % 0.8
          `,
        },
        discount: 20,
      },
      {
        title: "HP 01S",
        img: "/img/product/hp01s-1.png",
        id:"HP001S",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn từ tập ăn đến 20kg",
        element: {
          feature: `- Nguyên liệu sữa lactsoe thay thế nguồn sữa mẹ, heo dễ tập ăn
        - Tăng cường hoạt chất hỗ trợ đường ruột tăng khả năng tiêu hóa và hấp thu dưỡng chất
        - Bổ sung nguồn flavonoid tự nhiên giúp chống oxy hóa và chống viêm cao
        - Heo con khỏe mạnh, tăng trọng nhanh. Hạn chế tiêu chảy
        - Giảm stress khi thay đổi từ sữa qua thức ăn tập ăn`,
          tutorial: `
        - Dùng cho lợn từ tập ăn đến 20kg.
        - Cho ăn nhiều lần trong ngày, không cần pha trộn với các loại nguyên liệu khác.
        - Cung cấp đầy đủ nước uống sạch và mát cho vật nuôi.
        - Màu sắc sản phẩm thay đổi không ảnh hưởng đến chất lượng sản phẩm.
        `,
          nutrition: `
                    Độ ẩm (max) % 14
            Năng lượng TĐ (min) Kcal/kg 3400
            Protein thô (min) % 19,5
            Xơ thô (max) % 5
            Canxi (min-max) % 0.5-1.5
            Phospho tổng số (min- max) % 0.4-1.4
            Lysine tổng số (min) % 1.3
            Methionine + cystine tổng số (min) % 0.75
        `,
        },
        discount: 10,
      },
      {
        title: "HP 02",
        id:"HP002",
        img: "/img/product/hp02.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn con từ 7kg đến 15kg",
        element: {
          feature: `- Bổ sung nguồn khoáng hữu cơ có tính sinh khả dụng cao, giúp hấp thu tối đa khoáng chất vào cơ thể
        - Cung cấp nguồn photpho từ nấm men giúp tăng cường photpho tích lũy trong xương, cân bằng photpho tiêu hóa và canxi
        - Bổ sung hoạt chất phòng bệnh tiêu hóa, hô hấp tăng đề kháng
        - Heo con lớn nhanh, đồng đều
        - Phát triển tối ưu khung xương
        - Hạn chế tiêu chảy, hô hấp tối đa`,
          tutorial: "",
          nutrition: "",
        },
        discount: 10,
      },
      {
        title: "HP 02A",
        id:"HP002S",
        img: "/img/product/hp02a.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho heo con từ 7 kg đến 20 kg",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 10,
      },
      {
        title: "HP 02S",
        id:"HP002S",
        img: "/img/product/hp02s.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn con từ 12kg đến 25kg",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 11,
      },
      {
        title: "HP 03",
        id:"HP003",
        img: "/img/product/hp03.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn thịt từ 15 kg đến 30 kg",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 14,
      },
      {
        title: "HP 03S",
        id:"HP003S",
        img: "/img/product/hp03s.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn thịt siêu nạc từ 15kg đến 45kg",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 16,
      },
      {
        title: "HP 05",
        id:"HP005",
        img: "/img/product/hp05.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn lai từ 20kg đến 70kg",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 15,
      },
      {
        title: "HP 06",
        id:"HP006",
        img: "/img/product/hp06.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn nái mang thai",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 15,
      },
      {
        title: "HP 07",
        id:"HP007",
        img: "/img/product/hp07.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn nái nuôi con",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 20,
      },
      {
        title: "HP 07S PLUS",
        id:"HP007PLUS",
        img: "/img/product/hp07s-plus.jpg",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn nái nuôi con",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 12,
      },
      {
        title: "HP 10",
        id:"HP010",
        img: "/img/product/hp10.png",
        desc: "Cho heo thịt từ 5kg đến xuất chuồng",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 10,
      },
      {
        title: "HP 20s",
        id:"HP020S",
        img: "/img/product/hp20.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho gà con từ 1 ngày đến 14 ngày tuổi",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 10,
      },
      {
        title: "HP 22S",
        id:"HP022S",
        img: "/img/product/hp22s.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho gà siêu thịt từ 22 ngày đến 42 ngày tuổi",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 20,
      },
      {
        title: "HP 23S",
        id:"HP023S",
        img: "/img/product/hp23s.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho gà siêu thịt từ 43 ngày đến xuất chuồng",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 10,
      },
      {
        title: "HP 40S",
        id:"HP040S",
        img: "/img/product/hp40s.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho vịt, ngan siêu thịt từ 1 ngày đến 21 ngày tuổi",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 10,
      },
      {
        title: "HP 41S",
        id:"HP041S",
        img: "/img/product/hp41s.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho vịt, ngan siêu thịt từ 22 ngày đến xuất chuồng",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 10,
      },
      {
        title: "HP 62",
        id:"HP062",
        img: "/img/product/hp62.png",
        desc: "Thức ăn tinh hỗn hợp cho bò thịt",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 10,
      },
    ],
  },
  {
    tab: "SELL_DAY",
    title: "Rẻ mỗi ngày",
    imgTab: "/img/tab-2.png",

    listProduct: [
      {
        title: "HP 20s",
        id:"HP020S",
        img: "/img/product/hp20.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho gà con từ 1 ngày đến 14 ngày tuổi",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 25,
      },
      {
        title: "HP 62",
        id:"HP062",
        img: "/img/product/hp62.png",
        desc: "Thức ăn tinh hỗn hợp cho bò thịt",

        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 10,
      },
      {
        title: "HP 22S",
        id:"HP022S",
        img: "/img/product/hp22s.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho gà siêu thịt từ 22 ngày đến 42 ngày tuổi",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 20,
      },
      {
        title: "HP 03",
        id:"HP003",
        img: "/img/product/hp03.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn thịt từ 15 kg đến 30 kg",

        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 14,
      },
      {
        title: "HP 03S",
        id:"HP003S",
        img: "/img/product/hp03s.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn thịt siêu nạc từ 15kg đến 45kg",

        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 14,
      },
      {
        title: "HP 10",
        id:"HP010",
        img: "/img/product/hp10.png",
        desc: "Cho heo thịt từ 5kg đến xuất chuồng",

        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 10,
      },
    ],
  },
  {
    tab: "BUY",
    title: "Mua 5 tặng 1",
    imgTab: "/img/tab-3.png",

    listProduct: [
      {
        title: "Thơm lài ",
        id:"HP0THOMLAI",
        img: "/img/product/gao-01.jpg",
        desc: "Loại gạo này có hạt thon dài, thơm hương lài và có giá cả phải chăng. Khi nấu lên thì mềm, dẻo, ngon cơm và dễ ăn.",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 15,
      },
      {
        title: "Gạo thơm dẻo",
        id:"HP0GAODEO",
        img: "/img/product/gao-02.jpg",
        desc: "Nguồn gốc của hầu hết các loại gạo thơm lài là từ giống gạo RVT, do nguyên Phó thủ tướng Nguyễn Công Tạn và cộng sự nhập nội và tuyển chọn.",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 15,
      },
      {
        title: "HP 41S",
        id:"HP041S",
        img: "/img/product/hp41s.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho vịt, ngan siêu thịt từ 22 ngày đến xuất chuồng",

        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 15,
      },
      {
        title: "HP 02",
        id:"HP002",
        img: "/img/product/hp02.png",
        desc: "Thức ăn hỗn hợp hoàn chỉnh cho lợn con từ 7kg đến 15kg",
        element: { feature: "", tutorial: "", nutrition: "" },
        discount: 10,
      },
    ],
  },
];
