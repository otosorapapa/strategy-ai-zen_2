# 運用手順書

## 更新フロー
1. GitHubでfeatureブランチを作成し、コピー・デザインを更新。
2. `npm run lint` → `npm run build` → `npm run preview`で品質確認。
3. GrowthBookで実験フラグを設定し、GA4/GTMのイベント発火をテスト。
4. mainブランチへマージ後、Vercel/Netlify等でデプロイ。ステージングでLighthouseとフォーム送信テストを実施。
5. 公開後24時間はGA4リアルタイムで主要CTAとフォームイベントをモニタリング。

## 画像規格
- ヒーロー画像: 1600×900, AVIF/WEBP, 200KB以下
- セクション背景: 1200×800, WEBP, 150KB以下
- アイコン: SVGまたは24×24 PNG
- 画像命名: `section-purpose-size.ext`（例: `hero-dashboard-1600x900.avif`）

## 見出し・字数ガイド
- H1: 32文字以内、メインキーワード含む
- H2: 28〜32px相当、1文60文字以内
- 段落: 120〜160文字、漢字比率35％以下
- 箇条書き: 3〜5項目に統一、各項目50文字以内

## 公開チェックリスト
- [ ] Lighthouse Mobile/SEO/Accessibility/Best Practices 各90以上
- [ ] フォーム送信で`view_form`/`start_form`/`submit_form`/`book_meeting`が発火
- [ ] JSON-LD（Organization/LocalBusiness/Product/FAQ/Breadcrumb）がエラーなし
- [ ] CTAヒートマップ（Hotjar等）で主要ボタン視認率80%以上
- [ ] サンクスページから日程調整の案内が機能
- [ ] 404/500監視（UptimeRobot）に異常なし

## 運用リズム
- 週次: KPIレビュー（CVR、直帰率、フォーム完了率）、ABテスト結果確認
- 月次: 施策レポート、コンテンツ更新、SEO順位確認
- 四半期: プラン・料金見直し、E-E-A-T要素の更新、金融機関連携実績の刷新
