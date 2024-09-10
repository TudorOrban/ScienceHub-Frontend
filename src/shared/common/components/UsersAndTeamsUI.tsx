import { UserSmall } from "@/core/user/models/User";
import { CollaborationSmall } from "@/features/community/collaborations/models/Collaboration";
import Link from "next/link";

export interface UsersAndTeamsUIProps {
    users?: UserSmall[];
    collaborations?: CollaborationSmall[];
}

const UsersAndTeamsUI = ({
    users,
    collaborations,
}: UsersAndTeamsUIProps) => {
    return (
        <>
            {(users || []).map((user, index) => (
                <Link
                    key={index}
                    href={`/${user.username}/profile`}
                    className="pseudo-link ml-1 block"
                >
                    {user.fullName}
                    {((index !== (users || []).length - 1) || collaborations?.length) ? ", " : ""}
                </Link>
            ))}
            {(collaborations || []).map((collaboration, index) => (
                <Link
                    key={index}
                    href={`/${collaboration.name}/profile`}
                    className="pseudo-link ml-1 block"
                >
                    {index !== (collaborations || []).length ? ", " : ""}
                    {collaboration.name}
                </Link>
            ))}
        </>
    );
}

export default UsersAndTeamsUI;