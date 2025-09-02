import { Suspense } from "react";
import ServicePageContent from "./ServicePageContent";

const ServicePage = () => {
	return (
		<Suspense
			fallback={
				<div className="flex justify-center items-center min-h-screen">
					Loading...
				</div>
			}
		>
			<ServicePageContent />
		</Suspense>
	);
};

export default ServicePage;
