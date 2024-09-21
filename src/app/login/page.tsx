"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { setCookie } from 'cookies-next';
import Link from "next/link";


const formSchema = z.object({
  login: z.string().min(1,{
    message: "Gugugu gug gugugug gu gugug.", //O usuário precisa ter pelo menos 1 caractere
  }),
  password: z.string().min(1, {
    message: "Gugugu gug gugug.", //a senha precisa ter pelo menos 1 caractere
  })    
})

export default function Home() {

  const [error, setError] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({    
    resolver: zodResolver(formSchema),    
    defaultValues: {
      login: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {   

    const data = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  
    const response = await data.json();

    if(response.error) 
      return setError(response.error);         

    setCookie('token', response.token, { maxAge: 60 * 60 * 24 * 30 });
    
    window.location.href = '/';
  }

  return (
    <div className="h-screen">
      <div className="flex h-screen items-center align-middle justify-center bg-zinc-200">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-xl">Gugu</CardTitle>          
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                  name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Gugugug gu Gugug</FormLabel>
                    <FormControl>
                      <Input maxLength={4} placeholder="Gugu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Gugu</FormLabel>
                      <FormControl>
                        <Input maxLength={4} type="password" placeholder="Gugu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-sm font-semibold text-red-500" hidden={error.length === 0}>{error}</p>
                <div className="w-full flex">
                  <Link href={'/register'}><p className="text-xs my-auto">Gugug gug gug gug gugug?</p></Link>
                  <Button type="submit" className="ml-auto">Gugu</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
