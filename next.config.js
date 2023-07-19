/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  env: {
    customKey: '68ac41747d6e0ece93db0d27975114d9a3515e8270964c1044e69e46c2a9',
  },
}

module.exports = nextConfig
