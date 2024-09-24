import { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import AgencySurvey from './Pages/AgencySurvey'
import Loader from './composants/loader';
import AnimatedItem from './composants/animateditem';
import Bienvenue from './Pages/bienvenue';
import EnregistrementSurvey from './Pages/EnregistrementSurvey'
import ExperienceSurvey from './Pages/ExperienceSurvey'
import EntrepriseSurvey from './Pages/EntrepriseSurvey'

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un délai de chargement (ex : chargement de données)
    setTimeout(() => {
      setIsLoading(false);
    }, 100); // 3 secondes
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <AnimatedItem>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Bienvenue />}></Route>
              <Route path='/agencesurvey' element={<AgencySurvey />}></Route>
              <Route path='/enregistrementsurvey' element={<EnregistrementSurvey />}></Route>
              <Route path='/experiencesurvey' element={<ExperienceSurvey />}></Route>
              <Route path='/corporatesurvey' element={<EntrepriseSurvey />}></Route>
            </Routes>
          </BrowserRouter>
        </AnimatedItem>
      )}
    </>
  )
}

export default App
