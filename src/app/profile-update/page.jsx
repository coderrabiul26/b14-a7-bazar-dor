"use client";
import {updateUser } from "@/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Button, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { redirect } from "next/navigation";

import React from "react";


const ProfileUpdatePage = () => {

    const onSubmit=async(e)=>{
      e.preventDefault();
      const formData=new FormData(e.currentTarget);
      const user= Object.fromEntries(formData.entries())
    await updateUser({
        name: user.name
    })
    redirect('/')
  };

    return (
        <div className='flex flex-col max-w-120 h-screen mx-auto mt-25 rounded-lg'>
            <div className="bg-[#c2ecee] rounded-lg p-3">
                 <h1 className="text-xl font-bold">তথ্য</h1>
            <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <TextField 
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }
            return null;
          }}
        >
          <Label>নাম</Label>
          <Input placeholder="নতুন নাম লিখুন" />
          <FieldError />
        </TextField>
        <Button className='w-full' type="submit">
          <Check />
          আপেডট প্রোফাইল 
        </Button>

    </Form>
            </div>
           
        </div>
    );
};

export default ProfileUpdatePage;