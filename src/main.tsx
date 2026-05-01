import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./index.css"
import App from "./router.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar.tsx"
import { AppSidebar } from "./components/app-sidebar.tsx"
const HIDDEN_PATHS = [
  "/login",
  "/register",
  "/cv",
  "/home",
  "/employee",
  "/visitor",
  "/onboarding",
  "/dashboard/signage",
  "/blogs",
  "/solutions",
  "/compare",
  "/request-demo",
  "/dashboard/self-service-pos",
  "/privacy-policy",
  "/refund-policy",
  "/terms-and-conditions",
  "/",
];

const TRIGGER_HIDDEN_PATHS = [
  "/login",
  "/register",
  "/cv",
  "/home",
  "/employee",
  "/visitor",
  "/onboarding",
  "/dashboard/pos",
  "/dashboard/kitchen",
  "/dashboard/signage",
  "/blogs",
  "/solutions",
  "/compare",
  "/request-demo",
  "/privacy-policy",
  "/refund-policy",
  "/terms-and-conditions",
  "/",
];

// Paths where sidebar offset should NOT be applied (public pages)
const NO_OFFSET_PATHS = [
  "/",
  "/login",
  "/register",
  "/request-demo",
  "/blogs",
  "/solutions",
  "/compare",
  "/privacy-policy",
  "/refund-policy",
  "/terms-and-conditions",
  "/onboarding",
];
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar
            side={"left"}
            variant="inset"
            hiddenpaths={HIDDEN_PATHS}
          />
          <SidebarInset className="flex-1 min-w-0">

            <SidebarTrigger
              hiddenpaths={TRIGGER_HIDDEN_PATHS}
            />

            <App />

          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)
