import Header from "./Header";
import Navigation from "./Navigation";
import Swiper from "./Carousel";
import Movie from "./Movie";

interface LayoutProps {
  children?: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Navigation />
      {children}
    </>
  );
}
