import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useEffect, useState } from "react";
import CreateNew_Employee from "../others/CreateNew_Employee";

export default function CustomModal({ isOpen, onClose }) {
  const [randomLines, setRandomLines] = useState("");
  const lines = [
    "Fun Fact: Hiring the right person boosts team morale by 99%! (Okay maybe not scientifically... but still!)",
    "Adding someone new? It's not just hiring, it's squad expansion mode activated!",
    "Good employees don't just fill roles — they fill gaps you didn't know existed.",
    "Every new hire brings new vibes, new energy, and a fresh coffee mug!",
    "Teamwork makes the dream work – and it all starts with hiring smart!",
    "Think of this as upgrading your team’s power level. Let’s go Super Saiyan!",
    "Behind every great project is an awesome teammate you hired right here.",
    "Hiring isn’t just about skills, it’s about finding the spark that lights the whole room.",
  ];

  useEffect(() => {
    if (isOpen) {
      const randomIndex = Math.floor(Math.random() * lines.length);
      setRandomLines(lines[randomIndex]);
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Employee
              </ModalHeader>
              <ModalBody>
                <p className="text-gray-700 font-medium">{randomLines}</p>
                <CreateNew_Employee />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
