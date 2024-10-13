import { useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError() as { statusText: string; message: string };
  console.error(error);
  return <div>{error.message}</div>;
}
