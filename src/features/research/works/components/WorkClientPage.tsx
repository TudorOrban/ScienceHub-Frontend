"use client";

import { useGetWorkById } from "../hooks/useGetWorkById";

export interface WorkClientPageProps {
    workId: number;
}

const WorkClientPage = ({
    workId,
}: WorkClientPageProps) => {
    const { data, isLoading, error } = useGetWorkById(workId, !!workId);


    return (
        <div>
            {data?.title}
        </div>
    );
};

export default WorkClientPage;