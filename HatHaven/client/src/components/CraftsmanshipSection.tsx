import { Card } from "@/components/ui/card";
import { Compass, Hand, Award } from "lucide-react";

interface CraftsmanshipFeature {
  icon: "sourcing" | "crafting" | "quality";
  title: string;
  description: string;
}

interface CraftsmanshipSectionProps {
  features: CraftsmanshipFeature[];
  materialImage?: string;
}

const iconMap = {
  sourcing: Compass,
  crafting: Hand,
  quality: Award,
};

export default function CraftsmanshipSection({ features, materialImage }: CraftsmanshipSectionProps) {
  return (
    <section className="bg-background py-24" id="craftsmanship">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl" data-testid="text-craftsmanship-title">
            The Art of Hat Making
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-craftsmanship-subtitle">
            From sourcing to finishing, every step is guided by tradition and excellence
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <Card key={index} className="p-8 hover-elevate" data-testid={`card-feature-${index}`}>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 font-serif text-2xl font-semibold text-foreground" data-testid={`text-feature-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-foreground" data-testid={`text-feature-desc-${index}`}>
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {materialImage && (
          <div className="overflow-hidden rounded-md">
            <img 
              src={materialImage} 
              alt="Material close-up"
              className="h-[400px] w-full object-cover"
              data-testid="img-material"
            />
          </div>
        )}
      </div>
    </section>
  );
}
