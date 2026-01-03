import Link from "next/link";
import { AuthUser } from "@/components/store/authstore";
import ToggleButton from "@/components/icons/ToggleButton"; // import your toggle

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  user?: AuthUser | null;
  isDev: boolean;
  login: (args: { token: string; user: AuthUser }) => void;
  logout: () => void;
  itemCount: number;
  wishlistCount: number;
  themeColors: { navLink: string };
}

export default function MobileMenu({
  menuOpen,
  setMenuOpen,
  isAuthenticated,
  user,
  isDev,
  login,
  logout,
  itemCount,
  wishlistCount,
  themeColors,
}: MobileMenuProps) {
  if (!menuOpen) return null;

  const handleDevLogin = () => {
    login({ token: "fake-token", user: { id: "1", email: "test@shop.com", role: "admin" } });
    setMenuOpen(false);
  };

  return (
    <div className="md:hidden border-t pt-4 pb-6 flex flex-col gap-3">
      {/* Main Links */}
      <Link href="/" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
        Home
      </Link>
      <Link href="/products" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
        All Products
      </Link>
      <Link href="/categories" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
        Categories
      </Link>
      <Link href="/contact" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
        Contact
      </Link>
      <Link href="/wishlist" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
        Wishlist ({wishlistCount})
      </Link>

      {/* Auth Links */}
      {!isAuthenticated ? (
        <>
          <Link href="/login" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <Link href="/signup" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
            Signup
          </Link>
          <Link href="/forgot-password" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
            Forgot Password
          </Link>

          {isDev && (
            <button
              onClick={handleDevLogin}
              className={`${themeColors.navLink} text-left w-full py-2`}
            >
              Dev Login
            </button>
          )}
        </>
      ) : (
        <>
          <Link href="/account" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
            My Account
          </Link>
          <Link href="/orders" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
            Orders
          </Link>
          {user?.role === "admin" && (
            <Link href="/admin" className={themeColors.navLink} onClick={() => setMenuOpen(false)}>
              Admin Dashboard
            </Link>
          )}
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className={`${themeColors.navLink} text-left w-full py-2`}
          >
            Logout
          </button>
        </>
      )}

      {/* Mobile Theme Toggle */}
      <div className="mt-2">
        {/* Same ToggleButton as desktop */}
        <ToggleButton />
      </div>
    </div>
  );
}
