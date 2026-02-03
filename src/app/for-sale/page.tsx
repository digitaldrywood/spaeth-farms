import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cattle For Sale | Spaeth Farms',
  description: 'Browse registered Polled Hereford cattle for sale at Spaeth Farms. Embryo packages, bred cows, bred heifers, and bulls available. Quality genetics from Wisconsin.',
};

const embryoPackages = [
  {
    name: 'Perks 3084 Hometown Lady 5048',
    registration: '43609004',
    sires: ['Red Baron', 'Genesis', '2296', 'Fresh Prince', 'Montgomery', 'Blueprint'],
    image: '/images/for-sale-perks-hometown-lady.jpg',
  },
  {
    name: 'H FHF Rita 8444 ET',
    registration: '43916595',
    sires: ['American Classic', 'Majestic', 'Montgomery', 'Genesis'],
    image: '/images/for-sale-rita-8444.jpg',
  },
  {
    name: 'TBC Ember 200ET',
    registration: '44394748',
    sires: [],
    image: '/images/for-sale-ember-200et.jpg',
  },
  {
    name: 'ANL 71D Jade 3F 13K',
    registration: '44563532',
    sires: ['Profit', 'Oshoto'],
    image: '/images/for-sale-jade-13k.jpg',
  },
];

const bredCows = [
  {
    name: 'SF 5048 Maggie May 2430',
    registration: '44661234',
    aiSire: 'Churchill W4 Sherman 2157K ET',
    calvingDate: 'February 2026',
    recentCalf: 'Heifer calf by Genesis (Feb 2025)',
    image: '/images/for-sale-perks-hometown-lady.jpg',
  },
  {
    name: 'SF 8444 Lady Rita 2356',
    registration: '44567890',
    aiSire: 'Lowen Genesis G16 ET',
    calvingDate: 'February 2026',
    recentCalf: 'Bull calf by Blueprint (Mar 2025)',
    image: '/images/for-sale-rita-8444.jpg',
  },
  {
    name: 'SF Hometown Jewel 2289',
    registration: '44512345',
    aiSire: 'NJW 73S W18 Hometown 10Y ET',
    calvingDate: 'March 2026',
    recentCalf: 'Heifer calf by Montgomery (Feb 2025)',
    image: '/images/for-sale-perks-hometown-lady.jpg',
  },
];

const bredHeifers = [
  {
    name: 'SF 2430 Maggie 2501',
    registration: '44789012',
    calvingDate: 'January 2026',
    sire: 'Churchill Jack Frost 458M ET',
    image: '/images/for-sale-perks-hometown-lady.jpg',
  },
  {
    name: 'SF 2356 Rita Belle 2509',
    registration: '44789234',
    calvingDate: 'February 2026',
    sire: 'Lowen Genesis G16 ET',
    image: '/images/for-sale-rita-8444.jpg',
  },
  {
    name: 'SF 2289 Jewel Diamond 2515',
    registration: '44789456',
    calvingDate: 'March 2026',
    sire: 'NJW 73S W18 Hometown 10Y ET',
    image: '/images/for-sale-perks-hometown-lady.jpg',
  },
];

const bulls = [
  {
    name: 'SF 8444 561C PIP 2438ET',
    birthDate: 'January 15, 2024',
    image: '/images/for-sale-bull-pip-2438et.jpg',
  },
  {
    name: 'SF 7J Houston Apollo 24440',
    birthDate: 'February 8, 2024',
    image: '/images/for-sale-bull-apollo-24440.jpg',
  },
  {
    name: 'SF 2237 33Z KING 2413',
    birthDate: 'January 28, 2024',
    image: '/images/for-sale-bull-king-2413.jpg',
  },
  {
    name: 'SF 48K HANDY MAN REX 2439',
    birthDate: '2024',
    image: '/images/for-sale-bull-rex-2439.jpg',
  },
  {
    name: 'SF 5048 018 Nitro 2459ET',
    birthDate: '2024',
    image: '/images/for-sale-bull-nitro-2459et.jpg',
  },
  {
    name: 'SF 29 203D KOOL WHIP',
    birthDate: '2024',
    image: '/images/for-sale-bull-kool-whip.jpg',
  },
];

export default function ForSalePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-foreground text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hereford-herd-2.jpg"
            alt="Spaeth Farms Hereford cattle for sale"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold mb-2">Registered Polled Herefords</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cattle For Sale</h1>
            <p className="text-xl text-gray-300 mb-8">
              Quality registered Polled Hereford genetics from our family farm. We offer embryo packages,
              bred cows, bred heifers, and bulls selected for docility, structure, and maternal excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#embryos" className="btn-primary">
                View Embryo Packages
              </a>
              <a href="tel:715-313-0075" className="btn-outline border-white text-white hover:bg-white hover:text-foreground">
                Call for Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-6 bg-background border-b border-border">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#embryos" className="px-4 py-2 bg-white rounded-full border border-border text-muted hover:border-secondary hover:text-secondary transition-colors font-medium">
              Embryo Packages
            </a>
            <a href="#cows" className="px-4 py-2 bg-white rounded-full border border-border text-muted hover:border-secondary hover:text-secondary transition-colors font-medium">
              Bred Cows
            </a>
            <a href="#heifers" className="px-4 py-2 bg-white rounded-full border border-border text-muted hover:border-secondary hover:text-secondary transition-colors font-medium">
              Bred Heifers
            </a>
            <a href="#bulls" className="px-4 py-2 bg-white rounded-full border border-border text-muted hover:border-secondary hover:text-secondary transition-colors font-medium">
              Bulls Available
            </a>
          </div>
        </div>
      </section>

      {/* Embryo Packages Section */}
      <section id="embryos" className="section-padding bg-white scroll-mt-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Embryo Packages</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Premium embryo packages from our top donor females. Multiple sire options available
              to match your breeding goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {embryoPackages.map((pkg) => (
              <div key={pkg.name} className="bg-background rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="relative h-64">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                      Embryo Package
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-1 leading-tight">{pkg.name}</h3>
                  <p className="text-sm text-muted mb-4">Reg #{pkg.registration}</p>
                  {pkg.sires.length > 0 && (
                    <div className="mb-4 flex-1">
                      <p className="text-xs text-muted uppercase tracking-wide mb-2">Available Sire Options</p>
                      <div className="flex flex-wrap gap-2">
                        {pkg.sires.map((sire) => (
                          <span key={sire} className="bg-white text-foreground px-3 py-1.5 rounded-full text-sm border border-border font-medium">
                            {sire}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-muted mt-auto pt-4 border-t border-border">
                    Contact us for package pricing and sire availability.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bred Cows Section */}
      <section id="cows" className="section-padding bg-background scroll-mt-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Bred Cows</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Proven producers with documented calving history. All cows are AI bred to top sires
              with expected calving dates provided.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bredCows.map((cow) => (
              <div key={cow.name} className="bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                <div className="relative h-48">
                  <Image
                    src={cow.image}
                    alt={cow.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent text-white px-2 py-0.5 rounded text-xs font-medium">
                      Bred Cow
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-foreground mb-1 leading-tight">{cow.name}</h3>
                  <p className="text-xs text-muted mb-4">Reg #{cow.registration}</p>
                  <div className="space-y-3 flex-1">
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wide mb-1">AI Sire</p>
                      <p className="text-sm text-foreground font-medium leading-snug">{cow.aiSire}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wide mb-1">Expected Calving</p>
                      <p className="text-sm text-foreground font-medium">{cow.calvingDate}</p>
                    </div>
                  </div>
                  {cow.recentCalf && (
                    <div className="pt-3 mt-3 border-t border-border">
                      <p className="text-xs text-muted uppercase tracking-wide mb-1">Recent Calf</p>
                      <p className="text-sm text-foreground">{cow.recentCalf}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bred Heifers Section */}
      <section id="heifers" className="section-padding bg-white scroll-mt-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Bred Heifers</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Quality bred heifers ready to calve and start producing for your operation.
              All from our proven cow families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bredHeifers.map((heifer) => (
              <div key={heifer.name} className="bg-background rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                <div className="relative h-48">
                  <Image
                    src={heifer.image}
                    alt={heifer.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-secondary text-white px-2 py-0.5 rounded text-xs font-medium">
                      Bred Heifer
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-foreground mb-1 leading-tight">{heifer.name}</h3>
                  <p className="text-xs text-muted mb-4">Reg #{heifer.registration}</p>
                  <div className="space-y-3 flex-1">
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wide mb-1">Sire</p>
                      <p className="text-sm text-foreground font-medium leading-snug">{heifer.sire}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wide mb-1">Expected Calving</p>
                      <p className="text-sm text-foreground font-medium">{heifer.calvingDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulls Section */}
      <section id="bulls" className="section-padding bg-background scroll-mt-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Bulls Available</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Herd sire prospects with proven genetics. All bulls are semen tested and ready to work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bulls.map((bull) => (
              <div key={bull.name} className="bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                <div className="relative h-48">
                  <Image
                    src={bull.image}
                    alt={bull.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-foreground text-white px-2 py-0.5 rounded text-xs font-medium">
                      Bull
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-foreground mb-3 leading-tight">{bull.name}</h3>
                  <div className="mt-auto">
                    <p className="text-xs text-muted uppercase tracking-wide mb-1">Birth Date</p>
                    <p className="text-sm text-foreground font-medium">{bull.birthDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Notice */}
      <section className="py-12 bg-accent/10 border-y border-accent/20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Pricing & Viewing</h3>
                <p className="text-muted">
                  For prices of animals or to schedule a time to view the animals in-person,
                  please give us a call. We&apos;re happy to answer any questions about our genetics.
                </p>
              </div>
            </div>
            <a
              href="tel:715-313-0075"
              className="btn-primary whitespace-nowrap"
            >
              Call Josh: (715) 313-0075
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-foreground text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Add Quality Genetics?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Whether you&apos;re looking for show prospects, breeding stock, or herd bulls,
            we&apos;d love to help you find the right fit. Contact us today to discuss available cattle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
            <Link href="/genetics" className="btn-outline border-white text-white hover:bg-white hover:text-foreground">
              View Our Genetics Program
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 bg-white border-t border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-foreground mb-1">Location</h3>
              <p className="text-muted">2515 250th Street<br/>Cadott, WI 54727</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <h3 className="font-bold text-foreground mb-1">Phone</h3>
              <p className="text-muted">Josh: (715) 313-0075<br/>Amy: (715) 313-0076</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="font-bold text-foreground mb-1">Email</h3>
              <p className="text-muted">spaethherefords@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
