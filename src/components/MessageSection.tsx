import ScrollReveal from "@/components/ScrollReveal";
import { Quote } from "lucide-react";
import representativeImage from "@/assets/representative.jpg";

const MessageSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-sky-50/60 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal as="div" variant="fade-up" className="mb-14 text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              代表<span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">メッセージ</span>
            </h2>
            <p className="text-xl text-muted-foreground md:text-2xl">
              生成AIで経営の勘と数字をつなぐ、信頼のパートナーとして
            </p>
          </ScrollReveal>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
            <ScrollReveal as="div" variant="fade-up">
              <div className="relative overflow-hidden rounded-[40px] border-4 border-primary/30 shadow-elegant">
                <img
                  src={representativeImage}
                  alt="代表取締役 / 中小企業診断士 古町 聖文"
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/90 to-transparent p-8">
                  <p className="text-2xl font-bold text-foreground mb-2">古町 聖文</p>
                  <p className="text-lg text-muted-foreground font-semibold">
                    代表取締役 / 中小企業診断士
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal as="div" variant="fade-up" delay={160} className="space-y-6">
              <div className="relative rounded-[32px] border-2 border-primary/20 bg-gradient-to-br from-white to-secondary/20 p-8 shadow-card">
                <Quote className="absolute -top-6 -left-6 h-16 w-16 text-primary/20" />
                <h3 className="text-4xl font-bold mb-6 md:text-5xl leading-tight">
                  3ヶ月で見える化<br />
                  6ヶ月で成果定着
                </h3>

                <div className="space-y-6 text-xl leading-relaxed text-muted-foreground md:text-2xl">
                  <p className="font-semibold text-foreground text-2xl md:text-3xl">
                    経営と現場をつなぎ、数字を即座に行動へ変換
                  </p>
                  <ul className="space-y-4 list-disc marker:text-primary pl-6 text-left">
                    <li>
                      <span className="font-semibold text-foreground">統合マネジメント:</span> 管理会計・資金繰り・生成AI活用を一体化し、数字が示すチャンスを瞬時に打ち手へ。
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">月次レビュー:</span> 経営と現場が同じ指標を見て対策を磨き込み、改善サイクルを高速化。
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">地域密着の伴走:</span> 福岡・九州の企業文化と課題を理解したパートナーが、生成AIのシナリオを経営判断に翻訳。
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">現場実装まで支援:</span> 戦略を現場行動へ落とし込み、持続的な成長曲線を描く体制を定着。
                    </li>
                  </ul>
                </div>

                <div className="mt-8 border-t-2 border-border pt-6">
                  <p className="text-base text-muted-foreground">
                    株式会社創和経営コンサルティング
                  </p>
                  <p className="text-lg font-semibold text-foreground mt-2">
                    代表取締役 / 中小企業診断士
                  </p>
                  <p className="text-3xl font-bold text-primary mt-3" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                    Kiyofumi Furumachi
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
