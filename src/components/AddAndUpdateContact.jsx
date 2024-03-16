import React from "react";
import Model from "./Model";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import * as Yup from "yup";


const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});


const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      const contactSnapshot = await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact added successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      const contactSnapshot = await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <Model isOpen={isOpen} onClose={onClose}>
        <Formik
        validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values, contact.id) : 
            addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name:</label>
              <Field
                className="border h-10"
                type="text"
                name="name"
                placeholder="Name"
              />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email:</label>
              <Field className="border h-10" name="email" placeholder="Email" />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="email" />
              </div>
            </div>

            <button className="border self-end bg-orange rounded-sm px-3 py-1.5">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Model>
    </>
  );
};

export default AddAndUpdateContact;
