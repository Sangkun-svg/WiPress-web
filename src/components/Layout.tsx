import { PropsWithChildren } from "react";
import { BottomNav ,Tabs} from "@/components";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center flex-col min-h-screen px-4 py-0">
      <Tabs />
      <div className="w-full max-w-[600px] mb-[60px] mx-auto my-0">{children}</div>
      {/* TODO: Add Chanel Talk */}
      <BottomNav />
    </div>
  );
};

export default Layout;
