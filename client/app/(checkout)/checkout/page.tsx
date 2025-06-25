//client/app/checkout/(checkout)/page.tsx

'use client';

import { useState } from 'react';
import Button from '../../(main)/components/Button';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    deliveryType: 'delivery',
    paymentMethod: 'palpay',
  });

  const subtotal = 130;
  const discount = 5;
  const shipping = 10;
  const totalPrice = subtotal - discount + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Send to backend here
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-8 lg:px-24 xl:px-40">
      <h1 className="text-3xl font-bold mb-6 text-purpleDark">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Shipping & Payment */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className="border border-grayLight p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-grayDark">Shipping Information</h2>

            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-grayLight rounded-md p-3 outline-none focus:ring-2 focus:ring-purpleDark"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-grayLight rounded-md p-3 outline-none focus:ring-2 focus:ring-purpleDark"
              />
              <input
                type="text"
                name="address"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-grayLight rounded-md p-3 outline-none focus:ring-2 focus:ring-purpleDark"
              />
              <select
                name="deliveryType"
                value={formData.deliveryType}
                onChange={handleChange}
                className="w-full border border-grayLight rounded-md p-3 outline-none focus:ring-2 focus:ring-purpleDark"
              >
                <option value="delivery">Delivery</option>
                <option value="pickup">Pickup</option>
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border border-grayLight p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-grayDark">Payment Method</h2>

            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="palpay"
                  checked={formData.paymentMethod === 'palpay'}
                  onChange={handleChange}
                />
                <span>PalPay</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="jawwalpay"
                  checked={formData.paymentMethod === 'jawwalpay'}
                  onChange={handleChange}
                />
                <span>Jawwal Pay</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={formData.paymentMethod === 'bank'}
                  onChange={handleChange}
                />
                <span>Bank Transfer</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="border border-orangeMedium p-6 rounded-xl bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-grayDark">Order Summary</h2>
          <div className="space-y-2 text-grayDark font-medium">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span className="text-pinkish">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-4 font-semibold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <Button shape="rectangle" size="small" color="var(--muted-red)" className="mt-6 w-full">
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
}