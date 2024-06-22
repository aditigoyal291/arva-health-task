/**
 * v0 by Vercel.
 * @see https://v0.dev/t/OdTIbalBBC0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

export default function SignupForm() {
  const handleSubmit = async (e) => {
    e.preventDafault();
    console.log(data.email, data.password);
    // axios
    //   .post("http://localhost:8000/api/v1/users/signup", data)
    //   .then(() => console.log("success signup"))
    //   .catch((err) => {
    //     console.error(err);
    // });
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/signup",
        data
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  function handleInput(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Fill out the form below to get started.
        </CardDescription>
      </CardHeader>
      {/* <form method="POST" action={`http://localhost:8000/api/v1/users/signup`}> */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                onChange={(e) => handleInput(e)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={(e) => handleInput(e)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </CardFooter>
      </form>
      {JSON.stringify(data)}
    </Card>
  );
}
