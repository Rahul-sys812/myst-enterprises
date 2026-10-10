import { ClientRecord, ProductItem, DesignProject, BusinessPackage, Invoice, ChatMessage } from '@/types';

// Organic pseudo-random status distribution to eliminate rigid repeating patterns
function getOrganicStatus(clientNo: number): 'Completed' | 'In Progress' | 'Payment Pending' {
  const pseudoRand = Math.abs(Math.sin(clientNo * 12.9898 + 78.233) * 43758.5453) % 1;
  // Natural studio distribution: ~72% Completed, ~16% In Progress, ~12% Payment Pending
  if (pseudoRand < 0.72) {
    return 'Completed';
  } else if (pseudoRand < 0.88) {
    return 'In Progress';
  } else {
    return 'Payment Pending';
  }
}

function makeClient(no: number): ClientRecord {
  const names = ['Ravi Kumar','Sunita Devi','Manoj Tiwari','Geeta Singh','Anil Sharma','Rekha Joshi','Deepak Nair','Preeti Mehta','Sanjay Yadav','Anjali Gupta','Vijay Patel','Neha Verma','Rakesh Bose','Swati Chauhan','Kiran Shah','Tarun Mishra','Shilpa Agarwal','Pankaj Dubey','Alka Srivastava','Dinesh Pandey','Meena Rawat','Suresh Rao','Kavya Iyer','Rohit Saxena','Poornima Nambiar','Harinder Singh','Divya Khanna','Lalit Tripathi','Prachi Desai','Manas Dey','Smriti Kapila','Bhavesh Mehta','Kamla Devi','Pratap Rathore','Shweta Jain','Naveen Bakshi','Chanda Bahl','Siddharth Rastogi','Ruchika Bansal','Yogesh Soni','Shruti Choudhary','Neeraj Pillai','Tanuja Wadhwa','Anoop Krishnan','Seema Sabharwal','Vivek Manchanda','Rita Batra','Manish Goel','Pallavi Sethi','Avinash Dixit','Kusum Bhatt','Mohit Arora','Priya Lal','Rakshit Anand','Vidya Suresh','Gaurav Sharma','Sudha Murthy','Rajeev Bhargava','Asha Patil','Vineet Kumar','Malvika Goyal','Rohini Das','Ashwin Menon','Chandni Khosla','Deepa Pillai','Sameer Luthra','Tanu Sharma','Jigar Vora','Sarika Chawla','Naresh Kohli','Bharti Singh','Ajay Mathur','Devika Reddy','Saurabh Garg','Nandini Kaul','Rishi Talwar','Meghna Thakkar','Alok Trivedi','Jasmine Kaur','Puneet Bhatia','Swapna Nair','Rajneesh Malhotra','Shreya Agrawal','Ashutosh Sinha','Urmila Deshpande','Kamal Bhardwaj','Deepthi Rao','Sachin Pawar','Renu Chopra','Amitabh Lal','Chitralekha Joshi','Nikhil Bajaj','Supriya Ghosh','Prem Sagar','Anita Chadha','Madan Mohan','Prathima Kutty','Girish Jain','Aditi Bhattacharya','Lokesh Sharma','Sunanda Bali','Arvind Mehrotra','Gayatri Krishnamurthy','Harish Tanna','Vandana Oberoi','Sunil Bakht','Bhavana Hegde','Rajiv Bedi','Savitha Nair','Varun Ahuja','Sulochana Shetty','Abhijit Rane','Nirmal Khatri','Swetlana Das','Mukesh Ahluwalia','Saroj Kumari','Pranav Doshi','Leela Menon','Asif Khan','Priyanka Bahl','Ramesh Babu','Hema Chandrashekhar','Srinivas Iyengar','Kamini Sood','Vishal Khanna','Padma Rajan','Aakash Yadav','Renuka Pillai','Hemant Dikshit','Manjula Rao','Sudhir Kapoor','Nirmala Sharma','Pradip Bose','Jayalaxmi Nair','Chirag Vyas','Saraswati Devi','Ankur Bhatia','Veena Subramaniam','Nilesh Soni','Aruna Goswami','Suyash Trivedi','Lata Rani','Kapil Verma','Devyani Kulkarni','Babu Lal','Varsha Tiwari','Sarath Kumar','Indira Reddy','Madhur Singh','Radha Gopalan','Sanjeevan Nair','Pushpa Gupta','Devendra Pandey','Sandhya Maheshwari','Satish Chand','Bhanu Pratap','Usha Rani','Chetan Shukla','Padmini Iyer','Mohinder Grover','Kanta Devi','Jaswant Singh','Savitri Bai','Narayana Swami','Thomas John','Mary Joseph','Joshua David','Antony Fernandes','Grace Pinto','Samuel Rodrigues','Liza Mathews','Reginald Xavier','Denis Cruz','Sheila Vaz','Maxim Pereira','Rosario Alves','Celina Colaco','Adrian Gomes'];
  const businesses = ['Digital Print Studio','Spice Garden Restaurant','Golden Threads Boutique','Sunrise Pharmacy','Urban Cuts Salon','TechEdge Solutions','Sky High Real Estate','FreshMart Grocery','RoyalFit Gym','Naturals Organic Store','CloudNine Events','PetCare Plus','Mamas Kitchen','Digi Biz Agency','Horizon Academy','AromaWorld Spa','MediCare Clinic','Buildcraft Contractors','StyleHouse Fashion','SafeZone Security','Greenfield Farms','Limelight Studio','EcoHome Interiors','Swifty Logistics','TastyBites Cafe','Artisan Jewels','ProFit Training','LegalEase Consultants','BrightStar Nursery','InfoSoft Systems','Saffron Spices','Mahi Tiles and Marble','Royal Guard Agency','HealthFirst Hospital','DreamHome Realty','PureFoods Catering','AutoPro Workshop','BlueSky Tours','KidZone Playschool','Stitched in Style','HyperLocal Ads','MindTree Yoga','SilverKey Hotels','QuickFix Electronics','Bloomfield Florist','WeightWatchers Diet','ZestMart Superstore','CraftBrew Beverages','Pinecrest Builders','LabelKing Packaging'];
  const works = ['Logo Design','Visiting Card','Social Media Posts','Banner & Poster','Menu Design','Brochure','Packaging Design','Letterhead','Logo + Social','Logo + Menu','Logo + Cards','Social + Banner','Catalogue','T-Shirt Design','Website Graphics','Sticker Design','Logo + Brochure','Full Branding','Social Media Kit','Logo + Packaging'];
  const locations = ['Delhi','Mumbai, MH','Bengaluru, Karnataka','Hyderabad, Telangana','Chennai, Tamil Nadu','Kolkata, WB','Ahmedabad, Gujarat','Jaipur, Rajasthan','Lucknow, UP','Chandigarh','Pune, MH','Surat, Gujarat','Nagpur, MH','Indore, MP','Coimbatore, Tamil Nadu','Bhubaneswar, Odisha','Kochi, Kerala','Amritsar, Punjab','Ludhiana, Punjab','Gurugram, Haryana','Noida, UP','Agra, UP','Varanasi, UP','Patna, Bihar','Ranchi, Jharkhand','Guwahati, Assam','Jammu, JK','Dehradun, Uttarakhand','Shimla, HP','Sirsa, Haryana'];
  const amounts = [2500,3000,3500,4000,4500,5000,5500,6000,6500,7000,7500,8000,8500,9000,9500,10000,1200,1500,1800,2000];
  const idx = no - 1;
  const name = names[idx % names.length];
  const business = businesses[idx % businesses.length];
  const work = works[idx % works.length];
  const location = locations[idx % locations.length];
  const status = getOrganicStatus(no);
  const amount = amounts[idx % amounts.length];
  const baseDate = new Date(2025, 3 + Math.floor(idx / 20), 1 + (idx % 28));
  const dateStr = baseDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const paidAmount = status === 'Completed' ? amount : status === 'In Progress' ? Math.round(amount / 2) : 0;
  const balance = amount - paidAmount;
  const notes = status === 'Completed'
    ? 'Project delivered. Files shared with client. Full settlement received.'
    : status === 'In Progress'
    ? 'Project in creative progress. 50% advance received, balance due on delivery.'
    : 'Deliverables ready. Payment pending from client.';
  return {
    id: `c-${no}`, clientNo: no, name, business, work, amount, paidAmount, balance, status,
    date: dateStr, addedOn: dateStr,
    ...(status === 'Completed' ? { workCompletedDate: dateStr } : {}),
    phone: `+91 9${String(8000000 + no * 7).padStart(9,'0').slice(0,9)}`,
    email: `${name.split(' ')[0].toLowerCase()}${no}@gmail.com`,
    location, address: `Shop ${(no % 50) + 1}, ${location}`,
    workItems: [work], notes,
  };
}

function makeInvoice(no: number, client: ClientRecord): Invoice {
  const invNo = String(no).padStart(3, '0');
  const paidAmount = client.paidAmount ?? (client.status === 'Completed' ? client.amount : 0);
  const balance = client.balance ?? (client.amount - paidAmount);
  return {
    id: `inv-${invNo}`, invoiceNumber: `INV-${invNo}`, clientNo: client.clientNo,
    clientName: client.name, clientBusiness: client.business,
    clientPhone: client.phone || '+91 98765 43210',
    clientEmail: client.email || 'client@gmail.com',
    clientAddress: client.address || client.location || 'New Delhi',
    location: client.location || 'New Delhi',
    date: client.date, dueDate: client.date,
    items: [{ id: '1', description: client.work, quantity: 1, rate: client.amount, amount: client.amount }],
    subtotal: client.amount, gstRate: 0, gstAmount: 0, discount: 0,
    totalAmount: client.amount, paidAmount, balance,
    status: client.status === 'Completed' ? 'Paid' : client.status === 'In Progress' ? 'Partial' : 'Pending',
    paymentMethod: 'UPI / Google Pay',
    notes: '• All design files will be shared in high resolution.\n• Revisions included as per package.\n• Thank you for choosing MYST Enterprises!',
  };
}

const TOP_CLIENTS: ClientRecord[] = [
  { id: 'c-232', clientNo: 232, name: 'Nisha Arora', business: 'Aurora Boutique', work: 'Logo + Menu + Packaging Suite', amount: 50000, paidAmount: 50000, balance: 0, status: 'Completed', date: '13 Sep 2026', addedOn: '08 Sep 2026', workCompletedDate: '13 Sep 2026', phone: '+91 98112 34567', email: 'nisha@auroraboutique.in', location: 'New Delhi', address: 'Shop 14, Khan Market, New Delhi', logoPreview: '/images/package-boutique.jpg', workItems: ['Boutique Luxury Logo Design (3 concepts)','Gold Foil Embossed Hangtags Layout','Price Menu & E-Commerce Packaging Suite'], notes: 'High priority luxury pastel theme. Full settlement of Rs 50,000 received via YES BANK.' },
  { id: 'c-231', clientNo: 231, name: 'Rohan Mehta', business: 'Skyline Builders', work: 'Brochure + Hoarding + Campaign', amount: 15601, paidAmount: 15601, balance: 0, status: 'Completed', date: '06 Sep 2026', addedOn: '01 Sep 2026', workCompletedDate: '06 Sep 2026', phone: '+91 98760 12345', email: 'rohan.mehta@skylinebuilders.com', location: 'Noida, UP', address: 'Tower B, Sector 62, Noida, UP', logoPreview: '/images/package-realestate.jpg', workItems: ['Corporate 8-Page Real Estate Brochure','Site Construction Hoarding (20x10 ft)','High-CTR WhatsApp Digital Launch Ads'], notes: 'Corporate campaign delivered. Full settlement of Rs 15,601 credited via YES BANK.' },
  { id: 'c-230', clientNo: 230, name: 'Pooja Verma', business: 'Blush Salon', work: 'Social Media Posts + Neon Signboard', amount: 10100, paidAmount: 10100, balance: 0, status: 'Completed', date: '02 Sep 2026', addedOn: '28 Aug 2026', workCompletedDate: '02 Sep 2026', phone: '+91 99201 98765', email: 'pooja@blushsalon.com', location: 'Mumbai, MH', address: '2nd Floor, Linking Road, Bandra West, Mumbai', logoPreview: '/images/package-salon.jpg', workItems: ['Neon Acrylic Signboard Vector Specs','30 Instagram Story & Post Templates','Salon Services Rate Card'], notes: '30 Instagram templates in Canva and Photoshop delivered. Rs 10,100 settlement credited.' },
  { id: 'c-229', clientNo: 229, name: 'Amit Saini', business: 'FitZone Gym', work: 'Poster + Visiting Card + Flex Banner', amount: 11200, paidAmount: 11200, balance: 0, status: 'Completed', date: '02 Sep 2026', addedOn: '27 Aug 2026', workCompletedDate: '02 Sep 2026', phone: '+91 97188 54321', email: 'amit@fitzonegym.in', location: 'Ludhiana, Punjab', address: 'Plot 45, Model Town, Ludhiana, Punjab', logoPreview: '/images/package-gym.jpg', workItems: ['Heavy Barbell Mascot Logo','Gym Rules & Safety Flex Banner (8x4 ft)','Membership Executive Visiting Cards'], notes: 'High-res CMYK print files ready for flex banner printing. Rs 11,200 received via YES BANK.' },
  { id: 'c-228', clientNo: 228, name: 'Kavita Jain', business: 'Living Crafts Home Decor', work: 'Catalogue + Packaging Suite', amount: 10300, paidAmount: 10300, balance: 0, status: 'Completed', date: '30 Aug 2026', addedOn: '24 Aug 2026', workCompletedDate: '30 Aug 2026', phone: '+91 98334 11223', email: 'kavita@livingcrafts.co', location: 'Bengaluru, Karnataka', address: 'Indiranagar 100ft Road, Bengaluru, Karnataka', logoPreview: '/images/product-menu.jpg', workItems: ['36-Page Luxury Lighting Catalogue','Product Dielines & Packaging Boxes','E-Commerce Lookbook Assets'], notes: '36-page luxury furniture & lighting catalogue with print specs. Rs 10,300 paid in full.' },
  { id: 'c-227', clientNo: 227, name: 'Priya Kapoor', business: 'Kinder Quest Pre School', work: 'Admission Posters + Social Campaign', amount: 7165, paidAmount: 7165, balance: 0, status: 'Completed', date: '28 Aug 2026', addedOn: '20 Aug 2026', workCompletedDate: '28 Aug 2026', phone: '+91 98733 62321', email: 'kinderquestt@gmail.com', location: 'Model Town 2, Delhi', address: 'K-8, Model Town 2, Delhi 110009', logoPreview: '/images/designs/kinder-quest-fun.jpg', workItems: ['A3 Admission Open Posters (2 Concepts)','School Gate Heavy Vinyl Flex Banner (6x4 ft)','15 Instagram & WhatsApp Admission Creatives'], notes: 'Preschool admission campaign. All 3D character assets and print CMYK files delivered. Rs 7,165 credited.' },
  { id: 'c-226', clientNo: 226, name: 'Vikram Singhania', business: 'ANSH Foods / V&S Group', work: 'Tea Pouch Packaging Suite', amount: 12500, paidAmount: 12500, balance: 0, status: 'Completed', date: '19 Aug 2026', addedOn: '12 Aug 2026', workCompletedDate: '19 Aug 2026', phone: '+91 78320 59438', email: 'contact@anshfoods.in', location: 'New Delhi', address: 'Industrial Area, Phase 1, New Delhi', logoPreview: '/images/designs/ansh-elaichi-tea.jpg', workItems: ['Elaichi Tea Foil Pouch Dieline (250g & 500g)','FSSAI & Nutrition Table Regulatory Layout','Distributor Brochure & Product Creative'], notes: 'Delivered ready-to-print rotogravure cylinders artwork and pantone specs. Rs 12,500 settled.' },
  { id: 'c-225', clientNo: 225, name: 'Harish Gupta', business: 'TPP Packaging Industries', work: 'Printed Butter Paper & Carton Suite', amount: 30700, paidAmount: 30700, balance: 0, status: 'Completed', date: '14 Aug 2026', addedOn: '06 Aug 2026', workCompletedDate: '14 Aug 2026', phone: '+91 95820 48800', email: 'tppackaging@gmail.com', location: 'Narela, Delhi', address: 'M-93, Bhorgarh Industrial Area, Phase-2, Narela, Delhi-110040', logoPreview: '/images/designs/tpp-butter-paper.jpg', workItems: ['Continuous Repeat Burger & Sandwich Pattern','Food-Grade Grease Resistant Print Master','Carton Packaging Artwork'], notes: 'Bulk printing specs delivered for flexographic roll-to-roll press. Rs 30,700 settled via YES BANK.' },
  { id: 'c-224', clientNo: 224, name: 'Sahil Bansal', business: 'by2men.com', work: 'E-Com Ad Creatives', amount: 4500, paidAmount: 4500, balance: 0, status: 'Completed', date: '08 Aug 2026', addedOn: '01 Aug 2026', workCompletedDate: '08 Aug 2026', phone: '+91 83681 14656', email: 'orders@by2men.com', location: 'Gurugram, Haryana', address: 'Sector 29, Gurugram, Haryana', logoPreview: '/images/designs/by2men-crop-top.jpg', workItems: ['Meta Ad Campaign Banners (1:1 & 9:16)','Crop Top Studio Launch Creatives','Website Promo Hero Slides'], notes: 'High conversion CTR creatives tested on Meta ads with positive RoAS.' },
  { id: 'c-223', clientNo: 223, name: 'Pandit Rajesh', business: 'Agniyantra Remedies', work: 'Website Header + Catalog', amount: 7000, paidAmount: 3500, balance: 3500, status: 'In Progress', date: '02 Aug 2026', addedOn: '25 Jul 2026', phone: '+91 98100 23456', email: 'rajesh@agniyantra.com', location: 'Varanasi, UP', address: 'Assi Ghat Road, Varanasi, UP', logoPreview: '/images/designs/agniyantra-vastu-banner.jpg', workItems: ['Panoramic E-Commerce Storefront Header','Amazon A+ Content Modules','Brass Artifacts Product Catalog'], notes: 'Banner approved. Catalog dielines and product specs currently in progress.' },
  { id: 'c-222', clientNo: 222, name: 'Rahul Sharma', business: 'Sharma Cafe', work: 'Logo + Menu + Social + Cards', amount: 8000, paidAmount: 8000, balance: 0, status: 'Completed', date: '25 Jul 2026', addedOn: '18 Jul 2026', workCompletedDate: '25 Jul 2026', phone: '+91 98765 43210', email: 'rahulcafe@gmail.com', location: 'Sirsa, Haryana', address: 'Near Clock Tower, Sirsa, Haryana 125055', logoPreview: '/images/sharma-cafe-logo.jpg', workItems: ['Logo Design (3 concepts)','Menu Design (A4 - 4 pages)','Social Media Posts (10)','Visiting Card (2 concepts)'], notes: 'Premium cafe branding completed. Delivered vector source files, menu print-ready PDF and 10 social creatives.' },
];

const OLD_CLIENTS: ClientRecord[] = Array.from({ length: 221 }, (_, i) => makeClient(i + 1));

export const INITIAL_CLIENTS: ClientRecord[] = [
  ...TOP_CLIENTS,
  ...OLD_CLIENTS.slice().reverse(),
];

const TOP_INVOICES: Invoice[] = [
  { id: 'inv-232', invoiceNumber: 'INV-232', clientNo: 232, clientName: 'Nisha Arora', clientBusiness: 'Aurora Boutique', clientPhone: '+91 98112 34567', clientEmail: 'nisha@auroraboutique.in', clientAddress: 'Shop 14, Khan Market, New Delhi', location: 'New Delhi', date: '13 Sep 2026', dueDate: '13 Sep 2026', items: [{ id: '1', description: 'Premium Brand Identity & Vector Logo Master Suite', quantity: 1, rate: 25000, amount: 25000 },{ id: '2', description: 'Luxury Tri-fold Menu, Hangtags & Packaging Architecture', quantity: 1, rate: 25000, amount: 25000 }], subtotal: 50000, gstRate: 0, gstAmount: 0, discount: 0, totalAmount: 50000, paidAmount: 50000, balance: 0, status: 'Paid', paymentMethod: 'YES BANK / UPI', notes: '• Full payment of Rs 50,000 received via YES BANK (A/C: 118020700000360).\n• All high-res vector master files & commercial copyright transferred.' },
  { id: 'inv-231', invoiceNumber: 'INV-231', clientNo: 231, clientName: 'Rohan Mehta', clientBusiness: 'Skyline Builders', clientPhone: '+91 98760 12345', clientEmail: 'rohan.mehta@skylinebuilders.com', clientAddress: 'Tower B, Sector 62, Noida, UP', location: 'Noida, UP', date: '06 Sep 2026', dueDate: '06 Sep 2026', items: [{ id: '1', description: 'Corporate 8-Page Real Estate Project Brochure (Print CMYK)', quantity: 1, rate: 8601, amount: 8601 },{ id: '2', description: 'Site Construction Hoarding (20x10 ft) & Launch Campaign Suite', quantity: 1, rate: 7000, amount: 7000 }], subtotal: 15601, gstRate: 0, gstAmount: 0, discount: 0, totalAmount: 15601, paidAmount: 15601, balance: 0, status: 'Paid', paymentMethod: 'YES BANK / UPI', notes: '• Full payment of Rs 15,601 received via YES BANK.\n• Thank you for partnering with MYST ENTERPRISES!' },
  { id: 'inv-230', invoiceNumber: 'INV-230', clientNo: 230, clientName: 'Pooja Verma', clientBusiness: 'Blush Salon', clientPhone: '+91 99201 98765', clientEmail: 'pooja@blushsalon.com', clientAddress: '2nd Floor, Linking Road, Bandra West, Mumbai', location: 'Mumbai, MH', date: '02 Sep 2026', dueDate: '02 Sep 2026', items: [{ id: '1', description: 'Neon Acrylic Signboard Vector & Facade Specs', quantity: 1, rate: 5100, amount: 5100 },{ id: '2', description: '30 High-Engagement Instagram Post & Story Creative Templates', quantity: 1, rate: 5000, amount: 5000 }], subtotal: 10100, gstRate: 0, gstAmount: 0, discount: 0, totalAmount: 10100, paidAmount: 10100, balance: 0, status: 'Paid', paymentMethod: 'YES BANK / UPI', notes: '• Settlement of Rs 10,100 credited via UPI (yespay.bizsbiz266901@yesbankltd).\n• Vector assets delivered.' },
  { id: 'inv-229', invoiceNumber: 'INV-229', clientNo: 229, clientName: 'Amit Saini', clientBusiness: 'FitZone Gym', clientPhone: '+91 97188 54321', clientEmail: 'amit@fitzonegym.in', clientAddress: 'Plot 45, Model Town, Ludhiana, Punjab', location: 'Ludhiana, Punjab', date: '02 Sep 2026', dueDate: '02 Sep 2026', items: [{ id: '1', description: 'Heavy Barbell Mascot Logo & Vector Identity Suite', quantity: 1, rate: 5200, amount: 5200 },{ id: '2', description: 'Gym Rules & Safety Flex Banner (8x4 ft) & Collaterals', quantity: 1, rate: 6000, amount: 6000 }], subtotal: 11200, gstRate: 0, gstAmount: 0, discount: 0, totalAmount: 11200, paidAmount: 11200, balance: 0, status: 'Paid', paymentMethod: 'YES BANK / UPI', notes: '• Settlement of Rs 11,200 credited via YES BANK.\n• CMYK print-ready files included.' },
  { id: 'inv-228', invoiceNumber: 'INV-228', clientNo: 228, clientName: 'Kavita Jain', clientBusiness: 'Living Crafts Home Decor', clientPhone: '+91 98334 11223', clientEmail: 'kavita@livingcrafts.co', clientAddress: 'Indiranagar 100ft Road, Bengaluru, Karnataka', location: 'Bengaluru, Karnataka', date: '30 Aug 2026', dueDate: '30 Aug 2026', items: [{ id: '1', description: '36-Page Luxury Lighting & Furniture Lookbook Catalogue', quantity: 1, rate: 6300, amount: 6300 },{ id: '2', description: 'Product Dielines, Corrugated Packaging Boxes & E-Com Assets', quantity: 1, rate: 4000, amount: 4000 }], subtotal: 10300, gstRate: 0, gstAmount: 0, discount: 0, totalAmount: 10300, paidAmount: 10300, balance: 0, status: 'Paid', paymentMethod: 'YES BANK / UPI', notes: '• Full payment of Rs 10,300 received via YES BANK.\n• Thank you for choosing MYST ENTERPRISES!' },
  { id: 'inv-227', invoiceNumber: 'INV-227', clientNo: 227, clientName: 'Priya Kapoor', clientBusiness: 'Kinder Quest Pre School', clientPhone: '+91 98733 62321', clientEmail: 'kinderquestt@gmail.com', clientAddress: 'K-8, Model Town 2, Delhi 110009', location: 'Model Town 2, Delhi', date: '28 Aug 2026', dueDate: '28 Aug 2026', items: [{ id: '1', description: 'A3 Admission Open Posters & 3D Kids Character Illustrative Layouts', quantity: 1, rate: 3665, amount: 3665 },{ id: '2', description: 'School Gate Vinyl Flex Banner (6x4 ft) & WhatsApp Creatives', quantity: 1, rate: 3500, amount: 3500 }], subtotal: 7165, gstRate: 0, gstAmount: 0, discount: 0, totalAmount: 7165, paidAmount: 7165, balance: 0, status: 'Paid', paymentMethod: 'YES BANK / UPI', notes: '• Full settlement of Rs 7,165 credited via UPI (yespay.bizsbiz266901@yesbankltd).\n• All high-res files delivered.' },
  { id: 'inv-226', invoiceNumber: 'INV-226', clientNo: 226, clientName: 'Vikram Singhania', clientBusiness: 'ANSH Foods / V&S Group', clientPhone: '+91 78320 59438', clientEmail: 'contact@anshfoods.in', clientAddress: 'Industrial Area, Phase 1, New Delhi', location: 'New Delhi', date: '19 Aug 2026', dueDate: '19 Aug 2026', items: [{ id: '1', description: 'Elaichi Tea Metallic Foil Pouch Dieline (250g & 500g Packs)', quantity: 1, rate: 8500, amount: 8500 },{ id: '2', description: 'FSSAI Regulatory Compliance Layout & Rotogravure Cylinder Specs', quantity: 1, rate: 4000, amount: 4000 }], subtotal: 12500, gstRate: 0, gstAmount: 0, discount: 0, totalAmount: 12500, paidAmount: 12500, balance: 0, status: 'Paid', paymentMethod: 'YES BANK / UPI', notes: '• Full settlement of Rs 12,500 received via YES BANK.\n• Rotogravure-ready cylinders master files included.' },
  { id: 'inv-225', invoiceNumber: 'INV-225', clientNo: 225, clientName: 'Harish Gupta', clientBusiness: 'TPP Packaging Industries', clientPhone: '+91 95820 48800', clientEmail: 'tppackaging@gmail.com', clientAddress: 'M-93, Bhorgarh Industrial Area, Phase-2, Narela, Delhi-110040', location: 'Narela, Delhi', date: '14 Aug 2026', dueDate: '14 Aug 2026', items: [{ id: '1', description: 'Continuous Repeat Greaseproof Butter Paper Vector Cylinder Master', quantity: 1, rate: 18700, amount: 18700 },{ id: '2', description: 'Food-Grade Carton Master Dieline & Roll Print Specifications', quantity: 1, rate: 12000, amount: 12000 }], subtotal: 30700, gstRate: 0, gstAmount: 0, discount: 0, totalAmount: 30700, paidAmount: 30700, balance: 0, status: 'Paid', paymentMethod: 'YES BANK / UPI', notes: '• Full settlement of Rs 30,700 credited via YES BANK (A/C: 118020700000360).\n• Flexographic roll press files delivered.' },
  { id: 'inv-224', invoiceNumber: 'INV-224', clientNo: 224, clientName: 'Sahil Bansal', clientBusiness: 'by2men.com', clientPhone: '+91 83681 14656', clientEmail: 'orders@by2men.com', clientAddress: 'Sector 29, Gurugram, Haryana', location: 'Gurugram, Haryana', date: '08 Aug 2026', dueDate: '15 Aug 2026', items: [{ id: '1', description: 'Meta Ad Campaign Banners (1:1 & 9:16)', quantity: 1, rate: 2000, amount: 2000 },{ id: '2', description: 'Crop Top Studio Launch Creatives', quantity: 1, rate: 1500, amount: 1500 },{ id: '3', description: 'Website Promo Hero Slides', quantity: 1, rate: 1000, amount: 1000 }], subtotal: 4500, gstRate: 0, gstAmount: 0, discount: 0, totalAmount: 4500, paidAmount: 4500, balance: 0, status: 'Paid', paymentMethod: 'YES BANK / UPI', notes: '• All ad creatives delivered in multiple formats.\n• Thank you for choosing MYST Enterprises!' },
  { id: 'inv-223', invoiceNumber: 'INV-223', clientNo: 223, clientName: 'Pandit Rajesh', clientBusiness: 'Agniyantra Remedies', clientPhone: '+91 98100 23456', clientEmail: 'rajesh@agniyantra.com', clientAddress: 'Assi Ghat Road, Varanasi, UP', location: 'Varanasi, UP', date: '02 Aug 2026', dueDate: '09 Aug 2026', items: [{ id: '1', description: 'Panoramic E-Commerce Storefront Header', quantity: 1, rate: 3500, amount: 3500 },{ id: '2', description: 'Amazon A+ Content Modules', quantity: 1, rate: 2000, amount: 2000 },{ id: '3', description: 'Brass Artifacts Product Catalog', quantity: 1, rate: 1500, amount: 1500 }], subtotal: 7000, gstRate: 0, gstAmount: 0, discount: 0, totalAmount: 7000, paidAmount: 3500, balance: 3500, status: 'Partial', paymentMethod: 'YES BANK / UPI', notes: '• Balance Rs 3,500 due on catalog completion.\n• Thank you for choosing MYST Enterprises!' },
  { id: 'inv-222', invoiceNumber: 'INV-222', clientNo: 222, clientName: 'Rahul Sharma', clientBusiness: 'Sharma Cafe', clientPhone: '+91 98765 43210', clientEmail: 'rahulcafe@gmail.com', clientAddress: 'Near Clock Tower, Sirsa, Haryana 125055', location: 'Sirsa, Haryana', date: '25 Jul 2026', dueDate: '25 Jul 2026', items: [{ id: '1', description: 'Logo Design (3 Concepts)', quantity: 1, rate: 2000, amount: 2000 },{ id: '2', description: 'Menu Design (A4 - 4 Pages)', quantity: 1, rate: 3000, amount: 3000 },{ id: '3', description: 'Social Media Posts (10)', quantity: 1, rate: 2000, amount: 2000 },{ id: '4', description: 'Visiting Card (2 Concepts)', quantity: 1, rate: 1000, amount: 1000 }], subtotal: 8000, gstRate: 0, gstAmount: 0, discount: 0, totalAmount: 8000, paidAmount: 8000, balance: 0, status: 'Paid', paymentMethod: 'YES BANK / UPI', notes: '• All design files will be shared in high resolution.\n• Revisions included as per package.\n• Thank you for choosing MYST Enterprises!' },
];

const OLD_INVOICES: Invoice[] = OLD_CLIENTS.slice().reverse().map((client) => makeInvoice(client.clientNo, client));
export const INITIAL_INVOICES: Invoice[] = [...TOP_INVOICES, ...OLD_INVOICES];

export const SHARMA_CAFE_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', sender: 'client', senderName: 'Rahul Sharma', text: 'Hi, I am opening a new cafe in Sirsa. I need a logo and menu design. Can you share your packages?', timestamp: '18 Jul 2026, 10:14 AM' },
  { id: 'm2', sender: 'agency', senderName: 'MYST Enterprises', text: 'Hello Rahul! Congratulations on your new venture. We have different packages starting from Rs 6,000. Sharing samples now.', timestamp: '18 Jul 2026, 10:20 AM' },
  { id: 'm3', sender: 'client', senderName: 'Rahul Sharma', text: 'Great! Please show some logo concepts.', timestamp: '19 Jul 2026, 10:25 AM' },
  { id: 'm4', sender: 'agency', senderName: 'MYST Enterprises', text: 'Here are 3 logo concepts for Sharma Cafe. Please check and let me know your feedback.', timestamp: '19 Jul 2026, 10:40 AM', attachment: { type: 'logo-variants', variants: [{ name: 'Concept 1', bg: 'bg-[#2b1408]', color: 'text-[#e0a96d]', label: 'Sharma Cafe - Artisan Roast' },{ name: 'Concept 2', bg: 'bg-[#18110b]', color: 'text-[#f59e0b]', label: 'Sharma Cafe - Good Food Good Mood' },{ name: 'Concept 3', bg: 'bg-[#d8a878]', color: 'text-[#2b1408]', label: 'Sharma Cafe - Minimal Cup' }] } },
  { id: 'm5', sender: 'client', senderName: 'Rahul Sharma', text: 'I like the second one. Can we try with a coffee cup icon and make the font a bit bold?', timestamp: '20 Jul 2026, 11:05 AM' },
  { id: 'm6', sender: 'agency', senderName: 'MYST Enterprises', text: 'Sure, we will update the second concept and share shortly.', timestamp: '20 Jul 2026, 11:20 AM', attachment: { type: 'image', name: 'Sharma_Cafe_Logo_v2.jpg', size: '245 KB', url: '/images/sharma-cafe-logo.jpg' } },
  { id: 'm7', sender: 'client', senderName: 'Rahul Sharma', text: 'This looks good. Please also share menu design samples.', timestamp: '21 Jul 2026, 11:45 AM' },
  { id: 'm8', sender: 'agency', senderName: 'MYST Enterprises', text: 'Here are 2 menu design options. We can customize colours, items and food images.', timestamp: '22 Jul 2026, 09:30 AM', attachment: { type: 'image', name: 'Menu_Option1.jpg', size: '780 KB', url: '/images/product-menu.jpg' } },
  { id: 'm9', sender: 'client', senderName: 'Rahul Sharma', text: 'Option 2 looks better. Can you add more items and keep the same theme?', timestamp: '23 Jul 2026, 10:10 AM' },
  { id: 'm13', sender: 'client', senderName: 'Rahul Sharma', text: 'Awesome. Can you generate the invoice so I can process payment today?', timestamp: '24 Jul 2026, 11:45 AM' },
  { id: 'm14', sender: 'agency', senderName: 'MYST Enterprises', text: 'Invoice #INV-222 for Rs 8,000 has been generated and marked as Paid via YES BANK. Thank you for partnering with MYST Enterprises!', timestamp: '25 Jul 2026, 12:00 PM' }
];

export const ALL_CLIENT_CHATS: Record<string, ChatMessage[]> = {
  'c-rahul-sharma': SHARMA_CAFE_CHAT_MESSAGES, 'c-222': SHARMA_CAFE_CHAT_MESSAGES, '222': SHARMA_CAFE_CHAT_MESSAGES, 'c-233': SHARMA_CAFE_CHAT_MESSAGES, '233': SHARMA_CAFE_CHAT_MESSAGES,
  'c-232': [
    { id: 'na-1', sender: 'client', senderName: 'Nisha Arora', text: 'Hi! I need a luxury logo, price menu and full packaging suite for my boutique in Khan Market. Can you share samples?', timestamp: '08 Sep 2026, 11:00 AM' },
    { id: 'na-2', sender: 'agency', senderName: 'MYST Enterprises', text: 'Hello Nisha ji! We specialize in luxury boutique branding and packaging. Sharing our high-end portfolio samples now.', timestamp: '08 Sep 2026, 11:15 AM' },
    { id: 'na-3', sender: 'client', senderName: 'Nisha Arora', text: 'These look gorgeous! Please proceed with pastel gold theme for logo, menu cards and product packaging suite.', timestamp: '10 Sep 2026, 10:30 AM' },
    { id: 'na-4', sender: 'agency', senderName: 'MYST Enterprises', text: 'Confirmed! Working on complete packaging suite & logo concepts in pastel-gold palette for Aurora Boutique.', timestamp: '10 Sep 2026, 11:00 AM' },
    { id: 'na-5', sender: 'client', senderName: 'Nisha Arora', text: 'Concept is approved! Processed full payment of Rs 50,000 to your YES BANK account.', timestamp: '13 Sep 2026, 11:30 AM' },
    { id: 'na-6', sender: 'agency', senderName: 'MYST Enterprises', text: 'Received Rs 50,000 in YES BANK! All print-ready vector files delivered. INV-232 is marked Paid. Thank you Nisha ji!', timestamp: '13 Sep 2026, 12:00 PM' }
  ],
  '232': [
    { id: 'na-1', sender: 'client', senderName: 'Nisha Arora', text: 'Hi! I need a luxury logo, price menu and full packaging suite for my boutique.', timestamp: '08 Sep 2026, 11:00 AM' },
    { id: 'na-6', sender: 'agency', senderName: 'MYST Enterprises', text: 'Received Rs 50,000 in YES BANK! All files delivered. INV-232 marked Paid.', timestamp: '13 Sep 2026, 12:00 PM' }
  ],
  'c-231': [
    { id: 'rm-1', sender: 'client', senderName: 'Rohan Mehta', text: 'Hello! We need 8-page brochures and 20x10 ft site hoarding for our Noida project.', timestamp: '01 Sep 2026, 09:30 AM' },
    { id: 'rm-2', sender: 'agency', senderName: 'MYST Enterprises', text: 'Hello Rohan ji! Great project. We will start with the 8-page brochure layout and high-impact hoarding artwork.', timestamp: '01 Sep 2026, 10:00 AM' },
    { id: 'rm-3', sender: 'client', senderName: 'Rohan Mehta', text: 'Please include floor plan visuals and amenities page.', timestamp: '03 Sep 2026, 11:00 AM' },
    { id: 'rm-4', sender: 'agency', senderName: 'MYST Enterprises', text: 'Draft 2 of the brochure & hoarding layout is ready. Please review the high-res render.', timestamp: '05 Sep 2026, 03:00 PM' },
    { id: 'rm-5', sender: 'client', senderName: 'Rohan Mehta', text: 'Approved! Transferred Rs 15,601 to your YES BANK account via NEFT.', timestamp: '06 Sep 2026, 02:30 PM' },
    { id: 'rm-6', sender: 'agency', senderName: 'MYST Enterprises', text: 'Payment of Rs 15,601 confirmed in YES BANK! All print files shared. INV-231 marked Paid.', timestamp: '06 Sep 2026, 03:00 PM' }
  ],
  '231': [
    { id: 'rm-1', sender: 'client', senderName: 'Rohan Mehta', text: 'Hello! We need brochures and site hoarding for our Noida project.', timestamp: '01 Sep 2026, 09:30 AM' },
    { id: 'rm-6', sender: 'agency', senderName: 'MYST Enterprises', text: 'Payment of Rs 15,601 confirmed in YES BANK! All print files shared. INV-231 marked Paid.', timestamp: '06 Sep 2026, 03:00 PM' }
  ],
  'c-230': [
    { id: 'pv-1', sender: 'client', senderName: 'Pooja Verma', text: 'Hi MYST! I need 30 Instagram templates and a neon signboard for my salon.', timestamp: '28 Aug 2026, 02:00 PM' },
    { id: 'pv-2', sender: 'agency', senderName: 'MYST Enterprises', text: 'Hello Pooja ji! Salon branding is our specialty. Sharing neon signboard concepts shortly.', timestamp: '28 Aug 2026, 02:30 PM' },
    { id: 'pv-3', sender: 'client', senderName: 'Pooja Verma', text: 'Neon pink and gold is the vibe I want. Please keep it classy.', timestamp: '30 Aug 2026, 11:00 AM' },
    { id: 'pv-4', sender: 'agency', senderName: 'MYST Enterprises', text: 'Signboard vector and all 30 Instagram templates are ready! Sharing files now.', timestamp: '01 Sep 2026, 10:00 AM' },
    { id: 'pv-5', sender: 'client', senderName: 'Pooja Verma', text: 'Absolutely stunning! Sent Rs 10,100 via UPI (yespay.bizsbiz266901@yesbankltd).', timestamp: '02 Sep 2026, 11:30 AM' },
    { id: 'pv-6', sender: 'agency', senderName: 'MYST Enterprises', text: 'Payment of Rs 10,100 received! INV-230 marked Paid. Thank you Pooja ji!', timestamp: '02 Sep 2026, 12:00 PM' }
  ],
  '230': [
    { id: 'pv-1', sender: 'client', senderName: 'Pooja Verma', text: 'Hi MYST! I need 30 Instagram templates and a neon signboard for my salon.', timestamp: '28 Aug 2026, 02:00 PM' },
    { id: 'pv-6', sender: 'agency', senderName: 'MYST Enterprises', text: 'Payment of Rs 10,100 received! INV-230 marked Paid.', timestamp: '02 Sep 2026, 12:00 PM' }
  ],
  'c-229': [
    { id: 'as-1', sender: 'client', senderName: 'Amit Saini', text: 'Need aggressive gym logo and flex banner for FitZone. Something powerful.', timestamp: '27 Aug 2026, 10:00 AM' },
    { id: 'as-2', sender: 'agency', senderName: 'MYST Enterprises', text: 'Got it Amit bhai! Heavy barbell mascot with fire and steel theme coming up.', timestamp: '27 Aug 2026, 10:30 AM' },
    { id: 'as-3', sender: 'client', senderName: 'Amit Saini', text: 'Perfect look! Orange and black works great. Finalize it and send account details.', timestamp: '31 Aug 2026, 04:00 PM' },
    { id: 'as-4', sender: 'client', senderName: 'Amit Saini', text: 'Paid Rs 11,200 via UPI to yespay.bizsbiz266901@yesbankltd.', timestamp: '02 Sep 2026, 10:30 AM' },
    { id: 'as-5', sender: 'agency', senderName: 'MYST Enterprises', text: 'Rs 11,200 credited in YES BANK! All CMYK banner & card files delivered. INV-229 marked Paid!', timestamp: '02 Sep 2026, 11:00 AM' }
  ],
  '229': [
    { id: 'as-1', sender: 'client', senderName: 'Amit Saini', text: 'Need aggressive gym logo and flex banner for FitZone.', timestamp: '27 Aug 2026, 10:00 AM' },
    { id: 'as-5', sender: 'agency', senderName: 'MYST Enterprises', text: 'Rs 11,200 credited in YES BANK! All CMYK banner & card files delivered. INV-229 marked Paid!', timestamp: '02 Sep 2026, 11:00 AM' }
  ],
  'c-228': [
    { id: 'kj-1', sender: 'client', senderName: 'Kavita Jain', text: 'Hello! Need a 36-page luxury catalogue and packaging dielines for Living Crafts.', timestamp: '24 Aug 2026, 10:00 AM' },
    { id: 'kj-2', sender: 'agency', senderName: 'MYST Enterprises', text: 'Namaste Kavita ji! 36-page luxury catalogue is our forte. Sharing layout samples.', timestamp: '24 Aug 2026, 10:30 AM' },
    { id: 'kj-3', sender: 'client', senderName: 'Kavita Jain', text: 'Editorial style with ivory and gold. Please start the catalogue layout.', timestamp: '26 Aug 2026, 11:00 AM' },
    { id: 'kj-4', sender: 'client', senderName: 'Kavita Jain', text: 'Transferred full invoice balance of Rs 10,300 to YES BANK account 118020700000360.', timestamp: '30 Aug 2026, 04:30 PM' },
    { id: 'kj-5', sender: 'agency', senderName: 'MYST Enterprises', text: 'Rs 10,300 credited in YES BANK! Catalogue & dielines delivered. INV-228 marked Paid.', timestamp: '30 Aug 2026, 05:00 PM' }
  ],
  '228': [
    { id: 'kj-1', sender: 'client', senderName: 'Kavita Jain', text: 'Hello! Need a 36-page luxury catalogue and packaging dielines for Living Crafts.', timestamp: '24 Aug 2026, 10:00 AM' },
    { id: 'kj-5', sender: 'agency', senderName: 'MYST Enterprises', text: 'Rs 10,300 credited in YES BANK! Catalogue & dielines delivered. INV-228 marked Paid.', timestamp: '30 Aug 2026, 05:00 PM' }
  ],
  'c-227': [
    { id: 'kq-1', sender: 'client', senderName: 'Priya Kapoor', text: 'Hello MYST Enterprises! We are starting admissions for Kinder Quest preschool in Model Town 2. We need colorful admission posters and banners.', timestamp: '20 Aug 2026, 11:15 AM' },
    { id: 'kq-2', sender: 'agency', senderName: 'MYST Enterprises', text: 'Hello Priya maam! We would love to design your admission campaign with playful 3D cartoon characters and joyful color themes.', timestamp: '20 Aug 2026, 11:30 AM' },
    { id: 'kq-3', sender: 'client', senderName: 'Priya Kapoor', text: 'Great! Also please ensure our tagline is highlighted - Let The Fun Begin! A Place Where Kids Shine', timestamp: '21 Aug 2026, 10:05 AM' },
    { id: 'kq-4', sender: 'agency', senderName: 'MYST Enterprises', text: 'Here is the first admission poster concept with wooden alphabet blocks and 3D kids character!', timestamp: '23 Aug 2026, 04:45 PM', attachment: { type: 'image', name: 'kinder-quest-fun.jpg', size: '185 KB', url: '/images/designs/kinder-quest-fun.jpg' } },
    { id: 'kq-5', sender: 'client', senderName: 'Priya Kapoor', text: 'This is gorgeous! Sent Rs 7,165 settlement to your UPI yespay.bizsbiz266901@yesbankltd.', timestamp: '28 Aug 2026, 04:30 PM' },
    { id: 'kq-6', sender: 'agency', senderName: 'MYST Enterprises', text: 'Rs 7,165 received in YES BANK! All print files sent. INV-227 is marked Paid. Thank you!', timestamp: '28 Aug 2026, 05:00 PM' }
  ],
  '227': [
    { id: 'kq-1', sender: 'client', senderName: 'Priya Kapoor', text: 'Hello MYST Enterprises! We are starting admissions for Kinder Quest preschool.', timestamp: '20 Aug 2026, 11:15 AM' },
    { id: 'kq-6', sender: 'agency', senderName: 'MYST Enterprises', text: 'Rs 7,165 received in YES BANK! All print files sent. INV-227 is marked Paid.', timestamp: '28 Aug 2026, 05:00 PM' }
  ],
  'c-226': [
    { id: 'ansh-1', sender: 'client', senderName: 'Vikram Singhania', text: 'Namaste! We are launching ANSH Elaichi Tea and need premium pouch packaging for 250g and 500g pouches.', timestamp: '12 Aug 2026, 09:30 AM' },
    { id: 'ansh-2', sender: 'agency', senderName: 'MYST Enterprises', text: 'Namaste Vikram ji! We will create a rich tea estate background, aromatic cardamom graphics, and metallic gold foil finish styling.', timestamp: '12 Aug 2026, 10:15 AM' },
    { id: 'ansh-3', sender: 'agency', senderName: 'MYST Enterprises', text: 'Here is the 3D rendered pouch proof for your review!', timestamp: '16 Aug 2026, 03:40 PM', attachment: { type: 'image', name: 'ansh-elaichi-tea.jpg', size: '184 KB', url: '/images/designs/ansh-elaichi-tea.jpg' } },
    { id: 'ansh-4', sender: 'client', senderName: 'Vikram Singhania', text: 'Superb design! Transferred Rs 12,500 to YES BANK account. Ready for cylinder engraving.', timestamp: '19 Aug 2026, 11:00 AM' },
    { id: 'ansh-5', sender: 'agency', senderName: 'MYST Enterprises', text: 'Rs 12,500 confirmed in YES BANK! Master packaging dielines shared. INV-226 marked Paid.', timestamp: '19 Aug 2026, 11:30 AM' }
  ],
  '226': [
    { id: 'ansh-1', sender: 'client', senderName: 'Vikram Singhania', text: 'Namaste! We are launching ANSH Elaichi Tea and need premium pouch packaging.', timestamp: '12 Aug 2026, 09:30 AM' },
    { id: 'ansh-5', sender: 'agency', senderName: 'MYST Enterprises', text: 'Rs 12,500 confirmed in YES BANK! Master packaging dielines shared. INV-226 marked Paid.', timestamp: '19 Aug 2026, 11:30 AM' }
  ],
  'c-225': [
    { id: 'tpp-1', sender: 'client', senderName: 'Harish Gupta', text: 'Hello, we require food-grade greaseproof butter paper repeat pattern for burger and sandwich wraps.', timestamp: '06 Aug 2026, 02:00 PM' },
    { id: 'tpp-2', sender: 'agency', senderName: 'MYST Enterprises', text: 'Hello Harish ji! Sharing the vector pattern design with food icons in food-grade color specification.', timestamp: '10 Aug 2026, 11:20 AM', attachment: { type: 'image', name: 'tpp-butter-paper.jpg', size: '207 KB', url: '/images/designs/tpp-butter-paper.jpg' } },
    { id: 'tpp-3', sender: 'client', senderName: 'Harish Gupta', text: 'The print layout is clean and accurate. Transferred Rs 30,700 to YES BANK account 118020700000360.', timestamp: '14 Aug 2026, 03:45 PM' },
    { id: 'tpp-4', sender: 'agency', senderName: 'MYST Enterprises', text: 'Rs 30,700 confirmed in YES BANK! Roll press cylinder files delivered. INV-225 marked Paid.', timestamp: '14 Aug 2026, 04:15 PM' }
  ],
  '225': [
    { id: 'tpp-1', sender: 'client', senderName: 'Harish Gupta', text: 'Hello, we require food-grade greaseproof butter paper repeat pattern.', timestamp: '06 Aug 2026, 02:00 PM' },
    { id: 'tpp-4', sender: 'agency', senderName: 'MYST Enterprises', text: 'Rs 30,700 confirmed in YES BANK! Roll press cylinder files delivered. INV-225 marked Paid.', timestamp: '14 Aug 2026, 04:15 PM' }
  ],
  'c-224': [{ id: 'by2-1', sender: 'client', senderName: 'Sahil Bansal', text: 'Hi team! Need a high-converting Instagram and Meta ad for our orange crop top launch at Rs 599.', timestamp: '12 Sep 2026, 01:10 PM' },{ id: 'by2-2', sender: 'agency', senderName: 'MYST Enterprises', text: 'Hey Sahil! Created this vibrant Colors That Stand Out creative with trust badges and clear CTA.', timestamp: '15 Sep 2026, 04:30 PM', attachment: { type: 'image', name: 'by2men-crop-top.jpg', size: '174 KB', url: '/images/designs/by2men-crop-top.jpg' } },{ id: 'by2-3', sender: 'client', senderName: 'Sahil Bansal', text: 'Excellent contrast! Running this on our ad sets right away.', timestamp: '20 Sep 2026, 11:00 AM' }],
  '224': [{ id: 'by2-1', sender: 'client', senderName: 'Sahil Bansal', text: 'Hi team! Need a high-converting Instagram and Meta ad for our orange crop top launch.', timestamp: '12 Sep 2026, 01:10 PM' },{ id: 'by2-3', sender: 'client', senderName: 'Sahil Bansal', text: 'Excellent contrast! Running this on our ad sets right away.', timestamp: '20 Sep 2026, 11:00 AM' }],
  'c-223': [{ id: 'agni-1', sender: 'client', senderName: 'Pandit Rajesh', text: 'Namaste! We need a serene, luxury brand header for our Agniyantra Vastu remedies portal.', timestamp: '29 Sep 2026, 10:00 AM' },{ id: 'agni-2', sender: 'agency', senderName: 'MYST Enterprises', text: 'Pranam Pandit ji! Drafting panoramic banner with brass yantras, tortoise, and temple aesthetic.', timestamp: '01 Oct 2026, 02:40 PM', attachment: { type: 'image', name: 'agniyantra-vastu-banner.jpg', size: '63 KB', url: '/images/designs/agniyantra-vastu-banner.jpg' } },{ id: 'agni-3', sender: 'client', senderName: 'Pandit Rajesh', text: 'Very auspicious and divine. Looking forward to the complete catalog next.', timestamp: '02 Oct 2026, 06:15 PM' }],
  '223': [{ id: 'agni-1', sender: 'client', senderName: 'Pandit Rajesh', text: 'Namaste! We need a serene, luxury brand header for our Agniyantra Vastu remedies portal.', timestamp: '29 Sep 2026, 10:00 AM' },{ id: 'agni-3', sender: 'client', senderName: 'Pandit Rajesh', text: 'Very auspicious and divine. Looking forward to the complete catalog next.', timestamp: '02 Oct 2026, 06:15 PM' }],
};

export const PRODUCTS_DATA: ProductItem[] = [
  { id: 'logo-design', title: 'Logo Design', category: 'Branding', shortDesc: 'Iconic, memorable and 100% scalable vector logos tailored for brand authority.', description: 'We craft bespoke brand marks, emblems, wordmarks, and mascot logos that resonate with your target demographic. Every logo comes with comprehensive brand guidelines, color codes, typography pairings, and ready-to-use social avatars.', price: '₹2,500', image: '/images/designs/logo.jpeg', badge: 'Most Popular', features: ['3 Unique Initial Concepts', 'Unlimited Revisions', 'AI, EPS, SVG, PDF, PNG Files', 'Full Commercial Copyright'], formats: ['AI', 'EPS', 'SVG', 'PDF', 'High-Res PNG', 'Favicon'], turnaround: '24-48 Hours' },
  { id: 'business-cards', title: 'Business Cards', category: 'Print', shortDesc: 'High-impact tactile business cards that leave an unforgettable impression.', description: 'Custom print-ready card layouts with premium finishes: matte velvet lamination, metallic gold/silver foil accents, spot UV varnish, and embedded digital QR codes.', price: '₹1,200', image: '/images/product-stationery.jpg', features: ['Double-Sided Custom Layout', 'Print-Ready 300 DPI CMYK', 'Foil & Spot UV Layers', 'Free Dynamic QR Code'], formats: ['AI Vector', 'PDF (Print-Ready)', 'Mockup PNG'], turnaround: '24 Hours' },
  { id: 'social-media-posts', title: 'Social Media Posts', category: 'Digital', shortDesc: 'Scroll-stopping Instagram, Facebook, and LinkedIn creatives that drive engagement.', description: 'High-converting social graphics designed to match your brand aesthetics. Includes promotional banners, educational carousels, festival wishes, reel covers, and quote cards.', price: '₹1,500', image: '/images/designs/social-media.jpeg', badge: 'Trending', features: ['Set of 10 Custom Creatives', 'Editable Canva/PSD templates', 'Story & Post Dimensions', 'High CTR Visual Hooks'], formats: ['PSD', 'Canva Link', 'JPG', 'PNG'], turnaround: '48 Hours' },
  { id: 'banners-posters', title: 'Banners & Posters', category: 'Print', shortDesc: 'Large-scale rollup standees, event flex banners, and shop hoardings.', description: 'Crystal-clear large format designs engineered for long-distance visibility. We strictly adhere to printing press bleed guidelines, color balancing, and typography scale.', price: '₹1,800', image: '/images/designs/poster-1.jpeg', features: ['Any Custom Size (Flex/Standee)', 'True 150-300 DPI Scaling', 'Print Margin & Eyelet Guides', 'Realistic 3D Mockup'], formats: ['TIFF', 'PDF', 'Large-Format AI'], turnaround: '24 Hours' },
  { id: 'menu-design', title: 'Menu Design', category: 'Print', shortDesc: 'Appetizing tri-folds, digital QR menu boards, and restaurant booklets.', description: 'Strategic restaurant and cafe menu layouts designed using eye-movement psychology to highlight high-margin hero dishes.', price: '₹2,000', image: '/images/designs/menu-2.jpeg', badge: 'Best for Cafes', features: ['Food Item Layout & Icons', 'Beverage & Bar Section', 'Print-Ready PDF + Digital PDF', 'QR Code Menu Link'], formats: ['AI Vector', 'PDF (CMYK)', 'Digital Mobile PDF'], turnaround: '48 Hours' },
  { id: 'packaging-design', title: 'Packaging Design', category: 'Print', shortDesc: 'Custom box dielines, pouch graphics, bottle labels, and sleeve wraps.', description: 'Transform your physical product into a luxury shelf hero. We engineer precise structural dielines with barcode placement, nutritional info grids, and photorealistic 3D renders.', price: '₹3,500', image: '/images/designs/packing.jpeg', badge: 'Premium', features: ['Custom Dieline Template', '3D Photorealistic Render', 'Barcode & Label Compliance', 'Ready for Manufacturer'], formats: ['AI Dieline', 'PDF CMYK', '3D Mockup 4K'], turnaround: '3-4 Days' },
  { id: 'website-graphics', title: 'Website Graphics', category: 'Digital', shortDesc: 'Modern hero section banners, UI illustrations, feature badges, and web mockups.', description: 'Pixel-perfect graphic assets tailored for Next.js, WordPress, and Shopify stores. Optimized for lightning-fast web performance.', price: '₹2,500', image: '/images/hero-laptop.jpg', features: ['Modern Hero Banners', 'Custom Icon Sets', 'Retina Ready 2x SVG', 'WebP Optimized Exports'], formats: ['Figma File', 'SVG', 'WebP', 'PNG'], turnaround: '48 Hours' },
  { id: 'brochure-catalogue', title: 'Brochure & Catalogue', category: 'Print', shortDesc: 'Corporate profiles, bi-fold/tri-fold flyers, and multi-page product catalogues.', description: 'Multi-page storytelling layouts that showcase your company milestones, services, and product line with editorial elegance.', price: '₹3,000', image: '/images/designs/menu-6.jpeg', features: ['Grid-Aligned Editorial Layout', 'Infographic Data Visuals', 'Bi-Fold / Tri-Fold / Multi-Page', 'Direct Offset Print PDF'], formats: ['Adobe InDesign', 'AI', 'Press-Ready PDF'], turnaround: '3 Days' },
  { id: 't-shirt-design', title: 'T-Shirt Design', category: 'Merch', shortDesc: 'Typography apparel merch, streetwear graphic drops, and staff uniforms.', description: 'Vector artwork prepared specifically for direct-to-garment (DTG), screen printing, and embroidery.', price: '₹1,500', image: '/images/designs/design-2.jpeg', features: ['Color Separation Ready', 'Front & Back Placement Guides', 'Pantone Color Callouts', 'Apparel Mockup on Model'], formats: ['AI Vector', 'Transparent PNG 300 DPI', 'EPS'], turnaround: '24-48 Hours' },
  { id: 'visiting-cards', title: 'Visiting Cards', category: 'Print', shortDesc: 'Executive, minimal, and textured cards for directors and founders.', description: 'Sleek executive visiting cards featuring micro-embossing, soft-touch coatings, and edge coloring specifications.', price: '₹1,000', image: '/images/product-stationery.jpg', features: ['Minimalist Scandinavian Aesthetics', 'Standard & Custom Die-Cut Sizes', 'Bleed & Safety Margins Included', 'Multiple Team Member Variations'], formats: ['AI', 'PDF', 'PSD'], turnaround: '24 Hours' },
  { id: 'letterhead', title: 'Letterhead', category: 'Branding', shortDesc: 'Official company letterhead, quote templates, and corporate stationery kits.', description: 'Formal corporate stationery templates supplied in both vector print-ready format and editable Microsoft Word / Google Docs formats.', price: '₹1,000', image: '/images/product-stationery.jpg', features: ['Editable MS Word / Docs Version', 'High-Res Print Master PDF', 'Brand Color Headers & Footers', 'Official Watermark Placement'], formats: ['DOCX', 'AI', 'Print PDF'], turnaround: '24 Hours' },
  { id: 'sticker-label', title: 'Sticker & Label', category: 'Print', shortDesc: 'Die-cut vinyl stickers, jar labels, warranty seals, and packaging tape designs.', description: 'Eye-catching adhesive labels for coffee cups, cosmetics bottles, takeaway food containers, and shipping packaging.', price: '₹1,200', image: '/images/product-packaging.jpg', features: ['Custom Die-Cut Contour Lines', 'Waterproof & Vinyl Print Specs', 'Circle, Square or Custom Shapes', 'Bulk Roll Print Layout'], formats: ['AI Vector (with Cut Line)', 'PDF', 'PNG'], turnaround: '24 Hours' }
];

export const DESIGNS_PROJECTS: DesignProject[] = [
  {
    "id": "creativo-flame-bulb",
    "title": "Creativo Studio",
    "subtitle": "3D EMBOSSED BULB LOGO",
    "category": "Logo",
    "industry": "Creative Agency",
    "image": "/images/designs/logo.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Modern 3D embossed bulb icon logo design engineered for creative agencies and media studios.",
    "tags": [
      "3D Embossed",
      "Bulb Emblem",
      "Creative Studio"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Creativo Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "grill-smokehouse-logo",
    "title": "Grill Smokehouse",
    "subtitle": "CULINARY SPATULA MARK",
    "category": "Logo",
    "industry": "Restaurant & BBQ",
    "image": "/images/designs/logo-2.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Negative-space culinary identity integrating a grill spatula into modern typography.",
    "tags": [
      "BBQ Grill",
      "Culinary Mark",
      "Smokehouse"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Grill Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "arts-creative-wordmark",
    "title": "Art's Creative Lab",
    "subtitle": "GEOMETRIC MODERN WORDMARK",
    "category": "Logo",
    "industry": "Art & Design",
    "image": "/images/designs/logo-3.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "High-contrast Scandinavian geometric typography wordmark with fluid ligature curves.",
    "tags": [
      "Wordmark",
      "Geometric",
      "Art Studio"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Art's Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "avenra-origami-cube",
    "title": "Avenra Living",
    "subtitle": "3D GEOMETRIC CUBE EMBLEM",
    "category": "Logo",
    "industry": "Real Estate & Living",
    "image": "/images/designs/logo-4.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Isometric origami cube symbol representing sustainable architectural development.",
    "tags": [
      "Cube Logo",
      "Architecture",
      "Real Estate"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Avenra Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "floura-floral-monogram",
    "title": "Floura Boutique",
    "subtitle": "HANDCRAFTED FLORAL MONOGRAM",
    "category": "Logo",
    "industry": "Fashion & Floral",
    "image": "/images/designs/logo-5.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Delicate botanical serif monogram designed for luxury florists and bridal ateliers.",
    "tags": [
      "Floral Monogram",
      "Boutique",
      "Luxury"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Floura Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "nature-beaute-organic",
    "title": "Nature Beauté",
    "subtitle": "BOTANICAL ORGANIC MARK",
    "category": "Logo",
    "industry": "Cosmetics & Beauty",
    "image": "/images/designs/logo-6.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Clean green leaf contour symbol tailored for cruelty-free organic cosmetic brands.",
    "tags": [
      "Botanical",
      "Cosmetics",
      "Organic"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Nature Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "fz-luxury-monogram",
    "title": "F & Z Collection",
    "subtitle": "DUAL LETTER MONOGRAM",
    "category": "Logo",
    "industry": "Haute Couture",
    "image": "/images/designs/logo-7.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Interlocking serif monogram mark designed for luxury apparel and leather goods.",
    "tags": [
      "Monogram",
      "Haute Couture",
      "Fashion"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "F Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "creative-cyber-tech",
    "title": "Creative Cyber",
    "subtitle": "DIGITAL CIRCUIT EMBLEM",
    "category": "Logo",
    "industry": "Tech & AI",
    "image": "/images/designs/logo-8.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Futuristic hexagon circuit mark engineered for cybersecurity and blockchain software.",
    "tags": [
      "Cybersecurity",
      "Tech Emblem",
      "Hexagon"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Creative Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "falcon-athletics-crest",
    "title": "Falcon Athletics",
    "subtitle": "AGGRESSIVE SPORTS MASCOT",
    "category": "Logo",
    "industry": "Sports & Fitness",
    "image": "/images/designs/logo-9.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Dynamic falcon mascot crest designed for athletic academies, gyms, and sports apparel.",
    "tags": [
      "Falcon Mascot",
      "Athletic Crest",
      "Gym"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Falcon Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "calligraphy-atelier-mark",
    "title": "Calligraphy Atelier",
    "subtitle": "HAND-LETTERED LUXURY MARK",
    "category": "Logo",
    "industry": "Bespoke Stationery",
    "image": "/images/designs/logo-10.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Fluid copperplate script logo mark designed for wedding invitation studios.",
    "tags": [
      "Calligraphy",
      "Wedding Studio",
      "Hand Lettered"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Calligraphy Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "iron-dragon-clan",
    "title": "Iron Dragon Clan",
    "subtitle": "ESPORTS & GAMING MASCOT",
    "category": "Logo",
    "industry": "Gaming & Fitness",
    "image": "/images/designs/logo-11.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "High-energy dragon emblem with razor-sharp contours for esports teams and CrossFit boxes.",
    "tags": [
      "Dragon Mascot",
      "Esports",
      "CrossFit"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Iron Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "vesper-heritage-crest",
    "title": "Vesper Heritage",
    "subtitle": "REGAL HERALDIC CREST",
    "category": "Logo",
    "industry": "Hospitality & Spirits",
    "image": "/images/designs/logo-12.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Classic European heraldic crest featuring symmetrical lions and vintage serif typography.",
    "tags": [
      "Heraldic Crest",
      "Heritage",
      "Distillery"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Vesper Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "artisan-collective-mark",
    "title": "Artisan Collective",
    "subtitle": "VINTAGE CRAFT STAMP",
    "category": "Logo",
    "industry": "Handmade Goods",
    "image": "/images/designs/logo-13.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Circular apothecary stamp logo mark tailored for artisanal leatherworkers and potters.",
    "tags": [
      "Artisan Stamp",
      "Handmade",
      "Craft"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Artisan Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "coffee-leaf-roasters",
    "title": "Coffee Leaf",
    "subtitle": "ARTISANAL ROASTER EMBLEM",
    "category": "Logo",
    "industry": "Cafe & Roastery",
    "image": "/images/designs/logo-14.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Coffee bean intertwined with coffee leaves designed for specialty pour-over cafes.",
    "tags": [
      "Coffee Roaster",
      "Cafe Emblem",
      "Artisanal"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Coffee Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "monoline-design-lab",
    "title": "Monoline Studio",
    "subtitle": "GEOMETRIC LINE MARK",
    "category": "Logo",
    "industry": "Design Agency",
    "image": "/images/designs/logo-15.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Clean single-weight geometric vector mark for contemporary design and interior consultancies.",
    "tags": [
      "Monoline",
      "Minimalist",
      "Design Lab"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Monoline Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "imperial-crown-realestate",
    "title": "Imperial Crown",
    "subtitle": "LUXURY SOVEREIGN MARK",
    "category": "Logo",
    "industry": "Luxury Real Estate",
    "image": "/images/designs/logo-16.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Minimalist royal crown icon with gold foil styling tailored for premium residential builders.",
    "tags": [
      "Crown Mark",
      "Real Estate",
      "Luxury"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Imperial Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "apex-systems-tech",
    "title": "Apex Systems",
    "subtitle": "FORWARD GRADIENT ARROW",
    "category": "Logo",
    "industry": "SaaS & Enterprise",
    "image": "/images/designs/logo-17.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Modern upward velocity arrow mark engineered for enterprise SaaS and cloud platforms.",
    "tags": [
      "Apex Arrow",
      "SaaS",
      "Cloud"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Apex Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "retro-character-mascot",
    "title": "Retro Character",
    "subtitle": "VINTAGE 1930S MASCOT",
    "category": "Logo",
    "industry": "Streetwear & Diner",
    "image": "/images/designs/logo-18.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Hand-drawn rubber-hose retro mascot tailored for casual diners and streetwear brands.",
    "tags": [
      "Retro Mascot",
      "Rubber Hose",
      "Streetwear"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Retro Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "sharma-cafe-logo",
    "title": "Sharma Cafe",
    "subtitle": "CHAI & SNACKS IDENTITY",
    "category": "Logo",
    "industry": "Food & Beverage",
    "image": "/images/designs/sharma-cafe-logo.jpg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Authentic Indian cafe identity featuring tea glass graphics and warm terracotta tones.",
    "tags": [
      "Sharma Cafe",
      "Chai",
      "Indian Cafe"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Sharma Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "the-food-corner-menu",
    "title": "The Food Corner",
    "subtitle": "FAST FOOD BLACKBOARD MENU",
    "category": "Menu",
    "industry": "Fast Food & Diner",
    "image": "/images/designs/menu-2.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Blackboard themed burger, fries, and shakes menu card with clear category pricing.",
    "tags": [
      "The Food Corner",
      "Burger Menu",
      "Blackboard Theme"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "The Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "suravile-steakhouse-menu",
    "title": "Suravile Steakhouse",
    "subtitle": "LUXURY DINE-IN MENU",
    "category": "Menu",
    "industry": "Fine Dining",
    "image": "/images/designs/menu-13.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "High-end black & gold leatherette restaurant menu with wine pairings and grill cuts.",
    "tags": [
      "Suravile Steakhouse",
      "Fine Dining",
      "Gold Foil"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Suravile Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "aurora-coffee-menu",
    "title": "Aurora Coffee House",
    "subtitle": "SPECIALTY CAFE DRINKS CARD",
    "category": "Menu",
    "industry": "Cafe & Bakery",
    "image": "/images/designs/menu-3.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Minimalist Scandinavian tri-fold coffee menu highlighting brew origins and pastries.",
    "tags": [
      "Aurora Coffee",
      "Cafe Menu",
      "Tri-fold"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Aurora Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "larana-fine-dining",
    "title": "Larana & Co",
    "subtitle": "MODERN BISTRONOMY MENU",
    "category": "Menu",
    "industry": "Continental Dining",
    "image": "/images/designs/menu-4.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Sophisticated multi-page restaurant booklet with wine pairings and chef specials.",
    "tags": [
      "Larana Dining",
      "Continental",
      "Multi-Page"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Larana Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "strawberry-waffles-menu",
    "title": "Strawberry & Waffles",
    "subtitle": "DESSERT PARLOUR MENU",
    "category": "Menu",
    "industry": "Desserts & Waffles",
    "image": "/images/designs/menu.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Playful pink and cream dessert menu card for artisanal waffle parlours and creperies.",
    "tags": [
      "Waffle Menu",
      "Dessert Parlour",
      "Pink Theme"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Strawberry Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "jodhpur-palace-menu",
    "title": "Jodhpur Palace",
    "subtitle": "ROYAL INDIAN DINING MENU",
    "category": "Menu",
    "industry": "Heritage Restaurant",
    "image": "/images/designs/menu-5.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Ornamental gold foil royal Indian menu booklet with traditional thali layouts.",
    "tags": [
      "Jodhpur Palace",
      "Indian Dining",
      "Thali Menu"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Jodhpur Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "dessert-cake-menu",
    "title": "Dessert Cake Boutique",
    "subtitle": "ARTISAN BAKERY MENU",
    "category": "Menu",
    "industry": "Bakery & Patisserie",
    "image": "/images/designs/menu-6.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Warm chocolate brown dessert pricing card for custom cakes, pastries, and croissants.",
    "tags": [
      "Cake Menu",
      "Bakery Boutique",
      "Dessert Pricing"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Dessert Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "fast-bite-3d-menu",
    "title": "Fast Bite Diner",
    "subtitle": "QUICK SERVICE TAKEAWAY MENU",
    "category": "Menu",
    "industry": "Quick Service Diner",
    "image": "/images/designs/menu-7.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Eye-catching fast food takeaway flyer with combo deal boxes and digital QR order codes.",
    "tags": [
      "Fast Bite",
      "Takeaway Flyer",
      "Combo Deals"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Fast Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "roast-bar-menu",
    "title": "Roast Bar Espresso",
    "subtitle": "SPECIALTY ROASTERY BOARD",
    "category": "Menu",
    "industry": "Artisanal Roastery",
    "image": "/images/designs/menu-8.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Industrial chic wooden-accented espresso menu board for modern specialty coffee bars.",
    "tags": [
      "Roast Bar",
      "Espresso Board",
      "Specialty Coffee"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Roast Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "street-eats-menu",
    "title": "Street Eats Food Truck",
    "subtitle": "FOOD TRUCK SERVICE CARD",
    "category": "Menu",
    "industry": "Food Truck & Kiosk",
    "image": "/images/designs/menu-9.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "High-contrast laminated counter menu card designed for outdoor food truck service.",
    "tags": [
      "Street Eats",
      "Food Truck",
      "Laminated Menu"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Street Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "seafood-saluns-menu",
    "title": "Saluns Seafood Grill",
    "subtitle": "COASTAL SEAFOOD MENU",
    "category": "Menu",
    "industry": "Seafood Restaurant",
    "image": "/images/designs/menu-10.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Deep ocean navy seafood menu featuring daily catch specials and fresh grill platters.",
    "tags": [
      "Seafood Grill",
      "Ocean Theme",
      "Catch of the Day"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Saluns Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "gourmet-bistro-menu",
    "title": "Gourmet Bistro & Tacos",
    "subtitle": "MEXICAN STREET FOOD MENU",
    "category": "Menu",
    "industry": "Bistro & Cantina",
    "image": "/images/designs/menu-11.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Vibrant Mexican cantina menu card showcasing signature tacos, bowls, and margaritas.",
    "tags": [
      "Tacos Menu",
      "Mexican Bistro",
      "Cantina"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Gourmet Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "time-to-travel-poster",
    "title": "Time To Travel",
    "subtitle": "TOURISM PROMOTIONAL POSTER",
    "category": "Poster",
    "industry": "Travel & Tourism",
    "image": "/images/designs/poster-1.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Vibrant island tour promotional poster with 30% discount badge and clear travel booking CTA.",
    "tags": [
      "Time to Travel",
      "Tourism Poster",
      "Travel Agency"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Time Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "explore-world-flyer",
    "title": "Explore The World",
    "subtitle": "HOLIDAY PACKAGE CAMPAIGN FLYER",
    "category": "Poster",
    "industry": "Tour Operator",
    "image": "/images/designs/poster-2.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Full-color promotional travel flyer with destination highlights and tour package breakdown.",
    "tags": [
      "Explore World",
      "Tour Flyer",
      "Vacation Deals"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Explore Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "home-harmony-poster",
    "title": "Home Harmony Interiors",
    "subtitle": "INTERIOR DESIGN STUDIO POSTER",
    "category": "Poster",
    "industry": "Architecture & Decor",
    "image": "/images/designs/poster-3.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Minimalist architectural poster showcasing Scandinavian furniture and interior consulting.",
    "tags": [
      "Home Harmony",
      "Interior Design",
      "Architecture"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Home Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "iron-core-gym-poster",
    "title": "Iron Core Athletic Club",
    "subtitle": "GYM MOTIVATION WALL POSTER",
    "category": "Poster",
    "industry": "Fitness & Gym",
    "image": "/images/designs/poster-4.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "High-contrast athletic motivational poster for gym reception areas and training floors.",
    "tags": [
      "Iron Core Gym",
      "Fitness Poster",
      "Bodybuilding"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Iron Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "electric-beats-poster",
    "title": "Electric Beats Festival",
    "subtitle": "ELECTRONIC MUSIC FESTIVAL POSTER",
    "category": "Poster",
    "industry": "Music & Nightlife",
    "image": "/images/designs/poster-5.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Neon cybernetic festival poster with DJ lineup grid and ticket booking QR codes.",
    "tags": [
      "Electric Beats",
      "Music Festival",
      "Concert Poster"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Electric Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "apex-heights-poster",
    "title": "Apex Heights Towers",
    "subtitle": "LUXURY REAL ESTATE POSTER",
    "category": "Poster",
    "industry": "Property Development",
    "image": "/images/designs/poster-6.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Architectural rendering poster for luxury residential high-rise condominium pre-launch.",
    "tags": [
      "Apex Heights",
      "Real Estate Launch",
      "Luxury Towers"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Apex Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "green-valley-poster",
    "title": "Green Valley Market",
    "subtitle": "ORGANIC FARMERS MARKET POSTER",
    "category": "Poster",
    "industry": "Organic Retail",
    "image": "/images/designs/poster-7.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Earthy botanical illustrated poster promoting weekend local organic produce markets.",
    "tags": [
      "Farmers Market",
      "Organic Produce",
      "Weekend Fair"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Green Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "apex-care-clinic-poster",
    "title": "Apex Care Medical",
    "subtitle": "HEALTHCARE AWARENESS POSTER",
    "category": "Poster",
    "industry": "Medical & Healthcare",
    "image": "/images/designs/poster-8.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Clean clinical poster with doctor profiles, health check packages, and appointment numbers.",
    "tags": [
      "Apex Care",
      "Healthcare Poster",
      "Medical Clinic"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Apex Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "codecraft-bootcamp-poster",
    "title": "CodeCraft Bootcamp",
    "subtitle": "TECH TRAINING POSTER",
    "category": "Poster",
    "industry": "Education & Tech",
    "image": "/images/designs/poster-9.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Modern tech education poster with curriculum modules and placement guarantee badges.",
    "tags": [
      "CodeCraft",
      "Tech Bootcamp",
      "Coding Academy"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "CodeCraft Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "apex-detailing-poster",
    "title": "Apex Auto Detailing",
    "subtitle": "CERAMIC COATING POSTER",
    "category": "Poster",
    "industry": "Automotive Care",
    "image": "/images/designs/poster-10.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "High-gloss dark theme poster detailing paint protection and ceramic coating packages.",
    "tags": [
      "Auto Detailing",
      "Ceramic Coating",
      "Car Care"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Apex Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "velvet-runway-poster",
    "title": "Velvet Runway Fashion",
    "subtitle": "HAUTE COUTURE SHOW POSTER",
    "category": "Poster",
    "industry": "Fashion & Runway",
    "image": "/images/designs/poster-11.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Editorial fashion week poster with model photography, designer credits, and VIP entry details.",
    "tags": [
      "Velvet Runway",
      "Fashion Week",
      "Haute Couture"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Velvet Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "street-food-fiesta-poster",
    "title": "Food Carnival Fiesta",
    "subtitle": "CULINARY FESTIVAL POSTER",
    "category": "Poster",
    "industry": "Food Festival",
    "image": "/images/designs/poster-12.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Festive culinary carnival poster with live food stall icons and stage performance timings.",
    "tags": [
      "Food Fiesta",
      "Culinary Carnival",
      "Event Poster"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Food Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "futuretech-ai-poster",
    "title": "FutureTech AI Summit",
    "subtitle": "TECHNOLOGY CONFERENCE POSTER",
    "category": "Poster",
    "industry": "Tech Conferences",
    "image": "/images/designs/poster-13.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Sleek global AI conference poster with keynote speakers and convention hall pass options.",
    "tags": [
      "FutureTech AI",
      "Tech Summit",
      "AI Conference"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "FutureTech Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "ocean-breeze-party-poster",
    "title": "Ocean Breeze Beach Bash",
    "subtitle": "SUMMER BEACH PARTY POSTER",
    "category": "Poster",
    "industry": "Hospitality & Events",
    "image": "/images/designs/poster-14.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Tropical sunset beach party poster with drink specials and guest DJ announcements.",
    "tags": [
      "Ocean Breeze",
      "Beach Party",
      "Summer Festival"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Ocean Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "kinder-quest-fun-poster",
    "title": "Kinder Quest Preschool",
    "subtitle": "EARLY LEARNING ADMISSIONS POSTER",
    "category": "Poster",
    "industry": "Education",
    "image": "/images/designs/kinder-quest-fun.jpg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Vibrant educational poster with joyful children and curriculum highlights for new admissions.",
    "tags": [
      "Kinder Quest",
      "Preschool Admissions",
      "Kids Learning"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Kinder Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "kinder-quest-learning-poster",
    "title": "Kinder Quest Academy",
    "subtitle": "CREATIVE DEVELOPMENT POSTER",
    "category": "Poster",
    "industry": "Education",
    "image": "/images/designs/kinder-quest-learning.jpg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Childhood experiential learning poster for preschool campus display boards.",
    "tags": [
      "Kinder Quest",
      "Campus Poster",
      "Early Learning"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Kinder Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "noire-skincare-ritual-poster",
    "title": "Noire Skincare Daily Ritual",
    "subtitle": "POS COUNTER DISPLAY POSTER",
    "category": "Poster",
    "industry": "Beauty & Cosmetics",
    "image": "/images/designs/WhatsApp Image 2026-10-09 at 11.48.56 AM (2).jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Product ritual poster with serum bottle placement and clean formula badges for in-store POS.",
    "tags": [
      "Noire Skincare",
      "POS Poster",
      "In-Store Display"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Noire Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "noire-skincare-print-poster",
    "title": "Noire Skincare Renewal",
    "subtitle": "PRINT EDITORIAL CAMPAIGN POSTER",
    "category": "Poster",
    "industry": "Beauty & Cosmetics",
    "image": "/images/designs/WhatsApp Image 2026-10-09 at 11.48.55 AM (1).jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Editorial magazine and store display poster showcasing plant-powered renewal serum.",
    "tags": [
      "Noire Skincare",
      "Print Editorial",
      "Beauty Ad"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Noire Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "trend-tree-vitamin-c",
    "title": "Trend Tree Vitamin C",
    "subtitle": "20% VITAMIN C SERUM POST",
    "category": "Social Media",
    "industry": "Skincare & Cosmetics",
    "image": "/images/designs/social-media.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "High-converting Instagram feed product post for Vitamin C skincare serum with citrus accents.",
    "tags": [
      "Trend Tree",
      "Vitamin C",
      "Skincare Ad"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Trend Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "motion-dex-perfume-post",
    "title": "Motion Dex Perfume",
    "subtitle": "LUXURY FRAGRANCE LAUNCH POST",
    "category": "Social Media",
    "industry": "Perfumes & Luxury",
    "image": "/images/designs/social-media-1.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "High-end dark luxury fragrance creative for Meta feed ads and Instagram sponsored placements.",
    "tags": [
      "Motion Dex",
      "Luxury Perfume",
      "Instagram Ad"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Motion Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "dave-drinks-lemonade-post",
    "title": "Dave Drinks Lemonade",
    "subtitle": "CHILLED BLUEBERRY COOLER POST",
    "category": "Social Media",
    "industry": "Beverages",
    "image": "/images/designs/social-media-2.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Vibrant iced beverage creative featuring fresh blueberries and dripping condensation.",
    "tags": [
      "Dave Drinks",
      "Beverage Creative",
      "Summer Drink"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Dave Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "yb-yumm-bakery-post",
    "title": "YB Yumm! Bakery",
    "subtitle": "CHOCOLATE CUPCAKE PROMO POST",
    "category": "Social Media",
    "industry": "Bakery & Sweets",
    "image": "/images/designs/social-media-3.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Mouthwatering artisan cupcake social post engineered for local bakery weekend sales.",
    "tags": [
      "YB Yumm",
      "Cupcake Promo",
      "Bakery Ad"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "YB Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "napoli-crust-pizza-post",
    "title": "Napoli Crust Pizza",
    "subtitle": "WOOD-FIRED PIZZA SPECIAL POST",
    "category": "Social Media",
    "industry": "Pizzeria & Dining",
    "image": "/images/designs/social-media-4.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Dramatic overhead wood-fired pizza post with fresh basil and melted mozzarella cheese.",
    "tags": [
      "Napoli Crust",
      "Pizza Creative",
      "Restaurant Promo"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Napoli Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "aura-skin-moisture-post",
    "title": "Aura Skin Hydration",
    "subtitle": "DAILY MOISTURIZER CAMPAIGN POST",
    "category": "Social Media",
    "industry": "Beauty & Skincare",
    "image": "/images/designs/social-media-5.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Clean pastel cosmetic ad creative highlighting 24-hour hydration benefits.",
    "tags": [
      "Aura Skin",
      "Daily Moisture",
      "Beauty Creative"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Aura Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "veloce-kicks-sneaker-post",
    "title": "Veloce Kicks Drop",
    "subtitle": "STREETWEAR SNEAKER DROP POST",
    "category": "Social Media",
    "industry": "Fashion & Sneakers",
    "image": "/images/designs/social-media-6.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "High-energy typography post announcing limited-edition streetwear sneaker release.",
    "tags": [
      "Veloce Kicks",
      "Sneaker Drop",
      "Streetwear Ad"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Veloce Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "titan-pro-smartwatch-post",
    "title": "Titan Pro Smartwatch",
    "subtitle": "RUGGED WEARABLE LAUNCH POST",
    "category": "Social Media",
    "industry": "Consumer Tech",
    "image": "/images/designs/social-media-7.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Rugged water-splash background social creative detailing waterproof fitness features.",
    "tags": [
      "Titan Pro",
      "Smartwatch Creative",
      "Tech Ad"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Titan Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "zen-valley-matcha-post",
    "title": "Zen Valley Matcha",
    "subtitle": "CEREMONIAL MATCHA TEA POST",
    "category": "Social Media",
    "industry": "Health & Beverages",
    "image": "/images/designs/social-media-8.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Zen minimalist green tea social creative emphasizing organic ceremonial origin.",
    "tags": [
      "Zen Valley",
      "Matcha Post",
      "Organic Tea"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Zen Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "aurum-jewelry-solitaire-post",
    "title": "Aurum Fine Jewelry",
    "subtitle": "DIAMOND SOLITAIRE AD POST",
    "category": "Social Media",
    "industry": "Luxury Jewelry",
    "image": "/images/designs/social-media-9.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Black velvet background diamond solitaire ad designed for bridal and festive collections.",
    "tags": [
      "Aurum Jewelry",
      "Diamond Ring",
      "Bridal Jewelry"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Aurum Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "burger-club-smash-post",
    "title": "The Burger Club",
    "subtitle": "DOUBLE SMASH BURGER POST",
    "category": "Social Media",
    "industry": "Burgers & Fast Food",
    "image": "/images/designs/social-media-10.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Ultra-appetizing double cheese smash burger social creative with discount offer hook.",
    "tags": [
      "Burger Club",
      "Smash Burger",
      "Fast Food Creative"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "The Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "skyline-penthouse-post",
    "title": "Skyline Penthouses",
    "subtitle": "VIRTUAL TOUR REAL ESTATE POST",
    "category": "Social Media",
    "industry": "Real Estate",
    "image": "/images/designs/social-media-11.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Sophisticated panoramic penthouse view creative with scheduled private inspection CTA.",
    "tags": [
      "Skyline Penthouses",
      "Real Estate Ad",
      "Virtual Tour"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Skyline Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "prana-studio-yoga-post",
    "title": "Prana Yoga Studio",
    "subtitle": "MORNING VINYASA CLASS POST",
    "category": "Social Media",
    "industry": "Yoga & Wellness",
    "image": "/images/designs/social-media-12.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Calm sunrise yoga schedule post featuring membership discount code and booking link.",
    "tags": [
      "Prana Studio",
      "Morning Yoga",
      "Wellness Post"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Prana Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "solaris-sunglasses-post",
    "title": "Solaris Eyewear",
    "subtitle": "POLARIZED SUNGLASSES PROMO POST",
    "category": "Social Media",
    "industry": "Fashion Accessories",
    "image": "/images/designs/social-media-13.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "High-contrast summer lifestyle creative showcasing UV400 polarized shades.",
    "tags": [
      "Solaris Eyewear",
      "Sunglasses Post",
      "Summer Promo"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Solaris Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "origins-coffee-brew-post",
    "title": "Origins Specialty Coffee",
    "subtitle": "SINGLE-ORIGIN POUR-OVER POST",
    "category": "Social Media",
    "industry": "Specialty Coffee",
    "image": "/images/designs/social-media-14.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Artisanal single-origin coffee bean and pour-over kettle feed creative for coffee connoisseurs.",
    "tags": [
      "Origins Coffee",
      "Pour-Over",
      "Specialty Coffee"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Origins Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "nova-skincare-lumen-feed",
    "title": "Nova Skincare Lumen",
    "subtitle": "LUMEN SERUM FEED AD CREATIVE",
    "category": "Social Media",
    "industry": "Beauty & Cosmetics",
    "image": "/images/designs/WhatsApp Image 2026-10-09 at 11.48.55 AM.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Square format social creative for Nova Skincare with serum bottle and dropper detail.",
    "tags": [
      "Nova Skincare",
      "Lumen Serum",
      "Instagram Feed"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Nova Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "noire-skincare-glowing-post",
    "title": "Noire Skincare Glowing",
    "subtitle": "HEALTHY GLOW DAILY POST",
    "category": "Social Media",
    "industry": "Beauty & Cosmetics",
    "image": "/images/designs/WhatsApp Image 2026-10-09 at 11.48.56 AM.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Lifestyle model and product placement social graphic for Instagram, Pinterest, and Meta.",
    "tags": [
      "Noire Skincare",
      "Glowing Skin",
      "Beauty Lifestyle"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Noire Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "nova-skincare-studio-shoot",
    "title": "Nova Skincare Studio",
    "subtitle": "STUDIO PRODUCT SHOOT CREATIVE",
    "category": "Social Media",
    "industry": "Beauty & Cosmetics",
    "image": "/images/designs/WhatsApp Image 2026-10-09 at 11.48.57 AM.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Rich gold and black studio cosmetic ad creative for new product launch.",
    "tags": [
      "Nova Skincare",
      "Studio Shoot",
      "Cosmetic Ad"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Nova Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "nova-skincare-vertical-story",
    "title": "Nova Skincare Story",
    "subtitle": "VERTICAL STORY & REELS CREATIVE",
    "category": "Social Media",
    "industry": "Beauty & Cosmetics",
    "image": "/images/designs/WhatsApp Image 2026-10-09 at 11.48.57 AM (1).jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Portrait 9:16 vertical story graphic engineered for Instagram Stories and Reels covers.",
    "tags": [
      "Nova Skincare",
      "Vertical Story",
      "Reels Cover"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Nova Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "kinder-quest-campaign-social",
    "title": "Kinder Quest Campaign",
    "subtitle": "BRIGHT MINDS PRESCHOOL POST",
    "category": "Social Media",
    "industry": "Education",
    "image": "/images/designs/kinder-quest-campaign.jpg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "High-conversion Facebook and Instagram ad creative for local preschool admissions.",
    "tags": [
      "Kinder Quest",
      "Preschool Ad",
      "Social Campaign"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Kinder Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "natures-nutrition-protein-bar",
    "title": "Nature's Nutrition Bar",
    "subtitle": "PROTEIN BAR WRAPPER PACKAGING",
    "category": "Packaging",
    "industry": "Health Food & FMCG",
    "image": "/images/designs/packing.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Chocolate coconut brownie protein bar wrapper with accurate nutritional info and dieline.",
    "tags": [
      "Nature's Nutrition",
      "Protein Bar",
      "FMCG Wrapper"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Nature's Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "nutroma-green-raisins-pouch",
    "title": "Nutroma Green Raisins",
    "subtitle": "STAND-UP ZIPPER FOOD POUCH",
    "category": "Packaging",
    "industry": "Dry Fruits & Nuts",
    "image": "/images/designs/packing-1.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Green gradient matte stand-up zipper pouch with clear product window for export raisins.",
    "tags": [
      "Nutroma",
      "Green Raisins",
      "Zipper Pouch"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Nutroma Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "nutroma-golden-raisins-pouch",
    "title": "Nutroma Golden Raisins",
    "subtitle": "STAND-UP DRY FRUITS POUCH",
    "category": "Packaging",
    "industry": "Dry Fruits & Nuts",
    "image": "/images/designs/packing-2.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Golden foil stand-up pouch packaging for premium Kishmish with moisture-lock seal.",
    "tags": [
      "Nutroma",
      "Golden Raisins",
      "Dry Fruits"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Nutroma Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "nutroma-almonds-pouch",
    "title": "Nutroma California Almonds",
    "subtitle": "VACUUM-SEALED ALMONDS POUCH",
    "category": "Packaging",
    "industry": "Dry Fruits & Nuts",
    "image": "/images/designs/packing-3.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Earthy copper-brown pouch design for California almonds with resealable zip closure.",
    "tags": [
      "Nutroma",
      "Almonds Pouch",
      "Vacuum Sealed"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Nutroma Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "nutroma-cashews-pouch",
    "title": "Nutroma Jumbo Cashews",
    "subtitle": "W240 JUMBO CASHEW POUCH",
    "category": "Packaging",
    "industry": "Dry Fruits & Nuts",
    "image": "/images/designs/packing-4.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Premium royal blue and gold packaging pouch for whole roasted jumbo cashews.",
    "tags": [
      "Nutroma",
      "Jumbo Cashews",
      "Nut Packaging"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Nutroma Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "cocoa-craft-dark-chocolate",
    "title": "Cocoa Craft 85%",
    "subtitle": "ARTISAN CHOCOLATE BAR WRAPPER",
    "category": "Packaging",
    "industry": "Chocolates & Confectionery",
    "image": "/images/designs/packing-5.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Single-origin 85% dark chocolate bar foil wrap and outer cardboard sleeve with cacao map.",
    "tags": [
      "Cocoa Craft",
      "Dark Chocolate",
      "Bar Wrapper"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Cocoa Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "pure-botanicals-almond-milk",
    "title": "Pure Botanicals Almond Milk",
    "subtitle": "ASEPTIC BEVERAGE CARTON",
    "category": "Packaging",
    "industry": "Dairy-Free Beverages",
    "image": "/images/designs/packing-6.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Minimalist Scandinavian 1-litre plant milk Tetra Pak carton with nutritional fact tables.",
    "tags": [
      "Pure Botanicals",
      "Almond Milk",
      "Carton Packaging"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Pure Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "bloom-herbal-shampoo",
    "title": "Bloom Herbal Shampoo",
    "subtitle": "COSMETIC BOTTLE & LABEL",
    "category": "Packaging",
    "industry": "Haircare & Cosmetics",
    "image": "/images/designs/packing-7.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Amber PET bottle with waterproof vinyl label for botanical hair strengthening shampoo.",
    "tags": [
      "Bloom Shampoo",
      "Bottle Label",
      "Waterproof Vinyl"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Bloom Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "nocturne-eau-de-parfum",
    "title": "Nocturne Eau de Parfum",
    "subtitle": "LUXURY RIGID FRAGRANCE BOX",
    "category": "Packaging",
    "industry": "Perfumery & Luxury",
    "image": "/images/designs/packing-8.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Magnetic rigid box with velvet insert and gold foil stamped perfume bottle label.",
    "tags": [
      "Nocturne Perfume",
      "Rigid Box",
      "Gold Foil"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Nocturne Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "terra-doro-olive-oil",
    "title": "Terra D'Oro Olive Oil",
    "subtitle": "EXTRA VIRGIN GLASS BOTTLE",
    "category": "Packaging",
    "industry": "Gourmet Foods",
    "image": "/images/designs/packing-9.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Dark UV-blocking green glass bottle with textured cotton paper label for Tuscan olive oil.",
    "tags": [
      "Terra D'Oro",
      "Olive Oil",
      "Glass Bottle"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Terra Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "nutribite-roasted-cashews",
    "title": "NutriBite Roasted Cashews",
    "subtitle": "SNACK POUCH PACKAGING",
    "category": "Packaging",
    "industry": "Snack Foods",
    "image": "/images/designs/packing-10.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Vibrant snack pouch with nitrogen flush specifications for roasted salted cashews.",
    "tags": [
      "NutriBite",
      "Cashews Pouch",
      "Snack Packaging"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "NutriBite Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "zen-garden-matcha-tin",
    "title": "Zen Garden Matcha",
    "subtitle": "AIRTIGHT CEREMONIAL TEA TIN",
    "category": "Packaging",
    "industry": "Specialty Tea",
    "image": "/images/designs/packing-11.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Metallic airtight tin container with washi paper wrap label for Japanese Uji matcha.",
    "tags": [
      "Zen Garden",
      "Matcha Tin",
      "Tea Packaging"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Zen Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "lumiere-facial-serum",
    "title": "Lumière Facial Serum",
    "subtitle": "DROPPER BOTTLE & OUTER CARTON",
    "category": "Packaging",
    "industry": "Dermatology & Cosmetics",
    "image": "/images/designs/packing-12.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Minimalist white dropper bottle with embossed matte outer box for vitamin brightening oil.",
    "tags": [
      "Lumière",
      "Serum Dropper",
      "Cosmetic Carton"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Lumière Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "hop-craft-hazy-ipa",
    "title": "Hop Craft Hazy IPA",
    "subtitle": "CRAFT BEER CAN LABEL",
    "category": "Packaging",
    "industry": "Craft Breweries",
    "image": "/images/designs/packing-13.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Vibrant holographic shrink-sleeve label for 330ml microbrewery craft beer can.",
    "tags": [
      "Hop Craft",
      "Beer Can Label",
      "Shrink Sleeve"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Hop Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "raw-botanicals-soap",
    "title": "Raw Botanicals Soap",
    "subtitle": "COLD-PROCESS SOAP KRAFT WRAP",
    "category": "Packaging",
    "industry": "Natural Skincare",
    "image": "/images/designs/packing-14.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Recycled kraft paper belly band sleeve for handmade cold-processed artisan soap bars.",
    "tags": [
      "Raw Botanicals",
      "Soap Sleeve",
      "Kraft Paper"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Raw Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "golden-crunch-granola",
    "title": "Golden Crunch Granola",
    "subtitle": "RESEALABLE BREAKFAST POUCH",
    "category": "Packaging",
    "industry": "Breakfast Cereals",
    "image": "/images/designs/packing-15.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Matte white stand-up pouch with transparent window for honey roasted almond granola.",
    "tags": [
      "Golden Crunch",
      "Granola Pouch",
      "Breakfast Cereal"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Golden Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "luminary-scented-candle",
    "title": "Luminary Candle Box",
    "subtitle": "LUXURY SCENTED CANDLE BOX",
    "category": "Packaging",
    "industry": "Home Fragrance",
    "image": "/images/designs/packing-16.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Two-piece rigid setup box with gold foil logo for artisanal scented soy wax candles.",
    "tags": [
      "Luminary",
      "Candle Box",
      "Luxury Packaging"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Luminary Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "apex-whey-isolate",
    "title": "Apex Whey Nutrition",
    "subtitle": "NUTRITIONAL SUPPLEMENT TUB",
    "category": "Packaging",
    "industry": "Sports Nutrition",
    "image": "/images/designs/packing-17.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Matte black 2kg protein tub label with metallic holographic anti-counterfeit seal.",
    "tags": [
      "Apex Whey",
      "Protein Tub",
      "Sports Nutrition"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Apex Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "royal-chai-assam-tea",
    "title": "Royal Chai Heritage",
    "subtitle": "LUXURY TEA GIFT CADDY BOX",
    "category": "Packaging",
    "industry": "Tea & Beverages",
    "image": "/images/designs/packing-18.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Heritage Indian tea box with paisley embossing and gold foil accents for Darjeeling tea.",
    "tags": [
      "Royal Chai",
      "Tea Caddy",
      "Embossed Box"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Royal Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "flora-fizz-kombucha",
    "title": "Flora Fizz Kombucha",
    "subtitle": "AMBER GLASS BEVERAGE BOTTLE",
    "category": "Packaging",
    "industry": "Health Beverages",
    "image": "/images/designs/packing-19.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Artisanal illustrated bottle label for sparkling organic ginger and lemon kombucha.",
    "tags": [
      "Flora Fizz",
      "Kombucha Bottle",
      "Glass Label"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Flora Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "san-marzano-pasta-sauce",
    "title": "San Marzano Pasta Sauce",
    "subtitle": "ARTISAN GLASS JAR LABEL",
    "category": "Packaging",
    "industry": "Gourmet Italian Food",
    "image": "/images/designs/packing-20.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Rustic Italian glass jar label with checkered border for authentic San Marzano sauce.",
    "tags": [
      "San Marzano",
      "Pasta Sauce Jar",
      "Italian Food"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "San Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "shea-velvet-body-butter",
    "title": "Shea Velvet Body Butter",
    "subtitle": "LUXURY COSMETIC JAR PACKAGING",
    "category": "Packaging",
    "industry": "Personal Care",
    "image": "/images/designs/packing-21.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Frosted double-wall cosmetic jar with gold hot-stamped lid label for whipped shea butter.",
    "tags": [
      "Shea Velvet",
      "Cosmetic Jar",
      "Body Butter"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Shea Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "highland-peak-coffee-bag",
    "title": "Highland Peak Coffee",
    "subtitle": "DEGASSING VALVE COFFEE BAG",
    "category": "Packaging",
    "industry": "Specialty Coffee",
    "image": "/images/designs/packing-22.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Side-gusset coffee bag with one-way degassing valve and tear notch for whole beans.",
    "tags": [
      "Highland Peak",
      "Coffee Bag",
      "Degassing Valve"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Highland Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "pure-botanica-essential-oil",
    "title": "Pure Botanica Oil",
    "subtitle": "AMBER DROPPER BOTTLE BOX",
    "category": "Packaging",
    "industry": "Aromatherapy",
    "image": "/images/designs/packing-23.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Minimalist amber dropper bottle label and tuck-end box for 100% lavender essential oil.",
    "tags": [
      "Pure Botanica",
      "Essential Oil",
      "Dropper Box"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Pure Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "ansh-elaichi-tea-pouch",
    "title": "ANSH Elaichi Tea",
    "subtitle": "CARDAMOM TEA POUCH PACKAGING",
    "category": "Packaging",
    "industry": "Tea & FMCG",
    "image": "/images/designs/ansh-elaichi-tea.jpg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Green and gold aromatic tea pouch with tea garden visual for ANSH Elaichi Tea.",
    "tags": [
      "ANSH Tea",
      "Elaichi Tea",
      "Tea Pouch"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "ANSH Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "tpp-butter-paper-wrap",
    "title": "TPP Butter Paper",
    "subtitle": "FOOD GRADE REPEAT PATTERN WRAP",
    "category": "Packaging",
    "industry": "Restaurant Paper",
    "image": "/images/designs/tpp-butter-paper.jpg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Custom greaseproof food wrap sheets with repeat burger and food icon vectors.",
    "tags": [
      "TPP Paper",
      "Butter Paper",
      "Food Wrap"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "TPP Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "goku-saiyan-tee",
    "title": "Goku Saiyan Apparel",
    "subtitle": "ANIME STREETWEAR GRAPHIC TEE",
    "category": "Merch",
    "industry": "Apparel & Streetwear",
    "image": "/images/designs/design.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Japanese anime streetwear graphic tee design with bold kanji and dynamic character art.",
    "tags": [
      "Anime Streetwear",
      "Goku Kanji",
      "Apparel Tee"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Goku Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "myst-official-apparel",
    "title": "MYST Official Merch",
    "subtitle": "STUDIO STREETWEAR COLLECTION",
    "category": "Merch",
    "industry": "Apparel & Merch",
    "image": "/images/designs/design-2.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Oversized streetwear apparel drop featuring typography layout and back-print specs.",
    "tags": [
      "MYST Merch",
      "Streetwear Drop",
      "Typography Tee"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "MYST Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "urban-edge-graphic-tee",
    "title": "Urban Edge Streetwear",
    "subtitle": "CYBERPUNK GRAPHIC T-SHIRT",
    "category": "Merch",
    "industry": "Apparel & Streetwear",
    "image": "/images/designs/design-3.jpeg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Bold cyberpunk oversized graphic t-shirt design prepared for direct-to-garment printing.",
    "tags": [
      "Urban Edge",
      "Cyberpunk Tee",
      "Oversized T-Shirt"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Urban Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "by2men-crop-top-design",
    "title": "by2men.com",
    "subtitle": "SIGNATURE STREETWEAR CROP TOP",
    "category": "Merch",
    "industry": "Women Apparel",
    "image": "/images/designs/by2men-crop-top.jpg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Vibrant orange streetwear crop top graphic designed for by2men.com commercial launch.",
    "tags": [
      "by2men",
      "Crop Top",
      "Streetwear"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "by2men.com Team",
      "role": "Client"
    },
    "logoType": "custom"
  },
  {
    "id": "agniyantra-vastu-banner",
    "title": "Agniyantra Brand Header",
    "subtitle": "VASTU BRAND PANORAMIC HEADER",
    "category": "Website",
    "industry": "Vastu & Spiritual",
    "image": "/images/designs/agniyantra-vastu-banner.jpg",
    "bgGradient": "from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]",
    "accentColor": "#064e3b",
    "textColor": "#0f172a",
    "description": "Auspicious panoramic brand header for Agniyantra Vastu remedies portal.",
    "tags": [
      "Agniyantra",
      "Vastu Header",
      "Web Banner"
    ],
    "colorPalette": [
      {
        "name": "Primary Accent",
        "hex": "#064E3B"
      },
      {
        "name": "Dark Neutral",
        "hex": "#0F172A"
      },
      {
        "name": "Light Base",
        "hex": "#F8FAFC"
      }
    ],
    "deliverables": [
      "Vector AI / EPS",
      "Print Master PDF",
      "High-Res PNG"
    ],
    "clientReview": {
      "quote": "Clean, professional execution with rapid delivery.",
      "clientName": "Agniyantra Team",
      "role": "Client"
    },
    "logoType": "custom"
  }
];

export const BUSINESS_PACKAGES: BusinessPackage[] = [
  { id: 'pkg-cafe', title: 'Cafe / Coffee Shop', category: 'Food & Beverage', startingPrice: 3000, image: '/images/package-cafe.jpg', description: 'Complete visual identity package designed specifically for cafes, artisanal roasters, and quick-service coffee lounges.', turnaround: '3 Days', popularBadge: true, deliverables: ['Artisanal Coffee Logo Design (3 Concepts)', 'Single / Tri-Fold Menu Card Layout (Print + Digital QR)', 'Custom Coffee Cup Sleeve Mockup & Print Dieline', 'Barista & Staff Uniform Logo Badge', 'Instagram Launch Creatives (Set of 6 Posts + Stories)'] },
  { id: 'pkg-restaurant', title: 'Restaurant', category: 'Food & Beverage', startingPrice: 4000, image: '/images/package-restaurant.jpg', description: 'Comprehensive branding solution for fine dining establishments, family restaurants, and multi-cuisine bistros.', turnaround: '4 Days', popularBadge: true, deliverables: ['Fine Dining Brand Logo & Vector Signature', 'Multi-Page Luxury Dine-in Food & Drinks Menu Booklet', 'Table Tent Cards & Reserved Standees', 'Outdoor ACP Signboard & Entrance Facade Layout', 'Social Media Promotional Grid & Food Photography Guide'] },
  { id: 'pkg-salon', title: 'Salon & Spa', category: 'Services', startingPrice: 4500, image: '/images/package-salon.jpg', description: 'Chic, elegant aesthetic branding tailored for beauty parlours, unisex hair salons, nail bars, and luxury wellness spas.', turnaround: '3 Days', popularBadge: true, deliverables: ['Luxury Typography Monogram / Neon Logo', 'Service Price List & Spa Treatments Menu Card', 'Appointment Reminder & Loyalty Stamp Cards', 'Shop Front Acrylic Glow Sign / Glass Vinyl Graphics', 'Instagram Aesthetics Kit (Highlight Covers + 10 Post Templates)'] },
  { id: 'pkg-gym', title: 'Gym & Fitness', category: 'Services', startingPrice: 4000, image: '/images/package-gym.jpg', description: 'High-energy visual identity package engineered for gyms, crossfit boxes, MMA studios, and personal training academies.', turnaround: '3 Days', deliverables: ['Aggressive Athletic Emblem / Barbell Mascot Logo', 'Large Scale Gym Motivation Wall Graphics & Rules Banner', 'Membership Admission Form & Premium Member ID Cards', 'Diet Plan & Transformation Chart Branded Templates', 'Workout Merchandise Graphic (T-shirt & Shaker print ready)'] },
  { id: 'pkg-boutique', title: 'Boutique', category: 'Retail', startingPrice: 3000, image: '/images/package-boutique.jpg', description: 'Refined, minimalist branding created for designer fashion boutiques, clothing studios, jewelry stores, and bridal ateliers.', turnaround: '2-3 Days', deliverables: ['Boutique Haute Couture Serif Monogram Logo', 'Gold Foil Embossed Garment Hangtags & Price Tags', 'Branded Shopping Bag & Poly Mailer Packaging Layout', 'Thank You Card with Discount Coupon for Shoppers', 'Instagram Lookbook Post & Story Templates'] },
  { id: 'pkg-realestate', title: 'Real Estate', category: 'Real Estate', startingPrice: 5000, image: '/images/package-realestate.jpg', description: 'Authoritative corporate branding for real estate developers, property brokers, builders, and architectural firms.', turnaround: '4-5 Days', popularBadge: true, deliverables: ['Corporate Real Estate Emblem & Brand Guidelines', '8-Page Luxury Project Brochure Layout (Print & PDF)', 'On-Site Construction Site Hoarding & Rollup Standees', 'Client Presentation Folder & Executive Visiting Cards', 'High-CTR WhatsApp Flyers & Newspaper Ad Creatives'] }
];
