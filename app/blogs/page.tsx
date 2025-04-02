import { BreadcrumbWithHistory } from "@/components/BreadcrumbHistory";
import { routerName } from "@/lib/router/router";

export default function page() {
    return <BreadcrumbWithHistory routesMap={routerName} maxVisibleItems={4} />;
};
