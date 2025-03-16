
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-eye-light-beige">
      <div className="text-center max-w-md mx-auto px-4 py-16 animate-fade-in">
        <div className="inline-block p-4 bg-eye-light-green rounded-full mb-6">
          <Search className="h-10 w-10 text-eye-green" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-2xl text-foreground mb-6">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <Home className="mr-2 h-5 w-5" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
