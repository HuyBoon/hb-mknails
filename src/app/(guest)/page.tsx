import Image from "next/image";
import HotProduct from "@/components/layout/Services";
import Header from "@/components/layout/Header";
import Banner from "@/components/layout/Banner";
import GreenSlogan from "@/components/layout/GreenSlogan";
import Services from "@/components/layout/Promotions";

export default function Home() {
	return (
		<>
			<Header />
			<Banner />
			<HotProduct />
			<GreenSlogan />
			<Services />
		</>
	);
}
