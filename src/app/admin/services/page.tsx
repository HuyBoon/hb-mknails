"use client";
import React, { useEffect, useState } from "react";
import HeaderTitle from "@/components/admin/HeaderTitle";
import Link from "next/link";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { ServiceCategory } from "@/types/types";
import Loader from "@/components/admin/Loader";

const ServicesAdmin = () => {
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/service`,
          {
            cache: "no-store",
          }
        );
        const result = await res.json();
        if (res.ok && result.success && result.data) {
          setServices(result.data);
          if (result.data.length > 0) {
            setExpandedCategory(result.data[0].key);
          } else {
            toast.info(
              "No service categories available. Please add a new service."
            );
          }
        } else {
          toast.info("Unable to load services list. Please try again later.");
        }
      } catch (error) {
        console.error("Fetch services error:", error);
        toast.info("An error occurred while loading services. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const toggleCategory = (key: string) => {
    setExpandedCategory(expandedCategory === key ? null : key);
  };

  const handleDeleteCategory = async (key: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/service/${key}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await res.json();
      if (res.ok && result.success) {
        setServices(services.filter((service) => service.key !== key));
        setExpandedCategory(services.length > 1 ? services[0].key : null);
        toast.success("Category deleted successfully");
      } else {
        throw new Error(result.message || "Failed to delete category");
      }
    } catch (error: any) {
      console.error("Delete category error:", error);
      toast.info(error.message || "Unable to delete category. Please try again.");
    }
  };

  const handleDeleteItem = async (categoryKey: string, itemIndex: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const service = services.find((s) => s.key === categoryKey);
      if (!service) throw new Error("Category not found");

      const updatedItems = [...service.items];
      updatedItems.splice(itemIndex, 1);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/service/${categoryKey}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...service, items: updatedItems }),
        }
      );
      const result = await res.json();
      if (res.ok && result.success) {
        setServices(
          services.map((s) =>
            s.key === categoryKey ? { ...s, items: updatedItems } : s
          )
        );
        toast.success("Item deleted successfully");
      } else {
        throw new Error(result.message || "Failed to delete item");
      }
    } catch (error: any) {
      console.error("Delete item error:", error);
      toast.info(error.message || "Unable to delete item. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <HeaderTitle
        title="Services Management"
        path="/admin/services/addnew"
        addItem="Add Service"
      />
      <div className="mt-4 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50 mb-4">
            <tr>
              {services?.map((service) => (
                <th
                  key={service.key}
                  scope="col"
                  className={`px-4 py-2 text-left text-sm font-medium text-gray-900 uppercase tracking-wider cursor-pointer transition-colors ${
                    expandedCategory === service.key
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => toggleCategory(service.key)}
                >
                  <div className="flex items-center gap-1">
                    {service.title}
                    {expandedCategory === service.key ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expandedCategory && (
              <tr>
                <td colSpan={services.length} className="px-4 py-3">
                  <div className="border rounded-lg p-3 bg-gray-50 shadow-inner">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-base font-semibold mb-4">
                        {services.find((s) => s.key === expandedCategory)?.title}
                      </h3>
                      <div className="flex gap-1">
                        <Link
                          href={`/admin/services/edit/${expandedCategory}`}
                          aria-label="Edit category"
                          title="Edit category"
                          className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          onClick={() => handleDeleteCategory(expandedCategory)}
                          aria-label="Delete category"
                          title="Delete category"
                          className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                            Name
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                            Description
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                            Price
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {services
                          .find((s) => s.key === expandedCategory)
                          ?.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">
                                {item.name}
                              </td>
                              <td className="px-4 py-2 text-sm">
                                {item.description || "-"}
                              </td>
                              <td className="px-4 py-2 text-sm">{item.price}</td>
                              <td className="px-4 py-2 flex gap-1">
                                <Link
                                  href={`/admin/services/edit/${expandedCategory}?itemIndex=${index}`}
                                  aria-label="Edit service"
                                  title="Edit service"
                                  className="p-1.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                                >
                                  <Pencil size={14} />
                                </Link>
                                <button
                                  onClick={() => handleDeleteItem(expandedCategory, index)}
                                  aria-label="Delete service"
                                  title="Delete service"
                                  className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesAdmin;