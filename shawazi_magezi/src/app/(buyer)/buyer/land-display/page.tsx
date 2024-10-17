"use client";
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SetStateAction, useEffect, useState } from "react";
import useDisplayLand from "@/app/hooks/useDisplayLand";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { LandDetails, UserDatas } from "@/app/utils/types";
import { FaTh, FaList } from "react-icons/fa";
import LandSearch from "../components/Searchbar";
import SideBar from "@/app/components/Sidebarpwa";
import { fetchUsers } from "@/app/utils/fetchUsers";
import Cookies from 'js-cookie';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const ITEMS_PER_PAGE = 6;


function LandDetailsList() {
  const [landIds] = useState([
    "147",
    "148",
    "115",
    "114",
    "104",
    "103",
    "21",
    "100",
    "16",
    "25",
    "64",
    "99",
    "122",
    "121",
    "144",
    "146",
    "10"
  ]);

  const { landDetailsList, loading, error } = useDisplayLand(landIds);
  const [layoutMode, setLayoutMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
 

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsLargeScreen(width >= 1280 || width === 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLayoutChange = (mode: SetStateAction<string>) => {
    setLayoutMode(mode);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = landDetailsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(landDetailsList.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const mapContainerStyle = {
    width: "100%",
    height: "250px",
  };
  const handleInterestClick = async (land: LandDetails) => {
    setLoadingStates((prev) => ({ ...prev, [land.land_details_id]: true }));
  
    try {
      const userPhone = Cookies.get("userPhone");
      if (!userPhone) {
        toast.error("User is not logged in!");
        return;
      }
  
      const users: UserDatas[] = await fetchUsers();
      const currentUser = users.find((user) => user.phone_number === userPhone);
      if (!currentUser) {
        toast.error("User not found!");
        return;
      }
  
      if (!currentUser.first_name || !currentUser.last_name) {
        toast.error("Invalid buyer data!");
        return;
      }
  
      const buyerName = `${currentUser.first_name} ${currentUser.last_name}`;
      const notificationData = {
        message: `A buyer named ${buyerName} is interested in your land in ${land.location_name}!`,
        timestamp: new Date().toISOString(),
      };
  
      console.log("Interest expressed:", {
        landId: land.land_details_id,
        ...notificationData
      });
  
      toast.success("Interest expressed successfully.");
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to express interest. Please try again later.");
      }
    } finally {
      setLoadingStates((prev) => ({ ...prev, [land.land_details_id]: false }));
    }
  };

  
  return (
    <div
      className={`relative ${
        isLargeScreen ? "ml-64" : ""
      } md:ml-60 lg:ml-64 xl:ml-72`}
    >
      <div className="pt-20 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="bg-[#D0F1A1] p-6 rounded-lg mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#562B00] mb-6">
              Hello, Welcome to Shawazi
            </h1>
            <p className="mb-4 text-lg sm:text-xl">
              Please feel free to carry out your land search
            </p>
            <div className="mr-12">
              <LandSearch />
            </div>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#562B00]">Explore</h2>
            <div className="flex space-x-2 ml-8">
              <FaTh
                className={`cursor-pointer ${
                  layoutMode === "grid" ? "text-[#508408]" : "text-[#562B00]"
                }`}
                onClick={() => handleLayoutChange("grid")}
              />
              <FaList
                className={`cursor-pointer ${
                  layoutMode === "list" ? "text-[#508408]" : "text-[#562B00]"
                }`}
                onClick={() => handleLayoutChange("list")}
              />
            </div>
          </div>
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          <div
            className={`${
              layoutMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8"
                : "flex flex-col space-y-4"
            }`}
          >
            {currentItems.length > 0
              ? currentItems.map((land: LandDetails) => (
                  <div
                    key={land.land_details_id}
                    className="border border-gray-300 rounded-lg p-4 shadow-lg"
                  >
                    {land.latitude && land.longitude ? (
                      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY!}>
                        <GoogleMap
                          mapContainerStyle={mapContainerStyle}
                          center={{
                            lat: parseFloat(land.latitude),
                            lng: parseFloat(land.longitude),
                          }}
                          zoom={12}
                        >
                          <Marker
                            position={{
                              lat: parseFloat(land.latitude),
                              lng: parseFloat(land.longitude),
                            }}
                          />
                        </GoogleMap>
                      </LoadScript>
                    ) : (
                      <p>Location information is not available.</p>
                    )}
                    <p className="mt-4">
                      <span className="font-semibold">Owner:</span>{" "}
                      {land.owner_name}
                    </p>
                    <p>
                      <span className="font-semibold">Location Name:</span>{" "}
                      {land.location_name}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {land.address}
                    </p>
                    <button
                      onClick={() => handleInterestClick(land)}
                      className="mt-4 bg-[#508408] text-white w-full py-1.5 rounded transition-colors duration-300 hover:bg-green-700"
                    >
                      Interested
                    </button>
                    {loadingStates[land.land_details_id] && <p>Loading...</p>}
                  </div>
                ))
              : !loading && (
                  <p className="col-span-full text-center">
                    No land details available.
                  </p>
                )}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              className={`px-3 py-1.5 rounded-md ${
                currentPage === 1
                  ? "bg-[#562B00] text-white cursor-not-allowed"
                  : "bg-[#508408] text-white hover:bg-green-700"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="self-center text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className={`px-3 py-1.5 rounded-md ${
                currentPage === totalPages
                  ? "bg-[#562B00] text-white cursor-not-allowed"
                  : "bg-[#508408] text-white hover:bg-green-700"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
      <SideBar userRole={""} />
    </div>
  );
}

export default LandDetailsList;