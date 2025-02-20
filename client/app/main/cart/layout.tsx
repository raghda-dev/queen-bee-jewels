// app/cart/layout.tsx
export default function CartLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="cart-popup">
        {children}
        {/* Add common cart buttons like checkout */}
      </div>
    );
  }
  