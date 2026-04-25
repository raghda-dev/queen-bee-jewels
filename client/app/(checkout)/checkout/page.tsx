//client/app/checkout/(checkout)/page.tsx

'use client';

import { useState } from 'react';
import OrderSummary from '../../(main)/components/OrderSummary';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Send to backend here
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-8 lg:px-24 xl:px-40">
      <h1 className="mb-6 text-3xl font-bold text-purpleDark">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        {/* Left: Shipping & Payment */}
        <div className="space-y-8 lg:col-span-2">
          {/* Shipping Info */}
          <div className="rounded-xl border border-grayLight p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-grayDark">
              Shipping Information
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-md border border-grayLight p-3 outline-none focus:ring-2 focus:ring-purpleDark"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-grayLight p-3 outline-none focus:ring-2 focus:ring-purpleDark"
              />
              <input
                type="text"
                name="address"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full rounded-md border border-grayLight p-3 outline-none focus:ring-2 focus:ring-purpleDark"
              />
              <select
                name="deliveryType"
                value={formData.deliveryType}
                onChange={handleChange}
                className="w-full rounded-md border border-grayLight p-3 outline-none focus:ring-2 focus:ring-purpleDark"
              >
                <option value="delivery">Delivery</option>
                <option value="pickup">Pickup</option>
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-xl border border-grayLight p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-grayDark">
              Payment Method
            </h2>

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
        <OrderSummary
          subtotal={subtotal}
          discount={discount}
          shipping={shipping}
          totalPrice={totalPrice}
          buttonType="placeOrder"
          onPlaceOrder={() => console.log('Order placed!')}
        />
      </form>
    </div>
  );
}
