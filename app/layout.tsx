import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "../components/Header";
import MobileHeader from "@components/mobileHeader";
import OnLoadModal from "@components/OnLoadModal";
import Modal from "@components/Modal";
import StoreProvider from "../StoreProvider";
import Footer from "@components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rentals",
  description: ""
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>RentSphere - Home</title>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="" />
        <meta property="og:type" content="" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/imgs/theme/favicon.svg"
        />
        <link rel="stylesheet" href="/css/plugins/animate.min.css" />
        <link rel="stylesheet" href="/css/main2cc5.css?v=5.6" />
      </head>
      <body className={inter.className}>
        <StoreProvider>
          <OnLoadModal />
          <Modal />
          <Header />
          <MobileHeader />
          {children}
          <Footer />
        </StoreProvider>
        <Script src="/js/vendor/modernizr-3.6.0.min.js" />
        <Script src="/js/vendor/jquery-3.6.0.min.js" />
        <Script src="/js/vendor/jquery-migrate-3.3.0.min.js" />
        <Script src="/js/vendor/bootstrap.bundle.min.js" />
        <Script src="/js/plugins/slick.js" />
        <Script src="/js/plugins/jquery.syotimer.min.js" />
        <Script src="/js/plugins/waypoints.js" />
        <Script src="/js/plugins/wow.js" />
        <Script src="/js/plugins/perfect-scrollbar.js" />
        <Script src="/js/plugins/magnific-popup.js" />
        <Script src="/js/plugins/select2.min.js" />
        <Script src="/js/plugins/counterup.js" />
        <Script src="/js/plugins/jquery.countdown.min.js" />
        <Script src="/js/plugins/images-loaded.js" />
        <Script src="/js/plugins/isotope.js" />
        <Script src="/js/plugins/scrollup.js" />
        <Script src="/js/plugins/jquery.vticker-min.js" />
        <Script src="/js/plugins/jquery.theia.sticky.js" />
        <Script src="/js/plugins/jquery.elevatezoom.js" />
        <Script src="/js/main2cc5.js?v=5.6" />
        <Script src="/js/shop2cc5.js?v=5.6" />
      </body>
    </html>
  );
}
