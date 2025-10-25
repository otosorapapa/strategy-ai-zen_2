# Lighthouse（Before）

## 実行状況
- 対象URL: https://furumachi-smec.lognowa.com/public/lp
- 実行結果: 403 Forbidden（社内プロキシ経由での取得失敗）

## 推定課題
- 画像最適化不足によりLCPが3.5s以上になるリスク
- 不要なJSバンドルがFirst Input Delayを悪化させる可能性
- `lang="en"`設定のままでSEO評価に影響

## 対応方針
1. Reactコードをローカルビルドし、Lighthouse（mobile/desktop）をCIで実行できるようにする。
2. 上記403のため、ステージング環境での再測定手順を運用手順書に追記。
3. LCP目標2.5s / CLS 0.1以下 / TTFB 0.8s以下をKPIとして設定し、改善後の計測で確認する。
