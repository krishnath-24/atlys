import SignUpDialog from "../components/auth/signUp/SignUpDialog"
import Header from "../components/header/Header"
import AppRoutes from "../routes/Routes"

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <AppRoutes/>
      <SignUpDialog />
    </div>
  )
}

export default App