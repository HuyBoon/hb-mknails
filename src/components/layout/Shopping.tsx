import Image from "next/image";
import React from "react";

const Shopping = () => {
	return (
		<div className="bg-[#f2ecdb] w-full">
			<div className="container mx-auto mt-[-5%] py-12 ">
				<div className="flex ">
					<div>
						<div className="rounded-xl overflow-hidden ">
							<Image
								src="/mkshop.png"
								alt="All Packages"
								width={800}
								height={600}
								className="h-auto aspect-[4/3] "
							/>
						</div>
					</div>
					<div>
						<div className="rounded-xl overflow-hidden ">
							<Image
								src="/products.png"
								alt="All Packages"
								width={800}
								height={600}
								className="h-auto aspect-[4/3] "
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shopping;
