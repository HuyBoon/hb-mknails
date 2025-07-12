import React from "react";

const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white py-6">
			<div className=" container mx-auto flex  items-center justify-center gap-10 text-center">
				<div className="mb-4">
					<img
						src="/logo.png"
						alt="MK Nails Spa Logo"
						className="h-16 mx-auto"
					/>
				</div>
				<div>
					<div className="mb-4">
						<p>Mon - Fri | 10AM - 6:30PM</p>
						<p>Sat | 10AM - 6PM</p>
						<p>Sun | Closed</p>
					</div>
					<div className="mb-4">
						<p>221 Main St, Port Dover, ON N0A 1N0, Canada</p>
						<p>(519) 429 2637</p>
					</div>
					<div className="flex justify-center space-x-4">
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className="text-2xl">f</span>
						</a>
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className="text-2xl">@</span>
						</a>
						<a
							href="https://tiktok.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className="text-2xl">d</span>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
