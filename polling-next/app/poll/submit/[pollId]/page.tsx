'use client'

import SubmitPollForm from "@/components/SubmitPollForm";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const pollId = Number(params.pollId);
    
    // User ID is now automatically created when accessed via userStorage.getUserId()
   
    return <SubmitPollForm pollId={pollId}></SubmitPollForm  >
}