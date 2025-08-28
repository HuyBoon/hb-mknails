"use client";

import { formatCurrency } from "@/libs/helper";
import React, { useEffect, useState } from "react";

type OrderType = {
	_id: string;
	orderId: string;
	userId?: string;
	products: {
		productId: string;
		productName: string;
		quantity: number;
	}[];
	totalPrice: number;
	customerInfo: {
		name: string;
		phone: string;
		email: string;
	};
	address: {
		houseNumber: string;
		street: string;
		ward: string;
		district: string;
		city: string;
	};
	descriptions?: string;
	paymentMethod: string;
	agreedToTerms: boolean;
	status: string;
	createdAt: string;
};
const translateStatus = (status: string) => {
	switch (status) {
		case "Pending":
			return "Đang xử lý";
		case "Processing":
			return "Đang chuẩn bị";
		case "Shipped":
			return "Đang giao hàng";
		case "Delivered":
			return "Đã giao hàng";
		case "Completed":
			return "Hoàn thành";
		case "Cancelled":
			return "Đã hủy";
		case "PaymentPending":
			return "Chờ thanh toán";
		case "PaymentFailed":
			return "Thanh toán thất bại";
		case "Refunded":
			return "Đã hoàn tiền";
		case "Returned":
			return "Đã trả hàng";
		case "FailedDelivery":
			return "Giao hàng thất bại";
		case "RefundProcessing":
			return "Đang xử lý hoàn tiền";
		default:
			return status;
	}
};

const Orders = () => {
	const [orders, setOrders] = useState<OrderType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/order`
				);
				if (!response.ok) throw new Error("Failed to fetch orders");
				const data = await response.json();
				setOrders(data);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	return (
		<div className="flex flex-col justify-start">
			<h2 className="text-xl md:text-2xl font-semibold mb-6">
				Đơn hàng của bạn
			</h2>

			{loading ? (
				<p>Đang tải đơn hàng...</p>
			) : orders.length === 0 ? (
				<p>Bạn chưa có đơn hàng nào.</p>
			) : (
				<div className="space-y-4">
					{orders.map((order) => (
						<div
							key={order._id}
							className="border rounded-2xl p-4 sm:p-6 bg-white shadow-md dark:bg-neutral-800"
						>
							<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
								<p className="font-semibold text-base sm:text-lg">
									Mã đơn hàng:{" "}
									<span className="text-blue-600">{order.orderId}</span>
								</p>
								<span
									className={`mt-2 sm:mt-0 text-sm px-3 py-1 rounded-full font-medium w-fit ${
										order.status === "Pending"
											? "bg-yellow-100 text-yellow-800"
											: order.status === "Processing"
											? "bg-blue-100 text-blue-800"
											: order.status === "Shipped"
											? "bg-indigo-100 text-indigo-800"
											: order.status === "Delivered"
											? "bg-green-100 text-green-800"
											: order.status === "Completed"
											? "bg-green-200 text-green-900"
											: order.status === "Cancelled"
											? "bg-red-100 text-red-800"
											: order.status === "PaymentPending"
											? "bg-orange-100 text-orange-800"
											: order.status === "PaymentFailed"
											? "bg-red-200 text-red-900"
											: order.status === "Refunded"
											? "bg-gray-100 text-gray-800"
											: order.status === "Returned"
											? "bg-gray-200 text-gray-900"
											: order.status === "FailedDelivery"
											? "bg-red-300 text-red-900"
											: order.status === "RefundProcessing"
											? "bg-yellow-200 text-yellow-900"
											: "bg-gray-300 text-gray-700"
									}`}
								>
									{translateStatus(order.status)}
								</span>
							</div>

							<div className="mb-2 max-h-[200px] overflow-y-auto">
								<strong className="block mb-1">Sản phẩm:</strong>
								<ul className="list-disc ml-5 space-y-1 text-sm sm:text-base ">
									{order.products.map((product) => (
										<li key={product.productId}>
											{product.productName} – Số lượng: {product.quantity}
										</li>
									))}
								</ul>
							</div>

							<p className="text-sm sm:text-base">
								Phương thức thanh toán:{" "}
								<span className="capitalize">{order.paymentMethod}</span>
							</p>
							<p className="text-sm sm:text-base">
								Tổng tiền:{" "}
								<span className="font-semibold text-red-500">
									{formatCurrency(order.totalPrice)} đ
								</span>
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
								Ngày đặt:{" "}
								{new Date(order.createdAt).toLocaleString("vi-VN", {
									timeZone: "Asia/Ho_Chi_Minh",
									hour12: false, // nếu bạn muốn dùng định dạng 24h
									day: "2-digit",
									month: "2-digit",
									year: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Orders;
