import HeroSection from "@/components/HeroSection";
import ExecutiveBenefitsQuickLinks from "@/components/ExecutiveBenefitsQuickLinks";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import AIWorkflowShowcase from "@/components/AIWorkflowShowcase";
import ResultsSection from "@/components/ResultsSection";
import ServiceOverviewSection from "@/components/ServiceOverviewSection";
import AIDiagnosticSimulator from "@/components/AIDiagnosticSimulator";
import AIDemoExperienceSection from "@/components/AIDemoExperienceSection";
import AIBenefitsSection from "@/components/AIBenefitsSection";
import PlansSection from "@/components/PlansSection";
import SecurityPrivacySection from "@/components/SecurityPrivacySection";
import AIAdvisorChatbot from "@/components/AIAdvisorChatbot";
import MessageSection from "@/components/MessageSection";
import ResourcesSection from "@/components/ResourcesSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/FloatingContactButton";
import StructuredData from "@/components/StructuredData";
import StickyCtaBar from "@/components/StickyCtaBar";
import SectionCtaBanner from "@/components/SectionCtaBanner";
import useInteractiveCtaFeedback from "@/hooks/useInteractiveCtaFeedback";

const Index = () => {
  useInteractiveCtaFeedback();

  return (
    <div className="min-h-screen bg-canvas text-foreground">
      <StructuredData />
      <StickyCtaBar />
      <HeroSection />
      <ExecutiveBenefitsQuickLinks />
      <ProblemSection />
      <SolutionSection />
      <AIWorkflowShowcase />
      <ResultsSection />
      <SectionCtaBanner
        title="週1回のAIレポートで、もう迷わない経営を"
        description="年商5,000万円～10億円の企業が抱える課題を30分で棚卸し。AIが数字と打ち手を同じ画面で提示する意思決定フローを体験できます。"
      />
      <ServiceOverviewSection />
      <AIDiagnosticSimulator />
      <AIDemoExperienceSection />
      <SectionCtaBanner
        title="AIの提案根拠を30分の無料経営診断で確認"
        description="OECDが示す人間とAIの協働モデルを参照し、AIが提示するシナリオと社長の判断プロセスを可視化。相談後は検証レポートを即日共有します。"
      />
      <AIBenefitsSection />
      <SectionCtaBanner
        title="決断までの時間を50％削減。3ヶ月で利益とキャッシュが同時に増える"
        description="現状データを基に意思決定のボトルネックを棚卸し。AIレポートと管理会計の運用イメージを視覚資料でご提案します。"
      />
      <PlansSection />
      <SecurityPrivacySection />
      <AIAdvisorChatbot />
      <MessageSection />
      <ResourcesSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Index;
