export type PrimaryCtaContent = {
  id: string;
  label: string;
  benefitCopy: string;
  benefitCopyAlt: string;
  supportText: string;
};

export type SecondaryCtaContent = {
  id: string;
  label: string;
  benefitCopy: string;
  description: string;
};

export const PRIMARY_CTA: PrimaryCtaContent = {
  id: "primary",
  label: "無料経営診断を申し込む",
  benefitCopy: "AIで意思決定時間を50%短縮",
  benefitCopyAlt: "売上とキャッシュフローを同時に改善",
  supportText:
    "・最短当日中にご連絡。福岡・九州の訪問もオンライン診断も対応します。\n・九州以外の企業様はまずオンライン診断からスタートできます。",
};

export const SECONDARY_CTA: SecondaryCtaContent = {
  id: "secondary",
  label: "3分で資料を受け取る",
  benefitCopy: "伴走支援の事例と料金をダウンロード",
  description: "フォーム送信後すぐにPDFをお届け。生成AI活用の進め方と成功事例をまとめています。",
};
