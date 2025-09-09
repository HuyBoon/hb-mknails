"use client";

import React from "react";
import Image from "next/image";

const ContactUs = () => {
	return (
		<div className="w-full">
			<Image
				src="/contac.svg"
				alt="Contact Illustration"
				width={1900}
				height={1080}
				className="object-cover aspect-[9/5.4]"
				priority
			/>
		</div>
	);
};

export default ContactUs;
