import Screen from './Screen'
import './App.css'
import Book from './Book';
import BookComponent from './BookComponent';
import Header from './Header';
import RightsideNav from './RightsideNav';
import { atom } from 'jotai';
import ProjectsSidebar from './Projectsidebar';
export const pageNo = atom(-1);
function App() {
  return (
    <>
     <Header />
     <BookComponent />
     <ProjectsSidebar />
    </>
  )
}

export default App
