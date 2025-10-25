# Lighthouse（After）

## 計測手順
1. `npm install` → `npm run build` → `npm run preview -- --host` を実行。
2. Chrome DevTools > Lighthouse にて Mobile/Performance, Accessibility, Best Practices, SEO を測定。
3. 目標: 各カテゴリ 90+、LCP ≤2.3s、CLS ≤0.05、TTFB ≤0.8s。

## 現状
- 開発環境での実測は未実施（Chrome未インストール）。
- スタティックビルド後の測定に必要な設定は vite.config.ts のままで問題なし。

## 次アクション
- ステージング公開後にLighthouseレポート（PDF）を取得し、reports/lighthouse-after.pdf として保存。
- 測定結果をGA4/GTMイベントと突き合わせ、継続監視する。
