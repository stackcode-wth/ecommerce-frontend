export const ORDER_STEPS = ['Placed', 'Shipped', 'Out for Delivery', 'Delivered'];

export const orders = [
  {
    id: 'ORD1001',
    date: '20 Sep 2026',
    status: 'Delivered',
    total: 89.99,
    items: [{ name: 'Smart Watch Series 5', qty: 1, price: 89.99 }],
  },
  {
    id: 'ORD1002',
    date: '2 Oct 2026',
    status: 'Shipped',
    total: 99.98,
    items: [
      { name: 'Wireless Headphones', qty: 1, price: 59.99 },
      { name: 'Travel Backpack', qty: 1, price: 39.99 },
    ],
  },
  {
    id: 'ORD1003',
    date: '5 Oct 2026',
    status: 'Placed',
    total: 49.99,
    items: [{ name: 'Running Shoes', qty: 1, price: 49.99 }],
  },
];