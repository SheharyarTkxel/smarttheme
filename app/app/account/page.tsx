"use client";
import React, { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc/hook";
import { useStore } from "@/store/useStore";
import { UserProps } from "@/store/types/user";
import Loader from "@/components/Loader";
import Notification from "@/components/Notification";
import Alert from "@/components/Alert";

export default function AccountPage() {
  const setUser = useStore((state) => state.setUser);
  const newUser = trpc.newUser.useMutation();
  const { data } = trpc.getUsers.useQuery();

  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    };

    if (email.trim() === "") {
      newErrors.email = "Email is required";
      hasErrors = true;
    }

    if (password.trim() === "") {
      newErrors.password = "Password is required";
      hasErrors = true;
    }

    if (firstName.trim() === "") {
      newErrors.firstName = "First name is required";
      hasErrors = true;
    }

    if (lastName.trim() === "") {
      newErrors.lastName = "Last name is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      setErrors({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      });
      const user: UserProps = {
        firstname: firstName,
        lastname: lastName,
        email,
      };

      newUser.mutate({ ...user, password });
      setUser(user);
    }
  };

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }, [newUser.isSuccess]);

  return (
    <>
      {newUser.isLoading && <Loader />}
      <Notification
        message={newUser.error?.message}
        onClose={() => newUser.reset()}
      />
      <main className="w-1/2 mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
        {newUser.isSuccess && (
          <Alert
            message="User data is saved successfully."
            onClose={() => newUser.reset()}
          />
        )}
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-4">
            <label
              htmlFor="profile-image"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              type="image"
              id="profile-image"
            />
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="first-name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="last-name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            value="Save"
          />
          {/* Save
        </button> */}
        </form>
      </main>
    </>
  );
}
