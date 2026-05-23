
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Communities from "./pages/Communities";
import Locations from "./pages/Locations";
import LocationDetail from "./pages/LocationDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MemoryCare from "./pages/MemoryCare";
import AssistedLiving from "./pages/AssistedLiving";
import CityListing from "./pages/CityListing";
import AssistedLivingVsMemoryCareGuide from "./pages/AssistedLivingVsMemoryCareGuide";
import WhatIsAnRcfeGuide from "./pages/WhatIsAnRcfeGuide";
import BoardAndCareVsAssistedLivingGuide from "./pages/BoardAndCareVsAssistedLivingGuide";
import MediCalAndAssistedLivingGuide from "./pages/MediCalAndAssistedLivingGuide";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Leads from "./pages/admin/Leads";
import ComingSoon from "./pages/admin/ComingSoon";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/memory-care" element={<MemoryCare />} />
            <Route path="/assisted-living" element={<AssistedLiving />} />
            {/* City × care-type pages — match BEFORE the catch-all /:id route */}
            <Route path="/assisted-living/:citySlug" element={<CityListing mode="assisted_living" />} />
            <Route path="/senior-living/:citySlug" element={<CityListing mode="senior_living" />} />
            <Route path="/board-and-care-homes/:citySlug" element={<CityListing mode="board_and_care" />} />
            {/* Editorial guides and resources — fixed paths matched before the /:id catch-all */}
            <Route path="/guides/assisted-living-vs-memory-care" element={<AssistedLivingVsMemoryCareGuide />} />
            <Route path="/guides/what-is-an-rcfe" element={<WhatIsAnRcfeGuide />} />
            <Route path="/guides/board-and-care-vs-assisted-living" element={<BoardAndCareVsAssistedLivingGuide />} />
            <Route path="/resources/medi-cal-and-assisted-living" element={<MediCalAndAssistedLivingGuide />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/:id" element={<LocationDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
