import React from "react";
import Image from "next/image";

const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white py-8 sm:py-12">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center lg:text-left">
					{/* Logo Section */}
					<div className="flex flex-col items-center lg:items-start">
						<Image
							src="/logo.png"
							alt="MK Nails Spa Logo"
							width={120}
							height={64}
							className="mb-4"
							priority
						/>
						<p className="text-sm text-gray-300">
							MK Nails Spa - Your destination for premium nail care and
							relaxation.
						</p>
					</div>

					{/* Quick Links Section */}
					<div className="flex flex-col items-center lg:items-start">
						<h3 className="text-lg font-semibold text-pink-500 mb-4">
							Quick Links
						</h3>
						<ul className="space-y-2 text-sm text-gray-300">
							<li>
								<a href="/services" className="hover:text-pink-400 transition">
									Services
								</a>
							</li>
							<li>
								<a href="/booking" className="hover:text-pink-400 transition">
									Book an Appointment
								</a>
							</li>
							<li>
								<a href="/about" className="hover:text-pink-400 transition">
									About Us
								</a>
							</li>
							<li>
								<a href="/contact" className="hover:text-pink-400 transition">
									Contact
								</a>
							</li>
						</ul>
					</div>

					{/* Contact & Social Media Section */}
					<div className="flex flex-col items-center lg:items-start">
						<h3 className="text-lg font-semibold text-pink-500 mb-4">
							Contact Us
						</h3>
						<div className="text-sm text-gray-300 mb-4">
							<p>221 Main St, Port Dover, ON N0A 1N0, Canada</p>
							<p>(519) 429 2637</p>
						</div>
						<div className="flex justify-center lg:justify-start space-x-4">
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-pink-400 transition"
							>
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
										clipRule="evenodd"
									/>
								</svg>
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-pink-400 transition"
							>
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M12.315 2c2.43 0 2.784.013 3.808.06 1.02.049 1.716.209 2.322.442a4.68 4.68 0 011.697 1.108 4.68 4.68 0 011.108 1.697c.233.606.393 1.302.442 2.322.047 1.024.06 1.378.06 3.808s-.013 2.784-.06 3.808c-.049 1.02-.209 1.716-.442 2.322a4.68 4.68 0 01-1.108 1.697 4.68 4.68 0 01-1.697 1.108c-.606.233-1.302.393-2.322.442-1.024.047-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.02-.049-1.716-.209-2.322-.442a4.68 4.68 0 01-1.697-1.108 4.68 4.68 0 01-1.108-1.697c-.233-.606-.393-1.302-.442-2.322-.047-1.024-.06-1.378-.06-3.808s.013-2.784.06-3.808c.049-1.02.209-1.716.442-2.322a4.68 4.68 0 011.108-1.697 4.68 4.68 0 011.697-1.108c.606-.233 1.302-.393 2.322-.442 1.024-.047 1.378-.06 3.808-.06zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.667 3.333 3.333 0 010 6.667zm5.339-9.87a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"
										clipRule="evenodd"
									/>
								</svg>
							</a>
							<a
								href="https://tiktok.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-pink-400 transition"
							>
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.81 2.89 2.89 0 01.88.13V9.65a6.34 6.34 0 00-1-.09A6.34 6.34 0 003 16.1a6.34 6.34 0 0010.86 4.43 6.34 6.34 0 001.81-4.43V8.83a8.31 8.31 0 004.28 1.16V6.69z" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Copyright */}
			<div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
				<p>
					&copy; {new Date().getFullYear()} MK Nails Spa. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
