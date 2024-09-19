
import WorkClientPage from "@/features/research/works/components/WorkClientPage";

export default function WorkPage({
    params: { identifier, workId },
}: {
    params: { identifier: string; workId: string };
}) {
    const parsedWorkId = parseInt(workId);

    if (isNaN(parsedWorkId)) {
        return <div>Invalid work ID</div>;
    }

    return (
        <WorkClientPage workId={parsedWorkId} />
    )
}