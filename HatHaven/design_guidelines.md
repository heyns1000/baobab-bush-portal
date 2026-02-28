# Premium Hat Store - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium e-commerce leaders like Hermès, Burberry, and luxury Shopify stores. The design emphasizes craftsmanship, heritage, and product excellence through sophisticated layouts and generous use of high-quality imagery.

**Core Principles**:
- Timeless elegance over trendy effects
- Product photography as hero content
- Refined typography hierarchy
- Spacious, breathing layouts that let products shine

## Typography System

**Font Selection**: Google Fonts - Playfair Display (headings), Inter (body text)

**Hierarchy**:
- Hero Headlines: Playfair Display, 4xl to 6xl, font-weight 700
- Section Headers: Playfair Display, 3xl to 4xl, font-weight 600
- Subsection Titles: Inter, xl to 2xl, font-weight 600
- Body Text: Inter, base to lg, font-weight 400
- Captions/Labels: Inter, sm, font-weight 500, uppercase with letter-spacing

## Layout System

**Spacing Primitives**: Tailwind units of 4, 8, 12, 16, 24 (p-4, gap-8, py-12, mt-16, py-24)

**Container Strategy**:
- Full-width sections with inner max-w-7xl for content containment
- Product galleries: max-w-screen-2xl for expansive feel
- Text-heavy sections (brand story): max-w-4xl for readability
- Responsive padding: px-6 mobile, px-12 desktop

**Grid Systems**:
- Product Gallery: 4-column grid on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Feature Cards: 3-column grid (grid-cols-1 md:grid-cols-3)
- Sourcing Details: 2-column split (grid-cols-1 lg:grid-cols-2)

## Component Library

**Navigation**: 
Sticky header with logo left, navigation center, cart/search icons right. Clean horizontal layout with subtle divider.

**Product Cards**:
Vertical card design with full-width image (aspect-ratio-square), product name, brief description, price. Hover state reveals "View Details" overlay with subtle backdrop blur.

**Buttons**:
Primary CTA: Rounded-lg, px-8 py-4, Inter font-weight 600. When placed over images, use backdrop-blur-md with semi-transparent background.

**Gallery Filters**:
Horizontal pill-style filters with rounded-full styling, subtle border, active state distinction.

**Testimonial Cards**:
Quote-focused design with customer photo (rounded-full, w-16 h-16), testimonial text (italic), customer name and title.

**Footer**:
Multi-column layout (4 columns desktop, stack mobile) with newsletter signup, quick links, contact info, social media icons. Includes trust badges and craftsmanship certification marks.

## Page Structure & Sections

**1. Hero Section** (90vh):
Large hero image showcasing signature hat with model or lifestyle shot. Overlaid centered content: Brand tagline, primary headline ("Handcrafted Excellence Since [Year]"), supporting subheadline, and primary CTA button with blurred background. Navigation bar at top.

**2. Featured Collection** (py-24):
Section header + 4-column product grid showcasing 8-12 featured hats. Each card displays product image, style name, starting price, quick material tag.

**3. Brand Heritage** (py-24):
2-column asymmetric layout: Left side features large artisan workshop image, right side contains brand story narrative with timeline markers showing key milestones. Include founder photo and signature.

**4. Craftsmanship Details** (py-24):
Full-width section with 3-column grid showcasing process: "Sourcing" (premium materials origins), "Crafting" (artisan techniques), "Quality" (finishing details). Each column includes icon, title, detailed description, and supporting imagery.

**5. Material Sourcing** (py-24):
Interactive map or illustrated journey showing where materials come from. Grid below with 4 material spotlight cards (felt, straw, leather, ribbon) each with macro photography and origin story.

**6. Product Gallery** (py-24):
Complete inventory showcase with filter tags (Style, Material, Season, Price Range). Masonry or uniform grid layout displaying 20+ products. Includes "Load More" functionality for extended collections.

**7. Customer Stories** (py-16):
3-column testimonial grid with customer photos, quotes about quality and craftsmanship. Include "As featured in" press logos row.

**8. Journal/Editorial** (py-24):
2-3 feature cards linking to blog content about hat styling, care guides, artisan profiles. Magazine-style layout with large imagery.

**9. Contact/CTA Section** (py-24):
Split design: left side has contact form (name, email, message, hat interest selector), right side displays flagship store image, hours, contact details, and "Schedule Private Appointment" option.

## Images Strategy

**Required Images**:
- **Hero**: Full-width lifestyle shot of person wearing signature hat in aspirational setting (portrait orientation, 1920x1080)
- **Product Images**: High-quality product photography on clean backgrounds, consistent lighting (square, 800x800 minimum)
- **Brand Heritage**: Workshop/artisan images showing craftsmanship in action
- **Material Close-ups**: Macro photography of felt texture, woven straw, leather details
- **Customer Photos**: Authentic customer lifestyle shots wearing hats
- **Store/Location**: Flagship boutique interior and exterior shots

**Image Treatment**: All images should maintain premium quality, consistent color grading, and professional composition. Product shots require white/neutral backgrounds with soft shadows.

## Accessibility & Interactions

**Smooth Scrolling**: Implement smooth scroll behavior for navigation anchor links. 

**Minimal Animation**: Subtle fade-in on scroll for section reveals, gentle hover scale (1.02) on product cards, no distracting motion effects.

**Forms**: Floating labels, clear focus states, inline validation with helpful error messages.

This design creates a museum-quality showcase for premium hats while maintaining e-commerce functionality and storytelling depth.