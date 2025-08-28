"use client";

import { useUser } from "@/components/context/AppContext";
import { useCart } from "@/components/context/CartContext";
import { useWishlist } from "@/components/context/WishContext";
import { formatCurrency } from "@/libs/helper";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaTrash } from "react-icons/fa";
interface CartItem {
	_id: string;
	slug: string;
	name: string;
	price: number;
	discountPrice: number;
	image: string;
	quantity: number;
}

const WishList = () => {
	const { user, status, error, profileFetched } = useUser();
	const { wishlist, removeFromWishlist } = useWishlist();
	const { addToCart } = useCart();
	const handleAddToCart = (item: CartItem) => {
		const cartItem = {
			_id: item._id,
			slug: item.slug,
			name: item.name,
			price: item.price,
			discountPrice: item.discountPrice,
			image: item.image,
			quantity: 1, // mặc định thêm vào 1 sản phẩm
		};
		addToCart(cartItem);
	};
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
				{wishlist.map((item) => (
					<div key={item._id} className="flex items-center gap-2 border p-3">
						<Image
							src={item.image}
							alt={item.name}
							width={600}
							height={800}
							className="w-[60px] md:w-[90px] rounded-md"
						/>
						<div className="flex-1">
							<Link
								href={`/shops/${item.slug}`}
								className="text-xs md:text-sm lg:text-base font-semibold line-clamp-3 hover:underline"
								title={item.name}
							>
								{item.name}
							</Link>
							<div className="flex items-center gap-2">
								{item.discountPrice > 0 ? (
									<>
										<span className="text-md md:text-lg font-bold text-red-600">
											{formatCurrency(item.discountPrice)}
										</span>
										<span className="ml-1 text-sm line-through text-gray-400">
											{formatCurrency(item.price)}
										</span>
									</>
								) : (
									<span className="text-md md:text-lg font-bold text-red-600">
										{formatCurrency(item.price)}
									</span>
								)}
							</div>
						</div>
						<div className="flex flex-col items-center justify-center gap-2">
							<button
								type="button"
								onClick={() => handleAddToCart(item as CartItem)}
								className="text-green-600 hover:text-green-800 p-2 rounded-full bg-green-100 hover:bg-green-200 transition duration-200"
							>
								<ShoppingCart size={18} />
							</button>
							<button
								type="button"
								onClick={() => removeFromWishlist(item._id)}
								className="text-red-600 hover:text-red-800 p-2 rounded-full bg-red-100 hover:bg-red-200 transition duration-200"
							>
								<FaTrash size={15} />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default WishList;
