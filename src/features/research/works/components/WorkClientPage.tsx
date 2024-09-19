"use client";

import { useGetWorkById } from "../hooks/useGetWorkById";
import WorkHeader from "./WorkHeader";

export interface WorkClientPageProps {
    workId: number;
}

const WorkClientPage = ({
    workId,
}: WorkClientPageProps) => {
    const workResult = useGetWorkById(workId, !!workId);


    return (
        <div>
            <WorkHeader
                result={workResult}
                addBottom={true}
            />
        </div>
    );
};

export default WorkClientPage;