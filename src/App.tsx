import { Navigate, Route, Routes } from 'react-router-dom'
import KnowledgeBasePage from './pages/knowledgeBase'
import KnowledgeBaseDetailPage from './pages/knowledgeBase/detail'
import HomePage from './pages/home'
import AuthorPage from './pages/author'
import { LoginPage, VerifyPage } from './pages/login'
import ProjectPage from './pages/project'
import ConnectionCenterPage from './pages/connection-center'
import PlanPage from './pages/plan'
import PosterSkillPage from './pages/workbench/posterSkill'
import WorkbenchPage from './pages/workbench'
import QuantxAgentPage from './pages/quantx-agent'
import QuantxAgentOrdersPage from './pages/quantx-agent/orders'
import QuantxAgentOrderPage from './pages/quantx-agent/order'
import { I18nProvider } from './i18n'

function App() {
  return (
    <I18nProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/workbench" element={<WorkbenchPage />} />
        <Route path="/workbench/poster-skill" element={<PosterSkillPage />} />
        <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
        <Route path="/knowledge-base/detail" element={<KnowledgeBaseDetailPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/connection-center" element={<ConnectionCenterPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/quantx-agent" element={<QuantxAgentPage />} />
        <Route path="/quantx-agent/orders" element={<QuantxAgentOrdersPage />} />
        <Route path="/quantx-agent/order" element={<QuantxAgentOrderPage />} />
        <Route path="/author" element={<AuthorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/verify" element={<VerifyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </I18nProvider>
  )
}

export default App
