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
import { toast } from "sonner";

export default function SignupForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [response, setResponse] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/signup",
        data
      );
      setResponse(res.data);
      toast("Account created successfully!", {
        description: "You can now login to your account."
      })

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  };

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
      {process.env.NODE_ENV==="development" && JSON.stringify(data)}
    </Card>
  );
}
