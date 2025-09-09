import Image from "next/image";
import React from "react";

const AboutUs = () => {
	return (
		<div className="flex flex-col items-center justify-center  text-center p-6">
			<Image
				src="/banner.png"
				alt="Contact Illustration"
				width={1900}
				height={1080}
				className="object-cover mb-6"
				priority
			/>
		</div>
	);
};

export default AboutUs;
