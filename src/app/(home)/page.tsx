import Image from "next/image";
import HotProduct from "@/components/layout/Services";
import Header from "@/components/layout/Header";
import Banner from "@/components/layout/Banner";
import GreenSlogan from "@/components/layout/GreenSlogan";
import Services from "@/components/layout/Promotions";
import Separate from "@/components/layout/Separate";
import Shopping from "@/components/layout/Shopping";
import Footer from "@/components/layout/Footer";

export default function Home() {
	return (
		<>
			<Header />
			<Banner />
			<HotProduct />
			<GreenSlogan />
			<Services />
			<Separate />
			<Shopping />
			<Footer />
		</>
	);
}
