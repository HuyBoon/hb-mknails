import HeaderTitle from "@/components/admin/HeaderTitle";
import ServicesForm from "@/components/admin/services/ServicesForm";
import { ServiceCategory } from "@/types/types";

async function fetchCategory(id: string) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/service/${id}`,
			{
				cache: "no-store",
			}
		);
		if (!res.ok) {
			throw new Error(`Failed to fetch service: ${res.statusText}`);
		}
		const result = await res.json();
		return result.data;
	} catch (error) {
		console.error("Error fetching service:", error);
		return null;
	}
}

interface EditServiceProps {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ itemIndex?: string }>;
}

export default async function EditService({
	params,
	searchParams,
}: EditServiceProps) {
	const { id } = await params;
	const { itemIndex } = await searchParams;
	const service: ServiceCategory | null = await fetchCategory(id);

	if (!service) {
		return (
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<HeaderTitle
					title="Chỉnh sửa danh mục dịch vụ"
					path="/admin/services"
					addItem="Quay lại"
				/>
				<div className="mt-5 text-red-500">Danh mục không tồn tại</div>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<HeaderTitle
				title="Chỉnh sửa danh mục dịch vụ"
				path="/admin/services"
				addItem="Quay lại"
			/>
			<div className="mt-5">
				<ServicesForm
					service={service}
					itemIndex={itemIndex ? parseInt(itemIndex) : undefined}
				/>
			</div>
		</div>
	);
}
