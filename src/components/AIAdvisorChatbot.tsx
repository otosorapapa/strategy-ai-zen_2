import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Bot, MessageSquareReply, Send, Sparkles } from "lucide-react";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const quickPrompts = [
  "年商5億・サービス業。資金繰りの見直しを相談したい",
  "AIで売上管理のダッシュボード化を進めたい",
  "毎週の経営会議資料づくりを自動化する方法は？",
];

const planHighlights = [
  {
    label: "30分のヒアリングで課題を棚卸し",
    description: "AIレポートのデモと粗利・キャッシュのボトルネックを同時に整理します。",
  },
  {
    label: "90日で意思決定ワークフローを定着",
    description: "管理会計・AIダッシュボード・実行会議体を一気通貫で伴走。",
  },
  {
    label: "資金調達と投資判断もサポート",
    description: "資金繰り予測と成長投資シナリオを可視化し、投資意思決定を後押し。",
  },
];

const detectFocusAreas = (message: string) => {
  const normalized = message.toLowerCase();
  const focus: string[] = [];

  if (/(資金|キャッシュ|cash|資金繰り)/i.test(message)) {
    focus.push("資金繰りとキャッシュ創出");
  }
  if (/(売上|sales|成長|受注|単価)/i.test(message)) {
    focus.push("売上成長と利益率改善");
  }
  if (/(時間|会議|レポート|資料|業務)/i.test(message)) {
    focus.push("意思決定時間の削減と自動化");
  }
  if (/(ai|自動化|分析|ダッシュボード)/i.test(normalized)) {
    focus.push("生成AI活用とデータ統合");
  }

  return focus;
};

const buildResponse = (message: string) => {
  const focusAreas = detectFocusAreas(message);

  if (!focusAreas.length) {
    return {
      headline: "状況をもう少し教えてください",
      body:
        "直近3カ月の売上と粗利の推移、また経営会議の頻度や資料づくりにかけている時間が分かると、最適なAIワークフローをご提案できます。",
      focusAreas,
    };
  }

  const suggestions: Record<string, string> = {
    "資金繰りとキャッシュ創出":
      "キャッシュフローはAIシミュレーターで3カ月先まで予測し、資金ショートの兆しが出た場合は支出と入金の平準化策をご提案します。金融機関との交渉資料も併せてご用意できます。",
    "売上成長と利益率改善":
      "売上ドライバーを分解し、AIが粗利インパクトの大きい施策を優先順位付きで提示します。営業会議では勝ち筋の仮説検証を伴走支援します。",
    "意思決定時間の削減と自動化":
      "週次レポートや会議資料を生成AIが自動で作成し、経営者は確認と意思決定に集中。業務フローの自動化により週8時間以上の経営時間を創出できます。",
    "生成AI活用とデータ統合":
      "会計・販売・Excelのデータを統合し、生成AIがダッシュボードとアクションプランを生成。各部門で同じ数字をもとに議論できる体制を整えます。",
  };

  const body = focusAreas.map((area) => `・${suggestions[area] ?? "ヒアリングで詳細を伺い最適化します。"}`).join("\n");

  return {
    headline: `${focusAreas[0]}にフォーカスした進め方です`,
    body,
    focusAreas,
  };
};

const AIAdvisorChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "こんにちは。生成AIと管理会計を組み合わせて、意思決定時間の削減とキャッシュ改善を支援しています。貴社の規模や課題を教えていただけますか？",
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const assistantSummary = useMemo(() => {
    const latestUser = [...messages].reverse().find((message) => message.role === "user");
    if (!latestUser) {
      return null;
    }
    return buildResponse(latestUser.content);
  }, [messages]);

  const sendMessage = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isThinking) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    setMessages((previous) => [...previous, userMessage]);
    setIsThinking(true);

    setTimeout(() => {
      const response = buildResponse(trimmed);
      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: `${response.headline}\n${response.body}`,
      };

      setMessages((previous) => [...previous, assistantMessage]);
      setIsThinking(false);
    }, 600);
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentInput = input;
    setInput("");
    sendMessage(currentInput);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput("");
    sendMessage(prompt);
  };

  const scrollToCta = () => {
    document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="ai-chatbot" className="bg-gradient-to-b from-white via-slate-50/50 to-slate-100/40 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <Bot className="h-4 w-4" aria-hidden="true" />
            AIコンシェルジュ
          </span>
          <h2 className="mt-6 text-balance text-3xl font-bold text-slate-900 md:text-4xl">
            生成AIチャットが最適なサービスプランと活用ステップをその場で提案
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            会社規模・業種・現状の課題を入力すると、AIが優先順位付きの提案を返答します。チャット内容は無料経営診断で引き継がれるため、最短翌日から具体的なディスカッションに進めます。
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
          <div className="space-y-5">
            <Card className="border-primary/15 bg-white/95 shadow-card">
              <CardHeader>
                <CardTitle className="text-left text-2xl font-bold text-slate-900">
                  AIコンシェルジュの使い方
                </CardTitle>
                <CardDescription className="text-left text-base leading-relaxed">
                  課題を送信すると、生成AIが優先的に解決すべき領域と伴走プランの流れを提示します。必要であれば人のコンサルタントにスムーズに引き継ぎます。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {planHighlights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 shadow-inner">
                    <p className="text-sm font-semibold text-primary">{item.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
                {assistantSummary && assistantSummary.focusAreas.length > 0 && (
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-left text-sm text-primary">
                    <p className="font-semibold">最新の入力から抽出された注力テーマ</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {assistantSummary.focusAreas.map((area) => (
                        <Badge key={area} variant="secondary" className="rounded-full bg-white/90 text-primary shadow-sm">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-wrap gap-3">
                {quickPrompts.map((prompt) => (
                  <Button
                    key={prompt}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full border-primary/20 text-sm font-semibold text-primary hover:bg-primary/10"
                    onClick={() => handleQuickPrompt(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </CardFooter>
            </Card>

            <div className="rounded-3xl border border-primary/20 bg-white/95 p-5 text-left shadow-elegant">
              <h3 className="text-xl font-bold text-slate-900">チャットで整理した内容をもとに、無料経営診断でさらに具体化できます。</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                チャットログは専任コンサルタントが確認し、事前に粗利・キャッシュの分析観点を準備します。気になる論点はお気軽にお送りください。
              </p>
              <Button
                variant="cta"
                size="lg"
                className="mt-5 interactive-cta"
                onClick={scrollToCta}
                data-cta-attention="chatbot-cta"
                data-cta-attention-delay="300"
              >
                無料経営診断を予約してチャット内容を共有
              </Button>
            </div>
          </div>

          <Card className="border-sky-200/70 bg-white/95 shadow-elegant">
            <CardHeader className="flex flex-row items-start justify-between gap-3">
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                  <MessageSquareReply className="h-6 w-6 text-sky-500" aria-hidden="true" />
                  AIチャット
                </CardTitle>
                <CardDescription className="text-sm">
                  気になる課題を入力すると、生成AIが優先アクションと支援内容を提案します。
                </CardDescription>
              </div>
              <Sparkles className="h-6 w-6 text-amber-400" aria-hidden="true" />
            </CardHeader>
            <CardContent className="flex h-[440px] flex-col justify-between gap-4">
              <div className="flex-1 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/80">
                <div className="h-full space-y-4 overflow-y-auto p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex", {
                        "justify-end": message.role === "user",
                        "justify-start": message.role === "assistant",
                      })}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm transition-transform duration-300",
                          message.role === "assistant"
                            ? "bg-white text-slate-900 shadow-primary/20"
                            : "bg-gradient-to-r from-sky-500 to-emerald-500 text-white",
                        )}
                      >
                        {message.content.split("\n").map((line) => (
                          <p key={line} className="mb-1 last:mb-0">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                  {isThinking && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4 animate-pulse text-primary" aria-hidden="true" />
                      AIが提案を作成しています…
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <form onSubmit={submitMessage} className="space-y-3">
                <Textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="例：年商8億の製造業です。粗利率が低下しており、キャッシュの見通しと改善施策を知りたい"
                  className="resize-none rounded-2xl border-primary/20 bg-white/90 text-sm focus-visible:ring-primary"
                  rows={3}
                  disabled={isThinking}
                />
                <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span>入力内容は社外に共有されません。チャット後に相談を予約すると内容を引き継げます。</span>
                  <Button type="submit" variant="cta" size="sm" className="interactive-cta px-6 py-2 text-sm font-semibold">
                    <Send className="mr-1 h-4 w-4" aria-hidden="true" />
                    送信
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIAdvisorChatbot;
