export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "株式会社創和経営コンサルティング",
  url: "https://furumachi-smec.lognowa.com/public/lp",
  logo: "https://furumachi-smec.lognowa.com/public/lp/assets/logo.png",
  description: "福岡・九州の年商5000万円～10億円企業に向けたAI×管理会計×資金繰りの伴走型経営顧問サービス",
  founder: "古町 聖文",
  foundingDate: "2018-04-01",
  email: "k.furumachi@lognowa.com",
  telephone: "+81-92-231-2920",
  address: {
    "@type": "PostalAddress",
    streetAddress: "水谷3-14-17",
    addressLocality: "福岡市東区",
    addressRegion: "福岡県",
    postalCode: "839-0041",
    addressCountry: "JP",
  },
  sameAs: [
    "https://www.facebook.com/lognowa",
    "https://www.linkedin.com/company/lognowa",
    "https://note.com/lognowa",
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "株式会社創和経営コンサルティング 福岡オフィス",
  image: "https://furumachi-smec.lognowa.com/public/lp/og-image.svg",
  priceRange: "¥180,000-¥280,000/月",
  address: organizationSchema.address,
  geo: { "@type": "GeoCoordinates", latitude: 33.5902, longitude: 130.4017 },
  areaServed: ["福岡県", "佐賀県", "熊本県", "大分県", "長崎県", "宮崎県", "鹿児島県"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  url: "https://furumachi-smec.lognowa.com/public/lp",
  telephone: organizationSchema.telephone,
  email: organizationSchema.email,
};

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "伴走型AI経営顧問サービス",
  description: "AIが経営数字を先読みし、意思決定時間を平均50%削減する月額制の伴走型AI経営顧問プラン",
  brand: { "@type": "Brand", name: "株式会社創和経営コンサルティング" },
  offers: {
    "@type": "Offer",
    priceCurrency: "JPY",
    price: "180000",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: "180000",
      priceCurrency: "JPY",
      minPrice: "180000",
      maxPrice: "280000",
    },
    availability: "https://schema.org/InStock",
    url: "https://furumachi-smec.lognowa.com/public/lp#plans",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "26" },
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "伴走型AI経営顧問",
  serviceType: "AI経営支援",
  url: "https://furumachi-smec.lognowa.com/public/lp",
  description:
    "週1回のAIレポートと管理会計・資金繰り支援で、決断までの時間を50%削減し、3ヶ月で利益とキャッシュの同時改善を実現する伴走型サービス",
  provider: {
    "@type": "Organization",
    name: "株式会社創和経営コンサルティング",
    sameAs: organizationSchema.sameAs,
    url: organizationSchema.url,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "福岡県" },
    { "@type": "AdministrativeArea", name: "佐賀県" },
    { "@type": "AdministrativeArea", name: "熊本県" },
    { "@type": "AdministrativeArea", name: "大分県" },
    { "@type": "AdministrativeArea", name: "長崎県" },
    { "@type": "AdministrativeArea", name: "宮崎県" },
    { "@type": "AdministrativeArea", name: "鹿児島県" },
  ],
  audience: {
    "@type": "Audience",
    audienceType: "年商5,000万円～10億円の中小企業経営者",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI経営顧問プログラム",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AIレポーティング・ダッシュボード",
          description: "AIが粗利とキャッシュの変動要因を可視化し、週次で意思決定資料を生成",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "管理会計・資金繰り伴走",
          description: "管理会計指標とキャッシュフロー計画を整備し、投資判断を支援",
        },
      },
    ],
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "JPY",
    price: "180000",
    availability: "https://schema.org/InStock",
    eligibleRegion: "JP",
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "対象となる企業規模と業種は？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "年商5000万円～10億円・従業員10〜80名の中小企業を中心に、製造・建設・設備工事・卸売・サービス業などで支援実績があります。",
      },
    },
    {
      "@type": "Question",
      name: "契約期間と成果が出るまでの目安は？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "初回3ヶ月で可視化と打ち手運用を定着させ、4〜6ヶ月で粗利・資金繰りを改善します。四半期ごとに継続可否を見直します。",
      },
    },
    {
      "@type": "Question",
      name: "社内に専任担当がいなくても進められますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "週次タスクボードと議事メモを提供し、必要に応じて当社がPMOを代行します。小人数体制でも推進できます。",
      },
    },
    {
      "@type": "Question",
      name: "AIに詳しくなくても問題ありませんか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "操作マニュアルとトレーニング動画を提供し、初月にワークショップを実施するため、専門知識は不要です。",
      },
    },
    {
      "@type": "Question",
      name: "費用対効果はどのように測定しますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "粗利率・在庫回転率・手元資金カバレッジなどのKPIを週次・月次でレポートし、ROIを算出します。",
      },
    },
  ],
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://furumachi-smec.lognowa.com/" },
    { "@type": "ListItem", position: 2, name: "AI経営顧問", item: "https://furumachi-smec.lognowa.com/public/lp" },
  ],
};

export const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "福岡のAI経営顧問",
  url: "https://furumachi-smec.lognowa.com/public/lp",
  description:
    "AIが経営数字を先読みし、社長は意思決定だけに集中できるようにする福岡発の伴走型AI経営顧問サービス",
  inLanguage: "ja-JP",
  isPartOf: {
    "@type": "WebSite",
    name: "株式会社創和経営コンサルティング",
    url: "https://furumachi-smec.lognowa.com/",
  },
  primaryImageOfPage: "https://furumachi-smec.lognowa.com/public/lp/og-image.svg",
  speakable: {
    "@type": "SpeakableSpecification",
    xpath: [
      "/html/body//h1",
      "/html/body//section[1]//p[1]",
    ],
  },
};

export const structuredDataList = [
  organizationSchema,
  localBusinessSchema,
  productSchema,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  webPageSchema,
];
