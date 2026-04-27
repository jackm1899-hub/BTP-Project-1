export const CATEGORIES = [
  { id: 'furniture', name: 'Furniture & Home Decor', icon: '🛋️', arLabel: 'View in Your Room' },
  { id: 'electronics', name: 'Electronics & Appliances', icon: '📺', arLabel: 'Visualize in Your Space' },
  { id: 'fashion', name: 'Fashion & Wearables', icon: '👗', arLabel: 'Virtual Try-On' },
  { id: 'toys', name: 'Toys, Games & Hobbies', icon: '🎮', arLabel: 'See It Come Alive' },
  { id: 'other', name: 'Other Categories', icon: '🌟', arLabel: 'Experience Before You Buy' },
];

export const SUBCATEGORIES = {
  furniture: ['Chairs', 'Sofas', 'Coffee Tables', 'Beds', 'Desks', 'Bookshelves', 'Dining Sets', 'Lamps', 'Vases', 'Mirrors', 'Rugs', 'Wall Art', 'Coffee Makers', 'Cookware', 'Home Office'],
  electronics: ['TVs', 'Smart Speakers', 'Computer Monitors', 'Gaming Consoles', 'Air Purifiers', 'Heaters', 'Vacuum Cleaners', 'Air Conditioners'],
  fashion: ['Sunglasses', 'Eyeglasses', 'Computer Glasses', 'Sports Goggles', 'Sneakers', 'Athletic Shoes', 'Sandals', 'Boots', 'Formal Shoes'],
  toys: ['Action Figures', 'Building Sets', 'Dolls', 'Board Games', 'Puzzles', 'Active Games', 'Video Game Accessories'],
  other: ['Exercise Bikes', 'Yoga Mats', 'Dumbbells', 'Treadmills', 'Pet Beds', 'Cages', 'Pet Furniture', 'Seat Covers', 'Dash Cams', 'Paintings', 'Sculptures'],
};

// Category-specific image keywords mapped to Unsplash
const IMG_KEYWORDS = {
  // Furniture
  'Sofas': 'sofa', 'Chairs': 'chair', 'Coffee Tables': 'coffee-table',
  'Beds': 'bed', 'Desks': 'desk', 'Bookshelves': 'bookshelf',
  'Dining Sets': 'dining-table', 'Lamps': 'lamp', 'Vases': 'vase',
  'Mirrors': 'mirror', 'Rugs': 'rug', 'Wall Art': 'wall-art',
  'Coffee Makers': 'coffee-maker', 'Cookware': 'cookware', 'Home Office': 'home-office',
  // Electronics
  'TVs': 'television', 'Smart Speakers': 'smart-speaker',
  'Computer Monitors': 'computer-monitor', 'Gaming Consoles': 'gaming-console',
  'Air Purifiers': 'air-purifier', 'Heaters': 'electric-heater',
  'Vacuum Cleaners': 'vacuum-cleaner', 'Air Conditioners': 'air-conditioner',
  // Fashion
  'Sunglasses': 'sunglasses', 'Eyeglasses': 'eyeglasses',
  'Computer Glasses': 'glasses', 'Sports Goggles': 'sports-goggles',
  'Sneakers': 'sneakers', 'Athletic Shoes': 'running-shoes',
  'Sandals': 'sandals', 'Boots': 'boots', 'Formal Shoes': 'oxford-shoes',
  // Toys
  'Action Figures': 'action-figure', 'Building Sets': 'lego',
  'Dolls': 'doll', 'Board Games': 'board-game',
  'Puzzles': 'jigsaw-puzzle', 'Active Games': 'toy',
  'Video Game Accessories': 'gaming-controller',
  // Other
  'Exercise Bikes': 'exercise-bike', 'Yoga Mats': 'yoga-mat',
  'Dumbbells': 'dumbbell', 'Treadmills': 'treadmill',
  'Pet Beds': 'dog-bed', 'Cages': 'bird-cage', 'Pet Furniture': 'cat-tree',
  'Seat Covers': 'car-seat', 'Dash Cams': 'dashcam',
  'Paintings': 'painting', 'Sculptures': 'sculpture',
};

const img = (subcategory, id) => {
  const kw = IMG_KEYWORDS[subcategory] || 'product';
  return `https://source.unsplash.com/400x300/?${kw}&sig=${id}`;
};

const p = (id, name, category, subcategory, price, mrp, stock, rating, reviews, desc, features, featured = false, arEnabled = true, modelPath = null) => ({
  id: String(id),
  name, category, subcategory, price, mrp,
  discount: Math.round(((mrp - price) / mrp) * 100),
  stock, rating, reviews,
  description: desc,
  features,
  featured, arEnabled,
  modelPath: modelPath || `/models/${category}/${name.toLowerCase().replace(/\s+/g, '_')}.glb`,
  image: img(subcategory, id),
  inStock: stock > 0,
  isNew: id > 55,
  createdAt: new Date(Date.now() - Math.random() * 1e10).toISOString(),
});

const products = [
  // FURNITURE & HOME DECOR
  p(1,'Luxe Velvet Sofa','furniture','Sofas',45999,62000,8,4.7,312,'Premium 3-seater velvet sofa with solid wood legs and high-density foam cushions.',['3-seater','Velvet upholstery','Solid oak legs','High-density foam'],true),
  p(2,'Ergonomic Office Chair','furniture','Chairs',18999,28000,15,4.5,218,'Mesh back ergonomic chair with lumbar support, adjustable armrests and height.',['Mesh back','Lumbar support','Height adjustable','360° swivel'],true),
  p(3,'Scandinavian Coffee Table','furniture','Coffee Tables',12499,17000,20,4.4,156,'Minimalist coffee table with solid wood top and powder-coated metal legs.',['Solid wood top','Metal legs','60cm x 120cm','Easy assembly'],false),
  p(4,'King Size Platform Bed','furniture','Beds',38999,55000,6,4.6,189,'Platform bed with upholstered headboard and sturdy slat support system.',['King size','Upholstered headboard','No box spring needed','Walnut veneer'],true),
  p(5,'Standing Desk Electric','furniture','Desks',32000,45000,12,4.8,402,'Electric height-adjustable standing desk with memory presets and cable management.',['Electric motor','4 height presets','Anti-collision','Cable management tray'],true),
  p(6,'6-Shelf Bookcase','furniture','Bookshelves',8499,12000,30,4.3,98,'Open shelving bookcase in natural oak finish, perfect for home offices.',['6 shelves','Oak finish','Load 15kg/shelf','Easy assembly'],false),
  p(7,'Dining Table 6-Seater','furniture','Dining Sets',54999,75000,4,4.5,76,'Solid mango wood 6-seater dining table with cross-leg base design.',['Solid mango wood','Seats 6','Handcrafted','Natural finish'],false),
  p(8,'Arc Floor Lamp','furniture','Lamps',6999,9500,25,4.4,145,'Elegant arc floor lamp with brushed gold finish and linen drum shade.',['300cm arc','E27 bulb','360° rotation','Brushed gold'],false),
  p(9,'Hexagonal Wall Mirror','furniture','Mirrors',4999,7500,18,4.6,221,'Hexagonal wall mirror with brass frame, adds depth and light to any room.',['Hexagonal','Brass frame','60cm diameter','Wall mount kit included'],false),
  p(10,'Persian Area Rug 5x7','furniture','Rugs',9999,15000,14,4.5,167,'Hand-knotted Persian-style rug with rich crimson and ivory pattern.',['5x7 feet','Hand-knotted wool','Non-slip backing','Stain resistant'],true),
  p(11,'Abstract Canvas Wall Art','furniture','Wall Art',3499,5500,40,4.3,89,'Large format abstract art on gallery-wrapped canvas, ready to hang.',['60x90cm','Gallery wrapped','UV resistant inks','Ready to hang'],false),
  p(12,'Capsule Coffee Maker','furniture','Coffee Makers',7999,11000,22,4.7,534,'Compact capsule coffee machine with 15-bar pressure and fast heat-up.',['15-bar pressure','0.7L tank','30s heat-up','Nespresso compatible'],true),
  p(13,'Cast Iron Cookware Set','furniture','Cookware',5499,8000,16,4.6,298,'5-piece cast iron cookware set pre-seasoned and ready to use.',['5-piece set','Pre-seasoned','Oven safe 500°F','All stovetops'],false),
  p(14,'Bamboo Monitor Stand','furniture','Home Office',2999,4500,35,4.4,178,'Bamboo monitor stand with 2 USB ports and adjustable height slots.',['Bamboo','2 USB 3.0','Height adjustable','Universal fit'],false),
  p(15,'Boucle Accent Armchair','furniture','Chairs',16499,22000,9,4.5,134,'Boucle fabric accent chair with walnut legs, perfect reading nook addition.',['Boucle fabric','Walnut legs','Swivel base','High back'],false),

  // ELECTRONICS & APPLIANCES
  p(16,'OLED 65" Smart TV','electronics','TVs',89999,120000,5,4.9,812,'65-inch 4K OLED TV with Dolby Vision, HDR10+ and 120Hz refresh rate.',['65" 4K OLED','120Hz refresh','Dolby Vision & Atmos','4 HDMI 2.1'],true),
  p(17,'Smart Speaker Pro','electronics','Smart Speakers',8999,13000,28,4.6,445,'360° room-filling sound with built-in voice assistant and multi-room audio.',['360° sound','Voice assistant','Multi-room','WiFi + Bluetooth'],true),
  p(18,'27" QHD Gaming Monitor','electronics','Computer Monitors',28999,40000,11,4.7,289,'27-inch QHD IPS monitor with 165Hz refresh, 1ms response, USB-C.',['27" QHD IPS','165Hz refresh','1ms response','USB-C 65W PD'],true),
  p(19,'Next-Gen Gaming Console','electronics','Gaming Consoles',54999,59999,3,4.9,1204,'Next-gen gaming console with 1TB SSD, 4K/120fps and haptic controller.',['1TB SSD','4K 120fps','Ray tracing','Haptic controller'],true),
  p(20,'HEPA Air Purifier 800sqft','electronics','Air Purifiers',14999,22000,19,4.8,367,'Covers 800 sq ft, 5-stage HEPA filtration, whisper-quiet at 22dB.',['800 sq ft','5-stage HEPA','22dB quiet','Air quality sensor'],false),
  p(21,'Ceramic Panel Heater','electronics','Heaters',6999,9500,24,4.5,198,'1500W ceramic heater with oscillation, 3 heat settings and 8hr timer.',['1500W','Oscillation','8hr timer','Overheat protection'],false),
  p(22,'Robot Vacuum Cleaner','electronics','Vacuum Cleaners',34999,48000,8,4.7,523,'Self-emptying robot vacuum with LiDAR mapping and 180-min runtime.',['LiDAR mapping','Self-emptying','180 min runtime','App control'],true),
  p(23,'Inverter Split AC 1.5T','electronics','Air Conditioners',42999,58000,7,4.6,312,'5-star inverter split AC with WiFi control, PM 2.5 filter, fast cooling.',['5-star rated','WiFi control','PM2.5 filter','Auto-clean'],true),
  p(24,'Soundbar 2.1 Wireless','electronics','Smart Speakers',12999,18000,16,4.5,234,'2.1 channel soundbar with wireless subwoofer and Dolby Atmos support.',['2.1 channel','Wireless sub','Dolby Atmos','4K passthrough'],false),
  p(25,'4K Outdoor Camera','electronics','TVs',4999,7000,32,4.4,156,'Outdoor 4K PoE security camera with color night vision and AI detection.',['4K resolution','Color night vision','AI detection','IP67 waterproof'],false),

  // FASHION & WEARABLES
  p(26,'Aviator Sunglasses Gold','fashion','Sunglasses',3499,5500,40,4.6,534,'Classic gold-frame aviator sunglasses with UV400 polarised lenses.',['UV400 polarised','Gold metal frame','Unisex','Case included'],true),
  p(27,'Blue Light Blocking Glasses','fashion','Computer Glasses',1999,3500,55,4.7,892,'Blue light blocking glasses with anti-reflective coating for screen use.',['Blue light block','Anti-reflective','Zero magnification','Lightweight frame'],true),
  p(28,'Photochromic Sport Goggles','fashion','Sports Goggles',2499,3999,30,4.5,178,'Photochromic sports goggles with anti-fog coating for outdoor activities.',['Photochromic','Anti-fog','TR90 frame','UV400 protection'],false),
  p(29,'Titanium Eyeglass Frame','fashion','Eyeglasses',4999,7500,20,4.4,123,'Titanium full-rim eyeglass frames with lightweight flexible temples.',['Titanium','Lightweight','Spring hinge','Multiple colors'],false),
  p(30,'Air Max Running Shoes','fashion','Sneakers',7999,11000,25,4.8,1120,'Lightweight running shoes with responsive foam midsole and breathable upper.',['Responsive foam','Mesh upper','Non-slip outsole','Sizes 6-12'],true),
  p(31,'Trail Running Shoes','fashion','Athletic Shoes',5999,9000,18,4.6,445,'All-terrain trail shoes with rock plate and grippy Vibram outsole.',['Vibram outsole','Rock plate','Waterproof','Sizes 6-12'],false),
  p(32,'Full-Grain Chelsea Boots','fashion','Boots',8999,14000,12,4.7,289,'Full-grain leather Chelsea boots with elastic side panels and stacked heel.',['Full-grain leather','Elastic panels','Stacked heel','Handcrafted'],true),
  p(33,'Cork Anatomic Sandals','fashion','Sandals',2999,4500,35,4.5,312,'Anatomical cork footbed sandals with adjustable straps and rubber outsole.',['Cork footbed','Adjustable straps','Sizes 4-11','Water resistant'],false),
  p(34,'Brogue Oxford Shoes','fashion','Formal Shoes',6499,9500,16,4.6,198,'Classic brogue Oxford shoes in genuine leather with rubber sole.',['Genuine leather','Brogue detailing','Rubber sole','Sizes 6-12'],false),
  p(35,'Cat-Eye Gradient Sunnies','fashion','Sunglasses',2499,3999,45,4.5,678,'Vintage-inspired cat-eye sunglasses with gradient lenses and acetate frame.',['Gradient lenses','Acetate frame','UV400','Unisex'],false),

  // TOYS, GAMES & HOBBIES
  p(36,'Marvel Hero Action Set','toys','Action Figures',3499,5000,40,4.8,892,'6-inch Marvel superhero action figure with 20 points of articulation.',['6-inch scale','20 articulation pts','Accessories included','Collector grade'],true),
  p(37,'LEGO Architecture Set','toys','Building Sets',8999,12000,22,4.9,1456,'1500-piece architecture building set with detailed structure and display base.',['1500 pieces','Display build','Ages 16+','Step-by-step guide'],true),
  p(38,'Barbie Dream House','toys','Dolls',12999,18000,10,4.7,567,'3-storey Barbie Dream House with elevator, pool and 70+ accessories.',['3 storeys','Elevator','Pool','70+ accessories'],true),
  p(39,'Catan Strategy Board Game','toys','Board Games',3999,5500,30,4.8,1120,'Classic strategy board game for 3-4 players, build settlements and trade.',['3-4 players','Ages 10+','60-120 min','Award winning'],true),
  p(40,'1000-Piece Jigsaw Puzzle','toys','Puzzles',1499,2500,50,4.5,345,'Vibrant 1000-piece puzzle featuring impressionist landscape artwork.',['1000 pieces','68x48cm finished','Quality cardboard','Gift ready'],false),
  p(41,'PS5 Dual Controller Stand','toys','Video Game Accessories',2499,3500,25,4.6,234,'Dual PS5 DualSense controller charging stand with LED indicators.',['Dual charging','LED indicators','USB-C','Compact design'],false),
  p(42,'Nerf Elite Blaster 24','toys','Active Games',2999,4500,35,4.6,456,'Elite Nerf blaster with 24-dart drum and jam-clearing mechanism.',['24-dart drum','Jam-clear','Range 27m','Ages 8+'],false),
  p(43,'Programmable Robot Kit','toys','Building Sets',5999,8500,15,4.7,312,'Programmable robot kit with app control and 200+ building pieces.',['200+ pieces','App controlled','STEM learning','Ages 10+'],false),
  p(44,'Wooden Secret Puzzle Box','toys','Puzzles',1999,3000,40,4.4,189,'Handcrafted wooden puzzle box with secret compartment, 9 steps to open.',['Handcrafted','Secret compartment','9-step puzzle','Gift ready'],false),

  // OTHER CATEGORIES
  p(45,'Magnetic Spin Bike Pro','other','Exercise Bikes',28999,42000,8,4.7,534,'Belt-drive indoor spin bike with magnetic resistance and LCD display.',['Belt drive','Magnetic resistance','22 levels','LCD display'],true),
  p(46,'Premium TPE Yoga Mat','other','Yoga Mats',2499,3999,60,4.8,1234,'6mm thick non-slip TPE yoga mat with alignment lines and carry strap.',['6mm thick','TPE material','Alignment lines','Carry strap'],true),
  p(47,'Adjustable Dumbbell 52lb','other','Dumbbells',18999,28000,12,4.8,678,'5-52.5 lb adjustable dumbbell with quick-change dial, replaces 15 sets.',['5-52.5 lb','Quick-change dial','Replaces 15 sets','Ergonomic grip'],true),
  p(48,'Folding Treadmill 15%','other','Treadmills',42999,60000,5,4.6,312,'Folding treadmill with 15% incline, 5L CHP motor and 12 preset programs.',['15% incline','5L CHP motor','12 programs','Folding design'],true),
  p(49,'Orthopedic Memory Pet Bed','other','Pet Beds',3999,6000,25,4.7,456,'Memory foam orthopedic dog bed with waterproof cover and non-slip base.',['Memory foam','Waterproof cover','Non-slip base','Machine washable'],false),
  p(50,'Wrought Iron Bird Cage','other','Cages',8999,13000,10,4.5,198,'Spacious wrought iron bird cage with play top, feeder cups and stand.',['Wrought iron','Play top','3 feeder cups','Powder coated'],false),
  p(51,'6-Tier Cat Tree Tower','other','Pet Furniture',6999,10000,15,4.6,378,'6-tier cat tree with scratching posts, hammock and interactive toys.',['6 tiers','Sisal scratching','Hammock','Interactive toys'],false),
  p(52,'Universal Car Seat Cover','other','Seat Covers',3499,5500,30,4.4,234,'Universal fit seat cover set with waterproof fabric, airbag compatible.',['Universal fit','Waterproof','Airbag compatible','5-piece set'],false),
  p(53,'4K Dual Dash Cam GPS','other','Dash Cams',9999,15000,18,4.7,567,'Front and rear 4K dual dash cam with night vision, GPS and parking mode.',['4K front camera','Rear camera','GPS tracking','Parking mode'],false),
  p(54,'Abstract Oil Painting','other','Paintings',12999,20000,8,4.8,123,'Hand-painted abstract oil painting on stretched canvas, signed by artist.',['Hand-painted','Stretched canvas','60x90cm','Artist signed'],false),
  p(55,'Bronze Abstract Sculpture','other','Sculptures',24999,38000,4,4.9,67,'Limited edition bronze resin abstract sculpture on marble base.',['Bronze resin','Marble base','30cm height','Limited edition'],false),
  p(56,'Smart Auto Pet Feeder','other','Pet Furniture',4999,7500,20,4.6,289,'Automatic pet feeder with app control, 5L hopper and voice recording.',['App control','5L hopper','Voice recording','Portion control'],false),
  p(57,'Resistance Band Set 5pc','other','Yoga Mats',1999,3500,50,4.7,892,'5-piece resistance band set with door anchor and exercise guide.',['5 resistance levels','Door anchor','Exercise guide','Latex free'],false),
  p(58,'Racing Gaming Chair','furniture','Chairs',15999,24000,14,4.6,445,'Racing-style gaming chair with lumbar pillow, headrest and 180° recline.',['180° recline','Lumbar pillow','Headrest','Metal frame'],true),
  p(59,'TKL Mechanical Keyboard','electronics','Computer Monitors',8999,13000,20,4.8,678,'Tenkeyless mechanical keyboard with Cherry MX switches and RGB backlight.',['Cherry MX switches','RGB per-key','TKL layout','USB-C'],false),
  p(60,'True Wireless Earbuds ANC','electronics','Smart Speakers',5999,9000,35,4.7,1120,'True wireless earbuds with ANC, 32hr total battery and IPX5 rating.',['ANC','32hr battery','IPX5','Wireless charging case'],true),
  p(61,'AMOLED Fitness Smartwatch','electronics','Smart Speakers',12999,18000,22,4.6,789,'Fitness smartwatch with AMOLED display, GPS, SpO2 and 14-day battery.',['AMOLED display','Built-in GPS','SpO2 sensor','14-day battery'],true),
  p(62,'Kids Ergonomic Backpack','toys','Dolls',1999,3000,45,4.5,345,'Ergonomic school backpack with padded straps, 30L capacity and reflective strips.',['30L capacity','Padded straps','Reflective strips','Waterproof'],false,false),
  p(63,'15W Wireless Charging Pad','electronics','Computer Monitors',2999,4500,40,4.6,567,'15W wireless fast charging pad compatible with all Qi devices.',['15W fast charge','Multi-device','LED indicator','Non-slip base'],false,false),
  p(64,'Heavy-Duty Canvas Tote','fashion','Sandals',999,1800,80,4.4,289,'Heavy-duty canvas tote with reinforced handles and inner zipper pocket.',['Heavy-duty canvas','Reinforced handles','Inner pocket','Eco-friendly'],false,false),
  p(65,'Grid Foam Massage Roller','other','Yoga Mats',1499,2500,55,4.7,634,'High-density foam roller for deep tissue massage and muscle recovery.',['High-density foam','33cm x 14cm','Grid texture','Eco-foam'],false),
];

export default products;
