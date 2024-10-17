import React, { useState } from "react";

interface InviteLawyerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    firstName: string,
    lastName: string,
    invitedBy: string,
    phoneNumber: string
  ) => Promise<void>;
}

const InviteLawyerModal: React.FC<InviteLawyerModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [invitedBy, setInvitedBy] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(firstName, lastName, invitedBy, phoneNumber);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to send invitation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setInvitedBy("");
    setPhoneNumber("");
  };

  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg sm:max-w-[425px]">
          <h2 className="text-lg font-semibold mb-4">Invite a Lawyer</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="flex items-center">
                <label htmlFor="firstName" className="w-1/3 text-right pr-4">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-2/3 border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="lastName" className="w-1/3 text-right pr-4">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-2/3 border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="invitedBy" className="w-1/3 text-right pr-4">
                  Invited By
                </label>
                <input
                  type="text"
                  id="invitedBy"
                  value={invitedBy}
                  onChange={(e) => setInvitedBy(e.target.value)}
                  required
                  className="w-2/3 border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="phoneNumber" className="w-1/3 text-right pr-4">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-2/3 border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="mr-2 px-4 py-2 border border-gray-300 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700">
                {isSubmitting ? "Sending..." : "Send Invitation"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default InviteLawyerModal;
