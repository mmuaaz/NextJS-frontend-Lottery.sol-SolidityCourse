/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // swcMinify: true,
}
// experimental: {
//     images: {
//         unoptimized: true
//     }
// }

// module.exports = { nextConfig, experimental }
module.exports = { nextConfig, images: { loader: "akamai", path: "" } }
