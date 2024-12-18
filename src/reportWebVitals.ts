import { onLCP, onINP, onCLS, onFCP, onTTFB } from "web-vitals";

const logMetric = (metric: any) => {
  console.log(`[Web Vitals] ${metric.name}:`, metric.value);
};

onCLS(logMetric);
onFCP(logMetric);
onINP(logMetric);
onLCP(logMetric);
onTTFB(logMetric);