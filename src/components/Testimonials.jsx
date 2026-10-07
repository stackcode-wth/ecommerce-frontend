import { Quote, Star } from 'lucide-react';

//mock reviews
const testimonials = [
  {
    id: 1,
    name: 'Vanshika.',
    rating: 5,
    text: 'Amazing products and quick delivery. This is now my go-to store for everything I need.',
  },
  {
    id: 2,
    name: 'Aryansh.',
    rating: 5,
    text: 'Great quality for the price, and the support team replied to me really fast.',
  },
  {
    id: 3,
    name: 'Mansi.',
    rating: 4,
    text: 'Very happy with my order. I would happily recommend this store to my friends.',
  },
];

function Testimonials() {
  return (
    <section>
      <h2 className="text-center text-xl font-bold text-gray-900 dark:text-white">
        What Our Customers Say
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="rounded-xl border border-gray-200 bg-card-light p-5 dark:border-dark-border dark:bg-dark-surface"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-brand dark:bg-accent dark:text-dark-bg">
              <Quote size={18} />
            </span>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              {testimonial.text}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
                  {testimonial.name[0]}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </span>
              </div>

              <div className="flex">
                {[1, 2, 3, 4, 5].map((starNumber) => (
                  <Star
                    key={starNumber}
                    size={14}
                    className={
                      starNumber <= testimonial.rating
                        ? 'fill-accent text-accent'
                        : 'text-gray-300 dark:text-gray-600'
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;