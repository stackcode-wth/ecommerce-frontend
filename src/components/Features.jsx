import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Free Shipping', text: 'On orders over ₹4,150' },
  { icon: ShieldCheck, title: 'Secure Payment', text: '100% secure payment' },
  { icon: RotateCcw, title: 'Easy Returns', text: '30 days return policy' },
  { icon: Headphones, title: '24/7 Support', text: 'Dedicated support' },
];

function Features() {
  return (
    <section className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 bg-card-light p-5 sm:grid-cols-2 lg:grid-cols-4 dark:border-dark-border dark:bg-dark-surface">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div key={feature.title} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand dark:bg-accent dark:text-dark-bg">
              <Icon size={22} />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {feature.text}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Features;