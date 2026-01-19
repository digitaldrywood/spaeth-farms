-- +goose Up

-- Categories
INSERT INTO categories (id, name, description, sort_order) VALUES
    ('steaks', 'Premium Steaks', 'Hand-cut, dry-aged steaks', 0),
    ('roasts', 'Roasts', 'Perfect for slow cooking', 1),
    ('ground', 'Ground Beef', 'Fresh ground from whole muscle', 2),
    ('bundles', 'Bundles & Shares', 'Stock your freezer and save', 3),
    ('specialty', 'Specialty Cuts', 'Unique cuts for adventurous cooks', 4)
ON CONFLICT (id) DO NOTHING;

-- Products
INSERT INTO products (slug, name, category_id, price_cents, weight, description, image, featured, in_stock) VALUES
    ('ribeye-steak', 'Ribeye Steak', 'steaks', 3499, '12 oz', 'Our ribeye steaks are cut from the rib section of our grass-fed, grain-finished cattle. Each steak is hand-selected for optimal marbling and dry-aged to develop deep, complex flavors. The perfect choice for grilling or pan-searing.', '/static/images/ribeye.jpg', true, true),
    ('ny-strip-steak', 'New York Strip Steak', 'steaks', 2999, '12 oz', 'The New York Strip is a steakhouse favorite for good reason. Cut from the short loin, it offers a perfect balance of tenderness and robust beef flavor. Our strips feature a satisfying chew with excellent marbling throughout.', '/static/images/nystrip.jpg', true, true),
    ('filet-mignon', 'Filet Mignon', 'steaks', 3999, '8 oz', 'Our Filet Mignon is cut from the tenderloin, the most tender muscle on the animal. This lean, elegant cut practically melts in your mouth. Perfect for special occasions or when you want the ultimate in tenderness.', '/static/images/filet.jpg', true, true),
    ('sirloin-steak', 'Top Sirloin Steak', 'steaks', 1898, '10 oz', 'Our Top Sirloin offers excellent beef flavor at an accessible price point. Leaner than ribeye but still tender and juicy when cooked properly. A versatile steak that works great on the grill, in stir-fries, or sliced for fajitas.', '/static/images/sirloin.jpg', false, true),
    ('t-bone-steak', 'T-Bone Steak', 'steaks', 3699, '16 oz', 'The T-Bone gives you the best of both worlds: a New York Strip on one side and a portion of tenderloin on the other, separated by the characteristic T-shaped bone. A true steakhouse classic that delivers variety in every bite.', '/static/images/tbone.jpg', false, true),
    ('chuck-roast', 'Chuck Roast', 'roasts', 1299, 'per lb', 'Our Chuck Roast is the ultimate comfort food cut. When braised low and slow, the marbling melts into the meat, creating fork-tender beef with rich, beefy flavor. Perfect for pot roast, beef stew, or shredded beef tacos.', '/static/images/chuck-roast.jpg', false, true),
    ('prime-rib-roast', 'Prime Rib Roast', 'roasts', 2499, 'per lb', 'Our bone-in Prime Rib Roast is the centerpiece your special occasion deserves. Cut from the same premium rib section as our ribeye steaks, this impressive roast features exceptional marbling and develops a beautiful crust when roasted.', '/static/images/prime-rib.jpg', true, true),
    ('brisket', 'Whole Brisket', 'roasts', 1099, 'per lb', 'Our whole packer brisket includes both the flat and point, giving you everything you need for authentic Texas-style BBQ. With proper smoking technique, this cut transforms into tender, smoky perfection with a beautiful bark.', '/static/images/brisket.jpg', false, true),
    ('rump-roast', 'Rump Roast', 'roasts', 999, 'per lb', 'Our Rump Roast is a lean, economical choice for everyday cooking. It responds beautifully to braising, becoming tender and flavorful. Excellent for pot roast or sliced thin for sandwiches.', '/static/images/rump-roast.jpg', false, true),
    ('ground-beef-80-20', 'Ground Beef 80/20', 'ground', 899, 'per lb', 'Our 80/20 ground beef is the perfect all-purpose grind. With 20% fat content, it delivers maximum flavor and stays juicy whether you''re making burgers, meatballs, or taco meat. Ground fresh from whole muscle cuts.', '/static/images/ground-beef.jpg', false, true),
    ('ground-beef-90-10', 'Ground Beef 90/10', 'ground', 999, 'per lb', 'Our 90/10 ground beef offers a leaner option for those watching their fat intake. Still plenty flavorful for everyday cooking, it''s ideal for dishes where you''ll drain the fat, like tacos or meat sauces.', '/static/images/ground-lean.jpg', false, true),
    ('ground-beef-bulk', 'Ground Beef Bulk Pack (10 lbs)', 'ground', 7998, '10 lbs', 'Our bulk ground beef pack gives you 10 pounds of our premium 80/20 grind at a discounted price. Perfect for families or anyone who wants to stock their freezer with quality beef. Packaged in convenient 1 lb portions.', '/static/images/ground-bulk.jpg', true, true),
    ('grill-masters-bundle', 'Grill Master''s Bundle', 'bundles', 29999, 'Approx. 15 lbs', 'Our Grill Master''s Bundle gives you a premium selection of our best grilling cuts. Includes 4 ribeye steaks, 4 NY strips, 4 sirloin steaks, and 5 lbs of ground beef for burgers. Perfect for summer entertaining or stocking up for the season.', '/static/images/grill-bundle.jpg', true, true),
    ('family-essentials-bundle', 'Family Essentials Bundle', 'bundles', 19999, 'Approx. 20 lbs', 'Our Family Essentials Bundle provides a variety of versatile cuts perfect for everyday family meals. Includes roasts for Sunday dinner, steaks for the grill, and ground beef for quick weeknight meals. Exceptional value for quality beef.', '/static/images/family-bundle.jpg', false, true),
    ('quarter-beef', 'Quarter Beef Share', 'bundles', 89999, 'Approx. 100+ lbs', 'Our Quarter Beef Share gives you approximately 100+ lbs of premium beef including steaks, roasts, ground beef, and more. Each share is custom cut to your specifications. The best value for serious beef lovers who want to fill their freezer.', '/static/images/quarter-beef.jpg', false, true),
    ('beef-short-ribs', 'Beef Short Ribs', 'specialty', 1499, 'per lb', 'Our beef short ribs are loaded with rich, beefy flavor. Whether you braise them Korean-style, smoke them Texas-style, or slow-cook them in red wine, these meaty ribs deliver incredible depth of flavor.', '/static/images/short-ribs.jpg', false, true),
    ('beef-stew-meat', 'Beef Stew Meat', 'specialty', 1199, 'per lb', 'Our beef stew meat is cut from quality chuck and round, pre-cubed for your convenience. These 1-inch cubes are perfect for stews, curries, kebabs, or any recipe calling for bite-sized beef.', '/static/images/stew-meat.jpg', false, true),
    ('beef-liver', 'Beef Liver', 'specialty', 599, 'per lb', 'Beef liver is nature''s multivitamin, packed with iron, B vitamins, and protein. Our liver is sourced from healthy, well-raised cattle. Perfect for classic liver and onions or added to ground beef for extra nutrition.', '/static/images/liver.jpg', false, true),
    ('beef-bones', 'Beef Marrow Bones', 'specialty', 499, 'per lb', 'Our beef marrow bones are perfect for making nutrient-rich bone broth at home. Loaded with collagen, minerals, and flavor, these bones simmer down into liquid gold. Also great for roasting and spreading the marrow on toast.', '/static/images/bones.jpg', false, true),
    ('flank-steak', 'Flank Steak', 'specialty', 1698, 'per lb', 'Flank steak is a lean, flavorful cut from the abdominal muscles. When sliced thin against the grain, it''s incredibly tender. Perfect for fajitas, stir-fries, London broil, or marinated and grilled.', '/static/images/flank.jpg', false, true)
ON CONFLICT (slug) DO NOTHING;

-- Hero Slides
INSERT INTO hero_slides (image, alt_text, sort_order, active) VALUES
    ('/static/images/hero-cattle.jpg', 'Spaeth Farms cattle grazing', 0, true),
    ('/static/images/farm-scene.jpg', 'Scenic farm view', 1, true),
    ('/static/images/hereford-herd.jpg', 'Hereford cattle herd', 2, true)
ON CONFLICT DO NOTHING;

-- Testimonials
INSERT INTO testimonials (author, location, content, rating, featured) VALUES
    ('Michael R.', 'Chicago, IL', 'The ribeyes from Spaeth Farms are hands-down the best steaks I''ve ever cooked at home. The marbling is incredible and the flavor is unmatched.', 5, true),
    ('Sarah & Tom K.', 'Minneapolis, MN', 'We ordered the Family Essentials Bundle and it fed our family of five for over a month. Great variety and amazing quality at a fair price.', 5, true),
    ('David L.', 'Denver, CO', 'Shipping was fast and everything arrived frozen solid. You can really taste the difference when beef is raised right. We''re customers for life!', 5, true)
ON CONFLICT DO NOTHING;

-- Site Settings
INSERT INTO site_settings (key, value) VALUES
    ('phone', '715-313-0075'),
    ('email', 'info@spaethfarms.com'),
    ('address', 'Loyal, Wisconsin'),
    ('free_shipping_min', '199'),
    ('tagline', 'Premium Farm-Raised Beef Delivered Nationwide'),
    ('about_short', 'Family-owned Spaeth Farms has been raising premium Hereford cattle in Wisconsin for generations.'),
    ('facebook_url', ''),
    ('instagram_url', ''),
    ('shipping_info', 'Orders ship Monday-Wednesday via FedEx. Free shipping on orders over $199.'),
    ('return_policy', 'We stand behind our products. If you''re not satisfied, contact us within 7 days of delivery.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- +goose Down
DELETE FROM site_settings;
DELETE FROM testimonials;
DELETE FROM hero_slides;
DELETE FROM products;
DELETE FROM categories;
