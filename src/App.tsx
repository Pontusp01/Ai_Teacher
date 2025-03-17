
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ExamsPage from "./pages/ExamsPage";
import ExamDetailsPage from "./pages/ExamDetailsPage";
import DevelopmentPage from "./pages/DevelopmentPage";
import CoursePage from "./pages/CoursePage";
import LearnPage from "./pages/LearnPage";
import DocumentsPage from "./pages/DocumentsPage";
import WebSourcesPage from "./pages/WebSourcesPage";
import AIAssistantPage from "./pages/AIAssistantPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="/exams/:id" element={<ExamDetailsPage />} />
            <Route path="/development" element={<DevelopmentPage />} />
            <Route path="/development/courses/:id" element={<CoursePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/web-sources" element={<WebSourcesPage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
