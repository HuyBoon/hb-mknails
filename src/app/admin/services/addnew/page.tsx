import HeaderTitle from "@/components/admin/HeaderTitle";
import ServicesForm from "@/components/admin/services/ServicesForm";
import React from "react";

const AddNewService = () => {
	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<HeaderTitle
				title="Thêm mới danh mục dịch vụ"
				path="/admin/services"
				addItem="Quay lại"
			/>
			<div className="mt-5">
				<ServicesForm />
			</div>
		</div>
	);
};

export default AddNewService;
