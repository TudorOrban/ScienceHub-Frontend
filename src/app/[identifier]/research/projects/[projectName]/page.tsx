
export default function ProjectPage({
    params: { identifier, projectName },
}: {
    params: { identifier: string; projectName: string };
}) {
    return (
        <div>
            <h1>Project Page</h1>
            <p>
                This is the project page for project: {projectName} in the research area: {identifier}.
            </p>
        </div>
    );
}