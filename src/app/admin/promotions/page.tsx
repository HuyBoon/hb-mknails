import HeaderTitle from "@/components/admin/HeaderTitle";
import React from "react";

const PromotionAdmin = () => {
	return (
		<div>
			<HeaderTitle
				title="Promotions Management"
				path="/admin/promotions/addnew"
				addItem="New Promotion"
			/>
		</div>
	);
};

export default PromotionAdmin;
