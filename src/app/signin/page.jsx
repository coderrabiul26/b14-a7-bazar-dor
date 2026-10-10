"use client";
import { signIn } from "@/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";



const SignInPage = () => {

    const onSubmit=async(e)=>{
      e.preventDefault();
      const formData=new FormData(e.currentTarget);
      const user= Object.fromEntries(formData.entries()) 

    const{data, error}=await signIn.email({
      ...user,
      callbackURL: '/'
    })
    if(data){
      toast.success('Logged in successfully')
      redirect('/')
  
    }
    if(error){
      toast.error(`${error.message}`)
    } 
  };
  const handleGoogleSignIn=async()=>{
    const data=await signIn.social({
      provider:'google'
    })
  }
  const handleGithubSignIn=async()=>{
    const data=await signIn.social({
      provider:'github'
    })
  }
  
    return (
        <div className='container mx-auto flex flex-col items-center h-screen mt-10'>
           
        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
            <h1 className="text-center bg-gray-100 rounded-lg py-2 px-3">Login Form</h1>
      
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="Enter your email" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      
      <div className="flex gap-2 items-center justify-between">
        <Button type="submit">
          <Check />
          Login
        </Button>
        <div>
          <Link href={'/signup'}>
            <span className="text-gray-400 mr-2">haven't account? </span><Button variant="secondary">
            Register
        </Button>
        </Link>
        </div>
       
      </div>
       <Button onClick={handleGoogleSignIn} className='bg-violet-500 w-full'>Sign in with google</Button>
       <Button onClick={handleGithubSignIn} className='bg-violet-500 w-full'>Sign in with github</Button>
    </Form>
    
    </div>
        
    );
};

export default SignInPage;