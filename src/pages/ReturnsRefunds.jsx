import PolicyPage from '../components/PolicyPage';

const sections = [
  {
    heading: '30-day returns',
    body: 'You can return most items within 30 days of delivery. Items must be unused, in their original packaging and with all tags attached.',
  },
  {
    heading: 'How to return an item',
    body: 'Go to My Orders, pick the order and contact our support team with your order ID. We will share the return instructions with you.',
  },
  {
    heading: 'Refunds',
    body: 'Once we receive and check the returned item, your refund is sent to the original payment method within 5-7 business days.',
  },
  {
    heading: 'Non-returnable items',
    body: 'For hygiene and safety reasons, items such as perfumes and personal care products cannot be returned once opened.',
  },
];

function ReturnsRefunds() {
  return (
    <PolicyPage
      title="Returns & Refunds"
      intro="Not happy with your purchase? Here is how returns and refunds work."
      sections={sections}
    />
  );
}

export default ReturnsRefunds;