import Image from 'next/image'
import React from 'react'
import logImg from "@/assets/images/3d-auth-bg.jpg";
import ForgotPassForm from '@/components/modules/auth/ForgotPassForm';

function ForgotPass() {
    return (
        <div className=" flex justify-center items-center">
            <div className=" lg:flex-1">
                <ForgotPassForm />
            </div>
            <div className="lg:flex-1">
                <Image
                    src={logImg}
                    alt="Login Image"
                    width={700}
                    height={700}
                    className="hidden lg:block w-full h-[100vh] object-cover"
                />
            </div>
        </div>
    )
}

export default ForgotPass