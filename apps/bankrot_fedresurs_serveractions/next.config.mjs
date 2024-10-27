/** @type {import('next').NextConfig} */
const nextConfig = {
	trailingSlash: true,
	webpack(config) {
		return config;
	},
};

export default nextConfig;
