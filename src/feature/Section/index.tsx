import { Section } from "@/types/section";

const Index = (section: Section) => {
  console.log("render section");
  return (
    <div
      id={section.id}
      className={`w-full py-12 leading-loose ${section.className || ""}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-20">
          <h2 className="text-3xl font-semibold text-left">{section.title}</h2>
          {section.extra}
        </div>
        {section.children}
      </div>
    </div>
  );
};

export default Index;
