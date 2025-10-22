"use client"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
  Form,
  Input,
  User,
  Link,
} from "@heroui/react";
import { useState,  Dispatch, SetStateAction, FormEvent } from "react";
import { FaGoogle, FaMagic, FaLock } from "react-icons/fa";
type User = {
    name?: string;
    email?: string;
    image?: string
}

type Register = {
    url: string
    label: string
}

type GoogleProvider = {
    title: string
    label: string
    handleGoogleSubmit: (e: any) => Promise<void>
}

type EmailProvider = {
    title: string
    label: string
    email: string
    setEmail: Dispatch<SetStateAction<string>>
    handleEmailSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

type CredentialsProvider = {
    title: string
    label: string
    email: string
    setEmail: Dispatch<SetStateAction<string>>
    password: string
    setPassword: Dispatch<SetStateAction<string>>
    handleCredentialsSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

type SignOut = {
    label: string
    handleSignOut: () => Promise<void>
}

export type LoginButtonProps = {
    user?: User
    useEmail?: EmailProvider
    useCredentials?: CredentialsProvider
    useGoogle?: GoogleProvider
    signOut: SignOut
    registerPage: Register

}

export const LoginButton:React.FC<LoginButtonProps> = ({user, useCredentials, useEmail, useGoogle, signOut, registerPage}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [sent, setSent] = useState(false);
    const handleInternalEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        setSent(true)
        useEmail?.handleEmailSubmit(e)
    }
    if (user){
    return (
        <div className="flex flex-row gap-8">
            <User
            avatarProps={{
                src: user.image,
                showFallback: true,
                name: user.name
            }}
            name={user.name}
            />
            <Button onPress={signOut.handleSignOut}>{signOut.label}</Button>
        </div>
    )
  }
  return (
    <>
      <Button onPress={onOpen}>Login</Button>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">Choose your sign in method</ModalHeader>
              <ModalBody>
                <Divider className="my-4" />
                { sent ? (<p>Check your email for a magic link.</p>) : (<>
                {useEmail && (
                    <>
                    <Form className="w-full" onSubmit={handleInternalEmailSubmit}>
                        <div className="font-semibold text-small uppercase">{useEmail.title}</div>
                        <Input
                            isRequired
                            errorMessage="Please enter a valid email"
                            label="Email"
                            labelPlacement="outside"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            value={useEmail.email}
                            onChange={e => useEmail.setEmail(e.target.value)}
                        />
                        <Button className="w-full" type="submit" variant="bordered">
                            <FaMagic/>
                            {useEmail.label}
                        </Button>
                    </Form>
                    <Divider className="my-4" />                    
                    </>
                )}
                {useCredentials && (
                    <>
                    <Form className="w-full" onSubmit={useCredentials.handleCredentialsSubmit}>
                        <div className="font-semibold text-small uppercase">{useCredentials.title}</div>
                        <Input
                            isRequired
                            errorMessage="Please enter a valid email"
                            label="Email"
                            labelPlacement="outside"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            value={useCredentials.email}
                            onChange={e => useCredentials.setEmail(e.target.value)}
                        />
                        <Input
                            isRequired
                            errorMessage="Password"
                            label="Password"
                            labelPlacement="outside"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                            value={useCredentials.password}
                            onChange={e => useCredentials.setPassword(e.target.value)}
                        />
                        <Button className="w-full" type="submit" variant="bordered">
                            <FaLock />
                            {useCredentials.label}
                        </Button>
                    </Form>
                    <Divider className="my-4" />                    
                    </>
                )}
                {useGoogle && (
                    <>
                    <Form className="w-full" onSubmit={useGoogle.handleGoogleSubmit}>
                        <div className="font-semibold text-small uppercase">{useGoogle.title}</div>
                        <Button className="w-full" type="submit" variant="bordered">
                            <FaGoogle />
                            {useGoogle.label}
                        </Button>
                    </Form>  
                    <Divider className="my-4" />                       
                    </>
                )}
            
                </>) }
                

              </ModalBody>
              <ModalFooter>
                <div>
                    <Link href={registerPage.url}>{registerPage.label}</Link>
                </div>
              </ModalFooter>
            </>
        </ModalContent>
      </Modal>
    </>
  );
}