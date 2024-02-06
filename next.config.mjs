/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/igs-rentals.appspot.com/o/**"
      }
    ],
    domains: ["firebasestorage.googleapis.com"]
  }
};

export default nextConfig;
