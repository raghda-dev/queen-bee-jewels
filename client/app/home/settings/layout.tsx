// app/settings/layout.tsx
export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="settings-layout">
        <nav>
          <a href="/settings/account">Account</a>
          <a href="/settings/chat">Chat</a>
          <a href="/settings/notifications">Notifications</a>
          <a href="/settings/cards">Cards</a>
        </nav>
        {children}
      </div>
    );
  }
  
  // app/settings/account/page.tsx
  export default function AccountPage() {
    return <h1>Account Settings</h1>;
  }
  