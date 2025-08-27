import { Video } from "@imagekit/next";
import Dashboard from "./_components/dashbaord";
import Header from "./_components/header";


export default function Home() {
  return (
    <div>
      <Header/>
      <Dashboard/>
    </div>
  );
}
