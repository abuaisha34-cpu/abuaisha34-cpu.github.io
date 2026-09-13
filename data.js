const EVT_SEED = {
  company: {
    name: "ПП «Ефективна відгодівля тварин-Захід»",
    short: "ЕВТ Захід",
    brand: "Грінфід",
    edrpou: "33420204",
    address: "80462, Львівська обл., Львівський р-н, с. Дідилів, вул. Шевченка, 32а",
    phone: "+380 67 673 10 13",
    email: "evtwestlviv@gmail.com",
    capacityT: 500,
    founded: 2005
  },
  users: [
    { id: "u1", name: "Едуард Рубінштейн", role: "Директор", login: "director", pass: "evt2026" },
    { id: "u2", name: "Ольга Шевчик", role: "Головний бухгалтер", login: "finance", pass: "evt2026" },
    { id: "u3", name: "Тарас Коваль", role: "Технолог виробництва", login: "tech", pass: "evt2026" },
    { id: "u4", name: "Ірина Мельник", role: "Ветконсультант", login: "vet", pass: "evt2026" }
  ],
  products: [
    { id: "p1", sku: "GF-BR-ST", name: "Грінфід Бройлер Старт", type: "Готовий корм", species: "Бройлери", pack: "25 кг", price: 16800, stock: 42.5, unit: "т", min: 15 },
    { id: "p2", sku: "GF-BR-GR", name: "Грінфід Бройлер Гровер", type: "Готовий корм", species: "Бройлери", pack: "25 кг", price: 15950, stock: 61.2, unit: "т", min: 20 },
    { id: "p3", sku: "GF-BR-FI", name: "Грінфід Бройлер Фініш", type: "Готовий корм", species: "Бройлери", pack: "25 кг", price: 15200, stock: 38.0, unit: "т", min: 15 },
    { id: "p4", sku: "GF-SW-ST", name: "Грінфід Свині Старт", type: "Готовий корм", species: "Свині", pack: "25 кг", price: 17400, stock: 18.4, unit: "т", min: 12 },
    { id: "p5", sku: "GF-SW-FT", name: "Грінфід Свині Відгодівля", type: "Готовий корм", species: "Свині", pack: "25 кг", price: 14650, stock: 54.8, unit: "т", min: 20 },
    { id: "p6", sku: "GF-PX-BR5", name: "Премікс Бройлер 5%", type: "Премікс", species: "Бройлери", pack: "25 кг", price: 28600, stock: 9.6, unit: "т", min: 8 },
    { id: "p7", sku: "GF-CN-SW30", name: "Концентрат Свині 30%", type: "Концентрат", species: "Свині", pack: "25 кг", price: 22100, stock: 14.2, unit: "т", min: 10 }
  ],
  materials: [
    { id: "m1", name: "Кукурудза фуражна", stock: 186, unit: "т", min: 80 },
    { id: "m2", name: "Пшениця фуражна", stock: 94, unit: "т", min: 40 },
    { id: "m3", name: "Шрот соєвий 46%", stock: 41, unit: "т", min: 25 },
    { id: "m4", name: "Олія соєва", stock: 6.8, unit: "т", min: 4 },
    { id: "m5", name: "Монокальційфосфат", stock: 3.1, unit: "т", min: 2 },
    { id: "m6", name: "Премікс-база вітаміни/мікро", stock: 2.4, unit: "т", min: 1.5 },
    { id: "m7", name: "Лізин / метіонін / треонін", stock: 1.1, unit: "т", min: 0.8 }
  ],
  recipes: [
    { id: "r1", productId: "p1", name: "Старт Cobb/Ross 0–10 д", yield: 10, lines: [
      { materialId: "m1", kg: 5200 }, { materialId: "m2", kg: 1400 }, { materialId: "m3", kg: 2600 },
      { materialId: "m4", kg: 280 }, { materialId: "m5", kg: 120 }, { materialId: "m6", kg: 280 }, { materialId: "m7", kg: 120 }
    ]},
    { id: "r2", productId: "p2", name: "Гровер 11–24 д", yield: 10, lines: [
      { materialId: "m1", kg: 5800 }, { materialId: "m2", kg: 1500 }, { materialId: "m3", kg: 2000 },
      { materialId: "m4", kg: 250 }, { materialId: "m5", kg: 100 }, { materialId: "m6", kg: 250 }, { materialId: "m7", kg: 100 }
    ]},
    { id: "r3", productId: "p5", name: "Свині відгодівля 30–110 кг", yield: 10, lines: [
      { materialId: "m1", kg: 6200 }, { materialId: "m2", kg: 1800 }, { materialId: "m3", kg: 1500 },
      { materialId: "m4", kg: 180 }, { materialId: "m5", kg: 80 }, { materialId: "m6", kg: 180 }, { materialId: "m7", kg: 60 }
    ]}
  ],
  clients: [
    { id: "c1", name: "ФГ «Діброва»", region: "Львівська", contact: "Петро Гаврилюк", phone: "+380 67 221 44 18", species: "Бройлери", heads: 42000, status: "активний" },
    { id: "c2", name: "ТОВ «Агро-Птах Захід»", region: "Тернопільська", contact: "Оксана Береза", phone: "+380 68 903 11 27", species: "Бройлери", heads: 86000, status: "активний" },
    { id: "c3", name: "СФГ «Колос-Плюс»", region: "Хмельницька", contact: "Ігор Савчук", phone: "+380 50 412 77 03", species: "Свині", heads: 2400, status: "активний" },
    { id: "c4", name: "ФГ «Ясне Поле»", region: "Вінницька", contact: "Марія Литвин", phone: "+380 97 655 20 41", species: "Бройлери", heads: 28000, status: "на паузі" },
    { id: "c5", name: "ПП «Свинокомплекс Буг»", region: "Львівська", contact: "Василь Крук", phone: "+380 63 118 90 55", species: "Свині", heads: 5100, status: "активний" }
  ],
  batches: [
    { id: "b1", date: "2026-09-11", recipeId: "r2", productId: "p2", tons: 20, status: "завершено", operator: "Тарас Коваль" },
    { id: "b2", date: "2026-09-12", recipeId: "r1", productId: "p1", tons: 12, status: "завершено", operator: "Тарас Коваль" },
    { id: "b3", date: "2026-09-13", recipeId: "r3", productId: "p5", tons: 16, status: "в роботі", operator: "Тарас Коваль" }
  ],
  orders: [
    { id: "o1", date: "2026-09-08", clientId: "c2", productId: "p2", tons: 24, price: 15950, status: "відвантажено", invoice: "РН-0841" },
    { id: "o2", date: "2026-09-10", clientId: "c1", productId: "p1", tons: 10, price: 16800, status: "відвантажено", invoice: "РН-0847" },
    { id: "o3", date: "2026-09-12", clientId: "c5", productId: "p5", tons: 18, price: 14650, status: "підтверджено", invoice: "РН-0852" },
    { id: "o4", date: "2026-09-13", clientId: "c3", productId: "p7", tons: 6, price: 22100, status: "нове", invoice: "—" }
  ],
  leads: [
    { id: "l1", date: "2026-09-10", name: "Андрій Палій", farm: "ФГ «Нива-Захід»", phone: "+380 67 440 12 90", need: "Бройлер старт + гровер, 40 тис. голів", status: "новий" }
  ],
  tickets: [
    { id: "t1", date: "2026-09-12", clientId: "c2", topic: "Cobb 500, 19 діб — падіж 0,9%/доб, водянистий послід", status: "відкрито", owner: "Ірина Мельник" },
    { id: "t2", date: "2026-09-09", clientId: "c1", topic: "Корекція старту після зміни партії кукурудзи", status: "закрито", owner: "Тарас Коваль" },
    { id: "t3", date: "2026-09-11", clientId: "c3", topic: "Поросята 8 кг — низький приріст на старті", status: "в роботі", owner: "Ірина Мельник" }
  ],
  finance: [
    { id: "f1", date: "2026-09-08", type: "дохід", article: "Реалізація кормів", amount: 382800, note: "РН-0841" },
    { id: "f2", date: "2026-09-10", type: "дохід", article: "Реалізація кормів", amount: 168000, note: "РН-0847" },
    { id: "f3", date: "2026-09-06", type: "витрата", article: "Сировина: шрот соєвий", amount: 214500, note: "Партія №С-441" },
    { id: "f4", date: "2026-09-04", type: "витрата", article: "Газ / електроенергія заводу", amount: 47800, note: "Серпень" },
    { id: "f5", date: "2026-09-02", type: "витрата", article: "Зарплата виробництва", amount: 186400, note: "Аванс вересень" }
  ]
};
