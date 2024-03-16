import React from "react";
import Navbar from "./components/Navbar";
import { CiSearch } from "react-icons/ci";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactCard from "./components/ContactCard";
import Model from "./components/Model";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclose from "./hooks/useDisclose";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactSnapshot = await getDocs(contactsRef);

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactList.filter(
        (contact) =>
          contact.name.toLowerCase().includes(value.toLowerCase()) ||
          contact.email.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <CiSearch className="text-white text-3xl absolute ml-1" />
            <input
              onChange={filterContacts}
              className="h-10 flex-grow bg-transparent
               text-white pl-9 border rounded-md border-white"
              type="text"
              name=""
              id=""
              placeholder="Search...."
            />
          </div>

          <AiFillPlusCircle
            onClick={onOpen}
            className="text-5xl cursor-pointer text-white"
          />
        </div>

        <div className="mt-4 gap-4 flex flex-col">
          {contacts.length <= 0
            ? <NotFoundContact/>
            : contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
        </div>
      </div>

      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer />
    </>
  );
};

export default App;
