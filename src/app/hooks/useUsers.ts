import { useState } from "react";
import { useRouter } from "next/navigation";
// import useSWR from 'swr';
export default function useUsers() {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [data, setData] = useState(null);
  const router = useRouter();
  
  const getUserByMobileOrEmail = async({
    email,
    mobile,
  }:{
    email?:string,
    mobile?:string,
  })=>{
    setLoading(true);
    const queryParam = email ? `email=${encodeURIComponent(email)}` : `mobile=${encodeURIComponent(mobile!)}`;
    const res=await fetch(`/api/users/EmailOrMobile?${queryParam}`,{
      method: "GET",
    })
    .then(res => {
      if (!res.ok) { // Check if the response status code is not okay
        console.error('Server responded with a non-200 status:', res.status);
        return res.text().then(text => { throw new Error(text) }); // Throw an error with the response text (or part of it)
      }
      return res.json(); // Parse JSON only if response is okay
    })
    .then((d) => {
      setData(d);
      setLoading(false);
      return data;
    })
    return res;
  };
  // const getUserByMobile = async({
  //   mobile,
  // }:{
  //   mobile:string,
  // })=>{
  //   setLoading(true);
    
  //   const res=await fetch(`/api/users`,{
  //     method: "GET",
  //   })
  //   .then(res => {
  //     if (!res.ok) { // Check if the response status code is not okay
  //       console.error('Server responded with a non-200 status:', res.status);
  //       return res.text().then(text => { throw new Error(text) }); // Throw an error with the response text (or part of it)
  //     }
  //     return res.json(); // Parse JSON only if response is okay
  //   })
  //   .then((data) => {
  //     setData(data);
  //     setLoading(false);
  //     return data;
  //   })
  //   return res;
  // };
  const postUser = async ({
    username,
    email,
    phoneNumber,
    hashedPassword,
    authority,
  }: {
    username:string,
    email:string,
    phoneNumber:string,
    hashedPassword:string,
    authority:string,
  }) => {
    setLoading(true);
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        mobile:phoneNumber,
        hashedPassword,
        authority,
      }),
    });
    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
    console.log("body.user.displayId"+body.user.displayId)
    return body.user.displayId
  };
  const updateUser = async ({
    id,
    username,
    authority,
    disable,
    hashedPassword,
    mobile,
    imageURL,
  }: {
    id: string,
    username?:string,
    authority?:string,
    disable?:boolean,
    hashedPassword?:string,
    mobile?:string,
    imageURL?:string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({
        id,
        username,
        authority,
        disable,
        hashedPassword,
        mobile,
        imageURL,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };

  const getUser = async () => {
    setLoading(true);
    const res = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.error);
    }
    router.refresh();
    setLoading(false);
    return body.usersStatus;
  };

  return {
    getUserByMobileOrEmail,
    // getUserByMobile,
    postUser,
    updateUser,
    getUser,
    loading,
  };
}
