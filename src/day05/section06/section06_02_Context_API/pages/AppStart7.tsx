import { AgeProvider } from "../contexts/AgeProvider";
import Page from "../components/Page";

export default function AppStart7() {
  console.log("App 렌더링");

  return (
    <div>
      <AgeProvider>
        <Page />
      </AgeProvider>
    </div>
  );
}
