import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `$var: red;`, // Insert additional data into each Sass/SCSS file
  },
}
 
export default nextConfig
