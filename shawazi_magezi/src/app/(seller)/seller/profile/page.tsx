"use client";
import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { FaEdit, FaPhoneAlt, FaUserTie } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdDelete, MdClose } from "react-icons/md";
import { AiFillCamera } from "react-icons/ai";
import Modal from "react-modal";
import Image from "next/image";
import SellerSidebar from "../components/Sellersidebar";
const Profile = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    setFormData({
      firstName: getCookie("first_name") || "",
      lastName: getCookie("last_name") || "",
      phoneNumber: getCookie("phone_number") || "",
      role: getCookie("user_role") || "",
    });
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setImagePreview(savedImage);
    }
  }, []);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string | null);
        localStorage.setItem("profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setImagePreview(null);
    localStorage.removeItem("profileImage");
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    setIsEditing(false);
    Object.entries(formData).forEach(([key, value]) => {
      setCookie(key, value);
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="flex flex-col lg:flex-row mt-[5%] min-h-screen">
      <SellerSidebar />

      <div className="flex-1 flex flex-col items-center p-8 overflow-auto">
        <h2 className="text-4xl font-bold mb-8 text-primary">Profile</h2>
        <div className="w-full max-w-lg flex flex-col items-center">
          <div className="w-[200px] h-[200px] relative">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Profile"
                width={200}
                height={200}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-secondary rounded-full flex items-center justify-center border border-foreground">
                <span className="text-foreground text-xl">No Image</span>
              </div>
            )}
            <button
              onClick={openModal}
              className="absolute bottom-0 right-0 w-10 h-10 flex items-center justify-center bg-white rounded-full cursor-pointer shadow-lg border border-secondary"
            >
              <AiFillCamera className="text-foreground text-lg" />
            </button>
          </div>
          {modalIsOpen && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Image Options"
              className="modal"
              overlayClassName="overlay"
              style={{
                content: {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "300px",
                  border: "none",
                  borderRadius: "10px",
                  padding: "20px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
                },
              }}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Image Options</h2>
                <button onClick={closeModal} className="text-primary">
                  <MdClose className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => {
                  const fileUploadElement = document.getElementById(
                    "file-upload"
                  ) as HTMLInputElement | null;
                  if (fileUploadElement) {
                    fileUploadElement.click();
                  }
                }}
                className="flex items-center mt-4 text-foreground"
              >
                <FaEdit className="mr-2 text-foreground" />
                Edit Image
              </button>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {imagePreview && (
                <button
                  onClick={handleRemoveImage}
                  className="flex items-center mt-2 text-red-600"
                >
                  <MdDelete className="mr-2" />
                  Delete Image
                </button>
              )}
            </Modal>
          )}
          {/* </div> */}
          <div className="space-y-6 w-full mt-10">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="flex items-center mb-4">
                <span className="text-primary text-xl flex items-center">
                  {key === "firstName" && (
                    <IoPersonSharp className="inline w-6 h-6 mr-2" />
                  )}
                  {key === "lastName" && (
                    <IoPersonSharp className="inline w-6 h-6 mr-2" />
                  )}
                  {key === "phoneNumber" && (
                    <FaPhoneAlt className="inline w-6 h-5 mr-2" />
                  )}
                  {key === "role" && (
                    <FaUserTie className="inline w-6 h-6 mr-2" />
                  )}
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")}
                  :
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="flex-1 ml-4 text-primary text-xl border-b border-primary focus:outline-none"
                  />
                ) : (
                  <span className="ml-4 text-primary text-xl">{value}</span>
                )}
              </div>
            ))}
            <div className="flex justify-between w-full">
              <button
                onClick={handleEdit}
                className="w-32 py-3 text-lg text-foreground border-2 border-foreground rounded-lg hover:bg-foreground hover:text-white transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleSave}
                className="w-32 py-3 text-lg text-white bg-foreground rounded-lg hover:bg-white hover:border-2 hover:border-foreground hover:text-foreground transition-colors"
              >
                Save
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
