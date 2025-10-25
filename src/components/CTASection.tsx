import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/ctaVariants";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  ArrowRight,
  CalendarClock,
  CheckCircle,
  CheckCircle2,
  JapaneseYen,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Timer,
} from "lucide-react";

const requestOptions = [
  {
    value: "consultation",
    title: PRIMARY_CTA.label,
    description:
      "生成AIレポートのデモと経営数値の棚卸しを30分で実施。送信後に担当者がメールまたは電話で候補日時をご案内します。",
    badge: "専任担当が日程調整",
  },
  {
    value: "checklist",
    title: "資料だけ受け取る",
    description: "18ページの資料とExcelテンプレートをメールで即送付。準備が整ったら経営診断の予約に進めます。",
    badge: "PDF＋Excel付き",
  },
] as const;

type RequestType = (typeof requestOptions)[number]["value"];

const assuranceBadges = [
  {
    label: "中小企業診断士・事業再構築アドバイザー",
    description: "代表 古町 聖文が直接伴走し、経営計画と資金調達の両面をサポート。",
  },
  {
    label: "プライバシーマーク・ISMS認証取得企業と提携",
    description: "お預かりする財務データは暗号化とアクセス制御で安全に管理します。",
  },
];

const confettiPieces = Array.from({ length: 12 }, (_, index) => {
  const left = 6 + index * 7;
  const delay = index * 55;
  const direction = index % 2 === 0 ? -1 : 1;
  const drift = direction * (18 + index * 3);
  const rotation = direction * (10 + index * 2);

  return {
    id: `confetti-piece-${index}`,
    left,
    delay,
    drift,
    rotation,
    endRotation: rotation + direction * 42,
    hue: 150 + index * 7,
  };
});

const followUpSteps = [
  {
    icon: Mail,
    title: "資料とヒアリングシートを即送付",
    description: "送信直後に自動返信メールで生成AIレポートのサンプルとヒアリングシートをお届けします。",
  },
  {
    icon: CalendarClock,
    title: "担当者が希望日時をすり合わせ",
    description: "経営診断を選択した場合は担当者がメールや電話で候補日時をご提案し、最短当日で調整可能。担当者からもフォローします。",
  },
  {
    icon: CheckCircle,
    title: "初回30分で意思決定のボトルネック整理",
    description: "生成AIが示す利益シナリオとキャッシュ予測を画面共有し、意思決定時間を週8時間創出するプランをご提案します。",
  },
];

const formSteps = [
  {
    id: 1,
    label: "メールアドレスと希望内容",
    helper: "まずは診断結果の送付先を入力",
    fields: ["email"] as const,
  },
  {
    id: 2,
    label: "会社情報と詳細",
    helper: "会社名・お名前・任意の共有事項を入力",
    fields: ["company", "name", "consent"] as const,
  },
] as const;

const CTASection = () => {
  const { toast } = useToast();
  const formId = useId();
  const requestLabelId = `${formId}-request-type`;
  const helperIds = { email: `${formId}-email-help` } as const;
  const errorIds = {
    company: `${formId}-company-error`,
    name: `${formId}-name-error`,
    email: `${formId}-email-error`,
    consent: `${formId}-consent-error`,
  } as const;

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    requestType: requestOptions[0].value as RequestType,
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState({
    company: "",
    name: "",
    email: "",
    consent: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [submissionFeedback, setSubmissionFeedback] = useState<null | { type: RequestType }>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingType, setSubmittingType] = useState<RequestType | null>(null);
  const [submitProgress, setSubmitProgress] = useState(0);

  const progressTimeoutsRef = useRef<number[]>([]);
  const progressResolverRef = useRef<(() => void) | null>(null);
  const isMountedRef = useRef(true);

  const totalSteps = formSteps.length;
  const activeStep = formSteps[currentStep - 1];
  const progressValue = Math.round((currentStep / totalSteps) * 100);

  type ErrorKey = keyof typeof errorIds;
  type ValidationResult = Record<ErrorKey, string>;

  const buildValidationState = (): ValidationResult => {
    const trimmedCompany = formData.company.trim();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    return {
      company: trimmedCompany ? "" : "会社名を入力してください。",
      name: trimmedName.length >= 2 ? "" : "お名前は2文字以上で入力してください。",
      email: trimmedEmail
        ? emailPattern.test(trimmedEmail)
          ? ""
          : "メールアドレスの形式を確認してください。"
        : "メールアドレスを入力してください。",
      consent: formData.consent ? "" : "プライバシーポリシーへの同意が必要です。",
    } satisfies ValidationResult;
  };

  const syncErrorsForFields = (fields: readonly ErrorKey[], validation: ValidationResult) => {
    setErrors((previous) => {
      const next = { ...previous };
      fields.forEach((field) => {
        next[field] = validation[field];
      });
      return next;
    });
  };

  const handleNext = () => {
    if (isSubmitting) {
      return;
    }

    const validation = buildValidationState();
    const fieldsToValidate = activeStep?.fields ?? [];
    syncErrorsForFields(fieldsToValidate, validation);

    const isValid = fieldsToValidate.every((field) => validation[field] === "");
    if (isValid && currentStep < totalSteps) {
      setCurrentStep((previous) => previous + 1);
    }
  };

  const handleBack = () => {
    if (isSubmitting) {
      return;
    }

    setCurrentStep((previous) => Math.max(1, previous - 1));
  };

  const getDescribedBy = (...ids: (string | undefined)[]) => ids.filter(Boolean).join(" ");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

  const clearSubmissionProgress = () => {
    progressTimeoutsRef.current.forEach((timeout) => {
      window.clearTimeout(timeout);
    });
    progressTimeoutsRef.current = [];

    if (progressResolverRef.current) {
      progressResolverRef.current();
      progressResolverRef.current = null;
    }
  };

  const runSubmissionProgress = () => {
    clearSubmissionProgress();

    return new Promise<void>((resolve) => {
      const sequence = [
        { value: 28, delay: 240 },
        { value: 56, delay: 520 },
        { value: 78, delay: 820 },
        { value: 93, delay: 1130 },
        { value: 100, delay: 1420 },
      ] as const;

      progressResolverRef.current = resolve;

      sequence.forEach((step, index) => {
        const timeout = window.setTimeout(() => {
          if (!isMountedRef.current) {
            return;
          }

          setSubmitProgress(step.value);

          if (index === sequence.length - 1) {
            resolve();
            progressResolverRef.current = null;
          }
        }, step.delay);

        progressTimeoutsRef.current.push(timeout);
      });
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validation = buildValidationState();
    setErrors(validation);

    const hasErrors = Object.values(validation).some(Boolean);

    if (hasErrors) {
      const firstInvalidStep = formSteps.find((step) => step.fields.some((field) => validation[field]));
      if (firstInvalidStep) {
        setCurrentStep(firstInvalidStep.id);
      }
      toast({
        title: "入力内容を確認してください",
        description: "必須項目とプライバシーポリシーの同意が必要です。",
        variant: "destructive",
      });
      return;
    }

    const requestType = formData.requestType;
    const isConsultation = requestType === "consultation";

    setSubmissionFeedback(null);
    setIsSubmitting(true);
    setSubmittingType(requestType);
    setSubmitProgress(12);

    await runSubmissionProgress();

    if (!isMountedRef.current) {
      return;
    }

    setIsSubmitting(false);
    setSubmittingType(null);
    setSubmitProgress(0);

    toast({
      title: isConsultation ? "無料経営診断の仮予約を受け付けました" : "チェックリストを送信しました",
      description: isConsultation
        ? "担当者から候補日時のご連絡を順次お送りします。最短当日中にフォローいたします。"
        : "AI活用チェックリストとテンプレートをメールでお届けしました。準備が整い次第、同じフォームから相談をご予約いただけます。",
    });

    setSubmissionFeedback({ type: requestType });

    setFormData({
      company: "",
      name: "",
      email: "",
      requestType: requestOptions[0].value,
      message: "",
      consent: false,
    });
    setErrors({ company: "", name: "", email: "", consent: "" });
    setCurrentStep(1);
  };

  const submitLabel = formData.requestType === "consultation" ? PRIMARY_CTA.label : SECONDARY_CTA.label;

  const bulletPoints = [
    "メール入力→詳細入力の2ステップで完了",
    "生成AIが10分で経営レポートを生成するデモを体験",
    "専任担当が候補日時をご提案し、準備をすべて代行",
  ];

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      clearSubmissionProgress();
    };
  }, []);

  useEffect(() => {
    if (!submissionFeedback) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setSubmissionFeedback(null);
    }, 7000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [submissionFeedback]);

  const successDescriptions: Record<RequestType, string> = {
    consultation: "担当者より30分無料経営診断の候補日時と事前確認シートをメールでお送りします。",
    checklist: "チェックリストのダウンロードリンクと特典資料をメールにて即時送付しました。",
  };

  const submissionMessages: Record<RequestType, { title: string; description: string }> = {
    consultation: {
      title: "候補日時を整理しています…",
      description: "AI経営顧問チームが日程の候補とヒアリング資料を準備中です。",
    },
    checklist: {
      title: "資料を準備しています…",
      description: "チェックリストとテンプレートのダウンロードリンクを生成しています。",
    },
  };

  return (
    <section id="cta-section" className="py-24 bg-gradient-to-br from-white via-sky-50/70 to-emerald-50/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl space-y-10">
          <ScrollReveal className="rounded-[32px] border border-primary/20 bg-white/95 p-8 shadow-card" variant="fade">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
              <div className="space-y-5">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                  BOOKING FLOW
                </span>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  2ステップで「無料経営診断」か「チェックリストDL」を選択。社長の意思決定時間を守る窓口です。
                </h2>
                <p className="text-base text-muted-foreground md:text-lg">
                  送信後に資料とヒアリングシートをメールでお届けし、担当者が個別に候補日時をご案内。経営会議の準備をAIが肩代わりし、判断に集中できる時間を創出します。
                </p>
                <ul className="space-y-2">
                  {bulletPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-foreground/90 md:text-base">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {followUpSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <ScrollReveal
                      key={step.title}
                      className="rounded-2xl border border-primary/20 bg-primary/5 p-5 shadow-sm"
                      delay={index * 120}
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <h3 className="mt-3 text-sm font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={120}
            className="grid gap-10 rounded-[36px] border-4 border-primary/30 bg-white/95 p-8 shadow-elegant lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:p-12"
          >
            <div className="space-y-6 lg:pr-10">
              <h3 className="text-4xl font-bold text-foreground md:text-5xl">
                フォームは2ステップだけ。送信後は担当者が日程を調整します。
              </h3>
              <p className="text-lg text-muted-foreground md:text-xl">
                無料経営診断を選択した場合は、AIが作成する経営レポートのテンプレートと意思決定時間の測定シートを共有。チェックリストだけでも、AI活用の始め方がわかる18ページの資料が届きます。
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-primary/25 bg-primary/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">無料経営診断の方</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    専任担当が候補日時をすり合わせ、社長の意思決定時間を週8時間創出するロードマップを30分で作成します。
                  </p>
                </div>
                <div className="rounded-3xl border border-secondary/30 bg-secondary/10 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">資料DLの方</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    生成AIワークフローのチェックリストとROI計算シートを即日送付。準備が整ったら同じフォームからご相談ください。
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-7 rounded-3xl border-2 border-primary/30 bg-white p-8 shadow-card"
              data-analytics-event="submit_form"
              aria-busy={isSubmitting}
            >
              <div className="space-y-5">
                {submissionFeedback && (
                  <div className="cta-success-banner" role="status" aria-live="polite">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <CheckCircle2 className="cta-success-icon" aria-hidden="true" />
                      <div>
                        <p className="text-base font-bold text-foreground">送信完了</p>
                        <p className="text-sm text-muted-foreground">
                          {successDescriptions[submissionFeedback.type]}
                        </p>
                      </div>
                    </div>
                    <div className="celebration-confetti" aria-hidden="true">
                      {confettiPieces.map((piece) => {
                        const style: CSSProperties = {
                          "--confetti-left": `${piece.left}%`,
                          "--confetti-delay": `${piece.delay}ms`,
                          "--confetti-drift": `${piece.drift}px`,
                          "--confetti-rotation": `${piece.rotation}deg`,
                          "--confetti-rotation-end": `${piece.endRotation}deg`,
                          "--confetti-hue": `${piece.hue}`,
                        };
                        return <span key={piece.id} style={style} />;
                      })}
                    </div>
                  </div>
                )}
                {isSubmitting && submittingType && (
                  <div
                    className="space-y-3 rounded-2xl border border-primary/25 bg-primary/5 p-5 shadow-inner"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Loader2 className="mt-0.5 h-4 w-4 animate-spin text-primary" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-semibold text-primary">
                            {submissionMessages[submittingType].title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {submissionMessages[submittingType].description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary/80">{Math.round(submitProgress)}%</span>
                    </div>
                    <Progress
                      value={submitProgress}
                      className="h-2 bg-primary/10"
                      indicatorClassName="bg-gradient-to-r from-primary via-accent to-secondary"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="space-y-3 rounded-2xl border border-primary/15 bg-primary/5 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">STEP {currentStep}</p>
                      <p className="mt-1 text-base font-bold text-foreground">{activeStep.label}</p>
                    </div>
                    <span className="hidden text-xs font-medium text-muted-foreground sm:block">{activeStep.helper}</span>
                  </div>
                  <Progress value={progressValue} className="h-2 bg-primary/10" aria-hidden="true" />
                  <div className="flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    {formSteps.map((step) => (
                      <span
                        key={step.id}
                        className={cn(
                          "transition-colors",
                          step.id <= currentStep ? "text-primary" : "text-muted-foreground/60",
                        )}
                      >
                        STEP {step.id}
                      </span>
                    ))}
                  </div>
                </div>

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        メールアドレス <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(event) => {
                          setFormData({ ...formData, email: event.target.value });
                          if (errors.email) {
                            setErrors((previous) => ({ ...previous, email: "" }));
                          }
                        }}
                        placeholder="example@company.com"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={getDescribedBy(errors.email ? errorIds.email : undefined, helperIds.email)}
                        className={cn(errors.email && "border-destructive focus-visible:ring-destructive/70")}
                        disabled={isSubmitting}
                        required
                      />
                      <p id={helperIds.email} className="text-xs text-muted-foreground">
                        自動返信メールで資料をお届けし、担当者から日程調整のご連絡を差し上げます。
                      </p>
                      {errors.email && (
                        <p id={errorIds.email} className="flex items-center gap-2 text-sm text-destructive" role="alert">
                          <AlertCircle className="h-4 w-4" aria-hidden="true" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <p id={requestLabelId} className="text-sm font-semibold text-foreground">
                        希望する内容を選択
                      </p>
                      <div className="grid gap-3" role="radiogroup" aria-labelledby={requestLabelId}>
                        {requestOptions.map((option) => {
                          const isActive = formData.requestType === option.value;
                          return (
                            <button
                              type="button"
                              key={option.value}
                              onClick={() => setFormData({ ...formData, requestType: option.value })}
                              className={cn(
                                "rounded-2xl border px-5 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:cursor-not-allowed disabled:opacity-60",
                                isActive
                                  ? "border-primary/70 bg-primary/10 text-primary shadow-sm"
                                  : "border-muted/30 bg-muted/10 text-muted-foreground hover:border-primary/40 hover:bg-white",
                              )}
                              role="radio"
                              aria-checked={isActive}
                              tabIndex={isActive ? 0 : -1}
                              disabled={isSubmitting}
                            >
                              <span className="text-xs font-semibold uppercase tracking-[0.3em]">{option.badge}</span>
                              <p className="mt-2 text-base font-semibold text-foreground">{option.title}</p>
                              <p className="mt-1 text-sm leading-relaxed">{option.description}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">
                          会社名 <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={(event) => {
                            setFormData({ ...formData, company: event.target.value });
                            if (errors.company) {
                              setErrors((previous) => ({ ...previous, company: "" }));
                            }
                          }}
                          placeholder="例：福町精工株式会社"
                          autoComplete="organization"
                          aria-invalid={Boolean(errors.company)}
                          aria-describedby={errors.company ? errorIds.company : undefined}
                          className={cn(errors.company && "border-destructive focus-visible:ring-destructive/70")}
                          disabled={isSubmitting}
                          required
                        />
                        {errors.company && (
                          <p id={errorIds.company} className="flex items-center gap-2 text-sm text-destructive" role="alert">
                            <AlertCircle className="h-4 w-4" aria-hidden="true" />
                            {errors.company}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">
                          お名前 <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={(event) => {
                            setFormData({ ...formData, name: event.target.value });
                            if (errors.name) {
                              setErrors((previous) => ({ ...previous, name: "" }));
                            }
                          }}
                          placeholder="山田 太郎"
                          autoComplete="name"
                          minLength={2}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? errorIds.name : undefined}
                          className={cn(errors.name && "border-destructive focus-visible:ring-destructive/70")}
                          disabled={isSubmitting}
                          required
                        />
                        {errors.name && (
                          <p id={errorIds.name} className="flex items-center gap-2 text-sm text-destructive" role="alert">
                            <AlertCircle className="h-4 w-4" aria-hidden="true" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">共有事項・ご相談内容（任意）</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                        placeholder="例：現在の課題、希望する導入時期、既存システムの構成など"
                        rows={3}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div
                      className={cn(
                        "space-y-2 rounded-2xl border border-muted/30 bg-muted/10 p-4",
                        errors.consent && "border-destructive/70 bg-destructive/5",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="consent"
                          checked={formData.consent}
                          onCheckedChange={(checked) => {
                            setFormData({ ...formData, consent: Boolean(checked) });
                            if (errors.consent) {
                              setErrors((previous) => ({ ...previous, consent: "" }));
                            }
                          }}
                          aria-describedby={errors.consent ? errorIds.consent : undefined}
                          aria-invalid={Boolean(errors.consent)}
                          disabled={isSubmitting}
                          required
                        />
                        <Label htmlFor="consent" className="text-xs leading-relaxed text-muted-foreground">
                          <span className="font-semibold text-foreground">プライバシーポリシーに同意します。</span> 送信により
                          <a href="/privacy-policy" className="ml-1 text-primary underline underline-offset-2">
                            プライバシーポリシー
                          </a>
                          に同意いただいたものとみなします。
                        </Label>
                      </div>
                      {errors.consent && (
                        <p
                          id={errorIds.consent}
                          className="flex items-center gap-2 pl-9 text-sm text-destructive"
                          role="alert"
                        >
                          <AlertCircle className="h-4 w-4" aria-hidden="true" />
                          {errors.consent}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">安心のサポート体制</p>
                      <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground">
                        {assuranceBadges.map((badge) => (
                          <li key={badge.label} className="rounded-xl bg-white/70 p-3 shadow-sm">
                            <p className="text-sm font-semibold text-foreground">{badge.label}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{badge.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="rounded-2xl border-2 border-muted/40 px-6 py-3 text-sm font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                      onClick={handleBack}
                      disabled={isSubmitting}
                    >
                      前のステップへ戻る
                    </Button>
                  ) : (
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
                      STEP {currentStep} / {totalSteps}
                    </span>
                  )}

                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      variant="cta"
                      size="lg"
                      className="interactive-cta w-full rounded-2xl px-6 py-5 text-lg font-bold sm:w-auto"
                      onClick={handleNext}
                      disabled={isSubmitting}
                    >
                      次のステップへ
                      <ArrowRight className="cta-arrow ml-3 h-5 w-5" aria-hidden="true" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="cta"
                      size="lg"
                      className="interactive-cta w-full rounded-2xl py-6 text-xl font-bold"
                      disabled={isSubmitting}
                      data-cta-attention="cta-form-submit"
                      data-cta-attention-delay="360"
                    >
                      {submitLabel}
                      <ArrowRight className="cta-arrow ml-3 h-5 w-5" aria-hidden="true" />
                    </Button>
                  )}
                </div>

                <div className="cta-reassurance-group text-muted-foreground/90">
                  <span className="cta-reassurance">
                    <Timer aria-hidden="true" /> 60秒で完了
                  </span>
                  <span className="cta-reassurance">
                    <JapaneseYen aria-hidden="true" /> 月額18万円〜
                  </span>
                  <span className="cta-reassurance">
                    <ShieldCheck aria-hidden="true" /> 初回30日間返金保証
                  </span>
                  <span className="cta-reassurance">
                    <Lock aria-hidden="true" /> 秘密厳守・専用NDA対応
                  </span>
                </div>

                {currentStep === totalSteps && (
                  <>
                    <p className="text-xs text-center text-muted-foreground">
                      送信後、担当者が候補日時をご案内します。訪問・オンラインどちらも対応可能です。
                    </p>
                    <p className="text-[0.7rem] text-center text-muted-foreground/80">
                      お預かりした個人情報は相談対応以外の目的では利用せず、暗号化ストレージで安全に保管します。
                    </p>
                  </>
                )}
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
