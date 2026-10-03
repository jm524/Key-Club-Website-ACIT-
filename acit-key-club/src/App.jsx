// Overview: Main application layout assembling all page sections in order.

import Navbar from './components/layout/Navbar';
import DistrictInfo from './components/home/DistrictInfo';
import DistrictStats from './components/home/DistrictStats';
import OfficerCarousel from './components/officers/OfficerCarousel';
import MeetingArchive from './components/meetings/MeetingArchive';
import ResourceLinks from './components/resources/ResourceLinks';
import Footer from './components/layout/Footer';

export default function App() {
  // Assembles the full page layout from top to bottom
  return (
    <div>
      <Navbar />
      <DistrictInfo />
      <DistrictStats />
      <OfficerCarousel />
      <MeetingArchive />
      <ResourceLinks />
      <Footer />
    </div>
  );
}
