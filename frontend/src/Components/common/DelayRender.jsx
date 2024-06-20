import { useDelayedRender } from "../../hooks/useDelayRender";

export const DelayedRender = ({ delay, children }) =>
  useDelayedRender(delay)(() => children);
