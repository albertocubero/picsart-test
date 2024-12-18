import { onLCP, onINP, onCLS } from "web-vitals";

const logMetric = (metric: any) => {
  console.log(`[Web Vitals] ${metric.name}:`, metric.value);
};

onCLS(logMetric);
onINP(logMetric);
onLCP(logMetric);
