'use client'

import PollResults from "@/components/PollResults";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const pollId = Number(params.pollId);
       
    return <PollResults pollId={pollId} />
}
