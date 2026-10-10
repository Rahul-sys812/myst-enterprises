const fs = require('fs');

// Helper to create concise, exact design objects
function makeDesign(id, title, subtitle, category, industry, image, desc, tags, colors, deliverables, clientReview) {
  return {
    id,
    title,
    subtitle: subtitle.toUpperCase(),
    category,
    industry,
    image,
    bgGradient: 'from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]',
    accentColor: '#064e3b',
    textColor: '#0f172a',
    description: desc,
    tags: tags || [category, industry],
    colorPalette: colors || [
      { name: 'Primary Accent', hex: '#064E3B' },
      { name: 'Dark Neutral', hex: '#0F172A' },
      { name: 'Light Base', hex: '#F8FAFC' }
    ],
    deliverables: deliverables || ['Vector AI / EPS', 'Print Master PDF', 'High-Res PNG'],
    clientReview: clientReview || {
      quote: 'Clean, professional execution with rapid delivery.',
      clientName: title.split(' ')[0] + ' Team',
      role: 'Client'
    },
    logoType: 'custom'
  };
}

// ==========================================
// 19 LOGO DESIGNS (Pure Logos)
// ==========================================
const LOGOS = [
  makeDesign('creativo-flame-bulb', 'Creativo Studio', '3D Embossed Bulb Logo', 'Logo', 'Creative Agency', '/images/designs/logo.jpeg', 'Modern 3D embossed bulb icon logo design engineered for creative agencies and media studios.', ['3D Embossed', 'Bulb Emblem', 'Creative Studio']),
  makeDesign('grill-smokehouse-logo', 'Grill Smokehouse', 'Culinary Spatula Mark', 'Logo', 'Restaurant & BBQ', '/images/designs/logo-2.jpeg', 'Negative-space culinary identity integrating a grill spatula into modern typography.', ['BBQ Grill', 'Culinary Mark', 'Smokehouse']),
  makeDesign('arts-creative-wordmark', "Art's Creative Lab", 'Geometric Modern Wordmark', 'Logo', 'Art & Design', '/images/designs/logo-3.jpeg', 'High-contrast Scandinavian geometric typography wordmark with fluid ligature curves.', ['Wordmark', 'Geometric', 'Art Studio']),
  makeDesign('avenra-origami-cube', 'Avenra Living', '3D Geometric Cube Emblem', 'Logo', 'Real Estate & Living', '/images/designs/logo-4.jpeg', 'Isometric origami cube symbol representing sustainable architectural development.', ['Cube Logo', 'Architecture', 'Real Estate']),
  makeDesign('floura-floral-monogram', 'Floura Boutique', 'Handcrafted Floral Monogram', 'Logo', 'Fashion & Floral', '/images/designs/logo-5.jpeg', 'Delicate botanical serif monogram designed for luxury florists and bridal ateliers.', ['Floral Monogram', 'Boutique', 'Luxury']),
  makeDesign('nature-beaute-organic', 'Nature Beauté', 'Botanical Organic Mark', 'Logo', 'Cosmetics & Beauty', '/images/designs/logo-6.jpeg', 'Clean green leaf contour symbol tailored for cruelty-free organic cosmetic brands.', ['Botanical', 'Cosmetics', 'Organic']),
  makeDesign('fz-luxury-monogram', 'F & Z Collection', 'Dual Letter Monogram', 'Logo', 'Haute Couture', '/images/designs/logo-7.jpeg', 'Interlocking serif monogram mark designed for luxury apparel and leather goods.', ['Monogram', 'Haute Couture', 'Fashion']),
  makeDesign('creative-cyber-tech', 'Creative Cyber', 'Digital Circuit Emblem', 'Logo', 'Tech & AI', '/images/designs/logo-8.jpeg', 'Futuristic hexagon circuit mark engineered for cybersecurity and blockchain software.', ['Cybersecurity', 'Tech Emblem', 'Hexagon']),
  makeDesign('falcon-athletics-crest', 'Falcon Athletics', 'Aggressive Sports Mascot', 'Logo', 'Sports & Fitness', '/images/designs/logo-9.jpeg', 'Dynamic falcon mascot crest designed for athletic academies, gyms, and sports apparel.', ['Falcon Mascot', 'Athletic Crest', 'Gym']),
  makeDesign('calligraphy-atelier-mark', 'Calligraphy Atelier', 'Hand-Lettered Luxury Mark', 'Logo', 'Bespoke Stationery', '/images/designs/logo-10.jpeg', 'Fluid copperplate script logo mark designed for wedding invitation studios.', ['Calligraphy', 'Wedding Studio', 'Hand Lettered']),
  makeDesign('iron-dragon-clan', 'Iron Dragon Clan', 'Esports & Gaming Mascot', 'Logo', 'Gaming & Fitness', '/images/designs/logo-11.jpeg', 'High-energy dragon emblem with razor-sharp contours for esports teams and CrossFit boxes.', ['Dragon Mascot', 'Esports', 'CrossFit']),
  makeDesign('vesper-heritage-crest', 'Vesper Heritage', 'Regal Heraldic Crest', 'Logo', 'Hospitality & Spirits', '/images/designs/logo-12.jpeg', 'Classic European heraldic crest featuring symmetrical lions and vintage serif typography.', ['Heraldic Crest', 'Heritage', 'Distillery']),
  makeDesign('artisan-collective-mark', 'Artisan Collective', 'Vintage Craft Stamp', 'Logo', 'Handmade Goods', '/images/designs/logo-13.jpeg', 'Circular apothecary stamp logo mark tailored for artisanal leatherworkers and potters.', ['Artisan Stamp', 'Handmade', 'Craft']),
  makeDesign('coffee-leaf-roasters', 'Coffee Leaf', 'Artisanal Roaster Emblem', 'Logo', 'Cafe & Roastery', '/images/designs/logo-14.jpeg', 'Coffee bean intertwined with coffee leaves designed for specialty pour-over cafes.', ['Coffee Roaster', 'Cafe Emblem', 'Artisanal']),
  makeDesign('monoline-design-lab', 'Monoline Studio', 'Geometric Line Mark', 'Logo', 'Design Agency', '/images/designs/logo-15.jpeg', 'Clean single-weight geometric vector mark for contemporary design and interior consultancies.', ['Monoline', 'Minimalist', 'Design Lab']),
  makeDesign('imperial-crown-realestate', 'Imperial Crown', 'Luxury Sovereign Mark', 'Logo', 'Luxury Real Estate', '/images/designs/logo-16.jpeg', 'Minimalist royal crown icon with gold foil styling tailored for premium residential builders.', ['Crown Mark', 'Real Estate', 'Luxury']),
  makeDesign('apex-systems-tech', 'Apex Systems', 'Forward Gradient Arrow', 'Logo', 'SaaS & Enterprise', '/images/designs/logo-17.jpeg', 'Modern upward velocity arrow mark engineered for enterprise SaaS and cloud platforms.', ['Apex Arrow', 'SaaS', 'Cloud']),
  makeDesign('retro-character-mascot', 'Retro Character', 'Vintage 1930s Mascot', 'Logo', 'Streetwear & Diner', '/images/designs/logo-18.jpeg', 'Hand-drawn rubber-hose retro mascot tailored for casual diners and streetwear brands.', ['Retro Mascot', 'Rubber Hose', 'Streetwear']),
  makeDesign('sharma-cafe-logo', 'Sharma Cafe', 'Chai & Snacks Identity', 'Logo', 'Food & Beverage', '/images/designs/sharma-cafe-logo.jpg', 'Authentic Indian cafe identity featuring tea glass graphics and warm terracotta tones.', ['Sharma Cafe', 'Chai', 'Indian Cafe'])
];

// ==========================================
// 12 MENU DESIGNS (Pure Menus)
// ==========================================
const MENUS = [
  makeDesign('the-food-corner-menu', 'The Food Corner', 'Fast Food Blackboard Menu', 'Menu', 'Fast Food & Diner', '/images/designs/menu-2.jpeg', 'Blackboard themed burger, fries, and shakes menu card with clear category pricing.', ['The Food Corner', 'Burger Menu', 'Blackboard Theme']),
  makeDesign('suravile-steakhouse-menu', 'Suravile Steakhouse', 'Luxury Dine-in Menu', 'Menu', 'Fine Dining', '/images/designs/menu-13.jpeg', 'High-end black & gold leatherette restaurant menu with wine pairings and grill cuts.', ['Suravile Steakhouse', 'Fine Dining', 'Gold Foil']),
  makeDesign('aurora-coffee-menu', 'Aurora Coffee House', 'Specialty Cafe Drinks Card', 'Menu', 'Cafe & Bakery', '/images/designs/menu-3.jpeg', 'Minimalist Scandinavian tri-fold coffee menu highlighting brew origins and pastries.', ['Aurora Coffee', 'Cafe Menu', 'Tri-fold']),
  makeDesign('larana-fine-dining', 'Larana & Co', 'Modern Bistronomy Menu', 'Menu', 'Continental Dining', '/images/designs/menu-4.jpeg', 'Sophisticated multi-page restaurant booklet with wine pairings and chef specials.', ['Larana Dining', 'Continental', 'Multi-Page']),
  makeDesign('strawberry-waffles-menu', 'Strawberry & Waffles', 'Dessert Parlour Menu', 'Menu', 'Desserts & Waffles', '/images/designs/menu.jpeg', 'Playful pink and cream dessert menu card for artisanal waffle parlours and creperies.', ['Waffle Menu', 'Dessert Parlour', 'Pink Theme']),
  makeDesign('jodhpur-palace-menu', 'Jodhpur Palace', 'Royal Indian Dining Menu', 'Menu', 'Heritage Restaurant', '/images/designs/menu-5.jpeg', 'Ornamental gold foil royal Indian menu booklet with traditional thali layouts.', ['Jodhpur Palace', 'Indian Dining', 'Thali Menu']),
  makeDesign('dessert-cake-menu', 'Dessert Cake Boutique', 'Artisan Bakery Menu', 'Menu', 'Bakery & Patisserie', '/images/designs/menu-6.jpeg', 'Warm chocolate brown dessert pricing card for custom cakes, pastries, and croissants.', ['Cake Menu', 'Bakery Boutique', 'Dessert Pricing']),
  makeDesign('fast-bite-3d-menu', 'Fast Bite Diner', 'Quick Service Takeaway Menu', 'Menu', 'Quick Service Diner', '/images/designs/menu-7.jpeg', 'Eye-catching fast food takeaway flyer with combo deal boxes and digital QR order codes.', ['Fast Bite', 'Takeaway Flyer', 'Combo Deals']),
  makeDesign('roast-bar-menu', 'Roast Bar Espresso', 'Specialty Roastery Board', 'Menu', 'Artisanal Roastery', '/images/designs/menu-8.jpeg', 'Industrial chic wooden-accented espresso menu board for modern specialty coffee bars.', ['Roast Bar', 'Espresso Board', 'Specialty Coffee']),
  makeDesign('street-eats-menu', 'Street Eats Food Truck', 'Food Truck Service Card', 'Menu', 'Food Truck & Kiosk', '/images/designs/menu-9.jpeg', 'High-contrast laminated counter menu card designed for outdoor food truck service.', ['Street Eats', 'Food Truck', 'Laminated Menu']),
  makeDesign('seafood-saluns-menu', 'Saluns Seafood Grill', 'Coastal Seafood Menu', 'Menu', 'Seafood Restaurant', '/images/designs/menu-10.jpeg', 'Deep ocean navy seafood menu featuring daily catch specials and fresh grill platters.', ['Seafood Grill', 'Ocean Theme', 'Catch of the Day']),
  makeDesign('gourmet-bistro-menu', 'Gourmet Bistro & Tacos', 'Mexican Street Food Menu', 'Menu', 'Bistro & Cantina', '/images/designs/menu-11.jpeg', 'Vibrant Mexican cantina menu card showcasing signature tacos, bowls, and margaritas.', ['Tacos Menu', 'Mexican Bistro', 'Cantina'])
];

// ==========================================
// 18 POSTER DESIGNS (Pure Posters)
// ==========================================
const POSTERS = [
  makeDesign('time-to-travel-poster', 'Time To Travel', 'Tourism Promotional Poster', 'Poster', 'Travel & Tourism', '/images/designs/poster-1.jpeg', 'Vibrant island tour promotional poster with 30% discount badge and clear travel booking CTA.', ['Time to Travel', 'Tourism Poster', 'Travel Agency']),
  makeDesign('explore-world-flyer', 'Explore The World', 'Holiday Package Campaign Flyer', 'Poster', 'Tour Operator', '/images/designs/poster-2.jpeg', 'Full-color promotional travel flyer with destination highlights and tour package breakdown.', ['Explore World', 'Tour Flyer', 'Vacation Deals']),
  makeDesign('home-harmony-poster', 'Home Harmony Interiors', 'Interior Design Studio Poster', 'Poster', 'Architecture & Decor', '/images/designs/poster-3.jpeg', 'Minimalist architectural poster showcasing Scandinavian furniture and interior consulting.', ['Home Harmony', 'Interior Design', 'Architecture']),
  makeDesign('iron-core-gym-poster', 'Iron Core Athletic Club', 'Gym Motivation Wall Poster', 'Poster', 'Fitness & Gym', '/images/designs/poster-4.jpeg', 'High-contrast athletic motivational poster for gym reception areas and training floors.', ['Iron Core Gym', 'Fitness Poster', 'Bodybuilding']),
  makeDesign('electric-beats-poster', 'Electric Beats Festival', 'Electronic Music Festival Poster', 'Poster', 'Music & Nightlife', '/images/designs/poster-5.jpeg', 'Neon cybernetic festival poster with DJ lineup grid and ticket booking QR codes.', ['Electric Beats', 'Music Festival', 'Concert Poster']),
  makeDesign('apex-heights-poster', 'Apex Heights Towers', 'Luxury Real Estate Poster', 'Poster', 'Property Development', '/images/designs/poster-6.jpeg', 'Architectural rendering poster for luxury residential high-rise condominium pre-launch.', ['Apex Heights', 'Real Estate Launch', 'Luxury Towers']),
  makeDesign('green-valley-poster', 'Green Valley Market', 'Organic Farmers Market Poster', 'Poster', 'Organic Retail', '/images/designs/poster-7.jpeg', 'Earthy botanical illustrated poster promoting weekend local organic produce markets.', ['Farmers Market', 'Organic Produce', 'Weekend Fair']),
  makeDesign('apex-care-clinic-poster', 'Apex Care Medical', 'Healthcare Awareness Poster', 'Poster', 'Medical & Healthcare', '/images/designs/poster-8.jpeg', 'Clean clinical poster with doctor profiles, health check packages, and appointment numbers.', ['Apex Care', 'Healthcare Poster', 'Medical Clinic']),
  makeDesign('codecraft-bootcamp-poster', 'CodeCraft Bootcamp', 'Tech Training Poster', 'Poster', 'Education & Tech', '/images/designs/poster-9.jpeg', 'Modern tech education poster with curriculum modules and placement guarantee badges.', ['CodeCraft', 'Tech Bootcamp', 'Coding Academy']),
  makeDesign('apex-detailing-poster', 'Apex Auto Detailing', 'Ceramic Coating Poster', 'Poster', 'Automotive Care', '/images/designs/poster-10.jpeg', 'High-gloss dark theme poster detailing paint protection and ceramic coating packages.', ['Auto Detailing', 'Ceramic Coating', 'Car Care']),
  makeDesign('velvet-runway-poster', 'Velvet Runway Fashion', 'Haute Couture Show Poster', 'Poster', 'Fashion & Runway', '/images/designs/poster-11.jpeg', 'Editorial fashion week poster with model photography, designer credits, and VIP entry details.', ['Velvet Runway', 'Fashion Week', 'Haute Couture']),
  makeDesign('street-food-fiesta-poster', 'Food Carnival Fiesta', 'Culinary Festival Poster', 'Poster', 'Food Festival', '/images/designs/poster-12.jpeg', 'Festive culinary carnival poster with live food stall icons and stage performance timings.', ['Food Fiesta', 'Culinary Carnival', 'Event Poster']),
  makeDesign('futuretech-ai-poster', 'FutureTech AI Summit', 'Technology Conference Poster', 'Poster', 'Tech Conferences', '/images/designs/poster-13.jpeg', 'Sleek global AI conference poster with keynote speakers and convention hall pass options.', ['FutureTech AI', 'Tech Summit', 'AI Conference']),
  makeDesign('ocean-breeze-party-poster', 'Ocean Breeze Beach Bash', 'Summer Beach Party Poster', 'Poster', 'Hospitality & Events', '/images/designs/poster-14.jpeg', 'Tropical sunset beach party poster with drink specials and guest DJ announcements.', ['Ocean Breeze', 'Beach Party', 'Summer Festival']),
  makeDesign('kinder-quest-fun-poster', 'Kinder Quest Preschool', 'Early Learning Admissions Poster', 'Poster', 'Education', '/images/designs/kinder-quest-fun.jpg', 'Vibrant educational poster with joyful children and curriculum highlights for new admissions.', ['Kinder Quest', 'Preschool Admissions', 'Kids Learning']),
  makeDesign('kinder-quest-learning-poster', 'Kinder Quest Academy', 'Creative Development Poster', 'Poster', 'Education', '/images/designs/kinder-quest-learning.jpg', 'Childhood experiential learning poster for preschool campus display boards.', ['Kinder Quest', 'Campus Poster', 'Early Learning']),
  makeDesign('noire-skincare-ritual-poster', 'Noire Skincare Daily Ritual', 'POS Counter Display Poster', 'Poster', 'Beauty & Cosmetics', '/images/designs/WhatsApp Image 2026-10-09 at 11.48.56 AM (2).jpeg', 'Product ritual poster with serum bottle placement and clean formula badges for in-store POS.', ['Noire Skincare', 'POS Poster', 'In-Store Display']),
  makeDesign('noire-skincare-print-poster', 'Noire Skincare Renewal', 'Print Editorial Campaign Poster', 'Poster', 'Beauty & Cosmetics', '/images/designs/WhatsApp Image 2026-10-09 at 11.48.55 AM (1).jpeg', 'Editorial magazine and store display poster showcasing plant-powered renewal serum.', ['Noire Skincare', 'Print Editorial', 'Beauty Ad'])
];

// ==========================================
// 20 SOCIAL MEDIA DESIGNS (Pure Social Media Posts)
// ==========================================
const SOCIAL_MEDIA = [
  makeDesign('trend-tree-vitamin-c', 'Trend Tree Vitamin C', '20% Vitamin C Serum Post', 'Social Media', 'Skincare & Cosmetics', '/images/designs/social-media.jpeg', 'High-converting Instagram feed product post for Vitamin C skincare serum with citrus accents.', ['Trend Tree', 'Vitamin C', 'Skincare Ad']),
  makeDesign('motion-dex-perfume-post', 'Motion Dex Perfume', 'Luxury Fragrance Launch Post', 'Social Media', 'Perfumes & Luxury', '/images/designs/social-media-1.jpeg', 'High-end dark luxury fragrance creative for Meta feed ads and Instagram sponsored placements.', ['Motion Dex', 'Luxury Perfume', 'Instagram Ad']),
  makeDesign('dave-drinks-lemonade-post', 'Dave Drinks Lemonade', 'Chilled Blueberry Cooler Post', 'Social Media', 'Beverages', '/images/designs/social-media-2.jpeg', 'Vibrant iced beverage creative featuring fresh blueberries and dripping condensation.', ['Dave Drinks', 'Beverage Creative', 'Summer Drink']),
  makeDesign('yb-yumm-bakery-post', 'YB Yumm! Bakery', 'Chocolate Cupcake Promo Post', 'Social Media', 'Bakery & Sweets', '/images/designs/social-media-3.jpeg', 'Mouthwatering artisan cupcake social post engineered for local bakery weekend sales.', ['YB Yumm', 'Cupcake Promo', 'Bakery Ad']),
  makeDesign('napoli-crust-pizza-post', 'Napoli Crust Pizza', 'Wood-Fired Pizza Special Post', 'Social Media', 'Pizzeria & Dining', '/images/designs/social-media-4.jpeg', 'Dramatic overhead wood-fired pizza post with fresh basil and melted mozzarella cheese.', ['Napoli Crust', 'Pizza Creative', 'Restaurant Promo']),
  makeDesign('aura-skin-moisture-post', 'Aura Skin Hydration', 'Daily Moisturizer Campaign Post', 'Social Media', 'Beauty & Skincare', '/images/designs/social-media-5.jpeg', 'Clean pastel cosmetic ad creative highlighting 24-hour hydration benefits.', ['Aura Skin', 'Daily Moisture', 'Beauty Creative']),
  makeDesign('veloce-kicks-sneaker-post', 'Veloce Kicks Drop', 'Streetwear Sneaker Drop Post', 'Social Media', 'Fashion & Sneakers', '/images/designs/social-media-6.jpeg', 'High-energy typography post announcing limited-edition streetwear sneaker release.', ['Veloce Kicks', 'Sneaker Drop', 'Streetwear Ad']),
  makeDesign('titan-pro-smartwatch-post', 'Titan Pro Smartwatch', 'Rugged Wearable Launch Post', 'Social Media', 'Consumer Tech', '/images/designs/social-media-7.jpeg', 'Rugged water-splash background social creative detailing waterproof fitness features.', ['Titan Pro', 'Smartwatch Creative', 'Tech Ad']),
  makeDesign('zen-valley-matcha-post', 'Zen Valley Matcha', 'Ceremonial Matcha Tea Post', 'Social Media', 'Health & Beverages', '/images/designs/social-media-8.jpeg', 'Zen minimalist green tea social creative emphasizing organic ceremonial origin.', ['Zen Valley', 'Matcha Post', 'Organic Tea']),
  makeDesign('aurum-jewelry-solitaire-post', 'Aurum Fine Jewelry', 'Diamond Solitaire Ad Post', 'Social Media', 'Luxury Jewelry', '/images/designs/social-media-9.jpeg', 'Black velvet background diamond solitaire ad designed for bridal and festive collections.', ['Aurum Jewelry', 'Diamond Ring', 'Bridal Jewelry']),
  makeDesign('burger-club-smash-post', 'The Burger Club', 'Double Smash Burger Post', 'Social Media', 'Burgers & Fast Food', '/images/designs/social-media-10.jpeg', 'Ultra-appetizing double cheese smash burger social creative with discount offer hook.', ['Burger Club', 'Smash Burger', 'Fast Food Creative']),
  makeDesign('skyline-penthouse-post', 'Skyline Penthouses', 'Virtual Tour Real Estate Post', 'Social Media', 'Real Estate', '/images/designs/social-media-11.jpeg', 'Sophisticated panoramic penthouse view creative with scheduled private inspection CTA.', ['Skyline Penthouses', 'Real Estate Ad', 'Virtual Tour']),
  makeDesign('prana-studio-yoga-post', 'Prana Yoga Studio', 'Morning Vinyasa Class Post', 'Social Media', 'Yoga & Wellness', '/images/designs/social-media-12.jpeg', 'Calm sunrise yoga schedule post featuring membership discount code and booking link.', ['Prana Studio', 'Morning Yoga', 'Wellness Post']),
  makeDesign('solaris-sunglasses-post', 'Solaris Eyewear', 'Polarized Sunglasses Promo Post', 'Social Media', 'Fashion Accessories', '/images/designs/social-media-13.jpeg', 'High-contrast summer lifestyle creative showcasing UV400 polarized shades.', ['Solaris Eyewear', 'Sunglasses Post', 'Summer Promo']),
  makeDesign('origins-coffee-brew-post', 'Origins Specialty Coffee', 'Single-Origin Pour-Over Post', 'Social Media', 'Specialty Coffee', '/images/designs/social-media-14.jpeg', 'Artisanal single-origin coffee bean and pour-over kettle feed creative for coffee connoisseurs.', ['Origins Coffee', 'Pour-Over', 'Specialty Coffee']),
  makeDesign('nova-skincare-lumen-feed', 'Nova Skincare Lumen', 'Lumen Serum Feed Ad Creative', 'Social Media', 'Beauty & Cosmetics', '/images/designs/WhatsApp Image 2026-10-09 at 11.48.55 AM.jpeg', 'Square format social creative for Nova Skincare with serum bottle and dropper detail.', ['Nova Skincare', 'Lumen Serum', 'Instagram Feed']),
  makeDesign('noire-skincare-glowing-post', 'Noire Skincare Glowing', 'Healthy Glow Daily Post', 'Social Media', 'Beauty & Cosmetics', '/images/designs/WhatsApp Image 2026-10-09 at 11.48.56 AM.jpeg', 'Lifestyle model and product placement social graphic for Instagram, Pinterest, and Meta.', ['Noire Skincare', 'Glowing Skin', 'Beauty Lifestyle']),
  makeDesign('nova-skincare-studio-shoot', 'Nova Skincare Studio', 'Studio Product Shoot Creative', 'Social Media', 'Beauty & Cosmetics', '/images/designs/WhatsApp Image 2026-10-09 at 11.48.57 AM.jpeg', 'Rich gold and black studio cosmetic ad creative for new product launch.', ['Nova Skincare', 'Studio Shoot', 'Cosmetic Ad']),
  makeDesign('nova-skincare-vertical-story', 'Nova Skincare Story', 'Vertical Story & Reels Creative', 'Social Media', 'Beauty & Cosmetics', '/images/designs/WhatsApp Image 2026-10-09 at 11.48.57 AM (1).jpeg', 'Portrait 9:16 vertical story graphic engineered for Instagram Stories and Reels covers.', ['Nova Skincare', 'Vertical Story', 'Reels Cover']),
  makeDesign('kinder-quest-campaign-social', 'Kinder Quest Campaign', 'Bright Minds Preschool Post', 'Social Media', 'Education', '/images/designs/kinder-quest-campaign.jpg', 'High-conversion Facebook and Instagram ad creative for local preschool admissions.', ['Kinder Quest', 'Preschool Ad', 'Social Campaign'])
];

// ==========================================
// 26 PACKAGING DESIGNS (Pure Packaging)
// ==========================================
const PACKAGING = [
  makeDesign('natures-nutrition-protein-bar', "Nature's Nutrition Bar", 'Protein Bar Wrapper Packaging', 'Packaging', 'Health Food & FMCG', '/images/designs/packing.jpeg', 'Chocolate coconut brownie protein bar wrapper with accurate nutritional info and dieline.', ["Nature's Nutrition", 'Protein Bar', 'FMCG Wrapper']),
  makeDesign('nutroma-green-raisins-pouch', 'Nutroma Green Raisins', 'Stand-up Zipper Food Pouch', 'Packaging', 'Dry Fruits & Nuts', '/images/designs/packing-1.jpeg', 'Green gradient matte stand-up zipper pouch with clear product window for export raisins.', ['Nutroma', 'Green Raisins', 'Zipper Pouch']),
  makeDesign('nutroma-golden-raisins-pouch', 'Nutroma Golden Raisins', 'Stand-up Dry Fruits Pouch', 'Packaging', 'Dry Fruits & Nuts', '/images/designs/packing-2.jpeg', 'Golden foil stand-up pouch packaging for premium Kishmish with moisture-lock seal.', ['Nutroma', 'Golden Raisins', 'Dry Fruits']),
  makeDesign('nutroma-almonds-pouch', 'Nutroma California Almonds', 'Vacuum-Sealed Almonds Pouch', 'Packaging', 'Dry Fruits & Nuts', '/images/designs/packing-3.jpeg', 'Earthy copper-brown pouch design for California almonds with resealable zip closure.', ['Nutroma', 'Almonds Pouch', 'Vacuum Sealed']),
  makeDesign('nutroma-cashews-pouch', 'Nutroma Jumbo Cashews', 'W240 Jumbo Cashew Pouch', 'Packaging', 'Dry Fruits & Nuts', '/images/designs/packing-4.jpeg', 'Premium royal blue and gold packaging pouch for whole roasted jumbo cashews.', ['Nutroma', 'Jumbo Cashews', 'Nut Packaging']),
  makeDesign('cocoa-craft-dark-chocolate', 'Cocoa Craft 85%', 'Artisan Chocolate Bar Wrapper', 'Packaging', 'Chocolates & Confectionery', '/images/designs/packing-5.jpeg', 'Single-origin 85% dark chocolate bar foil wrap and outer cardboard sleeve with cacao map.', ['Cocoa Craft', 'Dark Chocolate', 'Bar Wrapper']),
  makeDesign('pure-botanicals-almond-milk', 'Pure Botanicals Almond Milk', 'Aseptic Beverage Carton', 'Packaging', 'Dairy-Free Beverages', '/images/designs/packing-6.jpeg', 'Minimalist Scandinavian 1-litre plant milk Tetra Pak carton with nutritional fact tables.', ['Pure Botanicals', 'Almond Milk', 'Carton Packaging']),
  makeDesign('bloom-herbal-shampoo', 'Bloom Herbal Shampoo', 'Cosmetic Bottle & Label', 'Packaging', 'Haircare & Cosmetics', '/images/designs/packing-7.jpeg', 'Amber PET bottle with waterproof vinyl label for botanical hair strengthening shampoo.', ['Bloom Shampoo', 'Bottle Label', 'Waterproof Vinyl']),
  makeDesign('nocturne-eau-de-parfum', 'Nocturne Eau de Parfum', 'Luxury Rigid Fragrance Box', 'Packaging', 'Perfumery & Luxury', '/images/designs/packing-8.jpeg', 'Magnetic rigid box with velvet insert and gold foil stamped perfume bottle label.', ['Nocturne Perfume', 'Rigid Box', 'Gold Foil']),
  makeDesign('terra-doro-olive-oil', "Terra D'Oro Olive Oil", 'Extra Virgin Glass Bottle', 'Packaging', 'Gourmet Foods', '/images/designs/packing-9.jpeg', 'Dark UV-blocking green glass bottle with textured cotton paper label for Tuscan olive oil.', ["Terra D'Oro", 'Olive Oil', 'Glass Bottle']),
  makeDesign('nutribite-roasted-cashews', 'NutriBite Roasted Cashews', 'Snack Pouch Packaging', 'Packaging', 'Snack Foods', '/images/designs/packing-10.jpeg', 'Vibrant snack pouch with nitrogen flush specifications for roasted salted cashews.', ['NutriBite', 'Cashews Pouch', 'Snack Packaging']),
  makeDesign('zen-garden-matcha-tin', 'Zen Garden Matcha', 'Airtight Ceremonial Tea Tin', 'Packaging', 'Specialty Tea', '/images/designs/packing-11.jpeg', 'Metallic airtight tin container with washi paper wrap label for Japanese Uji matcha.', ['Zen Garden', 'Matcha Tin', 'Tea Packaging']),
  makeDesign('lumiere-facial-serum', 'Lumière Facial Serum', 'Dropper Bottle & Outer Carton', 'Packaging', 'Dermatology & Cosmetics', '/images/designs/packing-12.jpeg', 'Minimalist white dropper bottle with embossed matte outer box for vitamin brightening oil.', ['Lumière', 'Serum Dropper', 'Cosmetic Carton']),
  makeDesign('hop-craft-hazy-ipa', 'Hop Craft Hazy IPA', 'Craft Beer Can Label', 'Packaging', 'Craft Breweries', '/images/designs/packing-13.jpeg', 'Vibrant holographic shrink-sleeve label for 330ml microbrewery craft beer can.', ['Hop Craft', 'Beer Can Label', 'Shrink Sleeve']),
  makeDesign('raw-botanicals-soap', 'Raw Botanicals Soap', 'Cold-Process Soap Kraft Wrap', 'Packaging', 'Natural Skincare', '/images/designs/packing-14.jpeg', 'Recycled kraft paper belly band sleeve for handmade cold-processed artisan soap bars.', ['Raw Botanicals', 'Soap Sleeve', 'Kraft Paper']),
  makeDesign('golden-crunch-granola', 'Golden Crunch Granola', 'Resealable Breakfast Pouch', 'Packaging', 'Breakfast Cereals', '/images/designs/packing-15.jpeg', 'Matte white stand-up pouch with transparent window for honey roasted almond granola.', ['Golden Crunch', 'Granola Pouch', 'Breakfast Cereal']),
  makeDesign('luminary-scented-candle', 'Luminary Candle Box', 'Luxury Scented Candle Box', 'Packaging', 'Home Fragrance', '/images/designs/packing-16.jpeg', 'Two-piece rigid setup box with gold foil logo for artisanal scented soy wax candles.', ['Luminary', 'Candle Box', 'Luxury Packaging']),
  makeDesign('apex-whey-isolate', 'Apex Whey Nutrition', 'Nutritional Supplement Tub', 'Packaging', 'Sports Nutrition', '/images/designs/packing-17.jpeg', 'Matte black 2kg protein tub label with metallic holographic anti-counterfeit seal.', ['Apex Whey', 'Protein Tub', 'Sports Nutrition']),
  makeDesign('royal-chai-assam-tea', 'Royal Chai Heritage', 'Luxury Tea Gift Caddy Box', 'Packaging', 'Tea & Beverages', '/images/designs/packing-18.jpeg', 'Heritage Indian tea box with paisley embossing and gold foil accents for Darjeeling tea.', ['Royal Chai', 'Tea Caddy', 'Embossed Box']),
  makeDesign('flora-fizz-kombucha', 'Flora Fizz Kombucha', 'Amber Glass Beverage Bottle', 'Packaging', 'Health Beverages', '/images/designs/packing-19.jpeg', 'Artisanal illustrated bottle label for sparkling organic ginger and lemon kombucha.', ['Flora Fizz', 'Kombucha Bottle', 'Glass Label']),
  makeDesign('san-marzano-pasta-sauce', 'San Marzano Pasta Sauce', 'Artisan Glass Jar Label', 'Packaging', 'Gourmet Italian Food', '/images/designs/packing-20.jpeg', 'Rustic Italian glass jar label with checkered border for authentic San Marzano sauce.', ['San Marzano', 'Pasta Sauce Jar', 'Italian Food']),
  makeDesign('shea-velvet-body-butter', 'Shea Velvet Body Butter', 'Luxury Cosmetic Jar Packaging', 'Packaging', 'Personal Care', '/images/designs/packing-21.jpeg', 'Frosted double-wall cosmetic jar with gold hot-stamped lid label for whipped shea butter.', ['Shea Velvet', 'Cosmetic Jar', 'Body Butter']),
  makeDesign('highland-peak-coffee-bag', 'Highland Peak Coffee', 'Degassing Valve Coffee Bag', 'Packaging', 'Specialty Coffee', '/images/designs/packing-22.jpeg', 'Side-gusset coffee bag with one-way degassing valve and tear notch for whole beans.', ['Highland Peak', 'Coffee Bag', 'Degassing Valve']),
  makeDesign('pure-botanica-essential-oil', 'Pure Botanica Oil', 'Amber Dropper Bottle Box', 'Packaging', 'Aromatherapy', '/images/designs/packing-23.jpeg', 'Minimalist amber dropper bottle label and tuck-end box for 100% lavender essential oil.', ['Pure Botanica', 'Essential Oil', 'Dropper Box']),
  makeDesign('ansh-elaichi-tea-pouch', 'ANSH Elaichi Tea', 'Cardamom Tea Pouch Packaging', 'Packaging', 'Tea & FMCG', '/images/designs/ansh-elaichi-tea.jpg', 'Green and gold aromatic tea pouch with tea garden visual for ANSH Elaichi Tea.', ['ANSH Tea', 'Elaichi Tea', 'Tea Pouch']),
  makeDesign('tpp-butter-paper-wrap', 'TPP Butter Paper', 'Food Grade Repeat Pattern Wrap', 'Packaging', 'Restaurant Paper', '/images/designs/tpp-butter-paper.jpg', 'Custom greaseproof food wrap sheets with repeat burger and food icon vectors.', ['TPP Paper', 'Butter Paper', 'Food Wrap'])
];

// ==========================================
// 4 MERCH DESIGNS (Pure Apparel & Merch)
// ==========================================
const MERCH = [
  makeDesign('goku-saiyan-tee', 'Goku Saiyan Apparel', 'Anime Streetwear Graphic Tee', 'Merch', 'Apparel & Streetwear', '/images/designs/design.jpeg', 'Japanese anime streetwear graphic tee design with bold kanji and dynamic character art.', ['Anime Streetwear', 'Goku Kanji', 'Apparel Tee']),
  makeDesign('myst-official-apparel', 'MYST Official Merch', 'Studio Streetwear Collection', 'Merch', 'Apparel & Merch', '/images/designs/design-2.jpeg', 'Oversized streetwear apparel drop featuring typography layout and back-print specs.', ['MYST Merch', 'Streetwear Drop', 'Typography Tee']),
  makeDesign('urban-edge-graphic-tee', 'Urban Edge Streetwear', 'Cyberpunk Graphic T-Shirt', 'Merch', 'Apparel & Streetwear', '/images/designs/design-3.jpeg', 'Bold cyberpunk oversized graphic t-shirt design prepared for direct-to-garment printing.', ['Urban Edge', 'Cyberpunk Tee', 'Oversized T-Shirt']),
  makeDesign('by2men-crop-top-design', 'by2men.com', 'Signature Streetwear Crop Top', 'Merch', 'Women Apparel', '/images/designs/by2men-crop-top.jpg', 'Vibrant orange streetwear crop top graphic designed for by2men.com commercial launch.', ['by2men', 'Crop Top', 'Streetwear'])
];

// ==========================================
// 1 WEBSITE BANNER DESIGN
// ==========================================
const WEBSITE = [
  makeDesign('agniyantra-vastu-banner', 'Agniyantra Brand Header', 'Vastu Brand Panoramic Header', 'Website', 'Vastu & Spiritual', '/images/designs/agniyantra-vastu-banner.jpg', 'Auspicious panoramic brand header for Agniyantra Vastu remedies portal.', ['Agniyantra', 'Vastu Header', 'Web Banner'])
];

// Combine all 100 pure verified designs
const ALL_DESIGNS = [
  ...LOGOS,
  ...MENUS,
  ...POSTERS,
  ...SOCIAL_MEDIA,
  ...PACKAGING,
  ...MERCH,
  ...WEBSITE
];

console.log('Total pure designs assembled:', ALL_DESIGNS.length);
console.log('Breakdown by category:');
const counts = {};
ALL_DESIGNS.forEach(d => counts[d.category] = (counts[d.category] || 0) + 1);
console.log(counts);

// Read current mockData.ts
const mockDataPath = 'src/data/mockData.ts';
let code = fs.readFileSync(mockDataPath, 'utf8');

const startMarker = 'export const DESIGNS_PROJECTS: DesignProject[] = ';
const endMarker = 'export const BUSINESS_PACKAGES: BusinessPackage[] = ';

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found in mockData.ts');
  process.exit(1);
}

const before = code.slice(0, startIndex + startMarker.length);
const after = code.slice(endIndex);

const newArrayCode = JSON.stringify(ALL_DESIGNS, null, 2) + ';\n\n';
const finalCode = before + newArrayCode + after;

fs.writeFileSync(mockDataPath, finalCode, 'utf8');
console.log('Successfully updated mockData.ts with clean, exact designs!');
