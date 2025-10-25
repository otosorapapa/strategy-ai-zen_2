import { structuredDataList } from "@/lib/structuredData";

const StructuredData = () => (
  <>
    {structuredDataList.map((schema, index) => (
      <script
        key={`schema-${index}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    ))}
  </>
);

export default StructuredData;
