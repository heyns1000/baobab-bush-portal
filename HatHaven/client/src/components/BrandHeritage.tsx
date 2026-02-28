interface BrandHeritageProps {
  title: string;
  story: string[];
  workshopImage: string;
  founderName?: string;
}

import lekkerImg from "@assets/Fruitful_lekker_locals_1770842523346.png";

export default function BrandHeritage({ 
  title, 
  story, 
  workshopImage,
  founderName = "Master Artisan"
}: BrandHeritageProps) {
  return (
    <section className="bg-card py-24" id="heritage">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <img src={lekkerImg} alt="Proudly Fruitful - Supporting Lekker Locals" className="mb-8 max-w-md rounded-lg shadow-lg" data-testid="img-lekker-locals" />
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl" data-testid="text-heritage-title">
            {title}
          </h2>
        </div>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-md">
            <img 
              src={workshopImage} 
              alt="Artisan workshop"
              className="h-full w-full object-cover"
              data-testid="img-workshop"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              {story.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed text-foreground" data-testid={`text-story-${index}`}>
                  {paragraph}
                </p>
              ))}
            </div>

            {founderName && (
              <div className="mt-8 border-l-2 border-primary pl-6">
                <p className="font-serif text-lg italic text-foreground" data-testid="text-founder-name">
                  {founderName}
                </p>
                <p className="text-sm text-muted-foreground">Founder & Master Craftsman</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
