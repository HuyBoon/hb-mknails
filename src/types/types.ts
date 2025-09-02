export interface ServiceItem {
    name: string;
    price: string | number;
}

export interface ServiceCategory {
    key: string;
    title: string;
    image: string;
    items: ServiceItem[];
}

export type ServicesData = Record<string, ServiceCategory>;
