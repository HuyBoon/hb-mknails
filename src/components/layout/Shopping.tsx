"use client";
import Image from "next/image";
import React from "react";

const Shopping = () => {
	return (
		<div className="bg-[#f2ecdb] w-full py-12 sm:py-16">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
					{/* Image Section */}
					<div className="lg:w-1/2 w-full">
						<div className="rounded-xl overflow-hidden shadow-lg">
							<Image
								src="/mkshop.png"
								alt="All Packages"
								width={800}
								height={600}
								className="h-auto w-full object-cover aspect-[4/3]"
								priority
							/>
						</div>
					</div>

					{/* Content Section */}
					<div className="lg:w-1/2 w-full flex flex-col gap-6">
						{/* Opening Hours */}
						<div className="bg-white rounded-xl shadow-lg p-6 flex-1">
							<h2 className="text-xl sm:text-2xl font-bold mb-4 text-pink-600">
								Opening Hours
							</h2>
							<ul className="space-y-2 text-gray-700 text-sm sm:text-base">
								<li>
									<span className="font-medium">Mon - Fri:</span> 10:00 AM -
									6:30 PM
								</li>
								<li>
									<span className="font-medium">Sat:</span> 10:00 AM - 6:00 PM
								</li>
								<li>
									<span className="font-medium">Sun:</span> Closed
								</li>
							</ul>
						</div>

						{/* Form */}
						<div className="bg-white rounded-xl shadow-lg p-6 flex-1">
							<h2 className="text-xl sm:text-2xl font-bold mb-4 text-pink-600">
								Contact Us
							</h2>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Name
									</label>
									<input
										type="text"
										placeholder="Your Name"
										className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Email
									</label>
									<input
										type="email"
										placeholder="Your Email"
										className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Phone
									</label>
									<input
										type="tel"
										placeholder="Your Phone Number"
										className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Message
									</label>
									<textarea
										placeholder="Your Message"
										rows={4}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
									/>
								</div>
								<button
									// type="submit"
									className="w-full bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-200 text-sm sm:text-base"
								>
									Submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shopping;
