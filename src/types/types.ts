export interface ServiceItem {
    name: string;
    description?: string;
    price: string | number;
}

export interface ServiceCategory {
    key: string;
    title: string;
    imageHome: string;
    image: string;
    items: ServiceItem[];
}

export type ServicesData = Record<string, ServiceCategory>;
