import Image from "next/image";
import HotProduct from "@/components/layout/Services";
import Header from "@/components/layout/Header";
import Banner from "@/components/layout/Banner";
import GreenSlogan from "@/components/layout/GreenSlogan";
import Shopping from "@/components/layout/Shopping";
import Footer from "@/components/layout/Footer";
import Promotions from "@/components/layout/Promotions";

export default function Home() {
	return (
		<div className="">
			<Header />
			<Banner />
			<div className="bg-[#f2ecdb]">
				<HotProduct />
			</div>
			<Promotions />
			<Shopping />
			<Footer />
		</div>
	);
}
