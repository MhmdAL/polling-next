'use client'

import SubmitPollForm from "@/components/SubmitPollForm";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const params = useParams();
    const pollId = Number(params.pollId);
    
    useEffect(() => {
        if (!sessionStorage.getItem('pollUserId')) {
            const id = crypto.randomUUID();
            sessionStorage.setItem('pollUserId', id);
        }    
    })
   
    return <SubmitPollForm pollId={pollId}></SubmitPollForm  >
}