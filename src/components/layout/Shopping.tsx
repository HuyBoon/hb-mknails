"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Shopping() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		alert("Thank you! We will contact you soon.");
		setFormData({ name: "", email: "", phone: "", message: "" });
	};

	return (
		<div className="bg-[#f2ecdb] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 xl:py-16">
			<div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-8">
				{/* Image with Opening Hours Overlay */}
				<motion.div
					initial={{ opacity: 0, x: -60 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: false }}
					className="lg:w-1/2 w-full relative"
				>
					<div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
						<Image
							src="/mkshop.png"
							alt="Spa Packages"
							width={800}
							height={600}
							className="h-auto w-full object-cover aspect-[4/3]"
							priority
						/>
					</div>
					<div className="absolute bottom-2 right-2 bg-black/80 rounded-xl p-3 sm:p-4 shadow-lg max-w-[90%] sm:max-w-[300px]">
						<h2 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
							Opening Hours
						</h2>
						<ul className="space-y-1 text-white text-sm sm:text-base">
							<li>
								<span className="font-semibold">Mon - Fri:</span> 10:00 AM -
								6:30 PM
							</li>
							<li>
								<span className="font-semibold">Sat:</span> 10:00 AM - 6:00 PM
							</li>
							<li>
								<span className="font-semibold">Sun:</span> Closed
							</li>
						</ul>
					</div>
				</motion.div>

				{/* Contact Form */}
				<motion.div
					initial={{ opacity: 0, x: 60 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					viewport={{ once: false }}
					className="lg:w-1/2 w-full"
				>
					<div className="p-6 sm:p-8">
						<h2 className="text-2xl sm:text-3xl text-center font-extrabold text-black mb-6">
							For more information
						</h2>
						<form onSubmit={handleSubmit} className="space-y-3">
							<div className="flex flex-col sm:flex-row gap-4">
								{/* Name */}
								<div className="flex-1">
									<label className="block text-sm font-medium text-gray-700 mb-1.5">
										Name
									</label>
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										placeholder="Your Name"
										required
										className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-btn bg-gray-50"
									/>
								</div>
								{/* Phone */}
								<div className="flex-1">
									<label className="block text-sm font-medium text-gray-700 mb-1.5">
										Phone
									</label>
									<input
										type="tel"
										name="phone"
										value={formData.phone}
										onChange={handleInputChange}
										placeholder="Your Phone Number"
										className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-btn bg-gray-50"
									/>
								</div>
							</div>

							{/* Email */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">
									Email
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									placeholder="Your Email"
									required
									className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-btn bg-gray-50"
								/>
							</div>

							{/* Message */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">
									Message
								</label>
								<textarea
									name="message"
									value={formData.message}
									onChange={handleInputChange}
									placeholder="Your Message"
									rows={5}
									className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-btn bg-gray-50"
								/>
							</div>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								type="submit"
								className="w-full bg-black text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#e5c9af] hover:text-black transition-colors duration-200 text-sm sm:text-base"
							>
								Submit
							</motion.button>
						</form>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
