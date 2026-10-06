import PolicyPage from '../components/PolicyPage';

const sections = [
  {
    heading: 'Free shipping',
    body: 'Shipping is free on all orders over $50. For smaller orders, a small delivery charge is added at checkout.',
  },
  {
    heading: 'Delivery time',
    body: 'Standard delivery takes 3-7 business days. Delivery time can vary depending on your location.',
  },
  {
    heading: 'Order tracking',
    body: 'Once your order is shipped you can follow its progress from the Track Order page using your order ID.',
  },
  {
    heading: 'Delays',
    body: 'Sometimes weather, holidays or high demand can delay deliveries. If your order is late, please contact our support team.',
  },
];

function ShippingPolicy() {
  return (
    <PolicyPage
      title="Shipping Policy"
      intro="Everything you need to know about how we deliver your orders."
      sections={sections}
    />
  );
}

export default ShippingPolicy;