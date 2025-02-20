// app/main/layout.tsx
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>Header for main routes</header>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
